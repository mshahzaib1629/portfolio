const resumeLink =
  "https://firebasestorage.googleapis.com/v0/b/portfolio-ff548.appspot.com/o/Resume.pdf?alt=media&token=fc8f6255-b487-480d-8c20-7699a1dcd17b";

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
    extendedOverview:
      "At My Mates, we strive to build a professional community where we can work together and help each other. You can find your mates with relevant technologies and skills.",
    links: {
      docs: "",
      code: "",
      project:
        "https://play.google.com/store/apps/details?id=com.mshahzaib.my_mates",
    },
    frontImages: [
      "https://firebasestorage.googleapis.com/v0/b/portfolio-ff548.appspot.com/o/project-images%2Fmymates1.jpg?alt=media&token=5ba9d97d-b64a-4eba-9cd0-c3d2b563ed8b",
      "https://firebasestorage.googleapis.com/v0/b/portfolio-ff548.appspot.com/o/project-images%2Fmymates2.jpg?alt=media&token=4b329830-d6db-42d4-8b6e-d8544d24cc63",
    ],
    colorGradients: {
      color1: "yellow",
      color2: "#ff3300",
    },
  },
  {
    id: 2,
    title: "Drivers' Log SA",
    technologies: ["Flutter", "Firebase", "Google Maps"],
    overview:
      "Cross Platform Mobile App, developed for a Driving School in Australia.",
    extendedOverview:
      "Cross Platform Mobile App, developed for a Driving School in Australia. Learners are supposed to auto count their driving minutes and miles. This app is capable of generating the .pdf report of Learner's record.",
    links: {
      docs: "",
      code: "",
      project:
        "https://play.google.com/store/apps/details?id=com.lstlearn.drvlogsa&hl=en&gl=US",
    },
    frontImages: [
      "https://firebasestorage.googleapis.com/v0/b/portfolio-ff548.appspot.com/o/project-images%2Fdriverslog1.jpg?alt=media&token=87937262-7c29-4b2b-ac3c-b459f681afb0",
      "https://firebasestorage.googleapis.com/v0/b/portfolio-ff548.appspot.com/o/project-images%2Fdriverslog2.jpg?alt=media&token=226566f3-10ae-4147-88b0-dd8a3f14bb51",
    ],
    colorGradients: {
      color1: null,
      color2: null,
    },
  },
  {
    id: 3,
    title: "Foogo",
    technologies: ["Flutter", "Node JS", "Firebase"],
    overview: "A food delivery system for inter-cities operations.",
    extendedOverview:
      "A food delivery system for inter-cities operations. It is developed for an organization to perform their operations more efficiently.",
    links: {
      docs: "",
      code: "",
      project: "",
    },
    frontImages: [
      "https://firebasestorage.googleapis.com/v0/b/portfolio-ff548.appspot.com/o/project-images%2Ffoogo1.jpg?alt=media&token=a6c3ebb7-ebd0-400d-89ff-55473d9c3674",
      "https://firebasestorage.googleapis.com/v0/b/portfolio-ff548.appspot.com/o/project-images%2Ffoogo2.jpg?alt=media&token=2491322e-cc9f-4098-a9a8-c0b11fbbf742",
    ],
    colorGradients: {
      color1: "white",
      color2: "#339933",
    },
  },
  {
    id: 4,
    title: "Transpo Tracky",
    technologies: [
      "Flutter",
      "React JS",
      "Node JS",
      "MySQL",
      "Firebase",
      "Google Maps",
    ],
    overview:
      "A Bus Tracking System for the university students, faculty and administration.",
    extendedOverview:
      "Besides leading a team of 3 developers, I was mainly responsible for managing databases (using MySQL), integration with Node.js REST API, developing mobile apps (using Flutter), debugging and deploying the system on servers.",
    links: {
      docs: "https://drive.google.com/folderview?id=1Ej5icPch-Ko-Bk5RjU5Kvh1fhEkS3n8o",
      code: "",
      project: "",
    },
    frontImages: [
      // "https://firebasestorage.googleapis.com/v0/b/portfolio-ff548.appspot.com/o/project-images%2Ftranspotracky1.jpg?alt=media&token=0658f092-7591-4b62-afe1-01cffcaf98f5",
      // "https://firebasestorage.googleapis.com/v0/b/portfolio-ff548.appspot.com/o/project-images%2Ftranspotracky2.jpg?alt=media&token=7684c42b-afdc-44a4-ab2e-15ebaf57cd5b",
    ],
    colorGradients: {
      color1: "white",
      color2: "#006600",
    },
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

const educations = [
  {
    id: 1,
    degreeTitle: "Matriculation",
    school: "Lahore Model High School",
    location: "Lahore, Pakistan",
    duration: {
      start: "2012",
      end: "2014",
    },
    links: {},
  },
  {
    id: 2,
    degreeTitle: "FSc. Pre-Engineering (Intermediate)",
    school: "Govt. Islamia College, Civil lines",
    location: "Lahore, Pakistan",
    duration: {
      start: "2014",
      end: "2016",
    },
    links: {},
  },
  {
    id: 3,
    degreeTitle: "BS Computer Science",
    school: "COMSATS University Islamabad",
    location: "Lahore, Pakistan",
    duration: {
      start: "2016",
      end: "2020",
    },
    links: {},
  },
  {
    id: 4,
    degreeTitle: "MS Computer Science",
    school: "COMSATS University Islamabad",
    location: "Lahore, Pakistan",
    duration: {
      start: "2021",
      end: "cont.",
    },
    links: {},
  },
];

const certificates = [
  {
    id: 0,
    title: "Introduction to Git and GitHub",
    issuedBy: "Google | Coursera",
    nature: "Course",
    date: "July 2020",
    image:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-ff548.appspot.com/o/certificates-images%2Fgithub.jpeg?alt=media&token=fb54dca7-c276-42b8-9fa4-fa645e477442",
    url: "https://coursera.org/share/c9a556d70bf345ad5eaf10d3ffcd8567",
  },

  {
    id: 1,
    title: "Developing Applications with Google Cloud Platform",
    issuedBy: "Google Cloud | Coursera",
    nature: "Specialization",
    date: "Sep 2020",
    image:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-ff548.appspot.com/o/certificates-images%2Fgcp-specialization.jpeg?alt=media&token=cd26a76e-b064-4bba-8fca-2f43123b7e4a",
    url: "https://coursera.org/share/ea765a0331f5779bf9ae7a3da33b466a",
  },
  {
    id: 2,
    title: "Flutter & Dart - The Complete Guide",
    issuedBy: "Academind | Udemy",
    nature: "Specialization",
    date: "Dec 2020",
    image: null,
    url: "https://www.udemy.com/certificate/UC-ae549073-147c-4ae9-81ce-18f5d320dd05/",
  },
  {
    id: 3,
    title: "Software Product Management",
    issuedBy: "University of Alberta | Coursera",
    nature: "Specialization",
    date: "Feb 2021",
    image:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-ff548.appspot.com/o/certificates-images%2Fspm.jpeg?alt=media&token=5cd066e7-d6d9-4647-bc1c-0680414970b0",
    url: "https://coursera.org/share/7256addd80a78e41a2721b4ad15f8a73",
  },

  {
    id: 4,
    title: "Neural Networks and Deep Learning",
    issuedBy: "DeepLearning.AI | Coursera",
    nature: "Course",
    date: "Apr 2022",
    image:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-ff548.appspot.com/o/certificates-images%2Fnn.jpeg?alt=media&token=8587dbcd-2c16-4205-8234-9b6a02ebbfc1",
    url: "https://www.coursera.org/account/accomplishments/verify/5GKJFEBLXG5H",
  },

  {
    id: 5,
    title: "Improving Deep Neural Networks",
    issuedBy: "DeepLearning.AI | Coursera",
    nature: "Course",
    date: "May 2022",
    image:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-ff548.appspot.com/o/certificates-images%2Fimproved%20dn.jpeg?alt=media&token=39b3d4b1-b623-431e-89a5-bfb9541fef53",
    url: "https://www.coursera.org/account/accomplishments/verify/DU27KARR7JMC",
  },
];

export {
  resumeLink,
  skillsList,
  projectList,
  experienceList,
  educations,
  certificates,
};
