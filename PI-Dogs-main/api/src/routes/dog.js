const { Dog, Temperament } = require('../db');
const { Router } = require('express');
const router = Router();

router.post('/', async (req, res) => {
  const { name, height, weight, life_span, temperament } = req.body;

  var images = [
   'https://www.pexels.com/es-es/foto/pug-negro-adulto-1851164/',
   'https://www.pexels.com/es-es/foto/cachorro-de-pelo-corto-marron-y-blanco-1805164/',
   'https://www.pexels.com/es-es/foto/mono-hierba-perros-adorable-11004077/',
   'https://www.pexels.com/es-es/foto/fiesta-animal-perro-mascota-5716820/',
   'https://www.pexels.com/es-es/foto/beagle-adulto-caminando-sobre-cesped-1485637/',
   'https://www.shutterstock.com/es/image-photo/happy-dog-puppy-winking-eye-smiling-1830154085',
  ];

  var randomNum = Math.floor(Math.random() * 11);

  try {
    const newDog = await Dog.create({
      name,
      height,
      weight,
      life_span,
      image: images[randomNum],
    });

    newDog.addTemperaments(temperament);

    return res.json(newDog);
  } catch (error) {
    res.status(400).send({ msg: 'Invalid parameters for dog creation' });
  }
});





module.exports = router;