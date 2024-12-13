"use client";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useRef, useState } from "react";
import { Button, Space, Table, Tag } from "antd";
import JobUpdate from "@/components/ui/JobUpdate";
import AddJob from "@/components/ui/AddJob";
import {
  layDanhSachCongViec,
  useDeleteJobAdminMutation,
} from "@/queries/useJob";
import { CongViecViewModel, Job } from "@/schemas/job";
import { toast } from "react-toastify";

// Component
type Props = {};

export default function ManageJob({}: Props) {
  const refJobDialog = useRef<any>(null);
  const deleteMutation = useDeleteJobAdminMutation();
  const [allCongViec, setAllCongViec] = useState<CongViecViewModel[]>([]);
  const [selectedJob, setSelectedJob] = useState<CongViecViewModel | null>(
    null
  );

  const [open, setOpen] = useState(false);

  const columns: ColumnsType<CongViecViewModel> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "tenCongViec",
      key: "tenCongViec",
      width: 200,
      render: (text) => <p className="mt-0">{text}</p>,
    },
    {
      title: "Image",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (url) => <img src={url} width="70px" height="70px" alt="..." />,
    },
    {
      title: "Discription",
      dataIndex: "moTaNgan",
      key: "moTaNgan",
    },
    {
      title: "$Price",
      dataIndex: "giaTien",
      key: "giaTien",
      render: (text) => <p className="mt-0">{text}</p>,
    },
    {
      title: "Rate",
      dataIndex: "danhGia",
      key: "danhGia",
      render: (text) => <p className="mt-0">{text}</p>,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "x",
      render: (_, job) => (
        <div className="d-flex gap-3">
          <Button
            onClick={() => {
              setSelectedJob(job); // Set the selected job to state
              refJobDialog.current.open(); // Open the modal
            }}
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={async () => {
              try {
                await deleteMutation.mutateAsync(job.id);
                toast.success("Xóa thành công");
                dsCongViec.refetch();
              } catch (error: any) {
                toast.error(error.content.content || "Xóa thất bại");
              }
            }}
          >
            DEL
          </Button>
        </div>
      ),
    },
  ];

  const dsCongViec = layDanhSachCongViec();
  useEffect(() => {
    if (dsCongViec.isLoading) {
      return;
    }
    setAllCongViec(dsCongViec.data?.content.content as CongViecViewModel[]);
  }, [dsCongViec]);

  return (
    <>
      <AddJob />
      <Table columns={columns} dataSource={allCongViec} />
      {/* Pass the selected job data to the JobUpdate modal */}
      {selectedJob && <JobUpdate ref={refJobDialog} jobData={selectedJob} />}
    </>
  );
}
