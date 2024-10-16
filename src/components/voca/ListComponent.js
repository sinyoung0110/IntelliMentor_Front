import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { readVocabulary, updateSection } from '../../api/learnApi';
import { checkVocaExists } from '../../api/vocaApi';
import { Table, Container, Button, Row, Col, Modal, Form, Alert } from 'react-bootstrap';
import { FaEdit, FaPlus } from 'react-icons/fa';

const ListComponent = () => {
  const [vocabularyList, setVocabularyList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVoca, setSelectedVoca] = useState({ titleId: 0, title: '', section: 0, count: 0 });
  const [sectionValue, setSectionValue] = useState('');
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [recommendedDays, setRecommendedDays] = useState(1); // 최소 추천 일수를 저장하는 상태
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVocabularyList = async () => {
      try {
        const data = await checkVocaExists();
        setVocabularyList(data);
      } catch (error) {
        console.error('Failed to fetch vocabulary list', error);
        setVocabularyList([]);
      }
    };

    fetchVocabularyList();
  }, []);

  const handleTitleClickWrapper = async (titleId) => {
    try {
      const voca = vocabularyList.find(v => v.titleId === titleId);
      if (voca && voca.section > 0) {
        await readVocabulary(titleId);
        navigate(`/learn/index?titleId=${encodeURIComponent(titleId)}`);
      } else if (voca) {
        setSelectedVoca(voca);
        setSectionValue(voca.section);
        setShowModal(true);
        // 최소 추천 일수를 설정
        const wordsPerDay = 4;
        setRecommendedDays(Math.floor(voca.count / wordsPerDay));
      }
    } catch (error) {
      console.error('Failed to handle title click:', error);
    }
  };

  const handleCreateClick = () => {
    navigate('/voca/chooseAdd');
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedVoca({ titleId: 0, title: '', section: 0 });
    setErrorMessage(''); // 경고 메시지 초기화
  };

  const handleModalSubmit = async () => {
    const wordsPerDay = 4;
    const requiredWords = sectionValue * wordsPerDay;
    
    if (selectedVoca.count < requiredWords) {
      setErrorMessage(`하루에 최소 ${wordsPerDay}개의 단어가 필요합니다. ${sectionValue}일 동안 총 ${requiredWords}개의 단어가 필요하며, 현재 단어 수는 ${selectedVoca.count}개입니다.`);
      return;
    }

    try {
      await updateSection(selectedVoca.titleId, sectionValue);
      await readVocabulary(selectedVoca.titleId);
      navigate(`/learn/index?titleId=${encodeURIComponent(selectedVoca.titleId)}`);
    } catch (error) {
      console.error('Failed to update vocabulary section', error);
    } finally {
      setShowModal(false);
      setErrorMessage('');
    }
  };

  return (
    <Container className="mt-4" style={{ marginBottom: '100px' }}>
      <Row className="justify-content-center mb-4">
        <Col xs="auto">
          <h2 className="main-text">VOCA LIST</h2>
        </Col>
      </Row>
      <Row className="justify-content-end mb-4 mt-5" style={{ paddingRight: '50px' }}>
        <Col xs="auto">
          <Button
            variant="outline-primary"
            onClick={handleCreateClick}
            style={{
              fontWeight: 'bold',
              borderColor: '#FBB241',
              color: '#FBB241',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              transition: 'background-color 0.3s, border-color 0.3s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#FBB241';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.borderColor = '#FBB241';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#FBB241';
              e.currentTarget.style.borderColor = '#FBB241';
            }}
          >
            <FaPlus style={{ marginRight: '8px' }} />
            Create
          </Button>
        </Col>
      </Row>
      {vocabularyList.length > 0 ? (
        <Table
          bordered={false}
          hover={false}
          responsive="sm"
          className="text-center table-borderless mx-auto"
          style={{ width: '80%' }}
        >
          <thead style={{ fontSize: '1.2rem' }}>
            <tr>
              <th className="text-center align-middle" style={{ width: '40%' }}>
                <span style={{ borderBottom: '2px solid #8FB299', paddingBottom: '0.5rem' }}>Title</span>
              </th>
              <th className="text-center align-middle">
                <span style={{ borderBottom: '2px solid #8FB299', paddingBottom: '0.5rem' }}>Total</span>
              </th>
              <th className="text-center align-middle">
                <span style={{ borderBottom: '2px solid #8FB299', paddingBottom: '0.5rem' }}>Day</span>
              </th>
              <th className="text-center align-middle">
                <span style={{ borderBottom: '2px solid #8FB299', paddingBottom: '0.5rem' }}>Edit</span>
              </th>
            </tr>
          </thead>
          <tbody style={{ fontSize: '1.1rem' }}>
            {vocabularyList.map((voca, index) => (
              <tr
                key={voca.titleId}
                style={{
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                  borderRadius: '24px',
                  padding: 0
                }}
                onMouseEnter={() => setHoveredRowIndex(index)}
                onMouseLeave={() => setHoveredRowIndex(null)}
                onClick={() => handleTitleClickWrapper(voca.titleId)}
              >
                <td
                  className="text-center align-middle"
                  style={{
                    borderTopLeftRadius: '24px',
                    borderBottomLeftRadius: '24px',
                    backgroundColor: hoveredRowIndex === index ? 'rgba(235, 240, 234, 0.7)' : 'transparent'
                  }}
                >
                  {voca.title}
                </td>
                <td
                  className="text-center align-middle"
                  style={{
                    backgroundColor: hoveredRowIndex === index ? 'rgba(235, 240, 234, 0.7)' : 'transparent'
                  }}
                >
                  {voca.count}
                </td>
                <td
                  className="text-center align-middle"
                  style={{
                    borderTopRightRadius: '24px',
                    borderBottomRightRadius: '24px',
                    backgroundColor: hoveredRowIndex === index ? 'rgba(235, 240, 234, 0.7)' : 'transparent'
                  }}
                >
                  {voca.section}
                </td>
                <td className="text-center align-middle">
                  <Button
                    variant="link"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/voca/read/${voca.titleId}`);
                    }}
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

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title className='main-text w-100 text-center'>Edit Section</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {errorMessage && (
              <Alert variant="danger" className="text-center">
                {errorMessage}
              </Alert>
            )}
            <Row className="mb-3">
              <Col md={9}>
                <div className="input-container">
                  <label className="input-label">Title</label>
                  <input 
                    type="text" 
                    value={selectedVoca.title} 
                    readOnly 
                    className="input-field"
                  />
                </div>
              </Col>
              <Col md={3}>
                <div className="input-container">
                  <label className="input-label">단어 수</label>
                  <input 
                    type="text" 
                    value={selectedVoca.count} 
                    readOnly 
                    className="input-field"
                  />
                </div>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <div className="input-container">
                  <label className="input-label">학습할 Day 수 (최대: {recommendedDays}일)</label>
                  <input 
                    type="number" 
                    value={sectionValue} 
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value >= 1 || !isNaN(value)) {
                        setSectionValue(value);
                        setErrorMessage('');
                      }
                    }} 
                    className="input-field" 
                    min="1" 
                  />
                </div>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button className="custom-button" variant="primary" onClick={handleModalSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ListComponent;
