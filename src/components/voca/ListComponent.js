// ListComponent.js
import React, { useEffect, useState } from 'react';
import { fetchVocabularyLists } from '../../api/vocaApi';

const ListComponent = () => {
  const [vocabularyLists, setVocabularyLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = "user6@aaa.com"; // 실제 사용자 ID로 대체해야 함

    const getVocabularyLists = async () => {
      try {
        const data = await fetchVocabularyLists(userId);
        setVocabularyLists(data);
      } catch (error) {
        setError('Failed to fetch vocabulary lists');
      } finally {
        setLoading(false);
      }
    };

    getVocabularyLists();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Vocabulary Lists</h1>
      <ul>
        {vocabularyLists.map((list, index) => (
          <li key={index}>
            <h2>{list.title}</h2>
            <p>Vocabulary Count: {list.vocaCount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListComponent;
