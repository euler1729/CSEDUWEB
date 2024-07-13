import { useState } from "react";
import ProgramTitle from "./ProgramTitle";
const programInfo = {
  programName: "B.Sc. in Computer Science and Engineering",
  faculty: "Engineering and Technology",
  duration: "4 Years",
  overview:
    "The B.Sc. in Computer Science and Engineering program is designed to provide students with a comprehensive understanding of both computer science and engineering principles.",
  curriculumAndCourses: "https://example.com/curriculum",
  totalSemesters: 8,
  totalCredits: 160.0,
  semesterDuration: "22 weeks",
  contactHoursTheory: 15,
  contactHoursLab: 30,
  gradingSystem: {
    "A+": "80% and Above (4.00)",
    A: "75% to < 80% (3.75)",
    "A-": "70% to < 75% (3.50)",
    "B+": "65% to < 70% (3.25)",
    B: "60% to < 65% (3.00)",
    "B-": "55% to < 60% (2.75)",
    "C+": "50% to < 55% (2.50)",
    C: "45% to < 50% (2.25)",
    D: "40% to < 45% (2.00)",
    F: "Less Than 40% (0.00)",
  },
  marksDistributionTheory: {
    attendance: "05%",
    assignmentPresentation: "05%",
    incourse: "30%",
    finalExamination: "60%",
  },
  marksDistributionLab: {
    attendance: "10%",
    reports: "20%",
    continuousAssessment: "50%",
    viva: "20%",
  },
  attendanceMarks: {
    "90% and Above": 5.0,
    "85% to < 90%": 4.5,
    "80% to < 85%": 4.0,
    "75% to < 80%": 3.5,
    "70% to < 75%": 3.0,
    "65% to < 70%": 2.5,
    "60% to < 65%": 2.0,
    "Less Than 60%": 0.0,
  },
  courseCoordinatorResponsibilities: [
    "Prepare class routine",
    "Arrange and monitor classes",
    "Arrange extra classes if necessary",
    "Ensure smooth functioning of academic works",
    "Help the Chairman in holding examinations and publishing results",
  ],
  examinationCommittee: {
    numberOfTeachers: 4,
    responsibilities: [
      "Proposed by the Academic Committee",
      "Consists of a Chairman, 2 internal members, and an external member",
      "Course Coordinator is one of the members",
      "External member may be from University of Dhaka or outside",
      "Responsible for question moderation, holding examinations, and publishing results",
    ],
  },
  tabulators: {
    numberOfTabulators: 2,
    responsibilities: [
      "Enter marks given by course teachers/examiners",
      "Process examination results",
    ],
  },
  promotionAndDegreeRequirements: {
    minimumCGPAForPromotion: {
      "2nd semester": 2.0,
      "4th semester": 2.25,
      "6th semester": 2.5,
    },
    minimumCGPAForDegree: 2.5,
    maximumSemestersForDegree: 12,
    reAdmissionAndDropOut: [
      "Failing to get promotion may seek re-admission with the next batch",
      "Maximum of 2 re-admissions allowed",
      "Failing to get minimum CGPA even after 2 re-admissions will result in dropping out",
    ],
    gradeImprovement: [
      "Maximum of 2 chances allowed to clear F grades",
      "Allowed to improve grades only if CGPA is below 2.50",
      "Allowed to improve grades for courses with grade less than or equal to C+",
    ],
  },
};
const item ={
  "Undergraduate Program" :{
    "overview":  <div>
    <h2>{programInfo.programName}</h2>
    <p>
      <strong>Faculty:</strong> {programInfo.faculty}
    </p>
    <p>
      <strong>Duration:</strong> {programInfo.duration}
    </p>
    <p>
      <strong>Overview:</strong> {programInfo.overview}
    </p>
    <p>
      <strong>Curriculum & Courses:</strong>{" "}
      <a href={programInfo.curriculumAndCourses}>View Here</a>
    </p>
    <p>
      <strong>Total Semesters:</strong> {programInfo.totalSemesters}
    </p>
    <p>
      <strong>Total Credits:</strong> {programInfo.totalCredits}
    </p>
    <p>
      <strong>Semester Duration:</strong> {programInfo.semesterDuration}
    </p>
    <p>
      <strong>Contact Hours for Theory Courses:</strong>{" "}
      {programInfo.contactHoursTheory}
    </p>
    <p>
      <strong>Contact Hours for Lab Courses:</strong>{" "}
      {programInfo.contactHoursLab}
    </p>
    <p>
      <strong>Grading System:</strong>
    </p>
    <ul>
      {Object.entries(programInfo.gradingSystem).map(
        ([grade, description]) => (
          <li key={grade}>
            <strong>{grade}:</strong> {description}
          </li>
        )
      )}
    </ul>
    <p>
      <strong>Marks Distribution for Theory Courses:</strong>
    </p>
    <ul>
      {Object.entries(programInfo.marksDistributionTheory).map(
        ([section, percentage]) => (
          <li key={section}>
            <strong>{section}:</strong> {percentage}
          </li>
        )
      )}
    </ul>
    <p>
      <strong>Marks Distribution for Lab Courses:</strong>
    </p>
    <ul>
      {Object.entries(programInfo.marksDistributionLab).map(
        ([section, percentage]) => (
          <li key={section}>
            <strong>{section}:</strong> {percentage}
          </li>
        )
      )}
    </ul>
    <p>
      <strong>Attendance Marks:</strong>
    </p>
    <ul>
      {Object.entries(programInfo.attendanceMarks).map(
        ([attendance, marks]) => (
          <li key={attendance}>
            <strong>{attendance}:</strong> {marks}
          </li>
        )
      )}
    </ul>
    <p>
      <strong>Course Coordinator Responsibilities:</strong>
    </p>
    <ul>
      {programInfo.courseCoordinatorResponsibilities.map(
        (responsibility, index) => (
          <li key={index}>{responsibility}</li>
        )
      )}
    </ul>
    <p>
      <strong>Examination Committee:</strong>
    </p>
    <ul>
      {programInfo.examinationCommittee.responsibilities.map(
        (responsibility, index) => (
          <li key={index}>{responsibility}</li>
        )
      )}
    </ul>
    <p>
      <strong>Tabulators:</strong>
    </p>
    <ul>
      {programInfo.tabulators.responsibilities.map(
        (responsibility, index) => (
          <li key={index}>{responsibility}</li>
        )
      )}
    </ul>
    <p>
      <strong>Promotion and Degree Requirements:</strong>
    </p>
    <ul>
      {Object.entries(programInfo.promotionAndDegreeRequirements).map(
        ([category, details]) => (
          <li key={category}>
            <strong>{category}:</strong>
            <ul>
              {Array.isArray(details)
                ? details.map((item, index) => <li key={index}>{item}</li>)
                : Object.entries(details).map(([subcategory, value]) => (
                    <li key={subcategory}>
                      <strong>{subcategory}:</strong> {value}
                    </li>
                  ))}
            </ul>
          </li>
        )
      )}
    </ul>
                </div>,
    "curriculum":"",
    "syllabus":"",
    "duration":"4 Years"

  },
  "Graduate Program" :{
    "overview": "",
    "curriculum":"",
    "syllabus":"",
    "duration":"1.5 Years",
  },
  "MPhil Program":{
    "overview": "",
    "curriculum":"",
    "syllabus":"",
    "duration":"2 Years",
  },
  "PhD Program":{
    "overview": "",
    "curriculum":"",
    "syllabus":"",
    "duration":"4 Years",
  }
}
const AccademicProgram = ({programName}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  // Render Program Information
  return (
    <div className="mx-10">
      <ProgramTitle degreeName={"B.Sc."} duration={item[programName].duration}></ProgramTitle>
      <div className="mt-5">
        <div className="flex w-[613px] rounded-lg border-[1px] border-[#e7e7e7]">
          <div
            onClick={() => handleTabClick("overview")}
            className={`py-5 px-10 cursor-pointer border-[1px] border-[#e7e7e7] ${
              activeTab === "overview"  ? "text-white bg-[#002147]"
                : "text-black"
            } `}
          >
            OVERVIEW
          </div>
          <div
            onClick={() => handleTabClick("curriculum")}
            className={`py-5 px-10 cursor-pointer  border-[1px] border-[#e7e7e7] ${
              activeTab === "curriculum"
                ? "text-white bg-[#002147]"
                : "text-black"
            } `}
          >
            CURRICULUM & COURSES
          </div>
          <div
            onClick={() => handleTabClick("syllabus")}
            className={`py-5 px-10 cursor-pointer  border-[1px] border-[#e7e7e7] ${
              activeTab === "syllabus"
                ? "text-white bg-[#002147]"
                : "text-black"
            } `}
          >
            ALL SYLLABUS
          </div>
        </div>
        <div className="mt-5">
          {activeTab === "overview" && (
            item[programName].overview
          )}
          {activeTab === "curriculum" && (
            <div>
              <h3>Curriculum & Courses Content</h3>
              <p>This is the curriculum & courses content.</p>
            </div>
          )}
          {activeTab === "syllabus" && (
            <div>
              <h3>All Syllabus Content</h3>
              <p>This is the all syllabus content.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccademicProgram;
