const Product = require('../Models/Product');
const mongoose = require('mongoose');

const db_url = 'mongodb://127.0.0.1:27017/GymShark';

const connectionOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

mongoose
  .connect(db_url, connectionOptions)
  .then(() => console.log("mongoDB connected"))
  .catch((e) => console.log(e));


async function insertProducts(){
  await  new Product(
    {
        name: 'Vital Seamless Leggings',
        description: 'High-waisted, seamless leggings with a second-skin feel and sweat-wicking technology. Perfect for any workout.',
        price: 75,
        sizes: [
          { size: 'S', quantity: 100 },
          { size: 'M', quantity: 100 },
          { size: 'L', quantity: 100 },
          { size: 'XL', quantity: 100 },
          { size: 'XXL', quantity: 100 },
        ],
        image: 'https://cdn.shopify.com/s/files/1/1367/5207/products/VitalSeamlessLeggingsSmokeyGreyMarl-B1A6T-GBC7.A-Edit_BK_1e0027b0-5938-46e9-b0ed-b425a51c7bd9.jpg?v=1652186853',
      }).save()

    await  new Product({
        name: 'Legacy T-Shirt',
    description: 'A classic crewneck t-shirt made from a soft, breathable cotton blend. Features the Gymshark logo on the chest.',
    price: 30,
    sizes: [
      { size: 'S', quantity: 150 },
      { size: 'M', quantity: 150 },
      { size: 'L', quantity: 150 },
      { size: 'XL', quantity: 150 },
      { size: 'XXL', quantity: 150 },
    ],
    image: 'https://cdn.shopify.com/s/files/1/0156/6146/products/LegacySsT-ShirtBlackA3A8M-BBBB-1663.130_5487aa22-9e62-44ab-889e-a9b0ff02b75f.jpg?v=1678719718',
  }).save(),
    await   new Product({
        name: 'Vital Seamless Sports Bra',
        description: 'A supportive and comfortable sports bra with a seamless design and adjustable straps. Ideal for high-impact activities.',
        price: 45,
        sizes: [
          { size: 'S', quantity: 75 },
          { size: 'M', quantity: 75 },
          { size: 'L', quantity: 75 },
          { size: 'XL', quantity: 75 },
        ],
        image: 'https://cdn.shopify.com/s/files/1/0098/8822/products/VITALSEAMLESSSPORTSBRABLACK.A_ZH_ZH.jpg?v=1649753555',
      },
      ).save()

    await   new Product({
        name: 'Flex Shorts',
        description: 'Lightweight and breathable shorts designed for training and performance. Feature a relaxed fit and side pockets.',
        price: 50,
        sizes: [
          { size: 'S', quantity: 125 },
          { size: 'M', quantity: 125 },
          { size: 'L', quantity: 125 },
          { size: 'XL', quantity: 125 },
          { size: 'XXL', quantity: 125 },
        ],
        image: 'https://cdn.shopify.com/s/files/1/0156/6146/products/FlexShortsBlackB1A4G.A-Edit_BK_f7eb88e3-fcdd-424d-8ae1-d5ce60a392c9.jpg?v=1647041873',
      },
      ).save()

 await   new Product({
    name: 'Arrival Tank Top',
    description: 'A stylish and comfortable tank top made from a soft and breathable fabric. Features a relaxed fit and a scoop neckline.',
    price: 35,
    sizes: [
      { size: 'S', quantity: 80 },
      { size: 'M', quantity: 80 },
      { size: 'L', quantity: 80 },
      { size: 'XL', quantity: 80 },
    ],
    image: 'https://cdn.shopify.com/s/files/1/1367/5207/products/ArrivalSlimTankBlackA1A2T-BBBB.A-Edit_BK_8354f775-5eb5-4096-be7e-d42527317988.jpg?v=1644335091',
  },
  ).save()

 await   new Product({
    name: 'Essential Hoodie',
    description: 'A classic pullover hoodie made from a soft and warm fleece. Features a kangaroo pocket and adjustable hood.',
    price: 60,
    sizes: [
      { size: 'S', quantity: 100 },
      { size: 'M', quantity: 100 },
      { size: 'L', quantity: 100 },
      { size: 'XL', quantity: 100 },
      { size: 'XXL', quantity: 100 },
    ],
    image: 'https://cdn.shopify.com/s/files/1/1367/5207/files/RestDayEssentialsHoodieGSBlackA3A8Z-BB2J-1789.jpg?v=1697554657',
  },
  ).save()

  await new Product({
    name: 'Seamless Cycling Shorts',
    description: 'High-waisted cycling shorts with a seamless design and a flattering fit. Ideal for cycling, yoga, and other activities.',
    price: 40,
    sizes: [
      { size: 'S', quantity: 70 },
      { size: 'M', quantity: 70 },
      { size: 'L', quantity: 70 },
      { size: 'XL', quantity: 70 },
    ],
    image: 'https://cdn.shopify.com/s/files/1/0156/6146/products/FitCyclingShortsBlack2GLSH42791619.A-Edit_BK.jpg?v=1614263726',
  },
  ).save()
  
  await new Product(
    {
        name: '315 Crop Top',
        description: 'A supportive and stylish crop top with a racerback design and removable padding. Ideal for high-impact activities.',
        price: 35,
        sizes: [
          { size: 'S', quantity: 65 },
          { size: 'M', quantity: 65 },
          { size: 'L', quantity: 65 },
          { size: 'XL', quantity: 65 },
        ],
        image: 'https://cdn.shopify.com/s/files/1/1367/5207/products/315ShortSleeveCropTopBlack-CementBrownMarlB2A6A-BBM81.jpg?v=1662719812',
      },
      
  ).save()

  await new Product(
    {
        name: 'Gradient Tee',
        description: 'A unique t-shirt with a vibrant gradient design. Made from a soft and breathable cotton blend.',
        price: 30,
        sizes: [
          { size: 'S', quantity: 140 },
          { size: 'M', quantity: 140 },
          { size: 'L', quantity: 140 },
          { size: 'XL', quantity: 140 },
          { size: 'XXL', quantity: 140 },
        ],
        image: 'https://cdn.shopify.com/s/files/1/1367/5201/products/CrestSsT-ShirtBlackA1A3J15.A-Edit_HK_ZH_32861318-e3ef-496d-8ebc-bf1c6e896dc3.jpg?v=1660209956',
      },
      
    ).save()

}



insertProducts()
.then(()=>console.log("Products inserted successfully"))
.catch((e)=>console.log(e));