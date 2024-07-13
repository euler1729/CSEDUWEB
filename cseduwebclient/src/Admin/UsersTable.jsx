import { Table, Button, Space, Input, Select } from "antd";
import { useState } from "react";
import useGetAllUsers from "../hook/user/useGetAllUsers";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const { Option } = Select;

const { Search } = Input;

const UsersTable = () => {
  const [data, setUserList] = useGetAllUsers();
  const [searchText, setSearchText] = useState("");
  const MySwal = withReactContent(Swal);

  const handleSearch = (value) => {
    setSearchText(value);
  };


  const handleDelete = (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setUserList(data.filter((item) => item.id !== id));
        MySwal.fire("Deleted!", "The user has been deleted.", "success");
      }
    });
  };

  const handleUpdate = (id) => {
    console.log("Update item with id:", id);
  };
  const handleRoleChange = (value, record) => {
    const updatedData = data.map((item) =>
      item.id === record.id ? { ...item, role: value } : item
    );
    setUserList(updatedData);
  };

  const columns = [
    {
        title: "Name",
        key: "name",
        render: (text, record) => `${record.first_name} ${record.last_name}`,
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "eamil",
    },
    {
      title: "Current Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Change Role",
      key: "role",
      render: (text, record) => (
        <Select
          defaultValue={record.role}
          onChange={(value) => handleRoleChange(value, record)}
          placeholder="Select a Role"
        >
          <Option value="admin">Admin</Option>
          <Option value="alumni">Alumni</Option>
          <Option value="teacher">Teacher</Option>
          <Option value="student">Student</Option>
          <Option value="staff">Staff</Option>
        </Select>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleUpdate(record?.id)}>Update</Button>
          <Button danger onClick={() => handleDelete(record?.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const filteredData = searchText
  ? data.filter((record) =>
      columns.some((column) =>
        (column.dataIndex ? record[column.dataIndex] : `${record.first_name} ${record.last_name}`)
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
          placeholder="Search Title"
          allowClear
          enterButton
          onSearch={handleSearch}
          style={{ marginBottom: 16 }}
          className="w-1/2"
        />
      </div>
      <Table columns={columns} dataSource={filteredData} />
    </div>
  );
};

export default UsersTable;
