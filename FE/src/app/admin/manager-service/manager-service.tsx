"use client";

import { ThueCongViec } from "@/schemas/job";
import { Button, Space, Table, Modal, Form, Input, Radio } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  useAddHireMutation,
  useDeleteHireMutation,
  useGetAllHireQuery,
  useUpdateHireMutation,
} from "@/queries/useHire";
import { toast } from "react-toastify";

type Props = {};

export default function ManageService({}: Props) {
  const getAllServiceHire = useGetAllHireQuery();
  const deleteHireService = useDeleteHireMutation();
  const createHireService = useAddHireMutation();
  const updateHireService = useUpdateHireMutation();
  const [allServiceHire, setAllServiceHire] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false); // Add state for add modal
  const [currentService, setCurrentService] = useState<ThueCongViec | null>(
    null
  );

  // Separate useForm hooks for add and update
  const {
    control: addControl,
    handleSubmit: handleAddSubmit,
    reset: resetAdd,
    setValue: setAddValue,
  } = useForm();
  const {
    control: updateControl,
    handleSubmit: handleUpdateSubmit,
    reset: resetUpdate,
    setValue: setUpdateValue,
  } = useForm();

  useEffect(() => {
    if (getAllServiceHire.isLoading) {
      return;
    }
    setAllServiceHire(getAllServiceHire.data?.content.content as any);
  }, [getAllServiceHire]);

  const columns: ColumnsType<ThueCongViec> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Job ID",
      dataIndex: "maCongViec",
      key: "maCongViec",
    },
    {
      title: "Hirer ID",
      dataIndex: "maNguoiThue",
      key: "maNguoiThue",
    },
    {
      title: "Hire Day",
      key: "ngayThue",
      dataIndex: "ngayThue",
    },
    {
      title: "Condition",
      key: "hoanThanh",
      dataIndex: "hoanThanh",
      render: (condition) => {
        return (
          <p className="m-0">{condition ? "Hoàn thành" : "Chưa hoàn thành"}</p>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action", // Ensure a unique key here
      render: (value, service) => (
        <div className="d-flex gap-3">
          <Button
            onClick={() => {
              setCurrentService(service);
              setIsModalVisible(true);
              resetUpdate(service); // Reset form with current service data for update
            }}
            type="primary"
          >
            View & Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={async () => {
              try {
                await deleteHireService.mutateAsync(service.id);
                toast.success("Xóa công việc thành công");
                getAllServiceHire.refetch();
              } catch (error: any) {
                toast.error(error.content.content || "Xóa công việc thất bại");
              }
            }}
          >
            DEL
          </Button>
        </div>
      ),
    },
  ];

  const onSubmitUpdate = async (data: any) => {
    try {
      await updateHireService.mutateAsync(data);
      toast.success("Cập nhật thành công");
      getAllServiceHire.refetch();
      setIsModalVisible(false);
    } catch (error: any) {
      toast.error(error.content.content || "Cập nhật thất bại");
    }
  };

  const onSubmitAdd = async (data: any) => {
    try {
      await createHireService.mutateAsync(data);
      toast.success("Thêm thành công");
      getAllServiceHire.refetch();
      setIsAddModalVisible(false);
    } catch (error: any) {
      toast.error(error.content.content || "Thêm thành công");
    }
  };

  return (
    <>
      {/* Button to open Add Service modal */}
      <Button
        type="primary"
        onClick={() => {
          setIsAddModalVisible(true);
          resetAdd(); // Reset the form for the add modal
        }}
      >
        Add Service
      </Button>

      <Table
        columns={columns}
        dataSource={allServiceHire}
        rowKey="id" // Ensure each row has a unique key based on "id"
      />

      {/* Modal for Updating Service */}
      <Modal
        title="Update Service"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        onOk={() => handleUpdateSubmit(onSubmitUpdate)()}
      >
        <Form layout="vertical" onFinish={handleUpdateSubmit(onSubmitUpdate)}>
          <Form.Item label="ID" name="id" initialValue={currentService?.id}>
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Job ID"
            name="maCongViec"
            initialValue={currentService?.maCongViec}
          >
            <Controller
              control={updateControl}
              name="maCongViec"
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
          <Form.Item
            label="Hirer ID"
            name="maNguoiThue"
            initialValue={currentService?.maNguoiThue}
          >
            <Controller
              control={updateControl}
              name="maNguoiThue"
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
          <Form.Item
            label="Hire Date"
            name="ngayThue"
            initialValue={currentService?.ngayThue}
          >
            <Controller
              control={updateControl}
              name="ngayThue"
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
          <Form.Item
            label="Condition"
            name="hoanThanh"
            initialValue={currentService?.hoanThanh}
          >
            <Controller
              control={updateControl}
              name="hoanThanh"
              render={({ field }) => (
                <Radio.Group {...field}>
                  <Radio value={true}>Complete</Radio>
                  <Radio value={false}>Incomplete</Radio>
                </Radio.Group>
              )}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
            <Button
              type="default"
              onClick={() => setIsModalVisible(false)}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal for Adding Service */}
      <Modal
        title="Add Service"
        open={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        footer={null}
        onOk={() => handleAddSubmit(onSubmitAdd)()}
      >
        <Form layout="vertical" onFinish={handleAddSubmit(onSubmitAdd)}>
          <Form.Item label="Job ID" name="maCongViec">
            <Controller
              control={addControl}
              name="maCongViec"
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
          <Form.Item label="Hirer ID" name="maNguoiThue">
            <Controller
              control={addControl}
              name="maNguoiThue"
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
          <Form.Item label="Hire Date" name="ngayThue">
            <Controller
              control={addControl}
              name="ngayThue"
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
          <Form.Item label="Condition" name="hoanThanh">
            <Controller
              control={addControl}
              name="hoanThanh"
              render={({ field }) => (
                <Radio.Group {...field}>
                  <Radio value={true}>Complete</Radio>
                  <Radio value={false}>Incomplete</Radio>
                </Radio.Group>
              )}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Service
            </Button>
            <Button
              type="default"
              onClick={() => setIsAddModalVisible(false)}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
