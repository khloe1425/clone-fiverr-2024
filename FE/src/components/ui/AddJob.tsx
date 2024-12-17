import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, Input, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useState } from "react";

export default function AddJob() {
  const [open, setOpen] = React.useState(false);
  const [img, setImg] = useState();
  // const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeImage = (e: any) => {
    console.log(e.target.files[0]);
    if (e.target.files) {
      e.target.files[0].preview = URL.createObjectURL(e.target.files[0]);
      setImg(e.target.files[0]);
    }
  };

  // React Hook Form setup with Yup validation
  const validationSchema = Yup.object().shape({
    tenCongViec: Yup.string().required("Không được bỏ trống !"),
    moTa: Yup.string().required("Không được bỏ trống !"),
    moTaNgan: Yup.string().required("Không được bỏ trống !"),
    danhGia: Yup.string().matches(/^[0-9]+$/, "Không đúng định dạng !"),
    maChiTietLoaiCongViec: Yup.string().matches(
      /^[0-9]+$/,
      "Không đúng định dạng !"
    ),
    saoCongViec: Yup.string().matches(/^[0-9]+$/, "Không đúng định dạng !"),
    giaTien: Yup.string()
      .matches(/^[0-9]+$/, "Không đúng định dạng !")
      .required("Không được bỏ trống !"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);

    // If an image is selected, append it to FormData before submission
    const formData = new FormData();
    formData.append("tenCongViec", data.tenCongViec);
    formData.append("moTa", data.moTa);
    formData.append("moTaNgan", data.moTaNgan);
    formData.append("danhGia", data.danhGia);
    formData.append("maChiTietLoaiCongViec", data.maChiTietLoaiCongViec);
    formData.append("saoCongViec", data.saoCongViec);
    formData.append("giaTien", data.giaTien);

    if (img) {
      formData.append("hinhAnh", img);
    }

    // Call the API or dispatch action with FormData
    // dispatch(addJobApi(formData))
    //   .then(() => {
    //     handleClose();
    //   })
    //   .catch((err) => {});
  };

  return (
    <div className="mb-3">
      <Button variant="outlined" onClick={handleClickOpen}>
        ADD New Job
      </Button>
      <Dialog
        className="dialog_admin"
        open={open}
        onClose={handleClose}
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="dialogTitle_admin">ADD NEW JOB</DialogTitle>
        <DialogContent className="dialogContent_admin">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid spacing={1} container mt={1}>
              <Grid item xs={12} md={12} mt={1}>
                <TextField
                  fullWidth
                  id="tenCongViec"
                  label="Name Job"
                  {...register("tenCongViec")}
                  error={!!errors.tenCongViec}
                  helperText={
                    errors.tenCongViec ? errors.tenCongViec.message : ""
                  }
                />
              </Grid>
              <Grid item xs={12} md={12} mt={1}>
                <TextField
                  fullWidth
                  id="moTa"
                  label="Description"
                  {...register("moTa")}
                  error={!!errors.moTa}
                  helperText={errors.moTa ? errors.moTa.message : ""}
                />
              </Grid>
              <Grid item xs={12} md={12} mt={1}>
                <TextField
                  fullWidth
                  id="moTaNgan"
                  label="Short Description"
                  {...register("moTaNgan")}
                  error={!!errors.moTaNgan}
                  helperText={errors.moTaNgan ? errors.moTaNgan.message : ""}
                />
              </Grid>
              <Grid item xs={12} md={12} mt={1}>
                <TextField
                  fullWidth
                  id="giaTien"
                  label="Price"
                  {...register("giaTien")}
                  error={!!errors.giaTien}
                  helperText={errors.giaTien ? errors.giaTien.message : ""}
                />
              </Grid>
              <Grid item xs={12} md={12} mt={1}>
                <TextField
                  fullWidth
                  id="danhGia"
                  label="Rate"
                  {...register("danhGia")}
                  error={!!errors.danhGia}
                  helperText={errors.danhGia ? errors.danhGia.message : ""}
                />
              </Grid>
              <Grid item xs={12} md={12} mt={1}>
                <TextField
                  fullWidth
                  id="maChiTietLoaiCongViec"
                  label="Detail Code"
                  {...register("maChiTietLoaiCongViec")}
                  error={!!errors.maChiTietLoaiCongViec}
                  helperText={
                    errors.maChiTietLoaiCongViec
                      ? errors.maChiTietLoaiCongViec.message
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12} md={12} mt={1}>
                <TextField
                  fullWidth
                  id="saoCongViec"
                  label="Star Rating"
                  {...register("saoCongViec")}
                  error={!!errors.saoCongViec}
                  helperText={
                    errors.saoCongViec ? errors.saoCongViec.message : ""
                  }
                />
              </Grid>
              <Grid item xs={12} md={12} mt={1}>
                <Button variant="contained" component="label">
                  Upload Image
                  <input
                    hidden
                    id="hinhAnh"
                    name="hinhAnh"
                    type="file"
                    onChange={handleChangeImage}
                  />
                </Button>
                {img && (
                  <img
                    src={URL.createObjectURL(img)}
                    width="90px"
                    className="ms-3"
                  />
                )}
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
}
