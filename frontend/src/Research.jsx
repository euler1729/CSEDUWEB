import { useState, useEffect } from 'react';
import { Table, Input, Select, Card, Spin } from 'antd';
import useGetAllPublications from './hook/Publications/useGetAllPublications';

const { Option } = Select;

const publicationTypes = [
  { value: 'journal', label: 'Journal' },
  { value: 'conference', label: 'Conference' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'book', label: 'Book' }
];

const Research = () => {
  const [publications, , loading] = useGetAllPublications();
  const [filteredPublications, setFilteredPublications] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    setFilteredPublications(publications);
  }, [publications]);

  const handleSearch = (value) => {
    setSearchText(value);
    filterPublications(value, selectedType);
  };


  const handleTypeChange = (value) => {
    setSelectedType(value);
    filterPublications(searchText, value);
  };

  const filterPublications = (search, type) => {
    let filtered = publications;

    if (search) {
      filtered = filtered.filter(pub => pub.paper_name.toLowerCase().includes(search.toLowerCase()));
    }

    if (type) {
      filtered = filtered.filter(pub => pub.publication_type === type);
    }

    setFilteredPublications(filtered);
  };

  const columns = [
    {
      title: 'Publication Type',
      dataIndex: 'publication_type',
      key: 'publication_type',
    },
    {
      title: 'Paper Name',
      dataIndex: 'paper_name',
      key: 'paper_name',
    },
    {
      title: 'Authors',
      dataIndex: 'authors',
      key: 'authors',
      render: authors => authors.join(', '),
    },
    {
      title: 'Other Authors',
      dataIndex: 'other_authors',
      key: 'other_authors',
    },
    {
      title: 'Publication Year',
      dataIndex: 'publication_year',
      key: 'publication_year',
      sorter: (a, b) => a.publication_year - b.publication_year,
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Spin size="large" />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 p-4">
      <Card className="w-full min-h-[70vh] mb-4">
        <div className="flex justify-between mb-4">
          <Input.Search
            placeholder="Search by paper name"
            onSearch={handleSearch}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
            className="w-1/3"
          />
          <Select
            placeholder="Select publication type"
            value={selectedType}
            onChange={handleTypeChange}
            className="w-1/3"
          >
            <Option value="">All</Option>
            {publicationTypes.map(type => (
              <Option key={type.value} value={type.value}>{type.label}</Option>
            ))}
          </Select>
        </div>
        <Table
          dataSource={filteredPublications}
          columns={columns}
          rowKey="id"
        />
      </Card>
    </div>
  );
};

export default Research;
