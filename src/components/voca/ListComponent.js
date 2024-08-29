import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkVocaExists } from '../../api/vocaApi';
import { Table, Container, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaPlus } from 'react-icons/fa';

const ListComponent = () => {
  const [vocabularyList, setVocabularyList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVocabularyList = async () => {
      try {
        const data = await checkVocaExists();
        setVocabularyList(data);
      } catch (error) {
        console.error('Failed to fetch vocabulary list', error);
      }
    };

    fetchVocabularyList();
  }, []);

  const handleEditClick = (title) => {
    navigate(`/voca/read/${title}`);
  };

  const handleCreateClick = () => {
    navigate('/voca/chooseAdd');
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center mb-4">
        <Col xs="auto">
          <h2 className="main-text" >VOCA LIST</h2>
        </Col>
      </Row>
      <Row className="justify-content-end mb-3">
        <Col xs="auto">
          <Button 
            variant="outline-primary" 
            onClick={handleCreateClick} 
            style={{
              fontWeight: 'bold',
              borderColor: '#FBB241',
              color: '#FBB241',
              borderRadius: '20px', // 둥근 테두리
              display: 'flex',
              alignItems: 'center',
              transition: 'background-color 0.3s, border-color 0.3s', // 부드러운 색상 전환 효과
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#FBB241'; // 호버 시 배경 색상 변경
              e.currentTarget.style.color = '#fff'; // 호버 시 글씨 색상 변경
              e.currentTarget.style.borderColor = '#FBB241'; // 호버 시 테두리 색상 변경
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'; // 호버 해제 시 배경 색상 원래대로
              e.currentTarget.style.color = '#FBB241'; // 호버 해제 시 글씨 색상 원래대로
              e.currentTarget.style.borderColor = '#FBB241'; // 호버 해제 시 테두리 색상 원래대로
            }}
          >
            <FaPlus style={{ marginRight: '8px' }} />
            Create
          </Button>
        </Col>
      </Row>
      {vocabularyList.length > 0 ? (
        <Table bordered={false} hover={false} responsive="sm" className="text-center table-borderless">
          <thead style={{ fontSize: '1.2rem' }}>
            <tr>
              <th className="align-middle" ><span style={{ borderBottom: '2px solid #8FB299', paddingBottom: '0.5rem' }}>Title</span></th>
              <th className="align-middle" ><span style={{ borderBottom: '2px solid #8FB299', paddingBottom: '0.5rem' }}>Total</span></th>
              <th className="align-middle" ><span style={{ borderBottom: '2px solid #8FB299', paddingBottom: '0.5rem' }}>Section</span></th>
              <th className="align-middle" ><span style={{ borderBottom: '2px solid #8FB299', paddingBottom: '0.5rem' }}>Edit</span></th>
            </tr>
          </thead>
          <tbody style={{ fontSize: '1.1rem' }}>
            {vocabularyList.map((voca, index) => (
              <tr key={index} style={{ fontWeight: 'bold' }}>
                <td className="align-middle">{voca.title}</td>
                <td className="align-middle">{voca.vocaCount}</td>
                <td className="align-middle">{voca.section}</td>
                <td className="align-middle">
                  <Button
                    variant="link" 
                    onClick={() => handleEditClick(voca.title)}
                    style={{ padding: 0 }}
                  >
                    <FaEdit size={20} color="#8FB299" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="text-center">No vocabulary lists found.</p>
      )}
    </Container>
  );
};

export default ListComponent;
