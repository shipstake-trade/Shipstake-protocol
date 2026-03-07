import{r as h,j as e}from"./router-CbKEWjiJ.js";import{aU as D,W as V,cV as I,bZ as _,cW as L,cX as K,u as P,aV as f}from"./wallet-DYCjDBOf.js";import{p as R}from"./CopyableText-BCytXyJL-DqhWAiR7.js";import{n as C}from"./ScreenLayout-BdRrZJd_-CLAXixsN.js";import{i as Y}from"./InfoBanner-DkQEPd77-t8s2rF6j.js";import{c as A}from"./createLucideIcon-BLKKXUY_.js";import{C as q}from"./check-3cyqHA2u.js";import{C as T}from"./circle-x-jnMYdLra.js";import"./copy-nfTRcL-F.js";import"./ModalHeader-DfHxv9fE-BGuhfFWF.js";import"./Screen-CDEd4p2a-Djmdz_JD.js";import"./index-Dq_xe9dz-Rs89xlGq.js";/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],O=A("chevron-down",N);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H=[["path",{d:"M5 22h14",key:"ehvnwv"}],["path",{d:"M5 2h14",key:"pdyrp9"}],["path",{d:"M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22",key:"1d314k"}],["path",{d:"M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2",key:"1vvvr6"}]],X=A("hourglass",H);/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G=[["path",{d:"m16 11 2 2 4-4",key:"9rsbq5"}],["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]],J=A("user-check",G),E=async({operation:t,until:n,delay:l,interval:p,attempts:y,signal:c})=>{let o,d=0;for(;d<y;){if(c!=null&&c.aborted)return{status:"aborted",result:o,attempts:d};d++;try{if(o=await t(),n(o))return{status:"success",result:o,attempts:d};d<y&&await _(p)}catch{d<y&&await _(p)}}return{status:"max_attempts",result:o,attempts:d}},Q=({data:t,onClose:n})=>e.jsx(C,{showClose:!0,onClose:n,title:"Initiate bank transfer",subtitle:"Use the details below to complete a bank transfer from your bank.",primaryCta:{label:"Done",onClick:n},watermark:!1,footerText:"Exchange rates and fees are set when you authorize and determine the amount you receive. You'll see the applicable rates and fees for your transaction separately",children:e.jsx(Z,{children:(K[t.deposit_instructions.asset]||[]).map((([l,p],y)=>{let c=t.deposit_instructions[l];if(!c)return null;let o=l==="asset"?c.toUpperCase():c,d=o.length>100?`${o.slice(0,9)}...${o.slice(-9)}`:o;return e.jsxs(ee,{children:[e.jsx(te,{children:p}),e.jsx(R,{value:o,includeChildren:P.isMobile,children:e.jsx(re,{children:d})})]},y)}))})});let Z=f.ol`
  border-color: var(--privy-color-border-default);
  border-width: 1px;
  border-radius: var(--privy-border-radius-mdlg);
  border-style: solid;
  display: flex;
  flex-direction: column;

  && {
    padding: 0 1rem;
  }
`,ee=f.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;

  &:not(:first-of-type) {
    border-top: 1px solid var(--privy-color-border-default);
  }

  & > {
    :nth-child(1) {
      flex-basis: 30%;
    }

    :nth-child(2) {
      flex-basis: 60%;
    }
  }
`,te=f.span`
  color: var(--privy-color-foreground);
  font-kerning: none;
  font-variant-numeric: lining-nums proportional-nums;
  font-feature-settings: 'calt' off;

  /* text-xs/font-regular */
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.125rem; /* 150% */

  text-align: left;
  flex-shrink: 0;
`,re=f.span`
  color: var(--privy-color-foreground);
  font-kerning: none;
  font-feature-settings: 'calt' off;

  /* text-sm/font-medium */
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.375rem; /* 157.143% */

  text-align: right;
  word-break: break-all;
`;const oe=({onClose:t})=>e.jsx(C,{showClose:!0,onClose:t,icon:T,iconVariant:"error",title:"Something went wrong",subtitle:"We couldn't complete account setup. This isn't caused by anything you did.",primaryCta:{label:"Close",onClick:t},watermark:!0}),se=({onClose:t,reason:n})=>{let l=n?n.charAt(0).toLowerCase()+n.slice(1):void 0;return e.jsx(C,{showClose:!0,onClose:t,icon:T,iconVariant:"error",title:"Identity verification failed",subtitle:l?`We can't complete identity verification because ${l}. Please try again or contact support for assistance.`:"We couldn't verify your identity. Please try again or contact support for assistance.",primaryCta:{label:"Close",onClick:t},watermark:!0})},ae=({onClose:t,email:n})=>e.jsx(C,{showClose:!0,onClose:t,icon:X,title:"Identity verification in progress",subtitle:"We're waiting for Persona to approve your identity verification. This usually takes a few minutes, but may take up to 24 hours.",primaryCta:{label:"Done",onClick:t},watermark:!0,children:e.jsxs(Y,{theme:"light",children:["You'll receive an email at ",n," once approved with instructions for completing your deposit."]})}),ne=({onClose:t,onAcceptTerms:n,isLoading:l})=>e.jsx(C,{showClose:!0,onClose:t,icon:J,title:"Verify your identity to continue",subtitle:"Finish verification with Persona — it takes just a few minutes and requires a government ID.",helpText:e.jsxs(e.Fragment,{children:[`This app uses Bridge to securely connect accounts and move funds. By clicking "Accept," you agree to Bridge's`," ",e.jsx("a",{href:"https://www.bridge.xyz/legal",target:"_blank",rel:"noopener noreferrer",children:"Terms of Service"})," ","and"," ",e.jsx("a",{href:"https://www.bridge.xyz/legal/row-privacy-policy/bridge-building-limited",target:"_blank",rel:"noopener noreferrer",children:"Privacy Policy"}),"."]}),primaryCta:{label:"Accept and continue",onClick:n,loading:l},watermark:!0}),ie=({onClose:t})=>e.jsx(C,{showClose:!0,onClose:t,icon:q,iconVariant:"success",title:"Identity verified successfully",subtitle:"We've successfully verified your identity. Now initiate a bank transfer to view instructions.",primaryCta:{label:"Initiate bank transfer",onClick:()=>{},loading:!0},watermark:!0}),le=({opts:t,onClose:n,onEditSourceAsset:l,onSelectAmount:p,isLoading:y})=>{let{icon:c}=L[t.source.selectedAsset];return e.jsxs(C,{showClose:!0,onClose:n,headerTitle:`Buy ${t.destination.asset.toLocaleUpperCase()}`,primaryCta:{label:"Continue",onClick:p,loading:y},watermark:!0,children:[e.jsx(ye,{currency:t.source.selectedAsset,inputMode:"decimal",autoFocus:!0}),e.jsxs(ce,{onClick:l,children:[e.jsx(ue,{children:c}),e.jsx(de,{children:t.source.selectedAsset.toLocaleUpperCase()}),e.jsx(pe,{children:e.jsx(O,{})})]})]})};let ce=f.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: auto;
  gap: 0.5rem;
  border: 1px solid var(--privy-color-border-default);
  border-radius: var(--privy-border-radius-full);

  && {
    margin: auto;
    padding: 0.5rem 1rem;
  }
`,ue=f.div`
  svg {
    width: 1rem;
    height: 1rem;
    border-radius: var(--privy-border-radius-full);
    overflow: hidden;
  }
`,de=f.span`
  color: var(--privy-color-foreground);
  font-kerning: none;
  font-feature-settings: 'calt' off;

  /* text-sm/font-medium */
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.375rem; /* 157.143% */
`,pe=f.div`
  color: var(--privy-color-foreground);

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`,fe={usd:"$",eur:"€",gbp:"£",mxn:"$",brl:"R$"},me=f.span`
  background-color: var(--privy-color-background);
  width: 100%;
  text-align: center;
  border: none;

  font-kerning: none;
  font-feature-settings: 'calt' off;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  cursor: pointer;

  &:focus {
    outline: none !important;
    border: none !important;
    box-shadow: none !important;
  }

  && {
    color: var(--privy-color-foreground);
    /* text-6xl/font-semiBold */
    font-size: 3.75rem;
    font-style: normal;
    font-weight: 600;
    line-height: 5.375rem; /* 143.333% */
  }
`,$=f.span`
  color: var(--privy-color-foreground);
  font-kerning: none;
  font-feature-settings: 'calt' off;

  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.5rem; /* 150% */

  margin-top: 0.75rem;
`,ye=({currency:t="usd",value:n,onChange:l,inputMode:p="decimal",autoFocus:y})=>{let[c,o]=h.useState("0"),d=h.useRef(null),u=n??c,S=fe[t.toLowerCase()]||"$",b=h.useCallback((r=>{let m=r.target.value,s=(m=m.replace(/[^\d.]/g,"")).split(".");s.length>2&&(m=s[0]+"."+s.slice(1).join("")),s.length===2&&s[1].length>2&&(m=`${s[0]}.${s[1].slice(0,2)}`),m.length>1&&m[0]==="0"&&m[1]!=="."&&(m=m.slice(1)),(m===""||m===".")&&(m="0"),l?l(m):o(m)}),[l]),i=h.useCallback((r=>{[46,8,9,27,13,110,190].indexOf(r.keyCode)===-1&&(r.keyCode!==65||r.ctrlKey!==!0)&&(r.keyCode!==67||r.ctrlKey!==!0)&&(r.keyCode!==86||r.ctrlKey!==!0)&&(r.keyCode!==88||r.ctrlKey!==!0)&&(!(r.keyCode>=35)||!(r.keyCode<=39))&&(r.shiftKey||r.keyCode<48||r.keyCode>57)&&(r.keyCode<96||r.keyCode>105)&&r.preventDefault()}),[]),w=h.useMemo((()=>(u.includes("."),u)),[u]);return e.jsx(e.Fragment,{children:e.jsxs(me,{onClick:()=>{var r;return(r=d.current)==null?void 0:r.focus()},children:[e.jsx($,{children:S}),w,e.jsx("input",{ref:d,type:"text",inputMode:p,value:w,onChange:b,onKeyDown:i,autoFocus:y,placeholder:"0",style:{width:1,height:"1rem",opacity:0,alignSelf:"center",fontSize:"1rem"}}),e.jsx($,{style:{opacity:0},children:S})]})})};const he=({opts:t,isLoading:n,onSelectSource:l})=>e.jsx(C,{showClose:!1,showBack:!0,onBack:()=>l(t.source.selectedAsset),title:"Select currency",children:e.jsx(ge,{children:t.source.assets.map((p=>{let{icon:y,name:c}=L[p];return e.jsx(ve,{onClick:()=>l(p),disabled:n,children:e.jsxs(ke,{children:[e.jsx(xe,{children:y}),e.jsxs(Ce,{children:[e.jsx(be,{children:c}),e.jsx(we,{children:p.toLocaleUpperCase()})]})]})},p)}))})});let ge=f.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
`,ve=f.button`
  border-color: var(--privy-color-border-default);
  border-width: 1px;
  border-radius: var(--privy-border-radius-mdlg);
  border-style: solid;
  display: flex;

  && {
    padding: 0.75rem 1rem;
  }
`,ke=f.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
`,xe=f.div`
  svg {
    width: 2.25rem;
    height: 2.25rem;
    border-radius: var(--privy-border-radius-full);
    overflow: hidden;
  }
`,Ce=f.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.125rem;
`,be=f.span`
  color: var(--privy-color-foreground);
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.25rem;
`,we=f.span`
  color: var(--privy-color-foreground-3);
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.125rem;
`;const je=({onClose:t,onAcceptTerms:n,onSelectAmount:l,onSelectSource:p,onEditSourceAsset:y,opts:c,state:o,email:d,isLoading:u})=>o.status==="select-amount"?e.jsx(le,{onClose:t,onSelectAmount:l,onEditSourceAsset:y,opts:c,isLoading:u}):o.status==="select-source-asset"?e.jsx(he,{onSelectSource:p,opts:c,isLoading:u}):o.status==="kyc-prompt"?e.jsx(ne,{onClose:t,onAcceptTerms:n,opts:c,isLoading:u}):o.status==="kyc-incomplete"?e.jsx(ae,{onClose:t,email:d}):o.status==="kyc-success"?e.jsx(ie,{onClose:t}):o.status==="kyc-error"?e.jsx(se,{onClose:t,reason:o.reason}):o.status==="account-details"?e.jsx(Q,{onClose:t,data:o.data}):o.status==="create-customer-error"||o.status==="get-customer-error"?e.jsx(oe,{onClose:t}):null,Fe={component:()=>{let{user:t}=D(),n=V().data;if(!(n!=null&&n.FundWithBankDepositScreen))throw Error("Missing data");let{onSuccess:l,onFailure:p,opts:y,createOrUpdateCustomer:c,getCustomer:o,getOrCreateVirtualAccount:d}=n.FundWithBankDepositScreen,[u,S]=h.useState(y),[b,i]=h.useState({status:"select-amount"}),[w,r]=h.useState(null),[m,s]=h.useState(!1),j=h.useRef(null),z=h.useCallback((async()=>{var k,v;let a;s(!0),r(null);try{a=await o({kycRedirectUrl:window.location.origin})}catch(g){if(!g||typeof g!="object"||!("status"in g)||g.status!==404)return i({status:"get-customer-error"}),r(g),void s(!1)}if(!a)try{a=await c({hasAcceptedTerms:!1,kycRedirectUrl:window.location.origin})}catch(g){return i({status:"create-customer-error"}),r(g),void s(!1)}if(!a)return i({status:"create-customer-error"}),r(Error("Unable to create customer")),void s(!1);if(a.status==="not_started"&&a.kyc_url)return i({status:"kyc-prompt",kycUrl:a.kyc_url}),void s(!1);if(a.status==="not_started")return i({status:"get-customer-error"}),r(Error("Unexpected user state")),void s(!1);if(a.status==="rejected")return i({status:"kyc-error",reason:(v=(k=a.rejection_reasons)==null?void 0:k[0])==null?void 0:v.reason}),r(Error("User KYC rejected.")),void s(!1);if(a.status==="incomplete")return i({status:"kyc-incomplete"}),void s(!1);if(a.status!=="active")return i({status:"get-customer-error"}),r(Error("Unexpected user state")),void s(!1);a.status;try{let g=await d({destination:u.destination,provider:u.provider,source:{asset:u.source.selectedAsset}});i({status:"account-details",data:g})}catch(g){return i({status:"create-customer-error"}),r(g),void s(!1)}}),[u]),M=h.useCallback((async()=>{var g,U;if(r(null),s(!0),b.status!=="kyc-prompt")return r(Error("Unexpected state")),void s(!1);let a=I({location:b.kycUrl});if(await c({hasAcceptedTerms:!0}),!a)return r(Error("Unable to begin kyc flow.")),s(!1),void i({status:"create-customer-error"});j.current=new AbortController;let k=await E({operation:async()=>({done:a.location.origin===window.location.origin,closed:a.closed}),until:({done:x,closed:F})=>x||F,delay:0,interval:100,attempts:18e3,signal:j.current.signal});if(k.status==="aborted")return void a.close();if(k.status==="success"&&k.result.closed)return void s(!1);k.status==="success"&&k.result.done&&a.close();let v=await E({operation:()=>o({}),until:x=>x.status==="active"||x.status==="rejected",delay:0,interval:2e3,attempts:60,signal:j.current.signal});if(v.status!=="aborted"){if(v.status==="max_attempts")return i({status:"kyc-incomplete"}),void s(!1);if(v.status,v.result.status==="rejected")return i({status:"kyc-error",reason:(U=(g=v.result.rejection_reasons)==null?void 0:g[0])==null?void 0:U.reason}),r(Error("User KYC rejected.")),void s(!1);if(v.result.status!=="active")return i({status:"kyc-incomplete"}),void s(!1);a.closed||a.close(),v.result.status;try{i({status:"kyc-success"});let x=await d({destination:u.destination,provider:u.provider,source:{asset:u.source.selectedAsset}});i({status:"account-details",data:x})}catch(x){i({status:"create-customer-error"}),r(x)}finally{s(!1)}}}),[i,r,s,c,d,b,u,j]),W=h.useCallback((a=>{i({status:"select-amount"}),S({...u,source:{...u.source,selectedAsset:a}})}),[i,S]),B=h.useCallback((()=>{i({status:"select-source-asset"})}),[i]);return e.jsx(je,{onClose:h.useCallback((async()=>{var a;(a=j.current)==null||a.abort(),w?p(w):await l()}),[w,j]),opts:u,state:b,isLoading:m,email:t.email.address,onAcceptTerms:M,onSelectAmount:z,onSelectSource:W,onEditSourceAsset:B})}};export{Fe as FundWithBankDepositScreen,Fe as default};
