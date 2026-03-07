import{r as l,j as t}from"./router-CbKEWjiJ.js";import{aU as Y,W as G,r as Z,I as ee,E as u,bf as re,bd as F,u as I,bv as te,aV as s}from"./wallet-DYCjDBOf.js";import{n as ae}from"./OpenLink-DZHy38vr-DgrcCRwb.js";import{C as ie}from"./QrCode-D4XZQrgi-D-F2GuMT.js";import{$ as oe}from"./ModalHeader-DfHxv9fE-BGuhfFWF.js";import{r as se}from"./LabelXs-oqZNqbm_-DjzkEJ5M.js";import{a as ne}from"./shouldProceedtoEmbeddedWalletCreationFlow-BkTDxfME-BZSubH65.js";import{n as le}from"./ScreenLayout-BdRrZJd_-CLAXixsN.js";import{l as O}from"./farcaster-DPlSjvF5-JuE6wLOe.js";import{C as ce}from"./check-3cyqHA2u.js";import{C as de}from"./copy-nfTRcL-F.js";import"./dijkstra-COg3n3zL.js";import"./Screen-CDEd4p2a-Djmdz_JD.js";import"./index-Dq_xe9dz-Rs89xlGq.js";import"./createLucideIcon-BLKKXUY_.js";let ue=s.div`
  width: 100%;
`,pe=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.75rem;
  height: 56px;
  background: ${r=>r.$disabled?"var(--privy-color-background-2)":"var(--privy-color-background)"};
  border: 1px solid var(--privy-color-foreground-4);
  border-radius: var(--privy-border-radius-md);

  &:hover {
    border-color: ${r=>r.$disabled?"var(--privy-color-foreground-4)":"var(--privy-color-foreground-3)"};
  }
`,me=s.div`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
`,Q=s.span`
  display: block;
  font-size: 16px;
  line-height: 24px;
  color: ${r=>r.$disabled?"var(--privy-color-foreground-2)":"var(--privy-color-foreground)"};
  overflow: hidden;
  text-overflow: ellipsis;
  /* Use single-line truncation without nowrap to respect container width */
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: break-all;

  @media (min-width: 441px) {
    font-size: 14px;
    line-height: 20px;
  }
`,he=s(Q)`
  color: var(--privy-color-foreground-3);
  font-style: italic;
`,fe=s(se)`
  margin-bottom: 0.5rem;
`,ge=s(oe)`
  && {
    gap: 0.375rem;
    font-size: 14px;
    flex-shrink: 0;
  }
