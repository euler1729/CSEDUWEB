import { Table, Button, Space, Input } from "antd";
import useGetAllNews from "../hook/News/useGetAllNews";
import { useState } from "react";
import { Link } from "react-router-dom";

const { Search } = Input;

const NewsTable = () => {
  const [data, setNewsList] = useGetAllNews();
  const [searchText, setSearchText] = useState("");

  const handleSearch = (value) => {
    setSearchText(value);
  };


  const handleDelete = (id) => {
    setNewsList(data.filter((item) => item.id !== id));
  };

  const handleUpdate = (id) => {
    console.log("Update item with id:", id);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "news_title",
      key: "news_title",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a?.date) - new Date(b?.date),
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
          placeholder="Search Title"
          allowClear
          enterButton
          onSearch={handleSearch}
          style={{ marginBottom: 16 }}
          className="w-1/2"
        />
        <Button>
          <Link to="/dashboard/addnews">Add News</Link>
        </Button>
      </div>
      <Table columns={columns} dataSource={filteredData} />
    </div>
  );
};

export default NewsTable;
