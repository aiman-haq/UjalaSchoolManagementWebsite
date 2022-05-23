// Authentication
import Login from "./screens/Login.js";
// User Profile
import Profile from "./components/Common/Profile/Profile.js";
// Admin
import Admin from "./screens/Admin";
import RegisterUser from "./components/Admin/registerUser.js";
import UpdateUser from "./components/Admin/updateUser.js";
import ManageUsers from "./components/Admin/mangeUsers.js";
// Students
import Student from "./screens/Student.js";
import StudentDetails from "./components/Student/studentDetails.js";
import StudentRegister from "./components/Student/studentRegister.js";
import StudentUpdate from "./components/Student/studentUpdate";
// Teachers
import TeacherRegister from "./components/Teacher/teacherRegister.js";
import TeacherDetails from "./components/Teacher/teacherDetails.js";
import TeacherUpdate from "./components/Teacher/teacherUpdate.js";
// Leaving Certificate
import CertificateDetails from "./components/LeavingCertifcate/certificateDetails.js";
import CertificateUpdate from "./components/LeavingCertifcate/editCertificate.js";
import CertificateRegister from "./components/LeavingCertifcate/issueCertificate";
// Finance
import Finance from "./screens/Finance.js";
import StudentFeesDetails from "./components/StudentFees/studentsFeesDetails.js";
import StudentFees from "./components/StudentFees/studentFees.js";
import ManageFees from "./components/StudentFees/manageFees.js";
import EditFeeVoucher from "./components/StudentFees/editFeeVoucher.js";
import AddFeeVoucher from "./components/StudentFees/addFeeVoucher.js";
import GenerateAll from "./components/StudentFees/generateAll.js";
const routes = [
  {
    path: "/login",
    component: Login,
  },

  {
    path: "/student",
    component: Student,
    routes: [
      {
        path: "/student/profile",
        component: Profile,
      },

      {
        path: "/student/add-student",
        component: StudentRegister,
      },
      {
        path: "/student/manage-student",
        component: StudentDetails,
      },
      {
        path: "/student/add-teacher",
        component: TeacherRegister,
      },
      {
        path: "/student/manage-teacher",
        component: TeacherDetails,
      },
      {
        path: "/student/add-certificate",
        component: CertificateRegister,
      },
      {
        path: "/student/manage-certificate",
        component: CertificateDetails,
      },
      {
        path: "/student/teacher/:id",
        component: TeacherUpdate,
      },
      {
        path: "/student/students/:id",
        component: StudentUpdate,
      },
      {
        path: "/student/certificate/:id",
        component: CertificateUpdate,
      },
    ],
  },
  {
    path: "/admin",
    component: Admin,
    routes: [
      {
        path: "/admin/profile",
        component: Profile,
      },
      {
        path: "/admin/register-user",
        component: RegisterUser,
      },
      {
        path: "/admin/manage-users",
        component: ManageUsers,
      },
      {
        path: "/admin/:id",
        component: UpdateUser,
      },
    ],
  },
  ,
  {
    path: "/finance",
    component: Finance,
    routes: [
      {
        path: "/finance/profile",
        component: Profile,
      },
      {
        path: "/finance/manage-student",
        component: StudentFeesDetails,
      },
      {
        path: "/finance/manage-fees",
        component: ManageFees,
      },
      {
        path: "/finance/manage-student-fees/:id",
        component: StudentFees,
      },
      {
        path: "/finance/add-fee-voucher/:id",
        component: AddFeeVoucher,
      },
      {
        path: "/finance/edit-fee-voucher/:id",
        component: EditFeeVoucher,
      },
      {
        path: "/finance/generate-all",
        component: GenerateAll,
      },
    ],
  },
];

export default routes;
