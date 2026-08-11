import{d as C,r as i}from"./app-DBWEUfrx.js";var u={exports:{}},s={};/**
 * @license React
 * react-compiler-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var c;function E(){if(c)return s;c=1;var r=C().__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;return s.c=function(e){return r.H.useMemoCache(e)},s}var m;function h(){return m||(m=1,u.exports=E()),u.exports}var A=h();/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=r=>r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),p=(...r)=>r.filter((e,t,o)=>!!e&&e.trim()!==""&&o.indexOf(e)===t).join(" ").trim();/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var w={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=i.forwardRef(({color:r="currentColor",size:e=24,strokeWidth:t=2,absoluteStrokeWidth:o,className:a="",children:n,iconNode:l,...R},d)=>i.createElement("svg",{ref:d,...w,width:e,height:e,stroke:r,strokeWidth:o?Number(t)*24/Number(e):t,className:p("lucide",a),...R},[...l.map(([_,f])=>i.createElement(_,f)),...Array.isArray(n)?n:[n]]));/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=(r,e)=>{const t=i.forwardRef(({className:o,...a},n)=>i.createElement(x,{ref:n,iconNode:e,className:p(`lucide-${v(r)}`,o),...a}));return t.displayName=`${r}`,t};export{A as a,g as c};
