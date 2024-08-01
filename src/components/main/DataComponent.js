import {Table,Container} from 'react-bootstrap';
import { FaRegSmile,FaRegFrown } from "react-icons/fa";

const DataComponent=()=> {
    return (
      <div>
        
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
            <td><FaRegSmile size="40" color="FBB241"/></td>
            <td><FaRegFrown size="40" color="DFE549"/></td>
            <td><FaRegFrown size="40" color="DFE549"/></td>
            <td><FaRegSmile size="40" color="FBB241"/></td>
            <td><FaRegSmile size="40" color="FBB241"/></td>
            <td><FaRegSmile size="40" color="FBB241"/></td>
            <td><FaRegSmile size="40" color="FBB241"/></td>
          </tr>
        </tbody>
      </Table>
    </Container>
        </div>
    );
}

export default DataComponent;