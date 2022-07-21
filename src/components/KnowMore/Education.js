import { makeStyles, useMediaQuery, useTheme } from "@material-ui/core";

function Education() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <h1>Educaiton</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla
        elit suscipit odio molestie mattis. Pellentesque eleifend neque ut
        lectus ullamcorper tempus. Curabitur imperdiet erat at nisi gravida
        elementum. Etiam laoreet ornare ex ac luctus. Etiam finibus non magna eu
        rutrum. Fusce molestie euismod orci, eget imperdiet arcu convallis sit
        amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla
        elit suscipit odio molestie mattis. Pellentesque eleifend neque ut
        lectus ullamcorper tempus. Curabitur imperdiet erat at nisi gravida
        elementum. Etiam laoreet ornare ex ac luctus. Etiam finibus non magna eu
        rutrum. Fusce molestie euismod orci, eget imperdiet arcu convallis sit
        amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla
        elit suscipit odio molestie mattis. Pellentesque eleifend neque ut
        lectus ullamcorper tempus. Curabitur imperdiet erat at nisi gravida
        elementum. Etiam laoreet ornare ex ac luctus. Etiam finibus non magna eu
        rutrum. Fusce molestie euismod orci, eget imperdiet arcu convallis sit
        amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla
        elit suscipit odio molestie mattis. Pellentesque eleifend neque ut
        lectus ullamcorper tempus. Curabitur imperdiet erat at nisi gravida
        elementum. Etiam laoreet ornare ex ac luctus. Etiam finibus non magna eu
        rutrum. Fusce molestie euismod orci, eget imperdiet arcu convallis sit
        amet.
      </p>
    </>
  );
}

export default Education;
