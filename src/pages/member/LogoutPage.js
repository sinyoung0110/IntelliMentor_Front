import LogoutComponent from "../../components/member/LogoutComponent";
import BasicMenu from "../../components/menus/BasicMenu";
import useCustomLogin from "../../hooks/useCustomLogin";
const LogoutPage = () => {
    const {doLogout, moveToPath} = useCustomLogin()
    const handleClickLogout = () => {
    doLogout()
    alert("로그아웃되었습니다.")
    moveToPath("/")
}
return (
<div className='fixed top-0 left-0 z-[1055] flex flex-col h-full w-full'>
<BasicMenu/>
<div className="w-full flex flex-wrap h-full justify-center itemscenter border-2">
<LogoutComponent></LogoutComponent>
</div>
</div>
);
}
export default LogoutPage;