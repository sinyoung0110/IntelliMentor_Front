import React, { useEffect, useState } from 'react';
import { FaRegSmile, FaRegFrown, FaRegMeh } from "react-icons/fa";
import { attendance } from '../../api/memberApi'; // attendance 함수 import
import { useSelector } from 'react-redux'; // 로그인 상태 확인을 위한 useSelector import

const DataComponent = () => {
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const loginState = useSelector(state => state.loginSlice); // 로그인 상태 가져오기

  // 서버로부터 데이터를 받아오는 함수
  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const data = await attendance(); // 서버에서 출석 데이터 가져오기
        setAttendanceData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch attendance data');
        setLoading(false);
      }
    };

    if (loginState.email) {
      fetchAttendanceData(); // 로그인한 경우에만 출석 데이터를 가져옴
    } else {
      setAttendanceData({
        mon: null,
        tue: null,
        wed: null,
        thu: null,
        fri: null,
        sat: null,
        sun: null,
      });
      setLoading(false);
    }
  }, [loginState.email]);

  // 요일에 맞는 이모지와 색상을 반환하는 함수
  const renderEmoji = (status) => {
    if (status === true) {
      return <FaRegSmile size="40" color="#8FB299" style={{ marginRight: '10px' }} />; // 초록색 이모지
    } else if (status === false) {
      return <FaRegFrown size="40" color="#FBB241" style={{ marginRight: '10px' }} />; // 노란색 우는 이모지
    } else {
      return <FaRegMeh size="40" color="#BFBFBF" style={{ marginRight: '10px' }} />; // 회색 이모지
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="data-component">
      <h2>Attendance Table</h2>
      <div className="table-container">
        <table className="attendance-table" style={{ minWidth: 'none' }}>
          <thead>
            <tr>
              <th>MON</th>
              <th>TUE</th>
              <th>WED</th>
              <th>THU</th>
              <th>FRI</th>
              <th>SAT</th>
              <th>SUN</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ textAlign: 'center', paddingLeft: '10px' }}>{renderEmoji(attendanceData.mon)}</td>
              <td style={{ textAlign: 'center', paddingLeft: '10px' }}>{renderEmoji(attendanceData.tue)}</td>
              <td style={{ textAlign: 'center', paddingLeft: '10px' }}>{renderEmoji(attendanceData.wed)}</td>
              <td style={{ textAlign: 'center', paddingLeft: '10px' }}>{renderEmoji(attendanceData.thu)}</td>
              <td style={{ textAlign: 'center', paddingLeft: '10px' }}>{renderEmoji(attendanceData.fri)}</td>
              <td style={{ textAlign: 'center', paddingLeft: '10px' }}>{renderEmoji(attendanceData.sat)}</td>
              <td style={{ textAlign: 'center', paddingLeft: '10px' }}>{renderEmoji(attendanceData.sun)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataComponent;
