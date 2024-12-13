"use client";
import AddJobType from "@/components/ui/AddJobType";
import {
  getAllJobType,
  useDeleteJobTypeMutation,
  useUpdateJobTypeMutation,
} from "@/queries/useJobDetail";
import { JobType } from "@/schemas/job";
import { Table, Button, Modal, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";

type Props = {};

export default function ManageJobType({}: Props) {
  const dataJobType = getAllJobType();
  const [allJobType, setAllJobType] = useState<JobType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedJobType, setSelectedJobType] = useState<JobType | null>(null);
  const useDeleteDataTypeMutation = useDeleteJobTypeMutation();
  const useUpdateDataTypeMutation = useUpdateJobTypeMutation();
  // React Hook Form
  const { control, handleSubmit, reset } = useForm<JobType>();

  const columns: ColumnsType<JobType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Job Type",
      dataIndex: "tenLoaiCongViec",
      key: "tenLoaiCongViec",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (value, jobtype) => (
        <div className="d-flex gap-3">
          <Button
            type="primary"
            onClick={() => {
              setSelectedJobType(jobtype); // Set the selected job type for editing
              reset(jobtype); // Populate the form with job type data
              setIsModalVisible(true); // Show modal
            }}
          >
            View & Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={async () => {
              try {
                await useDeleteDataTypeMutation.mutateAsync(jobtype.id);
                toast.success("Job deleted successfully");
                dataJobType.refetch();
              } catch (error: any) {
                toast.error(error.content.content || "Job deleted failed");
              }
            }}
          >
            DEL
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (dataJobType.isLoading) {
      return;
    }
    setAllJobType(dataJobType.data?.content.content as JobType[]);
  }, [dataJobType]);

  const handleOk = async (data: JobType) => {
    // Handle form submission
    try {
      await useUpdateDataTypeMutation.mutateAsync(data);
      toast.success("Cập nhật thông tin thành công");
      dataJobType.refetch();
    } catch (error: any) {
      toast.error(error.content.content || "Cập nhật thông tin thất bại");
    }
    setIsModalVisible(false);
    setSelectedJobType(null); // Clear the selected job type
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedJobType(null); // Clear the selected job type
  };

  return (
    <>
      <AddJobType />
      <Table
        columns={columns}
        dataSource={allJobType}
        rowKey="id" // Ensure each row has a unique key
      />
      {/* Modal for View & Edit */}
      <Modal
        title="Edit Job Type"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null} // Customize footer if needed
      >
        {/* React Hook Form */}
        {selectedJobType && (
          <form onSubmit={handleSubmit(handleOk)}>
            <div>
              <h3>Edit Job Type</h3>
              <Controller
                name="tenLoaiCongViec"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Enter job type" />
                )}
              />
            </div>
            <div className="mt-3">
              <Button type="primary" htmlType="submit">
                Save Changes
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
}
