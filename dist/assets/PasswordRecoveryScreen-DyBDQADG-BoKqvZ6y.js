import{r as a,j as e}from"./router-CbKEWjiJ.js";import{F as $}from"./ShieldCheckIcon-RbrwCKNi.js";import{aU as T,I as _,W as E,f as U,dm as W,cA as F,aV as p,bC as V}from"./wallet-DYCjDBOf.js";import{m as N}from"./ModalHeader-DfHxv9fE-BGuhfFWF.js";import{l as O}from"./Layouts-BlFm53ED-C1Uan3AP.js";import{g as H,h as z,u as M,b as B,k as D}from"./shared-Bw0pXSOO-CIisXXr9.js";import{w as s}from"./Screen-CDEd4p2a-Djmdz_JD.js";import"./index-Dq_xe9dz-Rs89xlGq.js";const te={component:()=>{let[o,m]=a.useState(!0),{authenticated:y,user:g}=T(),{walletProxy:i,closePrivyModal:v,createAnalyticsEvent:x,client:j}=_(),{navigate:k,data:A,onUserCloseViaDialogOrKeybindRef:C}=E(),[l,I]=a.useState(void 0),[f,d]=a.useState(""),[c,w]=a.useState(!1),{entropyId:u,entropyIdVerifier:S,onCompleteNavigateTo:b,onSuccess:h,onFailure:P}=A.recoverWallet,n=(r="User exited before their wallet could be recovered")=>{v({shouldCallAuthOnSuccess:!1}),P(typeof r=="string"?new F(r):r)};return C.current=n,a.useEffect((()=>{if(!y)return n("User must be authenticated and have a Privy wallet before it can be recovered")}),[y]),e.jsxs(s,{children:[e.jsx(s.Header,{icon:$,title:"Enter your password",subtitle:"Please provision your account on this new device. To continue, enter your recovery password.",showClose:!0,onClose:n}),e.jsx(s.Body,{children:e.jsx(K,{children:e.jsxs("div",{children:[e.jsxs(H,{children:[e.jsx(z,{type:o?"password":"text",onChange:r=>(t=>{t&&I(t)})(r.target.value),disabled:c,style:{paddingRight:"2.3rem"}}),e.jsx(M,{style:{right:"0.75rem"},children:o?e.jsx(B,{onClick:()=>m(!1)}):e.jsx(D,{onClick:()=>m(!0)})})]}),!!f&&e.jsx(L,{children:f})]})})}),e.jsxs(s.Footer,{children:[e.jsx(s.HelpText,{children:e.jsxs(O,{children:[e.jsx("h4",{children:"Why is this necessary?"}),e.jsx("p",{children:"You previously set a password for this wallet. This helps ensure only you can access it"})]})}),e.jsx(s.Actions,{children:e.jsx(Y,{loading:c||!i,disabled:!l,onClick:async()=>{w(!0);let r=await j.getAccessToken(),t=U(g,u);if(!r||!t||l===null)return n("User must be authenticated and have a Privy wallet before it can be recovered");try{x({eventName:"embedded_wallet_recovery_started",payload:{walletAddress:t.address}}),await(i==null?void 0:i.recover({accessToken:r,entropyId:u,entropyIdVerifier:S,recoveryPassword:l})),d(""),b?k(b):v({shouldCallAuthOnSuccess:!1}),h==null||h(t),x({eventName:"embedded_wallet_recovery_completed",payload:{walletAddress:t.address}})}catch(R){W(R)?d("Invalid recovery password, please try again."):d("An error has occurred, please try again.")}finally{w(!1)}},$hideAnimations:!u&&c,children:"Recover your account"})}),e.jsx(s.Watermark,{})]})]})}};let K=p.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`,L=p.div`
  line-height: 20px;
  height: 20px;
  font-size: 13px;
  color: var(--privy-color-error);
  text-align: left;
  margin-top: 0.5rem;
`,Y=p(N)`
  ${({$hideAnimations:o})=>o&&V`
      && {
        // Remove animations because the recoverWallet task on the iframe partially
        // blocks the renderer, so the animation stutters and doesn't look good
        transition: none;
      }
    `}
`;export{te as PasswordRecoveryScreen,te as default};
