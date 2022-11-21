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
            <Grid container item md={6}>
              <Grid item md={12}>
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
              <Grid item md={12}>
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
              <Grid container item md={12} className={classes.pageHead}>
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
            </Grid>
            <Grid container item md={6}>
              {/* @TODO: This should be file picker of url image reader */}
              <Grid item md={12}>
                <FormControl
                  margin="normal"
                  style={{
                    display: "flex",
                    "flex-direction": "row",
                    "justify-content": "space-between",
                    "alignItems": "center"
                  }}
                >
                  <img
                    width={70}
                    height={55}
                    src="data:image/jpeg;base64,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"
                    alt="img"
                    // style={{marginRight: "5px"}}
                  />
                  <Button variant="outlined" component="label" >
                    Upload Image
                    <input hidden accept="image/*" type="file" />
                  </Button>
                </FormControl>
              </Grid>
              <Grid item md={12}>
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
              <Grid item md={12}>
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
