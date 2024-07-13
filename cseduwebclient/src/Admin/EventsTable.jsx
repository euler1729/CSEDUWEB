import { Table, Button, Space, Input, Modal, Form, DatePicker, TimePicker } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import useGetAllEvents from "../hook/Events/useGetAllEvents";

const { Search } = Input;

const EventsTable = () => {
  const [data, setEventsList] = useGetAllEvents();
  const [searchText, setSearchText] = useState("");
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleDelete = (id) => {
    setEventsList(data.filter((item) => item.id !== id));
  };

  const handleUpdate = (record) => {
    setFormData(record);
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
    // Here you can handle form submission
    console.log("Form submitted with values: ", formData);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Date and Time",
      dataIndex: "date_and_time",
      key: "date_and_time",
    },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description",
    // },
    {
      title: "Event Title",
      dataIndex: "event_title",
      key: "event_title",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleUpdate(record)}>Update</Button>
          <Button danger onClick={() => handleDelete(record?.id)}>
            Delete
          </Button>
          <Button>
            <Link to={`/dashboard/eventresponses/${record?.id}`}>
              Responses
            </Link>
          </Button>
        </Space>
      ),
    },
  ];

  const filteredData = searchText
    ? data.filter((record) =>
        columns.some((column) =>
          record[column.dataIndex]
            ?.toString()
            .toLowerCase()
            .includes(searchText.toLowerCase())
        )
      )
    : data;

  return (
    <div>
      <div className="flex justify-between items-center">
        <Search
          placeholder="Search"
          allowClear
          enterButton
          onSearch={handleSearch}
          style={{ marginBottom: 16 }}
          className="w-1/2"
        />
        <Button>
          <Link to="/dashboard/addevents">Add Events</Link>
        </Button>
      </div>
      <Table columns={columns} dataSource={filteredData} />

      <Modal
        title="Update Event"
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          layout="vertical"
          initialValues={formData}
          onFinish={(values) => {
            setFormData(values);
            handleOk();
          }}
        >
          {/* <Form.Item label="Date" name="date">
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item> */}
          <Form.Item label="Description" name="description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Event Title" name="event_title">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EventsTable;
