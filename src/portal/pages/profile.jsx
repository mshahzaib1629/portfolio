import * as React from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import BackdropLoading from "../../components/BackdropLoading";
import { makeStyles } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProfileThunk,
  editProfileThunk,
  deleteImageThunk,
  updateImageThunk,
  updateResumeThunk,
  deleteResumeThunk,
} from "../../redux/slices/profileSlice";
import { Launch } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import K from "../../utils/constants";
import { useFormik } from "formik";
import MuiAlert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Snackbar from "@mui/material/Snackbar";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ProfilePage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { profile, isLoading } = useSelector((state) => state.profile);
  const [isEditable, setEditable] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [newResume, setNewResume] = useState(null);
  const [snackAlert, setSnackAlert] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      headline: "",
      location: "",
      shortIntro: "",
      about: "",
      imageUrl: "",
      imageRef: "",
      resumeUrl: "",
      resumeRef: "",
      social: {
        email: "",
        linkedIn: "",
        github: "",
      },
    },
    onSubmit: (values) => formSubmit(values),
  });

  async function getProfileData() {
    try {
      await dispatch(fetchProfileThunk());
    } catch (error) {
      console.log("error: ", error);
    }
  }

  useEffect(() => {
    if (!profile) getProfileData();
  }, []);

  useEffect(() => {
    if (profile) {
      formik.setValues(profile);
    }
  }, [profile]);

  const resetForm = () => {
    setEditable(false);
    if (profile != null && Object.keys(profile).length > 0) {
      formik.setValues(profile);
    } else {
      formik.resetForm();
    }
  };

  const closeSnackAlert = () => {
    setSnackAlert(null);
  };

  const formSubmit = async (values) => {
    try {
      if (values.imageUrl === "" && !newImage) {
        setSnackAlert({
          severity: "error",
          title: "Error",
          message: "Image required!",
        });
        return;
      } else if (values.resumeUrl === "" && !newResume) {
        setSnackAlert({
          severity: "error",
          title: "Error",
          message: "Resume required!",
        });
        return;
      }
      setIsPageLoading(true);
      const data = JSON.parse(JSON.stringify(values));

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

      if (newResume) {
        const { resumeUrl, resumeRef } = await dispatch(
          updateResumeThunk(data["resumeRef"], newResume?.file)
        );
        data["resumeUrl"] = resumeUrl;
        data["resumeRef"] = resumeRef;
      } else if (data.resumeUrl === "" && data.resumeRef != "") {
        await dispatch(deleteResumeThunk(data.resumeRef));
        data["resumeRef"] = "";
      }

      await dispatch(editProfileThunk(data));
      setIsPageLoading(false);
      setEditable(false);
      getProfileData();
    } catch (error) {
      console.log("error on form submission: ", error);
      setIsPageLoading(false);
    }
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

  const handleNewResume = (event) => {
    const resumeFile = event.currentTarget.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(resumeFile);
    reader.onloadend = () => {
      setNewResume({
        file: resumeFile,
        thumbnail: reader.result,
      });
    };
  };

  const deleteResume = () => {
    formik.setFieldValue("resumeUrl", "");
    setNewResume(null);
  };

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

  function showProfileForm() {
    return (
      <Container>
        <div className={classes.pageHead}>
          <h2>Manage Profile</h2>
          {!isEditable && (
            <Button
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
              onClick={() => {
                setEditable(true);
              }}
            >
              Edit
            </Button>
          )}
        </div>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <TextField
                margin="normal"
                required
                disabled={!isEditable}
                fullWidth
                id="name"
                label="Name"
                name="name"
                value={formik.values.name}
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
                {isEditable && (
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
                )}
              </FormControl>
            </Grid>
            <Grid item md={6}>
              <TextField
                margin="normal"
                required
                disabled={!isEditable}
                fullWidth
                id="headline"
                label="Headline"
                name="headline"
                value={formik.values.headline}
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
                {newResume || formik.values.resumeUrl ? (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <sub style={{ fontWeight: "bold" }}>
                      {newResume
                        ? newResume?.file?.name
                        : formik.values.resumeRef.split("/")[1]}
                    </sub>
                    {formik.values.resumeUrl && (
                      <>
                        &nbsp;
                        <a
                          href={formik.values.resumeUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Launch fontSize="small" />
                        </a>
                      </>
                    )}
                  </div>
                ) : (
                  <sub>No Resume Uploaded...</sub>
                )}
                {isEditable && (
                  <div>
                    {newResume != null || formik?.values?.resumeUrl ? (
                      <Button
                        variant="outlined"
                        component="label"
                        onClick={deleteResume}
                      >
                        X
                      </Button>
                    ) : null}
                    <Button variant="outlined" component="label">
                      Upload Resume
                      <input
                        hidden
                        id="resumeFile"
                        name="resumeFile"
                        accept="pdf/*"
                        type="file"
                        onChange={handleNewResume}
                      />
                    </Button>
                  </div>
                )}
              </FormControl>
            </Grid>
            <Grid item md={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                disabled={!isEditable}
                id="shortIntro"
                label="Short Introduction"
                name="shortIntro"
                value={formik.values.shortIntro}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item md={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                disabled={!isEditable}
                id="about"
                label="About Me"
                name="about"
                multiline
                rows={4}
                value={formik.values.about}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                disabled={!isEditable}
                id="location"
                label="Location"
                name="location"
                value={formik.values.location}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                disabled={!isEditable}
                id="social-email"
                label="Email"
                name="social.email"
                value={formik.values.social?.email}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                disabled={!isEditable}
                id="social-linkedIn"
                label="LinkedIn"
                name="social.linkedIn"
                value={formik.values.social?.linkedIn}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                disabled={!isEditable}
                id="social-github"
                label="Github"
                name="social.github"
                value={formik.values.social?.github}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>

          {isEditable && (
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
          )}
        </form>
      </Container>
    );
  }
  return (
    <>
      <BackdropLoading isLoading={isPageLoading} />
      {snackbar()}
      {showProfileForm()}
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

export default ProfilePage;
