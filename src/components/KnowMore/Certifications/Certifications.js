import { Grid, makeStyles, useTheme, Button, Box } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import Card from "./Card";
import { useSelector, useDispatch } from "react-redux";
import { fetchFeaturedCertificationThunk } from "../../../redux/slices/certificationSlice";
import TryAgain from "../../TryAgain";

function Certifications() {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { certificationList, isLoading } = useSelector(
    (state) => state.certification
  );

  async function getCertificationData() {
    try {
      await dispatch(fetchFeaturedCertificationThunk());
    } catch (error) {
      console.log("error: ", error);
    }
  }

  const viewContent = () => {
    return (
      <>
        <Grid container spacing={4} className={classes.galleryContainer}>
          {certificationList.map((item, k) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={4}
              key={item.id}
              classes={{ item: classes.item }}
            >
              <Card
                id={item.id}
                title={item.title}
                issuedBy={item.issuedBy}
                type={item.type}
                date={item.date}
                imageUrl={item.imageUrl}
                url={item.url}
              />
            </Grid>
          ))}
        </Grid>

        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            className={classes.loadBtn}
            onClick={() => {}}
            variant="contained"
            color="primary"
          >
            {t("project_load_btn")}
          </Button>
        </Box>
      </>
    );
  };

  const buildContent = () =>
    certificationList.length == 0 ? (
      <TryAgain
        message="Unable to fetch certificates!"
        callback={getCertificationData}
      />
    ) : (
      viewContent()
    );

  return isLoading ? <p>Loading...</p> : buildContent();
}

const useStyles = makeStyles((theme) => ({
  galleryContainer: {
    overflow: "visible",
    width: "100%",
    margin: "0 auto",
  },
  item: {
    overflow: "visible",
  },
  loadBtn: {
    width: "200px",
  },
}));

export default Certifications;
