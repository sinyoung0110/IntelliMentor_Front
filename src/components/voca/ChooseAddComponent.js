import { BrowserRouter as Router, Route, Link, Outlet } from 'react-router-dom';
import React from 'react';
import { useNavigate } from 'react-router-dom';


const ChooseAddComponent = () => {
    const navigate=useNavigate();
    const handleClickDirect=()=>{
        navigate({pathname:'directAdd'});
    };
    const handleClickAi=()=>{
        navigate({pathname:'aiAdd'});
    };
  return (
    <div>
        <button onClick={handleClickDirect}>직접 입력</button>
        <button onClick={handleClickAi}>ai 입력</button>
        <Outlet/>

    </div>
  );
};
export default ChooseAddComponent;