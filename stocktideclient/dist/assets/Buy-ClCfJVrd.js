var te=e=>{throw TypeError(e)};var _=(e,o,i)=>o.has(e)||te("Cannot "+i);var m=(e,o,i)=>(_(e,o,"read from private field"),i?i.call(e):o.get(e)),D=(e,o,i)=>o.has(e)?te("Cannot add the same private member more than once"):o instanceof WeakSet?o.add(e):o.set(e,i),R=(e,o,i,n)=>(_(e,o,"write to private field"),n?n.call(e,i):o.set(e,i),i),B=(e,o,i)=>(_(e,o,"access private method"),i);import{S as Be,p as ze,q as oe,r as Le,t as he,o as xe,e as g,u as E,v as K,A as H,b as z,j as t,w as L,x as Ee,y as Ae,z as C,C as ne,D as Me,E as Fe,F as qe,G as Ue,H as Ke,B as We}from"./index-BYRxBMX6.js";import{b as f,e as A}from"./vendor-BJTqHD0O.js";import{d as l}from"./styled-components.browser.esm-Ds5_C6nt.js";import{u as G}from"./useGetStockInfo-BTgoJF-f.js";import{l as me}from"./companyLogos-DgTyPECG.js";import{n as _e,s as Qe,u as ge}from"./useQuery-DuEvguJc.js";import{d as fe}from"./CentralSectionMenu-dummyImg-CRG5GB_j.js";import"./utils-CJA6l5lt.js";var P,N,k,$,S,U,Q,ue,He=(ue=class extends Be{constructor(o,i){super();D(this,S);D(this,P);D(this,N);D(this,k);D(this,$);R(this,P,o),this.setOptions(i),this.bindMethods(),B(this,S,U).call(this)}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(o){var n;const i=this.options;this.options=m(this,P).defaultMutationOptions(o),ze(this.options,i)||m(this,P).getMutationCache().notify({type:"observerOptionsUpdated",mutation:m(this,k),observer:this}),i!=null&&i.mutationKey&&this.options.mutationKey&&oe(i.mutationKey)!==oe(this.options.mutationKey)?this.reset():((n=m(this,k))==null?void 0:n.state.status)==="pending"&&m(this,k).setOptions(this.options)}onUnsubscribe(){var o;this.hasListeners()||(o=m(this,k))==null||o.removeObserver(this)}onMutationUpdate(o){B(this,S,U).call(this),B(this,S,Q).call(this,o)}getCurrentResult(){return m(this,N)}reset(){var o;(o=m(this,k))==null||o.removeObserver(this),R(this,k,void 0),B(this,S,U).call(this),B(this,S,Q).call(this)}mutate(o,i){var n;return R(this,$,i),(n=m(this,k))==null||n.removeObserver(this),R(this,k,m(this,P).getMutationCache().build(m(this,P),this.options)),m(this,k).addObserver(this),m(this,k).execute(o)}},P=new WeakMap,N=new WeakMap,k=new WeakMap,$=new WeakMap,S=new WeakSet,U=function(){var i;const o=((i=m(this,k))==null?void 0:i.state)??Le();R(this,N,{...o,isPending:o.status==="pending",isSuccess:o.status==="success",isError:o.status==="error",isIdle:o.status==="idle",mutate:this.mutate,reset:this.reset})},Q=function(o){he.batch(()=>{var i,n,s,c,a,d,p,u;if(m(this,$)&&this.hasListeners()){const x=m(this,N).variables,y=m(this,N).context;(o==null?void 0:o.type)==="success"?((n=(i=m(this,$)).onSuccess)==null||n.call(i,o.data,x,y),(c=(s=m(this,$)).onSettled)==null||c.call(s,o.data,null,x,y)):(o==null?void 0:o.type)==="error"&&((d=(a=m(this,$)).onError)==null||d.call(a,o.error,x,y),(u=(p=m(this,$)).onSettled)==null||u.call(p,void 0,o.error,x,y))}this.listeners.forEach(x=>{x(m(this,N))})})},ue);function Ge(e,o){const i=xe(),[n]=f.useState(()=>new He(i,e));f.useEffect(()=>{n.setOptions(e)},[n,e]);const s=f.useSyncExternalStore(f.useCallback(a=>n.subscribe(he.batchCalls(a)),[n]),()=>n.getCurrentResult(),()=>n.getCurrentResult()),c=f.useCallback((a,d)=>{n.mutate(a,d).catch(_e)},[n]);if(s.error&&Qe(n.options.throwOnError,[s.error]))throw s.error;return{...s,mutate:c,mutateAsync:s.mutate}}const ie=`${H}/api/stock`,Xe=()=>{const{companyId:e}=A(),o=e?parseInt(e,10):0,i=g(p=>p.stockOrderTypeSlice),n=g(p=>p.stockOrderPriceSlice),s=g(p=>p.stockOrderVolumeSlice),{loginState:c}=E(),a=c.memberId,d=xe();return Ge({mutationFn:async()=>Ye(i,o,n,s,a),onSuccess:()=>{d.invalidateQueries({queryKey:["cash"]}),d.invalidateQueries({queryKey:["holdingStock"]}),d.invalidateQueries({queryKey:["orderRecord"]}),d.invalidateQueries({queryKey:["stockHolds"]}),d.invalidateQueries({queryKey:["money"]})}})},Ye=async(e,o,i,n,s)=>e?(await K.post(`${ie}/stock/sell?companyId=${o}&price=${i}&stockCount=${n}`)).data:(await K.post(`${ie}/buy?companyId=${o}&price=${i}&stockCount=${n}&memberId=${s}`)).data,Je="%",Ze=({index:e,price:o,volume:i,changeRate:n,totalSellingVolume:s,totalBuyingVolume:c})=>{const a=z(),d=g(x=>x.stockOrderPriceSlice),p=f.useRef(null),u=()=>{a(L(o))};return f.useEffect(()=>{e===9&&p.current&&(p.current.focus(),p.current.scrollIntoView({behavior:"smooth",block:"center"}))},[p,e]),t.jsxs(tt,{$index:e,ref:e===9?p:null,$price:o,$orderPrice:d,onClick:u,children:[t.jsxs(ot,{$changeRate:parseFloat(n),children:[t.jsx("div",{className:"price",children:o.toLocaleString()}),t.jsxs("div",{className:"changeRate",children:[n,Je]})]}),t.jsxs(nt,{$index:e,children:[t.jsx("div",{className:"volume",children:i.toLocaleString()}),t.jsx(et,{index:e,volume:i,upperPriceVolumeSum:s,lowerPriceVolumeSum:c})]})]})},et=e=>{const{index:o,volume:i,upperPriceVolumeSum:n,lowerPriceVolumeSum:s}=e,[c,a]=f.useState(0);return f.useEffect(()=>{a(i/(o<10?n:s)*100)},[i,o,n,s]),t.jsx(it,{$index:o,$volume:i,$upperPriceVolumeSum:n,$lowerPriceVolumeSum:s,style:{width:`${c}%`}})},tt=l.div`
    width: 100%;
    height: 46px;
    margin-bottom: 2px;
    background-color: ${e=>e.$price===e.$orderPrice?e.$index>9?"#e9c2bf":"#bed1eb":e.$index>9?"#FDE8E7":"#E7F0FD"};
    border-left: ${e=>e.$price===e.$orderPrice?"3px solid red":e.$index>9?"3px solid #FDE8E7":"3px solid #E7F0FD"};
    display: flex;
    flex-direction: row;
    transition: border 0.8s ease, background-color 0.8s ease;

    &:hover {
        cursor: pointer;
    }
`,ot=l.div`
    width: 50%;
    display: flex;
    padding-right: 11px;
    flex-direction: column;
    align-items: flex-end;

    .price {
        font-size: 14px;
        font-weight: 400;
        padding-top: 1px;
    }

    .changeRate {
        font-size: 12px;
        font-weight: 400;
        color: ${e=>e.$changeRate>0?"#ed2926":e.$changeRate===0?"black":"#3177d7"};
    }
`,nt=l.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    font-size: 12px;
    color: ${e=>e.$index<10?"#2679ed":"#e22926"};

    .volume {
        height: 100%;
        display: flex;
        align-items: center;
        padding-right: 8px;
    }
