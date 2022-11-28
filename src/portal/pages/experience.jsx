import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import BackdropLoading from "../../components/BackdropLoading";
import { Delete, Edit } from "@material-ui/icons";
import { Button } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchExperienceThunk,
  addNewExperienceThunk,
  deleteExperienceThunk,
  editExperienceThunk,
  setEditableExperienceAction,
} from "../../redux/slices/experienceSlice";
import { useState, useEffect } from "react";
import K from "../../utils/constants";
import { useFormik } from "formik";
import ConfirmDialog from "../../components/ConfirmDialog";
import { getYearRange } from "../../utils/common";
function ExperiencePage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { experienceList, isLoading, editableExperienceId } = useSelector(
    (state) => state.experience
  );
  const [showForm, setShowForm] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [experienceToDelete, setExperienceToDelete] = useState(null);

  const formik = useFormik({
    initialValues: {
      company: "",
      jobTitle: "",
      location: "",
      duration: {
        startMonth: "",
        startYear: "",
        endMonth: "",
        endYear: "",
        isWorkingHere: false,
      },
      overview: "",
      links: {
        linkedIn: "",
        websiteUrl: "",
      },
    },
    onSubmit: (values) => formSubmit(values),
  });

  async function getExperienceData() {
    try {
      await dispatch(fetchExperienceThunk());
    } catch (error) {
      console.log("error: ", error);
    }
  }

  useEffect(() => {
    const targetExperience = experienceList.filter(
      (exp) => exp.id === editableExperienceId
    )[0];
    if (targetExperience != undefined && targetExperience != null) {
      setShowForm(true);
      formik.setValues(targetExperience);
    }
  }, [editableExperienceId]);

  useEffect(() => {
    resetForm();
    if (experienceList.length === 0) getExperienceData();
  }, []);

  const onEdit = (id) => {
    dispatch(setEditableExperienceAction({ experienceId: id }));
  };

  const deleteExperience = async () => {
    try {
      setExperienceToDelete(null);
      setIsPageLoading(true);
      await dispatch(deleteExperienceThunk(experienceToDelete.id));
      setIsPageLoading(false);
      getExperienceData();
    } catch (error) {
      console.log("error on deleting expereince: ", error);
    }
  };

  const cancelDelete = () => {
    setExperienceToDelete(null);
  };

  const createNewForm = () => {
    dispatch(setEditableExperienceAction(null));
    setShowForm(true);
  };

  const resetForm = () => {
    dispatch(setEditableExperienceAction(null));
    formik.resetForm();
    setShowForm(false);
  };

  const formSubmit = async (values) => {
    console.log("formik values: ", values);
    const isEditing = editableExperienceId != (null || undefined);
    try {
      setIsPageLoading(true);
      const data = JSON.parse(JSON.stringify(values));

      if (data.duration.isWorkingHere) {
        data["duration"]["endMonth"] = "";
        data["duration"]["endYear"] = "";
      }
      console.log("form data: ", data);
      if (isEditing) {
        await dispatch(editExperienceThunk(data));
      } else {
        await dispatch(addNewExperienceThunk(data));
      }
      setIsPageLoading(false);
      resetForm();
      getExperienceData();
    } catch (error) {
      console.log("error on form submission: ", error);
      setIsPageLoading(false);
    }
  };

  function showExperienceListing() {
    return (
      <Container>
        <ConfirmDialog
          shouldOpen={experienceToDelete != null}
          title="Are you sure?"
          content={`Do you want to delete experience at ${experienceToDelete?.company}?`}
          cancelCallback={cancelDelete}
          actionCallback={deleteExperience}
        />
        <div className={classes.pageHead}>
          <h2>Manage Experience</h2>
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
                <TableCell>Company</TableCell>
                <TableCell>Job Title</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Location</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {experienceList?.map((exp) => (
                <TableRow key={exp.id}>
                  <TableCell>{exp.company}</TableCell>
                  <TableCell>{exp.jobTitle}</TableCell>
                  <TableCell>
                    {exp.duration.startMonth} {exp.duration.startYear}
                  </TableCell>
                  <TableCell>
                    {exp.duration.endMonth && exp.duration.endYear
                      ? `${exp.duration.endMonth} ${exp.duration.endYear}`
                      : "cont."}
                  </TableCell>
                  <TableCell>{exp.location}</TableCell>
                  <TableCell align="right">
                    <Edit
                      fontSize="small"
                      style={{ cursor: "pointer" }}
                      onClick={() => onEdit(exp.id)}
                    />
                    {"  "}
                    <Delete
                      fontSize="small"
                      style={{ cursor: "pointer" }}
                      onClick={() => setExperienceToDelete(exp)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Container>
    );
  }

  function showExperienceForm() {
    return (
      <Container>
        <div className={classes.pageHead}>
          <h2>{editableExperienceId ? "Edit" : "Add New"} Experience</h2>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="company"
                label="Company Name"
                name="company"
                value={formik.values.company}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="jobTitle"
                label="Job Title"
                name="jobTitle"
                value={formik.values.jobTitle}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid container item md={6} className={classes.pageHead}>
              <Grid item md={3}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="start-month-label">Start Month</InputLabel>
                  <Select
                    labelId="start-month-label"
                    id="start-month"
                    label="Start Month"
                    name="duration.startMonth"
                    value={formik.values.duration.startMonth}
                    onChange={formik.handleChange}
                    required
                  >
                    {K.app.months.map((month, index) => (
                      <MenuItem id={index} key={index} value={month}>
                        {month}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item md={2.5}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="start-year-label">Start Year</InputLabel>
                  <Select
                    labelId="start-year-label"
                    id="start-year"
                    label="Start Year"
                    name="duration.startYear"
                    value={formik.values.duration.startYear}
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
              <Grid item md={3}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="end-month-label">End Month</InputLabel>
                  <Select
                    labelId="end-month-label"
                    id="end-month"
                    label="End Month"
                    name="duration.endMonth"
                    value={formik.values.duration.endMonth}
                    onChange={formik.handleChange}
                    disabled={formik.values.duration.isWorkingHere}
                    required={!formik.values.duration.isWorkingHere}
                  >
                    {K.app.months.map((month, index) => (
                      <MenuItem id={index} key={index} value={month}>
                        {month}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={2.5}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="end-year-label">End Year</InputLabel>
                  <Select
                    labelId="end-year-label"
                    id="end-year"
                    label="End Year"
                    name="duration.endYear"
                    value={formik.values.duration.endYear}
                    onChange={formik.handleChange}
                    disabled={formik.values.duration.isWorkingHere}
                    required={!formik.values.duration.isWorkingHere}
                  >
                    {getYearRange().map((year, index) => (
                      <MenuItem id={index} key={index} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item md={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="location"
                label="Location"
                placeholder="City, Country"
                name="location"
                value={formik.values.location}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item md={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="duration.isWorkingHere"
                    checked={formik.values.duration.isWorkingHere}
                    onChange={formik.handleChange}
                  />
                }
                label="Currently Working Here"
              />
            </Grid>
            <Grid item md={12}>
              <TextField
                margin="normal"
                required
                id="overview"
                name="overview"
                label="Overview"
                multiline
                fullWidth
                rows={4}
                value={formik.values.overview}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                margin="normal"
                fullWidth
                id="linkedInUrl"
                label="LinkedIn URL"
                placeholder="https://www.linkedin.com/in/"
                name="links.linkedIn"
                value={formik.values.links.linkedIn}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                margin="normal"
                fullWidth
                id="websiteUrl"
                label="Website URL"
                placeholder="https://"
                name="links.websiteUrl"
                value={formik.values.links.websiteUrl}
                onChange={formik.handleChange}
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
  return (
    <>
      <BackdropLoading isLoading={isPageLoading} />
      {showForm === false ? showExperienceListing() : showExperienceForm()}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  pageHead: {
    display: "flex",
    "flex-direction": "row",
    "justify-content": "space-between",
  },
  formFooter: {
    display: "flex",
    "flex-direction": "row",
    "justify-content": "flex-end",
  },
}));

export default ExperiencePage;
