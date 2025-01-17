import { FC } from 'react';

import styled from 'styled-components';

interface NewsComponentProps {
    companyId: number;
}

const NewsComponent: FC<NewsComponentProps> = ({companyId}) => {

    return (
      <MainContainer>
          {companyId}
      </MainContainer>
    );
}

const MainContainer = styled.main`
    height: calc(100vh - 200px);
    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`;

export default NewsComponent;
