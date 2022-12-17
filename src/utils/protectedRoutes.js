import { lazy } from "react";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import TerminalIcon from "@mui/icons-material/Terminal";
import StarsIcon from "@mui/icons-material/Stars";
import PublicIcon from "@mui/icons-material/Public";

const ProfilePage = lazy(() => import("../portal/pages/profile"));
const EducationPage = lazy(() => import("../portal/pages/education"));
const CertificationPage = lazy(() => import("../portal/pages/certifications"));
const ExperiencePage = lazy(() => import("../portal/pages/experience"));
const ProjectPage = lazy(() => import("../portal/pages/projects"));
const SkillSetPage = lazy(() => import("../portal/pages/skillSet"));



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
