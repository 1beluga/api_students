import { useState, useCallback } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

const mono: React.CSSProperties = { fontFamily: "'JetBrains Mono', ui-monospace, monospace" };

function App() {
  const [refreshListTrigger, setRefreshListTrigger] = useState(0);
  const handleStudentCreated = useCallback(() => {
    setRefreshListTrigger((prev) => prev + 1);
  }, []);

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
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between px-4 py-2 rounded-lg border border-[#313244] bg-[#181825]/80 backdrop-blur text-[11px]" style={mono}>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a6e3a1] animate-pulse" />
            <span className="text-[#a6adc8]">student-portal</span>
          </div>
          <span className="text-[#6c7086]">node · express · react · tailwind</span>
        </div>

        <header className="flex flex-col items-center justify-center text-center space-y-2 py-4">
          <p className="text-xs text-[#cba6f7]" style={mono}>
            beluga@registry:~$ ./student-portal --serve
          </p>
          <h1 className="text-3xl md:text-4xl font-black text-[#cdd6f4] tracking-tight" style={mono}>
            Student_Portal
          </h1>
          <p className="text-xs text-[#6c7086] max-w-sm" style={mono}>
            Node.js + Express API synchronized with React & Tailwind UI
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5">
            <StudentForm onStudentCreated={handleStudentCreated} />
          </div>
          <div className="lg:col-span-7">
            <StudentList refreshTrigger={refreshListTrigger} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
