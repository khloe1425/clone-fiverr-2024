export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  avatar: string;
  gender: boolean;
  role: string;
  skill: never[];
  certification: any[];
  bookingJob: any[];
};

// export const User = {
//   id: 6678,
//   name: "letrunghau",
//   email: "hau17131203@gmail.com",
//   password: "",
//   phone: "0977917160",
//   birthday: "2025-01-10",
//   avatar: "",
//   gender: true,
//   role: "USER",
//   skill: [],
//   certification: [],
//   bookingJob: [],
// };
