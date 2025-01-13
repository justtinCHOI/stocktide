import{j as e,Q as u}from"./index-BYRxBMX6.js";import{d as o}from"./styled-components.browser.esm-Ds5_C6nt.js";import{S as s}from"./common-BZ0l5WI6.js";import{b as x,O as j}from"./vendor-BJTqHD0O.js";import{u as b}from"./useCompanyData-BPjrV9FE.js";import{l as v}from"./companyLogos-DgTyPECG.js";import{d as h}from"./CentralSectionMenu-dummyImg-CRG5GB_j.js";import"./utils-CJA6l5lt.js";import"./useQuery-DuEvguJc.js";const w=()=>e.jsxs(k,{children:[e.jsxs(y,{children:[e.jsx(s,{to:"/welcome",children:"홈"})," "]}),e.jsx(C,{children:e.jsxs(S,{children:[e.jsxs(p,{children:[e.jsx(s,{to:"/stock/domestic/",children:"국내주식"})," "]}),e.jsx(p,{children:e.jsx(s,{to:"/stock/overseas/",children:"해외주식"})}),e.jsx(p,{children:e.jsx(s,{to:"/my/",children:"마이페이지"})})]})})]}),k=o.footer`
    background-color: #000;
    color: #fff;
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: center;
    //justify-content: center;
    padding: 8px;
`,C=o.nav`
    display: flex;
    align-items: center;
    overflow-x: auto;
    &::-webkit-scrollbar {
        display: none;
    }
    &:before {
        content: '';
        position: absolute;
        left: 55px;
        width: 20%;
        height: 95%;
        background: linear-gradient(to left, transparent, #000);
        pointer-events: none;
    }
    &:after {
        content: '';
        position: absolute;
        right: 2px;
        width: 20%;
        height: 100%;
        pointer-events: none;
        flex: 1;
        background: linear-gradient(to right, transparent, #000);
    }
`,y=o.div`
    //border : 4px solid blue;
    flex-shrink: 0;
    color: #fff;
    padding: 8px 16px;
    text-decoration: none;
    font-weight: bold;
    background-color: #000;
`,S=o.div`
    display: flex;
    flex-shrink: 0;
    &::after {
        content: '';
        flex: 1;
        background: linear-gradient(to right, transparent, #000);
    }
`,p=o.div`
    flex-shrink: 0;
    color: #fff;
    padding: 8px 16px;
    text-decoration: none;
    &:hover {
        background-color: #333;
    }
`,R="거래량",L=({stockInfo:t,stockInfoLoading:c,stockInfoError:n})=>{const i=t==null?void 0:t.korName,l={...v},r=i?l[i]||h:h;if(!i)return null;if(c)return e.jsx("p",{children:"로딩 중 입니다"});if(n)return e.jsx("p",{children:"에러 발생"});const a=parseInt(t.stockPrice,10).toLocaleString(),d=parseFloat(t.priceChangeRate),g=d>0?"▲":"▼",f=Math.abs(parseInt(t.priceChangeAmount,10)).toLocaleString(),m=parseInt(t.transactionVolume,10).toLocaleString();return e.jsxs(N,{$priceChangeRate:d,children:[e.jsx("img",{className:"CorpLogo",src:r,alt:"stock logo"}),e.jsx("div",{className:"CorpName",children:i}),e.jsx("div",{className:"StockPrice",children:a}),e.jsxs("div",{className:"PriceChangeRate",children:[d,"%"]}),e.jsxs("div",{className:"PriceChangeAmount",children:[e.jsx("div",{className:"changeDirection",children:g})," ",f]}),e.jsxs($,{children:[e.jsx("span",{children:R}),m]})]})},N=o.div`
    flex: 7 0 0;
    overflow-x: scroll;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 12px;
    padding-right: 12px;
    gap: 8px;
    justify-content: space-evenly;
    &::-webkit-scrollbar {
        display: none;
    }
    .CorpLogo {
        width: 24px;
        height: 24px;
        border-radius: 50%;
    }
    .CorpName {
        white-space: nowrap;
        min-width: min-content;
        font-size: 14px;
        font-weight: 530;
    }
    .StockCode {
        white-space: nowrap;
        min-width: min-content;
        font-size: 11px;
        color: #999999;
    }
    .StockPrice {
        font-size: 14px;
        color: ${t=>t.$priceChangeRate>0?"#ed2926":t.$priceChangeRate===0?"black":"#3177d7"};
        font-weight: 530;
    }
    .PriceChangeRate,
    .PriceChangeAmount {
        font-size: 14px;
        color: ${t=>t.$priceChangeRate>0?"#ed2926":t.$priceChangeRate===0?"black":"#3177d7"};
        display: flex;
        flex-direction: row;
        gap: 2px;
        .changeDirection {
            font-size: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
`,$=o.div`
    white-space: nowrap;
    min-width: min-content;
    font-size: 11px;
    color: #4e4d4d;

    & span {
        color: #999999;
        padding-right: 5px;
    }
`,P=()=>{const[t,c]=x.useState(0),{data2:n,isLoading:i,isError:l}=b(2,15);return x.useEffect(()=>{const r=setInterval(()=>{c(a=>(a+1)%((n==null?void 0:n.length)||1))},2e3);return()=>clearInterval(r)},[n]),e.jsx(z,{children:n==null?void 0:n.map((r,a)=>e.jsx(F,{$active:a===t,children:e.jsx(L,{stockInfo:r,stockInfoLoading:i,stockInfoError:l})},r.companyId))})},z=o.div`
    background-color: #fff;
    height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #888;
    position: fixed;
    bottom: 50px;
    width: 100%;
    padding : 5px;
`,F=o.div`
    width : 350px;
    height: 100%;
    display: ${({$active:t})=>t?"block":"none"};
    transition: all 0.5s ease;
    
`,q=()=>e.jsxs(I,{children:[e.jsx(A,{children:e.jsx(j,{})}),e.jsx(P,{}),e.jsx(w,{}),e.jsx(u,{position:"bottom-center",autoClose:3e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,limit:3,theme:"colored",toastStyle:{backgroundColor:"#333",color:"white",fontSize:"0.9rem",borderRadius:"8px",boxShadow:"0 2px 12px rgba(0, 0, 0, 0.15)",minHeight:"48px"}})]}),I=o.div`
    background-color: #f7fafc;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    margin: 0; /* 추가: 기본 여백 제거 */
    padding: 0; /* 추가: 기본 여백 제거 */
    overflow: hidden; /* 추가: 불필요한 스크롤 방지 */
`,A=o.main`
    flex: 1;
    background-color: #fff;
    margin-top: 1rem; /* Adjust this value based on the combined height of fixed components */
    overflow-y: auto;
    overflow-x: hidden;
`;export{q as default};
//# sourceMappingURL=BasicLayout-n9pPVAcY.js.map
