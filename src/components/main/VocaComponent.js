const VocaComponent=()=> {
    return (
        <>
        <div className='bg-green-300'><h1>Vocabularay</h1>
               
                <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div class="col p-4 d-flex flex-column position-static">
          <strong class="d-inline-block mb-2 text-primary-emphasis">오늘의 학습 </strong>
          <h3 class="mb-0">look out for</h3>
          <div class="mb-1 text-body-secondary">1. ...을 찾다(=watch for)</div>
          <div class="mb-1 text-body-secondary">2. 망보다 </div><br/>
          <p class="card-text mb-auto">ex_You should look out for yourself from now on. </p>
          <p class="card-text mb-auto">= 이제부터는 당신 자신만을 생각해야 해요.</p>
          <br/>
          <p class="card-text mb-auto">ex_Please look out for us. </p>
          <p class="card-text mb-auto">= 저희 많이 응원해주세요. </p>
          <br/>
            <button type="button" class="btn btn-outline-dark">학습하러 가기 </button>
            </div>
            </div>
            </div>
        </>
    );
}

export default VocaComponent;