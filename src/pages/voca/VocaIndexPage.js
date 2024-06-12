import { Outlet, useNavigate } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import { useCallback } from "react";

const IndexPage = () => {

  const navigate = useNavigate()

  const handleClickList = useCallback(() => {
    navigate({ pathname:'list' })
  })

  const handleClickAdd = useCallback(() => {
    navigate({ pathname:'add' })
  })

  const handleClickRead = useCallback(() => {
    navigate({ pathname:'read' })
  })

  return ( 
    <BasicLayout>
      <>
      ddd
      </>
    </BasicLayout>
   );
}
 
export default IndexPage;