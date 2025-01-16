import { FC } from 'react';

import styled from 'styled-components';
import StockBasicComponent from '@components/stock/domestic/detail/info/StockBasicComponent';
// import StockBalanceComponent from '@components/stock/domestic/detail/info/StockBalanceComponent';
// import StockIncomeComponent from '@components/stock/domestic/detail/info/StockIncomeComponent';
// import StockFinancialComponent from '@components/stock/domestic/detail/info/StockFinancialComponent';
// import StockProfitComponent from '@components/stock/domestic/detail/info/StockProfitComponent';
// import StockOtherComponent from '@components/stock/domestic/detail/info/StockOtherComponent';
// import StockStabilityComponent from '@components/stock/domestic/detail/info/StockStabilityComponent';
// import StockGrowthComponent from '@components/stock/domestic/detail/info/StockGrowthComponent';

interface CompanyInfoComponentProps {
  companyId: number;
}

const CompanyInfoComponent: FC<CompanyInfoComponentProps> = ({companyId}) => {

  return (
    <MainContainer>
      <Section>
        <StockBasicComponent companyId={companyId}/>
      </Section>
      <Divider />
      {/*<Section>*/}
      {/*  <StockBalanceComponent companyId={companyId}/>*/}
      {/*</Section>*/}
      {/*<Divider />*/}
      {/*<Section>*/}
      {/*  <StockIncomeComponent companyId={companyId}/>*/}
      {/*</Section>*/}
      {/*<Divider />*/}
      {/*<Section>*/}
      {/*  <StockFinancialComponent companyId={companyId}/>*/}
      {/*</Section>*/}
      {/*<Divider />*/}
      {/*<Section>*/}
      {/*  <StockProfitComponent companyId={companyId}/>*/}
      {/*</Section>*/}
      {/*<Divider />*/}
      {/*<Section>*/}
      {/*  <StockOtherComponent companyId={companyId}/>*/}
      {/*</Section>*/}
      {/*<Divider />*/}
      {/*<Section>*/}
      {/*  <StockStabilityComponent companyId={companyId}/>*/}
      {/*</Section>*/}
      {/*<Divider />*/}
      {/*<Section>*/}
      {/*  <StockGrowthComponent companyId={companyId}/>*/}
      {/*</Section>*/}
    </MainContainer>
  );
}

export default CompanyInfoComponent;

const MainContainer = styled.main`
    padding: 20px;
    height: calc(100vh - 200px);
    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const Section = styled.div`
    margin-bottom: 20px;
`;

const Divider = styled.div`
    height: 10px;
    background-color: #d6e2ff;
    margin: 20px 0;
`;
