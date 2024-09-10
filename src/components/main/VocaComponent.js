import '../../App.css';

const VocaComponent=()=> {
    return (
        <>
        <div className="commonContainer" style={{ backgroundColor: '#F4F1EC', color: '#000000'}}>
            
            <div className="col p-4 d-flex flex-column position-static"><h1>Vocabularay</h1>
            <strong className="d-inline-block mb-2 text-primary-emphasis">오늘의 학습 </strong>
            <h3 className="mb-0">look out for</h3>
            <div className="mb-1 text-body-secondary">1. ...을 찾다(=watch for)</div>
            <div className="mb-1 text-body-secondary">2. 망보다 </div><br/>
            <p className="card-text mb-auto">ex_You should look out for yourself from now on. </p>
            <p className="card-text mb-auto">= 이제부터는 당신 자신만을 생각해야 해요.</p>
            <br/>
            <p className="card-text mb-auto">ex_Please look out for us. </p>
            <p className="card-text mb-auto">= 저희 많이 응원해주세요. </p>
            <br/>
        
            </div>
        </div>
        </>
    );
}

export default VocaComponent;