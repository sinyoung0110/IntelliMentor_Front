import { Badge, ListGroup} from 'react-bootstrap';


const NoticeComponent=()=> {
    return (
        <>
        <div className='commonContainer' style={{ backgroundColor: '#EBF0EA', color: '#000000' }}>
        <div className="col p-4 d-flex flex-column position-static">
        <h1>Hot List</h1>
        <ListGroup as="ol" numbered>
        <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">토익 3달안에 정복하기</div>
          작성자 : 나천재
        </div>
        <Badge bg="primary" pill>
          32
        </Badge>
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">영어 초보가 여행 가는 법</div>
          작성자 : 뽀로로
        </div>
        <Badge bg="primary" pill>
          21
        </Badge>
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">중간고사 공부법</div>
          작성자 : 김중학
        </div>
        <Badge bg="primary" pill>
          14
        </Badge>
      </ListGroup.Item>
    </ListGroup>
    </div>
            
            </div>
        </>
    );
}

export default NoticeComponent;