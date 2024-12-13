import * as React from "react";
import { forwardRef, useImperativeHandle, useState } from "react";
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
import { useForm, Controller } from "react-hook-form";
import { ThueCongViec } from "@/schemas/job";

type Props = {
  service: ThueCongViec;
};

const UpdateService = ({ service }: Props, ref: any) => {
  const [open, setOpen] = useState(false);

  // Function to open the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Function to close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      id: service.id,
      maCongViec: service.maCongViec,
      maNguoiThue: service.maNguoiThue,
      ngayThue: service.ngayThue,
      hoanThanh: service.hoanThanh,
    },
  });

  const onSubmit = (data: any) => {
    // dispatch(updateServiceHireApi(service.id, data));
    setOpen(false);
  };

  // UseImperativeHandle to expose methods to parent component
  useImperativeHandle(ref, () => ({
    open: () => {
      setOpen(true);
    },
    close: () => setOpen(false),
  }));

  return (
    <div className="mb-3">
      <Dialog
        className="dialog_admin"
        open={open}
        onClose={handleClose}
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="dialogTitle_admin">UPDATE SERVICE</DialogTitle>
        <DialogContent className="dialogContent_admin">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid spacing={1} container mt={1}>
              <Grid item xs={12} md={6} mt={1}>
                <TextField
                  color="success"
                  fullWidth
                  disabled
                  id="id"
                  name="id"
                  type="text"
                  label="ID"
                  value={service.id}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} mt={1}>
                <Controller
                  control={control}
                  name="maCongViec"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      color="success"
                      fullWidth
                      label="Job ID"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6} mt={1}>
                <Controller
                  control={control}
                  name="maNguoiThue"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      color="success"
                      fullWidth
                      label="Hirer ID"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6} mt={1}>
                <Controller
                  control={control}
                  name="ngayThue"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      color="success"
                      fullWidth
                      label="Hire Date"
                    />
                  )}
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
                  <Controller
                    control={control}
                    name="hoanThanh"
                    render={({ field }) => (
                      <RadioGroup row {...field}>
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
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <DialogActions className="dialogActions_admin">
              <Button type="submit" className="btn_add">
                Save
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
};

// Wrap component with forwardRef to allow parent to access the ref
export default forwardRef(UpdateService);
