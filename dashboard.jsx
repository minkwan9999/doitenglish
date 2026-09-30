// Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient'; // supabase 셋업 따로 빼야 함

function Dashboard({ onSelectStudent }) {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function loadData() {
      const { data, error } = await supabase
        .from('attendance_homework')
        .select('id, student_name, date, attendance_status, homework_done')
        .order('date', { ascending: false });
      if (error) console.error(error);
      else setRecords(data);
    }
    loadData();
  }, []);

  // 학생별로 가장 최근 기록 뽑아 옴 (대충 구현 예시)
  const latestByStudent = records.reduce((acc, r) => {
    if (!acc[r.student_name] || r.date > acc[r.student_name].date) acc[r.student_name] = r;
    return acc;
  }, {});

  return (
    <div>
      <h1>두잇영어 출결+숙제 대시보드</h1>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>학생</th>
            <th>최근 출결</th>
            <th>최근 숙제</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(latestByStudent).map((rec) => (
            <tr key={rec.id} onClick={() => onSelectStudent(rec.student_name)} style={{ cursor: 'pointer' }}>
              <td>{rec.student_name}</td>
              <td>{rec.attendance_status}</td>
              <td>{rec.homework_done ? '완료' : '미완료'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Dashboard;
