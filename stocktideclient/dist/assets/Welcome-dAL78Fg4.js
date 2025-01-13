import{j as e,u as d,B as j}from"./index-BYRxBMX6.js";import{I as v,O as b}from"./menu-B_Ioibwj.js";import{d as t}from"./styled-components.browser.esm-Ds5_C6nt.js";import{b as s}from"./vendor-BJTqHD0O.js";import{a as c,F as y}from"./index-BUmq1CZ1.js";import{S as I}from"./common-BZ0l5WI6.js";import"./utils-CJA6l5lt.js";const p=[{title:"미국 경제 성장 둔화",content:"미국 경제는 올해 첫 분기에 둔화되었습니다. 주요 지표에 따르면..."},{title:"일본 엔화 약세",content:"일본 엔화는 미국 달러 대비 약세를 보였습니다. 경제적 우려가..."},{title:"독일 주식 시장 사상 최고치",content:"독일 주식 시장이 오늘 사상 최고치를 기록했습니다. 투자자들의 낙관적인 전망..."},{title:"중국 경제 회복",content:"중국 경제가 팬데믹 이후 빠르게 회복하고 있습니다. 전문가들은..."},{title:"영국 브렉시트 영향",content:"영국의 브렉시트가 경제에 미치는 영향이 점차 명확해지고 있습니다..."},{title:"프랑스 경제 성장",content:"프랑스 경제는 올해 강한 성장세를 보였습니다. 소비 증가와 함께..."},{title:"캐나다 경제 회복",content:"캐나다 경제는 팬데믹 이후 회복세를 보이고 있습니다. 주요 지표들이..."}],w=()=>{const[i,r]=s.useState(0);return s.useEffect(()=>{const n=setInterval(()=>{r(o=>(o+1)%p.length)},4e3);return()=>clearInterval(n)},[]),e.jsxs(z,{children:[e.jsx(k,{children:"🛫 국가별 뉴스"}),e.jsx($,{children:p.map((n,o)=>e.jsxs(S,{$active:o===i,children:[e.jsx("h3",{children:n.title}),e.jsx("p",{children:n.content}),e.jsxs(L,{children:["더보기 ",e.jsx(c,{})]})]},o))})]})},z=t.section`
    margin-bottom: 20px;
`,k=t.h2`
    font-size: 1.2rem;
    margin-bottom: 10px;
    font-weight: bold;
`,$=t.div`
    height: 80px;
    overflow: hidden;
    position: relative;
    border-radius: 10px;
    border: 1px solid lightgray;
    padding: 10px;
`,S=t.div`
    position: absolute;
    width: 100%;
    opacity: ${({$active:i})=>i?1:0};
    transition: opacity 1s ease-in-out;
    h3 {
        font-size: 1rem;
    }
    p {
        font-size: 0.7rem;
    }
`,L=t.div`
    position: absolute;
    bottom: -18px;
    right: 20px;
    font-size: 0.7rem;
    display: flex;
    align-items: center;
    color: #007bff;
    cursor: pointer;
`,x=[{question:"주식 시장은 언제 개장합니까?",answer:"주식 시장은 월요일부터 금요일까지 오전 9시에 개장합니다."},{question:"주식이란 무엇입니까?",answer:"주식은 회사의 소유권을 나타내는 증권입니다."},{question:"ETF란 무엇입니까?",answer:"ETF는 상장지수펀드로, 주식처럼 거래되는 투자 펀드입니다."},{question:"배당금이란 무엇입니까?",answer:"배당금은 회사가 주주들에게 분배하는 이익의 일부입니다."},{question:"IPO란 무엇입니까?",answer:"IPO는 기업이 최초로 주식을 공개하는 것을 의미합니다."},{question:"포트폴리오란 무엇입니까?",answer:"포트폴리오는 투자자가 보유한 다양한 자산들의 조합입니다."},{question:"우선주란 무엇입니까?",answer:"우선주는 배당금이나 자산 분배에서 우선권을 가지는 주식입니다."}],q=()=>{const[i,r]=s.useState(0);return s.useEffect(()=>{const n=setInterval(()=>{r(o=>(o+1)%x.length)},4e3);return()=>clearInterval(n)},[]),e.jsxs(C,{children:[e.jsx(E,{children:"❓ OX 퀴즈 도전하기"}),e.jsx(D,{children:x.map((n,o)=>e.jsxs(M,{$active:o===i,children:[e.jsx("h3",{children:n.question}),e.jsx("p",{children:n.answer}),e.jsxs(F,{children:["더보기 ",e.jsx(c,{})]})]},o))})]})},C=t.section`
    margin-bottom: 20px;
`,E=t.h2`
    font-size: 1.2rem;
    margin-bottom: 10px;
    font-weight: bold;
`,D=t.div`
    height: 75px;
    overflow: hidden;
    position: relative;
    border-radius: 10px;
    border: 1px solid lightgray;
    padding: 10px;
`,M=t.div`
    position: absolute;
    width: 100%;
    opacity: ${({$active:i})=>i?1:0};
    transition: opacity 1s ease-in-out;
    h3 {
        font-size: 1rem;
    }
    p {
        font-size: 0.7rem;
    }
`,F=t.div`
    position: absolute;
    bottom: -18px;
    right: 20px;
    font-size: 0.7rem;
    display: flex;
    align-items: center;
    color: #007bff;
    cursor: pointer;
`,h=[{title:"달러 강세",content:"미국 달러는 주요 통화 대비 강세를 보였습니다. 경제 지표 개선과 함께..."},{title:"유로존 불확실성",content:"유로존은 정치적, 경제적 도전으로 인해 불확실성을 겪고 있습니다..."},{title:"엔화 약세",content:"일본 엔화는 주요 통화 대비 약세를 보이고 있습니다. 전문가들은..."},{title:"파운드화 변동성",content:"영국 파운드화는 경제적 불확실성으로 인해 변동성이 큽니다..."},{title:"위안화 안정",content:"중국 위안화는 경제 회복과 함께 안정세를 보이고 있습니다..."},{title:"캐나다 달러 강세",content:"캐나다 달러는 원유 가격 상승으로 강세를 보이고 있습니다..."},{title:"호주 달러 약세",content:"호주 달러는 경제 성장 둔화 우려로 약세를 보이고 있습니다..."}],T=()=>{const[i,r]=s.useState(0);return s.useEffect(()=>{const n=setInterval(()=>{r(o=>(o+1)%h.length)},4e3);return()=>clearInterval(n)},[]),e.jsxs(R,{children:[e.jsx(A,{children:"💱 외환시장 스토리"}),e.jsx(N,{children:h.map((n,o)=>e.jsxs(O,{$active:o===i,children:[e.jsx("h3",{children:n.title}),e.jsx("p",{children:n.content}),e.jsxs(Q,{children:["더보기 ",e.jsx(c,{})]})]},o))})]})},R=t.section`
    margin-bottom: 20px;
`,A=t.h2`
    font-size: 1.2rem;
    margin-bottom: 10px;
    font-weight: bold;
`,N=t.div`
    height: 90px;
    overflow: hidden;
    position: relative;
    border-radius: 10px;
    border: 1px solid lightgray;
    padding: 10px;
`,O=t.div`
    position: absolute;
    width: 100%;
    opacity: ${({$active:i})=>i?1:0};
    transition: opacity 1s ease-in-out;
    h3 {
        font-size: 1rem;
    }
    p {
        font-size: 0.7rem;
    }
`,Q=t.div`
    position: absolute;
    bottom: -20px;
    right: 20px;
    font-size: 0.7rem;
    display: flex;
    align-items: center;
    color: #007bff;
    cursor: pointer;
`,m=[{rank:1,company:"애플",value:"2.3조 달러"},{rank:2,company:"마이크로소프트",value:"2.1조 달러"},{rank:3,company:"사우디 아람코",value:"1.9조 달러"},{rank:4,company:"아마존",value:"1.7조 달러"},{rank:5,company:"알파벳",value:"1.6조 달러"},{rank:6,company:"테슬라",value:"1.2조 달러"},{rank:7,company:"버크셔 해서웨이",value:"8000억 달러"}],P=()=>{const[i,r]=s.useState(0);return s.useEffect(()=>{const n=setInterval(()=>{r(o=>(o+1)%m.length)},4e3);return()=>clearInterval(n)},[]),e.jsxs(W,{children:[e.jsx(X,{children:"📈 종목 순위"}),e.jsx(B,{children:m.map((n,o)=>e.jsxs(H,{$active:o===i,children:[e.jsxs("h3",{children:["Rank ",n.rank,": ",n.company]}),e.jsxs("p",{children:["Market Value: ",n.value]}),e.jsxs(J,{children:["더보기 ",e.jsx(c,{})]})]},o))})]})},W=t.section`
    margin-bottom: 20px;
`,X=t.h2`
    font-size: 1.2rem;
    margin-bottom: 10px;
    font-weight: bold;
`,B=t.div`
    height: 60px;
    overflow: hidden;
    position: relative;
    border-radius: 10px;
    border: 1px solid lightgray;
    padding: 10px;
`,H=t.div`
    position: absolute;
    width: 100%;
    opacity: ${({$active:i})=>i?1:0};
    transition: opacity 1s ease-in-out;
    h3 {
        font-size: 1rem;
    }
    p {
        font-size: 0.7rem;
    }
`,J=t.div`
    position: absolute;
    bottom: 0;
    right: 20px;
    font-size: 0.7rem;
    display: flex;
    align-items: center;
    color: #007bff;
    cursor: pointer;
`,u=[{name:"S&P 500",value:"4,300"},{name:"Dow Jones",value:"34,000"},{name:"NASDAQ",value:"13,500"},{name:"Nikkei 225",value:"29,000"},{name:"DAX",value:"15,500"},{name:"FTSE 100",value:"7,200"},{name:"CAC 40",value:"6,500"}],V=()=>{const[i,r]=s.useState(0);return s.useEffect(()=>{const n=setInterval(()=>{r(o=>(o+1)%u.length)},4e3);return()=>clearInterval(n)},[]),e.jsxs(G,{children:[e.jsx(K,{children:"📊 주요지수"}),e.jsx(U,{children:u.map((n,o)=>e.jsxs(Y,{$active:o===i,children:[e.jsx("h3",{children:n.name}),e.jsx("p",{children:n.value}),e.jsxs(Z,{children:["더보기 ",e.jsx(c,{})]})]},o))})]})},G=t.section`
    margin-bottom: 20px;
`,K=t.h2`
    font-size: 1.2rem;
    margin-bottom: 10px;
    font-weight: bold;
`,U=t.div`
    height: 60px;
    overflow: hidden;
    position: relative;
    border-radius: 10px;
    border: 1px solid lightgray;
    padding: 10px;
`,Y=t.div`
    position: absolute;
    width: 100%;
    opacity: ${({$active:i})=>i?1:0};
    transition: opacity 1s ease-in-out;
    h3 {
        font-size: 1rem;
    }
    p {
        font-size: 0.7rem;
    }
`,Z=t.div`
    position: absolute;
    bottom: 0;
    right: 20px;
    font-size: 0.7rem;
    display: flex;
    align-items: center;
    color: #007bff;
    cursor: pointer;
`,g=[{company:"애플",quarter:"2024년 1분기",earnings:"1050억 달러"},{company:"테슬라",quarter:"2024년 1분기",earnings:"250억 달러"},{company:"아마존",quarter:"2024년 1분기",earnings:"850억 달러"},{company:"삼성전자",quarter:"2024년 1분기",earnings:"650억 달러"},{company:"구글",quarter:"2024년 1분기",earnings:"900억 달러"},{company:"마이크로소프트",quarter:"2024년 1분기",earnings:"950억 달러"},{company:"페이스북",quarter:"2024년 1분기",earnings:"700억 달러"}],_=()=>{const[i,r]=s.useState(0);return s.useEffect(()=>{const n=setInterval(()=>{r(o=>(o+1)%g.length)},4e3);return()=>clearInterval(n)},[]),e.jsxs(ee,{children:[e.jsx(te,{children:"💼 분기별 실적 발표"}),e.jsx(ne,{children:g.map((n,o)=>e.jsxs(oe,{$active:o===i,children:[e.jsxs("h3",{children:[n.company,": ",n.quarter]}),e.jsx("p",{children:n.earnings}),e.jsxs(ie,{children:["더보기 ",e.jsx(c,{})]})]},o))})]})},ee=t.section`
    margin-bottom: 20px;
`,te=t.h2`
    font-size: 1.2rem;
    margin-bottom: 10px;
    font-weight: bold;
`,ne=t.div`
    height: 60px;
    overflow: hidden;
    position: relative;
    border-radius: 10px;
    border: 1px solid lightgray;
    padding: 10px;
`,oe=t.div`
    position: absolute;
    width: 100%;
    opacity: ${({$active:i})=>i?1:0};
    transition: opacity 1s ease-in-out;
    h3 {
        font-size: 1rem;
    }
    p {
        font-size: 0.7rem;
    }
`,ie=t.div`
    position: absolute;
    bottom: 0px;
    right: 20px;
    font-size: 0.7rem;
    display: flex;
    align-items: center;
    color: #007bff;
    cursor: pointer;
`,re=()=>e.jsxs(se,{children:[e.jsx(a,{children:e.jsx(w,{})}),e.jsx(l,{}),e.jsx(a,{children:e.jsx(_,{})}),e.jsx(l,{}),e.jsx(a,{children:e.jsx(q,{})}),e.jsx(l,{}),e.jsx(a,{children:e.jsx(T,{})}),e.jsx(l,{}),e.jsx(a,{children:e.jsx(P,{})}),e.jsx(l,{}),e.jsx(a,{children:e.jsx(V,{})})]}),se=t.main`
    padding: 20px;
`,a=t.div`
    margin-bottom: 20px;
`,l=t.div`
    height: 10px;
    background-color: #d6e2ff;
    margin: 20px 0;
`,ae=()=>e.jsx(ce,{children:e.jsx("p",{children:"© 2024 Stock Project"})}),ce=t.footer`
  background-color: #282c34;
  padding: 20px;
  color: white;
  text-align: center;
`,ve=()=>{const{loginState:i}=d(),{doLogout:r}=d(),n=()=>{r(),j.info("로그아웃되었습니다")};return e.jsxs(e.Fragment,{children:[e.jsxs(le,{children:[e.jsx(de,{children:"반가워요! StockFish 입니다."}),i!=null&&i.email?e.jsx(f,{onClick:n,children:"Logout"}):e.jsx(f,{children:e.jsx(I,{to:"/member/login",children:"Login"})}),e.jsx(pe,{})]}),e.jsx(v,{$top:3,children:e.jsxs(b,{children:[e.jsx(re,{}),e.jsx(ae,{})]})})]})},le=t.div`
    background-color: royalblue;
    height: 4rem;
    display: flex;
    align-items: center;
    //justify-content: center;
    justify-content: space-around;
    font-size: 1.2rem;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10;
`,de=t.div`
    font-size: 1rem;
    text-decoration-color: white;
    color: white;
    display : flex;
    left : 0;
`,f=t.div`
    font-size: 1rem;
    text-decoration-line: underline;
    color: white;
    display : flex;
    padding-right : 35px;
`,pe=t(y)`
    position: absolute;
    color: white;
    display : flex;
    right: 28px;
`;export{ve as default};
//# sourceMappingURL=Welcome-dAL78Fg4.js.map
