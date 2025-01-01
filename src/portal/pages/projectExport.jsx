import * as React from "react";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import BackdropLoading from "../../components/BackdropLoading";
import { Edit, Launch } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import MuiAlert from "@mui/material/Alert";
import { Collapse, IconButton } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

import { fetchAllProjectThunk } from "../../redux/slices/projectSlice";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";

import { convertArrayToString } from "../../utils/common";
import FeaturedTag from "../../components/FeaturedTag";
import Autocomplete from "@mui/material/Autocomplete";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ProjectPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { projectList, isLoading } = useSelector((state) => state.project);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [tags, setTags] = useState([]);

  const pageSizeOptions = [10, 15, 25];

  async function getProjectData() {
    try {
      await dispatch(fetchAllProjectThunk());
    } catch (error) {
      console.log("error: ", error);
    }
  }

  useEffect(() => {
    getProjectData();
  }, []);

  useEffect(() => {
    filterProjectsByTags(tags);
  }, [tags, projectList]);

  function _exportProjects() {
    const dataToExport = filteredProjects.map((project) => ({
      title: project.title,
      projectType: project.projectType,
      overview: project.overview,
      year: project.year,
      technologies: project.technologies,
      links: project.links,
    }));

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "projects.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function filterProjectsByTags(tags) {
    if (tags.length === 0) {
      setFilteredProjects(projectList);
    } else {
      const filtered = projectList.filter((project) =>
        tags.some(
          (tag) =>
            project.technologies.some((tech) =>
              tech.toLowerCase().includes(tag.toLowerCase())
            ) ||
            project.overview.toLowerCase().includes(tag.toLowerCase()) ||
            project.notes?.toLowerCase().includes(tag.toLowerCase()) ||
            project.projectType?.toLowerCase().includes(tag.toLowerCase()) ||
            project.title.toLowerCase().includes(tag.toLowerCase()) ||
            project.workedAt?.toLowerCase().includes(tag.toLowerCase())
        )
      );
      setFilteredProjects(filtered);
    }
  }

  function handleTagsChange(event, value) {
    setTags(value);
  }

  function ProjectRow({ project }) {
    const [open, setOpen] = useState(false);

    return (
      <>
        <TableRow key={project.id} id={project.id}>
          <TableCell style={{ width: "5%" }}>
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => {
                setFilteredProjects((prevProjects) =>
                  prevProjects.filter((p) => p.id !== project.id)
                );
              }}
            >
              <RemoveCircleOutlineIcon />
            </IconButton>
          </TableCell>
          <TableCell>
            {project.title} {project.isFeatured && <FeaturedTag />}
          </TableCell>
          <TableCell>{project.workedAt}</TableCell>
          <TableCell style={{ width: "40%" }}>
            {convertArrayToString(project.technologies)}
          </TableCell>
          <TableCell>{project.year}</TableCell>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <div style={{ margin: "10px 0" }}>
                <strong>Project Type:</strong> {project.projectType}
              </div>
              <div style={{ margin: "10px 0" }}>
                <strong>Overview</strong> <br />
                {project.overview}
              </div>
              <div style={{ margin: "10px 0" }}>
                <strong>Notes</strong> <br />
                {project.notes}
              </div>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  }

  function showProjectListing() {
    return (
      <Container>
        <div className={classes.pageHead}>
          <h2>Export Projects</h2>
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
            onClick={_exportProjects}
          >
            Export
          </Button>
        </div>
        <Autocomplete
          multiple
          id="tags-filled"
          options={[]}
          defaultValue={[]}
          freeSolo
          onChange={handleTagsChange}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === ",") {
              event.preventDefault();
              const value = event.target.value.trim();
              if (value) {
                setTags((prevTags) => [...prevTags, value]);
                event.target.value = "";
              }
            }
          }}
          renderInput={(params) => (
            <TextField {...params} variant="filled" label="Keywords" />
          )}
        />
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <Table size="medium">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell style={{ width: "30%" }}>Title</TableCell>
                  <TableCell style={{ width: "25%" }}>Worked At</TableCell>
                  <TableCell>Technologies</TableCell>
                  <TableCell>Year</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProjects?.map((project) => (
                  <ProjectRow key={project.id} project={project} />
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </Container>
    );
  }

  return (
    <>
      <BackdropLoading isLoading={isPageLoading} />
      {showProjectListing()}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  pageHead: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  formFooter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  paginationWeb: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "25px",
    gap: "10px",
  },
}));

export default ProjectPage;
