import React, { useEffect, useState, useCallback } from 'react';
import { getAllStudents, deleteStudent } from '../services/studentApi';

interface Student { id: string; firstName: string; lastName: string; email: string; normalizedEmail?: string; }

const mono = { fontFamily: "ui-monospace, 'JetBrains Mono', monospace" };
const card = { borderRadius: 12, overflow: 'hidden', border: '1px solid #313244', background: '#1e1e2e', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' };
const titlebar = { display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', background: '#181825', borderBottom: '1px solid #313244' };
const dot = (c: string) => ({ width: 10, height: 10, borderRadius: '50%', background: c });

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
    <div style={card}>
      <div style={titlebar}>
        <span style={dot('#f38ba8')} /><span style={dot('#fab387')} /><span style={dot('#a6e3a1')} />
        <span style={{ marginLeft: 8, fontSize: 11, color: '#6c7086', ...mono }}>~/directory.sh</span>
      </div>
      <div style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Student Directory</h2>
            <p style={{ color: '#6c7086', fontSize: 12, margin: '4px 0 0' }}>Active records in database</p>
          </div>
          <span style={{ padding: '4px 12px', background: '#313244', color: '#a6e3a1', fontSize: 12, borderRadius: 999, border: '1px solid #45475a', ...mono }}>n={students.length}</span>
        </div>

        {error && (
          <div style={{ marginBottom: 16, padding: '12px 16px', background: 'rgba(243,139,168,0.1)', border: '1px solid rgba(243,139,168,0.3)', color: '#f38ba8', fontSize: 12, borderRadius: 8, display: 'flex', justifyContent: 'space-between', ...mono }}>
            <span>[error] {error}</span>
            <button onClick={fetchStudents} style={{ background: 'none', border: 'none', color: '#f38ba8', textDecoration: 'underline', cursor: 'pointer', fontSize: 12 }}>retry</button>
          </div>
        )}

        {loading && students.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#6c7086', fontSize: 12, padding: '40px 0', ...mono }}>fetching records...</p>
        ) : students.length === 0 && !error ? (
          <div style={{ textAlign: 'center', padding: '40px 0', border: '1px dashed #313244', borderRadius: 8, background: 'rgba(17,17,27,0.5)' }}>
            <p style={{ color: '#a6adc8', fontSize: 12, ...mono, margin: 0 }}>$ ls students/ → 0 results</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: '#181825', color: '#6c7086', fontSize: 10, textTransform: 'uppercase', ...mono }}>
                <th style={{ padding: '10px 16px', textAlign: 'left' }}>#</th>
                <th style={{ padding: '10px 16px', textAlign: 'left' }}>Student</th>
                <th style={{ padding: '10px 16px', textAlign: 'left' }}>Email</th>
                <th style={{ padding: '10px 16px', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr key={s.id} style={{ borderTop: '1px solid #26263a' }}>
                  <td style={{ padding: '12px 16px', color: '#45475a', fontSize: 12, ...mono }}>{String(i + 1).padStart(3, '0')}</td>
                  <td style={{ padding: '12px 16px', fontWeight: 300, color: "#a6adc8", fontSize: 12, ...mono }}>{s.firstName} {s.lastName}</td>
                  <td style={{ padding: '12px 16px', color: '#a6adc8', fontSize: 12, ...mono }}>{s.normalizedEmail || s.email}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <button onClick={() => handleDelete(s.id)} style={{ background: 'none', border: 'none', color: '#f38ba8', cursor: 'pointer', fontSize: 12, ...mono }}>delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default StudentList;
