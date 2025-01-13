import{_ as w,d as H,u as Z,B as S,j as d}from"./index-BYRxBMX6.js";import{R as m,g as A,b as h,u as K}from"./vendor-BJTqHD0O.js";import{m as tt,d as v}from"./styled-components.browser.esm-Ds5_C6nt.js";import{c as F}from"./content-C3Cgojep.js";import{f as et}from"./index-BUmq1CZ1.js";import{u as nt}from"./useCustomCash-B71rFefH.js";import"./utils-CJA6l5lt.js";function _(r,a){return _=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(l,e){return l.__proto__=e,l},_(r,a)}function $(r,a){r.prototype=Object.create(a.prototype),r.prototype.constructor=r,_(r,a)}function rt(r,a){return r.classList?!!a&&r.classList.contains(a):(" "+(r.className.baseVal||r.className)+" ").indexOf(" "+a+" ")!==-1}function st(r,a){r.classList?r.classList.add(a):rt(r,a)||(typeof r.className=="string"?r.className=r.className+" "+a:r.setAttribute("class",(r.className&&r.className.baseVal||"")+" "+a))}function G(r,a){return r.replace(new RegExp("(^|\\s)"+a+"(?:\\s|$)","g"),"$1").replace(/\s+/g," ").replace(/^\s*|\s*$/g,"")}function it(r,a){r.classList?r.classList.remove(a):typeof r.className=="string"?r.className=G(r.className,a):r.setAttribute("class",G(r.className&&r.className.baseVal||"",a))}const B={disabled:!1},D=m.createContext(null);var q=function(a){return a.scrollTop},T="unmounted",g="exited",C="entering",j="entered",L="exiting",E=function(r){$(a,r);function a(e,n){var t;t=r.call(this,e,n)||this;var s=n,i=s&&!s.isMounting?e.enter:e.appear,o;return t.appearStatus=null,e.in?i?(o=g,t.appearStatus=C):o=j:e.unmountOnExit||e.mountOnEnter?o=T:o=g,t.state={status:o},t.nextCallback=null,t}a.getDerivedStateFromProps=function(n,t){var s=n.in;return s&&t.status===T?{status:g}:null};var l=a.prototype;return l.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},l.componentDidUpdate=function(n){var t=null;if(n!==this.props){var s=this.state.status;this.props.in?s!==C&&s!==j&&(t=C):(s===C||s===j)&&(t=L)}this.updateStatus(!1,t)},l.componentWillUnmount=function(){this.cancelNextCallback()},l.getTimeouts=function(){var n=this.props.timeout,t,s,i;return t=s=i=n,n!=null&&typeof n!="number"&&(t=n.exit,s=n.enter,i=n.appear!==void 0?n.appear:s),{exit:t,enter:s,appear:i}},l.updateStatus=function(n,t){if(n===void 0&&(n=!1),t!==null)if(this.cancelNextCallback(),t===C){if(this.props.unmountOnExit||this.props.mountOnEnter){var s=this.props.nodeRef?this.props.nodeRef.current:A.findDOMNode(this);s&&q(s)}this.performEnter(n)}else this.performExit();else this.props.unmountOnExit&&this.state.status===g&&this.setState({status:T})},l.performEnter=function(n){var t=this,s=this.props.enter,i=this.context?this.context.isMounting:n,o=this.props.nodeRef?[i]:[A.findDOMNode(this),i],c=o[0],u=o[1],f=this.getTimeouts(),x=i?f.appear:f.enter;if(!n&&!s||B.disabled){this.safeSetState({status:j},function(){t.props.onEntered(c)});return}this.props.onEnter(c,u),this.safeSetState({status:C},function(){t.props.onEntering(c,u),t.onTransitionEnd(x,function(){t.safeSetState({status:j},function(){t.props.onEntered(c,u)})})})},l.performExit=function(){var n=this,t=this.props.exit,s=this.getTimeouts(),i=this.props.nodeRef?void 0:A.findDOMNode(this);if(!t||B.disabled){this.safeSetState({status:g},function(){n.props.onExited(i)});return}this.props.onExit(i),this.safeSetState({status:L},function(){n.props.onExiting(i),n.onTransitionEnd(s.exit,function(){n.safeSetState({status:g},function(){n.props.onExited(i)})})})},l.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},l.safeSetState=function(n,t){t=this.setNextCallback(t),this.setState(n,t)},l.setNextCallback=function(n){var t=this,s=!0;return this.nextCallback=function(i){s&&(s=!1,t.nextCallback=null,n(i))},this.nextCallback.cancel=function(){s=!1},this.nextCallback},l.onTransitionEnd=function(n,t){this.setNextCallback(t);var s=this.props.nodeRef?this.props.nodeRef.current:A.findDOMNode(this),i=n==null&&!this.props.addEndListener;if(!s||i){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var o=this.props.nodeRef?[this.nextCallback]:[s,this.nextCallback],c=o[0],u=o[1];this.props.addEndListener(c,u)}n!=null&&setTimeout(this.nextCallback,n)},l.render=function(){var n=this.state.status;if(n===T)return null;var t=this.props,s=t.children;t.in,t.mountOnEnter,t.unmountOnExit,t.appear,t.enter,t.exit,t.timeout,t.addEndListener,t.onEnter,t.onEntering,t.onEntered,t.onExit,t.onExiting,t.onExited,t.nodeRef;var i=w(t,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return m.createElement(D.Provider,{value:null},typeof s=="function"?s(n,i):m.cloneElement(m.Children.only(s),i))},a}(m.Component);E.contextType=D;E.propTypes={};function N(){}E.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:N,onEntering:N,onEntered:N,onExit:N,onExiting:N,onExited:N};E.UNMOUNTED=T;E.EXITED=g;E.ENTERING=C;E.ENTERED=j;E.EXITING=L;var at=function(a,l){return a&&l&&l.split(" ").forEach(function(e){return st(a,e)})},M=function(a,l){return a&&l&&l.split(" ").forEach(function(e){return it(a,e)})},P=function(r){$(a,r);function a(){for(var e,n=arguments.length,t=new Array(n),s=0;s<n;s++)t[s]=arguments[s];return e=r.call.apply(r,[this].concat(t))||this,e.appliedClasses={appear:{},enter:{},exit:{}},e.onEnter=function(i,o){var c=e.resolveArguments(i,o),u=c[0],f=c[1];e.removeClasses(u,"exit"),e.addClass(u,f?"appear":"enter","base"),e.props.onEnter&&e.props.onEnter(i,o)},e.onEntering=function(i,o){var c=e.resolveArguments(i,o),u=c[0],f=c[1],x=f?"appear":"enter";e.addClass(u,x,"active"),e.props.onEntering&&e.props.onEntering(i,o)},e.onEntered=function(i,o){var c=e.resolveArguments(i,o),u=c[0],f=c[1],x=f?"appear":"enter";e.removeClasses(u,x),e.addClass(u,x,"done"),e.props.onEntered&&e.props.onEntered(i,o)},e.onExit=function(i){var o=e.resolveArguments(i),c=o[0];e.removeClasses(c,"appear"),e.removeClasses(c,"enter"),e.addClass(c,"exit","base"),e.props.onExit&&e.props.onExit(i)},e.onExiting=function(i){var o=e.resolveArguments(i),c=o[0];e.addClass(c,"exit","active"),e.props.onExiting&&e.props.onExiting(i)},e.onExited=function(i){var o=e.resolveArguments(i),c=o[0];e.removeClasses(c,"exit"),e.addClass(c,"exit","done"),e.props.onExited&&e.props.onExited(i)},e.resolveArguments=function(i,o){return e.props.nodeRef?[e.props.nodeRef.current,i]:[i,o]},e.getClassNames=function(i){var o=e.props.classNames,c=typeof o=="string",u=c&&o?o+"-":"",f=c?""+u+i:o[i],x=c?f+"-active":o[i+"Active"],O=c?f+"-done":o[i+"Done"];return{baseClassName:f,activeClassName:x,doneClassName:O}},e}var l=a.prototype;return l.addClass=function(n,t,s){var i=this.getClassNames(t)[s+"ClassName"],o=this.getClassNames("enter"),c=o.doneClassName;t==="appear"&&s==="done"&&c&&(i+=" "+c),s==="active"&&n&&q(n),i&&(this.appliedClasses[t][s]=i,at(n,i))},l.removeClasses=function(n,t){var s=this.appliedClasses[t],i=s.base,o=s.active,c=s.done;this.appliedClasses[t]={},i&&M(n,i),o&&M(n,o),c&&M(n,c)},l.render=function(){var n=this.props;n.classNames;var t=w(n,["classNames"]);return m.createElement(E,H({},t,{onEnter:this.onEnter,onEntered:this.onEntered,onEntering:this.onEntering,onExit:this.onExit,onExiting:this.onExiting,onExited:this.onExited}))},a}(m.Component);P.defaultProps={classNames:""};P.propTypes={};function ot(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function V(r,a){var l=function(t){return a&&h.isValidElement(t)?a(t):t},e=Object.create(null);return r&&h.Children.map(r,function(n){return n}).forEach(function(n){e[n.key]=l(n)}),e}function lt(r,a){r=r||{},a=a||{};function l(u){return u in a?a[u]:r[u]}var e=Object.create(null),n=[];for(var t in r)t in a?n.length&&(e[t]=n,n=[]):n.push(t);var s,i={};for(var o in a){if(e[o])for(s=0;s<e[o].length;s++){var c=e[o][s];i[e[o][s]]=l(c)}i[o]=l(o)}for(s=0;s<n.length;s++)i[n[s]]=l(n[s]);return i}function b(r,a,l){return l[a]!=null?l[a]:r.props[a]}function ct(r,a){return V(r.children,function(l){return h.cloneElement(l,{onExited:a.bind(null,l),in:!0,appear:b(l,"appear",r),enter:b(l,"enter",r),exit:b(l,"exit",r)})})}function ut(r,a,l){var e=V(r.children),n=lt(a,e);return Object.keys(n).forEach(function(t){var s=n[t];if(h.isValidElement(s)){var i=t in a,o=t in e,c=a[t],u=h.isValidElement(c)&&!c.props.in;o&&(!i||u)?n[t]=h.cloneElement(s,{onExited:l.bind(null,s),in:!0,exit:b(s,"exit",r),enter:b(s,"enter",r)}):!o&&i&&!u?n[t]=h.cloneElement(s,{in:!1}):o&&i&&h.isValidElement(c)&&(n[t]=h.cloneElement(s,{onExited:l.bind(null,s),in:c.props.in,exit:b(s,"exit",r),enter:b(s,"enter",r)}))}}),n}var dt=Object.values||function(r){return Object.keys(r).map(function(a){return r[a]})},pt={component:"div",childFactory:function(a){return a}},U=function(r){$(a,r);function a(e,n){var t;t=r.call(this,e,n)||this;var s=t.handleExited.bind(ot(t));return t.state={contextValue:{isMounting:!0},handleExited:s,firstRender:!0},t}var l=a.prototype;return l.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},l.componentWillUnmount=function(){this.mounted=!1},a.getDerivedStateFromProps=function(n,t){var s=t.children,i=t.handleExited,o=t.firstRender;return{children:o?ct(n,i):ut(n,s,i),firstRender:!1}},l.handleExited=function(n,t){var s=V(this.props.children);n.key in s||(n.props.onExited&&n.props.onExited(t),this.mounted&&this.setState(function(i){var o=H({},i.children);return delete o[n.key],{children:o}}))},l.render=function(){var n=this.props,t=n.component,s=n.childFactory,i=w(n,["component","childFactory"]),o=this.state.contextValue,c=dt(this.state.children).map(s);return delete i.appear,delete i.enter,delete i.exit,t===null?m.createElement(D.Provider,{value:o},c):m.createElement(D.Provider,{value:o},m.createElement(t,i,c))},a}(m.Component);U.propTypes={};U.defaultProps=pt;const ft=()=>{const{cashState:r,doCreateCash:a,doGetCashList:l,doDeleteCash:e,doUpdateCashId:n}=nt(),[t,s]=h.useState((r==null?void 0:r.cashList)||[]),[i,o]=h.useState((r==null?void 0:r.cashId)||0),{loginState:c}=Z(),u=c.memberId,f=K();h.useEffect(()=>{c.email&&l(u).catch(p=>{S.error("계좌 정보를 가져오는 중 오류가 발생했습니다",p)})},[c.email]),h.useEffect(()=>{s(r.cashList),o(r.cashId)},[r]);const x=p=>{e(p).then(()=>{S.success("계좌가 삭제되었습니다")}).catch(I=>{S.error("계좌 삭제에 실패했습니다",I)})},O=()=>{a(u).then(()=>{S.success("새 계좌가 생성되었습니다")}).catch(p=>{S.error("계좌 생성 중 오류가 발생했습니다",p)})},J=p=>{n(p)},Q=p=>{f(`../charge/${p}`)},Y=p=>{f(`../exchange/${p}`)};return!t||t.length===0?d.jsxs(W,{children:[d.jsx(z,{onClick:O,children:"계좌 추가"}),d.jsx(F,{})]}):d.jsxs(W,{children:[d.jsx(U,{children:t.map((p,I)=>d.jsx(P,{timeout:3e3,classNames:"fade",children:d.jsxs(mt,{$active:p.cashId===i,onClick:()=>J(p.cashId),children:[d.jsxs(R,{children:[d.jsx(k,{children:"계좌번호:"}),d.jsx(y,{children:p.accountNumber})]}),d.jsxs(R,{children:[d.jsx(k,{children:"원화량:"}),d.jsxs(y,{children:[p.money,"원"]})]}),d.jsxs(R,{children:[d.jsx(k,{children:"외화량:"}),d.jsxs(y,{children:[p.dollar,"달러"]})]}),d.jsxs(xt,{children:[d.jsx(X,{onClick:()=>Y(p.cashId),children:"환전"}),d.jsx(X,{onClick:()=>Q(p.cashId),children:"충전"}),d.jsx(vt,{onClick:()=>x(p.cashId),children:d.jsx(et,{})})]})]})},I))}),d.jsx(z,{onClick:O,children:"계좌 추가"}),d.jsx(F,{})]})},ht=tt`
    from {
        opacity: 0;
        transform: scale(0.9);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
`,W=v.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
  
    .fade-enter {
        opacity: 0;
        transform: scale(0.9);
    }
    .fade-enter-active {
        opacity: 1;
        transform: scale(1);
        transition: opacity 3000ms, transform 3000ms;
    }
    .fade-exit {
        opacity: 1;
        transform: scale(1);
    }
    .fade-exit-active {
        opacity: 0;
        transform: scale(0.9);
        transition: opacity 3000ms, transform 3000ms;
    }
`,mt=v.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid ${({$active:r})=>r?"#83b9f4":"#ccc"};
    padding: 10px;
    margin: 10px;
    width: 100%;
    border-radius: 5px;
    animation: ${ht} 3s;
    cursor: pointer; // 클릭 가능한 영역 표시
`,R=v.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 5px 0;
`,k=v.div`
    font-weight: bold;
    margin-right: 10px;
`,y=v.div`
    margin-left: auto;
`,xt=v.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`,X=v.button`
    height: 40px;
    width: 40%;
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
`,vt=v.button`
    width: 40px;
    margin: 5px;
    padding: 5px;
    border: 2px solid red;
    color: red;
    cursor: pointer;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        background-color: red;
        color: white;
    }
`,z=v.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    margin: 10px;
    width: 300px;
    border-radius: 5px;
    border: 2px solid #0056b3;
    color: #0056b3;
    cursor: pointer;
`,Tt=()=>d.jsx(ft,{});export{Tt as default};
//# sourceMappingURL=Manage-DGRw1Luq.js.map
