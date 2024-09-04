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

    useEffect(() => {
        const fetchVocabulary = async () => {
            try {
                const data = await getVocabulary(titleId); // Fetch vocabulary data based on titleId
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
    }, [titleId]);

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

        // Separate modifiedWords from addWord and deleteId
        const modifiedWords = formData.words.filter(word => word.id); // Existing words with ID
        const addWord = formData.words.filter(word => !word.id); // New words without ID

        // Prepare the data for update
        const modifiedData = {
            titleId,
            modifiedTitle: formData.title,
            modifiedWord: modifiedWords,
            deleteId: formData.deleteId,
            addWord: [...formData.addWord, ...addWord] // Add new words to the list
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
