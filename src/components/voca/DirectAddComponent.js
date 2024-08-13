import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { directAdd } from '../../api/vocaApi';
import ResultModal from '../common/ResultModal';
import {useNavigate} from "react-router-dom";

const initState = {
    title: '',
    eng: [''],
    kor: ['']
};

function DirectAddComponent() {
    const user = useSelector(state => state.loginSlice);
    const [formData, setFormData] = useState({...initState});
    const [result, setResult] = useState(null);
    const navigate=useNavigate()
   

    const handleChange = (e, index, type) => {
        const { value } = e.target;
        const updatedList = [...formData[type]];
        updatedList[index] = value;
        setFormData(prevState => ({ ...prevState, [type]: updatedList }));
    };

    const handleAddField = () => {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddField(); // 새로운 입력 필드 추가
    };

    const handleClickAdd = () => {
        const dataToSend = {
            userId: user.email,
            title: formData.title,
            eng: formData.eng,
            kor: formData.kor
        };
        
        directAdd(dataToSend).then(response => {
            setResult(response.message || '단어장이 성공적으로 만들어졌습니다');
            setFormData({...initState});
        }).catch(error => {
            if (error.response && error.response.status === 409) {
                setResult(error.response.data.ERROR_MESSAGE);
            } else {
                setResult('An error occurred. Please try again.');
            }
        });
    };

    const closeModal = () => {
        setResult(null);
        navigate('/voca/list');
    };

    return (
        <>
            <div className="main-text text-2xl font-bold mb-4">DirectAdd Page</div>
            <div className="border-2 border-sky-200 mt-10 m-2 p-4">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col mb-4">
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
                            <div className="flex-1 min-w-[30%]">
                                <label htmlFor={`eng-${index}`} className="text-gray-700">English Word:</label>
                                <input
                                    type="text"
                                    id={`eng-${index}`}
                                    value={engWord}
                                    onChange={(e) => handleChange(e, index, 'eng')}
                                    className="p-3 border border-gray-300 rounded-lg w-full"
                                    placeholder="Enter the English word"
                                    required
                                />
                            </div>
                            <div className="flex-1 min-w-[30%]">
                                <label htmlFor={`kor-${index}`} className="text-gray-700">Korean Translation:</label>
                                <input
                                    type="text"
                                    id={`kor-${index}`}
                                    value={formData.kor[index] || ''}
                                    onChange={(e) => handleChange(e, index, 'kor')}
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
                    <div className="flex justify-center mt-4">
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                        >
                            Add Another
                        </button>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            type="button"
                            onClick={handleClickAdd}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
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
