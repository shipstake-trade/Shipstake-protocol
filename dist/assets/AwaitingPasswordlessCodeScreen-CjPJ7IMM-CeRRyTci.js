import{r as n,j as r}from"./router-CbKEWjiJ.js";import{F as re}from"./EnvelopeIcon-B8ZPMO3U.js";import{F as oe}from"./PhoneIcon-Dx4eEkwU.js";import{W as te,r as Q,I as ae,aU as ne,bd as Z,be as E,E as y,bf as ie,u as se,aV as C}from"./wallet-DYCjDBOf.js";import{o as le}from"./Layouts-BlFm53ED-C1Uan3AP.js";import{n as ce}from"./Link-DJ5gq9Di-DYuI41_Q.js";import{a as de}from"./shouldProceedtoEmbeddedWalletCreationFlow-BkTDxfME-BZSubH65.js";import{n as ue}from"./ScreenLayout-BdRrZJd_-CLAXixsN.js";import"./ModalHeader-DfHxv9fE-BGuhfFWF.js";import"./Screen-CDEd4p2a-Djmdz_JD.js";import"./index-Dq_xe9dz-Rs89xlGq.js";function pe({title:o,titleId:m,...A},v){return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:v,"aria-labelledby":m},A),o?n.createElement("title",{id:m},o):null,n.createElement("path",{fillRule:"evenodd",d:"M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z",clipRule:"evenodd"}))}const fe=n.forwardRef(pe),me=({contactMethod:o,authFlow:m,appName:A="Privy",whatsAppEnabled:v=!1,onBack:j,onCodeSubmit:i,onResend:M,errorMessage:h,success:S=!1,resendCountdown:T=0,onInvalidInput:N,onClearError:x})=>{let[g,b]=n.useState(J);n.useEffect((()=>{h||b(J)}),[h]);let L=async c=>{var w;c.preventDefault();let s=c.currentTarget.value.replace(" ","");if(s==="")return;if(isNaN(Number(s)))return void(N==null?void 0:N("Code should be numeric"));x==null||x();let d=Number((w=c.currentTarget.name)==null?void 0:w.charAt(5)),u=[...s||[""]].slice(0,G-d),l=[...g.slice(0,d),...u,...g.slice(d+u.length)];b(l);let p=Math.min(Math.max(d+u.length,0),G-1);if(!isNaN(Number(c.currentTarget.value))){let t=document.querySelector(`input[name=code-${p}]`);t==null||t.focus()}if(l.every((t=>t&&!isNaN(+t)))){let t=document.querySelector(`input[name=code-${p}]`);t==null||t.blur(),await(i==null?void 0:i(l.join("")))}};return r.jsx(ue,{title:"Enter confirmation code",subtitle:r.jsxs("span",m==="email"?{children:["Please check ",r.jsx(ee,{children:o})," for an email from privy.io and enter your code below."]}:{children:["Please check ",r.jsx(ee,{children:o})," for a",v?" WhatsApp":""," message from ",A," and enter your code below."]}),icon:m==="email"?re:oe,onBack:j,showBack:!0,helpText:r.jsxs(ye,{children:[r.jsxs("span",{children:["Didn't get ",m==="email"?"an email":"a message","?"]}),T?r.jsxs(be,{children:[r.jsx(fe,{color:"var(--privy-color-foreground)",strokeWidth:1.33,height:"12px",width:"12px"}),r.jsx("span",{children:"Code sent"})]}):r.jsx(ce,{as:"button",size:"sm",onClick:M,children:"Resend code"})]}),children:r.jsx(xe,{children:r.jsx(le,{children:r.jsxs(ge,{children:[r.jsx("div",{children:g.map(((c,s)=>r.jsx("input",{name:`code-${s}`,type:"text",value:g[s],onChange:L,onKeyUp:d=>{d.key==="Backspace"&&(u=>{if(x==null||x(),b([...g.slice(0,u),"",...g.slice(u+1)]),u>0){let l=document.querySelector(`input[name=code-${u-1}]`);l==null||l.focus()}})(s)},inputMode:"numeric",autoFocus:s===0,pattern:"[0-9]",className:`${S?"success":""} ${h?"fail":""}`,autoComplete:se.isMobile?"one-time-code":"off"},s)))}),r.jsx(Ee,{$fail:!!h,$success:S,children:r.jsx("span",{children:h==="Invalid or expired verification code"?"Incorrect code":h||(S?"Success!":"")})})]})})})})};let G=6,J=Array(6).fill("");var _,R,ve=((_=ve||{})[_.RESET_AFTER_DELAY=0]="RESET_AFTER_DELAY",_[_.CLEAR_ON_NEXT_VALID_INPUT=1]="CLEAR_ON_NEXT_VALID_INPUT",_),he=((R=he||{})[R.EMAIL=0]="EMAIL",R[R.SMS=1]="SMS",R);const Me={component:()=>{var F,U,P;let{navigate:o,lastScreen:m,navigateBack:A,setModalData:v,onUserCloseViaDialogOrKeybindRef:j}=te(),i=Q(),{closePrivyModal:M,resendEmailCode:h,resendSmsCode:S,getAuthMeta:T,loginWithCode:N,updateWallets:x,createAnalyticsEvent:g}=ae(),{authenticated:b,logout:L,user:c}=ne(),{whatsAppEnabled:s}=Q(),[d,u]=n.useState(!1),[l,p]=n.useState(null),[w,t]=n.useState(null),[k,$]=n.useState(0);j.current=()=>null;let I=(F=T())!=null&&F.email?0:1,O=I===0?((U=T())==null?void 0:U.email)||"":((P=T())==null?void 0:P.phoneNumber)||"",D=Z-500;return n.useEffect((()=>{if(k){let a=setTimeout((()=>{$(k-1)}),1e3);return()=>clearTimeout(a)}}),[k]),n.useEffect((()=>{if(b&&d&&c){if(i!=null&&i.legal.requireUsersAcceptTerms&&!c.hasAcceptedTerms){let a=setTimeout((()=>{o("AffirmativeConsentScreen")}),D);return()=>clearTimeout(a)}if(de(c,i.embeddedWallets)){let a=setTimeout((()=>{v({createWallet:{onSuccess:()=>{},onFailure:f=>{console.error(f),g({eventName:"embedded_wallet_creation_failure_logout",payload:{error:f,screen:"AwaitingPasswordlessCodeScreen"}}),L()},callAuthOnSuccessOnClose:!0}}),o("EmbeddedWalletOnAccountCreateScreen")}),D);return()=>clearTimeout(a)}{x();let a=setTimeout((()=>M({shouldCallAuthOnSuccess:!0,isSuccess:!0})),Z);return()=>clearTimeout(a)}}}),[b,d,c]),n.useEffect((()=>{if(l&&w===0){let a=setTimeout((()=>{p(null),t(null);let f=document.querySelector("input[name=code-0]");f==null||f.focus()}),1400);return()=>clearTimeout(a)}}),[l,w]),r.jsx(me,{contactMethod:O,authFlow:I===0?"email":"sms",appName:i==null?void 0:i.name,whatsAppEnabled:s,onBack:()=>A(),onCodeSubmit:async a=>{var f,W,B,V,q,K,z,X,Y,H;try{await N(a),u(!0)}catch(e){if(e instanceof E&&e.privyErrorCode===y.INVALID_CREDENTIALS)p("Invalid or expired verification code"),t(0);else if(e instanceof E&&e.privyErrorCode===y.CANNOT_LINK_MORE_OF_TYPE)p(e.message);else{if(e instanceof E&&e.privyErrorCode===y.USER_LIMIT_REACHED)return console.error(new ie(e).toString()),void o("UserLimitReachedScreen");if(e instanceof E&&e.privyErrorCode===y.USER_DOES_NOT_EXIST)return void o("AccountNotFoundScreen");if(e instanceof E&&e.privyErrorCode===y.LINKED_TO_ANOTHER_USER)return v({errorModalData:{error:e,previousScreen:m??"AwaitingPasswordlessCodeScreen"}}),void o("ErrorScreen",!1);if(e instanceof E&&e.privyErrorCode===y.DISALLOWED_PLUS_EMAIL)return v({inlineError:{error:e}}),void o("ConnectOrCreateScreen",!1);if(e instanceof E&&e.privyErrorCode===y.ACCOUNT_TRANSFER_REQUIRED&&((W=(f=e.data)==null?void 0:f.data)!=null&&W.nonce))return v({accountTransfer:{nonce:(V=(B=e.data)==null?void 0:B.data)==null?void 0:V.nonce,account:O,displayName:(z=(K=(q=e.data)==null?void 0:q.data)==null?void 0:K.account)==null?void 0:z.displayName,linkMethod:I===0?"email":"sms",embeddedWalletAddress:(H=(Y=(X=e.data)==null?void 0:X.data)==null?void 0:Y.otherUser)==null?void 0:H.embeddedWalletAddress}}),void o("LinkConflictScreen");p("Issue verifying code"),t(0)}}},onResend:async()=>{$(30),I===0?await h():await S()},errorMessage:l||void 0,success:d,resendCountdown:k,onInvalidInput:a=>{p(a),t(1)},onClearError:()=>{w===1&&(p(null),t(null))}})}};let xe=C.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  gap: 16px;
  flex-grow: 1;
  width: 100%;
