import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import TerminalIcon from "@mui/icons-material/Terminal";
import StarsIcon from "@mui/icons-material/Stars";
import PublicIcon from "@mui/icons-material/Public";
import ProfilePage from "../portal/pages/profile";
import EducationPage from "../portal/pages/education";
import CertificationPage from "../portal/pages/certifications";
import ExperiencePage from "../portal/pages/experience";
import ProjectPage from "../portal/pages/projects";
import SkillSetPage from "../portal/pages/skillSet";
// TODO: ADD LAZY LOADING IN THESE

export const protectedRoutes = [
  {
    title: "Profile",
    path: "/profile",
    navIcon: PersonIcon,
    element: <ProfilePage />,
  },
  {
    title: "Education",
    path: "/education",
    navIcon: SchoolIcon,
    element: <EducationPage />,
  },
  {
    title: "Certifications",
    path: "/certifications",
    navIcon: StarsIcon,
    element: <CertificationPage />,
  },
  {
    title: "Work Experience",
    path: "/work-experience",
    navIcon: WorkIcon,
    element: <ExperiencePage />,
  },
  {
    title: "Projects",
    path: "/projects",
    navIcon: TerminalIcon,
    element: <ProjectPage />,
  },
  {
    title: "Skill Set",
    path: "/skill-set",
    navIcon: PublicIcon,
    element: <SkillSetPage />,
  },
];
