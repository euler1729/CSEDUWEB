import { Table } from "antd";
import ChairPersonTable from "./ChairPersonTable";
const columns = [
  {
    title: "In Total",
    dataIndex: "inTotal",
    key: "inTotal",
  },
  {
    title: "In Service",
    dataIndex: "inService",
    key: "inService",
  },
  {
    title: "On Study Leave",
    dataIndex: "onStudyLeave",
    key: "onStudyLeave",
  },
  {
    title: "On Leave",
    dataIndex: "onLeave",
    key: "onLeave",
  },
];

const data = [
  {
    key: "1",
    inTotal: "Professor",
    inService: 13,
    onStudyLeave: 0,
    onLeave: 1,
  },
  {
    key: "2",
    inTotal: "Associate Professor",
    inService: 5,
    onStudyLeave: 0,
    onLeave: 1,
  },
  {
    key: "3",
    inTotal: "Assistant Professor",
    inService: 3,
    onStudyLeave: 2,
    onLeave: 1,
  },
  {
    key: "4",
    inTotal: "Lecturer",
    inService: 3,
    onStudyLeave: 10,
    onLeave: 0,
  },
  {
    key: "5",
    inTotal: "Total",
    inService: 24,
    onStudyLeave: 12,
    onLeave: 3,
  },
];

const History = () => {
  return (
    <div >
      <p className="text-justify my-10">
        The journey of the Department of Computer Science and Engineering
        started in a bright morning of September 1992. It was a brainchild of
        Dr. M. Lutfar Rahman, a visionary Professor of the Department of Applied
        Physics and Electronics, University of Dhaka, who felt the urge to come
        up with an academic department to tackle the snowballing necessity for
        computer scientists and IT specialists. In spite of a humble beginning,
        the department, then known as Department of Computer Science, attracted
        the very best minds of the nation and soon accumulated a star studded
        faculty roster as well as the brightest of the students. The department
        started with a single classroom offering M.Sc. degree in Computer
        Science under the Faculty of Science. In 1994, three year B.Sc. Honors
        program was introduced which was upgraded to four year B.Sc. Honors
        program in 1997. It is the first department in the Faculty of Science to
        introduce the four year BSc. program in the University of Dhaka. In
        2004, the name of the department was changed to Computer Science and
        Engineering, leading to its inclusion in the freshly formed Faculty of
        Engineering and Technology in 2008. In 2010, the four point grading
        system was introduced in the Faculty of Engineering and Technology.
        Initially, the department started with 20 students in the M.Sc. program
        in 1992, and then started B.Sc. (Hons) program from 1995 with 21
        students. With the increasing demand of Computer Science graduates for
        the nation, University of Dhaka increased the number of seats for B.Sc.
        (Hons) program to 60 in 1995. So far, 25 batches have completed their
        undergraduate studies and 5 batches are currently pursuing their degrees
        from the department. In addition, 31 batches have completed the graduate
        study (MSc/ MS) programs and currently 1 batch is continuing their MS
        coursework/ research. Although only 11 researchers completed PhD from
        this department, currently there are 4 PhD students pursuing towards
        their degrees in addition to 1 MPhil students. In total, the department
        has 39 active teachers, 19 of whom have already earned their PhD
        degrees. Currently,14 faculty members are on leave for pursuing their
        PhDs from different universities of the world.
      </p>
      <Table columns={columns} dataSource={data} pagination={false} />
      <p className="my-10">
        Currently, Professor Dr. Md. Abdur Razzaque is working as the 12th
        chairperson of the department and leading the progress of the department
        after successful completion of 11 ancestors:
      </p>
      <ChairPersonTable></ChairPersonTable>
      <p className="text-justify my-10">
        Further, there are 15 dedicated officers and staffs who are working
        graciously in order to maintain smooth functioning of the
        administrative, technical and daily support activities of the
        department. From its very inception, the Department of Computer Science
        and Engineering has been a symbol of endurance and excellence in both
        education as well as administrative sector. The department’s pioneering
        stride towards better education and standard operational procedures have
        been spearheaded by the faculties, staffs and students of similar
        mentality. Today, CSEDU is deemed as one of the leading academic
        departments in the country fostering quality education, cutting-edge
        research and development industrial collaboration and student engagement
        in complex problem solving.
      </p>
    </div>
  );
};

export default History;
