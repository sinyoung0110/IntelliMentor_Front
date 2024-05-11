import { useParams} from 'react-router-dom';
import ReadComponent from '../../components/todo/ReadComponent';

const ReadPage=()=>{

    const {tno}=useParams()
    return (
        <div className="font-extrabold w-full bg-white mt-6">
            <div className="text-3xl">
            Todo Read Page {tno}
        </div>
        <ReadComponent tno={tno}/>
        </div>
    );
}

export default ReadPage;