import { Routes, Route } from 'react-router-dom';
import StudentDashboard from './StudnetDashboard';
import StudentProfile from './StudentProfile';
import UserQuizList from './UserQuizList';
import QuizAttempt from './QuizAttempt';

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<StudentDashboard />} />
      <Route path="/profile" element={<StudentProfile />} />
      <Route path="/quizzes" element={<UserQuizList />} />
      <Route path="/quiz/:id" element={<QuizAttempt />} />
    </Routes>
  );
};

export default StudentRoutes;
