import React from 'react';
import BasicLayout from '../layouts/BasicLayout';
import VocaComponent from '../components/main/VocaComponent';
import StudyComponent from '../components/main/StudyComponent';
import DataComponent from '../components/main/DataComponent';
import NoticeComponent from '../components/main/NoticeComponent';
import {Row,Col} from 'react-bootstrap';
function MainPage(props) {
    return (
        <BasicLayout>
                <Row>
                    <Col sm={8}> <VocaComponent/></Col>
                    <Col sm={4}><StudyComponent/></Col>
                </Row><br/>
                <Row>
                    <Col sm={8}> <DataComponent/></Col>
                    <Col sm={4}><NoticeComponent/></Col>
                </Row>
        </BasicLayout>
    );
}

export default MainPage;