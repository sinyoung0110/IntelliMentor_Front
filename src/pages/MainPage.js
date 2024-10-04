import React, { useEffect, useState } from 'react';
import BasicLayout from '../layouts/BasicLayout';
import VocaComponent from '../components/main/VocaComponent';
import StudyComponent from '../components/main/StudyComponent';
import DataComponent from '../components/main/DataComponent';
import FAQsmall from '../components/main/FAQsmall';
import { Row, Col } from 'react-bootstrap';
import { mainrandom } from '../api/memberApi'; // API 호출 함수 import

function MainPage() {
    const [vocabularies, setVocabularies] = useState([]); // 단어 데이터를 상태로 관리
    const [loading, setLoading] = useState(true); // 로딩 상태 관리

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data1 = await mainrandom(); // 첫 번째 단어 데이터 가져오기
                const data2 = await mainrandom(); // 두 번째 단어 데이터 가져오기
                setVocabularies([data1, data2]); // 두 단어 데이터를 배열로 상태에 저장
                setLoading(false); // 로딩 완료
            } catch (error) {
                console.error('Failed to fetch vocabulary', error);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div>로딩 중...</div>; // 로딩 중일 때 표시할 UI
    }

    return (
        <BasicLayout>
            <Row>
                <Col sm={7}>
                    <VocaComponent vocabularies={vocabularies} /> {/* 단어 데이터를 배열로 prop 전달 */}
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
