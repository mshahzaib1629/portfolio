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

function ExperiencePage() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { experienceList, isLoading, editableExperienceId } = useSelector(
    (state) => state.experience
  );
  const [form, setForm] = useState(null);

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
    if (targetExperience != undefined && targetExperience != null)
      setForm(targetExperience);
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
    setForm({});
  };

  const resetForm = () => {
    dispatch(setEditableExperienceAction(null));
    setForm(null);
  };

  const submitForm = (event) => {
    event.preventDefault();
    const isEditing = editableExperienceId != (null || undefined);
    
    // After saving data in db
    resetForm();
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
        <form onSubmit={submitForm}>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="company"
                label="Company Name"
                name="company"
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
              />
            </Grid>
            <Grid container item md={6} className={classes.pageHead}>
              <Grid md={3}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="start-month-label">Start Month</InputLabel>
                  <Select
                    labelId="start-month-label"
                    id="start-month"
                    // value={form.year}
                    label="Start Month"
                    // onChange={handleChange}
                  >
                    {K.app.months.map((month, index) => (
                      <MenuItem id={index} value={month}>
                        {month}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid md={2.5}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="start-year-label">Start Year</InputLabel>
                  <Select
                    labelId="start-year-label"
                    id="start-year"
                    // value={form.year}
                    label="Start Year"
                    // onChange={handleChange}
                  >
                    {getYearRange().map((year, index) => (
                      <MenuItem id={index} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid md={3}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="end-month-label">End Month</InputLabel>
                  <Select
                    labelId="end-month-label"
                    id="end-month"
                    // value={form.year}
                    label="End Month"
                    // onChange={handleChange}
                  >
                    {K.app.months.map((month, index) => (
                      <MenuItem id={index} value={month}>
                        {month}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid md={2.5}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="end-year-label">End Year</InputLabel>
                  <Select
                    labelId="end-year-label"
                    id="end-year"
                    // value={form.year}
                    label="End Year"
                    // onChange={handleChange}
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
              />
            </Grid>
            <Grid item md={12}>
              <FormControlLabel
                control={<Checkbox />}
                label="Currently Working Here"
              />
            </Grid>
            <Grid item md={12}>
              <TextField
                margin="normal"
                required
                id="description"
                label="Description"
                multiline
                fullWidth
                rows={4}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                margin="normal"
                fullWidth
                id="facebookUrl"
                label="Facebook URL"
                placeholder="https://www.facebook.com/"
                name="facebookUrl"
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                margin="normal"
                fullWidth
                id="linkedInUrl"
                label="LinkedIn URL"
                placeholder="https://www.linkedin.com/in/"
                name="linkedInUrl"
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                margin="normal"
                fullWidth
                id="websiteUrl"
                label="Website URL"
                placeholder="https://"
                name="websiteUrl"
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
