import{r as h,j as e}from"./router-CbKEWjiJ.js";import{aV as a,aU as C,I as E,aX as v,E as k,bC as b,bB as I}from"./wallet-DYCjDBOf.js";import{a as P,c as x}from"./TodoList-CgrU7uwu-BpVGSutQ.js";import{n as L}from"./ScreenLayout-BdRrZJd_-CLAXixsN.js";import{C as N}from"./circle-check-big-BbGzsT1V.js";import{F as w}from"./fingerprint-pattern-Cjh6TQcm.js";import{c as S}from"./createLucideIcon-BLKKXUY_.js";import"./check-3cyqHA2u.js";import"./ModalHeader-DfHxv9fE-BGuhfFWF.js";import"./Screen-CDEd4p2a-Djmdz_JD.js";import"./index-Dq_xe9dz-Rs89xlGq.js";/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],B=S("trash-2",A),U=({passkeys:t,isLoading:l,errorReason:u,success:y,expanded:i,onLinkPasskey:d,onUnlinkPasskey:o,onExpand:n,onBack:r,onClose:s})=>e.jsx(L,y?{title:"Passkeys updated",icon:N,iconVariant:"success",primaryCta:{label:"Done",onClick:s},onClose:s,watermark:!0}:i?{icon:w,title:"Your passkeys",onBack:r,onClose:s,watermark:!0,children:e.jsx(j,{passkeys:t,expanded:i,onUnlink:o,onExpand:n})}:{icon:w,title:"Set up passkey verification",subtitle:"Verify with passkey",primaryCta:{label:"Add new passkey",onClick:d,loading:l},onClose:s,watermark:!0,helpText:u||void 0,children:t.length===0?e.jsx($,{}):e.jsx(W,{children:e.jsx(j,{passkeys:t,expanded:i,onUnlink:o,onExpand:n})})});let W=a.div`
  margin-bottom: 12px;
`,j=({passkeys:t,expanded:l,onUnlink:u,onExpand:y})=>{let[i,d]=h.useState([]),o=l?t.length:2;return e.jsxs("div",{children:[e.jsx(T,{children:"Your passkeys"}),e.jsxs(_,{children:[t.slice(0,o).map((n=>{var s;return e.jsxs(D,{children:[e.jsxs("div",{children:[e.jsx(z,{children:(r=n,r.authenticatorName?r.createdWithBrowser?`${r.authenticatorName} on ${r.createdWithBrowser}`:r.authenticatorName:r.createdWithBrowser?r.createdWithOs?`${r.createdWithBrowser} on ${r.createdWithOs}`:`${r.createdWithBrowser}`:"Unknown device")}),e.jsxs(O,{children:["Last used:"," ",((s=n.latestVerifiedAt??n.firstVerifiedAt)==null?void 0:s.toLocaleString())??"N/A"]})]}),e.jsx(R,{disabled:i.includes(n.credentialId),onClick:()=>(async p=>{d((m=>m.concat([p]))),await u(p),d((m=>m.filter((f=>f!==p))))})(n.credentialId),children:i.includes(n.credentialId)?e.jsx(I,{}):e.jsx(B,{size:16})})]},n.credentialId);var r})),t.length>2&&!l&&e.jsx(V,{onClick:y,children:"View all"})]})]})},$=()=>e.jsxs(P,{style:{color:"var(--privy-color-foreground)"},children:[e.jsx(x,{children:"Verify with Touch ID, Face ID, PIN, or hardware key"}),e.jsx(x,{children:"Takes seconds to set up and use"}),e.jsx(x,{children:"Use your passkey to verify transactions and login to your account"})]});const ne={component:()=>{let{user:t,unlinkPasskey:l}=C(),{linkWithPasskey:u,closePrivyModal:y}=E(),i=t==null?void 0:t.linkedAccounts.filter((c=>c.type==="passkey")),[d,o]=h.useState(!1),[n,r]=h.useState(""),[s,p]=h.useState(!1),[m,f]=h.useState(!1);return h.useEffect((()=>{i.length===0&&f(!1)}),[i.length]),e.jsx(U,{passkeys:i,isLoading:d,errorReason:n,success:s,expanded:m,onLinkPasskey:()=>{o(!0),u().then((()=>p(!0))).catch((c=>{if(c instanceof v){if(c.privyErrorCode===k.CANNOT_LINK_MORE_OF_TYPE)return void r("Cannot link more passkeys to account.");if(c.privyErrorCode===k.PASSKEY_NOT_ALLOWED)return void r("Passkey request timed out or rejected by user.")}r("Unknown error occurred.")})).finally((()=>{o(!1)}))},onUnlinkPasskey:async c=>(o(!0),await l(c).then((()=>p(!0))).catch((g=>{g instanceof v&&g.privyErrorCode===k.MISSING_MFA_CREDENTIALS?r("Cannot unlink a passkey enrolled in MFA"):r("Unknown error occurred.")})).finally((()=>{o(!1)}))),onExpand:()=>f(!0),onBack:()=>f(!1),onClose:()=>y()})}},te=a.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 90px;
  border-radius: 50%;
  svg + svg {
    margin-left: 12px;
  }
  > svg {
    z-index: 2;
    color: var(--privy-color-accent) !important;
    stroke: var(--privy-color-accent) !important;
    fill: var(--privy-color-accent) !important;
  }
`;let M=b`
  && {
    width: 100%;
    font-size: 0.875rem;
    line-height: 1rem;

    /* Tablet and Up */
    @media (min-width: 440px) {
      font-size: 14px;
    }

    display: flex;
    gap: 12px;
    justify-content: center;

    padding: 6px 8px;
    background-color: var(--privy-color-background);
    transition: background-color 200ms ease;
    color: var(--privy-color-accent) !important;

    :focus {
      outline: none;
      box-shadow: none;
    }
  }
`;const V=a.button`
  ${M}
`;let _=a.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.8rem;
  padding: 0.5rem 0rem 0rem;
  flex-grow: 1;
  width: 100%;
`,T=a.div`
  line-height: 20px;
  height: 20px;
  font-size: 1em;
  font-weight: 450;
  display: flex;
  justify-content: flex-beginning;
  width: 100%;
`,z=a.div`
  font-size: 1em;
  line-height: 1.3em;
  font-weight: 500;
  color: var(--privy-color-foreground-2);
  padding: 0.2em 0;
`,O=a.div`
  font-size: 0.875rem;
  line-height: 1rem;
  color: #64668b;
  padding: 0.2em 0;
`,D=a.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1em;
  gap: 10px;
  font-size: 0.875rem;
  line-height: 1rem;
  text-align: left;
  border-radius: 8px;
  border: 1px solid #e2e3f0 !important;
  width: 100%;
  height: 5em;
`,F=b`
  :focus,
  :hover,
  :active {
    outline: none;
  }
  display: flex;
  width: 2em;
  height: 2em;
  justify-content: center;
  align-items: center;
  svg {
    color: var(--privy-color-error);
  }
  svg:hover {
    color: var(--privy-color-foreground-3);
  }
`,R=a.button`
  ${F}
`;export{te as DoubleIconWrapper,V as LinkButton,ne as LinkPasskeyScreen,U as LinkPasskeyView,ne as default};
