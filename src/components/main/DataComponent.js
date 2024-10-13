import { useEffect, useState } from 'react';
import { Table, Container } from 'react-bootstrap';
import { FaRegSmile, FaRegFrown, FaRegMeh } from "react-icons/fa";
import { attendance } from '../../api/memberApi'; // attendance 함수 import

const DataComponent = () => {
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

    fetchAttendanceData();
  }, []);

  // 요일에 맞는 이모지와 색상을 반환하는 함수
  const renderEmoji = (status) => {
    if (status === true) {
      return <FaRegSmile size="40" color="#8FB299" />; // 초록색 이모지
    } else if (status === false) {
      return <FaRegFrown size="40" color="#FBB241" />; // 노란색 우는 이모지
    } else {
      return <FaRegMeh size="40" color="#BFBFBF" />; // 회색 이모지
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container className="mt-5">
      <h2>Attendance Table</h2>
      <Table borderless>
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
            <td>{renderEmoji(attendanceData.mon)}</td>
            <td>{renderEmoji(attendanceData.tue)}</td>
            <td>{renderEmoji(attendanceData.wed)}</td>
            <td>{renderEmoji(attendanceData.thu)}</td>
            <td>{renderEmoji(attendanceData.fri)}</td>
            <td>{renderEmoji(attendanceData.sat)}</td>
            <td>{renderEmoji(attendanceData.sun)}</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default DataComponent;
