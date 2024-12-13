import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form"; // Import useForm from react-hook-form

export default function AddService() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Use useForm hook from react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: 0,
      maCongViec: 0,
      maNguoiThue: 0,
      ngayThue: "",
      hoanThanh: true,
    },
  });

  const onSubmit = (data: any) => {
    console.log(data); // You can replace this with your API call or other logic
    setOpen(false);
  };

  return (
    <div className="mb-3">
      <Button variant="outlined" onClick={handleClickOpen}>
        ADD Service
      </Button>
      <Dialog
        className="dialog_admin"
        open={open}
        onClose={handleClose}
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="dialogTitle_admin">ADD NEW SERVICE</DialogTitle>
        <DialogContent className="dialogContent_admin">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid spacing={1} container mt={1}>
              <Grid item xs={12} md={6} mt={1}>
                <TextField
                  color="success"
                  fullWidth
                  disabled
                  id="id"
                  type="text"
                  label="ID"
                  {...register("id")}
                />
              </Grid>
              <Grid item xs={12} md={6} mt={1}>
                <TextField
                  color="success"
                  fullWidth
                  type="text"
                  label="Job ID"
                  {...register("maCongViec", {
                    required: "Job ID is required",
                  })}
                  error={!!errors.maCongViec}
                  helperText={errors.maCongViec?.message}
                />
              </Grid>
              <Grid item xs={12} md={6} mt={1}>
                <TextField
                  color="success"
                  fullWidth
                  type="text"
                  label="Hirer ID"
                  {...register("maNguoiThue", {
                    required: "Hirer ID is required",
                  })}
                  error={!!errors.maNguoiThue}
                  helperText={errors.maNguoiThue?.message}
                />
              </Grid>
              <Grid item xs={12} md={6} mt={1}>
                <TextField
                  color="success"
                  fullWidth
                  type="text"
                  label="Hire Date"
                  {...register("ngayThue", {
                    required: "Hire date is required",
                  })}
                  error={!!errors.ngayThue}
                  helperText={errors.ngayThue?.message}
                />
              </Grid>
              <Grid item xs={12} md={12} mt={1}>
                <FormControl>
                  <FormLabel
                    color="success"
                    id="demo-row-radio-buttons-group-label"
                  >
                    Condition
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    {...register("hoanThanh")}
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio color="success" />}
                      label="Complete"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio color="success" />}
                      label="Incomplete"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>

            <DialogActions className="dialogActions_admin">
              <Button type="submit" className="btn_add">
                Add
              </Button>
              <Button onClick={handleClose} autoFocus className="btn_cancel">
                Cancel
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
