
import React from 'react';
import BasicLayout from "../../layouts/BasicLayout";
import EditVocabularyComponent from '../../components/voca/EditVocabularyComponent';

const ListPage=()=>{
  return ( 
  <div>
      <BasicLayout>
      <EditVocabularyComponent/>
      </BasicLayout>
  </div>
   );
}
 
export default ListPage;