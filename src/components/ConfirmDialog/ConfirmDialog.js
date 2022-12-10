import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";

export function ConfirmDialog(props) {
  const { shouldOpen, title, content, cancelCallback, actionCallback } = props;
  return (
    <Dialog
      open={shouldOpen}
      onClose={cancelCallback}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelCallback}>Cancel</Button>
        <Button onClick={actionCallback} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

