import{r as u,j as t}from"./router-CbKEWjiJ.js";import{W as F,r as T,I,bd as y,u as h,bv as O,aV as n}from"./wallet-DYCjDBOf.js";import{h as q}from"./CopyToClipboard-DSTf_eKU-CB3mRCQG.js";import{n as B}from"./OpenLink-DZHy38vr-DgrcCRwb.js";import{C as E}from"./QrCode-D4XZQrgi-D-F2GuMT.js";import{n as M}from"./ScreenLayout-BdRrZJd_-CLAXixsN.js";import{l as x}from"./farcaster-DPlSjvF5-JuE6wLOe.js";import"./dijkstra-COg3n3zL.js";import"./ModalHeader-DfHxv9fE-BGuhfFWF.js";import"./Screen-CDEd4p2a-Djmdz_JD.js";import"./index-Dq_xe9dz-Rs89xlGq.js";let S="#8a63d2";const _=({appName:p,loading:m,success:i,errorMessage:e,connectUri:r,onBack:s,onClose:c,onOpenFarcaster:o})=>t.jsx(M,h.isMobile||m?h.isIOS?{title:e?e.message:"Add a signer to Farcaster",subtitle:e?e.detail:`This will allow ${p} to add casts, likes, follows, and more on your behalf.`,icon:x,iconVariant:"loading",iconLoadingStatus:{success:i,fail:!!e},primaryCta:r&&o?{label:"Open Farcaster app",onClick:o}:void 0,onBack:s,onClose:c,watermark:!0}:{title:e?e.message:"Requesting signer from Farcaster",subtitle:e?e.detail:"This should only take a moment",icon:x,iconVariant:"loading",iconLoadingStatus:{success:i,fail:!!e},onBack:s,onClose:c,watermark:!0,children:r&&h.isMobile&&t.jsx(A,{children:t.jsx(B,{text:"Take me to Farcaster",url:r,color:S})})}:{title:"Add a signer to Farcaster",subtitle:`This will allow ${p} to add casts, likes, follows, and more on your behalf.`,onBack:s,onClose:c,watermark:!0,children:t.jsxs(R,{children:[t.jsx(V,{children:r?t.jsx(E,{url:r,size:275,squareLogoElement:x}):t.jsx(P,{children:t.jsx(O,{})})}),t.jsxs(L,{children:[t.jsx(N,{children:"Or copy this link and paste it into a phone browser to open the Farcaster app."}),r&&t.jsx(q,{text:r,itemName:"link",color:S})]})]})});let A=n.div`
  margin-top: 24px;
`,R=n.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`,V=n.div`
  padding: 24px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 275px;
`,L=n.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`,N=n.div`
  font-size: 0.875rem;
  text-align: center;
  color: var(--privy-color-foreground-2);
`,P=n.div`
  position: relative;
  width: 82px;
  height: 82px;
`;const Z={component:()=>{let{lastScreen:p,navigateBack:m,data:i}=F(),e=T(),{requestFarcasterSignerStatus:r,closePrivyModal:s}=I(),[c,o]=u.useState(void 0),[k,v]=u.useState(!1),[b,w]=u.useState(!1),g=u.useRef([]),a=i==null?void 0:i.farcasterSigner;u.useEffect((()=>{let C=Date.now(),l=setInterval((async()=>{if(!(a!=null&&a.public_key))return clearInterval(l),void o({retryable:!0,message:"Connect failed",detail:"Something went wrong. Please try again."});a.status==="approved"&&(clearInterval(l),v(!1),w(!0),g.current.push(setTimeout((()=>s({shouldCallAuthOnSuccess:!1,isSuccess:!0})),y)));let d=await r(a==null?void 0:a.public_key),j=Date.now()-C;d.status==="approved"?(clearInterval(l),v(!1),w(!0),g.current.push(setTimeout((()=>s({shouldCallAuthOnSuccess:!1,isSuccess:!0})),y))):j>3e5?(clearInterval(l),o({retryable:!0,message:"Connect failed",detail:"The request timed out. Try again."})):d.status==="revoked"&&(clearInterval(l),o({retryable:!0,message:"Request rejected",detail:"The request was rejected. Please try again."}))}),2e3);return()=>{clearInterval(l),g.current.forEach((d=>clearTimeout(d)))}}),[]);let f=(a==null?void 0:a.status)==="pending_approval"?a.signer_approval_url:void 0;return t.jsx(_,{appName:e.name,loading:k,success:b,errorMessage:c,connectUri:f,onBack:p?m:void 0,onClose:s,onOpenFarcaster:()=>{f&&(window.location.href=f)}})}};export{Z as FarcasterSignerStatusScreen,_ as FarcasterSignerStatusView,Z as default};
