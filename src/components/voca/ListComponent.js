import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { readVocabulary, updateSection } from '../../api/learnApi';
import { checkVocaExists } from '../../api/vocaApi';
import { Table, Container, Button, Row, Col, Modal, Form } from 'react-bootstrap';
import { FaEdit, FaPlus } from 'react-icons/fa';

const ListComponent = () => {
  const [vocabularyList, setVocabularyList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVoca, setSelectedVoca] = useState({ titleId: 0, title: '', section: 0 });
  const [sectionValue, setSectionValue] = useState(0);
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVocabularyList = async () => {
      try {
        const data = await checkVocaExists();
        setVocabularyList(data); // API 응답이 배열 형식이므로 바로 설정
      } catch (error) {
        console.error('Failed to fetch vocabulary list', error);
        setVocabularyList([]); // 에러 발생 시 빈 배열로 설정
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
  };

  const handleModalSubmit = async () => {
    try {
        // API를 호출하여 섹션 값을 업데이트
        await updateSection(selectedVoca.titleId, sectionValue);
        // 섹션 업데이트 후, 관련 데이터를 다시 불러올 수 있다면 여기에 추가
        await readVocabulary(selectedVoca.titleId);
        navigate('/learn/index');
    } catch (error) {
        console.error('Failed to update vocabulary section', error);
    } finally {
        setShowModal(false);
    }
};


  return (
    <Container className="mt-4">
      <Row className="justify-content-center mb-4">
        <Col xs="auto">
          <h2 className="main-text">VOCA LIST</h2>
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
        <Table bordered={false} hover={false} responsive="sm" className="text-center table-borderless">
          <thead style={{ fontSize: '1.2rem' }}>
            <tr>
              <th className="align-middle"><span style={{ borderBottom: '2px solid #8FB299', paddingBottom: '0.5rem' }}>Title</span></th>
              <th className="align-middle"><span style={{ borderBottom: '2px solid #8FB299', paddingBottom: '0.5rem' }}>Total</span></th>
              <th className="align-middle"><span style={{ borderBottom: '2px solid #8FB299', paddingBottom: '0.5rem' }}>Section</span></th>
              <th className="align-middle"><span style={{ borderBottom: '2px solid #8FB299', paddingBottom: '0.5rem' }}>Edit</span></th>
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
                  borderRadius: '24px'
                }}
                onMouseEnter={() => setHoveredRowIndex(index)}
                onMouseLeave={() => setHoveredRowIndex(null)}
                onClick={() => handleTitleClickWrapper(voca.titleId)}
              >
                <td className="align-middle" style={{ borderTopLeftRadius: '24px', borderBottomLeftRadius: '24px', backgroundColor: hoveredRowIndex === index ? 'rgba(235, 240, 234, 0.7)' : 'transparent' }}>{voca.title}</td>
                <td className="align-middle" style={{ backgroundColor: hoveredRowIndex === index ? 'rgba(235, 240, 234, 0.7)' : 'transparent' }}>{voca.count}</td>
                <td className="align-middle" style={{ borderTopRightRadius: '24px', borderBottomRightRadius: '24px', backgroundColor: hoveredRowIndex === index ? 'rgba(235, 240, 234, 0.7)' : 'transparent' }}>{voca.section}</td>
                <td className="align-middle">
                  <Button
                    variant="link" 
                    onClick={(e) => {
                      e.stopPropagation(); // Edit 버튼 클릭 시 행 클릭 이벤트가 발생하지 않도록 함
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

      {/* Modal for editing section */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Section</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" value={selectedVoca.title} readOnly />
            </Form.Group>
            <Form.Group controlId="formSection">
              <Form.Label>Section</Form.Label>
              <Form.Control 
                type="number" 
                value={sectionValue} 
                onChange={(e) => setSectionValue(Number(e.target.value))} 
                min="0" // 최소값을 0으로 설정
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button className="custom-button" variant="primary" onClick={handleModalSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ListComponent;
