import { useTheme } from "@mui/material/styles";
import {
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Autocomplete,
} from "@mui/material";
import { useState, useImperativeHandle, forwardRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { getAllUser, getUserById } from "@/queries/useUser";
import { useUpdateProfileMutation } from "@/queries/useProfile";

const User = forwardRef(({ id }: any, ref: any) => {
  const {
    data,
    isLoading,
    isError,
    refetch: refetchUserDetail,
  } = getUserById(id);
  const updateUserMutation = useUpdateProfileMutation();
  const user = data?.content?.content;
  const { refetch } = getAllUser();

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (!user) {
      toast.error("Not found user");
    }
  }, [isLoading, user]);

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (open) {
      // Gọi lại API khi mở dialog
      refetchUserDetail();
    }
  }, [open, refetchUserDetail]);
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: user?.email,
      phone: user?.phone,
      name: user?.name,
      birthday: user?.birthday,
      certification: user?.certification || [],
      skill: user?.skill || [],
      gender: user?.gender,
      role: user?.role,
    },
  });
  useEffect(() => {
    // Khi user có dữ liệu mới, reset lại form với dữ liệu mới
    if (user) {
      reset({
        email: user.email,
        phone: user.phone,
        name: user.name,
        birthday: user.birthday,
        certification: user.certification || [],
        skill: user.skill || [],
        gender: user.gender,
        role: user.role,
      });
    }
  }, [user, reset]);

  const onSubmit = async (values: any) => {
    try {
      await updateUserMutation.mutateAsync({ data: values, id });
      toast.success("Cập nhật thông tin người dùng thành công");
      refetch();
    } catch (err: any) {
      toast.error(
        err.content.content || "Có lỗi xảy ra khi cập nhật thông tin"
      );
    }
  };

  useImperativeHandle(ref, () => ({
    open: () => {
      // Reset form mỗi khi mở dialog
      setOpen(true);
    },
    close: () => setOpen(false),
  }));

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      className="dialog"
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle className="dialogTitle" id="responsive-dialog-title">
        UPDATE USER
      </DialogTitle>
      <DialogContent className="dialogContent">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid spacing={1} container mt={1}>
            <Grid item xs={12} md={6} mt={1}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    disabled
                    type="email"
                    label="Email"
                    error={!!errors.email}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6} mt={1}>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="text"
                    label="Phone"
                    error={!!errors.phone}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6} mt={1}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="text"
                    label="Name"
                    error={!!errors.name}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6} mt={1}>
              <Controller
                name="birthday"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="text"
                    label="Birthday"
                    error={!!errors.birthday}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6} mt={1}>
              <FormControl>
                <FormLabel id="gender-label">Gender</FormLabel>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup row aria-labelledby="gender-label" {...field}>
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                    </RadioGroup>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} mt={1}>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="text"
                    label="Role"
                    error={!!errors.role}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6} mt={1}>
              <Controller
                name="certification"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    multiple
                    options={user?.certification || []}
                    freeSolo
                    renderInput={(params) => (
                      <TextField {...params} label="Certification" />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6} mt={1}>
              <Controller
                name="skill"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    multiple
                    options={user?.skill || []}
                    freeSolo
                    renderInput={(params) => (
                      <TextField {...params} label="Skill" />
                    )}
                  />
                )}
              />
            </Grid>
          </Grid>
          <DialogActions className="dialogActions">
            <Button autoFocus onClick={handleClose} className="btn_cancel">
              CANCEL
            </Button>
            <Button
              type="submit"
              autoFocus
              className="btn_save"
              style={{ background: "#17a2b8" }}
            >
              SAVE
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
});

export default User;
