"use client";
import React, { useRef, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  FolderOpenOutlined,
  RiseOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Avatar, Dropdown } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CustomLogo from "@/assets/CustomLogo/CustomLogo";
import UserUpdate from "@/components/ui/UserUpdate";
const { Header, Sider, Content } = Layout;

function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const refUpdateUserDialog = useRef<any>(null);

  const userLogin = localStorage.getItem("userLogin");
  if (!userLogin) {
    router.push("/login");
  }
  const user = JSON.parse(userLogin as string);
  const [collapsed, setCollapsed] = useState(false);

  // Menu definition
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <UserUpdate ref={refUpdateUserDialog} />
        <button
          className="dropdown-item"
          type="button"
          onClick={() => {
            router.push("/profile");
          }}
        >
          Cập Nhập Thông Tin
        </button>
      </Menu.Item>
      <Menu.Item key="2">
        <button
          className="dropdown-item"
          type="button"
          onClick={() => {
            router.push("/"); // Handle logout
          }}
        >
          Đăng Xuất
        </button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className="min-h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="ant-layout-sider-children">
          <div className="d-flex flex-column">
            <div className="title mt-3 mx-3">
              <h4>Dashboard</h4>
            </div>
            <ul className="ul mt-3 d-block">
              <li className="li mt-5 mx-3">
                <Link
                  className="text-dark active"
                  href="/admin/manager-user"
                  aria-current="page"
                >
                  <UserOutlined /> Manage User
                </Link>
              </li>
              <li className="li mt-5 mx-3">
                <Link className="text-dark" href="/admin/manager-job">
                  <RiseOutlined /> Manage Job
                </Link>
              </li>
              <li className="li mt-5 mx-3">
                <Link className="text-dark" href="/admin/manager-job-type">
                  <FolderOpenOutlined /> Manage JobType
                </Link>
              </li>
              <li className="li mt-5 mx-3">
                <Link className="text-dark" href="/admin/manager-service">
                  <BarChartOutlined /> Manage Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background d-flex justify-content-between align-items-center p-4"
          style={{ padding: 0 }}
        >
          <div className="left flex flex-row items-center">
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
            <Link href={"/"}>
              <CustomLogo color={"#404145"} />
            </Link>
          </div>
          <div className="flex flex-row items-center">
            {/* Dropdown menu passed correctly */}
            <Dropdown overlay={menu} trigger={["click"]}>
              <div className="flex flex-row items-center cursor-pointer">
                <Avatar
                  src={
                    user?.avatar ||
                    "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                  }
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    marginRight: 10,
                  }}
                />
                <span>{user?.name}</span>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{ margin: "24px 16px", padding: 24, height: "100vh" }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
