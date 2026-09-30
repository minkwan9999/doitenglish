// StudentDetail.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

function StudentDetail({ studentName, onBack }) {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function fetchStudentRecords() {
      const { data, error } = await supabase
        .from('attendance_homework')
        .select('*')
        .eq('student_name', studentName)
        .order('date', { ascending: false });

      if (error) console.error(error);
      else setRecords(data);
    }
    fetchStudentRecords();
  }, [studentName]);

  // 복사할 텍스트 만들기
  const copyText = records.map(r => 
    `${r.date}: 출결(${r.attendance_status}), 숙제(${r.homework_done ? '완료' : '미완료'})`
  ).join('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(copyText);
    alert('학부모님께 보낼 내용이 복사되었어요!');
  };

  return (
    <div>
      <button onClick={onBack}>← 대시보드로</button>
      <h2>{studentName} 출결 및 숙제 기록</h2>
      <button onClick={handleCopy}>복사하기</button>
      <pre style={{ whiteSpace: 'pre-wrap', marginTop: 16 }}>
        {copyText}
      </pre>
    </div>
  );
}
export default StudentDetail;
