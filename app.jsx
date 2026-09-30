// App.jsx
import React, { useState } from 'react';
import Dashboard from './Dashboard';
import StudentDetail from './StudentDetail';

function App() {
  const [selectedStudent, setSelectedStudent] = useState(null);

  return (
    <div>
      {!selectedStudent ? (
        <Dashboard onSelectStudent={setSelectedStudent} />
      ) : (
        <StudentDetail studentName={selectedStudent} onBack={() => setSelectedStudent(null)} />
      )}
    </div>
  );
}
export default App;
