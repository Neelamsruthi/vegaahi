
import { Routes, Route } from 'react-router-dom'
import StudentDashboard from './StudnetDashboard'
import Studentprofile from './StudentProfile'
import Allcourses from './Allcourses'
import EnrollmentDetails from './EnrollmentDetails'
import UserQuizList from './UserQuizList'
import QuizAttempt from './QuizAttempt'
import Allusers from './Allusers'
import UserNotifications from './UserNotifications'


const studentdashboard = () => {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/profile" element={<Studentprofile />} />
        <Route path="/allcourses" element={<Allcourses />} />
        <Route path="/enrollments" element={<EnrollmentDetails/>} />
        <Route path="/quizzes" element={<UserQuizList/>} />
        <Route path="/quiz/:id" element={<QuizAttempt />} />
        <Route path="/allusers" element={<Allusers />} /> 
        <Route path="/notifications" element={<UserNotifications />} />
        {/* Add more routes as needed */}
      </Routes>
    </>
  )
}

export default studentdashboard