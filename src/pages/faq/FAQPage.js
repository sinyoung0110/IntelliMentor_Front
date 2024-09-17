import React from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import FAQ from '../../components/main/FAQ';
function QuizSolvePage() {
    return (
        <>
        <BasicLayout>
            <div className='faq-container'style={{width:'60%'}}>
            <FAQ/>
            </div>
        </BasicLayout>
        </>
     
    );
}

export default QuizSolvePage;