`,ge=C.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;

  > div:first-child {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    border-radius: var(--privy-border-radius-sm);

    > input {
      border: 1px solid var(--privy-color-foreground-4);
      background: var(--privy-color-background);
      border-radius: var(--privy-border-radius-sm);
      padding: 8px 10px;
      height: 48px;
      width: 40px;
      text-align: center;
      font-size: 18px;
      font-weight: 600;
      color: var(--privy-color-foreground);
      transition: all 0.2s ease;
    }

    > input:focus {
      border: 1px solid var(--privy-color-foreground);
      box-shadow: 0 0 0 1px var(--privy-color-foreground);
    }

    > input:invalid {
      border: 1px solid var(--privy-color-error);
    }

    > input.success {
      border: 1px solid var(--privy-color-border-success);
      background: var(--privy-color-success-bg);
    }

    > input.fail {
      border: 1px solid var(--privy-color-border-error);
      background: var(--privy-color-error-bg);
      animation: shake 180ms;
      animation-iteration-count: 2;
    }
  }

  @keyframes shake {
    0% {
      transform: translate(1px, 0px);
    }
    33% {
      transform: translate(-1px, 0px);
    }
    67% {
      transform: translate(-1px, 0px);
    }
    100% {
      transform: translate(1px, 0px);
    }
  }
`,Ee=C.div`
  line-height: 20px;
  min-height: 20px;
  font-size: 14px;
  font-weight: 400;
  color: ${o=>o.$success?"var(--privy-color-success-dark)":o.$fail?"var(--privy-color-error-dark)":"transparent"};
  display: flex;
  justify-content: center;
  width: 100%;
  text-align: center;
`,ye=C.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: var(--privy-color-foreground-2);
`,be=C.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--privy-border-radius-sm);
  padding: 2px 8px;
  gap: 4px;
  background: var(--privy-color-background-2);
  color: var(--privy-color-foreground-2);
`,ee=C.span`
  font-weight: 500;
  word-break: break-all;
  color: var(--privy-color-foreground);
`;export{Me as AwaitingPasswordlessCodeScreen,me as AwaitingPasswordlessCodeScreenView,Me as default};
