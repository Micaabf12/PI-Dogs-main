require('dotenv').config();
const { API_DOGS } = process.env;
const { Dog, Temperament } = require('../db');
const axios = require('axios');
const { Router } = require('express');
const router = Router();

const getApiDogs = async () => {
  const wholeApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_DOGS}`);

  var dogsFromApi = [];

  for (var i = 0; i < wholeApi.data.length; i++) {
    var dog = wholeApi.data[i];

    if (dog.weight.metric === 'NaN') {
      var imperialWeight = dog.weight.imperial.split(' ');
      var metricWeight = [
        Math.round(0.45 * Number(imperialWeight[0])),
        Math.round(0.45 * Number(imperialWeight[2])),
      ];
      dog.weight.metric = metricWeight.join(' - ');
    }
    if (dog.height.metric === 'NaN') {
      var imperialHeight = dog.height.imperial.split(' ');
      var metricHeight = [
        Math.round(2.54 * Number(imperialHeight[0])),
        Math.round(2.54 * Number(imperialHeight[2])),
      ];
      dog.height.metric = metricHeight.join(' - ');
    }

    var avgWeight = dog.weight.metric.split(' ');

    if (avgWeight.length > 1) {
      if (avgWeight[0] === 'NaN') {
        avgWeight = avgWeight[2];
      } else if (avgWeight[2] === 'NaN') {
        avgWeight = avgWeight[0];
      } else {
        avgWeight = (Number(avgWeight[0]) + Number(avgWeight[2])) / 2;
      }
    } else {
      avgWeight = Number(avgWeight[0]);
    }

    var dogDetails = {
      id: dog.id,
      name: dog.name,
      height: dog.height.metric,
      weight: dog.weight.metric,
      avgWeight,
      life_span: dog.life_span,
      image: dog.image.url,
      temperament: dog.temperament,
    };
    dogsFromApi.push(dogDetails);
  }
  return dogsFromApi;
};

const getDbDogs = async () => {
  var dogsDB = await Dog.findAll({ include: { model: Temperament } });

  var formattedDogsDB = [];

  if (dogsDB.length > 0) {
    for (var i = 0; i < dogsDB.length; i++) {
      var dogDB = dogsDB[i];

      var temperamentStr = '';

      if (dogDB.temperaments.length > 0) {
        for (var j = 0; j < dogDB.temperaments.length; j++) {
          var dogTemperament = dogDB.temperaments[j].name;

          temperamentStr += dogTemperament + ', ';
        }
        temperamentStr = temperamentStr.substring(0, temperamentStr.length - 2);
      }
      var avgWeight = dogDB.weight.split(' ');

      if (avgWeight.length > 1) {
        avgWeight = (Number(avgWeight[0]) + Number(avgWeight[2])) / 2;
      } else {
        avgWeight = Number(avgWeight[0]);
      }

      var dogDetails = {
        id: dogDB.id,
        name: dogDB.name,
        height: dogDB.height,
        weight: dogDB.weight,
        avgWeight,
        life_span: dogDB.life_span,
        created_in_db: dogDB.created_in_db,
        temperament: temperamentStr,
        image: dogDB.image
      };
      formattedDogsDB.push(dogDetails);
    }
  }

  // return dogsDB;
  return formattedDogsDB;
};

//const deleteDog = (id) => {
 // Dog.findByPk(id);
//};

const getAllDogs = async () => {
  const apiDogs = await getApiDogs();
  const dbDogs = await getDbDogs();
  

  const allDogs = dbDogs.concat(apiDogs);

  return allDogs;
};

// GET --- All Dogs and Dogs By Name
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  Dog.destroy({
    where: {
      id: id,
    },
  });
  res.json('breed eliminated');
});

router.get('/', async (req, res) => {
  const name = req.query.name;

  try {
    const dogs = await getAllDogs();

    if (name) {
      var dogsFoundByName = dogs.filter((dog) =>
        dog.name.toLowerCase().includes(name.toLowerCase())
      );

      if (!dogsFoundByName.length) {
        return res.status(404).send({ info: 'Dog not found' });
      }

      return res.send(dogsFoundByName);
    }
    res.json(dogs);
  } catch (error) {
    console.log(error);
  }
});

// GET --- Get Dog by ID

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    if (id.length > 3) {
      const dogsFromDb = await getDbDogs();

      var dogFoundByDbId = dogsFromDb.find((dog) => dog.id === id);

      if (!dogFoundByDbId) {
        return res.status(404).send({ info: 'Dog not found' });
      }
      return res.send(dogFoundByDbId);
    }

    if (!isNaN(id)) {
      const dogsFromApi = await getApiDogs();

      var dogFoundById = dogsFromApi.find((dog) => dog.id == id);

      if (!dogFoundById) {
        return res.status(404).send({ info: 'Dog not found' });
      }

      return res.send(dogFoundById);
    }
    res.status(400).send({ info: 'Incorrect ID' });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;