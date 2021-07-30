const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const rand = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: '61014f9dab7d1040d4a09860',
            location: `${cities[rand].city}, ${cities[rand].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                  url: 'https://res.cloudinary.com/djys2yh2f/image/upload/v1627547388/YelpCamp/nrumgfzwe7k3hzgge7xv.jpg',
                  filename: 'YelpCamp/nrumgfzwe7k3hzgge7xv'
                },
                {
                  url: 'https://res.cloudinary.com/djys2yh2f/image/upload/v1627547388/YelpCamp/jxpq4piiwdtespicdd9q.jpg',
                  filename: 'YelpCamp/jxpq4piiwdtespicdd9q'
                }
              ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem dolore exercitationem in excepturi illo hic inventore consequatur, atque molestiae accusamus amet architecto, aliquid vitae, totam tempora natus pariatur. Asperiores, molestias.',
            price: price,
            geometry: {
                type: 'Point',
                coordinates: [cities[rand].longitude, cities[rand].latitude]
            },
        })
        await camp.save();
    }
}


seedDB().then(() => {
    mongoose.connection.close();
})