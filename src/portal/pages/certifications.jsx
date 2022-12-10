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
  updateSortingThunk,
  deleteImageThunk,
  updateImageThunk,
  setEditableCertificationAction,
  fetchFeaturedCertificationThunk,
} from "../../redux/slices/certificationSlice";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import K from "../../utils/constants";
import { useFormik } from "formik";

import { getYearRange, getMonthWrtMonthArray } from "../../utils/common";
import FeaturedTag from "../../components/FeaturedTag";

function CertificationPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { certificationList, isLoading, editableCertificationId } = useSelector(
    (state) => state.certification
  );
  const [showForm, setShowForm] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [certificationToDelete, setCertificationToDelete] = useState(null);
  const [newImage, setNewImage] = useState(null);

  const formik = useFormik({
    initialValues: {
      title: "",
      issuedBy: "",
      type: "",
      imageUrl: "",
      imageRef: "",
      isFeatured: false,
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
      (cert) => cert.id === editableCertificationId
    )[0];
    if (targetCertification != undefined && targetCertification != null) {
      setShowForm(true);
      formik.setValues(targetCertification);
      const targetMonth = getMonthWrtMonthArray(
        targetCertification?.date?.month?.index
      );
      targetMonth != undefined
        ? formik.setFieldValue("date.month", targetMonth)
        : formik.setFieldValue("date.month", "");
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
      await dispatch(deleteCertificationThunk(certificationToDelete));
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
    setNewImage(null);
    setShowForm(false);
  };

  const formSubmit = async (values) => {
    const isEditing = editableCertificationId != (null || undefined);
    try {
      setIsPageLoading(true);
      const data = JSON.parse(JSON.stringify(values));

      if (data?.date?.month === "") {
        data.date.month = { index: 0 };
      }
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
        await dispatch(editCertificationThunk(data));
      } else {
        data["index"] = certificationList.length;
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

  const [dragId, setDragId] = useState(null);

  const handleDrag = (ev) => {
    setDragId(ev.currentTarget.id);
  };

  const handleDrop = async (ev) => {
    const dragCertification = certificationList.filter(
      (cert) => cert.id === dragId
    )[0];

    const dropCertification = certificationList.filter(
      (cert) => cert.id === ev.currentTarget.id
    )[0];

    const dragCertificationIndex = dragCertification.index;
    const dropCertificationIndex = dropCertification.index;
    let dragObject = {};
    let dropObject = {};
    const newCertificationState = certificationList.map((cert) => {
      if (cert.id === dragId) {
        let updatedCert = { ...cert, index: dropCertificationIndex };

        dragObject = updatedCert;
      }
      if (cert.id === ev.currentTarget.id) {
        let updatedCert = { ...cert, index: dragCertificationIndex };

        dropObject = updatedCert;
      }
      return cert;
    });

    const newArray = newCertificationState.map((cert) => {
      if (cert.id === dragId) {
        return dropObject;
      }
      if (cert.id === ev.currentTarget.id) {
        return dragObject;
      }
      return cert;
    });
    await dispatch(updateSortingThunk(dropObject, dragObject));
    getCertificationData();
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
                <TableCell></TableCell>
                <TableCell style={{ width: "30%" }}>Title</TableCell>
                <TableCell style={{ width: "25%" }}>Issued By</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {certificationList?.map((cert) => (
                <TableRow
                  key={cert.id}
                  id={cert.id}
                  draggable
                  onDragOver={(ev) => ev.preventDefault()}
                  onDragStart={handleDrag}
                  onDrop={handleDrop}
                >
                  <TableCell style={{ cursor: "pointer" }}>=</TableCell>
                  <TableCell style={{ width: "30%" }}>
                    {cert.title} {cert.isFeatured && <FeaturedTag />}
                  </TableCell>
                  <TableCell style={{ width: "25%" }}>
                    {cert.issuedBy}
                  </TableCell>
                  <TableCell>{cert.type}</TableCell>
                  <TableCell>
                    {cert.date?.month?.shortName} {cert.date?.year}
                  </TableCell>
                  <TableCell align="right">
                    <Edit
                      fontSize="small"
                      style={{ cursor: "pointer" }}
                      onClick={() => onEdit(cert.id)}
                    />
                    {"  "}
                    <Delete
                      style={{ cursor: "pointer" }}
                      fontSize="small"
                      onClick={() => setCertificationToDelete(cert)}
                    />
                    {"  "}
                    {cert.url ? (
                      <a
                        key={cert.id}
                        href={cert.url}
                        style={{ cursor: "pointer" }}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Launch
                          fontSize="small"
                          href={cert.url}
                          style={{ cursor: "pointer" }}
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
                id="issuedBy"
                label="Issued By"
                name="issuedBy"
                value={formik.values.issuedBy}
                onChange={formik.handleChange}
              />
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
                  {K.app.certificateTypes.map((certificate, index) => (
                    <MenuItem id={index} key={index} value={certificate}>
                      {certificate}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                        {month?.shortName}
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
                    value={formik.values.date?.year}
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
    flexDirection: "row",
    justifyContent: "space-between",
  },
  formFooter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
}));

export default CertificationPage;
