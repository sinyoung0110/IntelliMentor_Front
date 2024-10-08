import React from 'react';
import BasicLayout from '../layouts/BasicLayout';
import VocaComponent from '../components/main/VocaComponent';
import StudyComponent from '../components/main/StudyComponent';
import DataComponent from '../components/main/DataComponent';
import FAQsmall from '../components/main/FAQsmall';
import { Row, Col } from 'react-bootstrap';

function MainPage() {
    return (
        <BasicLayout>
            <Row>
                <Col sm={7}>
                    <VocaComponent /> {/* 데이터를 내부에서 처리하는 VocaComponent */}
                </Col>
                <Col sm={5}>
                    <StudyComponent />
                </Col>
            </Row>
            <br />
            <Row>
                <Col sm={7}>
                    <DataComponent />
                </Col>
                <Col sm={5}>
                    <FAQsmall />
                </Col>
            </Row>
        </BasicLayout>
    );
}

export default MainPage;