`;const ve=({value:r,title:p,placeholder:c,className:a,showCopyButton:d=!0,truncate:o,maxLength:m=40,disabled:h=!1})=>{let[n,x]=l.useState(!1),w=o&&r?((i,E,f)=>{if((i=i.startsWith("https://")?i.slice(8):i).length<=f)return i;if(E==="middle"){let y=Math.ceil(f/2)-2,C=Math.floor(f/2)-1;return`${i.slice(0,y)}...${i.slice(-C)}`}return`${i.slice(0,f-3)}...`})(r,o,m):r;return l.useEffect((()=>{if(n){let i=setTimeout((()=>x(!1)),3e3);return()=>clearTimeout(i)}}),[n]),t.jsxs(ue,{className:a,children:[p&&t.jsx(fe,{children:p}),t.jsxs(pe,{$disabled:h,children:[t.jsx(me,{children:r?t.jsx(Q,{$disabled:h,title:r,children:w}):t.jsx(he,{$disabled:h,children:c||"No value"})}),d&&r&&t.jsx(ge,{onClick:function(i){i.stopPropagation(),navigator.clipboard.writeText(r).then((()=>x(!0))).catch(console.error)},size:"sm",children:t.jsxs(t.Fragment,n?{children:["Copied",t.jsx(ce,{size:14})]}:{children:["Copy",t.jsx(de,{size:14})]})})]})]})},xe=({connectUri:r,loading:p,success:c,errorMessage:a,onBack:d,onClose:o,onOpenFarcaster:m})=>t.jsx(le,I.isMobile||p?I.isIOS?{title:a?a.message:"Sign in with Farcaster",subtitle:a?a.detail:"To sign in with Farcaster, please open the Farcaster app.",icon:O,iconVariant:"loading",iconLoadingStatus:{success:c,fail:!!a},primaryCta:r&&m?{label:"Open Farcaster app",onClick:m}:void 0,onBack:d,onClose:o,watermark:!0}:{title:a?a.message:"Signing in with Farcaster",subtitle:a?a.detail:"This should only take a moment",icon:O,iconVariant:"loading",iconLoadingStatus:{success:c,fail:!!a},onBack:d,onClose:o,watermark:!0,children:r&&I.isMobile&&t.jsx(ye,{children:t.jsx(ae,{text:"Take me to Farcaster",url:r,color:"#8a63d2"})})}:{title:"Sign in with Farcaster",subtitle:"Scan with your phone's camera to continue.",onBack:d,onClose:o,watermark:!0,children:t.jsxs(be,{children:[t.jsx(Se,{children:r?t.jsx(ie,{url:r,size:275,squareLogoElement:O}):t.jsx(Ce,{children:t.jsx(te,{})})}),t.jsxs(we,{children:[t.jsx(Ee,{children:"Or copy this link and paste it into a phone browser to open the Farcaster app."}),r&&t.jsx(ve,{value:r,truncate:"end",maxLength:30,showCopyButton:!0,disabled:!0})]})]})}),We={component:()=>{let{authenticated:r,logout:p,ready:c,user:a}=Y(),{lastScreen:d,navigate:o,navigateBack:m,setModalData:h}=G(),n=Z(),{getAuthFlow:x,loginWithFarcaster:w,closePrivyModal:i,createAnalyticsEvent:E}=ee(),[f,y]=l.useState(void 0),[C,J]=l.useState(!1),[b,K]=l.useState(!1),T=l.useRef([]),S=x(),j=S==null?void 0:S.meta.connectUri;return l.useEffect((()=>{let g=Date.now(),k=setInterval((async()=>{var $,R,_,L,N,U,M,D,W,z,B,V,q,P,H;let A=await S.pollForReady.execute(),X=Date.now()-g;if(A){clearInterval(k),J(!0);try{await w(),K(!0)}catch(e){let v={retryable:!1,message:"Authentication failed"};if((e==null?void 0:e.privyErrorCode)===u.ALLOWLIST_REJECTED)return void o("AllowlistRejectionScreen");if((e==null?void 0:e.privyErrorCode)===u.USER_LIMIT_REACHED)return console.error(new re(e).toString()),void o("UserLimitReachedScreen");if((e==null?void 0:e.privyErrorCode)===u.USER_DOES_NOT_EXIST)return void o("AccountNotFoundScreen");if((e==null?void 0:e.privyErrorCode)===u.LINKED_TO_ANOTHER_USER)v.detail=e.message??"This account has already been linked to another user.";else{if((e==null?void 0:e.privyErrorCode)===u.ACCOUNT_TRANSFER_REQUIRED&&((R=($=e.data)==null?void 0:$.data)!=null&&R.nonce))return h({accountTransfer:{nonce:(L=(_=e.data)==null?void 0:_.data)==null?void 0:L.nonce,account:(U=(N=e.data)==null?void 0:N.data)==null?void 0:U.subject,displayName:(W=(D=(M=e.data)==null?void 0:M.data)==null?void 0:D.account)==null?void 0:W.displayName,linkMethod:"farcaster",embeddedWalletAddress:(V=(B=(z=e.data)==null?void 0:z.data)==null?void 0:B.otherUser)==null?void 0:V.embeddedWalletAddress,farcasterEmbeddedAddress:(H=(P=(q=e.data)==null?void 0:q.data)==null?void 0:P.otherUser)==null?void 0:H.farcasterEmbeddedAddress}}),void o("LinkConflictScreen");(e==null?void 0:e.privyErrorCode)===u.INVALID_CREDENTIALS?(v.retryable=!0,v.detail="Something went wrong. Try again."):(e==null?void 0:e.privyErrorCode)===u.TOO_MANY_REQUESTS&&(v.detail="Too many requests. Please wait before trying again.")}y(v)}}else X>12e4&&(clearInterval(k),y({retryable:!0,message:"Authentication failed",detail:"The request timed out. Try again."}))}),2e3);return()=>{clearInterval(k),T.current.forEach((A=>clearTimeout(A)))}}),[]),l.useEffect((()=>{if(c&&r&&b&&a){if(n!=null&&n.legal.requireUsersAcceptTerms&&!a.hasAcceptedTerms){let g=setTimeout((()=>{o("AffirmativeConsentScreen")}),F);return()=>clearTimeout(g)}b&&(ne(a,n.embeddedWallets)?T.current.push(setTimeout((()=>{h({createWallet:{onSuccess:()=>{},onFailure:g=>{console.error(g),E({eventName:"embedded_wallet_creation_failure_logout",payload:{error:g,screen:"FarcasterConnectStatusScreen"}}),p()},callAuthOnSuccessOnClose:!0}}),o("EmbeddedWalletOnAccountCreateScreen")}),F)):T.current.push(setTimeout((()=>i({shouldCallAuthOnSuccess:!0,isSuccess:!0})),F)))}}),[b,c,r,a]),t.jsx(xe,{connectUri:j,loading:C,success:b,errorMessage:f,onBack:d?m:void 0,onClose:i,onOpenFarcaster:()=>{j&&(window.location.href=j)}})}};let ye=s.div`
  margin-top: 24px;
`,be=s.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`,Se=s.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 275px;
`,we=s.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`,Ee=s.div`
  font-size: 0.875rem;
  text-align: center;
  color: var(--privy-color-foreground-2);
`,Ce=s.div`
  position: relative;
  width: 82px;
  height: 82px;
`;export{We as FarcasterConnectStatusScreen,xe as FarcasterConnectStatusView,We as default};
