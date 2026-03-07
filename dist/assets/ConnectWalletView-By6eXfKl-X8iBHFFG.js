import{r as C,j as n}from"./router-CbKEWjiJ.js";import{r as ge,I as we,bG as Re,o as E,bH as ze,bI as Ve,bd as Ge,u as _,bJ as He,bK as We,E as Ye,bL as Je,bM as Ze,bN as Oe,bO as he,bP as Ee,bQ as Me,aV as W,p as _e}from"./wallet-DYCjDBOf.js";import{y as Se,h as Xe}from"./ModalHeader-DfHxv9fE-BGuhfFWF.js";import{m as en}from"./CopyableText-BCytXyJL-DqhWAiR7.js";import{n as nn}from"./Link-DJ5gq9Di-DYuI41_Q.js";import{C as ln}from"./QrCode-D4XZQrgi-D-F2GuMT.js";import{e as tn}from"./EmailInputForm-Dgoii4vf-Clc8rYLs.js";import{n as fe}from"./useI18n-bIQlZhkW-CtinTPne.js";import{e as an}from"./WalletCards-DH1rqayz-CQAsyBnw.js";import{w as H}from"./Screen-CDEd4p2a-Djmdz_JD.js";function on({title:x,titleId:a,...m},w){return C.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:w,"aria-labelledby":a},m),x?C.createElement("title",{id:a},x):null,C.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"}))}const rn=C.forwardRef(on),Y={phantom:{mobile:{native:"phantom://",universal:"https://phantom.app/ul/"}},solflare:{mobile:{native:void 0,universal:"https://solflare.com/ul/v1/"}},metamask:{image_url:{sm:We,md:We}}};class v{static normalize(a){return a.replace(/[-_]wallet$/,"").replace(/[-_]extension$/,"").toLowerCase()}isEth(a){return a.chains.some((m=>m.includes("eip155:")))}isSol(a){return a.chains.some((m=>m.includes("solana:")))}inAllowList(a,m){if(!this.normalizedAllowList||this.normalizedAllowList.length===0||m==="listing"&&this.includeWalletConnect)return!0;let w=v.normalize(a);return this.normalizedAllowList.some((o=>w===v.normalize(o)))}inDenyList(a,m){return m==="listing"&&a==="rabby"||v.normalize(a)==="agw"}chainMatches(a){return this.chainFilter==="ethereum-only"?a==="ethereum":this.chainFilter!=="solana-only"||a==="solana"}getAllowListKey(a,m,w,o){let b=v.normalize(a);for(let T of this.normalizedAllowList||[])if(b===v.normalize(T))return T;if(m==="connector"){if((w==="injected"||w==="solana_adapter")&&o==="ethereum"&&this.detectedEth)return"detected_ethereum_wallets";if((w==="injected"||w==="solana_adapter")&&o==="solana"&&this.detectedSol)return"detected_solana_wallets"}if(m==="listing"&&this.includeWalletConnect)return"wallet_connect"}connectorOk(a){return!!(a.connectorType!=="null"&&a.walletBranding.id!=="walletconnect_solana"&&this.chainMatches(a.chainType)&&(this.inAllowList(a.walletClientType,"connector")||(a.connectorType==="injected"||a.connectorType==="solana_adapter")&&(a.chainType==="ethereum"&&this.detectedEth||a.chainType==="solana"&&this.detectedSol)))}listingOk(a){if(a.slug.includes("coinbase"))return!1;if(this.chainFilter==="ethereum-only"){if(!this.isEth(a))return!1}else if(this.chainFilter==="solana-only"&&!this.isSol(a))return!1;return!(!this.inAllowList(a.slug,"listing")||this.inDenyList(a.slug,"listing"))}getWallets(a,m){var z;let w=new Map,o=l=>{let i=w.get(l.id);if(i){i.chainType!==l.chainType&&(i.chainType="multi");let c=new Set(i.chains);l.chains.forEach((d=>c.add(d))),i.chains=Array.from(c),!i.icon&&l.icon&&(i.icon=l.icon),!i.url&&l.url&&(i.url=l.url),!i.listing&&l.listing&&(i.listing=l.listing),!i.allowListKey&&l.allowListKey&&(i.allowListKey=l.allowListKey)}else w.set(l.id,l)};a.filter((l=>this.connectorOk(l))).forEach((l=>{var c,d;let i=v.normalize(l.walletClientType);o({id:i,label:((c=l.walletBranding)==null?void 0:c.name)??i,source:"connector",connector:l,chainType:l.chainType,icon:(d=l.walletBranding)==null?void 0:d.icon,url:void 0,chains:[l.chainType==="ethereum"?"eip155":"solana"],allowListKey:this.getAllowListKey(l.walletClientType,"connector",l.connectorType,l.chainType)})}));let b=a.find((l=>l.connectorType==="wallet_connect_v2")),T=a.find((l=>l.walletBranding.id==="walletconnect_solana"));m.filter((l=>this.listingOk(l))).forEach((l=>{var M,r,k,t;let i=[...l.chains].filter((h=>h.includes("eip155:")||h.includes("solana:")));if(a.some((h=>v.normalize(h.walletClientType)===v.normalize(l.slug)&&h.chainType==="ethereum"&&h.connectorType!=="null"))||b||l.mobile.native||l.mobile.universal||(M=he[l.slug])!=null&&M.chainTypes.includes("ethereum")||(i=i.filter((h=>!h.includes("eip155:")))),a.some((h=>v.normalize(h.walletClientType)===v.normalize(l.slug)&&h.chainType==="solana"&&h.connectorType!=="null"))||T||l.mobile.native||l.mobile.universal||(r=he[l.slug])!=null&&r.chainTypes.includes("solana")||(i=i.filter((h=>!h.includes("solana:")))),!i.length)return;let c=v.normalize(l.slug),d=Y[l.slug],p=((k=d==null?void 0:d.image_url)==null?void 0:k.sm)||((t=l.image_url)==null?void 0:t.sm);i.some((h=>h.includes("eip155:")))&&o({id:c,label:l.name||c,source:"listing",listing:l,chainType:"ethereum",icon:p,url:l.homepage,chains:i,allowListKey:this.getAllowListKey(l.slug,"listing")}),i.some((h=>h.includes("solana:")))&&o({id:c,label:l.name||c,source:"listing",listing:l,chainType:"solana",icon:p,url:l.homepage,chains:i,allowListKey:this.getAllowListKey(l.slug,"listing")})})),this.includeWalletConnectQr&&b&&o({id:"wallet_connect_qr",label:"WalletConnect",source:"connector",connector:b,chainType:"ethereum",icon:_e,url:void 0,chains:["eip155"],allowListKey:"wallet_connect_qr"}),this.includeWalletConnectQrSolana&&T&&o({id:"wallet_connect_qr_solana",label:"WalletConnect",source:"connector",connector:T,chainType:"solana",icon:_e,url:void 0,chains:["solana"],allowListKey:"wallet_connect_qr_solana"});let y=Array.from(w.values());y.forEach((l=>{var c,d;let i=Y[((c=l.listing)==null?void 0:c.slug)||l.id];(d=i==null?void 0:i.image_url)!=null&&d.sm&&(l.icon=i.image_url.sm)}));let L=new Map;return(z=this.normalizedAllowList)==null||z.forEach(((l,i)=>{L.set(v.normalize(l),i)})),{wallets:y.slice().sort(((l,i)=>{var r,k;if(l.allowListKey&&i.allowListKey){let t=((r=this.normalizedAllowList)==null?void 0:r.findIndex((J=>v.normalize(J)===v.normalize(l.allowListKey))))??-1,h=((k=this.normalizedAllowList)==null?void 0:k.findIndex((J=>v.normalize(J)===v.normalize(i.allowListKey))))??-1;if(t!==h&&t>=0&&h>=0)return t-h}if(l.allowListKey&&!i.allowListKey)return-1;if(!l.allowListKey&&i.allowListKey)return 1;let c=v.normalize(l.id),d=v.normalize(i.id);c==="binance-defi"?c="binance":c==="universalprofiles"?c="universal_profile":c==="cryptocom-defi"?c="cryptocom":c==="bitkeep"&&(c="bitget_wallet"),d==="binance-defi"?d="binance":d==="universalprofiles"?d="universal_profile":d==="cryptocom-defi"?d="cryptocom":d==="bitkeep"&&(d="bitget_wallet");let p=L.has(c),M=L.has(d);return p&&M?L.get(c)-L.get(d):p?-1:M?1:l.source==="connector"&&i.source==="listing"?-1:l.source==="listing"&&i.source==="connector"?1:l.label.toLowerCase().localeCompare(i.label.toLowerCase())})),walletCount:y.length}}constructor(a,m){var w,o,b,T,y;this.chainFilter=a,m&&m.length>0&&(this.normalizedAllowList=m.map(String),this.normalizedAllowList.includes("binance")&&this.normalizedAllowList.push("binance-defi-wallet"),this.normalizedAllowList.includes("bitget_wallet")&&this.normalizedAllowList.push("bitkeep")),this.detectedEth=((w=this.normalizedAllowList)==null?void 0:w.includes("detected_ethereum_wallets"))??!1,this.detectedSol=((o=this.normalizedAllowList)==null?void 0:o.includes("detected_solana_wallets"))??!1,this.includeWalletConnect=((b=this.normalizedAllowList)==null?void 0:b.includes("wallet_connect"))??!1,this.includeWalletConnectQr=((T=this.normalizedAllowList)==null?void 0:T.includes("wallet_connect_qr"))??!1,this.includeWalletConnectQrSolana=((y=this.normalizedAllowList)==null?void 0:y.includes("wallet_connect_qr_solana"))??!1}}var ye=x=>n.jsxs("svg",{viewBox:"0 0 32 32",xmlns:"http://www.w3.org/2000/svg",...x,children:[n.jsx("path",{d:"m0 0h32v32h-32z",fill:"#5469d4"}),n.jsx("path",{d:"m15.997 5.333-.143.486v14.106l.143.143 6.548-3.87z",fill:"#c2ccf4"}),n.jsx("path",{d:"m15.996 5.333-6.548 10.865 6.548 3.87z",fill:"#fff"}),n.jsx("path",{d:"m15.997 21.306-.08.098v5.025l.08.236 6.552-9.227z",fill:"#c2ccf4"}),n.jsx("path",{d:"m15.996 26.665v-5.36l-6.548-3.867z",fill:"#fff"}),n.jsx("path",{d:"m15.995 20.07 6.548-3.87-6.548-2.976v6.847z",fill:"#8698e8"}),n.jsx("path",{d:"m9.448 16.2 6.548 3.87v-6.846z",fill:"#c2ccf4"})]}),ve=x=>n.jsxs("svg",{viewBox:"0 0 32 32",xmlns:"http://www.w3.org/2000/svg",...x,children:[n.jsxs("linearGradient",{id:"a",gradientUnits:"userSpaceOnUse",x1:"7.233",x2:"24.766",y1:"24.766",y2:"7.234",children:[n.jsx("stop",{offset:"0",stopColor:"#9945ff"}),n.jsx("stop",{offset:".2",stopColor:"#7962e7"}),n.jsx("stop",{offset:"1",stopColor:"#00d18c"})]}),n.jsx("path",{d:"m0 0h32v32h-32z",fill:"#10111a"}),n.jsx("path",{clipRule:"evenodd",d:"m9.873 20.41a.645.645 0 0 1 .476-.21l14.662.012a.323.323 0 0 1 .238.54l-3.123 3.438a.643.643 0 0 1 -.475.21l-14.662-.012a.323.323 0 0 1 -.238-.54zm15.376-2.862a.322.322 0 0 1 -.238.54l-14.662.012a.642.642 0 0 1 -.476-.21l-3.122-3.44a.323.323 0 0 1 .238-.54l14.662-.012a.644.644 0 0 1 .475.21zm-15.376-9.738a.644.644 0 0 1 .476-.21l14.662.012a.322.322 0 0 1 .238.54l-3.123 3.438a.643.643 0 0 1 -.475.21l-14.662-.012a.323.323 0 0 1 -.238-.54z",fill:"url(#a)",fillRule:"evenodd"})]});W.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;W.button`
  padding: 0.25rem;
  height: 30px;
  width: 30px;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--privy-border-radius-full);
  background: var(--privy-color-background-2);
