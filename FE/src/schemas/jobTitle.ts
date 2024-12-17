export type JobTitle = {
  id: number;
  tenLoaiCongViec: string;
  dsNhomChiTietLoai: {
    id: number;
    tenNhom: string;
    hinhAnh: string;
    maLoaiCongviec: number;
    dsChiTietLoai: {
      id: number;
      tenChiTiet: string;
    }[];
  }[];
};

export interface DsNhomChiTietLoai {
  id: number;
  tenNhom: string;
  hinhAnh: string;
  maLoaiCongviec: number;
  dsChiTietLoai: DsChiTietLoai[];
}

export interface DsChiTietLoai {
  id: number;
  tenChiTiet: string;
}
