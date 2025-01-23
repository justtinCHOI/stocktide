import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import styled from "styled-components";
import BasicMenu from "@components/common/BasicMenu";
import RapidSlider from '@components/common/RapidSliderInfo/RapidSlider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BasicLayout: FC = () => {
  return (
    <Container>
      <MainContent>
        <Outlet/>
      </MainContent>
      <RapidSlider/>
      <BasicMenu/>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        limit={3}
        theme="colored"
        toastStyle={{
          backgroundColor: '#333',
          color: 'white',
          fontSize: '0.9rem',
          borderRadius: '8px',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.15)',
          minHeight: '48px'
        }}
      />
    </Container>
  );
}

const Container = styled.div`
    background-color: #f7fafc;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    margin: 0; /* 추가: 기본 여백 제거 */
    padding: 0; /* 추가: 기본 여백 제거 */
    overflow: hidden; /* 추가: 불필요한 스크롤 방지 */
`;

const MainContent = styled.main`
    flex: 1;
    background-color: #fff;
    margin-top: 1rem; /* Adjust this value based on the combined height of fixed components */
    overflow-y: auto;
    overflow-x: hidden;
`;

export default BasicLayout;

// 전체 component 구조

// stock

// <Container>
//     <MainContent>
//         <StockInfoComponent/>
//         <SearchInputComponent/>
//         <IncludeInformationDiv $top={5} >
//             <MenuComponent menus={Menus} urls={Urls}/>
//             <ContentBelowMenu >
//                 <OutletDiv>
//                     <Outlet/>
//                 </OutletDiv>
//             </ContentBelowMenu >
//         </IncludeInformationDiv>
//     </MainContent>
//     <RapidSlider/>
//     <BasicMenu/>
// </Container>

// welcome

// <Container>
//   <MainContent>
//     <StockInfoHomeDiv>
//       <WelcomeMessage></WelcomeMessage>
//       <WelcomeLogin></WelcomeLogin>
//       <WelcomeSearchIcon />
//     </StockInfoHomeDiv>
//     <IncludeInformationDiv $top={3}>
//       <OutletDiv>
//         <Main/>
//         <Footer/>
//       </OutletDiv>
//     </IncludeInformationDiv>
//   </MainContent>
//   <RapidSlider/>
//   <BasicMenu/>
// </Container>