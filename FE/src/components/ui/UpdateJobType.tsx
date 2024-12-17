import * as React from "react";
import { forwardRef, useImperativeHandle, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { JobType, LoaiCongViec } from "@/schemas/job";

type Props = {
  jobtype: JobType;
};

const UpdateJobType = ({ jobtype }: Props, ref: any) => {
  const [open, setOpen] = useState(false);
  const [jobTypes, setJobTypes] = useState<any[]>([]); // Mock data for job types

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: jobtype.id,
      tenLoaiCongViec: jobtype.tenLoaiCongViec,
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
    setValue("tenLoaiCongViec", jobtype.tenLoaiCongViec); // Sync the form values
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data: any) => {
    // Mock API call or logic to update job type
    const updatedJobTypes = jobTypes.map((item) =>
      item.id === data.id ? { ...item, ...data } : item
    );
    setJobTypes(updatedJobTypes); // Update job types with the modified data
    console.log(data); // You can replace this with actual API call
    handleClose();
  };

  useImperativeHandle(ref, () => ({
    open: (data: any) => {
      setOpen(true);
      setValue(
        "tenLoaiCongViec",
        data?.tenLoaiCongViec || jobtype.tenLoaiCongViec
      ); // Handle open with passed data
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
        <DialogTitle className="dialogTitle_admin">UPDATE JOBTYPE</DialogTitle>
        <DialogContent className="dialogContent_admin">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid spacing={1} container mt={1}>
              {/* ID field is read-only */}
              <Grid item xs={12} md={6} mt={1}>
                <TextField
                  fullWidth
                  disabled
                  id="id"
                  label="ID"
                  value={jobtype.id}
                />
              </Grid>

              {/* Job Type name field */}
              <Grid item xs={12} md={6} mt={1}>
                <TextField
                  fullWidth
                  id="tenLoaiCongViec"
                  label="Job Type"
                  {...register("tenLoaiCongViec", {
                    required: "Job Type is required",
                  })}
                  error={!!errors.tenLoaiCongViec}
                  helperText={
                    errors.tenLoaiCongViec ? errors.tenLoaiCongViec.message : ""
                  }
                />
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

export default forwardRef(UpdateJobType);
