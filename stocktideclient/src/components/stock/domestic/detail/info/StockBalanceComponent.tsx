// import { FC, useEffect, useState } from 'react';
// import { NewsItem, NewsList, Section, Title } from '@components/stock/domestic/detail/info/StockBasicComponent';
//
// interface StockBalanceComponentProps {
//   companyId: number;
// }
//
// const StockBalanceComponent: FC<StockBalanceComponentProps> = ({companyId}) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//
//   const {data: stockGrowths, isLoading, isError} = useStockBalance();
//
//   const datas = stockGrowths || [];
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
//       <Title>TODO StockBalanceComponent {companyId}</Title>
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
// export default StockBalanceComponent;
