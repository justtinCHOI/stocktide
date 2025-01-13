import{j as o,u as j,B as i}from"./index-BYRxBMX6.js";import{I as b,O as k}from"./menu-B_Ioibwj.js";import{b as w}from"./vendor-BJTqHD0O.js";import{d as n}from"./styled-components.browser.esm-Ds5_C6nt.js";import{g as L}from"./kakaoApi-1N8bDuOM.js";import{S as v}from"./common-BZ0l5WI6.js";import{u as C}from"./useTranslation-B2_3wHMh.js";import"./utils-CJA6l5lt.js";const y="/assets/KakaoLogo-DnWmZtu9.svg",B=({buttonText:t})=>{const r=L();return o.jsx(v,{to:r,children:o.jsxs(F,{children:[o.jsx(I,{src:y,alt:"Kakao Logo"}),t]})})},F=n.div`
    margin: 10px auto;
    padding: 10px 20px;
    background-color: #FFFFFF;
    border: 1px solid lightgray;
    border-radius: 5px;
    cursor: pointer;
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: #f2f2f2; // 호버 시 밝은 회색 배경 적용
    }
`,I=n.img`
    margin-right: 30px;
    width: 60px;
    height: auto;
`,K={email:"",password:""},S=()=>{const{t}=C(),[r,c]=w.useState({...K}),{doLogin:g}=j(),e=u=>{const{name:x,value:h}=u.target;c(f=>({...f,[x]:h}))},m=()=>{if(!r.email){i.warning("이메일을 입력해주세요");return}if(!r.password){i.warning("비밀번호를 입력해주세요");return}g(r).then()},p=()=>{};return o.jsxs(D,{children:[o.jsxs(a,{children:[o.jsx(s,{children:t("login.email")}),o.jsx(d,{name:"email",type:"text",value:r.email,onChange:e})]}),o.jsxs(a,{children:[o.jsx(s,{children:t("login.password")}),o.jsx(d,{name:"password",type:"password",value:r.password,onChange:e})]}),o.jsxs(E,{children:[o.jsx(l,{onClick:m,children:t("login.loginButton")}),o.jsx(l,{onClick:p,children:t("login.signupButton")})]}),o.jsx(B,{buttonText:t("login.kakaoLogin")})]})},D=n.div`
    margin-top: 6rem;
  .flex {
    display: flex;
    justify-content: center;
  }
`,a=n.div`
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`,s=n.div`
  width: 100%;
  padding: 1rem;
  text-align: left;
  font-weight: bold;
`,d=n.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.25rem;
  border: 1px solid #999;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
`,E=n.div`
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  width: 100%;
`,l=n.div`
    padding: 0.8rem;
    width: 8rem;
    margin: 0 1rem;
    background-color: #007bff;
    color: white;
    font-size: 1rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    text-align: center;

    &:hover {
        background-color: #0056b3;
    }
`,$=()=>o.jsx(b,{$top:2,children:o.jsx(k,{children:o.jsx(S,{})})});export{$ as default};
//# sourceMappingURL=Login-CJCt_pae.js.map
