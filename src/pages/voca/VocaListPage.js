
import React from 'react';
import ListComponent from "../../components/voca/ListComponent";
import BasicLayout from "../../layouts/BasicLayout";

const ListPage=()=>{
  return ( 
  <div>
   
      <BasicLayout>
      <div className="text-3xl font-extrabold">
      Todo List Page Component
      </div>
      <ListComponent/>
      </BasicLayout>
  </div>
   );
}
 
export default ListPage;