import { useState, useCallback } from 'react';
import LoginPage from './pages/LoginPage';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import { useAuth } from './context/AuthContext';

function App() {
  const { student } = useAuth();
  const [refreshListTrigger, setRefreshListTrigger] = useState(0);
  const handleStudentCreated = useCallback(() => {
    setRefreshListTrigger((prev) => prev + 1);
  }, []);

  if (!student) {
    return <LoginPage/>
  }

  return (
    <div
      className="min-h-screen text-[#cdd6f4] antialiased py-10 px-4"
      style={{
        background: 'linear-gradient(180deg, #181825 0%, #11111b 100%)',
        backgroundImage:
          'radial-gradient(circle, #26263a 1px, transparent 1px), linear-gradient(180deg, #181825 0%, #11111b 100%)',
        backgroundSize: '22px 22px, 100% 100%',
      }}
    >

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5">
            <StudentForm onStudentCreated={handleStudentCreated} />
          </div>
          <div className="lg:col-span-7">
            <StudentList refreshTrigger={refreshListTrigger} />
          </div>
        </main>
      </div>
  );
}

export default App;
