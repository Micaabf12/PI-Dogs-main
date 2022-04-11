const { Temperament } = require('../db');
const axios = require('axios');
const { API_DOGS } = process.env;

const getTemperamentsFromAPI = async () => {
  try {
    const dogs = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_DOGS}`);

    var temperaments = [];

    for (var i = 0; i < dogs.data.length; i++) {
      var dogTemperaments = dogs.data[i].temperament;
      if (dogTemperaments) {
        temperaments = temperaments.concat(dogTemperaments.split(', '));
      }
    }
    var uniqueTemperaments = [...new Set(temperaments)];

    uniqueTemperaments.map((uniqueTemperament) => {
      Temperament.findOrCreate({
        where: {
          name: uniqueTemperament,
        },
      });
    });
    console.log('temperaments loaded in api/index.js');
  } catch (error) {
    console.log('error loading temperaments from API');
  }
};

module.exports = getTemperamentsFromAPI;
