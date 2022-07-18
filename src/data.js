const skillsList = [
  { title: "React JS", value: 75 },
  { title: "Next JS", value: 80 },
  { title: "Material UI", value: 80 },
  { title: "Ant Design", value: 80 },
  { title: "Node JS ", value: 60 },
  { title: "Express JS ", value: 70 },
  { title: "Firebase", value: 70 },
  { title: "Flutter", value: 70 },
  { title: "MySQL", value: 70 },
  { title: "MongoDB", value: 70 },
];
const projectList = [
  {
    id: 1,
    title: "My Mates",
    technologies: ["Flutter", "Node JS", "MongoDB"],
    overview: "Self initiated; mobile app developed for the IT community.",
    extendedOverview: "At My Mates, we strive to build a professional community where we can work together and help each other. You can find your mates with relevant technologies and skills.",
    // backgroundImage:
    //   "https://cdn.cbeditz.com/cbeditz/preview/black-red-gradient-background-wallpaper-74-11614352798fbqrv1wpuv.jpg",
    // frontImage: "https://i.ibb.co/L0F7mKX/tunflix.png",
    colorGradients: {
      color1: "yellow",
      color2: "orange"
    }
  },
  {
    id: 2,
    title: "Drivers' Log SA",
    technologies: ["Flutter", "Firebase", "Google Maps"],
    overview: "Cross Platform Mobile App, developed for a Driving School in Australia.",
    extendedOverview: "Cross Platform Mobile App, developed for a Driving School in Australia. Learners are supposed to auto count their driving minutes and miles. This app is capable of generating the .pdf report of Learner's record.",
    // backgroundImage:
    //   "https://img.freepik.com/free-vector/dark-gradient-background-with-copy-space_53876-99548.jpg?size=626&ext=jpg&ga=GA1.2.2102900112.1628985600",
    // frontImage: "https://i.ibb.co/zNMJFTW/Webp-net-resizeimage.png",
    colorGradients: {
      color1: "yellow",
      color2: "orange"
    }
  },
  {
    id: 3,
    title: "Foogo",
    technologies: ["Flutter", "Node JS", "Firebase"],
    overview: "A food delivery system for inter-cities operations.",
    extendedOverview: "A food delivery system for inter-cities operations. It is developed for an organization to perform their operations more efficiently.",
    // backgroundImage:
    //   "https://media.istockphoto.com/vectors/abstract-purple-vector-background-with-stripes-vector-id972475894?k=6&m=972475894&s=612x612&w=0&h=99AirGMOb64N2-1ZSMYRjEBp2USrAdzXUGzQMh5o6Js=",
    // frontImage:
    //   "https://themes-backend.material-ui.com/wp-content/uploads/2021/05/01_preview.jpg",
      colorGradients: {
        color1: "yellow",
        color2: "orange"
      }
  },
  {
    id: 4,
    title: "Transpo Tracky",
    technologies: ["Flutter", "React JS", "Node JS", "MySQL", "Firebase", "Google Maps"],
    overview: "A Bus Tracking System for the university students, faculty and administration.",
    extendedOverview: "Besides leading a team of 3 developers, I was mainly responsible for managing databases (using MySQL), integration with Node.js REST API, developing mobile apps (using Flutter), debugging and deploying the system on servers.",
    // backgroundImage:
    //   "https://media.istockphoto.com/vectors/abstract-purple-vector-background-with-stripes-vector-id972475894?k=6&m=972475894&s=612x612&w=0&h=99AirGMOb64N2-1ZSMYRjEBp2USrAdzXUGzQMh5o6Js=",
    // frontImage:
    //   "https://themes-backend.material-ui.com/wp-content/uploads/2021/05/01_preview.jpg",
      colorGradients: {
        color1: "yellow",
        color2: "orange"
      }
  },
];

const experienceList = [
  {
    id: 0,
    company: "Code District",
    jobTitle: "MERN Stack Developer",
    overview:
      "Code District is a software provider of custom web and mobile application development services. Here we're providing full-cycle services in the areas of SaaS-based product development, content management solutions, web portals, e-commerce, web-based enterprise solutions and mobile applications. ",
    duration: {
      start: "Jan 2022",
      end: "cont.",
    },
    links: {
      website: "https://www.codedistrict.com/",
      facebook: "https://www.facebook.com/codedistrictpk/",
      linkedIn: "https://www.linkedin.com/company/the-code-district/",
    },
  },
  {
    id: 1,
    company: "Venture Studio",
    jobTitle: "Flutter Developer",
    overview:
      "Venture Studio is a Dubai based startup company. Its main focus is on PaaS. Here we developed many applications that bring ease in consumers' daily routine tasks.",
    duration: {
      start: "Nov 2020",
      end: "Jan 2022",
    },
    links: {},
  },
];

export { skillsList, projectList, experienceList };
