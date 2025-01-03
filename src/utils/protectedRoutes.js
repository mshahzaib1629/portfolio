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
const ProjectExport = lazy(() => import("../portal/pages/projectExport"));
const SkillSetPage = lazy(() => import("../portal/pages/skillSet"));



export const protectedRoutes = [
  {
    title: "Profile",
    path: "/profile",
    navIcon: PersonIcon,
    showInDrawer: true,
    element: <ProfilePage />
  },
  {
    title: "Education",
    path: "/education",
    navIcon: SchoolIcon,
    showInDrawer: true,
    element: <EducationPage />,
  },
  {
    title: "Certifications",
    path: "/certifications",
    navIcon: StarsIcon,
    showInDrawer: true,
    element: <CertificationPage />,
  },
  {
    title: "Work Experience",
    path: "/work-experience",
    navIcon: WorkIcon,
    showInDrawer: true,
    element: <ExperiencePage />,
  },
  {
    title: "Projects",
    path: "/projects",
    navIcon: TerminalIcon,
    showInDrawer: true,
    element: <ProjectPage />,
  },
  {
    title: "Skill Set",
    path: "/skill-set",
    navIcon: PublicIcon,
    showInDrawer: true,
    element: <SkillSetPage />,
  },
  {
    title: "Export Projects",
    path: "/projects/export",
    navIcon: null,
    showInDrawer: false,
    element: <ProjectExport />
  }
];