`;const sn=W.div`
  position: relative;
  display: inline-flex;
  align-items: center;

  &::after {
    content: ' ';
    border-radius: var(--privy-border-radius-full);
    height: 6px;
    width: 6px;
    background-color: var(--privy-color-icon-success);
    position: absolute;
    right: -3px;
    top: -3px;
  }
`,ne=W.img`
  width: 32px;
  height: 32px;
  border-radius: 0.25rem;
  object-fit: contain;
`,cn=W.span`
  display: flex;
  gap: 0.25rem;
  align-items: center;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.125rem; /* 150% */
  border-radius: var(--privy-border-radius-sm);
  background-color: var(--privy-color-background-2);

  svg {
    width: 100%;
    max-width: 1rem;
    max-height: 1rem;
    stroke-width: 2;
  }
`;W.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 24rem;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-gutter: stable both-edges;
  scrollbar-width: none;
  -ms-overflow-style: none;

  ${x=>x.$colorScheme==="light"?"background: linear-gradient(var(--privy-color-background), var(--privy-color-background) 70%) bottom, linear-gradient(rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0.06)) bottom;":x.$colorScheme==="dark"?"background: linear-gradient(var(--privy-color-background), var(--privy-color-background) 70%) bottom, linear-gradient(rgba(255, 255, 255, 0) 20%, rgba(255, 255, 255, 0.06)) bottom;":void 0}

  background-repeat: no-repeat;
  background-size:
    100% 32px,
    100% 16px;
  background-attachment: local, scroll;
`;function dn({enabled:x=!0,walletList:a,walletChainType:m}){var k;let w=ge(),{connectors:o}=we(),{listings:b,loading:T}=Oe(x),y=m??w.appearance.walletChainType,L=a??((k=w.appearance)==null?void 0:k.walletList),z=C.useMemo((()=>new v(y,L)),[y,L]),{wallets:l,walletCount:i}=C.useMemo((()=>z.getWallets(o,b)),[z,o,b]),[c,d]=C.useState(""),p=C.useMemo((()=>c?l.filter((t=>t.label.toLowerCase().includes(c.toLowerCase()))):l),[c,l]),[M,r]=C.useState();return{selected:M,setSelected:r,search:c,setSearch:d,loadingListings:T,wallets:p,walletCount:i}}let ce=x=>!x||typeof x!="string"&&(x instanceof Ee||x instanceof Me);const un=({index:x,style:a,data:m,recent:w})=>{var z,l;let o=m.wallets[x],{walletChainType:b,handleWalletClick:T}=m,{t:y}=fe(),L={...a,boxSizing:"border-box"};return o?n.jsxs(de,{style:L,onClick:()=>T(o),children:[o.icon&&(o.connector&&!ce(o.connector)?n.jsx(sn,{children:typeof o.icon=="string"?n.jsx(ne,{src:o.icon}):n.jsx(o.icon,{style:{width:"32px",height:"32px"}})}):typeof o.icon=="string"?n.jsx(ne,{src:o.icon}):n.jsx(o.icon,{style:{width:"32px",height:"32px"}})),n.jsx(ue,{children:o.label}),w?n.jsxs(n.Fragment,{children:[n.jsx(cn,{children:y("connectWallet.lastUsed")}),n.jsx(pe,{children:n.jsxs(n.Fragment,{children:[b==="ethereum-only"&&n.jsx(ye,{}),b==="solana-only"&&n.jsx(ve,{})]})})]}):n.jsx(pe,{children:!(b==="ethereum-only"||b==="solana-only")&&n.jsxs(n.Fragment,{children:[((z=o.chains)==null?void 0:z.some((i=>i.startsWith("eip155"))))&&n.jsx(ye,{}),((l=o.chains)==null?void 0:l.some((i=>i.startsWith("solana"))))&&n.jsx(ve,{})]})})]}):null};var Ln=({className:x,customDescription:a,connectOnly:m,preSelectedWalletId:w,hideHeader:o,...b})=>{var je;let T=ge(),{t:y}=fe(),{connectors:L}=we(),z=b.walletChainType||T.appearance.walletChainType,l=b.walletList||((je=T.appearance)==null?void 0:je.walletList),{onBack:i,onClose:c,app:d}=b,{selected:p,setSelected:M,qrUrl:r,setQrUrl:k,connecting:t,uiState:h,errorCode:J,wallets:le,walletCount:me,handleConnect:I,handleBack:Be,showSearchBar:Ue,isInitialConnectView:V,title:Ie,search:Ne,setSearch:qe}=(function({onConnect:e,onBack:B,onClose:Z,onConnectError:$,walletList:O,walletChainType:ie,app:ae}){let Q=ge(),{connectors:oe}=we(),{t:U}=fe(),{wallets:re,walletCount:X,search:ee,setSearch:u,selected:S,setSelected:A}=dn({enabled:Re(O??[]),walletList:O,walletChainType:ie}),[F,D]=C.useState(),[$e,R]=C.useState(),[K,Ce]=C.useState(),[s,G]=C.useState(),Te=!S&&!K&&!s,Fe=Te&&(X>6||ee.length>0),se=oe.find((j=>j.connectorType==="wallet_connect_v2")),De=C.useCallback((async(j,f)=>{var ke,Le;if(!j)return;let P=(f==null?void 0:f.name)??"Wallet";if((s==null?void 0:s.connector)!==j||F!=="loading"){if(D("loading"),typeof j=="string")return E.debug("Connecting wallet via deeplink",{wallet:P,url:j.length>80?`${j.slice(0,80)}...`:j}),G({connector:j,name:P,icon:f==null?void 0:f.icon,id:f==null?void 0:f.id,url:f==null?void 0:f.url}),void window.open(j,"_blank");E.debug("Connecting wallet via connector",{wallet:P,connectorType:j.connectorType}),G({connector:j,name:(f==null?void 0:f.name)??j.walletBranding.name??"Wallet",icon:(f==null?void 0:f.icon)??j.walletBranding.icon,id:f==null?void 0:f.id,url:f==null?void 0:f.url});try{let g=await j.connect({showPrompt:!0});if(!g)return E.warn("Wallet connection returned null",{wallet:P,connectorType:j.connectorType}),D("error"),R(void 0),void($==null?void 0:$(new ze("Unable to connect wallet")));E.debug("Wallet connection successful",{wallet:P,connectorType:j.connectorType}),D("success"),R(void 0),Ve({address:g.address,client:g.walletClientType,appId:Q.id}),setTimeout((()=>{e({connector:j,wallet:g})}),Ge)}catch(g){if((ke=g==null?void 0:g.message)!=null&&ke.includes("already pending for origin")||(Le=g==null?void 0:g.message)!=null&&Le.includes("wallet_requestPermissions"))return void E.debug("Connection request already pending, maintaining loading state",{wallet:P});let Qe=g instanceof Error?g.message:String((g==null?void 0:g.message)||"Unknown error");E.error("Wallet connection failed",g,{wallet:P,connectorType:j.connectorType,errorCode:g==null?void 0:g.privyErrorCode}),D("error"),R(g==null?void 0:g.privyErrorCode),$==null||$(g instanceof Error?g:new ze(Qe||"Unable to connect wallet"))}}else E.debug("Duplicate connection attempt prevented",{wallet:P})}),[Q.id,e,s,F]),Ke=C.useCallback((()=>K?(D(void 0),R(void 0),G(void 0),void Ce(void 0)):s?(D(void 0),R(void 0),void G(void 0)):S?(D(void 0),R(void 0),G(void 0),void A(void 0)):F==="error"||F==="loading"?(D(void 0),R(void 0),void G(void 0)):void(B==null?void 0:B())),[K,s,S,F,B]),Pe=C.useMemo((()=>(s==null?void 0:s.connector)===se&&K&&_.isMobile&&(s!=null&&s.name)?U("connectWallet.goToWallet",{walletName:s.name}):(s==null?void 0:s.connector)===se&&K&&(s!=null&&s.name)?U("connectWallet.scanToConnect",{walletName:s.name}):K&&(s!=null&&s.name)?U(_.isMobile?"connectWallet.goToWallet":"connectWallet.scanToConnect",{walletName:s.name}):typeof(s==null?void 0:s.connector)=="string"?U("connectWallet.openOrInstall",{walletName:s.name}):S&&!s?U("connectWallet.selectNetwork"):s?null:U("connectWallet.selectYourWallet")),[s,K,S,se,U]);return{selected:S,setSelected:A,qrUrl:K,setQrUrl:Ce,connecting:s,uiState:F,errorCode:$e,search:ee,setSearch:u,wallets:re,walletCount:X,wc:se,isInitialConnectView:Te,showSearchBar:Fe,title:Pe,handleConnect:De,handleBack:Ke,onClose:Z,onConnect:e,app:ae}})({...b,walletList:l,walletChainType:z}),N=L.find((e=>e.connectorType==="wallet_connect_v2")),q=L.find((e=>e.walletBranding.id==="walletconnect_solana")),be=C.useRef(null),xe=He({count:le.length,getScrollElement:()=>be.current,estimateSize:()=>56,overscan:6,gap:5}),te=C.useCallback((async e=>{var oe,U,re,X,ee;let B=z!=="solana-only"&&((oe=e.chains)==null?void 0:oe.some((u=>u.startsWith("eip155")))),Z=z!=="ethereum-only"&&((U=e.chains)==null?void 0:U.some((u=>u.startsWith("solana")))),$=()=>{let u=e.id;return he[u]||he[`${u}_wallet`]},O=u=>{let S=v.normalize(e.id);return L.find((A=>v.normalize(A.walletClientType)===S&&A.chainType===u&&!(A.chainType==="ethereum"&&A instanceof Ee||A.chainType==="solana"&&A instanceof Me)))},ie=async()=>{if(!N||!e.listing)return!1;let u=Y[e.listing.slug]?{...e.listing,...Y[e.listing.slug]}:e.listing;return N.setWalletEntry(u,k),await N.resetConnection(e.id),await I(N,{name:e.label,icon:e.icon,id:e.id,url:e.url}),!0},ae=async()=>!!q&&!!e.listing&&(await q.disconnect(),q.wallet.setWalletEntry(e.listing,k),await new Promise((u=>setTimeout(u,100))),await I(q,{name:e.label,icon:e.icon,id:e.id,url:e.url}),!0),Q=async u=>{let S=(A=>{let F=$();if(F)return F.getMobileRedirect({isSolana:A,connectOnly:!!m,useUniversalLink:!1})})(u);return!!S&&(await I(S,{name:e.label,icon:e.icon,id:e.id,url:e.url}),!0)};if(B&&Z)M(e);else{if(B&&!Z){let u=O("ethereum");if(u&&!ce(u))return E.debug("Attempting injected EVM connection",{wallet:e.id,connectorType:u.connectorType}),void await I(u,{name:e.label,icon:e.icon,id:e.id,url:e.url});if(_.isMobile&&$()){if(await Q(!1)||await ie())return}else if(await ie()||await Q(!1))return}if(Z&&!B){let u=O("solana");if(u&&!ce(u))return E.debug("Attempting injected Solana connection",{wallet:e.id,connectorType:u.connectorType}),void await I(u,{name:e.label,icon:e.icon,id:e.id,url:e.url});if(_.isMobile){if(await Q(!0)||await ae())return}else if(await ae()||await Q(!0))return}if(!ce(e.connector)){if(E.debug("Using fallback direct connector",{wallet:e.id,connectorType:(re=e.connector)==null?void 0:re.connectorType}),N&&((X=e.connector)==null?void 0:X.connectorType)==="wallet_connect_v2")if(await N.resetConnection(e.id),e.id!=="wallet_connect_qr"&&e.listing){let u=Y[e.listing.slug]?{...e.listing,...Y[e.listing.slug]}:e.listing;N.setWalletEntry(u,k)}else N.setWalletEntry({id:"wallet_connect_qr",name:"WalletConnect",rdns:"",slug:"wallet-connect",homepage:"",chains:["eip155"],mobile:{native:"",universal:void 0}},k);return q&&((ee=e.connector)==null?void 0:ee.walletBranding.id)==="walletconnect_solana"&&(await q.disconnect(),e.id!=="wallet_connect_qr_solana"&&e.listing?q.wallet.setWalletEntry(e.listing,k):q.wallet.setWalletEntry({id:"wallet_connect_solana_qr",name:"WalletConnect",rdns:"",slug:"wallet-connect-solana",homepage:"",chains:["solana"],mobile:{native:"",universal:void 0}},k),await new Promise((u=>setTimeout(u,100)))),void await I(e.connector,{name:e.label,icon:e.icon,id:e.id,url:e.url})}e.url?await I(e.url,{name:e.label,icon:e.icon,id:e.id,url:e.url}):E.warn("No available connection method for wallet",{wallet:e.id})}}),[N,q,I,M,k,z,m,L]);return C.useEffect((()=>{if(!w)return;let e=le.find((({id:B})=>B===w));e&&te(e).catch(console.error)}),[w]),n.jsxs(H,{className:x,children:[n.jsx(H.Header,{icon:o&&V?void 0:t&&!r||r&&_.isMobile&&(t!=null&&t.icon)?t.icon:t?void 0:an,iconVariant:t&&!r||r&&_.isMobile?"loading":void 0,iconLoadingStatus:t&&!r||r&&_.isMobile?{success:h==="success",fail:h==="error"}:void 0,title:o&&V?void 0:t&&!r?y("connectWallet.waitingForWallet",{walletName:t.name}):r&&_.isMobile?y("connectWallet.waitingForWallet",{walletName:(t==null?void 0:t.name)??"connection"}):Ie,subtitle:o&&V?void 0:t&&!r&&typeof t.connector=="string"?y("connectWallet.installAndConnect",{walletName:t.name}):t&&!r&&typeof t.connector!="string"?h==="error"?J===Ye.NO_SOLANA_ACCOUNTS?`The connected wallet has no Solana accounts. Please add a Solana account in ${t.name} and try again.`:y("connectWallet.tryConnectingAgain"):y("connectionStatus.connectOneWallet"):V?a??(d?y("connectWallet.connectToAccount",{appName:d.name}):null):null,showBack:!!i||!V,showClose:!0,onBack:i||Be,onClose:c}),n.jsxs(H.Body,{ref:be,$colorScheme:T.appearance.palette.colorScheme,style:{marginBottom:r?"0.5rem":void 0},children:[Ue&&n.jsx(hn,{children:n.jsxs(tn,{style:{background:"transparent"},children:[n.jsx(Je,{children:n.jsx(rn,{})}),n.jsx("input",{className:"login-method-button",type:"text",placeholder:y("connectWallet.searchPlaceholder",{count:String(me)}),onChange:e=>qe(e.target.value),value:Ne})]})}),r&&_.isMobile&&h==="loading"&&n.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"1rem"},children:[n.jsx(Se,{variant:"primary",onClick:()=>window.open(r.universal??r.native,"_blank"),style:{width:"100%"},children:y("connectWallet.openInApp")}),n.jsx(Ae,{value:r.universal??r.native,iconOnly:!0,children:"Copy link"})]}),r&&!_.isMobile&&h==="loading"&&n.jsx("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"1rem"},children:n.jsx(Ae,{value:r.universal??r.native,iconOnly:!0,children:y("connectWallet.copyLink")})}),r&&!_.isMobile&&n.jsx(ln,{size:280,url:r.universal??r.native,squareLogoElement:t!=null&&t.icon?typeof t.icon=="string"?e=>n.jsx("svg",{...e,children:n.jsx("image",{href:t.icon,height:e.height,width:e.width})}):t.icon:Ze}),r&&!_.isMobile&&(t==null?void 0:t.url)&&(t.id==="binance"||t.id==="binanceus"||t.id==="binance-defi")&&n.jsxs(gn,{children:[n.jsxs("span",{children:["Don't have ",t.name,"? "]}),n.jsx(nn,{href:t.url,target:"_blank",size:"sm",children:"Download here"})]}),n.jsxs(pn,{children:[t&&!r&&typeof t.connector=="string"&&n.jsxs(de,{onClick:()=>window.open(t.connector,"_blank"),children:[t.icon&&(typeof t.icon=="string"?n.jsx(ne,{src:t.icon}):n.jsx(t.icon,{})),n.jsx(ue,{children:t.name})]}),(p==null?void 0:p.chains.some((e=>e.startsWith("eip155"))))&&!t&&n.jsxs(de,{onClick:()=>te({...p,chains:p.chains.filter((e=>e.startsWith("eip155")))}),children:[p.icon&&(typeof p.icon=="string"?n.jsx(ne,{src:p.icon}):n.jsx(p.icon,{})),n.jsx(ue,{children:p.label}),n.jsx(pe,{children:n.jsx(ye,{})})]}),(p==null?void 0:p.chains.some((e=>e.startsWith("solana"))))&&!t&&n.jsxs(de,{onClick:()=>te({...p,chains:p.chains.filter((e=>e.startsWith("solana")))}),children:[p.icon&&(typeof p.icon=="string"?n.jsx(ne,{src:p.icon}):n.jsx(p.icon,{})),n.jsx(ue,{children:p.label}),n.jsx(pe,{children:n.jsx(ve,{})})]}),V&&n.jsxs(n.Fragment,{children:[!(me>0)&&n.jsx(mn,{children:y("connectWallet.noWalletsFound")}),me>0&&!r&&n.jsx("div",{style:{maxHeight:56*Math.min(le.length,5)+5,width:"100%"},children:n.jsx("div",{style:{height:`${xe.getTotalSize()}px`,width:"100%",position:"relative"},children:xe.getVirtualItems().map((e=>n.jsx(un,{index:e.index,style:{position:"absolute",top:0,left:0,height:`${e.size}px`,transform:`translateY(${e.start}px)`},data:{wallets:le,walletChainType:z,handleWalletClick:te}},e.key)))})})]})]})]}),n.jsxs(H.Footer,{children:[t&&!r&&typeof t.connector!="string"&&h==="error"&&n.jsx(H.Actions,{children:n.jsx(Se,{style:{width:"100%",alignItems:"center"},variant:"error",onClick:()=>I(t.connector,{name:t.name,icon:t.icon,id:t.id,url:t.url}),children:y("connectWallet.retry")})}),!!(d&&d.legal.privacyPolicyUrl&&d.legal.termsAndConditionsUrl)&&n.jsx(Xe,{app:d,alwaysShowImplicitConsent:!0}),n.jsx(H.Watermark,{})]})]})};let hn=W.div`
  position: sticky;
  // Offset by negative margin to account for focus outline
  margin-top: -3px;
  padding-top: 3px;
  top: -3px;
  z-index: 1;
  background: var(--privy-color-background);
  padding-bottom: calc(var(--screen-space) / 2);
`,pn=W.div`
  display: flex;
  flex-direction: column;
  gap: ${5}px;
`,de=W.button`
  && {
    gap: 0.5rem;
    align-items: center;
    display: flex;
    position: relative;
    text-align: left;
    font-weight: 500;
    transition: background 200ms ease-in;
    width: calc(100% - 4px);
    border-radius: var(--privy-border-radius-md);
    padding: 0.75em;
    border: 1px solid var(--privy-color-foreground-4);
    justify-content: space-between;
  }

  &:hover {
    background: var(--privy-color-background-2);
  }
`,pe=W.span`
  display: flex;
  align-items: center;
  justify-content: end;
  position: relative;

  & > svg {
    border-radius: var(--privy-border-radius-full);
    stroke-width: 2.5;
    width: 100%;
    max-height: 1rem;
    max-width: 1rem;
    flex-shrink: 0;
  }

  & > svg:not(:last-child) {
    border-radius: var(--privy-border-radius-full);
    margin-right: -0.375rem;
  }
`,mn=W.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`,ue=W.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--privy-color-foreground);
  font-weight: 400;
  flex: 1;
`,Ae=W(en)`
  && {
    margin: 0.5rem auto 0 auto;
  }
`,gn=W.div`
  text-align: center;
  margin-top: 1rem;
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--privy-color-foreground-3);
`;export{Ln as G,v as O,dn as V,un as Y};
