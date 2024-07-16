import {Table,Container} from 'react-bootstrap';
import { FaRegSmile,FaRegFrown } from "react-icons/fa";
import { CiFaceSmile } from "react-icons/ci";
const DataComponent=()=> {
    return (
        <>
        <Container className="mt-5">
      <h2>Borderless Table</h2>
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
            <td><FaRegSmile /></td>
            <td><CiFaceSmile /></td>
            <td><FaRegFrown /></td>
            <td><FaRegSmile /></td>
            <td><FaRegSmile /></td>
            <td><FaRegSmile /></td>
            <td><FaRegSmile /></td>
          </tr>
        </tbody>
      </Table>
    </Container>
        </>
    );
}

export default DataComponent;