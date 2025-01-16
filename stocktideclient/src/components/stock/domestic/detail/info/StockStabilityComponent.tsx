// import { FC, useEffect, useState } from 'react';
// import { NewsItem, NewsList, Section, Title } from '@components/stock/domestic/detail/info/StockBasicComponent';
//
// interface StockStabilityComponentProps {
//   companyId: number;
// }
//
// const StockStabilityComponent: FC<StockStabilityComponentProps> = ({companyId}) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//
//   const {data: stockStabilities, isLoading, isError} = useStockStability();
//
//   const datas = stockStabilities || [];
//
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex(prevIndex => (prevIndex + 1) % datas.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);
//
//   return (
//     <Section>
//       <Title>TODO StockStabilityComponent {companyId}</Title>
//       <NewsList>
//         {datas.map((data, index) => (
//           <NewsItem key={index} $active={index === currentIndex}>
//             <h3>{data.title}</h3>
//             <p>{data.content}</p>
//           </NewsItem>
//         ))}
//       </NewsList>
//     </Section>
//   );
// }
//
// export default StockStabilityComponent;
// StockStabilityComponent