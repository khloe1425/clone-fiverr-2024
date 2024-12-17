import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAddjobMutation } from "@/queries/useJob";
import { getAllJobType, useAddJobTypeMutation } from "@/queries/useJobDetail";
import { toast } from "react-toastify";

export default function AddJobType() {
  const [open, setOpen] = useState(false);
  const [jobTypes, setJobTypes] = useState<any[]>([]); // Mock data
  const addJobTypeMutation = useAddJobTypeMutation();
  const { refetch } = getAllJobType();
  // Handle open/close dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Setup React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tenLoaiCongViec: "",
    },
  });

  // Handle form submit (mocked API call)
  const onSubmit = async (data: any) => {
    try {
      await addJobTypeMutation.mutateAsync(data);
      refetch();
      toast("Thêm loại sản phẩm thành công");
    } catch (error: any) {
      toast(error.content.content || "Có lỗi xảy ra khi thêm loại sản phẩm");
    }
    handleClose();
  };

  return (
    <div className="mb-3">
      <Button variant="outlined" onClick={handleClickOpen}>
        ADD New Job type
      </Button>
      <Dialog
        className="dialog_admin"
        open={open}
        onClose={handleClose}
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="dialogTitle_admin">ADD NEW JOBTYPE</DialogTitle>
        <DialogContent className="dialogContent_admin">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid spacing={1} container mt={1}>
              {/* ID field is auto-generated, not editable */}
              <Grid item xs={12} md={6} mt={1}>
                <TextField
                  fullWidth
                  disabled
                  id="id"
                  label="ID"
                  value={""} // Display the next ID
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
