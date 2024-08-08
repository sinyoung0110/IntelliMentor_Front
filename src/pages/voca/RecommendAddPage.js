import React from 'react';
import RecommendAddComponent from '../../components/voca/RecommendAddComponent';
import BasicLayout from '../../layouts/BasicLayout';

function AiAddPage(props) {
    return (
        <>
        <BasicLayout>
        <div className={'text-3xl'}>AiAdd Page</div>
        <RecommendAddComponent/>
        </BasicLayout>
        </>
    );
}

export default AiAddPage;