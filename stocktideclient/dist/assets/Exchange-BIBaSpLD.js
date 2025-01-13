import{e as I,j as e,B as g}from"./index-BYRxBMX6.js";import{b as r,u as D,e as R}from"./vendor-BJTqHD0O.js";import{u as L}from"./useCustomCash-B71rFefH.js";import{m as z,d as t}from"./styled-components.browser.esm-Ds5_C6nt.js";import{c as P}from"./content-C3Cgojep.js";import"./utils-CJA6l5lt.js";const U={cashId:0,accountNumber:"",money:0,dollar:0},y=1386.83,V=({cashId:l})=>{const f=I(n=>n.cashSlice),{doUpdateCash:C}=L(),[o,v]=r.useState(U),[h,E]=r.useState("money"),[i,j]=r.useState(0),[u,w]=r.useState(0),[m,A]=r.useState(0),[x,p]=r.useState(""),S=D();r.useEffect(()=>{const n=f.cashList.find(s=>s.cashId==l);n&&v(n)},[f,l]),r.useEffect(()=>{let n=o.money,s=o.dollar;h==="money"?(n=o.money-i,s=o.dollar+i/y):h==="dollar"&&(n=o.money+i*y,s=o.dollar-i),s>0&&s<1?p("외화량은 1보다 작을 수 없습니다."):n<0||s<0?p("환전 후의 금액은 0보다 작을 수 없습니다."):p(""),w(Math.floor(n)),A(Math.floor(s))},[i,h,o.money,o.dollar]);const M=n=>{j(Number(n.target.value))},B=n=>{E(n.target.value)},N=()=>{S("../manage")},k=()=>{if(!x){if(u<0||m<0){g.error("환전 금액이 유효하지 않습니다");return}C(l,u,m).then(()=>{j(0),g.success("환전되었습니다")}).catch(n=>{g.error("환전 처리 중 오류가 발생했습니다",n)})}};return e.jsxs(q,{children:[e.jsxs(F,{children:[e.jsxs(c,{children:[e.jsx(a,{children:"계좌번호:"}),e.jsx(d,{children:o.accountNumber})]}),e.jsxs(c,{children:[e.jsx(a,{children:"원화량:"}),e.jsxs(d,{children:[o.money,"원"]})]}),e.jsxs(c,{children:[e.jsx(a,{children:"외화량:"}),e.jsxs(d,{children:[o.dollar,"달러"]})]}),e.jsxs(c,{children:[e.jsx(a,{children:"환전 금액:"}),e.jsx(G,{type:"number",value:i,onChange:M})]}),x&&e.jsx(H,{children:x}),e.jsxs(c,{children:[e.jsx(a,{children:"환전 화폐:"}),e.jsxs("select",{value:h,onChange:B,children:[e.jsx("option",{value:"money",children:"원화에서 외화로"}),e.jsx("option",{value:"dollar",children:"외화에서 원화로"})]})]}),e.jsxs(c,{children:[e.jsx(a,{children:"환전 후 원화량:"}),e.jsxs(d,{children:[u,"원"]})]}),e.jsxs(c,{children:[e.jsx(a,{children:"환전 후 외화량:"}),e.jsxs(d,{children:[m,"달러"]})]}),e.jsxs(J,{children:[e.jsx(b,{onClick:N,children:"계좌 관리"}),e.jsx(b,{onClick:k,disabled:!!x,children:"환전"})]})]}),e.jsx(P,{})]})},$=z`
    from {
        opacity: 0;
        transform: scale(0.9);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
`,q=t.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
`,F=t.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid #ccc;
    padding: 10px;
    width: 100%;
    margin: 10px;
    border-radius: 5px;
    animation: ${$} 3s;
`,c=t.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 5px 0;
`,a=t.div`
    font-weight: bold;
    margin-right: 10px;
`,d=t.div`
    margin-left: auto;
`,G=t.input`
    width: 60%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
`,H=t.div`
    color: red;
    font-size: 12px;
    margin-top: 5px;
`,J=t.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`,b=t.button`
    height: 40px;
    width: 45%;
    margin: 5px;
    padding: 5px;
    border: 2px solid #0056b3;
    color: #0056b3;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
        background-color: #0056b3;
        color: white;
    }

    &:disabled {
        background-color: gray;
        color: white;
        cursor: not-allowed;
    }
`,Y=()=>{const{cashId:l}=R();return e.jsx(V,{cashId:Number(l)})};export{Y as default};
//# sourceMappingURL=Exchange-BIBaSpLD.js.map
