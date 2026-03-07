import{an as I,ao as P,b3 as R,b7 as Q,b8 as C,b9 as U,ba as H,bb as O,bc as V,aV as t}from"./wallet-DYCjDBOf.js";import{n as Y}from"./getErc20Balance-sCX8nL1s-Bb_3tUvH.js";import{r as q,j as e}from"./router-CbKEWjiJ.js";import{k as z,u as D}from"./ModalHeader-DfHxv9fE-BGuhfFWF.js";import{c as G,s as J}from"./Layouts-BlFm53ED-C1Uan3AP.js";import{t as K}from"./FundWalletMethodHeader-CdXWChwL-Cwi92Q5p.js";import{s as $,e as x,n as L}from"./Value-tcJV9e0L-7hw4mDdv.js";import{e as M}from"./ErrorMessage-D8VaAP5m-DpYfiTG8.js";import{r as W}from"./Subtitle-CV-2yKE4-Dsk09iCI.js";import{e as X}from"./Title-BnzYV3Is-DxAyNnQt.js";import{F as Z}from"./WalletIcon-_ZXJNa8R.js";import{e as N}from"./getChainName-DjpPdUSc-c2urPd0g.js";import{n as _}from"./Chip-D2-wZOHJ-ipRZeMot.js";import{w as E}from"./TransferOrBridgeLoadingScreen-Cwzefd9j-D9AiU0W9.js";import{d as ee,e as re}from"./shared-FM0rljBt-vD7tq4eg.js";import{F as ae}from"./ChevronDownIcon-B6hUpX0T.js";import{t as k}from"./formatErc20TokenAmount-BuPk9xcy-CkAr4Oc0.js";import{c as F}from"./ethers-5oa3ZKLD-D8ywVTSX.js";import{a as ne,p as se,s as ie,c as oe,l as te}from"./styles-D5Jf27-u-BsZ9lllZ.js";const Ue=({chains:i,appId:r,address:a,rpcConfig:l,includeUsdc:d})=>Promise.all(i.map((async s=>{let p=I({chain:s,transport:P(R(s,l,r))}),b=await p.getBalance({address:a}).catch((()=>0n)),o=null,m=Q[s.id];if(d&&m){let{balance:u}=await Y({address:a,chain:s,rpcConfig:l,appId:r,erc20Address:m});o=u}return{balance:b,erc20Balance:o,erc20Address:m,chain:s}}))),ce=({balance:i,className:r,chain:a})=>e.jsx(ee,{className:r,$state:void 0,children:e.jsx(j,{balance:i,chain:a})}),j=({balance:i,chain:r})=>e.jsxs(e.Fragment,{children:[e.jsxs(le,{children:[e.jsx(me,{chainId:typeof r=="object"?r.id:"solana"}),e.jsx(L,{children:typeof r=="object"?r.name:N(r)})]}),e.jsxs(_,{isLoading:!1,isPulsing:!1,color:"gray",children:[e.jsx(de,{children:e.jsx(Z,{})}),i]})]});let le=t.div`
  display: flex;
  align-items: center;
`,de=t.div`
  height: 0.75rem;
  width: 0.75rem;
  margin-right: 0.2rem;
`,me=t(E)`
  height: 1.25rem;
  width: 1.25rem;
  display: inline-block;
  margin-right: 0.5rem;
  border-radius: 4px;
`;const he=({options:i,onSelect:r,selected:a,className:l})=>e.jsxs(U,{as:pe,children:[e.jsxs(H,{as:xe,children:[e.jsx(j,{balance:a.balance,chain:a.chain}),e.jsx(y,{height:16})]}),e.jsx(O,{as:ue,className:l,children:i.map(((d,s)=>e.jsx(V,{as:fe,onClick:()=>r(s),children:e.jsx(j,{balance:d.balance,chain:d.chain})},s)))})]});let pe=t.div`
  width: 100%;
  position: relative;
`,ue=t.div`
  width: 100%;
  margin-top: 0.5rem;
  position: absolute;
  background-color: var(--privy-color-background);
  border-radius: var(--privy-border-radius-md);
  overflow-x: hidden;
  overflow-y: auto;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  max-height: 11.75rem;

  && {
    border: solid 1px var(--privy-color-foreground-4);
  }

  z-index: 1;
`,fe=t.button`
  width: 100%;
  display: flex;
  justify-content: space-between;

  && {
    padding: 1rem;
  }

  :not(:last-child) {
    border-bottom: solid 1px var(--privy-color-foreground-4);
  }

  :hover {
    background: var(--privy-color-background-2);
  }
`,y=t(ae)`
  height: 1rem;
  margin-left: 0.5rem;
`,xe=t.button`
  ${re}

  /* Push the chip all the way to the right */
  span {
    margin-left: auto;
  }

  ${y} {
    transition: rotate 100ms ease-in;
  }

  &[aria-expanded='true'] {
    ${y} {
      rotate: -180deg;
    }
  }
`;const He=({displayName:i,errorMessage:r,configuredFundingChain:a,formattedBalance:l,fundingAmount:d,fundingCurrency:s,fundingAmountInUsd:p,options:b,selectedOption:o,isPreparing:m,isSubmitting:u,addressToFund:T,fundingWalletAddress:B,onSubmit:S,onSelect:A,onAmountChange:v,erc20ContractInfo:n})=>{let w=q.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsx(K,{}),e.jsx(G,{}),e.jsx(X,{children:"Transfer from another network"}),e.jsxs(W,{children:["You need more funds on the"," ",typeof a=="object"?a.name:N(a)," ","network. Bridge from another blockchain network."]}),e.jsxs(ne,{style:{marginTop:"2rem"},children:[e.jsxs(se,{onClick:()=>{var c;return(c=w.current)==null?void 0:c.focus()},children:[e.jsx(ie,{ref:w,value:d,onChange:c=>{let h=c.target.value;if(/^[0-9.]*$/.test(h)&&h.split(".").length-1<=1){let g=/\.$/.test(h)?".":"",f=Number(h.replace(/\.$/,"")||"0");if(Number.isNaN(f))return void v("0");v(f.toString()+g)}}}),e.jsx(oe,{children:s})]}),p&&e.jsx(te,{children:p})]}),e.jsxs($,{style:{marginTop:"1.5rem"},children:[e.jsx(x,{children:"From"}),e.jsx(x,{children:C(B)})]}),e.jsx(he,{selected:{chain:o.chain,balance:o.isErc20Quote?k({amount:o.erc20Balance??0n,decimals:(n==null?void 0:n.decimals)??6})+` ${(n==null?void 0:n.symbol)||""}`:F(o.balance,o.chain.nativeCurrency.symbol,3,!0)},options:b.map((({chain:c,balance:h,isErc20Quote:g,erc20Balance:f})=>({chain:c,balance:g?k({amount:f??0n,decimals:(n==null?void 0:n.decimals)??6})+` ${(n==null?void 0:n.symbol)||""}`:F(h,c.nativeCurrency.symbol,3,!0)}))),onSelect:A}),e.jsxs($,{style:{marginTop:"1.5rem"},children:[e.jsx(x,{children:"To"}),e.jsx(x,{children:C(T)})]}),e.jsx(ce,{chain:a,balance:l}),e.jsx(M,{style:{marginTop:"1rem"},children:r}),e.jsxs(z,{style:{marginTop:"1rem"},loading:u||m,disabled:m||u,onClick:S,children:["Confirm with ",i]}),e.jsx(J,{}),e.jsx(D,{})]})};export{Ue as H,He as Z};
