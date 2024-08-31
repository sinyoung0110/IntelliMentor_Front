import BasicLayout from "../../layouts/BasicLayout";
import useCustomLogin from "../../hooks/useCustomLogin";
import LearnIndexComponent from "../../components/learn/LearnIndexComponent";


const IndexPage = () => {
  const {isLogin, moveToLoginReturn} = useCustomLogin()

  if(!isLogin){
    return moveToLoginReturn()
    }
  return (
  <BasicLayout>
  <LearnIndexComponent/>
  </BasicLayout>
  );
}

export default IndexPage;