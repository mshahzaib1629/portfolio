import { Button } from "@mui/material";
import { useTheme } from "@material-ui/core";

export default function TryAgain(props) {
  const { message, callback } = props;
  const theme = useTheme();
  return (
    <p>
      <p>
        {message}
        <br />
        <Button
          variant="contained"
          style={{ backgroundColor: theme.palette.primary.main }}
          sx={{ mt: 1, mb: 1 }}
          onClick={callback}
        >
          Try Again
        </Button>
      </p>
    </p>
  );
}
