import React, { useState, useEffect } from 'react';
import { createStudent } from '../services/studentApi';

interface StudentFormProps {
  onStudentCreated: () => void;
}

const mono: React.CSSProperties = { fontFamily: "'JetBrains Mono', ui-monospace, monospace" };
const sans: React.CSSProperties = { fontFamily: "'Inter', system-ui, sans-serif" };

const StudentForm: React.FC<StudentFormProps> = ({ onStudentCreated }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const validateEmail = (emailStr: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailStr);

  useEffect(() => {
    if (!success) return;
    const t = setTimeout(() => setSuccess(null), 3000);
    return () => clearTimeout(t);
  }, [success]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!firstName || !lastName || !email) {
      setError('All fields are required.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      const response = await createStudent({
        firstName,
        lastName,
        email: email.trim().toLowerCase(),
      });

      if (response.success) {
        setSuccess('Record written to directory.');
        setFirstName('');
        setLastName('');
        setEmail('');
        onStudentCreated();
      } else {
        setError(response.message || 'Failed to create student.');
      }
    } catch (err: any) {
      setError('Unable to reach backend server. Check if backend is running on port 3000.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl overflow-hidden border border-[#313244] bg-[#1e1e2e] shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 px-4 py-3 bg-[#181825] border-b border-[#313244]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#f38ba8]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#fab387]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#a6e3a1]" />
        <span className="ml-2 text-[11px] text-[#6c7086]" style={mono}>
          ~/student-form.tsx
        </span>
      </div>

      <div className="p-6 md:p-7">
        <p className="text-[11px] text-[#cba6f7] mb-1" style={mono}>
          $ register --new-student
        </p>
        <h2 className="text-lg font-bold text-[#cdd6f4]" style={sans}>
          Add New Student
        </h2>
        <p className="text-xs text-[#6c7086] mt-0.5 mb-6" style={sans}>
          Fields are required · email is normalized to lowercase
        </p>

        {success && (
          <div className="mb-4 px-3 py-2.5 bg-[#a6e3a1]/10 border border-[#a6e3a1]/30 text-[#a6e3a1] text-xs rounded-lg flex items-center gap-2" style={mono}>
            <span>[ok]</span> <span>{success}</span>
          </div>
        )}

        {error && (
          <div className="mb-4 px-3 py-2.5 bg-[#f38ba8]/10 border border-[#f38ba8]/30 text-[#f38ba8] text-xs rounded-lg flex items-center gap-2" style={mono}>
            <span>[error]</span> <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-[10px] font-semibold text-[#a6adc8] uppercase tracking-wider mb-1.5" style={mono}>
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="Alex"
              className="w-full px-3.5 py-2.5 rounded-md border border-[#313244] bg-[#11111b] text-[#cdd6f4] placeholder-[#6c7086] text-sm focus:outline-none focus:border-[#cba6f7] focus:ring-1 focus:ring-[#cba6f7]/40 transition-all disabled:opacity-50"
              style={mono}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-[10px] font-semibold text-[#a6adc8] uppercase tracking-wider mb-1.5" style={mono}>
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Mercer"
              className="w-full px-3.5 py-2.5 rounded-md border border-[#313244] bg-[#11111b] text-[#cdd6f4] placeholder-[#6c7086] text-sm focus:outline-none focus:border-[#cba6f7] focus:ring-1 focus:ring-[#cba6f7]/40 transition-all disabled:opacity-50"
              style={mono}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-[10px] font-semibold text-[#a6adc8] uppercase tracking-wider mb-1.5" style={mono}>
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="alex.mercer@univ.com"
              className="w-full px-3.5 py-2.5 rounded-md border border-[#313244] bg-[#11111b] text-[#cdd6f4] placeholder-[#6c7086] text-sm focus:outline-none focus:border-[#cba6f7] focus:ring-1 focus:ring-[#cba6f7]/40 transition-all disabled:opacity-50"
              style={mono}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 rounded-md bg-[#cba6f7] hover:bg-[#dcc6fb] active:bg-[#b493e8] text-[#1e1e2e] font-semibold text-sm shadow-lg shadow-[#cba6f7]/10 transition-all disabled:opacity-50 flex justify-center items-center gap-2"
            style={mono}
          >
            {loading ? (
              <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-[#1e1e2e] border-t-transparent" />
            ) : (
              <span>&gt;</span>
            )}
            {loading ? 'writing...' : 'register_student'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
