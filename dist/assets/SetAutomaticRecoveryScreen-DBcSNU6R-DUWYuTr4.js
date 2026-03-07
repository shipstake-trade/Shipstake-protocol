import{r as u,j as e}from"./router-CbKEWjiJ.js";import{F}from"./ExclamationTriangleIcon-mSh7HDQ5.js";import{F as R}from"./LockClosedIcon-ByzUmCT7.js";import{aU as W,I as P,W as A,cc as v,f as j,bd as M,aV as V}from"./wallet-DYCjDBOf.js";import{T as S,k as b,u as $}from"./ModalHeader-DfHxv9fE-BGuhfFWF.js";import{r as H}from"./Subtitle-CV-2yKE4-Dsk09iCI.js";import{e as I}from"./Title-BnzYV3Is-DxAyNnQt.js";const D=V.div`
  && {
    border-width: 4px;
  }

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  aspect-ratio: 1;
  border-style: solid;
  border-color: ${i=>i.$color??"var(--privy-color-accent)"};
  border-radius: 50%;
`,J={component:()=>{var g;let{user:i}=W(),{client:T,walletProxy:m,refreshSessionAndUser:U,closePrivyModal:l}=P(),s=A(),{entropyId:f,entropyIdVerifier:k}=(g=s.data)==null?void 0:g.recoverWallet,[n,h]=u.useState(!1),[c,C]=u.useState(null),[d,p]=u.useState(null);function y(){var r,o,t,a;if(!n){if(d)return(o=(r=s.data)==null?void 0:r.setWalletPassword)==null||o.onFailure(d),void l();if(!c)return(a=(t=s.data)==null?void 0:t.setWalletPassword)==null||a.onFailure(Error("User exited set recovery flow")),void l()}}s.onUserCloseViaDialogOrKeybindRef.current=y;let E=!(!n&&!c);return e.jsxs(e.Fragment,d?{children:[e.jsx(S,{onClose:y},"header"),e.jsx(D,{$color:"var(--privy-color-error)",style:{alignSelf:"center"},children:e.jsx(F,{height:38,width:38,stroke:"var(--privy-color-error)"})}),e.jsx(I,{style:{marginTop:"0.5rem"},children:"Something went wrong"}),e.jsx(v,{style:{minHeight:"2rem"}}),e.jsx(b,{onClick:()=>p(null),children:"Try again"}),e.jsx($,{})]}:{children:[e.jsx(S,{onClose:y},"header"),e.jsx(R,{style:{width:"3rem",height:"3rem",alignSelf:"center"}}),e.jsx(I,{style:{marginTop:"0.5rem"},children:"Automatically secure your account"}),e.jsx(H,{style:{marginTop:"1rem"},children:"When you log into a new device, you’ll only need to authenticate to access your account. Never get logged out if you forget your password."}),e.jsx(v,{style:{minHeight:"2rem"}}),e.jsx(b,{loading:n,disabled:E,onClick:()=>(async function(){h(!0);try{let r=await T.getAccessToken(),o=j(i,f);if(!r||!m||!o)return;if(!(await m.setRecovery({accessToken:r,entropyId:f,entropyIdVerifier:k,existingRecoveryMethod:o.recoveryMethod,recoveryMethod:"privy"})).entropyId)throw Error("Unable to set recovery on wallet");let t=await U();if(!t)throw Error("Unable to set recovery on wallet");let a=j(t,o.address);if(!a)throw Error("Unabled to set recovery on wallet");C(!!t),setTimeout((()=>{var w,x;(x=(w=s.data)==null?void 0:w.setWalletPassword)==null||x.onSuccess(a),l()}),M)}catch(r){p(r)}finally{h(!1)}})(),children:c?"Success":"Confirm"}),e.jsx($,{})]})}};export{J as SetAutomaticRecoveryScreen,J as default};
