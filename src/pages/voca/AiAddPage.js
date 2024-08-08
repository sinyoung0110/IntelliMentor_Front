import React from 'react';
import AiAddComponent from '../../components/voca/AiAddComponent';
import BasicLayout from '../../layouts/BasicLayout';

function AiAddPage(props) {
    return (
    <>
        <BasicLayout>
            <div className={'text-3xl'}>AiAdd Page</div>
            <AiAddComponent/>
        </BasicLayout>
    </>

    );
}

export default AiAddPage;