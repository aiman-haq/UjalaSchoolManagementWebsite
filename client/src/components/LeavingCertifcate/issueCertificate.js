import React, { useEffect, useState } from "react";
import Stepper from "bs-stepper";
import StepperHeader from "../Common/Stepper/stepperHeader";
import StepperContent from "../Common/Stepper/stepperContent";
import StepperSelect from "../Common/Stepper/stepperSelector";
import StepperTextArea from "../Common/Stepper/stepperTextArea";
import StudentService from "../../services/student.service";
import AuthService from "../../services/auth.service";
import CertificateService from "../../services/certificates.service.js";
export default function CertificateRegister(props) {
  const [student, setStudent] = useState({
    studentId: "",
    studentName: "",
    rollNumber: "",
    reason: "",
    approvedById: "",
    approvedByName: "",
    approvedDate: "",
  });

  const [stepper, setStepper] = useState(0);
  const [message, setMesagge] = useState({
    text: "",
  });

  const [studentList, setStudentList] = useState([]);

  const headers = [
    {
      target: "#student-part",
      name: "School Leaving Certificate",
    },
  ];

  useEffect(() => {
    const stepperEl = document.querySelector("#stepper1");
    setStepper(
      new Stepper(stepperEl, {
        linear: false,
        animation: true,
      })
    );
    // Create an array of student roll numbers only
    StudentService.getAllStudents().then((res) => {
      const rollNumbers = res.data.map((student) => student.rollNumber);
      setStudentList(rollNumbers);

      const date = new Date();

      // ✅ Reset a Date's time to midnight
      date.setHours(0, 0, 0, 0);

      // ✅ Format a date to YYYY-MM-DD (or any other format)
      function padTo2Digits(num) {
        return num.toString().padStart(2, "0");
      }

      function formatDate(date) {
        return [
          date.getFullYear(),
          padTo2Digits(date.getMonth() + 1),
          padTo2Digits(date.getDate()),
        ].join("-");
      }
      const currentUser = AuthService.getCurrentUser();
      setStudent({
        ...student,
        rollNumber: res.data[0].rollNumber,
        studentId: res.data[0]._id,
        studentName: res.data[0].name,
        approvedDate: formatDate(date),
        approvedByName: currentUser.name,
        approvedById: currentUser.id,
      });
    });
  }, []);
  const updateState = (rollNumber) => {
    StudentService.getAllStudents().then((res) => {
      const data = res.data.filter((temp) => {
        return temp.rollNumber == rollNumber.toString();
      });
      setStudent({
        ...student,
        studentId: data[0]._id,
        studentName: data[0].name,
        rollNumber: data[0].rollNumber,
      });
      console.log(student);
    });
  };

  const createStudent = () => {
    CertificateService.registerCertificate(student).then(
      () => {
        props.history.push("/student/manage-certificate");
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(resMessage);
        setMesagge({ ...message, text: resMessage });
      }
    );
  };
  const handleSelect = (event) => {
    const { value } = event.target;
    updateState(value);
  };

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) Start */}
      <section className="content-header">
        {/* /.container-fluid */}
        <div className="container-fluid">
          <div className="row mb-2">
            {/* Page Heading Start */}
            <div className="col-sm-6">
              <h1> School Leaving Certificate </h1>
            </div>
            {/* Page Heading End */}
            {/* Homepage Link Start */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/home"> Home </a>
                </li>
                <li className="breadcrumb-item active"> Register Student </li>
              </ol>
            </div>
            {/* Homepage Link End */}
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* Content Header (Page header) End */}
      {/* Content (Page Content) Start */}
      <section className="content">
        <div className="row">
          <div className="col-md-12">
            {/* Card Start */}
            <div className="card card-default">
              {/* Card Header Start */}
              <div className="card-header">
                <h3 className="card-title"> Add - Student </h3>
              </div>
              {/* Card Header Start */}
              {/* Card Body Start */}
              <div className="card-body p-0">
                <div className="bs-stepper" id="stepper1">
                  {/* BS - STEPPER HEADER Start */}
                  <StepperHeader headers={headers} />
                  {/* BS - STEPPER HEADER End */}
                  {/* BS - STEPPER CONTENT Start */}
                  <div className="bs-stepper-content">
                    {/* Student Information*/}
                    <div id="student-part" className="content" role="tabpanel">
                      <div className="row">
                        <div className="col-md-6">
                          <StepperSelect
                            name={"Roll Number"}
                            value={student.rollNumber}
                            options={studentList}
                            onChange={handleSelect}
                          />
                          {/* Name */}
                          <StepperContent
                            placeholder={"Full Name"}
                            value={student.studentName}
                            name={"Name"}
                          />
                          <StepperTextArea
                            name={"Reason"}
                            value={student.reason}
                            rows={2}
                            placeholder={"Address"}
                            onChange={(event) =>
                              setStudent({
                                ...student,
                                reason: event.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-md-6">
                          {/* Registration Number */}
                          <StepperContent
                            name={"Approved By"}
                            value={student.approvedByName}
                            placeholder={"Approved By"}
                          />
                          {/* Date of Admission */}
                          <StepperContent
                            name={"Date of Approval"}
                            value={student.approvedDate}
                            placeholder={"Date of Approval"}
                            onChange={(event) =>
                              setStudent({
                                ...student,
                                approvedDate: event.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <button
                        className="btn btn-primary"
                        style={{ margin: 5 }}
                        type="button"
                        onClick={createStudent}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                  {/* BS - STEPPER CONTENT End */}
                </div>
              </div>
              {/* Card Body End */}
              {/* Card Footer */}
              <div className="card-footer" />
            </div>
            {/* Card End */}
          </div>
        </div>
      </section>
      {/* Content (Page Content) End */}
    </div>
  );
}
