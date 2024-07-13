import { Table } from 'antd';

const ChairPersonTable = () => {
  const columns = [
    {
      title: 'Department Name',
      dataIndex: 'department',
      key: 'department',
      render: (text, row, index) => {
        const obj = {
          children: text,
          props: {},
        };
        // Merge rows for 'Dept. of Computer Science'
        if (index === 0) {
          obj.props.rowSpan = 5;
        } else if (index > 0 && index < 5) {
          obj.props.rowSpan = 0;
        }
        // Merge rows for 'Dept. of Computer Science and Engineering'
        if (index === 5) {
          obj.props.rowSpan = 7;
        } else if (index > 5) {
          obj.props.rowSpan = 0;
        }
        return obj;
      },
    },
    {
      title: 'Name of the Chairperson',
      dataIndex: 'chairperson',
      key: 'chairperson',
    },
    {
      title: 'Starting Date',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'Ending Date',
      dataIndex: 'endDate',
      key: 'endDate',
    },
  ];

  const data = [
    {
      key: '1',
      department: 'Dept. of Computer Science',
      chairperson: 'Prof. Dr. M. Lutfar Rahman',
      startDate: '01-09-1992',
      endDate: '31-08-1995',
    },
    {
      key: '2',
      department: 'Dept. of Computer Science',
      chairperson: 'Prof. Dr. Md. Abdul Mottalib',
      startDate: '01-09-1995',
      endDate: '31-08-1998',
    },
    {
      key: '3',
      department: 'Dept. of Computer Science',
      chairperson: 'Dr. Md. Alamgir Hossain',
      startDate: '01-09-1998',
      endDate: '30-09-2000',
    },
    {
      key: '4',
      department: 'Dept. of Computer Science',
      chairperson: 'Md. Rezaul Karim',
      startDate: '01-10-2000',
      endDate: '10-02-2003',
    },
    {
      key: '5',
      department: 'Dept. of Computer Science',
      chairperson: 'Dr. Hafiz Md. Hasan Babu',
      startDate: '19-02-2003',
      endDate: '18-02-2006',
    },
    {
      key: '6',
      department: 'Dept. of Computer Science and Engineering',
      chairperson: 'Dr. Md. Haider Ali',
      startDate: '19-02-2006',
      endDate: '18-02-2009',
    },
    {
      key: '7',
      department: 'Dept. of Computer Science and Engineering',
      chairperson: 'Prof. Dr. Suraiya Pervin',
      startDate: '19-02-2009',
      endDate: '18-02-2012',
    },
    {
      key: '8',
      department: 'Dept. of Computer Science and Engineering',
      chairperson: 'Dr. Md. Hasanuzzaman',
      startDate: '19-02-2012',
      endDate: '19-02-2015',
    },
    {
      key: '9',
      department: 'Dept. of Computer Science and Engineering',
      chairperson: 'Prof. Dr. Shabbir Ahmed',
      startDate: '19-02-2015',
      endDate: '18-02-2018',
    },
    {
      key: '10',
      department: 'Dept. of Computer Science and Engineering',
      chairperson: 'Prof. Dr. Md. Mustafizur Rahman',
      startDate: '19-02-2018',
      endDate: '18-02-2021',
    },
    {
      key: '11',
      department: 'Dept. of Computer Science and Engineering',
      chairperson: 'Prof. Dr. Saifuddin Md Tareeq',
      startDate: '19-02-2021',
      endDate: '18-02-2024',
    },
    {
      key: '12',
      department: 'Dept. of Computer Science and Engineering',
      chairperson: 'Prof. Dr. Md. Abdur Razzaque',
      startDate: '19-02-2024',
      endDate: 'To date',
    },
  ];

  return <Table columns={columns} dataSource={data} pagination={false} bordered />;
};

export default ChairPersonTable;
