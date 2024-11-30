import React from 'react'
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { IconButton } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const EditModal = ({BootstrapDialog,setOpenEdit,breedType,setBreedType,openEdit,error,handleCloseEdit}) => {
  return (
    <BootstrapDialog
          onClose={() => setOpenEdit(false)}
          aria-labelledby="customized-dialog-title"
          open={openEdit}
          fullWidth
        >
          <DialogTitle
            sx={{ m: 0, p: 2, fontSize: 17 }}
            id="customized-dialog-title"
          >
            BREED TYPE
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={() => setOpenEdit(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Typography gutterBottom>
              <label htmlFor="Breed  Type" className="mt-2">
                Breed Type<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="breedType"
                className="form-control mt-2 mb-3"
                name="breedType"
                // value={resData?.product}
                value={breedType}
                onChange={(e) => setBreedType(e.target.value)}
                placeholder="Breed Type"
              />
              {error.breedType ? (
                <p style={{ color: "red" }}>{error.breedType}</p>
              ) : (
                ""
              )}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus variant="contained" onClick={handleCloseEdit}>
              Submit
            </Button>
          </DialogActions>
        </BootstrapDialog>
  )
}

export default EditModal