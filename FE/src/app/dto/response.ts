export type LoginResType = {
  statusCode: number;
  content: {
    user: {
      id: number;
      name: string;
      email: string;
      password: string;
      phone: string;
      birthday: string;
      avatar: string;
      gender: boolean;
      role: string;
      skill: string[];
      certification: string[];
      bookingJob: never[];
    };
    token: string;
  };
};

export type AddJobResType = {
  id: number;
  maCongViec: number;
  maNguoiThue: number;
  ngayThue: string;
  hoanThanh: boolean;
};

export type RegisterResType = {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  avatar: null;
  gender: boolean;
  role: string;
  skill: string;
  certification: [];
  bookingJob: [];
};
