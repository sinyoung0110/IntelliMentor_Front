import BasicLayout from "../../layouts/BasicLayout";
import useCustomLogin from "../../hooks/useCustomLogin";
import FirstVisitComponent from "../../components/voca/FirstVisitComponent";

const IndexPage = () => {
  const {isLogin, moveToLoginReturn} = useCustomLogin()

  if(!isLogin){
    return moveToLoginReturn()
    }
  return (
  <BasicLayout>
  <FirstVisitComponent/>
  </BasicLayout>
  );
}

export default IndexPage;