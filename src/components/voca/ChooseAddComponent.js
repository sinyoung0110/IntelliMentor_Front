import React, { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ChooseAddComponent = () => {
  const [exist, setExist] = useState(false);

  useEffect(() => {
    // 여기서 API 호출을 통해 목록의 존재 여부를 확인할 수 있습니다.
    // 예를 들어:
    // const fetchData = async () => {
    //   const response = await fetch('/api/checkVocaList');
    //   const data = await response.json();
    //   setExist(data.exist);
    // };
    // fetchData();

    // 현재는 예제로 목록이 존재하지 않는다고 설정합니다.
    setExist(false); // 존재하지 않음으로 설정
  }, []);

  return (
    <div>
      {exist ? (
        <div>목록이 존재합니다.</div> // 목록을 표시하는 부분
      ) : (
        <div>
          <Nav.Link as={Link} to="/voca/directAdd">Direct Add</Nav.Link>
          <Nav.Link as={Link} to="/voca/recommendAdd">Recommend Add</Nav.Link>
          <Nav.Link as={Link} to="/voca/aiAdd">AI Add</Nav.Link>
        </div>
      )}
    </div>
  );
};

export default ChooseAddComponent;
