import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { directAdd } from '../../api/vocaApi';
import ResultModal from '../common/ResultModal';
import { useNavigate } from 'react-router-dom';
import { FaPlusCircle } from 'react-icons/fa';

const initState = {
    title: '',
    eng: [''],
    kor: ['']
};

function DirectAddComponent() {
    const user = useSelector(state => state.loginSlice);
    const [formData, setFormData] = useState({ ...initState });
    const [result, setResult] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const korInputRefs = useRef([]);  // ref 배열로 kor input 관리
    const engInputRefs = useRef([]);  // ref 배열로 eng input 관리
    const navigate = useNavigate();

    const handleChange = (e, index, type) => {
        const { value } = e.target;
        const updatedList = [...formData[type]];
        updatedList[index] = value;
        setFormData(prevState => ({ ...prevState, [type]: updatedList }));

        if (formData.eng.length >= 4) {
            setErrorMessage('');
        }
    };

    const handleAddField = () => {
        setErrorMessage('');
        setFormData(prevState => ({
            ...prevState,
            eng: [...prevState.eng, ''],
            kor: [...prevState.kor, '']
        }));
    };

    const handleRemoveField = (index) => {
        const updatedEng = formData.eng.filter((_, i) => i !== index);
        const updatedKor = formData.kor.filter((_, i) => i !== index);
        setFormData(prevState => ({ ...prevState, eng: updatedEng, kor: updatedKor }));
    };

    const handleClickAdd = () => {
        if (formData.eng.length < 4) {
            setErrorMessage('단어는 최소 4개 이상 입력해야 합니다.');
            return;
        }

        const dataToSend = {
            userId: user.email,
            title: formData.title,
            eng: formData.eng,
            kor: formData.kor
        };

        directAdd(dataToSend)
            .then(response => {
                setResult(response.message || '단어장이 성공적으로 만들어졌습니다');
                setFormData({ ...initState });
                setErrorMessage('');
            })
            .catch(error => {
                if (error.response && error.response.status === 409) {
                    setResult(error.response.data.ERROR_MESSAGE);
                } else {
                    setResult('An error occurred. Please try again.');
                }
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const lastEngWord = formData.eng[formData.eng.length - 1];
        const lastKorWord = formData.kor[formData.kor.length - 1];

        if (lastEngWord.trim() !== '' && lastKorWord.trim() !== '') {
            handleAddField();
        } else {
            setErrorMessage('현재 칸을 먼저 채워야 합니다.');
        }
    };

    const handleKeyPress = (e, index, type) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const lastEngWord = formData.eng[index];
            const lastKorWord = formData.kor[index];

            if (lastEngWord.trim() !== '' && lastKorWord.trim() !== '') {
                handleAddField();

                // 0.1초 딜레이 후 포커스 이동
                setTimeout(() => {
                    if (type === 'kor') {
                        engInputRefs.current[index + 1]?.focus();  // 다음 eng input으로 포커스 이동
                    }
                }, 100);

                setErrorMessage('');
            } else {
                setErrorMessage('현재 칸을 먼저 채워야 합니다.');
            }
        }
    };

    const closeModal = () => {
        setResult(null);
        navigate('/voca/list');
    };

    return (
        <>
            <div className="main-text text-2xl font-bold">DirectAdd Page</div>
            <div className="mr-25 ml-10 p-20">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col mb-8">
                        <label htmlFor="title" className="text-gray-700">Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={(e) => setFormData(prevState => ({ ...prevState, title: e.target.value }))}
                            className="p-3 border border-gray-300 rounded-lg w-full text-lg"
                            placeholder="Enter the title"
                            required
                        />
                    </div>
                    {formData.eng.map((engWord, index) => (
                        <div key={index} className="flex items-center mb-4 gap-4">
                            <div className="flex-1 min-w-[40%]">
                                <label htmlFor={`eng-${index}`} className="text-gray-700">English Word:</label>
                                <input
                                    type="text"
                                    id={`eng-${index}`}
                                    value={engWord}
                                    onChange={(e) => handleChange(e, index, 'eng')}
                                    ref={el => engInputRefs.current[index] = el}  // ref 배열로 eng input 저장
                                    className="p-3 border border-gray-300 rounded-lg w-full"
                                    placeholder="Enter the English word"
                                    required
                                />
                            </div>
                            <div className="flex-1 min-w-[40%]">
                                <label htmlFor={`kor-${index}`} className="text-gray-700">Korean Translation:</label>
                                <input
                                    type="text"
                                    id={`kor-${index}`}
                                    value={formData.kor[index] || ''}
                                    onChange={(e) => handleChange(e, index, 'kor')}
                                    onKeyPress={(e) => handleKeyPress(e, index, 'kor')}  // kor input에서 엔터를 누르면 eng로 이동
                                    ref={el => korInputRefs.current[index] = el}  // ref 배열로 kor input 저장
                                    className="p-3 border border-gray-300 rounded-lg w-full"
                                    placeholder="Enter the Korean translation"
                                    required
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => handleRemoveField(index)}
                                className="text-red-500 hover:underline"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    {errorMessage && (
                        <div className="text-red-500 text-center mt-2">
                            {errorMessage}
                        </div>
                    )}
                    <div className="flex justify-center mt-10">
                        <button
                            type="submit"
                            className="bg-gray text-white px-4 py-2 rounded-lg hover:bg-gray-400"
                        >
                            <FaPlusCircle />
                        </button>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            type="button"
                            onClick={handleClickAdd}
                            className="bg-green text-white px-4 py-2 rounded-lg hover:bg-green-600"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
            {result && (
                <ResultModal
                    result={result}
                    onClose={closeModal}
                />
            )}
        </>
    );
}

export default DirectAddComponent;
