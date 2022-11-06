import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
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
} from "../../redux/slices/experienceSlice";
import { useEffect } from "react";
import { Button } from "@mui/material";


function ExperiencePage() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { experienceList, isLoading } = useSelector(
    (state) => state.experience
  );

  async function getExperienceData() {
    try {
      await dispatch(fetchExperienceThunk());
    } catch (error) {
      console.log("error: ", error);
    }
  }

  useEffect(() => {
    if (experienceList.length === 0) getExperienceData();
  }, []);
  const onEdit = (id) => {
    console.log("edit clicked for id=", id);
  };

  const onDelete = (experience) => {
    console.log("delete clicked for id=", experience.id);
  };

  return (
      <Container>
        <div className={classes.pageHead}>
          <h2>Manage Experience</h2>
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
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
                <TableCell>From</TableCell>
                <TableCell>To</TableCell>
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

const useStyles = makeStyles((theme) => ({
  pageHead: {
    display: "flex",
    "flex-direction": "row",
    "justify-content": "space-between",
  },
}));

export default ExperiencePage;
