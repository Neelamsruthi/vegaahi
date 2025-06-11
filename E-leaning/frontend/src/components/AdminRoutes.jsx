import { Routes, Route } from 'react-router-dom'
import AdminDashboard from './AdminDashboard'
import Profile from './profile'
import UserList from './UserList'
import AddCourse from './AddCourse'
import ViewCourses from './ViewCourse'
import QuizForm from './QuizForm'
import QuizSubmissions from './QuizSubmissions'
import SendNotificationForm from './SendNotificationForm'

const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/userlist" element={<UserList />} />
      <Route path="/addcourse" element={<AddCourse />} />
      <Route path="/viewcourses" element={<ViewCourses />} />
      <Route path="/createquiz" element={<QuizForm/>} />
      <Route path="/sendnotification" element={<SendNotificationForm />} />
        {/* Add more routes as needed */}
    <Route path="/admin/quizzes/:id" element={<QuizSubmissions />} />

      </Routes>
    </>
  )
}

export default AdminRoutes