const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database connected");
});

const sample = (array)=>array[Math.floor(Math.random()*array.length)];

const seedDB = async()=>{
    await Campground.deleteMany({});
    for(let i=0;i<300;i++){
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*20)+10;
        const camp = new Campground({
            //YOUR USER ID
            author:'616a6a4bf0db2133ffa9ee56',
            location:`${cities[random1000].city}, ${cities[random1000].state}`,
            title:`${sample(descriptors)} ${sample(places)}`,
            description:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto earum unde ab delectus atque reiciendis illo maxime eligendi similique iste!',
            price,
            geometry: { 
                type : "Point",
                coordinates : [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
             },
            images:[
                {
                  url: 'https://res.cloudinary.com/driubrabz/image/upload/v1635069789/YelpCamp/vbwm8uyotfxtruyvnnsu.jpg',
                  filename: 'YelpCamp/vbwm8uyotfxtruyvnnsu.jpg',
                },
                {
                  url: 'https://res.cloudinary.com/driubrabz/image/upload/v1635073640/YelpCamp/bwl_uvmpij.jpg',
                  filename: 'YelpCamp/bwl_uvmpij.jpg',
                }
              ]
              
        });
        await camp.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
})