import React, { useEffect, useState, useCallback } from 'react';
import { getAllStudents, deleteStudent } from '../services/studentApi';

interface Student { id: string; firstName: string; lastName: string; email: string; normalizedEmail?: string; }

const StudentList: React.FC<{ refreshTrigger: number }> = ({ refreshTrigger }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStudents = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const response = await getAllStudents();
      if (response.success && response.data) setStudents(response.data);
      else setError(response.message || 'Failed to fetch directory.');
    } catch {
      setError('Cannot connect to backend API (http://localhost:3000). Check server status.');
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchStudents(); }, [fetchStudents, refreshTrigger]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this student record?')) return;
    try {
      const response = await deleteStudent(id);
      if (response.success) fetchStudents();
      else setError(response.message || 'Deletion failed.');
    } catch { setError('Network error during deletion.'); }
  };

  return (
    <div className="bg-[#1e1e2e] text-[#cdd6f4] rounded-xl border border-[#313244] shadow-2xl overflow-hidden font-sans">
      <div className="bg-[#181825] px-4 py-3 flex items-center border-b border-[#313244]">
        <div className="flex space-x-2">
          <span className="w-3 h-3 rounded-full inline-block bg-[#f38ba8]" />
          <span className="w-3 h-3 rounded-full inline-block bg-[#fab387]" />
          <span className="w-3 h-3 rounded-full inline-block bg-[#a6e3a1]" />
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-5">
          <div>
            <h2 className="text-lg font-bold m-0">Student Directory</h2>
            <p className="text-[#6c7086] text-xs mt-1 mb-0">Active records in database</p>
          </div>
          <span className="px-3 py-1 bg-[#313244] text-[#a6e3a1] text-xs rounded-full border border-[#45475a] font-mono">
            n={students.length}
          </span>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 bg-[rgba(243,139,168,0.1)] border border-[rgba(243,139,168,0.3)] text-[#f38ba8] text-xs rounded-lg flex justify-between items-center font-mono">
            <span>[error] {error}</span>
            <button
              onClick={fetchStudents}
              className="bg-transparent border-none text-[#f38ba8] underline cursor-pointer text-xs"
            >
              retry
            </button>
          </div>
        )}

        {loading && students.length === 0 ? (
          <p className="text-center text-[#6c7086] text-xs py-10 font-mono">fetching records...</p>
        ) : students.length === 0 && !error ? (
          <div className="text-center py-10 border border-dashed border-[#313244] rounded-lg bg-[rgba(17,17,27,0.5)]">
            <p className="text-[#a6adc8] text-xs font-mono m-0">$ ls students/ → 0 results</p>
          </div>
        ) : (
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#181825] text-[#6c7086] text-[10px] uppercase font-mono">
                <th className="py-2.5 px-4 text-left">#</th>
                <th className="py-2.5 px-4 text-left">Student</th>
                <th className="py-2.5 px-4 text-left">Email</th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr key={s.id} className="border-t border-[#26263a]">
                  <td className="py-3 px-4 text-[#45475a] text-xs font-mono">{String(i + 1).padStart(3, '0')}</td>
                  <td className="py-3 px-4 font-light text-[#a6adc8] text-xs font-mono">{s.firstName} {s.lastName}</td>
                  <td className="py-3 px-4 text-[#a6adc8] text-xs font-mono">{s.normalizedEmail || s.email}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="bg-transparent border-none text-[#f38ba8] cursor-pointer text-xs font-mono"
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default StudentList;
