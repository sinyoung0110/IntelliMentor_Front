import BasicLayout from "../../layouts/BasicLayout";
import useCustomLogin from "../../hooks/useCustomLogin";
import ChooseAddComponent from "../../components/voca/ChooseAddComponent";

const IndexPage = () => {
  const {isLogin, moveToLoginReturn} = useCustomLogin()
  if(!isLogin){
  return moveToLoginReturn()
  }
  return (
  <BasicLayout>
  <ChooseAddComponent/>
  </BasicLayout>
  );
}
 
export default IndexPage;