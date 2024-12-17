export type LoginRequestBody = {
  email: "string";
  password: "string";
};

export type AddJobRequestBody = {
  maCongViec: number;
  ngayThue: string;
  hoanThanh: boolean;
};

export type RegisterRequestBody = {
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  gender: string;
};
