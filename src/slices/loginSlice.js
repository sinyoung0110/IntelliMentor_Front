import { createSlice } from "@reduxjs/toolkit";
const initState = { email:'' }
const loginSlice = createSlice({
name: 'loginSlice',
initialState: initState,
reducers: {
login: (state, action) => {
console.log("login.....")
const data = action.payload //{email, pw로 구성 }
return {email: data.email} //새로운 상태
},
logout: (state, action) => { console.log("logout....") }
}
})
export const {login,logout} = loginSlice.actions
export default loginSlice.reducer