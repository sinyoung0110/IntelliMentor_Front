const VocaComponent=()=> {
    return (
        <>
        <div className='bg-green-300'><h1>Vocabularay</h1>
               
                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
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
            <button type="button" className="btn btn-outline-dark">학습하러 가기 </button>
            </div>
            </div>
            </div>
        </>
    );
}

export default VocaComponent;