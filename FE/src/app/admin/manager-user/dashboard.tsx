"use client";
import AddAdmin from "@/components/ui/addAdmin";
import { useGetProfile, useUpdateProfileMutation } from "@/queries/useProfile";
import { deleteUserMutation, getAllUser, searchUser } from "@/queries/useUser";
import { Button, Input, Modal, Table, Tag, Form, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

interface DataType {
  key: string;
  name: string;
  id: number;
  phone: string;
  gender: boolean;
  role: string;
  skill: [];
  certification: [];
}

export default function ManageUser() {
  const [keyword, setKeyword] = useState<string>("");
  const [displayedUsers, setDisplayedUsers] = useState<any[]>([]); // Danh sách hiển thị
  const [visible, setVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<number>(0);
  const [form] = Form.useForm();
  const router = useRouter();
  const updateUserMutation = useUpdateProfileMutation();
  const { refetch } = getAllUser();
  const deleteUser = deleteUserMutation();
  const { refetch: refetchAllUsers } = getAllUser();
  const { data: dataUser, isError: isErrorUser } = getAllUser();
  const { data: dataSearch } = searchUser(keyword); // Dữ liệu từ tìm kiếm

  // Cột dữ liệu cho bảng
  const columns: ColumnsType<DataType> = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Role",
      key: "role",
      dataIndex: "role",
      className: "text-uppercase",
    },
    {
      title: "Certification",
      key: "certification",
      dataIndex: "certification",
      render: (_, { certification }) => (
        <div>
          {(Array.isArray(certification) ? certification : []).map((tag) => (
            <Tag className="mt-1" key={tag}>
              {tag}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: "Skill",
      key: "skill",
      dataIndex: "skill",
      render: (_, { skill }) => (
        <div>
          {(Array.isArray(skill) ? skill : []).map((tag) => (
            <Tag className="mt-1" key={tag}>
              {tag}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "x",
      render: (_, { id, name, role, certification, skill }) => (
        <div className="d-flex gap-3">
          <Button
            onClick={() => {
              form.setFieldsValue({
                id,
                name,
                role,
                skill,
                certification,
              });
              setSelectedUser(id);
              setVisible(true); // Show modal on click
            }}
          >
            View & Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={async () => {
              try {
                await deleteUser.mutateAsync(id);
                toast.success("Xóa thành công");
                refetchAllUsers();
              } catch (error: any) {
                toast.error(error?.content?.content || "Có lỗi xảy ra");
              }
            }}
          >
            DEL
          </Button>
        </div>
      ),
    },
  ];

  // Lấy danh sách người dùng từ API
  useEffect(() => {
    if (dataUser) {
      setDisplayedUsers(dataUser.content.content); // Khởi tạo danh sách người dùng
    }
    if (isErrorUser) {
      toast.error("Không thể lấy danh sách User", { position: "bottom-right" });
    }
  }, [dataUser, isErrorUser]);

  useEffect(() => {
    if (keyword) {
      if (dataSearch) {
        setDisplayedUsers(dataSearch.content.content);
      }
    } else if (dataUser) {
      setDisplayedUsers(dataUser.content.content);
    }
  }, [keyword, dataSearch, dataUser]);

  const handleModalOk = async (value: any) => {
    // Handle modal OK logic here, e.g., saving changes
    try {
      await updateUserMutation.mutateAsync({ data: value, id: value.id });
      toast.success("Cập nhật dữ liệu thành công");
      setVisible(false);
    } catch (error: any) {
      toast.error(error.content.content || "Có lỗi xảy ra, vui lòng thử lại");
    }
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  };

  const handleModalCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <AddAdmin />
      <Input
        placeholder="Tìm kiếm thông tin người dùng ..."
        type="text"
        className="inp_search mb-3"
        onChange={(e) => {
          setKeyword(e.target.value.trim().toLowerCase());
        }}
      />
      <Table columns={columns} dataSource={displayedUsers} rowKey="id" />

      {/* Modal to View & Edit User */}
      <Modal
        visible={visible}
        title={`Edit User: ${selectedUser}`}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        footer={[
          <Button key="back" onClick={handleModalCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" onClick={handleModalOk}>
            Submit
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" onFinish={handleModalOk}>
          <Form.Item label="User ID" name="id" hidden>
            <Input disabled />
          </Form.Item>

          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Role" name="role" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="Admin">Admin</Select.Option>
              <Select.Option value="User">User</Select.Option>
              <Select.Option value="Manager">Manager</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Skills" name="skill">
            <Select mode="tags" placeholder="Add skills">
              {/* Replace with available skills */}
              <Select.Option value="React">React</Select.Option>
              <Select.Option value="Node.js">Node.js</Select.Option>
              <Select.Option value="Python">Python</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Certifications" name="certification">
            <Select mode="tags" placeholder="Add certifications">
              {/* Replace with available certifications */}
              <Select.Option value="AWS Certified">AWS Certified</Select.Option>
              <Select.Option value="React Certified">
                React Certified
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
