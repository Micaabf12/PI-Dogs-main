const { Dog, Temperament } = require('../db');
const { Router } = require('express');
const router = Router();

router.post('/', async (req, res) => {
  const { name, height, weight, life_span, temperament } = req.body;

  var images = [
    'https://media.istockphoto.com/photos/portrait-of-a-funny-dog-jack-russell-terrier-in-sunglasses-behind-the-picture-id1180219878?k=20&m=1180219878&s=612x612&w=0&h=NB14R3M-_7K7q6KCa6OqwdHaKjxk4MTStFHI1vI9CZI=',
    'https://media.istockphoto.com/photos/dog-watching-tv-on-the-couch-picture-id680810342?k=20&m=680810342&s=612x612&w=0&h=wQVeNcnq0CIqpGK88zA-pqmzbyK_6diiHR7kAq5PbxQ=',
    'https://media.istockphoto.com/photos/dog-surfing-on-a-wave-picture-id912592258?k=20&m=912592258&s=612x612&w=0&h=L2ax3nYfFfqH2RwEpOyFGizo2vi2bVNDAuqDVhNeIpU=',
    'https://media.istockphoto.com/photos/drunk-dog-drinking-a-cocktail-picture-id1154998182?k=20&m=1154998182&s=612x612&w=0&h=87Moht-ZE7qIEUc8hNPArNasBXqqTd7O5KleZLBU8O4=',
    'https://media.istockphoto.com/photos/energetic-australian-cattle-dog-mixed-breed-dog-hoping-to-be-adopted-picture-id1001199382?k=20&m=1001199382&s=612x612&w=0&h=ssas8m3qCmQAAyZ_-dQfD-tA8YKd3BXEfdlu8_Vpzgk=',
    'https://media.istockphoto.com/photos/dog-on-the-phone-picture-id148392908?k=20&m=148392908&s=612x612&w=0&h=wZ7OqzP-bAIVM-WTXcUGeI7VXgzoVQ397WKz40cITVc=',
    'https://media.istockphoto.com/photos/cute-dalmatian-dog-holding-a-ball-in-the-mouth-isolated-on-white-picture-id909443406?k=20&m=909443406&s=612x612&w=0&h=kyMvwzw9ihswOx_naJ3y2Jm9eL6yVqESYAQTK8hyawg=',
    'https://media.istockphoto.com/photos/openmouthed-dalmation-picture-id1126441815?k=20&m=1126441815&s=612x612&w=0&h=UkdZFOrf6V3ivMuTGSDtuFqP3uciwZ5EyWniuEuXtEc=',
    'https://media.istockphoto.com/photos/dog-in-the-bathtub-picture-id1175836216?k=20&m=1175836216&s=612x612&w=0&h=9w6b4URR_T_VGq2JEzvbOqHmF1LO6l3edGaJZvFbE1M=',
    'https://media.istockphoto.com/photos/dog-with-pencil-at-the-office-picture-id667786852?k=20&m=667786852&s=612x612&w=0&h=WuNB1lGE3kq0ZtbJgetKGc5ytxoGY0Hn4CPreT_QEgM=',
  ];

  const randomNum = Math.floor(Math.random() * 11);
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