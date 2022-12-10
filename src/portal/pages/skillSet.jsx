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
  fetchSkillSetThunk,
  addNewSkillSetThunk,
  deleteSkillSetThunk,
  editSkillSetThunk,
  updateSortingThunk,
  deleteImageThunk,
  updateImageThunk,
  setEditableSkillSetAction,
} from "../../redux/slices/skillSetSlice";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useFormik } from "formik";

import {
  convertArrayToString,
  convertStringToArray,
} from "../../utils/common";

function SkillSetPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { skillSetList, isLoading, editableSkillSetId } = useSelector(
    (state) => state.skillSet
  );
  const [showForm, setShowForm] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [skillSetToDelete, setSkillSetToDelete] = useState(null);

  const formik = useFormik({
    initialValues: {
      skillSetTitle: "",
      data: "",
    },
    onSubmit: (values) => formSubmit(values),
  });

  async function getSkillSetData() {
    try {
      await dispatch(fetchSkillSetThunk());
    } catch (error) {
      console.log("error: ", error);
    }
  }

  useEffect(() => {
    let targetSkillSet = skillSetList.filter(
      (skill) => skill.id === editableSkillSetId
    )[0];
    if (targetSkillSet != undefined && targetSkillSet != null) {
      targetSkillSet = JSON.parse(JSON.stringify(targetSkillSet));
      targetSkillSet["data"] = convertArrayToString(targetSkillSet["data"]);
      setShowForm(true);
      formik.setValues(targetSkillSet);
    }
  }, [editableSkillSetId]);

  useEffect(() => {
    resetForm();
    if (skillSetList.length === 0) getSkillSetData();
  }, []);

  const onEdit = (id) => {
    dispatch(setEditableSkillSetAction({ skillSetId: id }));
  };

  const deleteSkillSet = async () => {
    try {
      setSkillSetToDelete(null);
      setIsPageLoading(true);
      await dispatch(deleteSkillSetThunk(skillSetToDelete));
      setIsPageLoading(false);
      getSkillSetData();
    } catch (error) {
      console.log("error on deleting expereince: ", error);
    }
  };

  const cancelDelete = () => {
    setSkillSetToDelete(null);
  };

  const createNewForm = () => {
    dispatch(setEditableSkillSetAction(null));
    setShowForm(true);
  };

  const resetForm = () => {
    dispatch(setEditableSkillSetAction(null));
    formik.resetForm();
    setShowForm(false);
  };

  const formSubmit = async (values) => {
    const isEditing = editableSkillSetId != (null || undefined);
    try {
      setIsPageLoading(true);
      const data = JSON.parse(JSON.stringify(values));
      data["data"] = convertStringToArray(data["data"]);
      if (isEditing) {
        await dispatch(editSkillSetThunk(data));
      } else {
        data["index"] = skillSetList.length;
        await dispatch(addNewSkillSetThunk(data));
      }
      setIsPageLoading(false);
      resetForm();
      getSkillSetData();
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
    const dragSkillSet = skillSetList.filter((skill) => skill.id === dragId)[0];

    const dropSkillSet = skillSetList.filter(
      (skill) => skill.id === ev.currentTarget.id
    )[0];

    const dragSkillSetIndex = dragSkillSet.index;
    const dropSkillSetIndex = dropSkillSet.index;
    let dragObject = {};
    let dropObject = {};
    const newSkillSetState = skillSetList.map((skill) => {
      if (skill.id === dragId) {
        let updatedCert = { ...skill, index: dropSkillSetIndex };

        dragObject = updatedCert;
      }
      if (skill.id === ev.currentTarget.id) {
        let updatedCert = { ...skill, index: dragSkillSetIndex };

        dropObject = updatedCert;
      }
      return skill;
    });

    const newArray = newSkillSetState.map((skill) => {
      if (skill.id === dragId) {
        return dropObject;
      }
      if (skill.id === ev.currentTarget.id) {
        return dragObject;
      }
      return skill;
    });
    await dispatch(updateSortingThunk(dropObject, dragObject));
    getSkillSetData();
  };

  function showSkillSetListing() {
    return (
      <Container>
        <ConfirmDialog
          shouldOpen={skillSetToDelete != null}
          skillSetTitle="Are you sure?"
          content={`Do you want to delete skillset ${skillSetToDelete?.skillSetTitle}?`}
          cancelCallback={cancelDelete}
          actionCallback={deleteSkillSet}
        />
        <div className={classes.pageHead}>
          <h2>Manage Skill Sets</h2>
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
                <TableCell align="left" style={{ width: "30%" }}>
                  Title
                </TableCell>
                <TableCell align="left" style={{ width: "80%" }}>
                  Skills
                </TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {skillSetList?.map((skill) => (
                <TableRow
                  key={skill.id}
                  id={skill.id}
                  draggable
                  onDragOver={(ev) => ev.preventDefault()}
                  onDragStart={handleDrag}
                  onDrop={handleDrop}
                >
                  <TableCell align="left" style={{ cursor: "pointer" }}>
                    =
                  </TableCell>
                  <TableCell align="left" style={{ width: "30%" }}>
                    {skill.skillSetTitle}
                  </TableCell>
                  <TableCell style={{ width: "80%" }}>
                    {convertArrayToString(skill.data)}
                  </TableCell>
                  <TableCell align="right">
                    <Edit
                      fontSize="small"
                      style={{ cursor: "pointer" }}
                      onClick={() => onEdit(skill.id)}
                    />
                    {"  "}
                    <Delete
                      style={{ cursor: "pointer" }}
                      fontSize="small"
                      onClick={() => setSkillSetToDelete(skill)}
                    />
                    {"  "}
                    {skill.url ? (
                      <a
                        key={skill.id}
                        href={skill.url}
                        style={{ cursor: "pointer" }}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Launch
                          fontSize="small"
                          href={skill.url}
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

  function showSkillSetForm() {
    return (
      <Container>
        <div className={classes.pageHead}>
          <h2>{editableSkillSetId ? "Edit" : "Add New"} Skillset</h2>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item md={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="skillSetTitle"
                label="Title"
                name="skillSetTitle"
                value={formik.values.skillSetTitle}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item md={12}>
              <TextField
                margin="normal"
                required
                id="data"
                name="data"
                label="Skills List"
                multiline
                fullWidth
                rows={4}
                value={formik.values.data}
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
      {showForm === false ? showSkillSetListing() : showSkillSetForm()}
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

export default SkillSetPage;
