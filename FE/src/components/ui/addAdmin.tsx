import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useLogoutMutation } from "@/queries/useAuth";
import { toast } from "react-toastify";
import { getAllUser } from "@/queries/useUser";

export default function AddAdmin() {
  //   const dispatch: AppDispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const registerMutation = useLogoutMutation();
  const { refetch } = getAllUser();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Define validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("  Email không được bỏ trống ")
      .email(" Email không đúng định dạng "),
    password: Yup.string()
      .required("  Password không được bỏ trống ")
      .min(6, " Password từ 6 - 32 ký tự ")
      .max(32, "pass từ 6 - 32 ký tự !"),
    name: Yup.string()
      .matches(
        /[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/,
        " Name Không đúng định dạng "
      )
      .required(" Name không được bỏ trống "),
    phone: Yup.string()
      .matches(
        /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
        "  Phone phải từ 03 05 07 08 09 và có 10 số "
      )
      .required(" Phone không được bỏ trống "),
  });

  // Use React Hook Form with Yup validation resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      await registerMutation.mutateAsync({
        ...data,
        birthday: "1/1/1990",
        gender: false,
      });
      refetch();
      toast.success("Tạo tài khoản thành công");
    } catch (error: any) {
      toast.error(error.content.content || "Có lỗi xảy ra, vui lòng thử lại");
    }
  };

  return (
    <div className="mb-3">
      <Button variant="outlined" onClick={handleClickOpen}>
        Add New Admin
      </Button>
      <Dialog
        className="dialog_admin"
        open={open}
        onClose={handleClose}
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="dialogTitle_admin">ADD NEW ADMIN</DialogTitle>
        <DialogContent className="dialogContent_admin">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid spacing={1} container mt={1}>
              <Grid item xs={12} md={6} mt={1}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12} md={6} mt={1}>
                <TextField
                  fullWidth
                  id="name"
                  label="Name"
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>
              <Grid item xs={12} md={6} mt={1}>
                <TextField
                  fullWidth
                  id="password"
                  label="Password"
                  type="password"
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>
              <Grid item xs={12} md={6} mt={1}>
                <TextField
                  fullWidth
                  id="phone"
                  label="Phone"
                  {...register("phone")}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
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
}
