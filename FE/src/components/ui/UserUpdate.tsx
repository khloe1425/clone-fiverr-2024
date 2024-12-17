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
import { ToastContainer, toast } from "react-toastify";
import { useGetProfile, useUpdateProfileMutation } from "@/queries/useProfile";
import Loading from "./loading";
import { useRouter } from "next/navigation";
import { User } from "@/schemas/profile";

const UserUpdate = (props: any, ref: any) => {
  const updateProfile = useUpdateProfileMutation();
  const { data, isLoading, isError, refetch } = useGetProfile();
  const router = useRouter();
  const userLogin = data?.content.content;

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    toast("Lỗi xảy ra, vui lòng xác thực lại tài khoản", {
      position: "bottom-right",
    });
    localStorage.removeItem("accessToken");
    router.push("login");
  }

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { handleSubmit, control, setValue, reset } = useForm<{
    email: string;
    name: string;
    phone: string;
    birthday: string;
    certification: any[];
    skill: any[];
    gender: boolean;
  }>({
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      birthday: "",
      certification: [],
      skill: [],
      gender: false,
    },
  });

  useImperativeHandle(ref, () => ({
    open: (data: any) => {
      setOpen(true);
      // If data is provided, set the form values
      if (data) {
        setValue("email", data.email);
        setValue("phone", data.phone);
        setValue("name", data.name);
        setValue("birthday", data.birthday);
        setValue("gender", data.gender);
        setValue("certification", data.certification);
        setValue("skill", data.skill);
      }
    },
    close: () => setOpen(false),
  }));

  useEffect(() => {
    if (userLogin) {
      // Populate the form with userLogin data when available
      setValue("email", userLogin.email);
      setValue("phone", userLogin.phone);
      setValue("name", userLogin.name);
      setValue("birthday", userLogin.birthday);
      setValue("gender", userLogin.gender);
      setValue("certification", userLogin.certification);
      setValue("skill", userLogin.skill);
    }
  }, [userLogin, setValue]);

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data: any) => {
    try {
      data.id = (userLogin as User).id;
      await updateProfile.mutateAsync({ data, id: userLogin?.id as number });
      toast.success("Cập nhật thông tin người dùng thành công", {
        position: "bottom-right",
      });
      setOpen(false);
      refetch();
    } catch (error: any) {
      toast.error(error.content.content || "Có lỗi xảy ra, vui lòng thử lại", {
        position: "bottom-right",
      });
    }
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
        Update User
      </DialogTitle>
      <DialogContent className="dialogContent">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid spacing={1} container mt={1}>
            <Grid item xs={12} md={6} mt={1}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField fullWidth disabled {...field} label="Email" />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6} mt={1}>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField fullWidth {...field} label="Phone" />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6} mt={1}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField fullWidth {...field} label="Name" />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6} mt={1}>
              <Controller
                name="birthday"
                control={control}
                render={({ field }) => (
                  <TextField fullWidth {...field} label="Birthday" />
                )}
              />
            </Grid>

            <Grid item xs={12} md={12} mt={1}>
              <FormControl>
                <FormLabel>Gender</FormLabel>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup row {...field}>
                      <FormControlLabel
                        value={true}
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value={false}
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
                name="certification"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    multiple
                    freeSolo
                    {...field}
                    options={userLogin?.certification || []}
                    onChange={(e, value) => field.onChange(value)}
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
                    multiple
                    freeSolo
                    {...field}
                    options={userLogin?.skill || []}
                    onChange={(e, value) => field.onChange(value)}
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
              Cancel
            </Button>
            <Button type="submit" autoFocus className="btn_save">
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default forwardRef(UserUpdate);
