// src/app/data/cardsData.js

import cardImg1 from '../assets/images/cardImg1.png';
import cardImg2 from '../assets/images/cardImg2.png';
import cardImg3 from '../assets/images/cardImg3.png';
const cardsData = [
    {
        id: 1,
        title: "Individual",
        buttonText: "Start My Healing Journey",
        buttonLink: "/getstarted",
        imgSrc: cardImg1,
        desc: 'Personalized, one-on-one therapy for self-growth and emotional well-being'
      },
      { 
        id: 2,
        title: "Couples", 
        buttonText: "Start My Healing Journey",
        buttonLink: "/getstarted",
        imgSrc: cardImg2,
        desc: 'Strengthen your relationship with culturally competent guidance'
      },
      {
        id: 3,
        title: "Teens",
        buttonText: "Start My Healing Journey",
        buttonLink: "/getstarted",
        imgSrc: cardImg3,
        desc: 'Supporting Black teens in navigating emotions, identity, and stress.'
      },
  // Add more objects as needed
];

export default cardsData;
