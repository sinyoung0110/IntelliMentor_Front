import {Form} from 'react-bootstrap';
import '../../App.css';

const StudyComponent=()=> {
    return (
        <>
        <div className="commonContainer"  style={{ backgroundColor: '#EBF0EA', color: '#000000' }}>
        
        <div className="col p-4 d-flex flex-column position-static">
        <h1>Study</h1>
          <strong className="d-inline-block mb-2 text-success-emphasis">나의 스터디 그룹 </strong>
          <h3 className="mb-0">6주차 과제</h3>
          <div className="mb-1 text-body-secondary">기한 : 2024.05.27.</div>

			<ul className="list-group">
  			<li className="list-group-item">
              <Form.Check type='checkbox' id='option1' label='6주차 단어 50개 외우기'/>
  			</li>
  			<li className="list-group-item">
              <Form.Check type='checkbox' id='option2' label='시험 본 단어 사진찍어서 스터디에 인증하기' />
  			</li>
  			<li className="list-group-item">
              <Form.Check type='checkbox' id='option1' label='여행 회화 구문 연습하기'/>
  			</li>
  			<li className="list-group-item">
              <Form.Check type='checkbox' id='option1' label='뉴욕타임스 구문 분석'/>
  			</li>
			</ul>
            <br/>
            <button type="button" className="btn btn-outline-dark">바로 가기</button>
      </div>
    </div>
        </>
    );
}

export default StudyComponent;