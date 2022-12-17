import * as React from "react";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import BackdropLoading from "../../components/BackdropLoading";
import ConfirmDialog from "../../components/ConfirmDialog";
import { Delete, Edit, Launch } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import MuiAlert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Snackbar from "@mui/material/Snackbar";
import {
  fetchProjectThunk,
  addNewProjectThunk,
  deleteProjectThunk,
  editProjectThunk,
  updateSortingThunk,
  deleteImageThunk,
  updateImageThunk,
  setEditableProjectAction,
  fetchFeaturedProjectThunk,
} from "../../redux/slices/projectSlice";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useFormik } from "formik";

import {
  getYearRange,
  convertArrayToString,
  convertStringToArray,
} from "../../utils/common";
import FeaturedTag from "../../components/FeaturedTag";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ProjectPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { projectList, isLoading, editableProjectId } = useSelector(
    (state) => state.project
  );
  const [showForm, setShowForm] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [snackAlert, setSnackAlert] = useState(null);
  const [dragId, setDragId] = useState(null);

  const formik = useFormik({
    initialValues: {
      title: "",
      projectType: "",
      workedAt: "",
      isFeatured: false,
      overview: "",
      extendedOverview: "",
      year: "",
      technologies: "",
      imageUrl: "",
      imageRef: "",
      links: {
        code: "",
        url: "",
      },
    },
    onSubmit: (values) => formSubmit(values),
  });

  async function getProjectData() {
    try {
      await dispatch(fetchProjectThunk());
    } catch (error) {
      console.log("error: ", error);
    }
  }

  useEffect(() => {
    let targetProject = projectList.filter(
      (project) => project.id === editableProjectId
    )[0];

    if (targetProject != undefined && targetProject != null) {
      targetProject = JSON.parse(JSON.stringify(targetProject));
      targetProject["technologies"] = convertArrayToString(
        targetProject["technologies"]
      );

      setShowForm(true);
      formik.setValues(targetProject);
    }
  }, [editableProjectId]);

  useEffect(() => {
    resetForm();
    if (projectList.length === 0) getProjectData();
  }, []);

  const onEdit = (id) => {
    dispatch(setEditableProjectAction({ projectId: id }));
  };

  const deleteProject = async () => {
    try {
      setProjectToDelete(null);
      setIsPageLoading(true);
      await dispatch(deleteProjectThunk(projectToDelete));
      setIsPageLoading(false);
      getProjectData();
    } catch (error) {
      console.log("error on deleting expereince: ", error);
    }
  };

  const cancelDelete = () => {
    setProjectToDelete(null);
  };

  const createNewForm = () => {
    dispatch(setEditableProjectAction(null));
    setShowForm(true);
  };

  const resetForm = () => {
    dispatch(setEditableProjectAction(null));
    formik.resetForm();
    setNewImage(null);
    setShowForm(false);
  };

  const formSubmit = async (values) => {
    const isEditing = editableProjectId != (null || undefined);
    try {
      // if (values.imageUrl === "" && !newImage && values.isFeatured) {
      //   setSnackAlert({
      //     severity: "error",
      //     title: "Error",
      //     message: "Image required!",
      //   });
      //   return;
      // }
      setIsPageLoading(true);
      const data = JSON.parse(JSON.stringify(values));
      data["technologies"] = convertStringToArray(data["technologies"]);
      if (newImage) {
        const { imageUrl, imageRef } = await dispatch(
          updateImageThunk(data["imageRef"], newImage?.imageFile)
        );
        data["imageUrl"] = imageUrl;
        data["imageRef"] = imageRef;
      } else if (data.imageUrl === "" && data.imageRef != "") {
        await dispatch(deleteImageThunk(data.imageRef));
        data["imageRef"] = "";
      }

      if (isEditing) {
        await dispatch(editProjectThunk(data));
      } else {
        data["index"] = projectList.length;
        await dispatch(addNewProjectThunk(data));
      }
      setIsPageLoading(false);
      resetForm();
      getProjectData();
    } catch (error) {
      console.log("error on form submission: ", error);
      setIsPageLoading(false);
    }
  };

  const closeSnackAlert = () => {
    setSnackAlert(null);
  };
  const handleDrag = (ev) => {
    setDragId(ev.currentTarget.id);
  };

  const handleDrop = async (ev) => {
    const dragProject = projectList.filter(
      (project) => project.id === dragId
    )[0];

    const dropProject = projectList.filter(
      (project) => project.id === ev.currentTarget.id
    )[0];

    const dragProjectIndex = dragProject.index;
    const dropProjectIndex = dropProject.index;
    let dragObject = {};
    let dropObject = {};
    const newProjectState = projectList.map((project) => {
      if (project.id === dragId) {
        let updatedCert = { ...project, index: dropProjectIndex };

        dragObject = updatedCert;
      }
      if (project.id === ev.currentTarget.id) {
        let updatedCert = { ...project, index: dragProjectIndex };

        dropObject = updatedCert;
      }
      return project;
    });

    const newArray = newProjectState.map((project) => {
      if (project.id === dragId) {
        return dropObject;
      }
      if (project.id === ev.currentTarget.id) {
        return dragObject;
      }
      return project;
    });
    await dispatch(updateSortingThunk(dropObject, dragObject));
    getProjectData();
  };

  const handleNewImage = (event) => {
    const imageFile = event.currentTarget.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onloadend = () => {
      setNewImage({
        imageFile: imageFile,
        thumbnail: reader.result,
      });
    };
  };

  const deleteImage = () => {
    formik.setFieldValue("imageUrl", "");
    setNewImage(null);
  };

  function showProjectListing() {
    return (
      <Container>
        <ConfirmDialog
          shouldOpen={projectToDelete != null}
          title="Are you sure?"
          content={`Do you want to delete project ${projectToDelete?.title}?`}
          cancelCallback={cancelDelete}
          actionCallback={deleteProject}
        />
        <div className={classes.pageHead}>
          <h2>Manage Projects</h2>
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
            onClick={createNewForm}
          >
            + Add New
          </Button>
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell style={{ width: "30%" }}>Title</TableCell>
                <TableCell style={{ width: "25%" }}>Worked At</TableCell>
                <TableCell>Technologies</TableCell>
                <TableCell>Year</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projectList?.map((project) => (
                <TableRow
                  key={project.id}
                  id={project.id}
                  draggable
                  onDragOver={(ev) => ev.preventDefault()}
                  onDragStart={handleDrag}
                  onDrop={handleDrop}
                >
                  <TableCell style={{ cursor: "pointer" }}>=</TableCell>
                  <TableCell>
                    {project.title} {project.isFeatured && <FeaturedTag />}
                  </TableCell>
                  <TableCell>{project.workedAt}</TableCell>
                  <TableCell style={{ width: "40%" }}>
                    {convertArrayToString(project.technologies)}
                  </TableCell>
                  <TableCell>{project.year}</TableCell>
                  <TableCell align="right">
                    <Edit
                      fontSize="small"
                      style={{ cursor: "pointer" }}
                      onClick={() => onEdit(project.id)}
                    />
                    {"  "}
                    <Delete
                      style={{ cursor: "pointer" }}
                      fontSize="small"
                      onClick={() => setProjectToDelete(project)}
                    />
                    {"  "}
                    {project.url ? (
                      <a
                        key={project.id}
                        href={project.url}
                        style={{ cursor: "pointer" }}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Launch
                          fontSize="small"
                          href={project.url}
                          target="_blank"
                          rel="noreferrer"
                        />
                      </a>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Container>
    );
  }

  function showProjectForm() {
    return (
      <Container>
        <div className={classes.pageHead}>
          <h2>{editableProjectId ? "Edit" : "Add New"} Project</h2>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item md={6}>
              <FormControl
                margin="normal"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {newImage || formik.values.imageUrl ? (
                  <div>
                    <img
                      width={70}
                      height={55}
                      src={
                        newImage ? newImage?.thumbnail : formik.values.imageUrl
                      }
                      alt={newImage?.imageFile?.name}
                    />
                  </div>
                ) : (
                  <sub>No Image Uploaded...</sub>
                )}
                <div>
                  {newImage != null || formik?.values?.imageUrl ? (
                    <Button
                      variant="outlined"
                      component="label"
                      onClick={deleteImage}
                    >
                      X
                    </Button>
                  ) : null}
                  <Button variant="outlined" component="label">
                    Upload Image
                    <input
                      hidden
                      id="imageFile"
                      name="imageFile"
                      accept="image/*"
                      type="file"
                      onChange={handleNewImage}
                    />
                  </Button>
                </div>
              </FormControl>
            </Grid>
            <Grid item md={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="workedAt"
                label="Worked At"
                name="workedAt"
                value={formik.values.workedAt}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="year-label">Year</InputLabel>
                <Select
                  labelId="year-label"
                  id="year"
                  label="Year"
                  name="year"
                  value={formik.values.year}
                  onChange={formik.handleChange}
                  required
                >
                  {getYearRange().map((year, index) => (
                    <MenuItem id={index} key={index} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={12}>
              <TextField
                margin="normal"
                required={formik.values.isFeatured}
                id="overview"
                name="overview"
                label="Overview"
                multiline
                fullWidth
                rows={2}
                value={formik.values.overview}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item md={12}>
              <TextField
                margin="normal"
                required={formik.values.isFeatured}
                id="extendedOverview"
                name="extendedOverview"
                label="Extended Overview"
                multiline
                fullWidth
                rows={4}
                value={formik.values.extendedOverview}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item md={12}>
              <TextField
                margin="normal"
                required
                id="technologies"
                name="technologies"
                label="Technologies Used"
                multiline
                fullWidth
                rows={2}
                value={formik.values.technologies}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                margin="normal"
                fullWidth
                id="project-type"
                label="Project Type"
                name="projectType"
                value={formik.values.projectType}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                margin="normal"
                fullWidth
                id="links-url"
                label="Project Url"
                name="links.url"
                value={formik.values.links.url}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                margin="normal"
                fullWidth
                id="links-code"
                label="Codebase Url"
                name="links.code"
                value={formik.values.links.code}
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid item md={6}>
              <FormControlLabel
                margin="normal"
                control={
                  <Checkbox
                    name="isFeatured"
                    checked={formik.values.isFeatured}
                    onChange={formik.handleChange}
                  />
                }
                label="Mark Featured"
              />
            </Grid>
          </Grid>

          <div className={classes.formFooter}>
            <Button
              variant="text"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
              onClick={resetForm}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{ mt: 3, mb: 2, ml: 3 }}
              disabled={isLoading}
              type="submit"
            >
              Save
            </Button>
          </div>
        </form>
      </Container>
    );
  }

  const snackbar = () => (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      severity={snackAlert?.severity}
      autoHideDuration={6000}
      open={snackAlert ? true : false}
      onClose={closeSnackAlert}
    >
      <Alert
        onClose={closeSnackAlert}
        severity={snackAlert?.severity}
        sx={{ width: "100%" }}
      >
        {snackAlert?.title && <AlertTitle>{snackAlert?.title}</AlertTitle>}
        {snackAlert?.message}
      </Alert>
    </Snackbar>
  );

  return (
    <>
      <BackdropLoading isLoading={isPageLoading} />
      {snackbar()}
      {showForm === false ? showProjectListing() : showProjectForm()}
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
}));

export default ProjectPage;
