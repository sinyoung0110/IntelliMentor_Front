import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { postAdd } from '../../api/todoApi'; // 실제 API 경로로 수정 필요
import ResultModal from '../common/ResultModal'; // 필요에 따라 수정
import useCustomMove from '../../hooks/useCustomMove'; // 필요에 따라 수정

const initState = {
    title: '',
    entries: [{ eng: '', kor: '' }]
};

function DirectAddComponent() {
    const user = useSelector(state => state.loginSlice);
    const [formData, setFormData] = useState({...initState});
    const [result, setResult] = useState(null);
    const { moveToList } = useCustomMove();

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedEntries = [...formData.entries];
        updatedEntries[index][name] = value;
        setFormData(prevState => ({ ...prevState, entries: updatedEntries }));
    };

    const handleAddField = () => {
        setFormData(prevState => ({
            ...prevState,
            entries: [...prevState.entries, { eng: '', kor: '' }]
        }));
    };

    const handleRemoveField = (index) => {
        const updatedEntries = formData.entries.filter((_, i) => i !== index);
        setFormData(prevState => ({ ...prevState, entries: updatedEntries }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // 기본 제출 동작 방지
        handleAddField(); // 새로운 입력 필드 추가
    };

    const handleClickAdd = () => {
        const dataToSend = {
            userId: user.email, // 로그인한 사용자 이메일을 userId로 사용
            title: formData.title,
            entries: formData.entries
        };
        
        postAdd(dataToSend).then(response => {
            setResult(response.TNO);
            setFormData({...initState});
        });
    };

    const closeModal = () => {
        setResult(null);
        moveToList();
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
                    {formData.entries.map((entry, index) => (
                        <div key={index} className="flex items-center mb-4 gap-4">
                            <div className="flex-1 min-w-[30%]">
                                <label htmlFor={`eng-${index}`} className="text-gray-700">English Word:</label>
                                <input
                                    type="text"
                                    id={`eng-${index}`}
                                    name="eng"
                                    value={entry.eng}
                                    onChange={(e) => handleChange(e, index)}
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
                                    name="kor"
                                    value={entry.kor}
                                    onChange={(e) => handleChange(e, index)}
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
