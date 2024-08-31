import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getVocabulary, updateVocabulary, deleteVocabulary } from '../../api/vocaApi'; // Ensure deleteVocabulary is imported
import ResultModal from '../common/ResultModal';

const initState = {
    title: '',
    eng: [''],
    kor: ['']
};

function EditVocabularyComponent() {
    const { title } = useParams(); // Get the title from URL
    const [formData, setFormData] = useState({...initState});
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVocabulary = async () => {
            try {
                const data = await getVocabulary(title); // Fetch vocabulary data based on title
                setFormData({
                    title: data.title,
                    eng: data.eng,
                    kor: data.kor
                });
            } catch (error) {
                console.error('Failed to fetch vocabulary', error);
            }
        };

        fetchVocabulary();
    }, [title]);

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

        // Call API to update vocabulary
        updateVocabulary({
            originalTitle: title,  // 기존 제목
            modifiedTitle: formData.title,  // 수정된 제목
            eng: formData.eng,
            kor: formData.kor
        }).then(response => {
            setResult(response.message || 'Vocabulary successfully updated');
            navigate('/voca/list');
        }).catch(error => {
            if (error.response && error.response.status === 409) {
                setResult(error.response.data.ERROR_MESSAGE);
            } else {
                setResult('An error occurred. Please try again.');
            }
        });
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this vocabulary?')) {
            deleteVocabulary(title).then(response => {
                setResult(response.message || 'Vocabulary successfully deleted');
                navigate('/voca/list'); // Navigate back to the list page
            }).catch(error => {
                setResult('An error occurred while deleting the vocabulary. Please try again.');
                console.error('Error deleting vocabulary:', error);
            });
        }
    };

    const closeModal = () => {
        setResult(null);
    };

    return (
        <>
            <div className="main-text text-2xl font-bold mb-4">Edit Vocabulary</div>
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
                            type="button"
                            onClick={handleAddField}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                        >
                            Add Another
                        </button>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Update
                        </button>
                    </div>
                </form>
                <div className="flex justify-center mt-4">
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                        Delete
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
}

export default EditVocabularyComponent;
