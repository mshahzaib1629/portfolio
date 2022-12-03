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
import { Delete, Edit } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchEducationThunk,
  addNewEducationThunk,
  deleteEducationThunk,
  editEducationThunk,
  setEditableEducationAction,
} from "../../redux/slices/educationSlice";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import K from "../../utils/constants";
import { useFormik } from "formik";
import { getYearRange } from "../../utils/common";

function EducationPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { educationList, isLoading, editableEducationId } = useSelector(
    (state) => state.education
  );
  const [showForm, setShowForm] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [educationToDelete, setEducationToDelete] = useState(null);

  const formik = useFormik({
    initialValues: {
      degreeTitle: "",
      school: "",
      location: "",
      duration: {
        startYear: "",
        endYear: "",
        isStudying: false,
      },
      siteUrl: "",
    },
    onSubmit: (values) => formSubmit(values),
  });

  async function getEducationData() {
    try {
      await dispatch(fetchEducationThunk());
    } catch (error) {
      console.log("error: ", error);
    }
  }

  useEffect(() => {
    const targetEducation = educationList.filter(
      (edu) => edu.id === editableEducationId
    )[0];
    if (targetEducation != undefined && targetEducation != null) {
      setShowForm(true);
      formik.setValues(targetEducation);
    }
  }, [editableEducationId]);

  useEffect(() => {
    resetForm();
    if (educationList.length === 0) getEducationData();
  }, []);

  const onEdit = (id) => {
    dispatch(setEditableEducationAction({ educationId: id }));
  };

  const deleteEducation = async () => {
    try {
      setEducationToDelete(null);
      setIsPageLoading(true);
      await dispatch(deleteEducationThunk(educationToDelete));
      setIsPageLoading(false);
      getEducationData();
    } catch (error) {
      console.log("error on deleting expereince: ", error);
    }
  };

  const cancelDelete = () => {
    setEducationToDelete(null);
  };

  const createNewForm = () => {
    dispatch(setEditableEducationAction(null));
    setShowForm(true);
  };

  const resetForm = () => {
    dispatch(setEditableEducationAction(null));
    formik.resetForm();
    setShowForm(false);
  };

  const formSubmit = async (values) => {
    const isEditing = editableEducationId != (null || undefined);
    try {
      setIsPageLoading(true);
      const data = JSON.parse(JSON.stringify(values));

      if (data.duration.isStudying) {
        data["duration"]["endYear"] = "";
      }
      if (isEditing) {
        await dispatch(editEducationThunk(data));
      } else {
        await dispatch(addNewEducationThunk(data));
      }
      setIsPageLoading(false);
      resetForm();
      getEducationData();
    } catch (error) {
      console.log("error on form submission: ", error);
      setIsPageLoading(false);
    }
  };

  function showEducationListing() {
    return (
      <Container>
        <ConfirmDialog
          shouldOpen={educationToDelete != null}
          title="Are you sure?"
          content={`Do you want to delete education ${educationToDelete?.degreeTitle}?`}
          cancelCallback={cancelDelete}
          actionCallback={deleteEducation}
        />
        <div className={classes.pageHead}>
          <h2>Manage Education</h2>
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
                <TableCell>Degree Title</TableCell>
                <TableCell>School</TableCell>
                <TableCell>Start Year</TableCell>
                <TableCell>End Year</TableCell>
                <TableCell>Location</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {educationList?.map((edu) => (
                <TableRow key={edu.id}>
                  <TableCell>{edu.degreeTitle}</TableCell>
                  <TableCell>{edu.school}</TableCell>
                  <TableCell>{edu.duration.startYear}</TableCell>
                  <TableCell>
                    {edu.duration.endYear ? edu.duration.endYear : "cont."}
                  </TableCell>
                  <TableCell>{edu.location}</TableCell>
                  <TableCell align="right">
                    <Edit
                      fontSize="small"
                      style={{ cursor: "pointer" }}
                      onClick={() => onEdit(edu.id)}
                    />
                    {"  "}
                    <Delete
                      fontSize="small"
                      style={{ cursor: "pointer" }}
                      onClick={() => setEducationToDelete(edu)}
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

  function showEducationForm() {
    return (
      <Container>
        <div className={classes.pageHead}>
          <h2>{editableEducationId ? "Edit" : "Add New"} Education</h2>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="degreeTitle"
                label="Degree Title"
                name="degreeTitle"
                value={formik.values.degreeTitle}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="school"
                label="School Name"
                name="school"
                value={formik.values.school}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid container item md={6} className={classes.pageHead}>
              <Grid item md={5.8}>
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
              <Grid item md={5.8}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="end-year-label">End Year</InputLabel>
                  <Select
                    labelId="end-year-label"
                    id="end-year"
                    label="End Year"
                    name="duration.endYear"
                    value={formik.values.duration.endYear}
                    onChange={formik.handleChange}
                    disabled={formik.values.duration.isStudying}
                    required={!formik.values.duration.isStudying}
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
                    name="duration.isStudying"
                    checked={formik.values.duration.isStudying}
                    onChange={formik.handleChange}
                  />
                }
                label="Currently Studing Here"
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                margin="normal"
                fullWidth
                id="siteUrl"
                label="Site URL"
                placeholder="https://"
                name="siteUrl"
                value={formik.values.siteUrl}
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
      {showForm === false ? showEducationListing() : showEducationForm()}
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

export default EducationPage;
