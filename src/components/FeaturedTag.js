import { useMediaQuery, useTheme } from "@material-ui/core";

const FeaturedTag = () => {

    const theme = useTheme();

  return (
    <span
      style={{
        fontSize: 10,
        color: theme.palette.primary.main,
        padding: "0.2em 0.3em",
        borderRadius: "6px",
        borderStyle: "solid",
        borderWidth: "1px",
      }}
    >
      Featured
    </span>
  );
};

export default FeaturedTag;
