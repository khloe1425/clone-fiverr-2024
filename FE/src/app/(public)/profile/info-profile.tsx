import React, { useRef } from "react";
import {
  GoogleOutlined,
  PlusOutlined,
  CameraOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  FaDiscord,
  FaFacebook,
  FaEdit,
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { message } from "antd";
import {
  useGetProfile,
  useUpdateAvatarMutation,
  useUpdateProfileMutation,
} from "@/queries/useProfile";
import Loading from "@/components/ui/loading";
import { useRouter } from "next/navigation";
import UserUpdate from "@/components/ui/UserUpdate";
import { toast } from "react-toastify";

type Props = {};

export default function InfoProfile({}: Props) {
  const updateAvatar = useUpdateAvatarMutation();
  const router = useRouter();
  const refUpdateUserDialog = useRef<any>(null);
  const { data, isLoading, isError, refetch } = useGetProfile();

  const userLogin = data?.content.content;
  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    toast.error("Lỗi xảy ra, vui lòng xác thực lại tài khoản");
    localStorage.removeItem("accessToken");
    router.push("login");
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Update state with selected image
      // Prepare FormData to send to the server
      const formData = new FormData();
      formData.append("formFile", file);

      // Gọi API cập nhật avatar
      updateAvatar.mutateAsync(formData, {
        onSuccess: () => {
          toast.success("Cập nhật avatar thành công");
          refetch();
        },
        onError: (error: any) => {
          toast.error(
            error.content.content || "Có lỗi xảy ra , vui lòng thử lại"
          );
        },
      });
    }
  };
  return (
    <div className="info">
      <div className="info_sellercard_top mb-8">
        <div className="info_card relative bg-white border border-[#dadbdd] p-8 text-sm">
          <div className="onl absolute right-0 left-0 h-[20px]">
            <div className="user_online flex items-center absolute right-[30px] py-[0px] px-[6px] text-[#1dbf73] border border-[#1dbf73] rounded-[12px] z-10">
              <i className="dot text-xl mr-1">·</i>Online
            </div>
            <div className="dropdown">
              <button
                className="dropdown-toggle absolute left-4 bg-transparent border-none"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></button>
              <ul
                className="dropdown-menu p-0"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() => {}}
                  >
                    Đăng Xuất
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="info_profile">
            <div className="info_profile_image flex justify-center mb-4 ">
              <label className="info_label relative w-[150px] h-[150px] text-3xl cursor-pointer">
                {/* Icon Camera */}
                <div className="absolute inset-0 bg-black bg-opacity-30 rounded-full flex items-center justify-center  opacity-0 hover:opacity-100">
                  <CameraOutlined className="text-black text-4xl" />
                </div>

                {/* Input File */}
                <input
                  className="label_inp hidden"
                  type="file"
                  accept=".png, .jpg, .jpeg, .gif" // Chỉ cho phép các file hình ảnh có định dạng png, jpg, jpeg, gif
                  onChange={(e) => {
                    console.log("check file", e.target.files);
                    handleFileChange(e);
                  }}
                />

                {/* Avatar hoặc Tên */}
                <div className="image flex justify-center items-center bg-[#e4e5e7] font-bold text-white text-uppercase w-full h-full rounded-full">
                  {userLogin?.avatar ? (
                    <img
                      src={userLogin?.avatar}
                      alt="avatar"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <p className="text my-0 text-center text-sm">
                      {userLogin?.name}
                    </p>
                  )}
                </div>
              </label>
            </div>

            <div className="info_profile_label flex flex-col items-center">
              <p className="text-lg font-bold text-[#222325] mb-0">
                {userLogin?.email || "hau17131203@gmail.com"}
              </p>
              <div className="btn_update mt-4">
                <UserUpdate ref={refUpdateUserDialog} />

                <button
                  className="edit relative w-3 h-3 fill-[#b5b6ba] inline-block bg-transparent border-none"
                  onClick={() => {
                    refUpdateUserDialog.current.open();
                  }}
                >
                  <EditOutlined />
                </button>
              </div>
            </div>
          </div>

          <div className="info_desc mt-6 pt-5 border-t border-[#dadbdd]">
            <div className="location flex justify-between mb-4">
              <div className="location_left text-[#62646a] text-sm flex items-center">
                <i className="las la-map-marker-alt icon mr-3"></i>
                <span>From</span>
              </div>
              <div className="location_right text-sm font-bold text-[#62646a]">
                <span>Vietnam</span>
              </div>
            </div>
            <div className="location flex justify-between mb-4">
              <div className="location_left text-[#62646a] text-sm flex items-center">
                <i className="fa-solid fa-user icon mr-3"></i>
                <span>Member since</span>
              </div>
              <div className="location_right text-sm font-bold text-[#62646a]">
                <span>Oct2022</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="info_sellercard_bottom">
        <div className="info_card bg-white border border-gray-300 rounded-lg p-6">
          {/* Description Section */}
          <div className="inner_item border-b border-gray-200 pb-4 mb-6">
            <div className="inner_row flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Description</h3>
              <button
                className="edit  bg-transparent border-none"
                onClick={() => {
                  refUpdateUserDialog.current.open();
                }}
              >
                <EditOutlined className="h-full" />
              </button>
            </div>
            <div className="flex items-center gap-5 justify-between">
              <h6 className="font-medium w-1/4">Name:</h6>
              <p className="text-gray-600">
                {userLogin?.name || "Le trung hau"}
              </p>
            </div>
            <div className="flex items-center gap-5 justify-between">
              <h6 className="font-medium w-1/4">Phone:</h6>
              <p className="text-gray-600">{userLogin?.phone || "09009090"}</p>
            </div>
            <div className="flex items-center gap-5 justify-between">
              <h6 className="font-medium w-1/4">Birthday:</h6>
              <p className="text-gray-600">
                {userLogin?.birthday || "Thông tin rỗng"}
              </p>
            </div>
          </div>

          {/* Languages Section */}
          <div className="inner_item border-b border-gray-200 pb-4 mb-6">
            <div className="inner_row mb-4">
              <h3 className="text-lg font-bold">Languages</h3>
            </div>
            <p className="text-gray-600">
              English - <span className="text-gray-400">Basic</span>
            </p>
            <p className="text-gray-600">
              Vietnamese (Tiếng Việt) -{" "}
              <span className="text-gray-400">Native/Bilingual</span>
            </p>
          </div>

          {/* Skills Section */}
          <div className="inner_item border-b border-gray-200 pb-4 mb-6">
            <div className="inner_row flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Skills</h3>
              <button
                className="edit  bg-transparent border-none"
                onClick={() => {
                  refUpdateUserDialog.current.open();
                }}
              >
                <EditOutlined className="h-full" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {userLogin?.skill?.map((item: string, index: number) => (
                <p
                  className="bg-gray-100 text-gray-600 px-2 py-1 rounded"
                  key={index}
                >
                  {item}
                </p>
              ))}
            </div>
          </div>

          {/* Linked Accounts Section */}
          <div className="inner_item">
            <div className="inner_row mb-4">
              <h3 className="text-lg font-bold">Linked Accounts</h3>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href="#"
                className="flex justify-center items-center w-10 h-10 bg-blue-600 rounded-full text-white"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="flex justify-center items-center w-10 h-10 bg-blue-400 rounded-full text-white"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="flex justify-center items-center w-10 h-10 bg-blue-700 rounded-full text-white"
              >
                <FaLinkedin />
              </a>
              <a
                href="#"
                className="flex justify-center items-center w-10 h-10 bg-gray-800 rounded-full text-white"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
