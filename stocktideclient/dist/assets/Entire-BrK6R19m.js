import{j as t}from"./index-BYRxBMX6.js";import{b as p}from"./vendor-BJTqHD0O.js";import{u as g}from"./useCustomMove-DGgclnXv.js";import{d as e}from"./styled-components.browser.esm-Ds5_C6nt.js";import{l as m}from"./companyLogos-DgTyPECG.js";import{u as f}from"./useCompanyData-BPjrV9FE.js";import{c as u}from"./content-C3Cgojep.js";import"./utils-CJA6l5lt.js";import"./useQuery-DuEvguJc.js";const k=e.div`
  height: calc(100vh - 53px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`,j=e.div`
  height: 100%;
  width: 100%;
  overflow-y: auto; /* 세로 스크롤을 활성화합니다 */

  &::-webkit-scrollbar {
    display: none;
  }
`,C="/assets/StockHolmImage-szcsUAm3.png",v=({company:o})=>{const i=parseFloat(o.stockChangeRate)>0,s=m[o.korName]||C,r=i?"#e22926":"#2679ed",c=i?"#e22926":"#2679ed",[a]=p.useState(!1),{moveToRead:l}=g(),n=()=>{l(o.companyId)},h=parseInt(o.stockPrice).toLocaleString(),x=parseInt(o.stockChangeAmount).toLocaleString(),d="원";return t.jsxs(S,{onClick:n,children:[t.jsx(w,{children:t.jsx(b,{src:s,alt:"stock logo"})}),t.jsxs(I,{children:[t.jsx(L,{children:o.korName}),t.jsx($,{children:o.code})]}),t.jsxs(y,{children:[t.jsxs(P,{$change:r,children:[h," ",d]}),t.jsx(E,{$change:c,children:a?`${x} ${d}`:`${o.stockChangeRate}%`})]})]})},S=e.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 8px 0;
    border-bottom: 1px solid #e0e0e0;
    width: 100%;
    height: 57px;
    background-color: transparent;

    &:hover {
        background-color: #cee0ff;
        transition: background-color 0.5s ease;
    }
    cursor: pointer;
`,w=e.div`
    height: 100%;
    width: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`,b=e.img`
    border-radius: 50%;
    width: 28px;
    height: 28px;
    margin-left: 10px;
    margin-right: 10px;
    position: absolute;
`,I=e.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-top: 3px;
  margin-right: 16px;
`,L=e.span`
    font-size: 15px;
    font-weight: 400;
`,$=e.span`
    color: darkgray;
    font-weight: 400;
    font-size: 13px;
`,y=e.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    padding-top: 3px;
    margin-left: auto;
    margin-right: 10px;
`,P=e.span`
    font-size: 15px;
    color: ${o=>o.$change};
`,E=e.span`
    color: ${o=>o.$change};
    cursor: pointer;
    font-size: 13px;
`;function z(){const[o,i]=p.useState(!1),{moveToRead:s}=g(),{data:r,isLoading:c,isError:a}=f(2,15),l=r||[];return t.jsxs(k,{children:[t.jsx(j,{children:c?t.jsx("div",{}):a?t.jsx("div",{children:"Error fetching data"}):l.map(n=>t.jsx(v,{company:n,setShowChangePrice:i,showChangePrice:o,onclick:()=>s(n.companyId)},n.companyId))}),t.jsx(u,{})]})}function H(){return t.jsx(z,{})}export{H as default};
//# sourceMappingURL=Entire-BrK6R19m.js.map
