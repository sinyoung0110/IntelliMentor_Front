import {Table} from 'react-bootstrap';


const DataComponent=()=> {
    return (
        <>
        <div className='bg-gray-300'>
        <h1>이번주 단어장 학습 기록</h1>
        <Table responsive>
        <thead>
        <tr>
          <th>날짜</th>
          {Array.from({ length: 7 }).map((_, index) => (
            <th key={index}>5/1{index}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>학습한 단어 수</td>
          {Array.from({ length: 7 }).map((_, index) => (
            <td key={index}>학습 : 2{index}</td>
          ))}
        </tr>
        <tr>
          <td>퀴즈 성적</td>
          {Array.from({ length: 7 }).map((_, index) => (
            <td key={index}>퀴즈 : A+</td>
          ))}
        </tr>
        <tr>
          <td>오답 단어 수</td>
          {Array.from({ length: 7 }).map((_, index) => (
            <td key={index}>오답 :{index}</td>
          ))}
        </tr>
        <tr>
          <td>총 외운 단어 수</td>
          {Array.from({ length: 7 }).map((_, index) => (
            <td key={index}> 총 : 1{index}</td>
          ))}
        </tr>
      </tbody>
    </Table>
            </div>
     

       
        </>
    );
}

export default DataComponent;