import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getVocabulary, updateVocabulary, deleteVocabulary } from '../../api/vocaApi'; // Ensure these functions are imported
import ResultModal from '../common/ResultModal';

const EditVocabularyComponent = () => {
    const { titleId } = useParams(); // Get the titleId from URL
    const [formData, setFormData] = useState({
        title: '',
        words: [],
        deleteId: [],
        addWord: []
    });
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    const [originalWords, setOriginalWords] = useState([]); // 원래 단어들

    const [isLoaded, setIsLoaded] = useState(false); // 데이터를 처음 로드했는지 체크하는 상태

    useEffect(() => {
        const fetchVocabulary = async () => {
            try {
                const data = await getVocabulary(titleId); // Fetch vocabulary data based on titleId
    
                // 처음 데이터를 불러왔을 때만 originalWords를 설정
                if (!isLoaded) {
                    setOriginalWords(data.word); // 원래 단어 상태 저장
                    setIsLoaded(true); // 로딩 완료로 상태 변경
                    console.log('Original Words set:', data.word); // 로그로 원래 단어 확인
                }
    
                setFormData({
                    title: data.title,
                    words: data.word,
                    deleteId: [],
                    addWord: []
                });
            } catch (error) {
                console.error('Failed to fetch vocabulary', error);
            }
        };
    
        fetchVocabulary();
    }, [titleId, isLoaded]);

    const handleChange = (e, index, type) => {
        const { value } = e.target;
        const updatedWords = [...formData.words];
        updatedWords[index][type] = value;
        setFormData(prevState => ({ ...prevState, words: updatedWords }));
    };

    const handleAddField = () => {
        setFormData(prevState => ({
            ...prevState,
            words: [...prevState.words, { eng: '', kor: '' }]
        }));
    };

    const handleRemoveField = (index) => {
        const wordToDelete = formData.words[index];
        setFormData(prevState => ({
            ...prevState,
            words: prevState.words.filter((_, i) => i !== index),
            deleteId: [...prevState.deleteId, wordToDelete.id] // Mark word ID for deletion
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // 기존 단어 목록과 변경된 단어 목록을 비교하여 수정된 단어만 추출
        const modifiedWords = formData.words.filter(word => {
            // ID가 있고, 원래 단어 목록에 해당하는 단어가 존재하며, 영어나 한글이 변경된 경우에만 수정 목록에 추가
            const originalWord = originalWords.find(orig => orig.id === word.id);
    
            // 단어가 존재하지 않거나(추가된 단어), 수정된 단어를 감지하는 조건을 추가
            return originalWord && (originalWord.eng !== word.eng || originalWord.kor !== word.kor);
        });
    
        const addWord = formData.words.filter(word => !word.id); // 새로 추가된 단어 필터링
    
        // 수정된 데이터를 준비
        const modifiedData = {
            titleId,
            modifiedTitle: formData.title,
            modifiedWord: modifiedWords, // 변경된 단어만 포함
            deleteId: formData.deleteId,
            addWord: [...formData.addWord, ...addWord] // 새로운 단어 포함
        };
    
        try {
            await updateVocabulary(modifiedData);
            setResult('Vocabulary successfully updated');
            navigate('/voca/list');
        } catch (error) {
            setResult('An error occurred. Please try again.');
            console.error('Error updating vocabulary:', error);
        }
    };
    

    const handleDeleteVocabulary = async () => {
        try {
            await deleteVocabulary(titleId);
            setResult('Vocabulary successfully deleted');
            navigate('/voca/list');
        } catch (error) {
            setResult('An error occurred. Please try again.');
            console.error('Error deleting vocabulary:', error);
        }
    };

    const closeModal = () => {
        setResult(null);
    };

    return (
        <>
            <div className="main-text text-2xl font-bold">Edit Vocabulary</div>
            <div className="mt-0 mr-40 ml-40 p-10">
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
                    {formData.words.map((word, index) => (
                        <div key={index} className="flex items-center mb-4 gap-4">
                            <div className="flex-1 min-w-[30%]">
                                <label htmlFor={`eng-${index}`} className="text-gray-700">English Word:</label>
                                <input
                                    type="text"
                                    id={`eng-${index}`}
                                    value={word.eng}
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
                                    value={word.kor}
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
                            type="button"
                            onClick={handleAddField}
                            className="bg-gray text-white px-4 py-2 rounded-lg hover:bg-gray-400"
                        >
                            Add Another
                        </button>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            type="submit"
                            className="bg-green text-white px-4 py-2 rounded-lg hover:bg-green-600"
                        >
                            Update
                        </button>
                    </div>
                </form>
                <div className="flex justify-center mt-8">
                    <button
                        type="button"
                        onClick={handleDeleteVocabulary}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                        Delete Vocabulary
                    </button>
                </div>
            </div>
            {result && (
                <ResultModal
                    result={result}
                    onClose={closeModal}
                />
            )}
        </>
    );
};

export default EditVocabularyComponent;
