import React from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import FAQ from '../../components/main/FAQ';
function QuizSolvePage() {
    return (
        <>
        <BasicLayout>
            <div className='faq-container'>
            <FAQ/>
            </div>
        </BasicLayout>
        </>
     
    );
}

export default QuizSolvePage;