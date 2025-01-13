import{B as g,e as A,j as e}from"./index-BYRxBMX6.js";import{b as h,u as k,e as P}from"./vendor-BJTqHD0O.js";import{u as I}from"./useCustomCash-B71rFefH.js";import{m as N,d as a}from"./styled-components.browser.esm-Ds5_C6nt.js";import{c as _}from"./content-C3Cgojep.js";import"./utils-CJA6l5lt.js";const M=()=>new Promise(o=>{if(window.IMP)o(window.IMP);else{const n=setInterval(()=>{window.IMP&&(clearInterval(n),o(window.IMP))},300)}});function T(){const o=Date.now(),n=Math.random();return`${o}-${n}`}function O(o){M().then(n=>{n.init("imp76806111");const c=o;let i,u,s,l,d;i="nicolaochoi@naver.com",u="01074991534",s="최정의",l="서울",d="특별시";let b=l+" "+d,w="StockTide";const m={total_price:c,address:l,phone:u};console.log(m),fetch("/api/POST/checkPayment",{method:"POST",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify(m)}).then(t=>{if(!t.ok)throw alert("인터넷 이슈!!"),new Error("Network response was not ok");return console.log("response",t),t.json()}).then(t=>{console.log("data.code",t.code),t.code===666&&(alert(t.msg),location.href="/logins"),t.code===400&&(alert(t.msg),location.href="/main"),t.code===500&&(alert(t.msg),location.href="/cart"),t.code===200?(alert("카카오페이가 떠야해"),n.request_pay({pg:"kcp.{상점ID}",pay_method:"card",merchant_uid:T(),name:w,amount:c,buyer_email:i,buyer_name:s,buyer_tel:u,buyer_addr:b,buyer_postcode:"01181"},function(x){x.success?(console.log(t),E("/api/POST/payment",m),B()):console.log(x)})):q(t)}).catch(t=>{console.error("There was a problem with your fetch operation:",t)}),console.log(c)}).catch(n=>{console.error("Failed to initialize IMP:",n),g.error("결제 모듈 초기화에 실패했습니다.")})}const B=()=>{location.href="/cart"};async function E(o,n){try{await fetch(o,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)})}catch(c){throw console.error("Failed to send payment data:",c),c}}function q(o){switch(o.code){case 666:alert(o.msg),location.href="/logins";break;case 400:alert(o.msg),location.href="/main";break;case 500:alert(o.msg),location.href="/cart";break}}const D={cashId:0,accountNumber:"",money:0,dollar:0},R=({cashId:o})=>{const n=A(r=>r.cashSlice),{doUpdateCash:c}=I(),[i,u]=h.useState(D),[s,l]=h.useState(0),[d,b]=h.useState(0),[w,m]=h.useState(!1),t=k();h.useEffect(()=>{const r=i.money||0;b(r+(s||0))},[s]),h.useEffect(()=>{const r=n.cashList.find(j=>j.cashId==o);r&&u(r)},[n,o]);const x=r=>{r.target.value?l(Number(r.target.value)):l(void 0)},S=()=>{if(s==null||s<=0){g.error("충전 금액을 확인해주세요");return}else c(o,d,0).then(()=>{m(!0),l(0);try{O(d),g.success("충전되었습니다")}catch{g.error("결제 모듈 초기화에 실패했습니다")}}).catch(()=>{g.error("충전 처리 중 오류가 발생했습니다")})},v=()=>{t("../manage")};return e.jsxs(F,{children:[e.jsxs(J,{children:[e.jsxs(p,{children:[e.jsx(f,{children:"계좌번호:"}),e.jsx(y,{children:i.accountNumber})]}),e.jsxs(p,{children:[e.jsx(f,{children:"원화량:"}),e.jsxs(y,{children:[i.money,"원"]})]}),e.jsxs(p,{children:[e.jsx(f,{children:"외화량:"}),e.jsxs(y,{children:[i.dollar,"달러"]})]}),e.jsxs(p,{children:[e.jsx(f,{children:"충전 금액:"}),e.jsx(L,{type:"number",value:s||"",onChange:x})]}),e.jsxs(p,{children:[e.jsx(f,{children:"충전 후 금액:"}),e.jsxs(y,{style:{color:w?"black":"gray"},children:[d,"원"]})]}),e.jsxs(U,{children:[e.jsx(C,{onClick:v,children:"계좌 관리"}),e.jsx(C,{onClick:S,children:"충전"})]})]}),e.jsx(_,{})]})},$=N`
    from {
        opacity: 0;
        transform: scale(0.9);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
`,F=a.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
`,J=a.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid #ccc;
    padding: 10px;
    margin: 10px;
    width: 100%;
    border-radius: 5px;
    animation: ${$} 3s;
`,p=a.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 5px 0;
`,f=a.div`
    font-weight: bold;
    margin-right: 10px;
`,y=a.div`
    margin-left: auto;
`,L=a.input`
    width: 60%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
`,U=a.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`,C=a.button`
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
`,W=()=>{const{cashId:o}=P();return e.jsx(R,{cashId:Number(o)})};export{W as default};
//# sourceMappingURL=Charge-C-rnbkwi.js.map
