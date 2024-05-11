import { Outlet, useNavigate } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import { useCallback } from "react";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
} from 'mdb-react-ui-kit';

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
      {/* <div className="w-full flex m-2 p-2 "> */}
      <MDBTabs fill className='mb-3'>
        <MDBTabsItem>
        <MDBTabsLink
        onClick={handleClickList}>
          단어장 목록
        </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
        <MDBTabsLink
        onClick={handleClickAdd}>
          단어장 생성
        </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>

        <MDBTabsLink
        onClick={handleClickRead}>
          퀴즈 생성
        </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>
        <Outlet/>
      </>
    </BasicLayout>
   );
}
 
export default IndexPage;