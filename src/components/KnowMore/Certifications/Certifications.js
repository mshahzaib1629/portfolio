import { Grid, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import Card from "./Card";
import { certificates } from "../../../data";

function Certifications() {
  const classes = useStyles();
  const [loadedCertificates, setLoadedCertificates] = useState([]);

  useEffect(() => {
    setLoadedCertificates(certificates);
  }, []);

  return (
    <>
      <Grid container spacing={4} className={classes.galleryContainer}>
        {loadedCertificates.sort((a,b) => b.id - a.id).map((item, k) => (
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
              nature={item.nature}
              date={item.date}
              onClick={() => {}}
              image={item.image}
              url={item.url}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
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
