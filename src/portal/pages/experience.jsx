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
import { experienceList } from "../../data";
import { Delete, Edit } from "@material-ui/icons";
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
import { Button } from "@mui/material";
import K from "../../utils/constants";
import { useFormik } from "formik";

function ExperiencePage() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { experienceList, isLoading, editableExperienceId } = useSelector(
    (state) => state.experience
  );
  // TODO: obsolete code
  const [form, setForm] = useState(null);

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
      description: "",
      links: {
        linkedIn: "",
        websiteUrl: "",
      },
    },
    onSubmit: (values) => {
      console.log("formik values: ", values);
      formik.resetForm();
    },
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
    console.log("editing exp: ", targetExperience);
    if (targetExperience != undefined && targetExperience != null) {
      // TODO: obsolete code; update editable form
      setForm(targetExperience);
      // formik.setValues({
      //   company: targetExperience?.company,
      //   jobTitle: targetExperience?.jobTitle,
      //   location: targetExperience?.location,
      //   duration: {
      //     startMonth: targetExperience?.duration?.startMonth,
      //     startYear: targetExperience?.duration?.startYear,
      //     endMonth: targetExperience?.duration?.endMonth,
      //     endYear: targetExperience?.duration?.endYear,
      //     isWorkingHere: targetExperience?.duration?.isWorkingHere,
      //   },
      //   description: targetExperience?.description,
      //   links: {
      //     linkedIn: targetExperience?.links?.linkedIn,
      //     websiteUrl: targetExperience?.links?.websiteUrl,
      //   },
      // });
      // OR simply we can
      formik.setValues(targetExperience);
    }
    // formik.setValues(target)
  }, [editableExperienceId]);

  useEffect(() => {
    resetForm();
    if (experienceList.length === 0) getExperienceData();
  }, []);

  const onEdit = (id) => {
    dispatch(setEditableExperienceAction({ experienceId: id }));
  };

  const onDelete = (experience) => {
    console.log("delete clicked for id=", experience.id);
  };

  const createNewForm = () => {
    dispatch(setEditableExperienceAction(null));
    // TODO: obsolete code
    setForm({});
  };

  const resetForm = () => {
    dispatch(setEditableExperienceAction(null));
    // TODO: obsolete code; update code
    setForm(null);
  };

  const submitForm = (event) => {
    // TODO: obsolete code
    event.preventDefault();
    const isEditing = editableExperienceId != (null || undefined);
    console.log("form: ", form);
    // After saving data in db
    resetForm();
  };

  const handleFormChange = (event) => {
    // TODO: obsolete code
    console.log("event.target: ", event.target.name);
    setForm((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  function showExperienceListing() {
    return (
      <Container>
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
                  <TableCell>{exp.duration.start}</TableCell>
                  <TableCell>{exp.duration.end}</TableCell>
                  <TableCell>{exp.location}</TableCell>
                  <TableCell align="right">
                    <Edit fontSize="small" onClick={() => onEdit(exp.id)} />
                    {"  "}
                    <Delete fontSize="small" onClick={() => onDelete(exp)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Container>
    );
  }

  const getYearRange = () => {
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 20; i <= currentYear; i++) {
      years.push(i);
    }
    return years.sort((a, b) => b - a);
  };

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
                  >
                    {K.app.months.map((month, index) => (
                      <MenuItem id={index} value={month}>
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
                  >
                    {getYearRange().map((year, index) => (
                      <MenuItem id={index} value={year}>
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
                  >
                    {K.app.months.map((month, index) => (
                      <MenuItem id={index} value={month}>
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
                  >
                    {getYearRange().map((year, index) => (
                      <MenuItem id={index} value={year}>
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
                    value={formik.values.duration.isWorkingHere}
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
                id="description"
                name="description"
                label="Description"
                multiline
                fullWidth
                rows={4}
                value={formik.values.description}
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
  // TODO: obsolete code, update condition
  return form === null ? showExperienceListing() : showExperienceForm();
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
