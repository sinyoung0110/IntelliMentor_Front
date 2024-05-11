import { Form} from 'react-bootstrap';


const StudyComponent=()=> {
    return (
        <>
        <div className='bg-pink-300'><h1>Study</h1>
        <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div class="col p-4 d-flex flex-column position-static">
          <strong class="d-inline-block mb-2 text-success-emphasis">나의 스터디 그룹 </strong>
          <h3 class="mb-0">6주차 과제</h3>
          <div class="mb-1 text-body-secondary">기한 : 2024.05.27.</div>

			<ul class="list-group">
  			<li class="list-group-item">
              <Form.Check type='checkbox' id='option1' label='6주차 단어 50개 외우기'/>
  			</li>
  			<li class="list-group-item">
              <Form.Check type='checkbox' id='option2' label='시험 본 단어 사진찍어서 스터디에 인증하기' />
  			</li>
  			<li class="list-group-item">
              <Form.Check type='checkbox' id='option1' label='여행 회화 구문 연습하기'/>
  			</li>
  			<li class="list-group-item">
              <Form.Check type='checkbox' id='option1' label='뉴욕타임스 구문 분석'/>
  			</li>
			</ul>
            <br/>
            <button type="button" class="btn btn-outline-dark">바로 가기</button>
      </div>
    </div>
  </div>
        </>
    );
}

export default StudyComponent;