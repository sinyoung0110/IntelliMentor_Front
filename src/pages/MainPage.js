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
                <Col lg={7} md={12} style={{ marginBottom: '20px' }}> {/* 아래쪽에 margin 추가 */}
                    <VocaComponent />
                </Col>
                <Col lg={5} md={12} style={{ marginBottom: '20px' }}> {/* 아래쪽에 margin 추가 */}
                    <StudyComponent />
                </Col>
            </Row>
            <br />
            <Row>
                <Col lg={7} md={12}>
                    <DataComponent />
                </Col>
                <Col lg={5} md={12}>
                    <FAQsmall />
                </Col>
            </Row>
        </BasicLayout>
    );
}

export default MainPage;
