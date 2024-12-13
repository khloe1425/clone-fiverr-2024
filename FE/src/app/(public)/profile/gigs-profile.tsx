import React from "react";
import Link from "next/link";
import { CheckCircleOutlined, StarFilled } from "@ant-design/icons";
import { useDeleteJobMutation, useGetMyJob } from "@/queries/useJob";
import Loading from "@/components/ui/loading";
import { Job } from "@/schemas/job";
import { toast } from "react-toastify";
type Props = {};

const GigsProfile: React.FC<Props> = () => {
  // Dummy data for demonstration
  const { mutateAsync } = useDeleteJobMutation();
  const { data, isLoading, isError, refetch } = useGetMyJob();
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    toast.error("Có lỗi xảy ra, vui lòng thử lại");
  }

  const congViecDaThue = data?.content.content as Job[];

  return (
    <div className="p-6">
      <div className=" rounded-sm border border-[#dadbdd] p-4 mb-6 flex justify-between items-center">
        <span className="text-lg text-gray-600 text-[16px] font-semibold">
          It seems that you don't have any active Gigs.
        </span>
        <button className=" bg-green-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Create a new Gig
        </button>
      </div>

      <div className="space-y-6">
        {congViecDaThue.map((congViecThue, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-slate-600 p-3 space-y-2"
          >
            <div className="flex">
              <div className="w-1/3">
                <img
                  className="rounded-sm w-full h-full"
                  src={congViecThue.congViec.hinhAnh}
                  alt={congViecThue.congViec.tenCongViec}
                />
              </div>
              <div className="w-3/4 pl-4">
                <h1 className="text-[16px] font-[800]  text-gray-700">
                  {congViecThue.congViec.tenCongViec}
                </h1>
                <p className="text-[#000000D9] text-[14px]">
                  {congViecThue.congViec.moTaNgan}
                </p>
                <div className="flex justify-between items-center mt-2 text-gray-600">
                  <div className="flex flex-row items-center">
                    <StarFilled className="" />
                    <span className="ml-1">
                      {congViecThue.congViec.saoCongViec}
                    </span>
                    <span className="text-sm mx-1">
                      ({congViecThue.congViec.danhGia})
                    </span>
                  </div>
                  <div className="text-green-600 font-bold">
                    ${congViecThue.congViec.giaTien}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end items-center gap-4">
              <Link
                href={`/jobDetail/${congViecThue.congViec.id}`}
                passHref
                legacyBehavior
              >
                <span className=" bg-green-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 no-underline cursor-pointer">
                  View detail
                </span>
              </Link>
              <button
                className=" bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={async () => {
                  try {
                    await mutateAsync(congViecThue.id);
                    toast("Xóa công việc thành công", {
                      position: "bottom-right",
                    });
                    refetch();
                  } catch (error: any) {
                    toast(
                      error.content.content ||
                        "Có lỗi xảy ra, vui lòng thử lại",
                      {
                        position: "bottom-right",
                      }
                    );
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GigsProfile;
