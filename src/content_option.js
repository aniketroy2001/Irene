import bike_ride from "./assets/images/bike_ride.jpg";
import car from "./assets/images/car.jpg";
import chai from "./assets/images/chai.jpg";
import gym from "./assets/images/gym.jpg";
import kissie from "./assets/images/kissie.jpg";
import my_room from "./assets/images/my_room.jpg";
import paddle_boat from "./assets/images/paddle_boat.jpg";
import rabbit from "./assets/images/rabbit.jpg";
import xaviers from "./assets/images/xaviers.jpg";
import black from "./assets/images/black.jpg";
import mirror from "./assets/images/mirror.jpg";
import jaipur from "./assets/images/jaipur.jpg";

const logotext = "IRENE";
const meta = {
    title: "Irene Daniel",
    description: "I’m Irene Daniel Therapist _ Expressive Arts Therapy Practitioner,currently studying in Edinburgh",
};

const introdata = {
    title: "I’m Irene Daniel",
    animated: {
        first: "I love being a therapist",
        second: "I thoroughly enjoy engaging in expressive arts therapy.",
        third: "I love my boyfriend",
    },
    description: "Welcome to Irene's practice, where healing begins through compassionate support and evidence-based therapies. I specialize in providing personalized care to help individuals navigate life's challenges, fostering growth and resilience. Our approach integrates empathy, expertise, and a deep commitment to your well-being. Discover a safe space to explore, heal, and thrive on your journey toward a healthier, more fulfilling life.",
};

const dataabout = {
    title: "a bit about my self",
    aboutme: "I love working out in the gym and going hiking on the weekends! I seldom play badminton and most importantly I love my boyfriend.",
};
const worktimeline = [{
        jobtitle: "Master of Counselling (Interpersonal Dialogue)",
        where: "University of Edinburgh, Scotland, UK",
        date: "2025",
    },
    {
        jobtitle: "Diploma in Expressive Arts Therapy",
        where: "St. Xavier's College, Mumbai, India",
        date: "2023",
    },
    {
        jobtitle: "Bachelors in Arts",
        where: "Christ University, Bangalore, India",
        date: "2022",
    },
];

const skills = [{
        name: "Therapy",
        value: 100,
    },
    {
        name: "Arts Therapy",
        value: 100,
    },
    {
        name: "EQ",
        value: 100,
    },
    {
        name: "Driving",
        value: 50,
    },
    {
        name: "Love for Aniket",
        value: 200,
    },
];

const services = [{
        title: "Therapy",
        description: "Through dialogue, reflection, and evidence-based techniques, therapy aims to address challenges, improve coping skills, and promote mental and emotional well-being. ",
    },
    {
        title: "Art Therapy",
        description: "Through a blend of visual arts, movement, music, writing, and drama, this therapeutic approach invites individuals to explore emotions, experiences, and inner conflicts in a non-verbal and holistic manner.",
    },
    {
        title: "Girlfriend treatment",
        description: "Go back to home only Aniket gets this.",
    },
];

const dataportfolio = [{
        img: bike_ride,
        description: "Last and the best day of Manali trip.",
    },
    {
        img: car,
        description: "Gullu and bullu in car",
    },
    {
        img: chai,
        description: "Bangedy chai in traditionals",
    },
    {
        img: gym,
        description: "We look so good together in gym",
    },
    {
        img: kissie,
        description: "Kissie",
    },
    {
        img: my_room,
        description: "Soon after gablu surprised me!! Maybe I should get this haircut again.",
    },
    {
        img: paddle_boat,
        description: "Will show this picture to our kids",
    },
    {
        img: rabbit,
        description: "One of our best pictures ever & also family friendly",
    },
    {
        img: xaviers,
        description: "One in the college where Ino spent so many years.",
    },
    {
        img: black,
        description: "Well well well we know what happened afterwards",
    },
    {
        img: mirror,
        description: "Secret lovers phase",
    },
    {
        img: jaipur,
        description: "Honeymoon picture",
    },
];

const contactConfig = {
    YOUR_EMAIL: "irene.ino25@gmail.com",
    YOUR_FONE: "+44 (7767) (901416)",
    description: " In case I do not reply I am most likely busy spending time with Aniket",
    // creat an emailjs.com account 
    // check out this tutorial https://www.emailjs.com/docs/examples/reactjs/
    YOUR_SERVICE_ID: "service_id",
    YOUR_TEMPLATE_ID: "template_id",
    YOUR_USER_ID: "user_id",
};

const socialprofils = {
    github: "https://github.com",
    facebook: "https://facebook.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
};
export {
    meta,
    dataabout,
    dataportfolio,
    worktimeline,
    skills,
    services,
    introdata,
    contactConfig,
    socialprofils,
    logotext,
};