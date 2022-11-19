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
import {
  fetchCertificationThunk,
  addNewCertificationThunk,
  deleteCertificationThunk,
  editCertificationThunk,
  setEditableCertificationAction,
} from "../../redux/slices/certificationSlice";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import K from "../../utils/constants";
import { useFormik } from "formik";

function CertificationPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { certificationList, isLoading, editableCertificationId } = useSelector(
    (state) => state.certification
  );
  const [showForm, setShowForm] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [certificationToDelete, setCertificationToDelete] = useState(null);

  const formik = useFormik({
    initialValues: {
      title: "",
      issuedBy: "",
      type: "",
      imageUrl: "",
      date: {
        year: "",
        month: "",
      },
      url: "",
    },
    onSubmit: (values) => formSubmit(values),
  });

  async function getCertificationData() {
    try {
      await dispatch(fetchCertificationThunk());
    } catch (error) {
      console.log("error: ", error);
    }
  }

  useEffect(() => {
    const targetCertification = certificationList.filter(
      (exp) => exp.id === editableCertificationId
    )[0];
    if (targetCertification != undefined && targetCertification != null) {
      setShowForm(true);
      formik.setValues(targetCertification);
    }
  }, [editableCertificationId]);

  useEffect(() => {
    resetForm();
    if (certificationList.length === 0) getCertificationData();
  }, []);

  const onEdit = (id) => {
    dispatch(setEditableCertificationAction({ certificationId: id }));
  };

  const deleteCertification = async () => {
    try {
      setCertificationToDelete(null);
      setIsPageLoading(true);
      await dispatch(deleteCertificationThunk(certificationToDelete.id));
      setIsPageLoading(false);
      getCertificationData();
    } catch (error) {
      console.log("error on deleting expereince: ", error);
    }
  };

  const cancelDelete = () => {
    setCertificationToDelete(null);
  };

  const createNewForm = () => {
    dispatch(setEditableCertificationAction(null));
    setShowForm(true);
  };

  const resetForm = () => {
    dispatch(setEditableCertificationAction(null));
    formik.resetForm();
    setShowForm(false);
  };

  const formSubmit = async (values) => {
    const isEditing = editableCertificationId != (null || undefined);
    try {
      setIsPageLoading(true);
      const data = JSON.parse(JSON.stringify(values));
      if (isEditing) {
        await dispatch(editCertificationThunk(data));
      } else {
        await dispatch(addNewCertificationThunk(data));
      }
      setIsPageLoading(false);
      resetForm();
      getCertificationData();
    } catch (error) {
      console.log("error on form submission: ", error);
      setIsPageLoading(false);
    }
  };

  function showCertificationListing() {
    return (
      <Container>
        <ConfirmDialog
          shouldOpen={certificationToDelete != null}
          title="Are you sure?"
          content={`Do you want to delete certificate of ${certificationToDelete?.title}?`}
          cancelCallback={cancelDelete}
          actionCallback={deleteCertification}
        />
        <div className={classes.pageHead}>
          <h2>Manage Certificatons</h2>
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
                <TableCell>Title</TableCell>
                <TableCell>Issued By</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {certificationList?.map((cert) => (
                <TableRow key={cert.id}>
                  <TableCell>{cert.title}</TableCell>
                  <TableCell>{cert.issuedBy}</TableCell>
                  <TableCell>{cert.type}</TableCell>
                  <TableCell>
                    {cert.date.month} {cert.date.year}
                  </TableCell>
                  <TableCell align="right">
                    <Edit fontSize="small" onClick={() => onEdit(cert.id)} />
                    {"  "}
                    <Delete
                      fontSize="small"
                      onClick={() => setCertificationToDelete(cert)}
                    />
                    {"  "}
                    {cert.url ? (
                      <a
                        key={cert.id}
                        href={cert.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Launch
                          fontSize="small"
                          href={cert.url}
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

  const getYearRange = () => {
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 20; i <= currentYear; i++) {
      years.push(i);
    }
    return years.sort((a, b) => b - a);
  };

  function showCertificationForm() {
    return (
      <Container>
        <div className={classes.pageHead}>
          <h2>{editableCertificationId ? "Edit" : "Add New"} Certificate</h2>
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
              <TextField
                margin="normal"
                required
                fullWidth
                id="issuedBy"
                label="Issued By"
                name="issuedBy"
                value={formik.values.issuedBy}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid container item md={6} className={classes.pageHead}>
              <Grid item md={5.8}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="month-label">Month</InputLabel>
                  <Select
                    labelId="month-label"
                    id="month"
                    label="Month"
                    name="date.month"
                    value={formik.values.date.month}
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
              <Grid item md={5.8}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="year-label">Year</InputLabel>
                  <Select
                    labelId="year-label"
                    id="year"
                    label="Year"
                    name="date.year"
                    value={formik.values.date.year}
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
            </Grid>
            <Grid item md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="type-label">Certificate Type</InputLabel>
                <Select
                  labelId="type-label"
                  id="type"
                  label="Certificate Type"
                  name="type"
                  value={formik.values.type}
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
            {/* @TODO: This should be file picker of url image reader */}
            {/* <Grid item md={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="imageUrl"
                label="Image"
                name="imageUrl"
                value={formik.values.imageUrl}
                onChange={formik.handleChange}
              />
            </Grid> */}
            <Grid item md={6}>
              <TextField
                margin="normal"
                fullWidth
                id="url"
                label="Certificate URL"
                placeholder="https://"
                name="url"
                value={formik.values.url}
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
      {showForm === false
        ? showCertificationListing()
        : showCertificationForm()}
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

export default CertificationPage;
