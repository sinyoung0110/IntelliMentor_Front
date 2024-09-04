import React, { useState, useEffect } from 'react';
import ChooseAddComponent from "../../components/voca/ChooseAddComponent";
import ListComponent from "../../components/voca/ListComponent";
import { checkVocaExists as apiCheckVocaExists } from '../../api/vocaApi';

const FirstVisitComponent = () => {
    const [exist, setExist] = useState(false);

    useEffect(() => {
        const checkVocabularyExistence = async () => {
            try {
                const vocabularyList = await apiCheckVocaExists();
                console.log("firstvisit component :", vocabularyList); // 응답 확인
                // 리스트가 비어있지 않으면 exist를 true로 설정
                setExist(vocabularyList.length > 0);
            } catch (error) {
                console.error('Failed to check vocabulary existence', error);
                setExist(false); // 에러 발생 시에도 목록이 없다고 가정
            }
        };
        checkVocabularyExistence();
    }, []);

    return (
        <>
            {exist ? <ListComponent /> : <ChooseAddComponent />}
        </>
    );
};

export default FirstVisitComponent;
