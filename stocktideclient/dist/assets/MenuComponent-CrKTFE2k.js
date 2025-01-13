import{j as o}from"./index-BYRxBMX6.js";import{d as t}from"./styled-components.browser.esm-Ds5_C6nt.js";import{d as m,e as u}from"./index-BUmq1CZ1.js";import{b as l}from"./vendor-BJTqHD0O.js";import{S as p}from"./common-BZ0l5WI6.js";const E=({menus:n,urls:d})=>{const[i,a]=l.useState(!1),[s,f]=l.useState(null),c=r=>{f(r),a(!1)},h=()=>a(!i);return o.jsx(g,{children:o.jsxs(v,{children:[o.jsxs("div",{children:[o.jsx(b,{children:n.map((r,e)=>o.jsx(x,{$active:s===e,onClick:()=>c(e),children:o.jsx(p,{to:d[e],children:r})},e))}),o.jsx(j,{onClick:h,children:i?o.jsx(m,{}):o.jsx(u,{})})]}),i&&o.jsx(w,{children:n.map((r,e)=>o.jsx(x,{$expanded:i,$extive:s===e,onClick:()=>c(e),children:o.jsx(p,{to:d[e],children:r})},e))})]})})},g=t.div`
    width: 100%;
    position: relative;
`,v=t.div`
    display: flex;
    background-color: #fff;
    margin-bottom: 16px;
    position: absolute;
    width: 100%;
    align-items: center;
    z-index: 10;
    flex-direction: column;
`,b=t.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid #d2d6dc;
    overflow-x: auto;
    width: 100%;
    &::-webkit-scrollbar {
        display: none;
    }
    &:after {
        content: '';
        position: absolute;
        right: 0;
        width: 35%;
        height: 30px;
        background: linear-gradient(to right, transparent, #fff);
        pointer-events: none;
    }
`,x=t.div`
    font-size: 1rem;
    color: #4a5568;
    padding: 8px 16px;
    cursor: pointer;
    white-space: nowrap;
    ${({$expanded:n})=>n&&`
        background-color: #555;
        color: #fff;
        margin: 12px;
        border-radius: 10px;
        text-align: center;
        font-size: 0.9rem;
        padding: 2px 6px;
    `}
    ${({$active:n})=>n&&`
        color: red;
        border-bottom: 1px solid red;
    `}
    ${({$extive:n})=>n&&`
        background-color: #888;
    `}
`,j=t.div`
    display: flex;
    width: 12%;
    position: absolute;
    right: 0;
    top: 20px;
    transform: translateY(-50%);
    cursor: pointer;
    padding: 8px;
`,w=t.div`
    display: flex;
    flex-wrap: wrap;
    color: #fff;
    padding: 5px;
    width: 100%;
    & > div {
        flex: 1 1 22%;
        margin: 5px;
    }
`;export{E as M};
//# sourceMappingURL=MenuComponent-CrKTFE2k.js.map