`,it=l.span`
    height: 2px;
    background-color: ${e=>e.$index<10?"#2679ed":"#e22926"};
    transition: width 0.5s ease;
`,rt=()=>{const{companyId:e}=A(),o=Number(e),i=g(r=>r.stockOrderTypeSlice),{stockInfo:n}=G(o);if(!n||!n.stockInfResponseDto||!n.stockAsBiResponseDto)return null;const s=parseInt(n.stockInfResponseDto.stck_prpr,10),c=parseInt(n.stockInfResponseDto.prdy_vrss,10),a=s-c,d=[],p=[];for(let r=1;r<11;r++){const h=`askp${r}`,v=`askp_rsqn${r}`,V=`bidp${r}`,W=`bidp_rsqn${r}`,O={price:parseInt(n.stockAsBiResponseDto[h]),volume:parseInt(n.stockAsBiResponseDto[v])},M={price:parseInt(n.stockAsBiResponseDto[V]),volume:parseInt(n.stockAsBiResponseDto[W])};d.unshift(O),p.push(M)}const u=d.filter(r=>r.price!==0),x=p.filter(r=>r.price!==0),y=u[u.length-1].price-x[0].price;for(let r=0;u.length<10;r++){const h={price:u[0].price+y,volume:0};u.unshift(h)}for(let r=0;x.length<10;r++){const h={price:x[x.length-1].price-y,volume:0};x.push(h)}const j=[...u,...x],T=u.reduce((r,h)=>r=r+h.volume,0),w=x.reduce((r,h)=>r=r+h.volume,0);return t.jsx(st,{$orderType:i,children:t.jsx(ct,{children:j.map((r,h)=>{const v=((r.price-a)/a*100).toFixed(2);return t.jsx(Ze,{index:h,price:r.price,volume:r.volume,changeRate:v,totalSellingVolume:T,totalBuyingVolume:w},r.price)})})})},st=l.div`
    width: 40%;
    height: 100%;
    margin-right: 16px;

    .priceIndicator {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 32px;
        font-size: 13px;
        padding-left: 15px;

        & div {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
`,ct=l.ul`
    width: 100%;
    height: 100%;
    padding: 0;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`,at="가격",lt="원",dt=" [거래량 없음] 주문 시 대기 처리 됩니다",pt=" [거래량 있음] 주문 시 체결 처리 됩니다",ut=({stockInfo:e,companyId:o})=>{const i=z(),n=g(b=>b.stockOrderPriceSlice),[s,c]=f.useState(null),{askp1:a,askp2:d,askp3:p,askp4:u,askp5:x,askp6:y,askp7:j,askp8:T,askp9:w,askp10:r}=e,V=[a,d,p,u,x,y,j,T,w,r].map(b=>parseInt(b)).filter(b=>b!==0),W=V[0],O=V[1]-V[0],M=g(b=>b.stockOrderTypeSlice),[X,F]=f.useState(!0),{bidp1:be,bidp2:ke,bidp3:je,bidp4:ve,bidp5:we,bidp6:Ce,bidp7:$e,bidp8:Se,bidp9:Te,bidp10:Pe}=e,Ne=[be,ke,je,ve,we,Ce,$e,Se,Te,Pe].map(b=>parseInt(b)).filter(b=>b!==0),Y=()=>{M?n!==0&&!Ne.includes(n)?F(!1):F(!0):n!==0&&!V.includes(n)?F(!1):F(!0)};f.useEffect(()=>{Y()},[n,M]);const J=()=>{i(Ee(O))},Z=()=>{i(Ae(O))},Oe=b=>{b.code==="ArrowUp"?J():b.code==="ArrowDown"&&Z()},Ie=b=>{const ee=b.target.value,I=parseInt(ee,10);if(I<0||isNaN(I)){ee===""&&i(L(0));return}if(s!==null&&clearTimeout(s),i(L(I)),I>O&&I%O!==0){const Ve=setTimeout(()=>{const De=I%O,Re=I-De;i(L(Re))},800);c(Ve)}};return f.useEffect(()=>{i(L(W))},[o]),t.jsxs(ht,{children:[t.jsx("div",{className:"PriceCategoryBox",children:t.jsx("div",{className:"Title",children:at})}),t.jsxs("div",{className:"PriceSettingBox",children:[t.jsx(xt,{value:n,onChange:Ie,onKeyDown:Oe,onFocus:Y}),t.jsx(mt,{children:lt}),t.jsxs("div",{className:"DirectionBox",children:[t.jsx("button",{className:"PriceUp",onClick:J,children:"⋀"}),t.jsx("button",{className:"PriceDown",onClick:Z,children:"⋁"})]})]}),t.jsx(gt,{$orderPossibility:X,children:t.jsxs("div",{children:["✔ ",X?`${pt}`:`${dt}`]})})]})},ht=l.div`
    position: relative;
    width: 100%;
    margin-top: 21px;
    margin-bottom: 34px;

    .PriceCategoryBox {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 8px;

        .Title {
            padding-left: 5px;
            font-size: 13px;
            color: #999999;
        }

        .ButtonContainer {
            position: relative;
            width: 100px;
            height: 25px;
            background-color: #f2f2f2;
            border-radius: 0.3rem;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 2px;
        }
    }

    .PriceSettingBox {
        display: flex;
        flex-direction: row;
        

        .DirectionBox {
            display: flex;
            flex-direction: column;

            & button {
                width: 31px;
                height: 15px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 10px;
                border: 1px solid darkgray;
                border-radius: 0;

                &.PriceUp {
                    border-bottom: none;
                    border-radius: 0 0.2rem 0 0;
                }

                &.PriceDown {
                    border-radius: 0 0 0.2rem 0;
                }
            }
        }
    }
`,xt=l.input`
    width: 100%;
    flex: 1 0 0;
    height: 30px;
    border: 1px solid darkgray;
    border-right: none;
    border-radius: 0.2rem 0 0 0.2rem;
    font-size: 15px;
    font-weight: 500;
    text-align: right;
    padding-bottom: 3px;
`,mt=l.div`
    height: 30px;
    color: #999999;
    font-size: 13px;
    font-weight: 400;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 8px;
    border-top: 1px solid darkgray;
    border-bottom: 1px solid darkgray;
    background-color: #ffffff;
`,gt=l.div`
    position: absolute;
    top: 61px;
    left: 2px;
    font-size: 0.77em;
    color: ${e=>e.$orderPossibility?"#2679ed":"#e22926"};
    transition: color 0.3s ease-in-out;
`,ft=`${H}/api/cash`,yt=async e=>(await K.get(`${ft}/one/${e}`)).data.money,ye=()=>{const{loginState:e}=E(),o=!!e.email,i=e.memberId,{data:n,isLoading:s,isError:c}=ge({queryKey:["cash",i],queryFn:()=>yt(i),enabled:o,staleTime:1e3*60*5,refetchOnWindowFocus:!1});return{cashData:n,cashLoading:s,cashError:c}},bt=`${H}/api/stock`,kt=async(e,o)=>(await K.get(`${bt}/stockholds/${e}`,{params:{companyId:o}})).data,jt=e=>{const{loginState:o}=E(),i=!!o.email,n=o.memberId,{data:s,isLoading:c,isError:a}=ge({queryKey:["holdingStocks",e],queryFn:()=>kt(n,e),enabled:i,staleTime:1e3*60*5,refetchOnWindowFocus:!0});return{holdingStockData:s,holdingStockLoading:c,holdingStockError:a}},vt="수량",wt="최대",re="주",se=10,ce=25,ae=50,le=100,q="%",Ct=()=>{const e=z(),{companyId:o}=A(),i=Number(o),n=g(r=>r.stockOrderTypeSlice),s=g(r=>r.stockOrderPriceSlice),c=g(r=>r.stockOrderVolumeSlice);let a=0;const{cashData:d}=ye(),{holdingStockData:p}=jt(i);let u=0;if(d&&p){u=Math.trunc(s!==0?d/s:d);const r=p.filter(h=>h.companyId===i);r.length!==0&&(a=r[0].stockCount)}const x=()=>{n||c<u&&e(ne()),n&&c<a&&e(ne())},y=()=>{0<c&&e(Me())},j=r=>{r.code==="ArrowUp"?x():r.code==="ArrowDown"&&y()},T=r=>{const h=r.target.value,v=parseInt(h,10);if(v<0||isNaN(v)){h===""&&e(C(0));return}if(!n){if(u<v)return;e(C(v))}if(n){if(a<v)return;e(C(v))}},w=r=>{if(!n){const h=Math.trunc(u*(r/100));e(C(h))}if(n){const h=Math.trunc(a*(r/100));e(C(h))}};return f.useEffect(()=>{u<c&&e(C(u))},[u]),f.useEffect(()=>{e(C(0))},[o]),t.jsxs($t,{children:[t.jsxs(St,{$orderType:n,children:[t.jsx("div",{className:"Title",children:vt}),t.jsxs("div",{className:"MaximumVolumeContainer",children:[t.jsx("span",{children:wt}),t.jsx("span",{className:"maximumVolume",children:n?a:u}),t.jsx("span",{children:re})]})]}),t.jsxs(Tt,{children:[t.jsx(Pt,{value:c,onChange:T,onKeyDown:j}),t.jsx(Ot,{children:re}),t.jsxs("div",{className:"DirectionContainer",children:[t.jsx("button",{className:"VolumeUp",onClick:x,children:"⋀"}),t.jsx("button",{className:"VolumeDown",onClick:y,children:"⋁"})]})]}),t.jsxs(Nt,{children:[t.jsxs("button",{onClick:()=>w(se),children:[se,q]}),t.jsxs("button",{onClick:()=>w(ce),children:[ce,q]}),t.jsxs("button",{onClick:()=>w(ae),children:[ae,q]}),t.jsxs("button",{onClick:()=>w(le),children:[le,q]})]})]})},$t=l.div`
    width: 100%;
    margin-top: 16px;
    margin-bottom: 56px;
`,St=l.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 8px;

    .Title {
        padding-left: 5px;
        font-size: 13px;
        color: #999999;
    }

    .MaximumVolumeContainer {
        display: flex;
        flex-direction: row;
        gap: 3px;

        & span {
            font-size: 14px;
            color: #999999;
        }

        .maximumVolume {
            color: ${e=>e.$orderType?"#3177d7":"#ed2926"};
        }
    }
`,Tt=l.div`
    display: flex;
    flex-direction: row;

    .DirectionContainer {
        display: flex;
        flex-direction: column;

        & button {
            width: 31px;
            height: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 10px;
            border: 1px solid darkgray;
            border-radius: 0;

            &.VolumeUp {
                border-bottom: none;
                border-radius: 0 0.2rem 0 0;
            }

            &.VolumeDown {
                border-radius: 0 0 0.2rem 0;
            }
        }
    }
`,Pt=l.input`
    width: 100%;
    flex: 1 0 0;
    height: 30px;
    border: 1px solid darkgray;
    border-right: none;
    border-radius: 0.2rem 0 0 0.2rem;
    font-size: 15px;
    font-weight: 500;
    text-align: right;
    padding-bottom: 3px;
`,Nt=l.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 8px;
    gap: 8px;

    & button {
        width: 56px;
        height: 28px;
        border: none;
        border-radius: 0.2rem;
    }
`,Ot=l.div`
    height: 30px;
    color: #999999;
    font-size: 13px;
    font-weight: 400;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 8px;
    border-top: 1px solid darkgray;
    border-bottom: 1px solid darkgray;
    background-color: #ffffff;
`,It="최대",Vt="원",Dt="주문총액",Rt="원",Bt=()=>{let e="";const{cashData:o}=ye();o&&(e=o.toLocaleString());const i=z(),n=g(x=>x.stockOrderTypeSlice),s=g(x=>x.stockOrderPriceSlice),c=g(x=>x.stockOrderVolumeSlice),[a,d]=f.useState(0),p=n?"매도":"매수",u=()=>{i(Fe())};return f.useEffect(()=>{d(s*c)},[s,c]),f.useEffect(()=>{i(C(0)),d(0)},[n]),t.jsxs("div",{className:"container",children:[t.jsxs(zt,{$orderType:n,children:[t.jsx("span",{children:It}),t.jsx("span",{className:"availableMoney",children:e}),t.jsx("span",{children:Vt})]}),t.jsxs(Lt,{children:[t.jsx("div",{className:"totalAmountText",children:Dt}),t.jsx("div",{className:"totalAmount",children:a.toLocaleString()}),t.jsx("div",{children:Rt})]}),t.jsx(Et,{$orderType:n,onClick:u,children:p})]})},zt=l.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 4px;

    & span {
        font-size: 14px;
        color: ${e=>e.$orderType?"white":"#999999"};
    }

    .availableMoney {
        color: ${e=>e.$orderType?"white":"#ed2926"};
    }
`,Lt=l.div`
    display: flex;
    flex-direction: row;
    margin-top: 4px;
    gap: 4px;

    & div {
        font-size: 13px;
        color: #999999;
        display: flex;
        align-items: center;
    }

    .totalAmountText {
        flex: 8 0 0;
    }

    .totalAmount {
        color: black;
        font-size: 15.5px;
    }
`,Et=l.button`
    width: 100%;
    height: 32px;
    margin-top: 16px;
    border: none;
    border-radius: 0.25rem;
    background-color: ${e=>e.$orderType?"#2679ed":"#e22926"};
    transition: background-color 0.5s;
    color: #ffffff;
    font-weight: 400;
    cursor: pointer;

    &:hover {
        background-color: ${e=>e.$orderType?"#034baf":"#c20d09"};
        transition: background-color 0.5s ease;
    }
`,At="매수",Mt="매도",Ft=()=>{const e=z(),o=g(u=>u.stockOrderTypeSlice),{companyId:i}=A(),n=Number(i),{stockInfo:s,stockInfoLoading:c,stockInfoError:a}=G(n);if(!s)return null;if(c)return t.jsx(t.Fragment,{});if(a)return t.jsx(t.Fragment,{});const d=()=>{e(qe())},p=()=>{e(Ue())};return t.jsxs(Ut,{children:[t.jsxs("div",{className:"OrderType",children:[t.jsx(Kt,{onClick:d,$orderType:o,children:At}),t.jsx(Wt,{onClick:p,$orderType:o,children:Mt})]}),t.jsx(qt,{}),t.jsx(ut,{stockInfo:s.stockAsBiResponseDto,companyId:Number(i)}),t.jsx(Ct,{}),t.jsx(Bt,{})]})},qt=()=>{const e=g(o=>o.stockOrderTypeSlice);return t.jsx(_t,{children:t.jsx(Qt,{$orderType:e,children:t.jsx(Ht,{$orderType:e})})})},Ut=l.div`
    width: 51%;
    height: 100%;

    .OrderType {
        width: 100%;
        height: 31px;
        display: flex;
        flex-direction: row;
        color: #9999;
    }
`,Kt=l.div`
    flex: 1 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 31px;
    font-size: 14px;
    color: ${e=>!e.$orderType&&"#e22926"};
    transition: color 0.5s;
`,Wt=l.div`
    flex: 1 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 31px;
    font-size: 14px;
    color: ${e=>e.$orderType&&"#2679ed"};
    transition: color 0.5s;
`,_t=l.div`
    background-color: darkgray;
`,Qt=l.div`
    transform: translateX(${e=>e.$orderType?"50%":"0"});
    transition: transform 0.3s ease-in-out;
    width: 100%;
    height: 2px;
`,Ht=l.div`
    width: 50%;
    height: 2px;
    background-color: ${e=>e.$orderType?"#2679ed":"#e22926"};
`,Gt="주문 실패",Xt="주문 수량이 없습니다",Yt="입력하신 가격이 올바르지 않습니다",Jt="확인",Zt="주문단가",eo="주문수량",to="총 주문금액",de="원",pe="주",oo="취소",no="확인",io=" 요청이 완료되었습니다",ro=({corpName:e})=>{const o=z(),i=g(h=>h.stockOrderTypeSlice),n=g(h=>h.stockOrderVolumeSlice),s=g(h=>h.stockOrderPriceSlice),c=g(h=>h.decisionWindowSlice),a=i?"매도":"매수",d=s.toLocaleString(),p=n.toLocaleString(),u=(s*n).toLocaleString(),y={...me}[e]||fe,j=()=>{o(Ke())},T=Xe(),w=()=>{T.mutate();const{isError:h}=T;h&&console.log("주문 오류 발생"),We(t.jsxs(lo,{$orderType:i,children:[t.jsxs("div",{className:"overview",children:[t.jsx("img",{src:y,alt:"stock logo"}),t.jsxs("div",{className:"orderInfo",children:[e," ",p,pe]})]}),t.jsxs("div",{children:[t.jsxs("span",{className:"orderType",children:["✓ ",a]}),t.jsx("span",{children:io})]})]}),{hideProgressBar:!0}),o(C(0)),j()},r=s===0||n===0;return t.jsxs(t.Fragment,{children:[t.jsxs(so,{children:[t.jsx(rt,{}),t.jsx(Ft,{})]}),c?r?t.jsx(co,{children:t.jsxs("div",{className:"Container",children:[t.jsx("div",{className:"message01",children:Gt}),t.jsx("div",{className:"message02",children:s!==0?Xt:Yt}),t.jsx("button",{onClick:j,children:Jt})]})}):t.jsx(ao,{$orderType:i,children:t.jsxs("div",{className:"Container",children:[t.jsx("img",{className:"CorpLogo",src:y,alt:"stock logo"}),t.jsxs("div",{className:"OrderOverview",children:[t.jsx("span",{className:"CorpName",children:e}),t.jsx("span",{className:"OrderType",children:a})]}),t.jsxs("div",{className:"OrderContent",children:[t.jsxs("div",{className:"Price",children:[t.jsx("span",{className:"text",children:Zt}),t.jsxs("span",{children:[d," ",de]})]}),t.jsxs("div",{className:"Volume",children:[t.jsx("span",{className:"text",children:eo}),t.jsxs("span",{children:[p," ",pe]})]}),t.jsxs("div",{className:"TotalOrderAmout",children:[t.jsx("span",{className:"text",children:to}),t.jsxs("span",{children:[u," ",de]})]}),t.jsxs("div",{className:"ButtonContainer",children:[t.jsx("button",{className:"cancel",onClick:j,children:oo}),t.jsx("button",{className:"confirm",onClick:w,children:no})]})]})]})}):null]})},so=l.div`
    height: 414px;
    display: flex;
    flex-direction: row;
`,co=l.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 400;
    display: flex;
    justify-content: center;
    align-items: center;

    .Container {
        z-index: 100;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 8px;

        width: 360px;
        height: 148px;
        padding: 16px;
        background-color: white;
        border-radius: 0.5rem;

        .message01 {
            font-size: 18.5px;
            font-weight: 500;
        }

        .message02 {
            font-size: 16.5px;
            font-weight: 400;
        }

        & button {
            width: 100%;
            height: 36px;
            border: none;
            border-radius: 0.5rem;
            font-size: 14.5px;
            color: white;
            background-color: #2f4f4f;
            margin-top: 12px;
        }
    }
`,ao=l.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 400;
    display: flex;
    justify-content: center;
    align-items: center;

    & div {
        z-index: 400;
    }

    .Container {
        z-index: 500;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        width: 328px;
        height: 345px;
        background-color: white;
        border: none;
        border-radius: 0.5rem;

        padding-left: 20px;
        padding-right: 20px;
        padding-top: 24px;

        .CorpLogo {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }

        .OrderOverview {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 6px;
            font-size: 18px;
            font-weight: 500;
            padding-top: 18px;
            padding-bottom: 28px;

            .OrderType {
                color: ${e=>e.$orderType?"#2679ed":"#e22926"};
            }
        }

        .OrderContent {
            width: 100%;
            font-size: 15px;

            & div {
                height: 24px;

                display: flex;
                flex-direction: row;
                justify-content: space-between;
                padding-bottom: 40px;
            }

            .text {
                color: #292828;
            }

            .Volume {
                border-bottom: 0.1px solid #d3cece99;
            }

            .TotalOrderAmout {
                padding-top: 20px;
                padding-bottom: 45px;
            }
        }

        .ButtonContainer {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            padding-top: 20px;
            gap: 12px;

            & button {
                width: 50%;
                height: 32px;
                border: none;
                border-radius: 0.25rem;
            }

            .cancel {
                color: ${e=>e.$orderType?"#2679ed":"#e22926"};
                background-color: ${e=>e.$orderType?"#dce9fc":"#fcdddb"};
            }

            .confirm {
                color: white;
                background-color: ${e=>e.$orderType?"#2679ed":"#e22926"};
            }
        }
    }
`,lo=l.div`
    display: flex;
    flex-direction: column;
    gap: 7px;
    font-size: 14px;

    .overview {
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        font-weight: 700;
        gap: 6px;
    }

    & img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        padding-bottom: 3px;
    }

    .orderType {
        color: ${e=>e.$orderType?"#2679ed":"#e22926"};
    }
`,po="로그인이 필요한 서비스입니다",uo="StockHolm 로그인",ho=()=>{const{moveToLogin:e}=E();return t.jsxs(xo,{children:[t.jsx("div",{className:"Notification",children:po}),t.jsx("button",{className:"LoginButton",onClick:e,children:uo})]})},xo=l.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;

  .Notification {
    color: #999999;
  }

  .LoginButton {
    width: 170px;
    height: 32px;
    font-size: 15px;
    font-weight: 400;
    color: white;
    background-color: #2f4f4f;
    border: none;
    border-radius: 0.3rem;
    cursor: pointer;  
  }
`,mo="코스피",go=({companyId:e})=>{const{loginState:o}=E(),i=!!o.email,{stockInfo:n}=G(e);if(!n||!n.korName||!n.code||!n.stockInfResponseDto.prdy_ctrt)return null;const s=n.korName,c=n.code,a=parseInt(n.stockInfResponseDto.stck_prpr,10).toLocaleString(),d=parseFloat(n.stockInfResponseDto.prdy_ctrt),p=d>0?"▲":"▼",u=Math.abs(parseInt(n.stockInfResponseDto.prdy_vrss,10)).toLocaleString(),x=parseInt(n.stockInfResponseDto.acml_vol,10).toLocaleString(),j={...me}[s]||fe;return t.jsx(fo,{children:i?t.jsxs("div",{className:"mainContent",children:[t.jsxs(yo,{$priceChangeRate:d,children:[t.jsx("img",{className:"CorpLogo",src:j,alt:"stock logo"}),t.jsxs("div",{className:"NameContainer",children:[t.jsxs("div",{className:"StockCode",children:[c," | ",mo]}),t.jsx("div",{className:"CorpName",children:s})]}),t.jsx("div",{className:"StockPrice",children:a}),t.jsxs("div",{className:"PriceChangeAmount",children:[t.jsx("div",{className:"changeDirection",children:p}),u]}),t.jsxs("div",{className:"TransactionVolume ",children:[t.jsxs("div",{className:"PriceChangeRate",children:[d,"%"]}),t.jsxs(bo,{children:[x,"주"]})]})]}),t.jsx(ko,{children:t.jsx(ro,{corpName:s})})]}):t.jsx(ho,{})})},fo=l.aside`
    z-index: 1;
    transition: right 0.3s ease-in-out;
    display: flex;
    flex-direction: column;
    width: calc(100vw - 20px);
    height: 100%;
    background-color: #ffffff;

    .mainContent {
        height: 100%;
    }

    .ErrorContainer {
        width: 100%;
        height: 80%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 12px;

        .ErrorMessage {
            font-size: 20px;
            color: #999999;
        }

        .ErrorCloseButton {
            width: 35%;
            height: 32px;
            color: white;
            background-color: #2f4f4f;
            border: none;
            border-radius: 0.5rem;
        }
    }
`,yo=l.section`
    border-bottom: 1px solid #ddd;
    width: calc(100vw - 20px);
    height: 64px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-top: 7px;
    padding-bottom: 8px;
    padding-left: 16px;
    gap: 9px;
    justify-content: space-evenly;
    position : fixed;
    background-color: white;
    z-index: 100;

    .CorpLogo {
        width: 28px;
        height: 28px;
        border-radius: 50%;
    }

    .NameContainer {
        height: 40px;
        display: flex;
        flex-direction: column;
    }

    .CorpName {
        font-size: 16px;
        font-weight: 500;
        color: #1c1c1c;
    }

    .StockCode {
        font-size: 12px;
        color: #999999;
    }
    .StockPrice {
        font-size: 19px;
        color: ${e=>e.$priceChangeRate>0?"#ed2926":e.$priceChangeRate===0?"black":"#3177d7"};
        font-weight: 550;
    }
    .PriceChangeRate{
        font-size: 19px;
        color: ${e=>e.$priceChangeRate>0?"#ed2926":e.$priceChangeRate===0?"black":"#3177d7"};
        display: flex;
        flex-direction: row;
        font-weight: 550;
    }
    .PriceChangeAmount {
        font-size: 14px;
        color: ${e=>e.$priceChangeRate>0?"#ed2926":e.$priceChangeRate===0?"black":"#3177d7"};
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
`,bo=l.div`
    white-space: nowrap;
    min-width: min-content;
    font-size: 11px;
    color: #999;
    font-weight: 400;
`,ko=l.div`
    margin-top: 64px;
    padding-bottom: 130px;
`;function Vo(){const{companyId:e}=A();return t.jsx(go,{companyId:Number(e)})}export{Vo as default};
//# sourceMappingURL=Buy-ClCfJVrd.js.map
