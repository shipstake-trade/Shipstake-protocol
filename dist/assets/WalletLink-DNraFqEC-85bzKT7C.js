import{j as n}from"./router-CbKEWjiJ.js";import{aS as j,b2 as $,aV as l}from"./wallet-DYCjDBOf.js";import{i as g,m as c,o as d,c as p}from"./ethers-5oa3ZKLD-D8ywVTSX.js";import{C as k}from"./getFormattedUsdFromLamports-B6EqSEho-C-HCdwKa.js";import{t as S}from"./transaction-CnfuREWo-nROljJQP.js";const P=({weiQuantities:e,tokenPrice:r,tokenSymbol:o})=>{let i=c(e),t=r?d(i,r):void 0,s=p(i,o);return n.jsx(a,{children:t||s})},D=({weiQuantities:e,tokenPrice:r,tokenSymbol:o})=>{let i=c(e),t=r?d(i,r):void 0,s=p(i,o);return n.jsx(a,{children:t?n.jsxs(n.Fragment,{children:[n.jsx(y,{children:"USD"}),t==="<$0.01"?n.jsxs(m,{children:[n.jsx(h,{children:"<"}),"$0.01"]}):t]}):s})},F=({quantities:e,tokenPrice:r,tokenSymbol:o="SOL",tokenDecimals:i=9})=>{let t=e.reduce(((f,u)=>f+u),0n),s=r&&o==="SOL"&&i===9?k(t,r):void 0,x=o==="SOL"&&i===9?S(t):`${j(t,i)} ${o}`;return n.jsx(a,{children:s?n.jsx(n.Fragment,{children:s==="<$0.01"?n.jsxs(m,{children:[n.jsx(h,{children:"<"}),"$0.01"]}):s}):x})};let a=l.span`
  font-size: 14px;
  line-height: 140%;
  display: flex;
  gap: 4px;
  align-items: center;
`,y=l.span`
  font-size: 12px;
  line-height: 12px;
  color: var(--privy-color-foreground-3);
`,h=l.span`
  font-size: 10px;
`,m=l.span`
  display: flex;
  align-items: center;
`;function v(e,r){return`https://explorer.solana.com/account/${e}?chain=${r}`}const I=e=>n.jsx(b,{href:e.chainType==="ethereum"?g(e.chainId,e.walletAddress):v(e.walletAddress,e.chainId),target:"_blank",children:$(e.walletAddress)});let b=l.a`
  &:hover {
    text-decoration: underline;
  }
`;export{F as f,D as h,P as p,I as v};
