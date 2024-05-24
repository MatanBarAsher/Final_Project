import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export const AlertDialog = ({
  open,
  confirmButtonAction,
  cancelButtonAction,
  confirmButtonText,
  cancelButtonText,
  content,
  title,
}) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={cancelButtonAction}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{ color: "black" }} id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {cancelButtonAction && cancelButtonText && (
            <Button onClick={cancelButtonAction}>{cancelButtonText}</Button>
          )}
          {confirmButtonAction && confirmButtonText && (
            <Button onClick={confirmButtonAction} autoFocus>
              {confirmButtonText}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};
