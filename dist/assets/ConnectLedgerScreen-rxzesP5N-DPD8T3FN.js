import{j as t}from"./router-CbKEWjiJ.js";import{W as a,by as s,aV as o}from"./wallet-DYCjDBOf.js";import{n as c}from"./ScreenLayout-BdRrZJd_-CLAXixsN.js";import{c as l}from"./createLucideIcon-BLKKXUY_.js";import"./ModalHeader-DfHxv9fE-BGuhfFWF.js";import"./Screen-CDEd4p2a-Djmdz_JD.js";import"./index-Dq_xe9dz-Rs89xlGq.js";/**
 * @license lucide-react v0.554.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=[["path",{d:"m16 3 4 4-4 4",key:"1x1c3m"}],["path",{d:"M20 7H4",key:"zbl0bi"}],["path",{d:"m8 21-4-4 4-4",key:"h9nckh"}],["path",{d:"M4 17h16",key:"g4d7ey"}]],d=l("arrow-right-left",L),h=e=>t.jsx("svg",{id:"Layer_1",xmlns:"http://www.w3.org/2000/svg",viewBox:"-0.625 12.48 397.647 399.546",width:"2500",height:"674",preserveAspectRatio:"none",...e,children:t.jsx("g",{children:t.jsx("path",{fill:"#333745",d:"M 333.9 12.8 L 150.9 12.8 L 150.9 258.4 L 396.5 258.4 L 396.5 76.7 C 396.6 42.2 368.4 12.8 333.9 12.8 Z M 94.7 12.8 L 64 12.8 C 29.5 12.8 0 40.9 0 76.8 L 0 107.5 L 94.7 107.5 L 94.7 12.8 Z M 0 165 L 94.7 165 L 94.7 259.7 L 0 259.7 L 0 165 Z M 301.9 410.6 L 332.6 410.6 C 367.1 410.6 396.6 382.5 396.6 346.6 L 396.6 316 L 301.9 316 L 301.9 410.6 Z M 150.9 316 L 245.6 316 L 245.6 410.7 L 150.9 410.7 L 150.9 316 Z M 0 316 L 0 346.7 C 0 381.2 28.1 410.7 64 410.7 L 94.7 410.7 L 94.7 316 L 0 316 Z"})})}),g=({onContinueWithLedger:e,onContinueWithoutLedger:n,title:i="Phantom supports Ledger",subtitle:r=`Are you using a Ledger hardware wallet?
Continue to sign with Ledger`})=>t.jsx(c,{title:i,subtitle:t.jsx(m,{children:r}),primaryCta:{label:"Continue with Ledger",onClick:e},secondaryCta:{label:"Continue without Ledger",onClick:n},watermark:!0,children:t.jsxs(u,{children:[t.jsx(s,{style:{width:"48px",height:"48px"}}),t.jsx(d,{strokeWidth:2,color:"var(--privy-color-icon-subtle)",width:22,height:22}),t.jsx(h,{style:{width:"48px",height:"48px"}})]})});function p(){let{data:e,setModalData:n,navigate:i}=a();return t.jsx(g,{onContinueWithLedger:function(){n({...e,login:{...e==null?void 0:e.login,isSigningInWithLedgerSolana:!0}}),i("ConnectionStatusScreen")},onContinueWithoutLedger:function(){n({...e,login:{...e==null?void 0:e.login,isSigningInWithLedgerSolana:!1}}),i("ConnectionStatusScreen")}})}const b={component:p};let u=o.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: var(--screen-space);
`,m=o.span`
  white-space: pre-wrap;
`;export{b as ConnectLedgerScreen,p as ConnectLedgerScreenComponent,g as ConnectLedgerScreenView,b as default};
