import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { CongViecViewModel, Job } from "@/schemas/job";

interface JobUpdateProps {
  jobData: CongViecViewModel;
}

const JobUpdate = forwardRef<any, JobUpdateProps>(({ jobData }, ref) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    open() {
      setVisible(true);
      form.setFieldsValue(jobData); // Set form values based on the job data
    },
  }));

  const handleOk = () => {
    // Handle form submission logic here
    console.log(form.getFieldsValue());
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Modal
      title={`Update Job: ${jobData.id}`}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Submit
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Job ID" name="id" initialValue={jobData.id}>
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Name"
          name="tenCongViec"
          initialValue={jobData.tenCongViec}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="moTaNgan"
          initialValue={jobData.moTaNgan}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Price" name="giaTien" initialValue={jobData.giaTien}>
          <Input />
        </Form.Item>
        <Form.Item label="Rate" name="danhGia" initialValue={jobData.danhGia}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default JobUpdate;
