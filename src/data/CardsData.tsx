// src/app/data/cardsData.js

import cardImg1 from '../assets/images/cardImg1.png';
import cardImg2 from '../assets/images/cardImg2.png';
import cardImg3 from '../assets/images/cardImg3.png';
const cardsData = [
    {
        id: 1,
        title: "Individual",
        buttonText: "Get Started",
        buttonLink: "/getstarted",
        imgSrc: cardImg1,
      },
      { 
        id: 2,
        title: "Couples", 
        buttonText: "Get Started",
        buttonLink: "/getstarted",
        imgSrc: cardImg2,
      },
      {
        id: 3,
        title: "Teens",
        buttonText: "Get Started",
        buttonLink: "/getstarted",
        imgSrc: cardImg3,
      },
  // Add more objects as needed
];

export default cardsData;
