// import { FC, useEffect, useState } from 'react';
// import { NewsItem, NewsList, Section, Title } from '@components/stock/domestic/detail/info/StockBasicComponent';
//
// interface StockProfitComponentProps {
//   companyId: number;
// }
//
// const StockProfitComponent: FC<StockProfitComponentProps> = ({companyId}) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//
//   const {data: stockProfits, isLoading, isError} = useStockProfit();
//
//   const datas = stockProfits || [];
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
//       <Title>TODO StockProfitComponent {companyId}</Title>
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
// export default StockProfitComponent;
