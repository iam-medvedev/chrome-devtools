var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/third_party/lighthouse/report-assets/report-generator.mjs
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.Lighthouse = root.Lighthouse || {};
    root.Lighthouse.ReportGenerator = factory();
    root.Lighthouse.ReportGenerator.ReportGenerator = root.Lighthouse.ReportGenerator;
  }
})(typeof self !== "undefined" ? self : void 0, function() {
  "use strict";
  var umdExports = (() => {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))
          if (!__hasOwnProp.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps(__defProp2({}, "__esModule", { value: true }), mod);
    var report_generator_exports = {};
    __export2(report_generator_exports, {
      ReportGenerator: () => ReportGenerator
    });
    var flowReportAssets = {};
    var REPORT_TEMPLATE = `<!--
@license
Copyright 2018 Google LLC
SPDX-License-Identifier: Apache-2.0
-->
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">
  <link rel="icon" href='data:image/svg+xml;utf8,<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="m14 7 10-7 10 7v10h5v7h-5l5 24H9l5-24H9v-7h5V7Z" fill="%23F63"/><path d="M31.561 24H14l-1.689 8.105L31.561 24ZM18.983 48H9l1.022-4.907L35.723 32.27l1.663 7.98L18.983 48Z" fill="%23FFA385"/><path fill="%23FF3" d="M20.5 10h7v7h-7z"/></svg>'>
  <title>Lighthouse Report</title>
  <style>body {margin: 0}</style>
</head>
<body>
  <noscript>Lighthouse report requires JavaScript. Please enable.</noscript>

  <div id="lh-log"></div>

  <script>window.__LIGHTHOUSE_JSON__ = %%LIGHTHOUSE_JSON%%;<\/script>
  <script>%%LIGHTHOUSE_JAVASCRIPT%%
  __initLighthouseReport__();
  //# sourceURL=compiled-reportrenderer.js
  <\/script>
  <script>console.log('window.__LIGHTHOUSE_JSON__', __LIGHTHOUSE_JSON__);<\/script>
</body>
</html>
`;
    var REPORT_JAVASCRIPT = '"use strict";(()=>{function e({median:e,p10:t},n){if(e<=0)throw new Error("median must be greater than zero");if(t<=0)throw new Error("p10 must be greater than zero");if(t>=e)throw new Error("p10 must be less than the median");if(n<=0)return 1;let r,i=Math.max(Number.MIN_VALUE,n/e),a=Math.log(i),o=Math.max(Number.MIN_VALUE,t/e),l=(1-function(e){let t=Math.sign(e),n=1/(1+.3275911*(e=Math.abs(e)));return t*(1-n*(.254829592+n*(n*(1.421413741+n*(1.061405429*n-1.453152027))-.284496736))*Math.exp(-e*e))}(.9061938024368232*a/-Math.log(o)))/2;return r=n<=t?Math.max(.9,Math.min(1,l)):n<=e?Math.max(.5,Math.min(.8999999999999999,l)):Math.max(0,Math.min(.49999999999999994,l)),r}var t="\u2026",n={PASS:{label:"pass",minScore:.9},AVERAGE:{label:"average",minScore:.5},FAIL:{label:"fail"},ERROR:{label:"error"}},r=["com","co","gov","edu","ac","org","go","gob","or","net","in","ne","nic","gouv","web","spb","blog","jus","kiev","mil","wi","qc","ca","bel","on"],i=class i{static get RATINGS(){return n}static get PASS_THRESHOLD(){return.9}static get MS_DISPLAY_VALUE(){return"%10d\xA0ms"}static getFinalDisplayedUrl(e){if(e.finalDisplayedUrl)return e.finalDisplayedUrl;if(e.finalUrl)return e.finalUrl;throw new Error("Could not determine final displayed URL")}static getMainDocumentUrl(e){return e.mainDocumentUrl||e.finalUrl}static getFullPageScreenshot(e){return e.fullPageScreenshot?e.fullPageScreenshot:e.audits["full-page-screenshot"]?.details}static getEntityFromUrl(e,t){return t&&t.find((t=>t.origins.find((t=>e.startsWith(t)))))||i.getPseudoRootDomain(e)}static splitMarkdownCodeSpans(e){let t=[],n=e.split(/`(.*?)`/g);for(let e=0;e<n.length;e++){let r=n[e];if(!r)continue;let i=e%2!=0;t.push({isCode:i,text:r})}return t}static splitMarkdownLink(e){let t=[],n=e.split(/\\[([^\\]]+?)\\]\\((https?:\\/\\/.*?)\\)/g);for(;n.length;){let[e,r,i]=n.splice(0,3);e&&t.push({isLink:!1,text:e}),r&&i&&t.push({isLink:!0,text:r,linkHref:i})}return t}static truncate(e,t,n="\u2026"){if(e.length<=t)return e;let r=new Intl.Segmenter(void 0,{granularity:"grapheme"}).segment(e)[Symbol.iterator](),i=0;for(let a=0;a<=t-n.length;a++){let t=r.next();if(t.done)return e;i=t.value.index}for(let t=0;t<n.length;t++)if(r.next().done)return e;return e.slice(0,i)+n}static getURLDisplayName(e,n){let r,i=void 0!==(n=n||{numPathParts:void 0,preserveQuery:void 0,preserveHost:void 0}).numPathParts?n.numPathParts:2,a=void 0===n.preserveQuery||n.preserveQuery,o=n.preserveHost||!1;if("about:"===e.protocol||"data:"===e.protocol)r=e.href;else{r=e.pathname;let n=r.split("/").filter((e=>e.length));i&&n.length>i&&(r=t+n.slice(-1*i).join("/")),o&&(r=`${e.host}/${r.replace(/^\\//,"")}`),a&&(r=`${r}${e.search}`)}if("data:"!==e.protocol&&(r=r.slice(0,200),r=r.replace(/([a-f0-9]{7})[a-f0-9]{13}[a-f0-9]*/g,`$1${t}`),r=r.replace(/([a-zA-Z0-9-_]{9})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9-_]{10,}/g,`$1${t}`),r=r.replace(/(\\d{3})\\d{6,}/g,`$1${t}`),r=r.replace(/\\u2026+/g,t),r.length>64&&r.includes("?")&&(r=r.replace(/\\?([^=]*)(=)?.*/,`?$1$2${t}`),r.length>64&&(r=r.replace(/\\?.*/,`?${t}`)))),r.length>64){let e=r.lastIndexOf(".");r=e>=0?r.slice(0,63-(r.length-e))+`${t}${r.slice(e)}`:r.slice(0,63)+t}return r}static getChromeExtensionOrigin(e){let t=new URL(e);return t.protocol+"//"+t.host}static parseURL(e){let t=new URL(e);return{file:i.getURLDisplayName(t),hostname:t.hostname,origin:"chrome-extension:"===t.protocol?i.getChromeExtensionOrigin(e):t.origin}}static createOrReturnURL(e){return e instanceof URL?e:new URL(e)}static getPseudoTld(e){let t=e.split(".").slice(-2);return r.includes(t[0])?`.${t.join(".")}`:`.${t[t.length-1]}`}static getPseudoRootDomain(e){let t=i.createOrReturnURL(e).hostname,n=i.getPseudoTld(t).split(".");return t.split(".").slice(-n.length).join(".")}static filterRelevantLines(e,t,n){if(0===t.length)return e.slice(0,2*n+1);let r=new Set;return(t=t.sort(((e,t)=>(e.lineNumber||0)-(t.lineNumber||0)))).forEach((({lineNumber:e})=>{let t=e-n,i=e+n;for(;t<1;)t++,i++;r.has(t-3-1)&&(t-=3);for(let e=t;e<=i;e++){let t=e;r.add(t)}})),e.filter((e=>r.has(e.lineNumber)))}static computeLogNormalScore(t,n){let r=e(t,n);return r>.9&&(r+=.05*(r-.9)),Math.floor(100*r)/100}};var a=class{constructor(e,t){this._document=e,this._lighthouseChannel="unknown",this._componentCache=new Map,this.rootEl=t,this._swappableSections=new WeakMap,this._onSwap=()=>{},this._onSwapHook=()=>{}}createElement(e,t){let n=this._document.createElement(e);if(t)for(let e of t.split(/\\s+/))e&&n.classList.add(e);return n}createElementNS(e,t,n){let r=this._document.createElementNS(e,t);if(n)for(let e of n.split(/\\s+/))e&&r.classList.add(e);return r}createSVGElement(e,t){return this._document.createElementNS("http://www.w3.org/2000/svg",e,t)}createFragment(){return this._document.createDocumentFragment()}createTextNode(e){return this._document.createTextNode(e)}createChildOf(e,t,n){let r=this.createElement(t,n);return e.append(r),r}createComponent(e){let t=this._componentCache.get(e);if(t){let e=t.cloneNode(!0);return this.findAll("style",e).forEach((e=>e.remove())),e}return t=function(e,t){switch(t){case"3pFilter":return function(e){let t=e.createFragment(),n=e.createElement("style");n.append("\\n    .lh-3p-filter {\\n      color: var(--color-gray-600);\\n      float: right;\\n      padding: 6px var(--stackpack-padding-horizontal);\\n    }\\n    .lh-3p-filter-label, .lh-3p-filter-input {\\n      vertical-align: middle;\\n      user-select: none;\\n    }\\n    .lh-3p-filter-input:disabled + .lh-3p-ui-string {\\n      text-decoration: line-through;\\n    }\\n  "),t.append(n);let r=e.createElement("div","lh-3p-filter"),i=e.createElement("label","lh-3p-filter-label"),a=e.createElement("input","lh-3p-filter-input");a.setAttribute("type","checkbox"),a.setAttribute("checked","");let o=e.createElement("span","lh-3p-ui-string");o.append("Show 3rd party resources");let l=e.createElement("span","lh-3p-filter-count");return i.append(" ",a," ",o," (",l,") "),r.append(" ",i," "),t.append(r),t}(e);case"audit":return function(e){let t=e.createFragment(),n=e.createElement("div","lh-audit"),r=e.createElement("details","lh-expandable-details"),i=e.createElement("summary"),a=e.createElement("div","lh-audit__header lh-expandable-details__summary"),o=e.createElement("span","lh-audit__score-icon"),l=e.createElement("span","lh-audit__title-and-text"),s=e.createElement("span","lh-audit__title"),c=e.createElement("span","lh-audit__display-text");l.append(" ",s," ",c," ");let d=e.createElement("div","lh-chevron-container");a.append(" ",o," ",l," ",d," "),i.append(" ",a," ");let h=e.createElement("div","lh-audit__description"),p=e.createElement("div","lh-audit__stackpacks");return r.append(" ",i," ",h," ",p," "),n.append(" ",r," "),t.append(n),t}(e);case"categoryHeader":return function(e){let t=e.createFragment(),n=e.createElement("div","lh-category-header"),r=e.createElement("div","lh-score__gauge");r.setAttribute("role","heading"),r.setAttribute("aria-level","2");let i=e.createElement("div","lh-category-header__description");return n.append(" ",r," ",i," "),t.append(n),t}(e);case"chevron":return function(e){let t=e.createFragment(),n=e.createElementNS("http://www.w3.org/2000/svg","svg","lh-chevron");n.setAttribute("viewBox","0 0 100 100");let r=e.createElementNS("http://www.w3.org/2000/svg","g","lh-chevron__lines"),i=e.createElementNS("http://www.w3.org/2000/svg","path","lh-chevron__line lh-chevron__line-left");i.setAttribute("d","M10 50h40");let a=e.createElementNS("http://www.w3.org/2000/svg","path","lh-chevron__line lh-chevron__line-right");return a.setAttribute("d","M90 50H50"),r.append(" ",i," ",a," "),n.append(" ",r," "),t.append(n),t}(e);case"clump":return function(e){let t=e.createFragment(),n=e.createElement("div","lh-audit-group"),r=e.createElement("details","lh-clump"),i=e.createElement("summary"),a=e.createElement("div","lh-audit-group__summary"),o=e.createElement("div","lh-audit-group__header"),l=e.createElement("span","lh-audit-group__title"),s=e.createElement("span","lh-audit-group__itemcount");o.append(" ",l," ",s," "," "," ");let c=e.createElement("div","lh-clump-toggle"),d=e.createElement("span","lh-clump-toggletext--show"),h=e.createElement("span","lh-clump-toggletext--hide");return c.append(" ",d," ",h," "),a.append(" ",o," ",c," "),i.append(" ",a," "),r.append(" ",i," "),n.append(" "," ",r," "),t.append(n),t}(e);case"crc":return function(e){let t=e.createFragment(),n=e.createElement("div","lh-crc-container"),r=e.createElement("style");r.append(\'\\n      .lh-crc .lh-tree-marker {\\n        width: 12px;\\n        height: 26px;\\n        display: block;\\n        float: left;\\n        background-position: top left;\\n      }\\n      .lh-crc .lh-horiz-down {\\n        background: url(\\\'data:image/svg+xml;utf8,<svg width="16" height="26" viewBox="0 0 16 26" xmlns="http://www.w3.org/2000/svg"><g fill="%23D8D8D8" fill-rule="evenodd"><path d="M16 12v2H-2v-2z"/><path d="M9 12v14H7V12z"/></g></svg>\\\');\\n      }\\n      .lh-crc .lh-right {\\n        background: url(\\\'data:image/svg+xml;utf8,<svg width="16" height="26" viewBox="0 0 16 26" xmlns="http://www.w3.org/2000/svg"><path d="M16 12v2H0v-2z" fill="%23D8D8D8" fill-rule="evenodd"/></svg>\\\');\\n      }\\n      .lh-crc .lh-up-right {\\n        background: url(\\\'data:image/svg+xml;utf8,<svg width="16" height="26" viewBox="0 0 16 26" xmlns="http://www.w3.org/2000/svg"><path d="M7 0h2v14H7zm2 12h7v2H9z" fill="%23D8D8D8" fill-rule="evenodd"/></svg>\\\');\\n      }\\n      .lh-crc .lh-vert-right {\\n        background: url(\\\'data:image/svg+xml;utf8,<svg width="16" height="26" viewBox="0 0 16 26" xmlns="http://www.w3.org/2000/svg"><path d="M7 0h2v27H7zm2 12h7v2H9z" fill="%23D8D8D8" fill-rule="evenodd"/></svg>\\\');\\n      }\\n      .lh-crc .lh-vert {\\n        background: url(\\\'data:image/svg+xml;utf8,<svg width="16" height="26" viewBox="0 0 16 26" xmlns="http://www.w3.org/2000/svg"><path d="M7 0h2v26H7z" fill="%23D8D8D8" fill-rule="evenodd"/></svg>\\\');\\n      }\\n      .lh-crc .lh-crc-tree {\\n        font-size: 14px;\\n        width: 100%;\\n        overflow-x: auto;\\n      }\\n      .lh-crc .lh-crc-node {\\n        height: 26px;\\n        line-height: 26px;\\n        white-space: nowrap;\\n      }\\n      .lh-crc .lh-crc-node__longest {\\n        color: var(--color-average-secondary);\\n      }\\n      .lh-crc .lh-crc-node__tree-value {\\n        margin-left: 10px;\\n      }\\n      .lh-crc .lh-crc-node__tree-value div {\\n        display: inline;\\n      }\\n      .lh-crc .lh-crc-node__chain-duration {\\n        font-weight: 700;\\n      }\\n      .lh-crc .lh-crc-initial-nav {\\n        color: #595959;\\n        font-style: italic;\\n      }\\n      .lh-crc__summary-value {\\n        margin-bottom: 10px;\\n      }\\n    \');let i=e.createElement("div"),a=e.createElement("div","lh-crc__summary-value"),o=e.createElement("span","lh-crc__longest_duration_label"),l=e.createElement("b","lh-crc__longest_duration");a.append(" ",o," ",l," "),i.append(" ",a," ");let s=e.createElement("div","lh-crc"),c=e.createElement("div","lh-crc-initial-nav");return s.append(" ",c," "," "),n.append(" ",r," ",i," ",s," "),t.append(n),t}(e);case"crcChain":return function(e){let t=e.createFragment(),n=e.createElement("div","lh-crc-node"),r=e.createElement("span","lh-crc-node__tree-marker"),i=e.createElement("span","lh-crc-node__tree-value");return n.append(" ",r," ",i," "),t.append(n),t}(e);case"elementScreenshot":return function(e){let t=e.createFragment(),n=e.createElement("div","lh-element-screenshot"),r=e.createElement("div","lh-element-screenshot__content"),i=e.createElement("div","lh-element-screenshot__image"),a=e.createElement("div","lh-element-screenshot__mask"),o=e.createElementNS("http://www.w3.org/2000/svg","svg");o.setAttribute("height","0"),o.setAttribute("width","0");let l=e.createElementNS("http://www.w3.org/2000/svg","defs"),s=e.createElementNS("http://www.w3.org/2000/svg","clipPath");s.setAttribute("clipPathUnits","objectBoundingBox"),l.append(" ",s," "," "),o.append(" ",l," "),a.append(" ",o," ");let c=e.createElement("div","lh-element-screenshot__element-marker");return i.append(" ",a," ",c," "),r.append(" ",i," "),n.append(" ",r," "),t.append(n),t}(e);case"explodeyGauge":return function(e){let t=e.createFragment(),n=e.createElement("div","lh-exp-gauge-component"),r=e.createElement("div","lh-exp-gauge__wrapper");r.setAttribute("target","_blank");let i=e.createElement("div","lh-exp-gauge__svg-wrapper"),a=e.createElementNS("http://www.w3.org/2000/svg","svg","lh-exp-gauge"),o=e.createElementNS("http://www.w3.org/2000/svg","g","lh-exp-gauge__inner"),l=e.createElementNS("http://www.w3.org/2000/svg","circle","lh-exp-gauge__bg"),s=e.createElementNS("http://www.w3.org/2000/svg","circle","lh-exp-gauge__base lh-exp-gauge--faded"),c=e.createElementNS("http://www.w3.org/2000/svg","circle","lh-exp-gauge__arc"),d=e.createElementNS("http://www.w3.org/2000/svg","text","lh-exp-gauge__percentage");o.append(" ",l," ",s," ",c," ",d," ");let h=e.createElementNS("http://www.w3.org/2000/svg","g","lh-exp-gauge__outer"),p=e.createElementNS("http://www.w3.org/2000/svg","circle","lh-cover");h.append(" ",p," ");let g=e.createElementNS("http://www.w3.org/2000/svg","text","lh-exp-gauge__label");return g.setAttribute("text-anchor","middle"),g.setAttribute("x","0"),g.setAttribute("y","60"),a.append(" ",o," ",h," ",g," "),i.append(" ",a," "),r.append(" ",i," "),n.append(" ",r," "),t.append(n),t}(e);case"footer":return function(e){let t=e.createFragment(),n=e.createElement("style");n.append("\\n    .lh-footer {\\n      padding: var(--footer-padding-vertical) calc(var(--default-padding) * 2);\\n      max-width: var(--report-content-max-width);\\n      margin: 0 auto;\\n    }\\n    .lh-footer .lh-generated {\\n      text-align: center;\\n    }\\n  "),t.append(n);let r=e.createElement("footer","lh-footer"),i=e.createElement("ul","lh-meta__items");i.append(" ");let a=e.createElement("div","lh-generated"),o=e.createElement("b");o.append("Lighthouse");let l=e.createElement("span","lh-footer__version"),s=e.createElement("a","lh-footer__version_issue");return s.setAttribute("href","https://github.com/GoogleChrome/Lighthouse/issues"),s.setAttribute("target","_blank"),s.setAttribute("rel","noopener"),s.append("File an issue"),a.append(" "," Generated by ",o," ",l," | ",s," "),r.append(" ",i," ",a," "),t.append(r),t}(e);case"fraction":return function(e){let t=e.createFragment(),n=e.createElement("a","lh-fraction__wrapper"),r=e.createElement("div","lh-fraction__content-wrapper"),i=e.createElement("div","lh-fraction__content"),a=e.createElement("div","lh-fraction__background");i.append(" ",a," "),r.append(" ",i," ");let o=e.createElement("div","lh-fraction__label");return n.append(" ",r," ",o," "),t.append(n),t}(e);case"gauge":return function(e){let t=e.createFragment(),n=e.createElement("a","lh-gauge__wrapper"),r=e.createElement("div","lh-gauge__svg-wrapper"),i=e.createElementNS("http://www.w3.org/2000/svg","svg","lh-gauge");i.setAttribute("viewBox","0 0 120 120");let a=e.createElementNS("http://www.w3.org/2000/svg","circle","lh-gauge-base");a.setAttribute("r","56"),a.setAttribute("cx","60"),a.setAttribute("cy","60"),a.setAttribute("stroke-width","8");let o=e.createElementNS("http://www.w3.org/2000/svg","circle","lh-gauge-arc");o.setAttribute("r","56"),o.setAttribute("cx","60"),o.setAttribute("cy","60"),o.setAttribute("stroke-width","8"),i.append(" ",a," ",o," "),r.append(" ",i," ");let l=e.createElement("div","lh-gauge__percentage"),s=e.createElement("div","lh-gauge__label");return n.append(" "," ",r," ",l," "," ",s," "),t.append(n),t}(e);case"heading":return function(e){let t=e.createFragment(),n=e.createElement("style");n.append("\\n    /* CSS Fireworks. Originally by Eddie Lin\\n       https://codepen.io/paulirish/pen/yEVMbP\\n    */\\n    .lh-pyro {\\n      display: none;\\n      z-index: 1;\\n      pointer-events: none;\\n    }\\n    .lh-score100 .lh-pyro {\\n      display: block;\\n    }\\n    .lh-score100 .lh-lighthouse stop:first-child {\\n      stop-color: hsla(200, 12%, 95%, 0);\\n    }\\n    .lh-score100 .lh-lighthouse stop:last-child {\\n      stop-color: hsla(65, 81%, 76%, 1);\\n    }\\n\\n    .lh-pyro > .lh-pyro-before, .lh-pyro > .lh-pyro-after {\\n      position: absolute;\\n      width: 5px;\\n      height: 5px;\\n      border-radius: 2.5px;\\n      box-shadow: 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff;\\n      animation: 1s bang ease-out infinite backwards,  1s gravity ease-in infinite backwards,  5s position linear infinite backwards;\\n      animation-delay: 1s, 1s, 1s;\\n    }\\n\\n    .lh-pyro > .lh-pyro-after {\\n      animation-delay: 2.25s, 2.25s, 2.25s;\\n      animation-duration: 1.25s, 1.25s, 6.25s;\\n    }\\n\\n    @keyframes bang {\\n      to {\\n        opacity: 1;\\n        box-shadow: -70px -115.67px #47ebbc, -28px -99.67px #eb47a4, 58px -31.67px #7eeb47, 13px -141.67px #eb47c5, -19px 6.33px #7347eb, -2px -74.67px #ebd247, 24px -151.67px #eb47e0, 57px -138.67px #b4eb47, -51px -104.67px #479eeb, 62px 8.33px #ebcf47, -93px 0.33px #d547eb, -16px -118.67px #47bfeb, 53px -84.67px #47eb83, 66px -57.67px #eb47bf, -93px -65.67px #91eb47, 30px -13.67px #86eb47, -2px -59.67px #83eb47, -44px 1.33px #eb47eb, 61px -58.67px #47eb73, 5px -22.67px #47e8eb, -66px -28.67px #ebe247, 42px -123.67px #eb5547, -75px 26.33px #7beb47, 15px -52.67px #a147eb, 36px -51.67px #eb8347, -38px -12.67px #eb5547, -46px -59.67px #47eb81, 78px -114.67px #eb47ba, 15px -156.67px #eb47bf, -36px 1.33px #eb4783, -72px -86.67px #eba147, 31px -46.67px #ebe247, -68px 29.33px #47e2eb, -55px 19.33px #ebe047, -56px 27.33px #4776eb, -13px -91.67px #eb5547, -47px -138.67px #47ebc7, -18px -96.67px #eb47ac, 11px -88.67px #4783eb, -67px -28.67px #47baeb, 53px 10.33px #ba47eb, 11px 19.33px #5247eb, -5px -11.67px #eb4791, -68px -4.67px #47eba7, 95px -37.67px #eb478b, -67px -162.67px #eb5d47, -54px -120.67px #eb6847, 49px -12.67px #ebe047, 88px 8.33px #47ebda, 97px 33.33px #eb8147, 6px -71.67px #ebbc47;\\n      }\\n    }\\n    @keyframes gravity {\\n      from {\\n        opacity: 1;\\n      }\\n      to {\\n        transform: translateY(80px);\\n        opacity: 0;\\n      }\\n    }\\n    @keyframes position {\\n      0%, 19.9% {\\n        margin-top: 4%;\\n        margin-left: 47%;\\n      }\\n      20%, 39.9% {\\n        margin-top: 7%;\\n        margin-left: 30%;\\n      }\\n      40%, 59.9% {\\n        margin-top: 6%;\\n        margin-left: 70%;\\n      }\\n      60%, 79.9% {\\n        margin-top: 3%;\\n        margin-left: 20%;\\n      }\\n      80%, 99.9% {\\n        margin-top: 3%;\\n        margin-left: 80%;\\n      }\\n    }\\n  "),t.append(n);let r=e.createElement("div","lh-header-container"),i=e.createElement("div","lh-scores-wrapper-placeholder");return r.append(" ",i," "),t.append(r),t}(e);case"metric":return function(e){let t=e.createFragment(),n=e.createElement("div","lh-metric"),r=e.createElement("div","lh-metric__innerwrap"),i=e.createElement("div","lh-metric__icon"),a=e.createElement("span","lh-metric__title"),o=e.createElement("div","lh-metric__value"),l=e.createElement("div","lh-metric__description");return r.append(" ",i," ",a," ",o," ",l," "),n.append(" ",r," "),t.append(n),t}(e);case"scorescale":return function(e){let t=e.createFragment(),n=e.createElement("div","lh-scorescale"),r=e.createElement("span","lh-scorescale-range lh-scorescale-range--fail");r.append("0\u201349");let i=e.createElement("span","lh-scorescale-range lh-scorescale-range--average");i.append("50\u201389");let a=e.createElement("span","lh-scorescale-range lh-scorescale-range--pass");return a.append("90\u2013100"),n.append(" ",r," ",i," ",a," "),t.append(n),t}(e);case"scoresWrapper":return function(e){let t=e.createFragment(),n=e.createElement("style");n.append("\\n    .lh-scores-container {\\n      display: flex;\\n      flex-direction: column;\\n      padding: var(--default-padding) 0;\\n      position: relative;\\n      width: 100%;\\n    }\\n\\n    .lh-sticky-header {\\n      --gauge-circle-size: var(--gauge-circle-size-sm);\\n      --plugin-badge-size: 16px;\\n      --plugin-icon-size: 75%;\\n      --gauge-wrapper-width: 60px;\\n      --gauge-percentage-font-size: 13px;\\n      position: fixed;\\n      left: 0;\\n      right: 0;\\n      top: var(--topbar-height);\\n      font-weight: 500;\\n      display: none;\\n      justify-content: center;\\n      background-color: var(--sticky-header-background-color);\\n      border-bottom: 1px solid var(--color-gray-200);\\n      padding-top: var(--score-container-padding);\\n      padding-bottom: 4px;\\n      z-index: 2;\\n      pointer-events: none;\\n    }\\n\\n    .lh-devtools .lh-sticky-header {\\n      /* The report within DevTools is placed in a container with overflow, which changes the placement of this header unless we change `position` to `sticky.` */\\n      position: sticky;\\n    }\\n\\n    .lh-sticky-header--visible {\\n      display: grid;\\n      grid-auto-flow: column;\\n      pointer-events: auto;\\n    }\\n\\n    /* Disable the gauge arc animation for the sticky header, so toggling display: none\\n       does not play the animation. */\\n    .lh-sticky-header .lh-gauge-arc {\\n      animation: none;\\n    }\\n\\n    .lh-sticky-header .lh-gauge__label,\\n    .lh-sticky-header .lh-fraction__label {\\n      display: none;\\n    }\\n\\n    .lh-highlighter {\\n      width: var(--gauge-wrapper-width);\\n      height: 1px;\\n      background-color: var(--highlighter-background-color);\\n      /* Position at bottom of first gauge in sticky header. */\\n      position: absolute;\\n      grid-column: 1;\\n      bottom: -1px;\\n      left: 0px;\\n      right: 0px;\\n    }\\n  "),t.append(n);let r=e.createElement("div","lh-scores-wrapper"),i=e.createElement("div","lh-scores-container"),a=e.createElement("div","lh-pyro"),o=e.createElement("div","lh-pyro-before"),l=e.createElement("div","lh-pyro-after");return a.append(" ",o," ",l," "),i.append(" ",a," "),r.append(" ",i," "),t.append(r),t}(e);case"snippet":return function(e){let t=e.createFragment(),n=e.createElement("div","lh-snippet"),r=e.createElement("style");return r.append(\'\\n          :root {\\n            --snippet-highlight-light: #fbf1f2;\\n            --snippet-highlight-dark: #ffd6d8;\\n          }\\n\\n         .lh-snippet__header {\\n          position: relative;\\n          overflow: hidden;\\n          padding: 10px;\\n          border-bottom: none;\\n          color: var(--snippet-color);\\n          background-color: var(--snippet-background-color);\\n          border: 1px solid var(--report-border-color-secondary);\\n        }\\n        .lh-snippet__title {\\n          font-weight: bold;\\n          float: left;\\n        }\\n        .lh-snippet__node {\\n          float: left;\\n          margin-left: 4px;\\n        }\\n        .lh-snippet__toggle-expand {\\n          padding: 1px 7px;\\n          margin-top: -1px;\\n          margin-right: -7px;\\n          float: right;\\n          background: transparent;\\n          border: none;\\n          cursor: pointer;\\n          font-size: 14px;\\n          color: #0c50c7;\\n        }\\n\\n        .lh-snippet__snippet {\\n          overflow: auto;\\n          border: 1px solid var(--report-border-color-secondary);\\n        }\\n        /* Container needed so that all children grow to the width of the scroll container */\\n        .lh-snippet__snippet-inner {\\n          display: inline-block;\\n          min-width: 100%;\\n        }\\n\\n        .lh-snippet:not(.lh-snippet--expanded) .lh-snippet__show-if-expanded {\\n          display: none;\\n        }\\n        .lh-snippet.lh-snippet--expanded .lh-snippet__show-if-collapsed {\\n          display: none;\\n        }\\n\\n        .lh-snippet__line {\\n          background: white;\\n          white-space: pre;\\n          display: flex;\\n        }\\n        .lh-snippet__line:not(.lh-snippet__line--message):first-child {\\n          padding-top: 4px;\\n        }\\n        .lh-snippet__line:not(.lh-snippet__line--message):last-child {\\n          padding-bottom: 4px;\\n        }\\n        .lh-snippet__line--content-highlighted {\\n          background: var(--snippet-highlight-dark);\\n        }\\n        .lh-snippet__line--message {\\n          background: var(--snippet-highlight-light);\\n        }\\n        .lh-snippet__line--message .lh-snippet__line-number {\\n          padding-top: 10px;\\n          padding-bottom: 10px;\\n        }\\n        .lh-snippet__line--message code {\\n          padding: 10px;\\n          padding-left: 5px;\\n          color: var(--color-fail);\\n          font-family: var(--report-font-family);\\n        }\\n        .lh-snippet__line--message code {\\n          white-space: normal;\\n        }\\n        .lh-snippet__line-icon {\\n          padding-top: 10px;\\n          display: none;\\n        }\\n        .lh-snippet__line--message .lh-snippet__line-icon {\\n          display: block;\\n        }\\n        .lh-snippet__line-icon:before {\\n          content: "";\\n          display: inline-block;\\n          vertical-align: middle;\\n          margin-right: 4px;\\n          width: var(--score-icon-size);\\n          height: var(--score-icon-size);\\n          background-image: var(--fail-icon-url);\\n        }\\n        .lh-snippet__line-number {\\n          flex-shrink: 0;\\n          width: 40px;\\n          text-align: right;\\n          font-family: monospace;\\n          padding-right: 5px;\\n          margin-right: 5px;\\n          color: var(--color-gray-600);\\n          user-select: none;\\n        }\\n    \'),n.append(" ",r," "),t.append(n),t}(e);case"snippetContent":return function(e){let t=e.createFragment(),n=e.createElement("div","lh-snippet__snippet"),r=e.createElement("div","lh-snippet__snippet-inner");return n.append(" ",r," "),t.append(n),t}(e);case"snippetHeader":return function(e){let t=e.createFragment(),n=e.createElement("div","lh-snippet__header"),r=e.createElement("div","lh-snippet__title"),i=e.createElement("div","lh-snippet__node"),a=e.createElement("button","lh-snippet__toggle-expand"),o=e.createElement("span","lh-snippet__btn-label-collapse lh-snippet__show-if-expanded"),l=e.createElement("span","lh-snippet__btn-label-expand lh-snippet__show-if-collapsed");return a.append(" ",o," ",l," "),n.append(" ",r," ",i," ",a," "),t.append(n),t}(e);case"snippetLine":return function(e){let t=e.createFragment(),n=e.createElement("div","lh-snippet__line"),r=e.createElement("div","lh-snippet__line-number"),i=e.createElement("div","lh-snippet__line-icon"),a=e.createElement("code");return n.append(" ",r," ",i," ",a," "),t.append(n),t}(e);case"styles":return function(e){let t=e.createFragment(),n=e.createElement("style");return n.append(\'/**\\n * @license\\n * Copyright 2017 Google LLC\\n * SPDX-License-Identifier: Apache-2.0\\n */\\n\\n/*\\n  Naming convention:\\n\\n  If a variable is used for a specific component: --{component}-{property name}-{modifier}\\n\\n  Both {component} and {property name} should be kebab-case. If the target is the entire page,\\n  use \\\'report\\\' for the component. The property name should not be abbreviated. Use the\\n  property name the variable is intended for - if it\\\'s used for multiple, a common descriptor\\n  is fine (ex: \\\'size\\\' for a variable applied to \\\'width\\\' and \\\'height\\\'). If a variable is shared\\n  across multiple components, either create more variables or just drop the "{component}-"\\n  part of the name. Append any modifiers at the end (ex: \\\'big\\\', \\\'dark\\\').\\n\\n  For colors: --color-{hue}-{intensity}\\n\\n  {intensity} is the Material Design tag - 700, A700, etc.\\n*/\\n.lh-vars {\\n  /* Palette using Material Design Colors\\n   * https://www.materialui.co/colors */\\n  --color-amber-50: #FFF8E1;\\n  --color-blue-200: #90CAF9;\\n  --color-blue-900: #0D47A1;\\n  --color-blue-A700: #2962FF;\\n  --color-blue-primary: #06f;\\n  --color-cyan-500: #00BCD4;\\n  --color-gray-100: #F5F5F5;\\n  --color-gray-300: #CFCFCF;\\n  --color-gray-200: #E0E0E0;\\n  --color-gray-400: #BDBDBD;\\n  --color-gray-50: #FAFAFA;\\n  --color-gray-500: #9E9E9E;\\n  --color-gray-600: #757575;\\n  --color-gray-700: #616161;\\n  --color-gray-800: #424242;\\n  --color-gray-900: #212121;\\n  --color-gray: #000000;\\n  --color-green-700: #080;\\n  --color-green: #0c6;\\n  --color-lime-400: #D3E156;\\n  --color-orange-50: #FFF3E0;\\n  --color-orange-700: #C33300;\\n  --color-orange: #fa3;\\n  --color-red-700: #c00;\\n  --color-red: #f33;\\n  --color-teal-600: #00897B;\\n  --color-white: #FFFFFF;\\n\\n  /* Context-specific colors */\\n  --color-average-secondary: var(--color-orange-700);\\n  --color-average: var(--color-orange);\\n  --color-fail-secondary: var(--color-red-700);\\n  --color-fail: var(--color-red);\\n  --color-hover: var(--color-gray-50);\\n  --color-informative: var(--color-blue-900);\\n  --color-pass-secondary: var(--color-green-700);\\n  --color-pass: var(--color-green);\\n  --color-not-applicable: var(--color-gray-600);\\n\\n  /* Component variables */\\n  --audit-description-padding-left: calc(var(--score-icon-size) + var(--score-icon-margin-left) + var(--score-icon-margin-right));\\n  --audit-explanation-line-height: 16px;\\n  --audit-group-margin-bottom: calc(var(--default-padding) * 6);\\n  --audit-group-padding-vertical: 8px;\\n  --audit-margin-horizontal: 5px;\\n  --audit-padding-vertical: 8px;\\n  --category-padding: calc(var(--default-padding) * 6) var(--edge-gap-padding) calc(var(--default-padding) * 4);\\n  --chevron-line-stroke: var(--color-gray-600);\\n  --chevron-size: 12px;\\n  --default-padding: 8px;\\n  --edge-gap-padding: calc(var(--default-padding) * 4);\\n  --env-item-background-color: var(--color-gray-100);\\n  --env-item-font-size: 28px;\\n  --env-item-line-height: 36px;\\n  --env-item-padding: 10px 0px;\\n  --env-name-min-width: 220px;\\n  --footer-padding-vertical: 16px;\\n  --gauge-circle-size-big: 96px;\\n  --gauge-circle-size: 48px;\\n  --gauge-circle-size-sm: 32px;\\n  --gauge-label-font-size-big: 18px;\\n  --gauge-label-font-size: var(--report-font-size-secondary);\\n  --gauge-label-line-height-big: 24px;\\n  --gauge-label-line-height: var(--report-line-height-secondary);\\n  --gauge-percentage-font-size-big: 38px;\\n  --gauge-percentage-font-size: var(--report-font-size-secondary);\\n  --gauge-wrapper-width: 120px;\\n  --header-line-height: 24px;\\n  --highlighter-background-color: var(--report-text-color);\\n  --icon-square-size: calc(var(--score-icon-size) * 0.88);\\n  --image-preview-size: 48px;\\n  --link-color: var(--color-blue-primary);\\n  --locale-selector-background-color: var(--color-white);\\n  --metric-toggle-lines-fill: #7F7F7F;\\n  --metric-value-font-size: calc(var(--report-font-size) * 1.8);\\n  --metrics-toggle-background-color: var(--color-gray-200);\\n  --plugin-badge-background-color: var(--color-white);\\n  --plugin-badge-size-big: calc(var(--gauge-circle-size-big) / 2.7);\\n  --plugin-badge-size: calc(var(--gauge-circle-size) / 2.7);\\n  --plugin-icon-size: 65%;\\n  --report-background-color: #fff;\\n  --report-border-color-secondary: #ebebeb;\\n  --report-font-family-monospace: monospace, \\\'Roboto Mono\\\', \\\'Menlo\\\', \\\'dejavu sans mono\\\', \\\'Consolas\\\', \\\'Lucida Console\\\';\\n  --report-font-family: system-ui, Roboto, Helvetica, Arial, sans-serif;\\n  --report-font-size: 14px;\\n  --report-font-size-secondary: 12px;\\n  --report-icon-size: var(--score-icon-background-size);\\n  --report-line-height: 24px;\\n  --report-line-height-secondary: 20px;\\n  --report-monospace-font-size: calc(var(--report-font-size) * 0.85);\\n  --report-text-color-secondary: var(--color-gray-800);\\n  --report-text-color: var(--color-gray-900);\\n  --report-content-max-width: calc(60 * var(--report-font-size)); /* defaults to 840px */\\n  --report-content-min-width: 360px;\\n  --report-content-max-width-minus-edge-gap: calc(var(--report-content-max-width) - var(--edge-gap-padding) * 2);\\n  --score-container-padding: 8px;\\n  --score-icon-background-size: 24px;\\n  --score-icon-margin-left: 6px;\\n  --score-icon-margin-right: 14px;\\n  --score-icon-margin: 0 var(--score-icon-margin-right) 0 var(--score-icon-margin-left);\\n  --score-icon-size: 12px;\\n  --score-icon-size-big: 16px;\\n  --screenshot-overlay-background: rgba(0, 0, 0, 0.3);\\n  --section-padding-vertical: calc(var(--default-padding) * 6);\\n  --snippet-background-color: var(--color-gray-50);\\n  --snippet-color: #0938C2;\\n  --stackpack-padding-horizontal: 10px;\\n  --sticky-header-background-color: var(--report-background-color);\\n  --sticky-header-buffer: var(--topbar-height);\\n  --sticky-header-height: calc(var(--gauge-circle-size-sm) + var(--score-container-padding) * 2 + 1em);\\n  --table-group-header-background-color: #EEF1F4;\\n  --table-group-header-text-color: var(--color-gray-700);\\n  --table-higlight-background-color: #F5F7FA;\\n  --tools-icon-color: var(--color-gray-600);\\n  --topbar-background-color: var(--color-white);\\n  --topbar-height: 32px;\\n  --topbar-logo-size: 24px;\\n  --topbar-padding: 0 8px;\\n  --toplevel-warning-background-color: hsla(30, 100%, 75%, 10%);\\n  --toplevel-warning-message-text-color: var(--color-average-secondary);\\n  --toplevel-warning-padding: 18px;\\n  --toplevel-warning-text-color: var(--report-text-color);\\n\\n  /* SVGs */\\n  --plugin-icon-url-dark: url(\\\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="%23FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z"/></svg>\\\');\\n  --plugin-icon-url: url(\\\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="%23757575"><path d="M0 0h24v24H0z" fill="none"/><path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z"/></svg>\\\');\\n\\n  --pass-icon-url: url(\\\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><title>check</title><path fill="%23178239" d="M24 4C12.95 4 4 12.95 4 24c0 11.04 8.95 20 20 20 11.04 0 20-8.96 20-20 0-11.05-8.96-20-20-20zm-4 30L10 24l2.83-2.83L20 28.34l15.17-15.17L38 16 20 34z"/></svg>\\\');\\n  --average-icon-url: url(\\\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><title>info</title><path fill="%23E67700" d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm2 30h-4V22h4v12zm0-16h-4v-4h4v4z"/></svg>\\\');\\n  --fail-icon-url: url(\\\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><title>warn</title><path fill="%23C7221F" d="M2 42h44L24 4 2 42zm24-6h-4v-4h4v4zm0-8h-4v-8h4v8z"/></svg>\\\');\\n  --error-icon-url: url(\\\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 15"><title>error</title><path d="M0 15H 3V 12H 0V" fill="%23FF4E42"/><path d="M0 9H 3V 0H 0V" fill="%23FF4E42"/></svg>\\\');\\n\\n  --swap-locale-icon-url: url(\\\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="%23000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/></svg>\\\');\\n\\n  --insights-icon-url: url(\\\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="%23000000"><path d="M18 13V11H22V13H18ZM19.2 20L16 17.6L17.2 16L20.4 18.4L19.2 20ZM17.2 8L16 6.4L19.2 4L20.4 5.6L17.2 8ZM5 19V15H4C3.45 15 2.975 14.8083 2.575 14.425C2.19167 14.025 2 13.55 2 13V11C2 10.45 2.19167 9.98333 2.575 9.6C2.975 9.2 3.45 9 4 9H8L13 6V18L8 15H7V19H5ZM11 14.45V9.55L8.55 11H4V13H8.55L11 14.45ZM14 15.35V8.65C14.45 9.05 14.8083 9.54167 15.075 10.125C15.3583 10.6917 15.5 11.3167 15.5 12C15.5 12.6833 15.3583 13.3167 15.075 13.9C14.8083 14.4667 14.45 14.95 14 15.35Z"/></svg>\\\');\\n  --insights-icon-url-dark: url(\\\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="%239e9e9e"><path d="M18 13V11H22V13H18ZM19.2 20L16 17.6L17.2 16L20.4 18.4L19.2 20ZM17.2 8L16 6.4L19.2 4L20.4 5.6L17.2 8ZM5 19V15H4C3.45 15 2.975 14.8083 2.575 14.425C2.19167 14.025 2 13.55 2 13V11C2 10.45 2.19167 9.98333 2.575 9.6C2.975 9.2 3.45 9 4 9H8L13 6V18L8 15H7V19H5ZM11 14.45V9.55L8.55 11H4V13H8.55L11 14.45ZM14 15.35V8.65C14.45 9.05 14.8083 9.54167 15.075 10.125C15.3583 10.6917 15.5 11.3167 15.5 12C15.5 12.6833 15.3583 13.3167 15.075 13.9C14.8083 14.4667 14.45 14.95 14 15.35Z"/></svg>\\\');\\n}\\n\\n@media not print {\\n  .lh-dark {\\n    /* Pallete */\\n    --color-gray-200: var(--color-gray-800);\\n    --color-gray-300: #616161;\\n    --color-gray-400: var(--color-gray-600);\\n    --color-gray-700: var(--color-gray-400);\\n    --color-gray-50: #757575;\\n    --color-gray-600: var(--color-gray-500);\\n    --color-green-700: var(--color-green);\\n    --color-orange-700: var(--color-orange);\\n    --color-red-700: var(--color-red);\\n    --color-teal-600: var(--color-cyan-500);\\n\\n    /* Context-specific colors */\\n    --color-hover: rgba(0, 0, 0, 0.2);\\n    --color-informative: var(--color-blue-200);\\n\\n    /* Component variables */\\n    --env-item-background-color: #393535;\\n    --link-color: var(--color-blue-200);\\n    --locale-selector-background-color: var(--color-gray-200);\\n    --plugin-badge-background-color: var(--color-gray-800);\\n    --report-background-color: var(--color-gray-900);\\n    --report-border-color-secondary: var(--color-gray-200);\\n    --report-text-color-secondary: var(--color-gray-400);\\n    --report-text-color: var(--color-gray-100);\\n    --snippet-color: var(--color-cyan-500);\\n    --topbar-background-color: var(--color-gray);\\n    --toplevel-warning-background-color: hsl(33deg 14% 18%);\\n    --toplevel-warning-message-text-color: var(--color-orange-700);\\n    --toplevel-warning-text-color: var(--color-gray-100);\\n    --table-group-header-background-color: rgba(186, 196, 206, 0.15);\\n    --table-group-header-text-color: var(--color-gray-100);\\n    --table-higlight-background-color: rgba(186, 196, 206, 0.09);\\n\\n    /* SVGs */\\n    --plugin-icon-url: var(--plugin-icon-url-dark);\\n  }\\n}\\n\\n/**\\n* This media query is a temporary fallback for browsers that do not support `@container query`.\\n* TODO: remove this media query when `@container query` is fully supported by browsers\\n* See https://github.com/GoogleChrome/lighthouse/pull/16332\\n*/\\n@media only screen and (max-width: 480px) {\\n  .lh-vars {\\n    --audit-group-margin-bottom: 20px;\\n    --edge-gap-padding: var(--default-padding);\\n    --env-name-min-width: 120px;\\n    --gauge-circle-size-big: 96px;\\n    --gauge-circle-size: 72px;\\n    --gauge-label-font-size-big: 22px;\\n    --gauge-label-font-size: 14px;\\n    --gauge-label-line-height-big: 26px;\\n    --gauge-label-line-height: 20px;\\n    --gauge-percentage-font-size-big: 34px;\\n    --gauge-percentage-font-size: 26px;\\n    --gauge-wrapper-width: 112px;\\n    --header-padding: 16px 0 16px 0;\\n    --image-preview-size: 24px;\\n    --plugin-icon-size: 75%;\\n    --report-font-size: 14px;\\n    --report-line-height: 20px;\\n    --score-icon-margin-left: 2px;\\n    --score-icon-size: 10px;\\n    --topbar-height: 28px;\\n    --topbar-logo-size: 20px;\\n  }\\n}\\n\\n@container lh-container (max-width: 480px) {\\n  .lh-vars {\\n    --audit-group-margin-bottom: 20px;\\n    --edge-gap-padding: var(--default-padding);\\n    --env-name-min-width: 120px;\\n    --gauge-circle-size-big: 96px;\\n    --gauge-circle-size: 72px;\\n    --gauge-label-font-size-big: 22px;\\n    --gauge-label-font-size: 14px;\\n    --gauge-label-line-height-big: 26px;\\n    --gauge-label-line-height: 20px;\\n    --gauge-percentage-font-size-big: 34px;\\n    --gauge-percentage-font-size: 26px;\\n    --gauge-wrapper-width: 112px;\\n    --header-padding: 16px 0 16px 0;\\n    --image-preview-size: 24px;\\n    --plugin-icon-size: 75%;\\n    --report-font-size: 14px;\\n    --report-line-height: 20px;\\n    --score-icon-margin-left: 2px;\\n    --score-icon-size: 10px;\\n    --topbar-height: 28px;\\n    --topbar-logo-size: 20px;\\n  }\\n}\\n\\n.lh-vars.lh-devtools {\\n  --audit-explanation-line-height: 14px;\\n  --audit-group-margin-bottom: 20px;\\n  --audit-group-padding-vertical: 12px;\\n  --audit-padding-vertical: 4px;\\n  --category-padding: 12px;\\n  --default-padding: 12px;\\n  --env-name-min-width: 120px;\\n  --footer-padding-vertical: 8px;\\n  --gauge-circle-size-big: 72px;\\n  --gauge-circle-size: 64px;\\n  --gauge-label-font-size-big: 22px;\\n  --gauge-label-font-size: 14px;\\n  --gauge-label-line-height-big: 26px;\\n  --gauge-label-line-height: 20px;\\n  --gauge-percentage-font-size-big: 34px;\\n  --gauge-percentage-font-size: 26px;\\n  --gauge-wrapper-width: 97px;\\n  --header-line-height: 20px;\\n  --header-padding: 16px 0 16px 0;\\n  --screenshot-overlay-background: transparent;\\n  --plugin-icon-size: 75%;\\n  --report-font-size: 12px;\\n  --report-line-height: 20px;\\n  --score-icon-margin-left: 2px;\\n  --score-icon-size: 10px;\\n  --section-padding-vertical: 8px;\\n}\\n\\n.lh-container:has(.lh-sticky-header) {\\n  --sticky-header-buffer: calc(var(--topbar-height) + var(--sticky-header-height));\\n}\\n\\n.lh-container:not(.lh-topbar + .lh-container) {\\n  --topbar-height: 0;\\n  --sticky-header-height: 0;\\n  --sticky-header-buffer: 0;\\n}\\n\\n.lh-max-viewport {\\n  display: flex;\\n  flex-direction: column;\\n  min-height: 100vh;\\n  width: 100%;\\n}\\n\\n.lh-devtools.lh-root {\\n  height: 100%;\\n}\\n.lh-devtools.lh-root img {\\n  /* Override devtools default \\\'min-width: 0\\\' so svg without size in a flexbox isn\\\'t collapsed. */\\n  min-width: auto;\\n}\\n.lh-devtools .lh-container {\\n  overflow-y: scroll;\\n  height: calc(100% - var(--topbar-height));\\n  /** The .lh-container is the scroll parent in DevTools so we exclude the topbar from the sticky header buffer. */\\n  --sticky-header-buffer: 0;\\n}\\n.lh-devtools .lh-container:has(.lh-sticky-header) {\\n  /** The .lh-container is the scroll parent in DevTools so we exclude the topbar from the sticky header buffer. */\\n  --sticky-header-buffer: var(--sticky-header-height);\\n}\\n@media print {\\n  .lh-devtools .lh-container {\\n    overflow: unset;\\n  }\\n}\\n.lh-devtools .lh-sticky-header {\\n  /* This is normally the height of the topbar, but we want it to stick to the top of our scroll container .lh-container` */\\n  top: 0;\\n}\\n.lh-devtools .lh-element-screenshot__overlay {\\n  position: absolute;\\n}\\n\\n@keyframes fadeIn {\\n  0% { opacity: 0;}\\n  100% { opacity: 0.6;}\\n}\\n\\n.lh-root *, .lh-root *::before, .lh-root *::after {\\n  box-sizing: border-box;\\n}\\n\\n.lh-root {\\n  font-family: var(--report-font-family);\\n  font-size: var(--report-font-size);\\n  margin: 0;\\n  line-height: var(--report-line-height);\\n  background: var(--report-background-color);\\n  color: var(--report-text-color);\\n}\\n\\n.lh-root [hidden] {\\n  display: none !important;\\n}\\n\\n.lh-root pre {\\n  margin: 0;\\n}\\n\\n.lh-root pre,\\n.lh-root code {\\n  font-family: var(--report-font-family-monospace);\\n}\\n\\n.lh-root details > summary {\\n  cursor: pointer;\\n}\\n\\n.lh-hidden {\\n  display: none !important;\\n}\\n\\n.lh-container {\\n  /*\\n  Text wrapping in the report is so much FUN!\\n  We have a `word-break: break-word;` globally here to prevent a few common scenarios, namely\\n  long non-breakable text (usually URLs) found in:\\n    1. The footer\\n    2. .lh-node (outerHTML)\\n    3. .lh-code\\n\\n  With that sorted, the next challenge is appropriate column sizing and text wrapping inside our\\n  .lh-details tables. Even more fun.\\n    * We don\\\'t want table headers ("Est Savings (ms)") to wrap or their column values, but\\n      we\\\'d be happy for the URL column to wrap if the URLs are particularly long.\\n    * We want the narrow columns to remain narrow, providing the most column width for URL\\n    * We don\\\'t want the table to extend past 100% width.\\n    * Long URLs in the URL column can wrap. Util.getURLDisplayName maxes them out at 64 characters,\\n      but they do not get any overflow:ellipsis treatment.\\n  */\\n  word-break: break-word;\\n\\n  container-name: lh-container;\\n  container-type: inline-size;\\n}\\n\\n.lh-audit-group a,\\n.lh-category-header__description a,\\n.lh-audit__description a,\\n.lh-warnings a,\\n.lh-footer a,\\n.lh-table-column--link a {\\n  color: var(--link-color);\\n}\\n\\n.lh-audit__description, .lh-audit__stackpack, .lh-list-section__description {\\n  --inner-audit-padding-right: var(--stackpack-padding-horizontal);\\n  padding-left: var(--audit-description-padding-left);\\n  padding-right: var(--inner-audit-padding-right);\\n  padding-top: 8px;\\n  padding-bottom: 8px;\\n}\\n\\n.lh-details {\\n  margin-top: var(--default-padding);\\n  margin-bottom: var(--default-padding);\\n  margin-left: var(--audit-description-padding-left);\\n}\\n\\n.lh-audit__stackpack {\\n  display: flex;\\n  align-items: center;\\n}\\n\\n.lh-audit__stackpack__img {\\n  max-width: 30px;\\n  margin-right: var(--default-padding)\\n}\\n\\n/* Report header */\\n\\n.lh-report-icon {\\n  display: flex;\\n  align-items: center;\\n  padding: 10px 12px;\\n  cursor: pointer;\\n}\\n.lh-report-icon[disabled] {\\n  opacity: 0.3;\\n  pointer-events: none;\\n}\\n\\n.lh-report-icon::before {\\n  content: "";\\n  margin: 4px;\\n  background-repeat: no-repeat;\\n  width: var(--report-icon-size);\\n  height: var(--report-icon-size);\\n  opacity: 0.7;\\n  display: inline-block;\\n  vertical-align: middle;\\n}\\n.lh-report-icon:hover::before {\\n  opacity: 1;\\n}\\n.lh-dark .lh-report-icon::before {\\n  filter: invert(1);\\n}\\n.lh-report-icon--print::before {\\n  background-image: url(\\\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/><path fill="none" d="M0 0h24v24H0z"/></svg>\\\');\\n}\\n.lh-report-icon--copy::before {\\n  background-image: url(\\\'data:image/svg+xml;utf8,<svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>\\\');\\n}\\n.lh-report-icon--open::before {\\n  background-image: url(\\\'data:image/svg+xml;utf8,<svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h4v-2H5V8h14v10h-4v2h4c1.1 0 2-.9 2-2V6c0-1.1-.89-2-2-2zm-7 6l-4 4h3v6h2v-6h3l-4-4z"/></svg>\\\');\\n}\\n.lh-report-icon--download::before {\\n  background-image: url(\\\'data:image/svg+xml;utf8,<svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>\\\');\\n}\\n.lh-report-icon--dark::before {\\n  background-image:url(\\\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 100 125"><path d="M50 23.587c-16.27 0-22.799 12.574-22.799 21.417 0 12.917 10.117 22.451 12.436 32.471h20.726c2.32-10.02 12.436-19.554 12.436-32.471 0-8.843-6.528-21.417-22.799-21.417zM39.637 87.161c0 3.001 1.18 4.181 4.181 4.181h.426l.41 1.231C45.278 94.449 46.042 95 48.019 95h3.963c1.978 0 2.74-.551 3.365-2.427l.409-1.231h.427c3.002 0 4.18-1.18 4.18-4.181V80.91H39.637v6.251zM50 18.265c1.26 0 2.072-.814 2.072-2.073v-9.12C52.072 5.813 51.26 5 50 5c-1.259 0-2.072.813-2.072 2.073v9.12c0 1.259.813 2.072 2.072 2.072zM68.313 23.727c.994.774 2.135.634 2.91-.357l5.614-7.187c.776-.992.636-2.135-.356-2.909-.992-.776-2.135-.636-2.91.357l-5.613 7.186c-.778.993-.636 2.135.355 2.91zM91.157 36.373c-.306-1.222-1.291-1.815-2.513-1.51l-8.85 2.207c-1.222.305-1.814 1.29-1.51 2.512.305 1.223 1.291 1.814 2.513 1.51l8.849-2.206c1.223-.305 1.816-1.291 1.511-2.513zM86.757 60.48l-8.331-3.709c-1.15-.512-2.225-.099-2.736 1.052-.512 1.151-.1 2.224 1.051 2.737l8.33 3.707c1.15.514 2.225.101 2.736-1.05.513-1.149.1-2.223-1.05-2.737zM28.779 23.37c.775.992 1.917 1.131 2.909.357.992-.776 1.132-1.917.357-2.91l-5.615-7.186c-.775-.992-1.917-1.132-2.909-.357s-1.131 1.917-.356 2.909l5.614 7.187zM21.715 39.583c.305-1.223-.288-2.208-1.51-2.513l-8.849-2.207c-1.222-.303-2.208.289-2.513 1.511-.303 1.222.288 2.207 1.511 2.512l8.848 2.206c1.222.304 2.208-.287 2.513-1.509zM21.575 56.771l-8.331 3.711c-1.151.511-1.563 1.586-1.05 2.735.511 1.151 1.586 1.563 2.736 1.052l8.331-3.711c1.151-.511 1.563-1.586 1.05-2.735-.512-1.15-1.585-1.562-2.736-1.052z"/></svg>\\\');\\n}\\n.lh-report-icon--treemap::before {\\n  background-image: url(\\\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="black"><path d="M3 5v14h19V5H3zm2 2h15v4H5V7zm0 10v-4h4v4H5zm6 0v-4h9v4h-9z"/></svg>\\\');\\n}\\n\\n.lh-report-icon--date::before {\\n  background-image: url(\\\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 11h2v2H7v-2zm14-5v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6c0-1.1.9-2 2-2h1V2h2v2h8V2h2v2h1a2 2 0 012 2zM5 8h14V6H5v2zm14 12V10H5v10h14zm-4-7h2v-2h-2v2zm-4 0h2v-2h-2v2z"/></svg>\\\');\\n}\\n.lh-report-icon--devices::before {\\n  background-image: url(\\\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 6h18V4H4a2 2 0 00-2 2v11H0v3h14v-3H4V6zm19 2h-6a1 1 0 00-1 1v10c0 .6.5 1 1 1h6c.6 0 1-.5 1-1V9c0-.6-.5-1-1-1zm-1 9h-4v-7h4v7z"/></svg>\\\');\\n}\\n.lh-report-icon--world::before {\\n  background-image: url(\\\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm7 6h-3c-.3-1.3-.8-2.5-1.4-3.6A8 8 0 0 1 18.9 8zm-7-4a14 14 0 0 1 2 4h-4a14 14 0 0 1 2-4zM4.3 14a8.2 8.2 0 0 1 0-4h3.3a16.5 16.5 0 0 0 0 4H4.3zm.8 2h3a14 14 0 0 0 1.3 3.6A8 8 0 0 1 5.1 16zm3-8H5a8 8 0 0 1 4.3-3.6L8 8zM12 20a14 14 0 0 1-2-4h4a14 14 0 0 1-2 4zm2.3-6H9.7a14.7 14.7 0 0 1 0-4h4.6a14.6 14.6 0 0 1 0 4zm.3 5.6c.6-1.2 1-2.4 1.4-3.6h3a8 8 0 0 1-4.4 3.6zm1.8-5.6a16.5 16.5 0 0 0 0-4h3.3a8.2 8.2 0 0 1 0 4h-3.3z"/></svg>\\\');\\n}\\n.lh-report-icon--stopwatch::before {\\n  background-image: url(\\\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.1-6.6L20.5 6l-1.4-1.4L17.7 6A9 9 0 0 0 3 13a9 9 0 1 0 16-5.6zm-7 12.6a7 7 0 1 1 0-14 7 7 0 0 1 0 14z"/></svg>\\\');\\n}\\n.lh-report-icon--networkspeed::before {\\n  background-image: url(\\\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.9 5c-.2 0-.3 0-.4.2v.2L10.1 17a2 2 0 0 0-.2 1 2 2 0 0 0 4 .4l2.4-12.9c0-.3-.2-.5-.5-.5zM1 9l2 2c2.9-2.9 6.8-4 10.5-3.6l1.2-2.7C10 3.8 4.7 5.3 1 9zm20 2 2-2a15.4 15.4 0 0 0-5.6-3.6L17 8.2c1.5.7 2.9 1.6 4.1 2.8zm-4 4 2-2a9.9 9.9 0 0 0-2.7-1.9l-.5 3 1.2.9zM5 13l2 2a7.1 7.1 0 0 1 4-2l1.3-2.9C9.7 10.1 7 11 5 13z"/></svg>\\\');\\n}\\n.lh-report-icon--samples-one::before {\\n  background-image: url(\\\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="7" cy="14" r="3"/><path d="M7 18a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm4-2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm5.6 17.6a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>\\\');\\n}\\n.lh-report-icon--samples-many::before {\\n  background-image: url(\\\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 18a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm4-2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm5.6 17.6a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/><circle cx="7" cy="14" r="3"/><circle cx="11" cy="6" r="3"/></svg>\\\');\\n}\\n.lh-report-icon--chrome::before {\\n  background-image: url(\\\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="-50 -50 562 562"><path d="M256 25.6v25.6a204 204 0 0 1 144.8 60 204 204 0 0 1 60 144.8 204 204 0 0 1-60 144.8 204 204 0 0 1-144.8 60 204 204 0 0 1-144.8-60 204 204 0 0 1-60-144.8 204 204 0 0 1 60-144.8 204 204 0 0 1 144.8-60V0a256 256 0 1 0 0 512 256 256 0 0 0 0-512v25.6z"/><path d="M256 179.2v25.6a51.3 51.3 0 0 1 0 102.4 51.3 51.3 0 0 1 0-102.4v-51.2a102.3 102.3 0 1 0-.1 204.7 102.3 102.3 0 0 0 .1-204.7v25.6z"/><path d="M256 204.8h217.6a25.6 25.6 0 0 0 0-51.2H256a25.6 25.6 0 0 0 0 51.2m44.3 76.8L191.5 470.1a25.6 25.6 0 1 0 44.4 25.6l108.8-188.5a25.6 25.6 0 1 0-44.4-25.6m-88.6 0L102.9 93.2a25.7 25.7 0 0 0-35-9.4 25.7 25.7 0 0 0-9.4 35l108.8 188.5a25.7 25.7 0 0 0 35 9.4 25.9 25.9 0 0 0 9.4-35.1"/></svg>\\\');\\n}\\n.lh-report-icon--external::before {\\n  background-image: url(\\\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><path d="M3.15 11.9a1.01 1.01 0 0 1-.743-.307 1.01 1.01 0 0 1-.306-.743v-7.7c0-.292.102-.54.306-.744a1.01 1.01 0 0 1 .744-.306H7v1.05H3.15v7.7h7.7V7h1.05v3.85c0 .291-.103.54-.307.743a1.01 1.01 0 0 1-.743.307h-7.7Zm2.494-2.8-.743-.744 5.206-5.206H8.401V2.1h3.5v3.5h-1.05V3.893L5.644 9.1Z"/></svg>\\\');\\n}\\n.lh-report-icon--experiment::before {\\n  background-image: url(\\\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none"><path d="M4.50002 17C3.86136 17 3.40302 16.7187 3.12502 16.156C2.84702 15.5933 2.90936 15.069 3.31202 14.583L7.50002 9.5V4.5H6.75002C6.54202 4.5 6.36502 4.427 6.21902 4.281C6.07302 4.135 6.00002 3.958 6.00002 3.75C6.00002 3.542 6.07302 3.365 6.21902 3.219C6.36502 3.073 6.54202 3 6.75002 3H13.25C13.458 3 13.635 3.073 13.781 3.219C13.927 3.365 14 3.542 14 3.75C14 3.958 13.927 4.135 13.781 4.281C13.635 4.427 13.458 4.5 13.25 4.5H12.5V9.5L16.688 14.583C17.0767 15.069 17.132 15.5933 16.854 16.156C16.5767 16.7187 16.1254 17 15.5 17H4.50002ZM4.50002 15.5H15.5L11 10V4.5H9.00002V10L4.50002 15.5Z" fill="black"/></svg>\\\');\\n}\\n\\n/** These are still icons, but w/o the auto-color invert / opacity / etc. that come with .lh-report-icon */\\n\\n.lh-report-plain-icon {\\n  display: flex;\\n  align-items: center;\\n}\\n.lh-report-plain-icon::before {\\n  content: "";\\n  background-repeat: no-repeat;\\n  width: var(--report-icon-size);\\n  height: var(--report-icon-size);\\n  display: inline-block;\\n  margin-right: 5px;\\n}\\n\\n.lh-report-plain-icon--checklist-pass::before {\\n  --icon-url: url(\\\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M8.938 13L13.896 8.062L12.833 7L8.938 10.875L7.167 9.125L6.104 10.188L8.938 13ZM10 18C8.90267 18 7.868 17.7917 6.896 17.375C5.924 16.9583 5.07333 16.3853 4.344 15.656C3.61467 14.9267 3.04167 14.076 2.625 13.104C2.20833 12.132 2 11.0973 2 10C2 8.88867 2.20833 7.85033 2.625 6.885C3.04167 5.92033 3.61467 5.07333 4.344 4.344C5.07333 3.61467 5.924 3.04167 6.896 2.625C7.868 2.20833 8.90267 2 10 2C11.1113 2 12.1497 2.20833 13.115 2.625C14.0797 3.04167 14.9267 3.61467 15.656 4.344C16.3853 5.07333 16.9583 5.92033 17.375 6.885C17.7917 7.85033 18 8.88867 18 10C18 11.0973 17.7917 12.132 17.375 13.104C16.9583 14.076 16.3853 14.9267 15.656 15.656C14.9267 16.3853 14.0797 16.9583 13.115 17.375C12.1497 17.7917 11.1113 18 10 18ZM10 16.5C11.8053 16.5 13.34 15.868 14.604 14.604C15.868 13.34 16.5 11.8053 16.5 10C16.5 8.19467 15.868 6.66 14.604 5.396C13.34 4.132 11.8053 3.5 10 3.5C8.19467 3.5 6.66 4.132 5.396 5.396C4.132 6.66 3.5 8.19467 3.5 10C3.5 11.8053 4.132 13.34 5.396 14.604C6.66 15.868 8.19467 16.5 10 16.5Z" fill="black"/></svg>\\\');\\n  background-color: var(--color-pass);\\n  mask: var(--icon-url) center / contain no-repeat;\\n}\\n.lh-report-plain-icon--checklist-fail::before {\\n  --icon-url: url(\\\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10ZM16 10C16 13.3137 13.3137 16 10 16C8.6135 16 7.33683 15.5297 6.32083 14.7399L14.7399 6.32083C15.5297 7.33683 16 8.6135 16 10ZM5.26016 13.6793L13.6793 5.26016C12.6633 4.47033 11.3866 4 10 4C6.68629 4 4 6.68629 4 10C4 11.3866 4.47033 12.6633 5.26016 13.6793Z" fill="black"/></svg>\\\');\\n  background-color: var(--color-fail);\\n  mask: var(--icon-url) center / contain no-repeat;\\n}\\n\\n.lh-buttons {\\n  display: flex;\\n  flex-wrap: wrap;\\n  margin: var(--default-padding) 0;\\n}\\n.lh-button {\\n  height: 32px;\\n  border: 1px solid var(--report-border-color-secondary);\\n  border-radius: 3px;\\n  color: var(--link-color);\\n  background-color: var(--report-background-color);\\n  margin: 5px;\\n}\\n\\n.lh-button:first-of-type {\\n  margin-left: 0;\\n}\\n\\n/* Node */\\n.lh-node {\\n  display: flow-root;\\n}\\n\\n.lh-node__snippet {\\n  font-family: var(--report-font-family-monospace);\\n  color: var(--snippet-color);\\n  font-size: var(--report-monospace-font-size);\\n  line-height: 20px;\\n}\\n\\n.lh-checklist {\\n  list-style: none;\\n  padding: 0;\\n}\\n\\n.lh-checklist-item {\\n  margin: 10px 0 10px 0;\\n}\\n\\n/* Score */\\n\\n.lh-audit__score-icon {\\n  width: var(--score-icon-size);\\n  height: var(--score-icon-size);\\n  margin: var(--score-icon-margin);\\n}\\n\\n.lh-audit--pass .lh-audit__display-text {\\n  color: var(--color-pass-secondary);\\n}\\n.lh-audit--pass .lh-audit__score-icon,\\n.lh-scorescale-range--pass::before {\\n  border-radius: 100%;\\n  background: var(--color-pass);\\n}\\n\\n.lh-audit--average .lh-audit__display-text {\\n  color: var(--color-average-secondary);\\n}\\n.lh-audit--average .lh-audit__score-icon,\\n.lh-scorescale-range--average::before {\\n  background: var(--color-average);\\n  width: var(--icon-square-size);\\n  height: var(--icon-square-size);\\n}\\n\\n.lh-audit--fail .lh-audit__display-text {\\n  color: var(--color-fail-secondary);\\n}\\n.lh-audit--fail .lh-audit__score-icon,\\n.lh-audit--error .lh-audit__score-icon,\\n.lh-scorescale-range--fail::before {\\n  border-left: calc(var(--score-icon-size) / 2) solid transparent;\\n  border-right: calc(var(--score-icon-size) / 2) solid transparent;\\n  border-bottom: var(--score-icon-size) solid var(--color-fail);\\n}\\n\\n.lh-audit--error .lh-audit__score-icon,\\n.lh-metric--error .lh-metric__icon {\\n  background-image: var(--error-icon-url);\\n  background-repeat: no-repeat;\\n  background-position: center;\\n  border: none;\\n}\\n\\n.lh-gauge__wrapper--fail .lh-gauge--error {\\n  background-image: var(--error-icon-url);\\n  background-repeat: no-repeat;\\n  background-position: center;\\n  transform: scale(0.5);\\n  top: var(--score-container-padding);\\n}\\n\\n.lh-audit--manual .lh-audit__display-text,\\n.lh-audit--notapplicable .lh-audit__display-text {\\n  color: var(--color-gray-600);\\n}\\n.lh-audit--manual .lh-audit__score-icon,\\n.lh-audit--notapplicable .lh-audit__score-icon {\\n  border: calc(0.2 * var(--score-icon-size)) solid var(--color-gray-400);\\n  border-radius: 100%;\\n  background: none;\\n}\\n\\n.lh-audit--informative .lh-audit__display-text {\\n  color: var(--color-gray-600);\\n}\\n\\n.lh-audit--informative .lh-audit__score-icon {\\n  border: calc(0.2 * var(--score-icon-size)) solid var(--color-gray-400);\\n  border-radius: 100%;\\n}\\n\\n.lh-audit__description,\\n.lh-audit__stackpack {\\n  color: var(--report-text-color-secondary);\\n}\\n.lh-audit__adorn {\\n  border: 1px solid var(--color-gray-500);\\n  border-radius: 3px;\\n  margin: 0 3px;\\n  padding: 0 2px;\\n  line-height: 1.1;\\n  display: inline-block;\\n  font-size: 90%;\\n  color: var(--report-text-color-secondary);\\n}\\n\\n.lh-category-header__description  {\\n  text-align: center;\\n  color: var(--color-gray-700);\\n  margin: 0px auto;\\n  max-width: 400px;\\n}\\n\\n\\n.lh-audit__display-text,\\n.lh-chevron-container {\\n  margin: 0 var(--audit-margin-horizontal);\\n}\\n.lh-chevron-container {\\n  margin-right: 0;\\n}\\n\\n.lh-audit__title-and-text {\\n  flex: 1;\\n}\\n\\n.lh-audit__title-and-text code {\\n  color: var(--snippet-color);\\n  font-size: var(--report-monospace-font-size);\\n}\\n\\n/* Prepend display text with em dash separator. */\\n.lh-audit__display-text:not(:empty):before {\\n  content: \\\'\u2014\\\';\\n  margin-right: var(--audit-margin-horizontal);\\n}\\n\\n/* Expandable Details (Audit Groups, Audits) */\\n.lh-audit__header {\\n  display: flex;\\n  align-items: center;\\n  padding: var(--default-padding);\\n}\\n\\n\\n.lh-metricfilter {\\n  display: grid;\\n  justify-content: end;\\n  align-items: center;\\n  grid-auto-flow: column;\\n  gap: 4px;\\n  color: var(--color-gray-700);\\n}\\n\\n.lh-metricfilter__radio {\\n  /*\\n   * Instead of hiding, position offscreen so it\\\'s still accessible to screen readers\\n   * https://bugs.chromium.org/p/chromium/issues/detail?id=1439785\\n   */\\n  position: fixed;\\n  left: -9999px;\\n}\\n.lh-metricfilter input[type=\\\'radio\\\']:focus-visible + label {\\n  outline: -webkit-focus-ring-color auto 1px;\\n}\\n\\n.lh-metricfilter__label {\\n  display: inline-flex;\\n  padding: 0 4px;\\n  height: 16px;\\n  text-decoration: underline;\\n  align-items: center;\\n  cursor: pointer;\\n  font-size: 90%;\\n}\\n\\n.lh-metricfilter__label--active {\\n  background: var(--color-blue-primary);\\n  color: var(--color-white);\\n  border-radius: 3px;\\n  text-decoration: none;\\n}\\n/* Give the \\\'All\\\' choice a more muted display */\\n.lh-metricfilter__label--active[for="metric-All"] {\\n  background-color: var(--color-blue-200) !important;\\n  color: black !important;\\n}\\n\\n.lh-metricfilter__text {\\n  margin-right: 8px;\\n}\\n\\n/* If audits are filtered, hide the itemcount for Passed Audits\u2026 */\\n.lh-category--filtered .lh-audit-group .lh-audit-group__itemcount {\\n  display: none;\\n}\\n\\n\\n.lh-audit__header:hover {\\n  background-color: var(--color-hover);\\n}\\n\\n/* We want to hide the browser\\\'s default arrow marker on summary elements. Admittedly, it\\\'s complicated. */\\n.lh-root details > summary {\\n  /* Blink 89+ and Firefox will hide the arrow when display is changed from (new) default of `list-item` to block.  https://chromestatus.com/feature/6730096436051968*/\\n  display: block;\\n}\\n/* Safari and Blink <=88 require using the -webkit-details-marker selector */\\n.lh-root details > summary::-webkit-details-marker {\\n  display: none;\\n}\\n\\n/* Perf Metric */\\n\\n.lh-metrics-container {\\n  display: grid;\\n  grid-auto-rows: 1fr;\\n  grid-template-columns: 1fr 1fr;\\n  grid-column-gap: var(--report-line-height);\\n  margin-bottom: var(--default-padding);\\n}\\n\\n.lh-metric {\\n  border-top: 1px solid var(--report-border-color-secondary);\\n}\\n\\n.lh-category:not(.lh--hoisted-meta) .lh-metric:nth-last-child(-n+2) {\\n  border-bottom: 1px solid var(--report-border-color-secondary);\\n}\\n\\n.lh-metric__innerwrap {\\n  display: grid;\\n  /**\\n   * Icon -- Metric Name\\n   *      -- Metric Value\\n   */\\n  grid-template-columns: calc(var(--score-icon-size) + var(--score-icon-margin-left) + var(--score-icon-margin-right)) 1fr;\\n  align-items: center;\\n  padding: var(--default-padding);\\n}\\n\\n.lh-metric__details {\\n  order: -1;\\n}\\n\\n.lh-metric__title {\\n  flex: 1;\\n}\\n\\n.lh-calclink {\\n  padding-left: calc(1ex / 3);\\n}\\n\\n.lh-metric__description {\\n  display: none;\\n  grid-column-start: 2;\\n  grid-column-end: 4;\\n  color: var(--report-text-color-secondary);\\n}\\n\\n.lh-metric__value {\\n  font-size: var(--metric-value-font-size);\\n  margin: calc(var(--default-padding) / 2) 0;\\n  white-space: nowrap; /* No wrapping between metric value and the icon */\\n  grid-column-start: 2;\\n}\\n\\n/**\\n* This media query is a temporary fallback for browsers that do not support `@container query`.\\n* TODO: remove this media query when `@container query` is fully supported by browsers\\n* See https://github.com/GoogleChrome/lighthouse/pull/16332\\n*/\\n@media screen and (max-width: 535px) {\\n  .lh-metrics-container {\\n    display: block;\\n  }\\n\\n  .lh-metric {\\n    border-bottom: none !important;\\n  }\\n  .lh-category:not(.lh--hoisted-meta) .lh-metric:nth-last-child(1) {\\n    border-bottom: 1px solid var(--report-border-color-secondary) !important;\\n  }\\n\\n  /* Change the grid to 3 columns for narrow viewport. */\\n  .lh-metric__innerwrap {\\n  /**\\n   * Icon -- Metric Name -- Metric Value\\n   */\\n    grid-template-columns: calc(var(--score-icon-size) + var(--score-icon-margin-left) + var(--score-icon-margin-right)) 2fr 1fr;\\n  }\\n  .lh-metric__value {\\n    justify-self: end;\\n    grid-column-start: unset;\\n  }\\n}\\n\\n@container lh-container (max-width: 535px) {\\n  .lh-metrics-container {\\n    display: block;\\n  }\\n\\n  .lh-metric {\\n    border-bottom: none !important;\\n  }\\n  .lh-category:not(.lh--hoisted-meta) .lh-metric:nth-last-child(1) {\\n    border-bottom: 1px solid var(--report-border-color-secondary) !important;\\n  }\\n\\n  /* Change the grid to 3 columns for narrow viewport. */\\n  .lh-metric__innerwrap {\\n  /**\\n   * Icon -- Metric Name -- Metric Value\\n   */\\n    grid-template-columns: calc(var(--score-icon-size) + var(--score-icon-margin-left) + var(--score-icon-margin-right)) 2fr 1fr;\\n  }\\n  .lh-metric__value {\\n    justify-self: end;\\n    grid-column-start: unset;\\n  }\\n}\\n\\n/* No-JS toggle switch */\\n/* Keep this selector sync\\\'d w/ `magicSelector` in report-ui-features-test.js */\\n .lh-metrics-toggle__input:checked ~ .lh-metrics-container .lh-metric__description {\\n  display: block;\\n}\\n\\n/* TODO get rid of the SVGS and clean up these some more */\\n.lh-metrics-toggle__input {\\n  opacity: 0;\\n  position: absolute;\\n  right: 0;\\n  top: 0px;\\n}\\n\\n.lh-metrics-toggle__input + div > label > .lh-metrics-toggle__labeltext--hide,\\n.lh-metrics-toggle__input:checked + div > label > .lh-metrics-toggle__labeltext--show {\\n  display: none;\\n}\\n.lh-metrics-toggle__input:checked + div > label > .lh-metrics-toggle__labeltext--hide {\\n  display: inline;\\n}\\n.lh-metrics-toggle__input:focus + div > label {\\n  outline: -webkit-focus-ring-color auto 3px;\\n}\\n\\n.lh-metrics-toggle__label {\\n  cursor: pointer;\\n  font-size: var(--report-font-size-secondary);\\n  line-height: var(--report-line-height-secondary);\\n  color: var(--color-gray-700);\\n}\\n\\n/* Pushes the metric description toggle button to the right. */\\n.lh-audit-group--metrics .lh-audit-group__header {\\n  display: flex;\\n  justify-content: space-between;\\n}\\n\\n.lh-metric__icon,\\n.lh-scorescale-range::before {\\n  content: \\\'\\\';\\n  width: var(--score-icon-size);\\n  height: var(--score-icon-size);\\n  display: inline-block;\\n  margin: var(--score-icon-margin);\\n}\\n\\n.lh-metric--pass .lh-metric__value {\\n  color: var(--color-pass-secondary);\\n}\\n.lh-metric--pass .lh-metric__icon {\\n  border-radius: 100%;\\n  background: var(--color-pass);\\n}\\n\\n.lh-metric--average .lh-metric__value {\\n  color: var(--color-average-secondary);\\n}\\n.lh-metric--average .lh-metric__icon {\\n  background: var(--color-average);\\n  width: var(--icon-square-size);\\n  height: var(--icon-square-size);\\n}\\n\\n.lh-metric--fail .lh-metric__value {\\n  color: var(--color-fail-secondary);\\n}\\n.lh-metric--fail .lh-metric__icon {\\n  border-left: calc(var(--score-icon-size) / 2) solid transparent;\\n  border-right: calc(var(--score-icon-size) / 2) solid transparent;\\n  border-bottom: var(--score-icon-size) solid var(--color-fail);\\n}\\n\\n.lh-metric--error .lh-metric__value,\\n.lh-metric--error .lh-metric__description {\\n  color: var(--color-fail-secondary);\\n}\\n\\n/* Filmstrip */\\n\\n.lh-filmstrip-container {\\n  /* smaller gap between metrics and filmstrip */\\n  margin: -8px auto 0 auto;\\n}\\n\\n.lh-filmstrip {\\n  display: flex;\\n  justify-content: space-between;\\n  justify-items: center;\\n  margin-bottom: var(--default-padding);\\n  width: 100%;\\n}\\n\\n.lh-filmstrip__frame {\\n  overflow: hidden;\\n  line-height: 0;\\n}\\n\\n.lh-filmstrip__thumbnail {\\n  border: 1px solid var(--report-border-color-secondary);\\n  max-height: 150px;\\n  max-width: 120px;\\n}\\n\\n/* Toggle Insights banner */\\n.lh-perf-insights-toggle {\\n  margin: calc(var(--default-padding) * 2) 0 var(--default-padding);\\n  display: flex;\\n  gap: var(--default-padding);\\n  align-items: center;\\n  background-color: rgba(30, 164, 70, 0.08);\\n\\n  padding: var(--toplevel-warning-padding);\\n  border-radius: 8px;\\n}\\n\\n.lh-perf-insights-toggle button {\\n  cursor: pointer;\\n  margin: 0;\\n  flex: 1;\\n}\\n\\n.lh-perf-toggle-text {\\n  align-items: center;\\n  flex: 5;\\n}\\n.lh-dark .lh-perf-toggle-text {\\n  color: rgba(30, 164, 70, 1);\\n}\\n\\n.lh-perf-toggle-text a {\\n  color: var(--link-color);\\n}\\n\\n.lh-perf-insights-icon {\\n  margin: 4px;\\n  background-repeat: no-repeat;\\n  background-image: var(--insights-icon-url);\\n  width: var(--report-icon-size);\\n  height: var(--report-icon-size);\\n  display: inline-block;\\n  vertical-align: middle;\\n}\\n\\n.lh-dark .lh-perf-insights-icon {\\n  background-image: var(--insights-icon-url-dark);\\n}\\n\\n/* Audit */\\n\\n.lh-audit {\\n  border-bottom: 1px solid var(--report-border-color-secondary);\\n}\\n\\n/* Apply border-top to just the first audit. */\\n.lh-audit {\\n  border-top: 1px solid var(--report-border-color-secondary);\\n}\\n.lh-audit ~ .lh-audit {\\n  border-top: none;\\n}\\n\\n\\n.lh-audit--error .lh-audit__display-text {\\n  color: var(--color-fail-secondary);\\n}\\n\\n/* Audit Group */\\n\\n.lh-audit-group {\\n  margin-bottom: var(--audit-group-margin-bottom);\\n  position: relative;\\n}\\n.lh-audit-group--metrics {\\n  margin-bottom: calc(var(--audit-group-margin-bottom) / 2);\\n}\\n\\n.lh-audit-group--metrics .lh-audit-group__summary {\\n  margin-top: 0;\\n  margin-bottom: 0;\\n}\\n\\n.lh-audit-group__summary {\\n  display: flex;\\n  justify-content: space-between;\\n  align-items: center;\\n}\\n\\n.lh-audit-group__header .lh-chevron {\\n  margin-top: calc((var(--report-line-height) - 5px) / 2);\\n}\\n\\n.lh-audit-group__header {\\n  letter-spacing: 0.8px;\\n  padding: var(--default-padding);\\n  padding-left: 0;\\n}\\n\\n.lh-audit-group__header, .lh-audit-group__summary {\\n  font-size: var(--report-font-size-secondary);\\n  line-height: var(--report-line-height-secondary);\\n  color: var(--color-gray-700);\\n}\\n\\n.lh-audit-group__title {\\n  text-transform: uppercase;\\n  font-weight: 500;\\n}\\n\\n.lh-audit-group__itemcount {\\n  color: var(--color-gray-600);\\n}\\n\\n.lh-audit-group__footer {\\n  color: var(--color-gray-600);\\n  display: block;\\n  margin-top: var(--default-padding);\\n}\\n\\n.lh-details,\\n.lh-category-header__description,\\n.lh-audit-group__footer {\\n  font-size: var(--report-font-size-secondary);\\n  line-height: var(--report-line-height-secondary);\\n}\\n\\n.lh-audit-explanation {\\n  margin: var(--audit-padding-vertical) 0 calc(var(--audit-padding-vertical) / 2) var(--audit-margin-horizontal);\\n  line-height: var(--audit-explanation-line-height);\\n  display: inline-block;\\n}\\n\\n.lh-audit--fail .lh-audit-explanation {\\n  color: var(--color-fail-secondary);\\n}\\n\\n/* Report */\\n.lh-list {\\n  margin-right: calc(var(--default-padding) * 2);\\n}\\n.lh-list > :not(:last-child) {\\n  margin-bottom: calc(var(--default-padding) * 2);\\n  border-bottom: 1px solid #A8C7FA;\\n}\\n.lh-list-section {\\n  padding: calc(var(--default-padding) * 2) 0;\\n}\\n.lh-list-section__title {\\n  text-decoration: underline;\\n}\\n\\n.lh-header-container {\\n  display: block;\\n  margin: 0 auto;\\n  position: relative;\\n  word-wrap: break-word;\\n}\\n\\n.lh-header-container .lh-scores-wrapper {\\n  border-bottom: 1px solid var(--color-gray-200);\\n}\\n\\n\\n.lh-report {\\n  min-width: var(--report-content-min-width);\\n}\\n\\n.lh-exception {\\n  font-size: large;\\n}\\n\\n.lh-code {\\n  white-space: normal;\\n  margin-top: 0;\\n  font-size: var(--report-monospace-font-size);\\n}\\n\\n.lh-warnings {\\n  --item-margin: calc(var(--report-line-height) / 6);\\n  color: var(--color-average-secondary);\\n  margin: var(--audit-padding-vertical) 0;\\n  padding: var(--default-padding)\\n    var(--default-padding)\\n    var(--default-padding)\\n    calc(var(--audit-description-padding-left));\\n  background-color: var(--toplevel-warning-background-color);\\n}\\n.lh-warnings span {\\n  font-weight: bold;\\n}\\n\\n.lh-warnings--toplevel {\\n  --item-margin: calc(var(--header-line-height) / 4);\\n  color: var(--toplevel-warning-text-color);\\n  margin-left: auto;\\n  margin-right: auto;\\n  max-width: var(--report-content-max-width-minus-edge-gap);\\n  padding: var(--toplevel-warning-padding);\\n  border-radius: 8px;\\n}\\n\\n.lh-warnings__msg {\\n  color: var(--toplevel-warning-message-text-color);\\n  margin: 0;\\n}\\n\\n.lh-warnings ul {\\n  margin: 0;\\n}\\n.lh-warnings li {\\n  margin: var(--item-margin) 0;\\n}\\n.lh-warnings li:last-of-type {\\n  margin-bottom: 0;\\n}\\n\\n.lh-scores-header {\\n  display: flex;\\n  flex-wrap: wrap;\\n  justify-content: center;\\n}\\n.lh-scores-header__solo {\\n  padding: 0;\\n  border: 0;\\n}\\n\\n/* Gauge */\\n\\n.lh-gauge__wrapper--pass {\\n  color: var(--color-pass-secondary);\\n  fill: var(--color-pass);\\n  stroke: var(--color-pass);\\n}\\n\\n.lh-gauge__wrapper--average {\\n  color: var(--color-average-secondary);\\n  fill: var(--color-average);\\n  stroke: var(--color-average);\\n}\\n\\n.lh-gauge__wrapper--fail {\\n  color: var(--color-fail-secondary);\\n  fill: var(--color-fail);\\n  stroke: var(--color-fail);\\n}\\n\\n.lh-gauge__wrapper--not-applicable {\\n  color: var(--color-not-applicable);\\n  fill: var(--color-not-applicable);\\n  stroke: var(--color-not-applicable);\\n}\\n\\n.lh-fraction__wrapper .lh-fraction__content::before {\\n  content: \\\'\\\';\\n  height: var(--score-icon-size);\\n  width: var(--score-icon-size);\\n  margin: var(--score-icon-margin);\\n  display: inline-block;\\n}\\n.lh-fraction__wrapper--pass .lh-fraction__content {\\n  color: var(--color-pass-secondary);\\n}\\n.lh-fraction__wrapper--pass .lh-fraction__background {\\n  background-color: var(--color-pass);\\n}\\n.lh-fraction__wrapper--pass .lh-fraction__content::before {\\n  background-color: var(--color-pass);\\n  border-radius: 50%;\\n}\\n.lh-fraction__wrapper--average .lh-fraction__content {\\n  color: var(--color-average-secondary);\\n}\\n.lh-fraction__wrapper--average .lh-fraction__background,\\n.lh-fraction__wrapper--average .lh-fraction__content::before {\\n  background-color: var(--color-average);\\n}\\n.lh-fraction__wrapper--fail .lh-fraction__content {\\n  color: var(--color-fail);\\n}\\n.lh-fraction__wrapper--fail .lh-fraction__background {\\n  background-color: var(--color-fail);\\n}\\n.lh-fraction__wrapper--fail .lh-fraction__content::before {\\n  border-left: calc(var(--score-icon-size) / 2) solid transparent;\\n  border-right: calc(var(--score-icon-size) / 2) solid transparent;\\n  border-bottom: var(--score-icon-size) solid var(--color-fail);\\n}\\n.lh-fraction__wrapper--null .lh-fraction__content {\\n  color: var(--color-gray-700);\\n}\\n.lh-fraction__wrapper--null .lh-fraction__background {\\n  background-color: var(--color-gray-700);\\n}\\n.lh-fraction__wrapper--null .lh-fraction__content::before {\\n  border-radius: 50%;\\n  border: calc(0.2 * var(--score-icon-size)) solid var(--color-gray-700);\\n}\\n\\n.lh-fraction__background {\\n  position: absolute;\\n  height: 100%;\\n  width: 100%;\\n  border-radius: calc(var(--gauge-circle-size) / 2);\\n  opacity: 0.1;\\n  z-index: -1;\\n}\\n\\n.lh-fraction__content-wrapper {\\n  height: var(--gauge-circle-size);\\n  display: flex;\\n  align-items: center;\\n}\\n\\n.lh-fraction__content {\\n  display: flex;\\n  position: relative;\\n  align-items: center;\\n  justify-content: center;\\n  font-size: calc(0.3 * var(--gauge-circle-size));\\n  line-height: calc(0.4 * var(--gauge-circle-size));\\n  width: max-content;\\n  min-width: calc(1.5 * var(--gauge-circle-size));\\n  padding: calc(0.1 * var(--gauge-circle-size)) calc(0.2 * var(--gauge-circle-size));\\n  --score-icon-size: calc(0.21 * var(--gauge-circle-size));\\n  --score-icon-margin: 0 calc(0.15 * var(--gauge-circle-size)) 0 0;\\n}\\n\\n.lh-gauge {\\n  stroke-linecap: round;\\n  width: var(--gauge-circle-size);\\n  height: var(--gauge-circle-size);\\n}\\n\\n.lh-category .lh-gauge {\\n  --gauge-circle-size: var(--gauge-circle-size-big);\\n}\\n\\n.lh-gauge-base {\\n  opacity: 0.1;\\n}\\n\\n.lh-gauge-arc {\\n  fill: none;\\n  transform-origin: 50% 50%;\\n  animation: load-gauge var(--transition-length) ease both;\\n  animation-delay: 250ms;\\n}\\n\\n.lh-gauge__svg-wrapper {\\n  position: relative;\\n  height: var(--gauge-circle-size);\\n}\\n.lh-category .lh-gauge__svg-wrapper,\\n.lh-category .lh-fraction__wrapper {\\n  --gauge-circle-size: var(--gauge-circle-size-big);\\n}\\n\\n/* The plugin badge overlay */\\n.lh-gauge__wrapper--plugin .lh-gauge__svg-wrapper::before {\\n  width: var(--plugin-badge-size);\\n  height: var(--plugin-badge-size);\\n  background-color: var(--plugin-badge-background-color);\\n  background-image: var(--plugin-icon-url);\\n  background-repeat: no-repeat;\\n  background-size: var(--plugin-icon-size);\\n  background-position: 58% 50%;\\n  content: "";\\n  position: absolute;\\n  right: -6px;\\n  bottom: 0px;\\n  display: block;\\n  z-index: 100;\\n  box-shadow: 0 0 4px rgba(0,0,0,.2);\\n  border-radius: 25%;\\n}\\n.lh-category .lh-gauge__wrapper--plugin .lh-gauge__svg-wrapper::before {\\n  width: var(--plugin-badge-size-big);\\n  height: var(--plugin-badge-size-big);\\n}\\n\\n@keyframes load-gauge {\\n  from { stroke-dasharray: 0 352; }\\n}\\n\\n.lh-gauge__percentage {\\n  width: 100%;\\n  height: var(--gauge-circle-size);\\n  line-height: var(--gauge-circle-size);\\n  position: absolute;\\n  font-family: var(--report-font-family-monospace);\\n  font-size: calc(var(--gauge-circle-size) * 0.34 + 1.3px);\\n  text-align: center;\\n  top: var(--score-container-padding);\\n}\\n\\n.lh-category .lh-gauge__percentage {\\n  --gauge-circle-size: var(--gauge-circle-size-big);\\n  --gauge-percentage-font-size: var(--gauge-percentage-font-size-big);\\n}\\n\\n.lh-gauge__wrapper,\\n.lh-fraction__wrapper {\\n  position: relative;\\n  display: flex;\\n  align-items: center;\\n  flex-direction: column;\\n  text-decoration: none;\\n  padding: var(--score-container-padding);\\n\\n  --transition-length: 1s;\\n\\n  /* Contain the layout style paint & layers during animation*/\\n  contain: content;\\n  will-change: opacity; /* Only using for layer promotion */\\n}\\n\\n.lh-gauge__label,\\n.lh-fraction__label {\\n  font-size: var(--gauge-label-font-size);\\n  font-weight: 500;\\n  line-height: var(--gauge-label-line-height);\\n  margin-top: 10px;\\n  text-align: center;\\n  color: var(--report-text-color);\\n  word-break: keep-all;\\n}\\n\\n/* TODO(#8185) use more BEM (.lh-gauge__label--big) instead of relying on descendant selector */\\n.lh-category .lh-gauge__label,\\n.lh-category .lh-fraction__label {\\n  --gauge-label-font-size: var(--gauge-label-font-size-big);\\n  --gauge-label-line-height: var(--gauge-label-line-height-big);\\n  margin-top: 14px;\\n}\\n\\n.lh-scores-header .lh-gauge__wrapper,\\n.lh-scores-header .lh-fraction__wrapper,\\n.lh-sticky-header .lh-gauge__wrapper,\\n.lh-sticky-header .lh-fraction__wrapper {\\n  width: var(--gauge-wrapper-width);\\n}\\n\\n.lh-scorescale {\\n  display: inline-flex;\\n\\n  gap: calc(var(--default-padding) * 4);\\n  margin: 16px auto 0 auto;\\n  font-size: var(--report-font-size-secondary);\\n  color: var(--color-gray-700);\\n\\n}\\n\\n.lh-scorescale-range {\\n  display: flex;\\n  align-items: center;\\n  font-family: var(--report-font-family-monospace);\\n  white-space: nowrap;\\n}\\n\\n.lh-category-header__finalscreenshot .lh-scorescale {\\n  border: 0;\\n  display: flex;\\n  justify-content: center;\\n}\\n\\n.lh-category-header__finalscreenshot .lh-scorescale-range {\\n  font-family: unset;\\n  font-size: 12px;\\n}\\n\\n.lh-scorescale-wrap {\\n  display: contents;\\n}\\n\\n/* Hide category score gauages if it\\\'s a single category report */\\n.lh-header--solo-category .lh-scores-wrapper {\\n  display: none;\\n}\\n\\n\\n.lh-categories {\\n  width: 100%;\\n}\\n\\n.lh-category {\\n  padding: var(--category-padding);\\n  max-width: var(--report-content-max-width);\\n  margin: 0 auto;\\n\\n  scroll-margin-top: calc(var(--sticky-header-buffer) - 1em);\\n}\\n\\n.lh-category-wrapper {\\n  border-bottom: 1px solid var(--color-gray-200);\\n}\\n.lh-category-wrapper:last-of-type {\\n  border-bottom: 0;\\n}\\n\\n.lh-category-header {\\n  margin-bottom: var(--section-padding-vertical);\\n}\\n\\n.lh-category-header .lh-score__gauge {\\n  max-width: 400px;\\n  width: auto;\\n  margin: 0px auto;\\n}\\n\\n.lh-category-header__finalscreenshot {\\n  display: grid;\\n  grid-template: none / 1fr 1px 1fr;\\n  justify-items: center;\\n  align-items: center;\\n  gap: var(--report-line-height);\\n  min-height: 288px;\\n  margin-bottom: var(--default-padding);\\n}\\n\\n.lh-final-ss-image {\\n  /* constrain the size of the image to not be too large */\\n  max-height: calc(var(--gauge-circle-size-big) * 2.8);\\n  max-width: calc(var(--gauge-circle-size-big) * 3.5);\\n  border: 1px solid var(--color-gray-200);\\n  padding: 4px;\\n  border-radius: 3px;\\n  display: block;\\n}\\n\\n.lh-category-headercol--separator {\\n  background: var(--color-gray-200);\\n  width: 1px;\\n  height: var(--gauge-circle-size-big);\\n}\\n\\n/**\\n* This media query is a temporary fallback for browsers that do not support `@container query`.\\n* TODO: remove this media query when `@container query` is fully supported by browsers\\n* See https://github.com/GoogleChrome/lighthouse/pull/16332\\n*/\\n@media screen and (max-width: 780px) {\\n  .lh-category-header__finalscreenshot {\\n    grid-template: 1fr 1fr / none\\n  }\\n  .lh-category-headercol--separator {\\n    display: none;\\n  }\\n}\\n\\n@container lh-container (max-width: 780px) {\\n  .lh-category-header__finalscreenshot {\\n    grid-template: 1fr 1fr / none\\n  }\\n  .lh-category-headercol--separator {\\n    display: none;\\n  }\\n}\\n\\n/**\\n* This media query is a temporary fallback for browsers that do not support `@container query`.\\n* TODO: remove this media query when `@container query` is fully supported by browsers\\n* See https://github.com/GoogleChrome/lighthouse/pull/16332\\n*/\\n@media screen and (max-width: 964px) {\\n  .lh-report {\\n    margin-left: 0;\\n    width: 100%;\\n  }\\n}\\n\\n/* 964 fits the min-width of the filmstrip */\\n@container lh-container (max-width: 964px) {\\n  .lh-report {\\n    margin-left: 0;\\n    width: 100%;\\n  }\\n}\\n\\n@media print {\\n  body {\\n    -webkit-print-color-adjust: exact; /* print background colors */\\n  }\\n  .lh-container {\\n    display: block;\\n  }\\n  .lh-report {\\n    margin-left: 0;\\n    padding-top: 0;\\n  }\\n  .lh-categories {\\n    margin-top: 0;\\n  }\\n  .lh-buttons, .lh-highlighter {\\n    /* hide stickyheader marker when printing. crbug.com/41486992 */\\n    display: none;\\n  }\\n}\\n\\n.lh-table {\\n  position: relative;\\n  border-collapse: separate;\\n  border-spacing: 0;\\n  /* Can\\\'t assign padding to table, so shorten the width instead. */\\n  width: calc(100% - var(--audit-description-padding-left) - var(--stackpack-padding-horizontal));\\n  border: 1px solid var(--report-border-color-secondary);\\n}\\n\\n.lh-table thead th {\\n  position: sticky;\\n  top: var(--sticky-header-buffer);\\n  z-index: 1;\\n  background-color: var(--report-background-color);\\n  border-bottom: 1px solid var(--report-border-color-secondary);\\n  font-weight: normal;\\n  color: var(--color-gray-600);\\n  /* See text-wrapping comment on .lh-container. */\\n  word-break: normal;\\n}\\n\\n.lh-row--group {\\n  background-color: var(--table-group-header-background-color);\\n}\\n\\n.lh-row--group td {\\n  font-weight: bold;\\n  font-size: 1.05em;\\n  color: var(--table-group-header-text-color);\\n}\\n\\n.lh-row--group td:first-child {\\n  display: block;\\n  min-width: max-content;\\n  font-weight: normal;\\n}\\n\\n.lh-row--group .lh-text {\\n  color: inherit;\\n  text-decoration: none;\\n  display: inline-block;\\n}\\n\\n.lh-row--group a.lh-link:hover {\\n  text-decoration: underline;\\n}\\n\\n.lh-row--group .lh-audit__adorn {\\n  text-transform: capitalize;\\n  font-weight: normal;\\n  padding: 2px 3px 1px 3px;\\n}\\n\\n.lh-row--group .lh-audit__adorn1p {\\n  color: var(--link-color);\\n  border-color: var(--link-color);\\n}\\n\\n.lh-row--group .lh-report-icon--external::before {\\n  content: "";\\n  background-repeat: no-repeat;\\n  width: 14px;\\n  height: 16px;\\n  opacity: 0.7;\\n  display: inline-block;\\n  vertical-align: middle;\\n}\\n\\n.lh-row--group .lh-report-icon--external {\\n  visibility: hidden;\\n}\\n\\n.lh-row--group:hover .lh-report-icon--external {\\n  visibility: visible;\\n}\\n\\n.lh-dark .lh-report-icon--external::before {\\n  filter: invert(1);\\n}\\n\\n/** Manages indentation of two-level and three-level nested adjacent rows */\\n\\n.lh-row--group ~ [data-entity]:not(.lh-row--group) td:first-child {\\n  padding-left: 20px;\\n}\\n\\n.lh-row--group ~ [data-entity]:not(.lh-row--group) ~ .lh-sub-item-row td:first-child {\\n  margin-left: 20px;\\n  padding-left: 10px;\\n  border-left: 1px solid #A8C7FA;\\n  display: block;\\n}\\n\\n.lh-row--even {\\n  background-color: var(--table-group-header-background-color);\\n}\\n.lh-row--hidden {\\n  display: none;\\n}\\n\\n.lh-table th,\\n.lh-table td {\\n  padding: var(--default-padding);\\n}\\n\\n.lh-table tr {\\n  vertical-align: middle;\\n}\\n\\n.lh-table tr:hover {\\n  background-color: var(--table-higlight-background-color);\\n}\\n\\n/* Looks unnecessary, but mostly for keeping the <th>s left-aligned */\\n.lh-table-column--text,\\n.lh-table-column--source-location,\\n.lh-table-column--url,\\n/* .lh-table-column--thumbnail, */\\n/* .lh-table-column--empty,*/\\n.lh-table-column--code,\\n.lh-table-column--node {\\n  text-align: left;\\n}\\n\\n.lh-table-column--code {\\n  min-width: 100px;\\n}\\n\\n.lh-table-column--bytes,\\n.lh-table-column--timespanMs,\\n.lh-table-column--ms,\\n.lh-table-column--numeric {\\n  text-align: right;\\n  word-break: normal;\\n}\\n\\n\\n\\n.lh-table .lh-table-column--thumbnail {\\n  width: var(--image-preview-size);\\n}\\n\\n.lh-table-column--url {\\n  min-width: 250px;\\n}\\n\\n.lh-table-column--text {\\n  min-width: 80px;\\n}\\n\\n/* Keep columns narrow if they follow the URL column */\\n/* 12% was determined to be a decent narrow width, but wide enough for column headings */\\n.lh-table-column--url + th.lh-table-column--bytes,\\n.lh-table-column--url + .lh-table-column--bytes + th.lh-table-column--bytes,\\n.lh-table-column--url + .lh-table-column--ms,\\n.lh-table-column--url + .lh-table-column--ms + th.lh-table-column--bytes,\\n.lh-table-column--url + .lh-table-column--bytes + th.lh-table-column--timespanMs {\\n  width: 12%;\\n}\\n\\n/** Tweak styling for tables in insight audits. */\\n.lh-audit[id$="-insight"] .lh-table {\\n  border: none;\\n}\\n\\n.lh-audit[id$="-insight"] .lh-table thead th {\\n  font-weight: bold;\\n  color: unset;\\n}\\n\\n.lh-audit[id$="-insight"] .lh-table th,\\n.lh-audit[id$="-insight"] .lh-table td {\\n  padding: calc(var(--default-padding) / 2);\\n}\\n\\n.lh-audit[id$="-insight"] .lh-table .lh-row--even,\\n.lh-audit[id$="-insight"] .lh-table tr:not(.lh-row--group):hover {\\n  background-color: unset;\\n}\\n\\n.lh-text__url-host {\\n  display: inline;\\n}\\n\\n.lh-text__url-host {\\n  margin-left: calc(var(--report-font-size) / 2);\\n  opacity: 0.6;\\n  font-size: 90%\\n}\\n\\n.lh-thumbnail {\\n  object-fit: cover;\\n  width: var(--image-preview-size);\\n  height: var(--image-preview-size);\\n  display: block;\\n}\\n\\n.lh-unknown pre {\\n  overflow: scroll;\\n  border: solid 1px var(--color-gray-200);\\n}\\n\\n.lh-text__url > a {\\n  color: inherit;\\n  text-decoration: none;\\n}\\n\\n.lh-text__url > a:hover {\\n  text-decoration: underline dotted #999;\\n}\\n\\n.lh-sub-item-row {\\n  margin-left: 20px;\\n  margin-bottom: 0;\\n  color: var(--color-gray-700);\\n}\\n\\n.lh-sub-item-row td {\\n  padding-top: 4px;\\n  padding-bottom: 4px;\\n  padding-left: 20px;\\n}\\n\\n.lh-sub-item-row .lh-element-screenshot {\\n  zoom: 0.6;\\n}\\n\\n/* Chevron\\n   https://codepen.io/paulirish/pen/LmzEmK\\n */\\n.lh-chevron {\\n  --chevron-angle: 42deg;\\n  /* Edge doesn\\\'t support transform: rotate(calc(...)), so we define it here */\\n  --chevron-angle-right: -42deg;\\n  width: var(--chevron-size);\\n  height: var(--chevron-size);\\n  margin-top: calc((var(--report-line-height) - 12px) / 2);\\n}\\n\\n.lh-chevron__lines {\\n  transition: transform 0.4s;\\n  transform: translateY(var(--report-line-height));\\n}\\n.lh-chevron__line {\\n stroke: var(--chevron-line-stroke);\\n stroke-width: var(--chevron-size);\\n stroke-linecap: square;\\n transform-origin: 50%;\\n transform: rotate(var(--chevron-angle));\\n transition: transform 300ms, stroke 300ms;\\n}\\n\\n.lh-expandable-details .lh-chevron__line-right,\\n.lh-expandable-details[open] .lh-chevron__line-left {\\n transform: rotate(var(--chevron-angle-right));\\n}\\n\\n.lh-expandable-details[open] .lh-chevron__line-right {\\n  transform: rotate(var(--chevron-angle));\\n}\\n\\n\\n.lh-expandable-details[open]  .lh-chevron__lines {\\n transform: translateY(calc(var(--chevron-size) * -1));\\n}\\n\\n.lh-expandable-details[open] {\\n  animation: 300ms openDetails forwards;\\n  padding-bottom: var(--default-padding);\\n}\\n\\n@keyframes openDetails {\\n  from {\\n    outline: 1px solid var(--report-background-color);\\n  }\\n  to {\\n   outline: 1px solid;\\n   box-shadow: 0 2px 4px rgba(0, 0, 0, .24);\\n  }\\n}\\n\\n/**\\n* This media query is a temporary fallback for browsers that do not support `@container query`.\\n* TODO: remove this media query when `@container query` is fully supported by browsers\\n* See https://github.com/GoogleChrome/lighthouse/pull/16332\\n*/\\n@media screen and (max-width: 780px) {\\n  /* no black outline if we\\\'re not confident the entire table can be displayed within bounds */\\n  .lh-expandable-details[open] {\\n    animation: none;\\n  }\\n}\\n\\n@container lh-container (max-width: 780px) {\\n  /* no black outline if we\\\'re not confident the entire table can be displayed within bounds */\\n  .lh-expandable-details[open] {\\n    animation: none;\\n  }\\n}\\n\\n.lh-expandable-details[open] summary, details.lh-clump > summary {\\n  border-bottom: 1px solid var(--report-border-color-secondary);\\n}\\ndetails.lh-clump[open] > summary {\\n  border-bottom-width: 0;\\n}\\n\\n\\n\\ndetails .lh-clump-toggletext--hide,\\ndetails[open] .lh-clump-toggletext--show { display: none; }\\ndetails[open] .lh-clump-toggletext--hide { display: block;}\\n\\n\\n/* Tooltip */\\n.lh-tooltip-boundary {\\n  position: relative;\\n}\\n\\n.lh-tooltip {\\n  position: absolute;\\n  display: none; /* Don\\\'t retain these layers when not needed */\\n  opacity: 0;\\n  background: #ffffff;\\n  white-space: pre-line; /* Render newlines in the text */\\n  min-width: 246px;\\n  max-width: 275px;\\n  padding: 15px;\\n  border-radius: 5px;\\n  text-align: initial;\\n  line-height: 1.4;\\n}\\n\\n/**\\n* This media query is a temporary fallback for browsers that do not support `@container query`.\\n* TODO: remove this media query when `@container query` is fully supported by browsers\\n* See https://github.com/GoogleChrome/lighthouse/pull/16332\\n*/\\n@media screen and (max-width: 535px) {\\n  .lh-tooltip {\\n    min-width: 45vw;\\n    padding: 3vw;\\n  }\\n}\\n\\n/* shrink tooltips to not be cutoff on left edge of narrow container\\n   45vw is chosen to be ~= width of the left column of metrics\\n*/\\n@container lh-container (max-width: 535px) {\\n  .lh-tooltip {\\n    min-width: 45vw;\\n    padding: 3vw;\\n  }\\n}\\n\\n.lh-tooltip-boundary:hover .lh-tooltip {\\n  display: block;\\n  animation: fadeInTooltip 250ms;\\n  animation-fill-mode: forwards;\\n  animation-delay: 850ms;\\n  bottom: 100%;\\n  z-index: 1;\\n  will-change: opacity;\\n  right: 0;\\n  pointer-events: none;\\n}\\n\\n.lh-tooltip::before {\\n  content: "";\\n  border: solid transparent;\\n  border-bottom-color: #fff;\\n  border-width: 10px;\\n  position: absolute;\\n  bottom: -20px;\\n  right: 6px;\\n  transform: rotate(180deg);\\n  pointer-events: none;\\n}\\n\\n@keyframes fadeInTooltip {\\n  0% { opacity: 0; }\\n  75% { opacity: 1; }\\n  100% { opacity: 1;  filter: drop-shadow(1px 0px 1px #aaa) drop-shadow(0px 2px 4px hsla(206, 6%, 25%, 0.15)); pointer-events: auto; }\\n}\\n\\n/* Element screenshot */\\n.lh-element-screenshot {\\n  float: left;\\n  margin-right: 20px;\\n}\\n.lh-element-screenshot__content {\\n  overflow: hidden;\\n  min-width: 110px;\\n  display: flex;\\n  justify-content: center;\\n  background-color: var(--report-background-color);\\n}\\n.lh-element-screenshot__image {\\n  position: relative;\\n  /* Set by ElementScreenshotRenderer.installFullPageScreenshotCssVariable */\\n  background-image: var(--element-screenshot-url);\\n  outline: 2px solid #777;\\n  background-color: white;\\n  background-repeat: no-repeat;\\n}\\n.lh-element-screenshot__mask {\\n  position: absolute;\\n  background: #555;\\n  opacity: 0.8;\\n}\\n.lh-element-screenshot__element-marker {\\n  position: absolute;\\n  outline: 2px solid var(--color-lime-400);\\n}\\n.lh-element-screenshot__overlay {\\n  position: fixed;\\n  top: 0;\\n  left: 0;\\n  right: 0;\\n  bottom: 0;\\n  z-index: 2000; /* .lh-topbar is 1000 */\\n  background: var(--screenshot-overlay-background);\\n  display: flex;\\n  align-items: center;\\n  justify-content: center;\\n  cursor: zoom-out;\\n}\\n\\n.lh-element-screenshot__overlay .lh-element-screenshot {\\n  margin-right: 0; /* clearing margin used in thumbnail case */\\n  outline: 1px solid var(--color-gray-700);\\n}\\n\\n.lh-screenshot-overlay--enabled .lh-element-screenshot {\\n  cursor: zoom-out;\\n}\\n.lh-screenshot-overlay--enabled .lh-node .lh-element-screenshot {\\n  cursor: zoom-in;\\n}\\n\\n\\n.lh-meta__items {\\n  --meta-icon-size: calc(var(--report-icon-size) * 0.667);\\n  padding: var(--default-padding);\\n  display: grid;\\n  grid-template-columns: 1fr 1fr 1fr;\\n  background-color: var(--env-item-background-color);\\n  border-radius: 3px;\\n  margin: 0 0 var(--default-padding) 0;\\n  font-size: 12px;\\n  column-gap: var(--default-padding);\\n  color: var(--color-gray-700);\\n}\\n\\n.lh-meta__item {\\n  display: block;\\n  list-style-type: none;\\n  position: relative;\\n  padding: 0 0 0 calc(var(--meta-icon-size) + var(--default-padding) * 2);\\n  cursor: unset; /* disable pointer cursor from report-icon */\\n}\\n\\n.lh-meta__item.lh-tooltip-boundary {\\n  text-decoration: dotted underline var(--color-gray-500);\\n  cursor: help;\\n}\\n\\n.lh-meta__item.lh-report-icon::before {\\n  position: absolute;\\n  left: var(--default-padding);\\n  width: var(--meta-icon-size);\\n  height: var(--meta-icon-size);\\n}\\n\\n.lh-meta__item.lh-report-icon:hover::before {\\n  opacity: 0.7;\\n}\\n\\n.lh-meta__item .lh-tooltip {\\n  color: var(--color-gray-800);\\n}\\n\\n.lh-meta__item .lh-tooltip::before {\\n  right: auto; /* Set the tooltip arrow to the leftside */\\n  left: 6px;\\n}\\n\\n/**\\n* This media query is a temporary fallback for browsers that do not support `@container query`.\\n* TODO: remove this media query when `@container query` is fully supported by browsers\\n* See https://github.com/GoogleChrome/lighthouse/pull/16332\\n*/\\n@media screen and (max-width: 640px) {\\n  .lh-meta__items {\\n    grid-template-columns: 1fr 1fr;\\n  }\\n}\\n\\n/* Change the grid for narrow container */\\n@container lh-container (max-width: 640px) {\\n  .lh-meta__items {\\n    grid-template-columns: 1fr 1fr;\\n  }\\n}\\n\\n/**\\n* This media query is a temporary fallback for browsers that do not support `@container query`.\\n* TODO: remove this media query when `@container query` is fully supported by browsers\\n* See https://github.com/GoogleChrome/lighthouse/pull/16332\\n*/\\n@media screen and (max-width: 535px) {\\n  .lh-meta__items {\\n    display: block;\\n  }\\n}\\n\\n@container lh-container (max-width: 535px) {\\n  .lh-meta__items {\\n    display: block;\\n  }\\n}\\n\\n/* Explodey gauge */\\n\\n.lh-exp-gauge-component {\\n  margin-bottom: 10px;\\n}\\n\\n.lh-exp-gauge-component circle {\\n  stroke: currentcolor;\\n  r: var(--radius);\\n}\\n\\n.lh-exp-gauge-component text {\\n  font-size: calc(var(--radius) * 0.2);\\n}\\n\\n.lh-exp-gauge-component .lh-exp-gauge {\\n  margin: 0 auto;\\n  width: 225px;\\n  stroke-width: var(--stroke-width);\\n  stroke-linecap: round;\\n\\n  /* for better rendering perf */\\n  contain: strict;\\n  height: 225px;\\n  will-change: transform;\\n}\\n.lh-exp-gauge-component .lh-exp-gauge--faded {\\n  opacity: 0.1;\\n}\\n.lh-exp-gauge-component .lh-exp-gauge__wrapper {\\n  font-family: var(--report-font-family-monospace);\\n  text-align: center;\\n  text-decoration: none;\\n  transition: .3s;\\n}\\n.lh-exp-gauge-component .lh-exp-gauge__wrapper--pass {\\n  color: var(--color-pass);\\n}\\n.lh-exp-gauge-component .lh-exp-gauge__wrapper--average {\\n  color: var(--color-average);\\n}\\n.lh-exp-gauge-component .lh-exp-gauge__wrapper--fail {\\n  color: var(--color-fail);\\n}\\n.lh-exp-gauge-component .state--expanded {\\n  transition: color .3s;\\n}\\n.lh-exp-gauge-component .state--highlight {\\n  color: var(--color-highlight);\\n}\\n.lh-exp-gauge-component .lh-exp-gauge__svg-wrapper {\\n  display: flex;\\n  flex-direction: column-reverse;\\n}\\n\\n.lh-exp-gauge-component .lh-exp-gauge__label {\\n  fill: var(--report-text-color);\\n  font-family: var(--report-font-family);\\n  font-size: 12px;\\n}\\n\\n.lh-exp-gauge-component .lh-exp-gauge__cutout {\\n  opacity: .999;\\n  transition: opacity .3s;\\n}\\n.lh-exp-gauge-component .state--highlight .lh-exp-gauge__cutout {\\n  opacity: 0;\\n}\\n\\n.lh-exp-gauge-component .lh-exp-gauge__inner {\\n  color: inherit;\\n}\\n.lh-exp-gauge-component .lh-exp-gauge__base {\\n  fill: currentcolor;\\n}\\n\\n\\n.lh-exp-gauge-component .lh-exp-gauge__arc {\\n  fill: none;\\n  transition: opacity .3s;\\n}\\n.lh-exp-gauge-component .lh-exp-gauge__arc--metric {\\n  color: var(--metric-color);\\n  stroke-dashoffset: var(--metric-offset);\\n  opacity: 0.3;\\n}\\n.lh-exp-gauge-component .lh-exp-gauge-hovertarget {\\n  color: currentcolor;\\n  opacity: 0.001;\\n  stroke-linecap: butt;\\n  stroke-width: 24;\\n  /* hack. move the hover target out of the center. ideally i tweak the r instead but that rquires considerably more math. */\\n  transform: scale(1.15);\\n}\\n.lh-exp-gauge-component .lh-exp-gauge__arc--metric.lh-exp-gauge--miniarc {\\n  opacity: 0;\\n  stroke-dasharray: 0 calc(var(--circle-meas) * var(--radius));\\n  transition: 0s .005s;\\n}\\n.lh-exp-gauge-component .state--expanded .lh-exp-gauge__arc--metric.lh-exp-gauge--miniarc {\\n  opacity: .999;\\n  stroke-dasharray: var(--metric-array);\\n  transition: 0.3s; /*  calc(.005s + var(--i)*.05s); entrace animation */\\n}\\n.lh-exp-gauge-component .state--expanded .lh-exp-gauge__inner .lh-exp-gauge__arc {\\n  opacity: 0;\\n}\\n\\n\\n.lh-exp-gauge-component .lh-exp-gauge__percentage {\\n  text-anchor: middle;\\n  dominant-baseline: middle;\\n  opacity: .999;\\n  font-size: calc(var(--radius) * 0.625);\\n  transition: opacity .3s ease-in;\\n}\\n.lh-exp-gauge-component .state--highlight .lh-exp-gauge__percentage {\\n  opacity: 0;\\n}\\n\\n.lh-exp-gauge-component .lh-exp-gauge__wrapper--fail .lh-exp-gauge__percentage {\\n  fill: var(--color-fail);\\n}\\n.lh-exp-gauge-component .lh-exp-gauge__wrapper--average .lh-exp-gauge__percentage {\\n  fill: var(--color-average);\\n}\\n.lh-exp-gauge-component .lh-exp-gauge__wrapper--pass .lh-exp-gauge__percentage {\\n  fill: var(--color-pass);\\n}\\n\\n.lh-exp-gauge-component .lh-cover {\\n  fill: none;\\n  opacity: .001;\\n  pointer-events: none;\\n}\\n.lh-exp-gauge-component .state--expanded .lh-cover {\\n  pointer-events: auto;\\n}\\n\\n.lh-exp-gauge-component .metric {\\n  transform: scale(var(--scale-initial));\\n  opacity: 0;\\n  transition: transform .1s .2s ease-out,  opacity .3s ease-out;\\n  pointer-events: none;\\n}\\n.lh-exp-gauge-component .metric text {\\n  pointer-events: none;\\n}\\n.lh-exp-gauge-component .metric__value {\\n  fill: currentcolor;\\n  opacity: 0;\\n  transition: opacity 0.2s;\\n}\\n.lh-exp-gauge-component .state--expanded .metric {\\n  transform: scale(1);\\n  opacity: .999;\\n  transition: transform .3s ease-out,  opacity .3s ease-in,  stroke-width .1s ease-out;\\n  transition-delay: calc(var(--i)*.05s);\\n  pointer-events: auto;\\n}\\n.lh-exp-gauge-component .state--highlight .metric {\\n  opacity: .3;\\n}\\n.lh-exp-gauge-component .state--highlight .metric--highlight {\\n  opacity: .999;\\n  stroke-width: calc(1.5*var(--stroke-width));\\n}\\n.lh-exp-gauge-component .state--highlight .metric--highlight .metric__value {\\n  opacity: 0.999;\\n}\\n\\n\\n/*\\n the initial first load peek\\n*/\\n.lh-exp-gauge-component .lh-exp-gauge__bg {  /* needed for the use zindex stacking w/ transparency */\\n  fill: var(--report-background-color);\\n  stroke: var(--report-background-color);\\n}\\n.lh-exp-gauge-component .state--peek .metric {\\n  transition-delay: 0ms;\\n  animation: peek var(--peek-dur) cubic-bezier(0.46, 0.03, 0.52, 0.96);\\n  animation-fill-mode: forwards;\\n}\\n.lh-exp-gauge-component .state--peek .lh-exp-gauge__inner .lh-exp-gauge__arc {\\n  opacity: 1;\\n}\\n.lh-exp-gauge-component .state--peek .lh-exp-gauge__arc.lh-exp-gauge--faded {\\n  opacity: 0.3; /* just a tad stronger cuz its fighting with a big solid arg */\\n}\\n/* do i need to set expanded and override this? */\\n.lh-exp-gauge-component .state--peek .lh-exp-gauge__arc--metric.lh-exp-gauge--miniarc {\\n  transition: opacity 0.3s;\\n}\\n.lh-exp-gauge-component .state--peek {\\n  color: unset;\\n}\\n.lh-exp-gauge-component .state--peek .metric__label {\\n  display: none;\\n}\\n\\n.lh-exp-gauge-component .metric__label {\\n  fill: var(--report-text-color);\\n}\\n\\n@keyframes peek {\\n  /* biggest it should go is 0.92. smallest is 0.8 */\\n  0% {\\n    transform: scale(0.8);\\n    opacity: 0.8;\\n  }\\n\\n  50% {\\n    transform: scale(0.92);\\n    opacity: 1;\\n  }\\n\\n  100% {\\n    transform: scale(0.8);\\n    opacity: 0.8;\\n  }\\n}\\n\\n.lh-exp-gauge-component .wrapper {\\n  width: 620px;\\n}\\n\\n/*# sourceURL=report-styles.css */\\n\'),t.append(n),t}(e);case"topbar":return function(e){let t=e.createFragment(),n=e.createElement("style");n.append("\\n    .lh-topbar {\\n      position: sticky;\\n      top: 0;\\n      left: 0;\\n      right: 0;\\n      z-index: 1000;\\n      display: flex;\\n      align-items: center;\\n      height: var(--topbar-height);\\n      padding: var(--topbar-padding);\\n      font-size: var(--report-font-size-secondary);\\n      background-color: var(--topbar-background-color);\\n      border-bottom: 1px solid var(--color-gray-200);\\n    }\\n\\n    .lh-topbar__logo {\\n      width: var(--topbar-logo-size);\\n      height: var(--topbar-logo-size);\\n      user-select: none;\\n      flex: none;\\n    }\\n\\n    .lh-topbar__url {\\n      margin: var(--topbar-padding);\\n      text-decoration: none;\\n      color: var(--report-text-color);\\n      text-overflow: ellipsis;\\n      overflow: hidden;\\n      white-space: nowrap;\\n    }\\n\\n    .lh-tools {\\n      display: flex;\\n      align-items: center;\\n      margin-left: auto;\\n      will-change: transform;\\n      min-width: var(--report-icon-size);\\n    }\\n    .lh-tools__button {\\n      width: var(--report-icon-size);\\n      min-width: 24px;\\n      height: var(--report-icon-size);\\n      cursor: pointer;\\n      margin-right: 5px;\\n      /* This is actually a button element, but we want to style it like a transparent div. */\\n      display: flex;\\n      background: none;\\n      color: inherit;\\n      border: none;\\n      padding: 0;\\n      font: inherit;\\n      outline: inherit;\\n    }\\n    .lh-tools__button svg {\\n      fill: var(--tools-icon-color);\\n    }\\n    .lh-dark .lh-tools__button svg {\\n      filter: invert(1);\\n    }\\n    .lh-tools__button.lh-active + .lh-tools__dropdown {\\n      opacity: 1;\\n      clip: rect(-1px, 194px, 270px, -3px);\\n      visibility: visible;\\n    }\\n    .lh-tools__dropdown {\\n      position: absolute;\\n      background-color: var(--report-background-color);\\n      border: 1px solid var(--report-border-color);\\n      border-radius: 3px;\\n      padding: calc(var(--default-padding) / 2) 0;\\n      cursor: pointer;\\n      top: 36px;\\n      right: 0;\\n      box-shadow: 1px 1px 3px #ccc;\\n      min-width: 125px;\\n      clip: rect(0, 164px, 0, 0);\\n      visibility: hidden;\\n      opacity: 0;\\n      transition: all 200ms cubic-bezier(0,0,0.2,1);\\n    }\\n    .lh-tools__dropdown a {\\n      color: currentColor;\\n      text-decoration: none;\\n      white-space: nowrap;\\n      padding: 0 6px;\\n      line-height: 2;\\n    }\\n    .lh-tools__dropdown a:hover,\\n    .lh-tools__dropdown a:focus {\\n      background-color: var(--color-gray-200);\\n      outline: none;\\n    }\\n    /* save-gist option hidden in report. */\\n    .lh-tools__dropdown a[data-action=\'save-gist\'] {\\n      display: none;\\n    }\\n\\n    .lh-locale-selector {\\n      width: 100%;\\n      color: var(--report-text-color);\\n      background-color: var(--locale-selector-background-color);\\n      padding: 2px;\\n    }\\n    .lh-tools-locale {\\n      display: flex;\\n      align-items: center;\\n      flex-direction: row-reverse;\\n    }\\n    .lh-tools-locale__selector-wrapper {\\n      transition: opacity 0.15s;\\n      opacity: 0;\\n      max-width: 200px;\\n    }\\n    .lh-button.lh-tool-locale__button {\\n      height: var(--topbar-height);\\n      color: var(--tools-icon-color);\\n      padding: calc(var(--default-padding) / 2);\\n    }\\n    .lh-tool-locale__button.lh-active + .lh-tools-locale__selector-wrapper {\\n      opacity: 1;\\n      clip: rect(-1px, 255px, 242px, -3px);\\n      visibility: visible;\\n      margin: 0 4px;\\n    }\\n\\n    /**\\n    * This media query is a temporary fallback for browsers that do not support `@container query`.\\n    * TODO: remove this media query when `@container query` is fully supported by browsers\\n    * See https://github.com/GoogleChrome/lighthouse/pull/16332\\n    */\\n    @media screen and (max-width: 964px) {\\n      .lh-tools__dropdown {\\n        right: 0;\\n        left: initial;\\n      }\\n    }\\n\\n    @container lh-container (max-width: 964px) {\\n      .lh-tools__dropdown {\\n        right: 0;\\n        left: initial;\\n      }\\n    }\\n\\n    @media print {\\n      .lh-topbar {\\n        position: static;\\n        margin-left: 0;\\n      }\\n\\n      .lh-tools__dropdown {\\n        display: none;\\n      }\\n    }\\n  "),t.append(n);let r=e.createElement("div","lh-topbar"),i=e.createElementNS("http://www.w3.org/2000/svg","svg","lh-topbar__logo");i.setAttribute("role","img"),i.setAttribute("title","Lighthouse logo"),i.setAttribute("fill","none"),i.setAttribute("xmlns","http://www.w3.org/2000/svg"),i.setAttribute("viewBox","0 0 48 48");let a=e.createElementNS("http://www.w3.org/2000/svg","path");a.setAttribute("d","m14 7 10-7 10 7v10h5v7h-5l5 24H9l5-24H9v-7h5V7Z"),a.setAttribute("fill","#F63");let o=e.createElementNS("http://www.w3.org/2000/svg","path");o.setAttribute("d","M31.561 24H14l-1.689 8.105L31.561 24ZM18.983 48H9l1.022-4.907L35.723 32.27l1.663 7.98L18.983 48Z"),o.setAttribute("fill","#FFA385");let l=e.createElementNS("http://www.w3.org/2000/svg","path");l.setAttribute("fill","#FF3"),l.setAttribute("d","M20.5 10h7v7h-7z"),i.append(" ",a," ",o," ",l," ");let s=e.createElement("a","lh-topbar__url");s.setAttribute("href",""),s.setAttribute("target","_blank"),s.setAttribute("rel","noopener");let c=e.createElement("div","lh-tools"),d=e.createElement("div","lh-tools-locale lh-hidden"),h=e.createElement("button","lh-button lh-tool-locale__button");h.setAttribute("id","lh-button__swap-locales"),h.setAttribute("title","Show Language Picker"),h.setAttribute("aria-label","Toggle language picker"),h.setAttribute("aria-haspopup","menu"),h.setAttribute("aria-expanded","false"),h.setAttribute("aria-controls","lh-tools-locale__selector-wrapper");let p=e.createElementNS("http://www.w3.org/2000/svg","svg");p.setAttribute("width","20px"),p.setAttribute("height","20px"),p.setAttribute("viewBox","0 0 24 24"),p.setAttribute("fill","currentColor");let g=e.createElementNS("http://www.w3.org/2000/svg","path");g.setAttribute("d","M0 0h24v24H0V0z"),g.setAttribute("fill","none");let u=e.createElementNS("http://www.w3.org/2000/svg","path");u.setAttribute("d","M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"),p.append(g,u),h.append(" ",p," ");let m=e.createElement("div","lh-tools-locale__selector-wrapper");m.setAttribute("id","lh-tools-locale__selector-wrapper"),m.setAttribute("role","menu"),m.setAttribute("aria-labelledby","lh-button__swap-locales"),m.setAttribute("aria-hidden","true"),m.append(" "," "),d.append(" ",h," ",m," ");let f=e.createElement("button","lh-tools__button");f.setAttribute("id","lh-tools-button"),f.setAttribute("title","Tools menu"),f.setAttribute("aria-label","Toggle report tools menu"),f.setAttribute("aria-haspopup","menu"),f.setAttribute("aria-expanded","false"),f.setAttribute("aria-controls","lh-tools-dropdown");let v=e.createElementNS("http://www.w3.org/2000/svg","svg");v.setAttribute("width","100%"),v.setAttribute("height","100%"),v.setAttribute("viewBox","0 0 24 24");let b=e.createElementNS("http://www.w3.org/2000/svg","path");b.setAttribute("d","M0 0h24v24H0z"),b.setAttribute("fill","none");let _=e.createElementNS("http://www.w3.org/2000/svg","path");_.setAttribute("d","M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"),v.append(" ",b," ",_," "),f.append(" ",v," ");let w=e.createElement("div","lh-tools__dropdown");w.setAttribute("id","lh-tools-dropdown"),w.setAttribute("role","menu"),w.setAttribute("aria-labelledby","lh-tools-button");let y=e.createElement("a","lh-report-icon lh-report-icon--print");y.setAttribute("role","menuitem"),y.setAttribute("tabindex","-1"),y.setAttribute("href","#"),y.setAttribute("data-i18n","dropdownPrintSummary"),y.setAttribute("data-action","print-summary");let x=e.createElement("a","lh-report-icon lh-report-icon--print");x.setAttribute("role","menuitem"),x.setAttribute("tabindex","-1"),x.setAttribute("href","#"),x.setAttribute("data-i18n","dropdownPrintExpanded"),x.setAttribute("data-action","print-expanded");let k=e.createElement("a","lh-report-icon lh-report-icon--copy");k.setAttribute("role","menuitem"),k.setAttribute("tabindex","-1"),k.setAttribute("href","#"),k.setAttribute("data-i18n","dropdownCopyJSON"),k.setAttribute("data-action","copy");let E=e.createElement("a","lh-report-icon lh-report-icon--download lh-hidden");E.setAttribute("role","menuitem"),E.setAttribute("tabindex","-1"),E.setAttribute("href","#"),E.setAttribute("data-i18n","dropdownSaveHTML"),E.setAttribute("data-action","save-html");let S=e.createElement("a","lh-report-icon lh-report-icon--download");S.setAttribute("role","menuitem"),S.setAttribute("tabindex","-1"),S.setAttribute("href","#"),S.setAttribute("data-i18n","dropdownSaveJSON"),S.setAttribute("data-action","save-json");let C=e.createElement("a","lh-report-icon lh-report-icon--open");C.setAttribute("role","menuitem"),C.setAttribute("tabindex","-1"),C.setAttribute("href","#"),C.setAttribute("data-i18n","dropdownViewer"),C.setAttribute("data-action","open-viewer");let A=e.createElement("a","lh-report-icon lh-report-icon--open");A.setAttribute("role","menuitem"),A.setAttribute("tabindex","-1"),A.setAttribute("href","#"),A.setAttribute("data-i18n","dropdownSaveGist"),A.setAttribute("data-action","save-gist");let L=e.createElement("a","lh-report-icon lh-report-icon--open lh-hidden");L.setAttribute("role","menuitem"),L.setAttribute("tabindex","-1"),L.setAttribute("href","#"),L.setAttribute("data-i18n","dropdownViewUnthrottledTrace"),L.setAttribute("data-action","view-unthrottled-trace");let z=e.createElement("a","lh-report-icon lh-report-icon--dark");return z.setAttribute("role","menuitem"),z.setAttribute("tabindex","-1"),z.setAttribute("href","#"),z.setAttribute("data-i18n","dropdownDarkTheme"),z.setAttribute("data-action","toggle-dark"),w.append(" ",y," ",x," ",k," "," ",E," ",S," ",C," ",A," "," ",L," ",z," "),c.append(" ",d," ",f," ",w," "),r.append(" "," ",i," ",s," ",c," "),t.append(r),t}(e);case"warningsToplevel":return function(e){let t=e.createFragment(),n=e.createElement("div","lh-warnings lh-warnings--toplevel"),r=e.createElement("p","lh-warnings__msg"),i=e.createElement("ul");return n.append(" ",r," ",i," "),t.append(n),t}(e)}throw new Error("unexpected component: "+t)}(this,e),this._componentCache.set(e,t),t.cloneNode(!0)}clearComponentCache(){this._componentCache.clear()}convertMarkdownLinkSnippets(e,t={}){let n=this.createElement("span");for(let r of i.splitMarkdownLink(e)){let e=r.text.includes("`")?this.convertMarkdownCodeSnippets(r.text):r.text;if(!r.isLink){n.append(e);continue}let i=new URL(r.linkHref);(["https://developers.google.com","https://web.dev","https://developer.chrome.com"].includes(i.origin)||t.alwaysAppendUtmSource)&&(i.searchParams.set("utm_source","lighthouse"),i.searchParams.set("utm_medium",this._lighthouseChannel));let a=this.createElement("a");a.rel="noopener",a.target="_blank",a.append(e),this.safelySetHref(a,i.href),n.append(a)}return n}safelySetHref(e,t){if((t=t||"").startsWith("#"))return void(e.href=t);let n;try{n=new URL(t)}catch{}n&&["https:","http:"].includes(n.protocol)&&(e.href=n.href)}safelySetBlobHref(e,t){if("text/html"!==t.type&&"application/json"!==t.type)throw new Error("Unsupported blob type");let n=URL.createObjectURL(t);e.href=n}convertMarkdownCodeSnippets(e){let t=this.createElement("span");for(let n of i.splitMarkdownCodeSpans(e))if(n.isCode){let e=this.createElement("code");e.textContent=n.text,t.append(e)}else t.append(this._document.createTextNode(n.text));return t}setLighthouseChannel(e){this._lighthouseChannel=e}document(){return this._document}isDevTools(){return!!this._document.querySelector(".lh-devtools")}find(e,t=this.rootEl??this._document){let n=this.maybeFind(e,t);if(null===n)throw new Error(`query ${e} not found`);return n}maybeFind(e,t=this.rootEl??this._document){return t.querySelector(e)}findAll(e,t){return Array.from(t.querySelectorAll(e))}fireEventOn(e,t=this._document,n){let r=new CustomEvent(e,n?{detail:n}:void 0);t.dispatchEvent(r)}saveFile(e,t){let n=this.createElement("a");n.download=t,this.safelySetBlobHref(n,e),this._document.body.append(n),n.click(),this._document.body.removeChild(n),setTimeout((()=>URL.revokeObjectURL(n.href)),500)}registerSwappableSections(e,t){this._swappableSections.set(e,t),this._swappableSections.set(t,e)}swapSectionIfPossible(e){let t=this._swappableSections.get(e);if(!t)return;let n=e.parentNode;if(!n)return;let r=e.querySelectorAll("style");t.append(...r),n.insertBefore(t,e),e.remove(),this._onSwap(),this._onSwapHook&&this._onSwapHook()}},o=0,l=class e{static i18n=null;static strings={};static reportJson=null;static apply(t){e.strings={...h,...t.providedStrings},e.i18n=t.i18n,e.reportJson=t.reportJson}static getUniqueSuffix(){return o++}static resetUniqueSuffix(){o=0}},s="data:image/jpeg;base64,";var c=i.RATINGS,d=class e{static prepareReportResult(t){let n=JSON.parse(JSON.stringify(t));!function(e){e.configSettings.locale||(e.configSettings.locale="en"),e.configSettings.formFactor||(e.configSettings.formFactor=e.configSettings.emulatedFormFactor),e.finalDisplayedUrl=i.getFinalDisplayedUrl(e),e.mainDocumentUrl=i.getMainDocumentUrl(e);for(let t of Object.values(e.audits))if(("not_applicable"===t.scoreDisplayMode||"not-applicable"===t.scoreDisplayMode)&&(t.scoreDisplayMode="notApplicable"),"informative"===t.scoreDisplayMode&&(t.score=1),t.details){if((void 0===t.details.type||"diagnostic"===t.details.type)&&(t.details.type="debugdata"),"filmstrip"===t.details.type)for(let e of t.details.items)e.data.startsWith(s)||(e.data=s+e.data);if("table"===t.details.type)for(let e of t.details.headings){let{itemType:t,text:n}=e;void 0!==t&&(e.valueType=t,delete e.itemType),void 0!==n&&(e.label=n,delete e.text);let r=e.subItemsHeading?.itemType;e.subItemsHeading&&void 0!==r&&(e.subItemsHeading.valueType=r,delete e.subItemsHeading.itemType)}if("third-party-summary"===t.id&&("opportunity"===t.details.type||"table"===t.details.type)){let{headings:e,items:n}=t.details;if("link"===e[0].valueType){e[0].valueType="text";for(let e of n)"object"==typeof e.entity&&"link"===e.entity.type&&(e.entity=e.entity.text);t.details.isEntityGrouped=!0}}}let[t]=e.lighthouseVersion.split(".").map(Number),n=e.categories.performance;if(n)if(t<9){e.categoryGroups||(e.categoryGroups={}),e.categoryGroups.hidden={title:""};for(let e of n.auditRefs)e.group?"load-opportunities"===e.group&&(e.group="diagnostics"):e.group="hidden"}else if(t<12)for(let e of n.auditRefs)e.group||(e.group="diagnostics");if(t<12&&n){let t=new Map;for(let e of n.auditRefs){let n=e.relevantAudits;if(n&&e.acronym)for(let r of n){let n=t.get(r)||[];n.push(e.acronym),t.set(r,n)}}for(let[n,r]of t){if(!r.length)continue;let t=e.audits[n];if(t&&!t.metricSavings){t.metricSavings={};for(let e of r)t.metricSavings[e]=0}}}if(e.environment||(e.environment={benchmarkIndex:0,networkUserAgent:e.userAgent,hostUserAgent:e.userAgent}),e.configSettings.screenEmulation||(e.configSettings.screenEmulation={width:-1,height:-1,deviceScaleFactor:-1,mobile:/mobile/i.test(e.environment.hostUserAgent),disabled:!1}),e.i18n||(e.i18n={}),e.audits["full-page-screenshot"]){let t=e.audits["full-page-screenshot"].details;e.fullPageScreenshot=t?{screenshot:t.screenshot,nodes:t.nodes}:null,delete e.audits["full-page-screenshot"]}}(n);for(let t of Object.values(n.audits))t.details&&("opportunity"===t.details.type||"table"===t.details.type)&&!t.details.isEntityGrouped&&n.entities&&e.classifyEntities(n.entities,t.details);if("object"!=typeof n.categories)throw new Error("No categories provided.");let r=new Map;for(let e of Object.values(n.categories))e.auditRefs.forEach((e=>{e.acronym&&r.set(e.acronym,e)})),e.auditRefs.forEach((e=>{let t=n.audits[e.id];e.result=t;let i=Object.keys(e.result.metricSavings||{});if(i.length){e.relevantMetrics=[];for(let t of i){let n=r.get(t);n&&e.relevantMetrics.push(n)}}if(n.stackPacks){let t=[e.id,...e.result.replacesAudits??[]];n.stackPacks.forEach((n=>{let r=t.find((e=>n.descriptions[e]));r&&n.descriptions[r]&&(e.stackPacks=e.stackPacks||[],e.stackPacks.push({title:n.title,iconDataURL:n.iconDataURL,description:n.descriptions[r]}))}))}}));return n}static getUrlLocatorFn(e){let t=e.find((e=>"url"===e.valueType))?.key;if(t&&"string"==typeof t)return e=>{let n=e[t];if("string"==typeof n)return n};let n=e.find((e=>"source-location"===e.valueType))?.key;return n?e=>{let t=e[n];if("object"==typeof t&&"source-location"===t.type)return t.url}:void 0}static classifyEntities(t,n){let{items:r,headings:a}=n;if(!r.length||r.some((e=>e.entity)))return;let o=e.getUrlLocatorFn(a);if(o)for(let e of r){let n=o(e);if(!n)continue;let r="";try{r=i.parseURL(n).origin}catch{}if(!r)continue;let a=t.find((e=>e.origins.includes(r)));a&&(e.entity=a.name)}}static getTableItemSortComparator(e){return(t,n)=>{for(let r of e){let e=t[r],i=n[r];if((typeof e!=typeof i||!["number","string"].includes(typeof e))&&console.warn(`Warning: Attempting to sort unsupported value type: ${r}.`),"number"==typeof e&&"number"==typeof i&&e!==i)return i-e;if("string"==typeof e&&"string"==typeof i&&e!==i)return e.localeCompare(i)}return 0}}static getEmulationDescriptions(e){let t,n,r,i=e.throttling,a=l.i18n,o=l.strings;switch(e.throttlingMethod){case"provided":r=n=t=o.throttlingProvided;break;case"devtools":{let{cpuSlowdownMultiplier:e,requestLatencyMs:l}=i;t=`${a.formatNumber(e)}x slowdown (DevTools)`,n=`${a.formatMilliseconds(l)} HTTP RTT, ${a.formatKbps(i.downloadThroughputKbps)} down, ${a.formatKbps(i.uploadThroughputKbps)} up (DevTools)`,r=562.5===l&&i.downloadThroughputKbps===1638.4*.9&&675===i.uploadThroughputKbps?o.runtimeSlow4g:o.runtimeCustom;break}case"simulate":{let{cpuSlowdownMultiplier:e,rttMs:l,throughputKbps:s}=i;t=`${a.formatNumber(e)}x slowdown (Simulated)`,n=`${a.formatMilliseconds(l)} TCP RTT, ${a.formatKbps(s)} throughput (Simulated)`,r=150===l&&1638.4===s?o.runtimeSlow4g:o.runtimeCustom;break}default:r=t=n=o.runtimeUnknown}let s="devtools"!==e.channel&&e.screenEmulation.disabled,c="devtools"===e.channel?"mobile"===e.formFactor:e.screenEmulation.mobile,d=o.runtimeMobileEmulation;return s?d=o.runtimeNoEmulation:c||(d=o.runtimeDesktopEmulation),{deviceEmulation:d,screenEmulation:s?void 0:`${e.screenEmulation.width}x${e.screenEmulation.height}, DPR ${e.screenEmulation.deviceScaleFactor}`,cpuThrottling:t,networkThrottling:n,summary:r}}static showAsPassed(e){switch(e.scoreDisplayMode){case"manual":case"notApplicable":return!0;case"error":case"informative":return!1;default:return Number(e.score)>=c.PASS.minScore}}static calculateRating(e,t){if("manual"===t||"notApplicable"===t)return c.PASS.label;if("error"===t)return c.ERROR.label;if(null===e)return c.FAIL.label;let n=c.FAIL.label;return e>=c.PASS.minScore?n=c.PASS.label:e>=c.AVERAGE.minScore&&(n=c.AVERAGE.label),n}static calculateCategoryFraction(t){let n=0,r=0,i=0,a=0;for(let o of t.auditRefs){let t=e.showAsPassed(o.result);if("hidden"!==o.group&&"manual"!==o.result.scoreDisplayMode&&"notApplicable"!==o.result.scoreDisplayMode){if("informative"===o.result.scoreDisplayMode){t||++i;continue}++n,a+=o.weight,t&&r++}}return{numPassed:r,numPassableAudits:n,numInformative:i,totalWeight:a}}static isPluginCategory(e){return e.startsWith("lighthouse-plugin-")}static shouldDisplayAsFraction(e){return"timespan"===e||"snapshot"===e}},h={varianceDisclaimer:"Values are estimated and may vary. The [performance score is calculated](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring/) directly from these metrics.",calculatorLink:"See calculator.",showRelevantAudits:"Show audits relevant to:",opportunityResourceColumnLabel:"Opportunity",opportunitySavingsColumnLabel:"Estimated Savings",errorMissingAuditInfo:"Report error: no audit information",errorLabel:"Error!",warningHeader:"Warnings: ",warningAuditsGroupTitle:"Passed audits but with warnings",passedAuditsGroupTitle:"Passed audits",notApplicableAuditsGroupTitle:"Not applicable",manualAuditsGroupTitle:"Additional items to manually check",toplevelWarningsMessage:"There were issues affecting this run of Lighthouse:",crcInitialNavigation:"Initial Navigation",crcLongestDurationLabel:"Maximum critical path latency:",snippetExpandButtonLabel:"Expand snippet",snippetCollapseButtonLabel:"Collapse snippet",lsPerformanceCategoryDescription:"[Lighthouse](https://developers.google.com/web/tools/lighthouse/) analysis of the current page on an emulated mobile network. Values are estimated and may vary.",labDataTitle:"Lab Data",thirdPartyResourcesLabel:"Show 3rd-party resources",viewTreemapLabel:"View Treemap",viewTraceLabel:"View Trace",dropdownPrintSummary:"Print Summary",dropdownPrintExpanded:"Print Expanded",dropdownCopyJSON:"Copy JSON",dropdownSaveHTML:"Save as HTML",dropdownSaveJSON:"Save as JSON",dropdownViewer:"Open in Viewer",dropdownSaveGist:"Save as Gist",dropdownDarkTheme:"Toggle Dark Theme",dropdownViewUnthrottledTrace:"View Unthrottled Trace",runtimeSettingsDevice:"Device",runtimeSettingsNetworkThrottling:"Network throttling",runtimeSettingsCPUThrottling:"CPU throttling",runtimeSettingsUANetwork:"User agent (network)",runtimeSettingsBenchmark:"Unthrottled CPU/Memory Power",runtimeSettingsAxeVersion:"Axe version",runtimeSettingsScreenEmulation:"Screen emulation",footerIssue:"File an issue",runtimeNoEmulation:"No emulation",runtimeMobileEmulation:"Emulated Moto G Power",runtimeDesktopEmulation:"Emulated Desktop",runtimeUnknown:"Unknown",runtimeSingleLoad:"Single page session",runtimeAnalysisWindow:"Initial page load",runtimeAnalysisWindowTimespan:"User interactions timespan",runtimeAnalysisWindowSnapshot:"Point-in-time snapshot",runtimeSingleLoadTooltip:"This data is taken from a single page session, as opposed to field data summarizing many sessions.",throttlingProvided:"Provided by environment",show:"Show",hide:"Hide",expandView:"Expand view",collapseView:"Collapse view",runtimeSlow4g:"Slow 4G throttling",runtimeCustom:"Custom throttling",firstPartyChipLabel:"1st party",openInANewTabTooltip:"Open in a new tab",unattributable:"Unattributable",insightsNotice:"Later this year, insights will replace performance audits. [Learn more and provide feedback here](https://github.com/GoogleChrome/lighthouse/discussions/16462).",tryInsights:"Try insights",goBackToAudits:"Go back to audits"},p=class{constructor(e,t){this.dom=e,this.detailsRenderer=t}get _clumpTitles(){return{warning:l.strings.warningAuditsGroupTitle,manual:l.strings.manualAuditsGroupTitle,passed:l.strings.passedAuditsGroupTitle,notApplicable:l.strings.notApplicableAuditsGroupTitle}}renderAudit(e){let t=l.strings,n=this.dom.createComponent("audit"),r=this.dom.find("div.lh-audit",n);r.id=e.result.id;let i=e.result.scoreDisplayMode;e.result.displayValue&&(this.dom.find(".lh-audit__display-text",r).textContent=e.result.displayValue);let a=this.dom.find(".lh-audit__title",r);a.append(this.dom.convertMarkdownCodeSnippets(e.result.title));let o=this.dom.find(".lh-audit__description",r);o.append(this.dom.convertMarkdownLinkSnippets(e.result.description));for(let t of e.relevantMetrics||[]){let e=this.dom.createChildOf(o,"span","lh-audit__adorn");e.title=`Relevant to ${t.result.title}`,e.textContent=t.acronym||t.id}e.stackPacks&&e.stackPacks.forEach((e=>{let t=this.dom.createElement("img","lh-audit__stackpack__img");t.src=e.iconDataURL,t.alt=e.title;let n=this.dom.convertMarkdownLinkSnippets(e.description,{alwaysAppendUtmSource:!0}),i=this.dom.createElement("div","lh-audit__stackpack");i.append(t,n),this.dom.find(".lh-audit__stackpacks",r).append(i)}));let s=this.dom.find("details",r);if(e.result.details){let t=this.detailsRenderer.render(e.result.details);t&&(t.classList.add("lh-details"),s.append(t))}if(this.dom.find(".lh-chevron-container",r).append(this._createChevron()),this._setRatingClass(r,e.result.score,i),"error"===e.result.scoreDisplayMode){r.classList.add("lh-audit--error");let n=this.dom.find(".lh-audit__display-text",r);n.textContent=t.errorLabel,n.classList.add("lh-tooltip-boundary"),this.dom.createChildOf(n,"div","lh-tooltip lh-tooltip--error").textContent=e.result.errorMessage||t.errorMissingAuditInfo}else if(e.result.explanation){this.dom.createChildOf(a,"div","lh-audit-explanation").textContent=e.result.explanation}let c=e.result.warnings;if(!c||0===c.length)return r;let d=this.dom.find("summary",s),h=this.dom.createChildOf(d,"div","lh-warnings");if(this.dom.createChildOf(h,"span").textContent=t.warningHeader,1===c.length)h.append(this.dom.createTextNode(c.join("")));else{let e=this.dom.createChildOf(h,"ul");for(let t of c){this.dom.createChildOf(e,"li").textContent=t}}return r}injectFinalScreenshot(e,t,n){let r=t["final-screenshot"];if(!r||"error"===r.scoreDisplayMode||!r.details||"screenshot"!==r.details.type)return null;let i=this.dom.createElement("img","lh-final-ss-image"),a=r.details.data;i.src=a,i.alt=r.title;let o=this.dom.find(".lh-category .lh-category-header",e),l=this.dom.createElement("div","lh-category-headercol"),s=this.dom.createElement("div","lh-category-headercol lh-category-headercol--separator"),c=this.dom.createElement("div","lh-category-headercol");l.append(...o.childNodes),l.append(n),c.append(i),o.append(l,s,c),o.classList.add("lh-category-header__finalscreenshot")}_createChevron(){let e=this.dom.createComponent("chevron");return this.dom.find("svg.lh-chevron",e)}_setRatingClass(e,t,n){let r=d.calculateRating(t,n);return e.classList.add(`lh-audit--${n.toLowerCase()}`),"informative"!==n&&e.classList.add(`lh-audit--${r}`),e}renderCategoryHeader(e,t,n){let r=this.dom.createComponent("categoryHeader"),i=this.dom.find(".lh-score__gauge",r),a=this.renderCategoryScore(e,t,n);if(i.append(a),e.description){let t=this.dom.convertMarkdownLinkSnippets(e.description);this.dom.find(".lh-category-header__description",r).append(t)}return r}renderAuditGroup(e){let t=this.dom.createElement("div","lh-audit-group"),n=this.dom.createElement("div","lh-audit-group__header");this.dom.createChildOf(n,"span","lh-audit-group__title").textContent=e.title,t.append(n);let r=null;return e.description&&(r=this.dom.convertMarkdownLinkSnippets(e.description),r.classList.add("lh-audit-group__description","lh-audit-group__footer"),t.append(r)),[t,r]}_renderGroupedAudits(e,t){let n=new Map,r="NotAGroup";n.set(r,[]);for(let t of e){let e=t.group||r,i=n.get(e)||[];i.push(t),n.set(e,i)}let i=[];for(let[e,a]of n){if(e===r){for(let e of a)i.push(this.renderAudit(e));continue}let n=t[e],[o,l]=this.renderAuditGroup(n);for(let e of a)o.insertBefore(this.renderAudit(e),l);o.classList.add(`lh-audit-group--${e}`),i.push(o)}return i}renderUnexpandableClump(e,t){let n=this.dom.createElement("div");return this._renderGroupedAudits(e,t).forEach((e=>n.append(e))),n}renderClump(e,{auditRefsOrEls:t,description:n,openByDefault:r}){let i=this.dom.createComponent("clump"),a=this.dom.find(".lh-clump",i);r&&a.setAttribute("open","");let o=this.dom.find(".lh-audit-group__header",a),s=this._clumpTitles[e];this.dom.find(".lh-audit-group__title",o).textContent=s,this.dom.find(".lh-audit-group__itemcount",a).textContent=`(${t.length})`;let c=t.map((e=>e instanceof HTMLElement?e:this.renderAudit(e)));a.append(...c);let d=this.dom.find(".lh-audit-group",i);if(n){let e=this.dom.convertMarkdownLinkSnippets(n);e.classList.add("lh-audit-group__description","lh-audit-group__footer"),d.append(e)}return this.dom.find(".lh-clump-toggletext--show",d).textContent=l.strings.show,this.dom.find(".lh-clump-toggletext--hide",d).textContent=l.strings.hide,a.classList.add(`lh-clump--${e.toLowerCase()}`),d}renderCategoryScore(e,t,n){let r;if(r=n&&d.shouldDisplayAsFraction(n.gatherMode)?this.renderCategoryFraction(e):this.renderScoreGauge(e,t),n?.omitLabel&&this.dom.find(".lh-gauge__label,.lh-fraction__label",r).remove(),n?.onPageAnchorRendered){let e=this.dom.find("a",r);n.onPageAnchorRendered(e)}return r}renderScoreGauge(e,t){let n=this.dom.createComponent("gauge"),r=this.dom.find("a.lh-gauge__wrapper",n);d.isPluginCategory(e.id)&&r.classList.add("lh-gauge__wrapper--plugin");let i=Number(e.score),a=this.dom.find(".lh-gauge",n),o=this.dom.find("circle.lh-gauge-arc",a);o&&this._setGaugeArc(o,i);let s=Math.round(100*i),c=this.dom.find("div.lh-gauge__percentage",n);return c.textContent=s.toString(),null===e.score&&(c.classList.add("lh-gauge--error"),c.textContent="",c.title=l.strings.errorLabel),0===e.auditRefs.length||this.hasApplicableAudits(e)?r.classList.add(`lh-gauge__wrapper--${d.calculateRating(e.score)}`):(r.classList.add("lh-gauge__wrapper--not-applicable"),c.textContent="-",c.title=l.strings.notApplicableAuditsGroupTitle),this.dom.find(".lh-gauge__label",n).textContent=e.title,n}renderCategoryFraction(e){let t=this.dom.createComponent("fraction"),n=this.dom.find("a.lh-fraction__wrapper",t),{numPassed:r,numPassableAudits:i,totalWeight:a}=d.calculateCategoryFraction(e),o=r/i,l=this.dom.find(".lh-fraction__content",t),s=this.dom.createElement("span");s.textContent=`${r}/${i}`,l.append(s);let c=d.calculateRating(o);return 0===a&&(c="null"),n.classList.add(`lh-fraction__wrapper--${c}`),this.dom.find(".lh-fraction__label",t).textContent=e.title,t}hasApplicableAudits(e){return e.auditRefs.some((e=>"notApplicable"!==e.result.scoreDisplayMode))}_setGaugeArc(e,t){let n=2*Math.PI*Number(e.getAttribute("r")),r=Number(e.getAttribute("stroke-width")),i=.25*r/n;e.style.transform=`rotate(${360*i-90}deg)`;let a=t*n-r/2;0===t&&(e.style.opacity="0"),1===t&&(a=n),e.style.strokeDasharray=`${Math.max(a,0)} ${n}`}_auditHasWarning(e){return!!e.result.warnings?.length}_getClumpIdForAuditRef(e){let t=e.result.scoreDisplayMode;return"manual"===t||"notApplicable"===t?t:d.showAsPassed(e.result)?this._auditHasWarning(e)?"warning":"passed":"failed"}render(e,t={},n){let r=this.dom.createElement("div","lh-category");r.id=e.id,r.append(this.renderCategoryHeader(e,t,n));let i=new Map;i.set("failed",[]),i.set("warning",[]),i.set("manual",[]),i.set("passed",[]),i.set("notApplicable",[]);for(let t of e.auditRefs){if("hidden"===t.group)continue;let e=this._getClumpIdForAuditRef(t),n=i.get(e);n.push(t),i.set(e,n)}for(let e of i.values())e.sort(((e,t)=>t.weight-e.weight));let a=i.get("failed")?.length;for(let[n,o]of i){if(0===o.length)continue;if("failed"===n){let e=this.renderUnexpandableClump(o,t);e.classList.add("lh-clump--failed"),r.append(e);continue}let i="manual"===n?e.manualDescription:void 0,l="warning"===n||"manual"===n&&0===a,s=this.renderClump(n,{auditRefsOrEls:o,description:i,openByDefault:l});r.append(s)}return r}},g=class{static createSegment(e,t,n,r){let i=e[t],a=Object.keys(e),o=a.indexOf(t)===a.length-1,l=!!i.children&&Object.keys(i.children).length>0,s=Array.isArray(n)?n.slice(0):[];return typeof r<"u"&&s.push(!r),{node:i,isLastChild:o,hasChildren:l,treeMarkers:s}}static createChainNode(e,t,n){let r,i,a,o,s,c=e.createComponent("crcChain");"request"in t.node?(i=t.node.request.transferSize,a=t.node.request.url,r=1e3*(t.node.request.endTime-t.node.request.startTime),o=!1):(i=t.node.transferSize,a=t.node.url,r=t.node.navStartToEndTime,o=!0,s=t.node.isLongest);let d=e.find(".lh-crc-node",c);d.setAttribute("title",a),s&&d.classList.add("lh-crc-node__longest");let h=e.find(".lh-crc-node__tree-marker",c);t.treeMarkers.forEach((t=>{let n=t?"lh-tree-marker lh-vert":"lh-tree-marker";h.append(e.createElement("span",n),e.createElement("span","lh-tree-marker"))}));let p=t.isLastChild?"lh-tree-marker lh-up-right":"lh-tree-marker lh-vert-right",g=t.hasChildren?"lh-tree-marker lh-horiz-down":"lh-tree-marker lh-right";h.append(e.createElement("span",p),e.createElement("span","lh-tree-marker lh-right"),e.createElement("span",g));let u=n.renderTextURL(a),m=e.find(".lh-crc-node__tree-value",c);if(m.append(u),!t.hasChildren||o){let t=e.createElement("span","lh-crc-node__chain-duration");t.textContent=" - "+l.i18n.formatMilliseconds(r)+", ";let n=e.createElement("span","lh-crc-node__chain-size");n.textContent=l.i18n.formatBytesToKiB(i,.01),m.append(t,n)}return c}static buildTree(e,t,n,r){if(n.append(u.createChainNode(e,t,r)),t.node.children)for(let i of Object.keys(t.node.children)){let a=u.createSegment(t.node.children,i,t.treeMarkers,t.isLastChild);u.buildTree(e,a,n,r)}}static render(e,t,n){let r=e.createComponent("crc"),i=e.find(".lh-crc",r);e.find(".lh-crc-initial-nav",r).textContent=l.strings.crcInitialNavigation,e.find(".lh-crc__longest_duration_label",r).textContent=l.strings.crcLongestDurationLabel,e.find(".lh-crc__longest_duration",r).textContent=l.i18n.formatMilliseconds(t.longestChain.duration);let a=t.chains;for(let t of Object.keys(a)){let r=u.createSegment(a,t);u.buildTree(e,r,i,n)}return e.find(".lh-crc-container",r)}},u=g;function m(e,t,n){return e<t?t:e>n?n:e}var f=class e{static getScreenshotPositions(e,t,n){let r=function(e){return{x:e.left+e.width/2,y:e.top+e.height/2}}(e),i=m(r.x-t.width/2,0,n.width-t.width),a=m(r.y-t.height/2,0,n.height-t.height);return{screenshot:{left:i,top:a},clip:{left:e.left-i,top:e.top-a}}}static renderClipPathInScreenshot(e,t,n,r,i){let a=e.find("clipPath",t),o=`clip-${l.getUniqueSuffix()}`;a.id=o,t.style.clipPath=`url(#${o})`;let s=n.top/i.height,c=s+r.height/i.height,d=n.left/i.width,h=d+r.width/i.width,p=[`0,0             1,0            1,${s}          0,${s}`,`0,${c}     1,${c}    1,1               0,1`,`0,${s}        ${d},${s} ${d},${c} 0,${c}`,`${h},${s} 1,${s}       1,${c}       ${h},${c}`];for(let t of p){let n=e.createElementNS("http://www.w3.org/2000/svg","polygon");n.setAttribute("points",t),a.append(n)}}static installFullPageScreenshot(e,t){e.style.setProperty("--element-screenshot-url",`url(\'${t.data}\')`)}static installOverlayFeature(t){let{dom:n,rootEl:r,overlayContainerEl:i,fullPageScreenshot:a}=t,o="lh-screenshot-overlay--enabled";r.classList.contains(o)||(r.classList.add(o),r.addEventListener("click",(t=>{let r=t.target;if(!r)return;let o=r.closest(".lh-node > .lh-element-screenshot");if(!o)return;let l=n.createElement("div","lh-element-screenshot__overlay");i.append(l);let s={width:.95*l.clientWidth,height:.8*l.clientHeight},c={width:Number(o.dataset.rectWidth),height:Number(o.dataset.rectHeight),left:Number(o.dataset.rectLeft),right:Number(o.dataset.rectLeft)+Number(o.dataset.rectWidth),top:Number(o.dataset.rectTop),bottom:Number(o.dataset.rectTop)+Number(o.dataset.rectHeight)},d=e.render(n,a.screenshot,c,s);d?(l.append(d),l.addEventListener("click",(()=>l.remove()))):l.remove()})))}static _computeZoomFactor(e,t){let n={x:t.width/e.width,y:t.height/e.height},r=.75*Math.min(n.x,n.y);return Math.min(1,r)}static render(t,n,r,i){if(!function(e,t){return t.left<=e.width&&0<=t.right&&t.top<=e.height&&0<=t.bottom}(n,r))return null;let a=t.createComponent("elementScreenshot"),o=t.find("div.lh-element-screenshot",a);o.dataset.rectWidth=r.width.toString(),o.dataset.rectHeight=r.height.toString(),o.dataset.rectLeft=r.left.toString(),o.dataset.rectTop=r.top.toString();let l=this._computeZoomFactor(r,i),s={width:i.width/l,height:i.height/l};s.width=Math.min(n.width,s.width),s.height=Math.min(n.height,s.height);let c=s.width*l,d=s.height*l,h=e.getScreenshotPositions(r,s,{width:n.width,height:n.height}),p=t.find("div.lh-element-screenshot__image",o);p.style.width=c+"px",p.style.height=d+"px",p.style.backgroundPositionY=-h.screenshot.top*l+"px",p.style.backgroundPositionX=-h.screenshot.left*l+"px",p.style.backgroundSize=`${n.width*l}px ${n.height*l}px`;let g=t.find("div.lh-element-screenshot__element-marker",o);g.style.width=r.width*l+"px",g.style.height=r.height*l+"px",g.style.left=h.clip.left*l+"px",g.style.top=h.clip.top*l+"px";let u=t.find("div.lh-element-screenshot__mask",o);return u.style.width=c+"px",u.style.height=d+"px",e.renderClipPathInScreenshot(t,u,h.clip,r,s),o}},v=["http://","https://","data:"],b=["bytes","numeric","ms","timespanMs"],_=class{constructor(e){"en-XA"===e&&(e="de"),this._locale=e,this._cachedNumberFormatters=new Map}_formatNumberWithGranularity(e,t,n={}){if(void 0!==t){let r=-Math.log10(t);Number.isInteger(r)||(console.warn(`granularity of ${t} is invalid. Using 1 instead`),t=1),t<1&&((n={...n}).minimumFractionDigits=n.maximumFractionDigits=Math.ceil(r)),e=Math.round(e/t)*t,Object.is(e,-0)&&(e=0)}else Math.abs(e)<5e-4&&(e=0);let r,i=[n.minimumFractionDigits,n.maximumFractionDigits,n.style,n.unit,n.unitDisplay,this._locale].join("");return r=this._cachedNumberFormatters.get(i),r||(r=new Intl.NumberFormat(this._locale,n),this._cachedNumberFormatters.set(i,r)),r.format(e).replace(" ","\xA0")}formatNumber(e,t){return this._formatNumberWithGranularity(e,t)}formatInteger(e){return this._formatNumberWithGranularity(e,1)}formatPercent(e){return new Intl.NumberFormat(this._locale,{style:"percent"}).format(e)}formatBytesToKiB(e,t=void 0){return this._formatNumberWithGranularity(e/1024,t)+"\xA0KiB"}formatBytesToMiB(e,t=void 0){return this._formatNumberWithGranularity(e/1048576,t)+"\xA0MiB"}formatBytes(e,t=1){return this._formatNumberWithGranularity(e,t,{style:"unit",unit:"byte",unitDisplay:"long"})}formatBytesWithBestUnit(e,t=.1){return e>=1048576?this.formatBytesToMiB(e,t):e>=1024?this.formatBytesToKiB(e,t):this._formatNumberWithGranularity(e,t,{style:"unit",unit:"byte",unitDisplay:"narrow"})}formatKbps(e,t=void 0){return this._formatNumberWithGranularity(e,t,{style:"unit",unit:"kilobit-per-second",unitDisplay:"short"})}formatMilliseconds(e,t=void 0){return this._formatNumberWithGranularity(e,t,{style:"unit",unit:"millisecond",unitDisplay:"short"})}formatSeconds(e,t=void 0){return this._formatNumberWithGranularity(e/1e3,t,{style:"unit",unit:"second",unitDisplay:"narrow"})}formatDateTime(e){let t,n={month:"short",day:"numeric",year:"numeric",hour:"numeric",minute:"numeric",timeZoneName:"short"};try{t=new Intl.DateTimeFormat(this._locale,n)}catch{n.timeZone="UTC",t=new Intl.DateTimeFormat(this._locale,n)}return t.format(new Date(e))}formatDuration(e){let t=e/1e3;if(0===Math.round(t))return"None";let n=[],r={day:86400,hour:3600,minute:60,second:1};return Object.keys(r).forEach((e=>{let i=r[e],a=Math.floor(t/i);if(a>0){t-=a*i;let r=this._formatNumberWithGranularity(a,1,{style:"unit",unit:e,unitDisplay:"narrow"});n.push(r)}})),n.join(" ")}};function w(e,t,n){let r=e.find("div.lh-exp-gauge__wrapper",t);r.className="",r.classList.add("lh-exp-gauge__wrapper",`lh-exp-gauge__wrapper--${d.calculateRating(n.score)}`),function(e,t,n){let r=Number(n.score),{radiusInner:i,radiusOuter:a,circumferenceInner:o,circumferenceOuter:l,getArcLength:s,getMetricArcLength:c,endDiffInner:h,endDiffOuter:p,strokeWidth:g,strokeGap:u}=function(e,t,n){n=n||e/32;let r=e/n,i=.5*n,a=r+i+n,o=2*Math.PI*r,l=Math.acos(1-.5*Math.pow(.5*n/r,2))*r,s=2*Math.PI*a,c=Math.acos(1-.5*Math.pow(.5*n/a,2))*a;return{radiusInner:r,radiusOuter:a,circumferenceInner:o,circumferenceOuter:s,getArcLength:()=>Math.max(0,Number(t*o)),getMetricArcLength:(e,t=!1)=>{let n=t?0:2*c;return Math.max(0,Number(e*s-i-n))},endDiffInner:l,endDiffOuter:c,strokeWidth:n,strokeGap:i}}(128,r),m=e.find("svg.lh-exp-gauge",t);e.find(".lh-exp-gauge__label",m).textContent=n.title,m.setAttribute("viewBox",[-64,-32,128,64].join(" ")),m.style.setProperty("--stroke-width",`${g}px`),m.style.setProperty("--circle-meas",(2*Math.PI).toFixed(4));let f=e.find("g.lh-exp-gauge__outer",t),v=e.find("g.lh-exp-gauge__inner",t),b=e.find("circle.lh-cover",f),_=e.find("circle.lh-exp-gauge__arc",v),w=e.find("text.lh-exp-gauge__percentage",v);f.style.setProperty("--scale-initial",String(i/a)),f.style.setProperty("--radius",`${a}px`),b.style.setProperty("--radius",.5*(i+a)+"px"),b.setAttribute("stroke-width",String(u)),m.style.setProperty("--radius",`${i}px`),_.setAttribute("stroke-dasharray",`${s()} ${(o-s()).toFixed(4)}`),_.setAttribute("stroke-dashoffset",String(.25*o-h)),w.textContent=Math.round(100*r).toString();let y=a+g,x=a-g,k=n.auditRefs.filter((e=>"metrics"===e.group&&e.weight)),E=k.reduce(((e,t)=>e+t.weight),0),S=.25*l-p-.5*u,C=-.5*Math.PI;f.querySelectorAll(".metric").forEach((e=>{k.map((e=>`metric--${e.id}`)).find((t=>e.classList.contains(t)))||e.remove()})),k.forEach(((t,n)=>{let r=t.acronym??t.id,i=!f.querySelector(`.metric--${r}`),a=e.maybeFind(`g.metric--${r}`,f)||e.createSVGElement("g"),o=e.maybeFind(`.metric--${r} circle.lh-exp-gauge--faded`,f)||e.createSVGElement("circle"),s=e.maybeFind(`.metric--${r} circle.lh-exp-gauge--miniarc`,f)||e.createSVGElement("circle"),h=e.maybeFind(`.metric--${r} circle.lh-exp-gauge-hovertarget`,f)||e.createSVGElement("circle"),g=e.maybeFind(`.metric--${r} text.metric__label`,f)||e.createSVGElement("text"),u=e.maybeFind(`.metric--${r} text.metric__value`,f)||e.createSVGElement("text");a.classList.add("metric",`metric--${r}`),o.classList.add("lh-exp-gauge__arc","lh-exp-gauge__arc--metric","lh-exp-gauge--faded"),s.classList.add("lh-exp-gauge__arc","lh-exp-gauge__arc--metric","lh-exp-gauge--miniarc"),h.classList.add("lh-exp-gauge__arc","lh-exp-gauge__arc--metric","lh-exp-gauge-hovertarget");let m=t.weight/E,v=c(m),b=t.result.score?t.result.score*m:0,_=c(b),w=m*l,k=c(m,!0),A=d.calculateRating(t.result.score,t.result.scoreDisplayMode);a.style.setProperty("--metric-rating",A),a.style.setProperty("--metric-color",`var(--color-${A})`),a.style.setProperty("--metric-offset",`${S}`),a.style.setProperty("--i",n.toString()),o.setAttribute("stroke-dasharray",`${v} ${l-v}`),s.style.setProperty("--metric-array",`${_} ${l-_}`),h.setAttribute("stroke-dasharray",`${k} ${l-k-p}`),g.classList.add("metric__label"),u.classList.add("metric__value"),g.textContent=r,u.textContent=`+${Math.round(100*b)}`;let L=C+m*Math.PI,z=Math.cos(L),M=Math.sin(L);switch(!0){case z>0:u.setAttribute("text-anchor","end");break;case z<0:g.setAttribute("text-anchor","end");break;case 0===z:g.setAttribute("text-anchor","middle"),u.setAttribute("text-anchor","middle")}switch(!0){case M>0:g.setAttribute("dominant-baseline","hanging");break;case M<0:u.setAttribute("dominant-baseline","hanging");break;case 0===M:g.setAttribute("dominant-baseline","middle"),u.setAttribute("dominant-baseline","middle")}g.setAttribute("x",(y*z).toFixed(2)),g.setAttribute("y",(y*M).toFixed(2)),u.setAttribute("x",(x*z).toFixed(2)),u.setAttribute("y",(x*M).toFixed(2)),i&&(a.appendChild(o),a.appendChild(s),a.appendChild(h),a.appendChild(g),a.appendChild(u),f.appendChild(a)),S-=w,C+=2*m*Math.PI}));let A=f.querySelector(".lh-exp-gauge-underhovertarget")||e.createSVGElement("circle");A.classList.add("lh-exp-gauge__arc","lh-exp-gauge__arc--metric","lh-exp-gauge-hovertarget","lh-exp-gauge-underhovertarget");let L=c(1,!0);if(A.setAttribute("stroke-dasharray",`${L} ${l-L-p}`),A.isConnected||f.prepend(A),m.dataset.listenersSetup)return;async function z(t){if(await new Promise((e=>setTimeout(e,1e3))),t.classList.contains("state--expanded"))return;let n=e.find(".lh-exp-gauge__inner",t),r=`uniq-${Math.random()}`;n.setAttribute("id",r);let i=e.createSVGElement("use");i.setAttribute("href",`#${r}`),t.appendChild(i);let a=2.5;t.style.setProperty("--peek-dur",`${a}s`),t.classList.add("state--peek","state--expanded");let o=()=>{t.classList.remove("state--peek","state--expanded"),i.remove()},l=setTimeout((()=>{t.removeEventListener("mouseenter",s),o()}),1e3*a*1.5);function s(){clearTimeout(l),o()}t.addEventListener("mouseenter",s,{once:!0})}m.dataset.listenersSetup=!0,z(m),m.addEventListener("pointerover",(n=>{if(n.target===m&&m.classList.contains("state--expanded"))return m.classList.remove("state--expanded"),void(m.classList.contains("state--highlight")&&(m.classList.remove("state--highlight"),e.find(".metric--highlight",m).classList.remove("metric--highlight")));if(!(n.target instanceof Element))return;let r=n.target.parentNode;if(r instanceof SVGElement){if(r&&r===v)return void(m.classList.contains("state--expanded")?m.classList.contains("state--highlight")&&(m.classList.remove("state--highlight"),e.find(".metric--highlight",m).classList.remove("metric--highlight")):m.classList.add("state--expanded"));if(r&&r.classList&&r.classList.contains("metric")){let n=r.style.getPropertyValue("--metric-rating");if(t.style.setProperty("--color-highlight",`var(--color-${n}-secondary)`),m.classList.contains("state--highlight")){let t=e.find(".metric--highlight",m);r!==t&&(t.classList.remove("metric--highlight"),r.classList.add("metric--highlight"))}else m.classList.add("state--highlight"),r.classList.add("metric--highlight")}}})),m.addEventListener("mouseleave",(()=>{m.classList.remove("state--highlight"),m.querySelector(".metric--highlight")?.classList.remove("metric--highlight")}))}(e,r,n)}var y="__lh__insights_audits_toggle_state_2",x=class extends p{_memoryInsightToggleState="DEFAULT";_renderMetric(e){let t=this.dom.createComponent("metric"),n=this.dom.find(".lh-metric",t);n.id=e.result.id;let r=d.calculateRating(e.result.score,e.result.scoreDisplayMode);n.classList.add(`lh-metric--${r}`),this.dom.find(".lh-metric__title",t).textContent=e.result.title;let i=this.dom.find(".lh-metric__value",t);i.textContent=e.result.displayValue||"";let a=this.dom.find(".lh-metric__description",t);if(a.append(this.dom.convertMarkdownLinkSnippets(e.result.description)),"error"===e.result.scoreDisplayMode){a.textContent="",i.textContent="Error!",this.dom.createChildOf(a,"span").textContent=e.result.errorMessage||"Report error: no metric information"}else"notApplicable"===e.result.scoreDisplayMode&&(i.textContent="--");return n}_getScoringCalculatorHref(e){let t=e.filter((e=>"metrics"===e.group)),n=e.find((e=>"interactive"===e.id)),r=e.find((e=>"first-cpu-idle"===e.id)),i=e.find((e=>"first-meaningful-paint"===e.id));n&&t.push(n),r&&t.push(r),i&&"number"==typeof i.result.score&&t.push(i);let a=[...t.map((e=>{let t;return"number"==typeof e.result.numericValue?(t="cumulative-layout-shift"===e.id?(e=>Math.round(100*e)/100)(e.result.numericValue):Math.round(e.result.numericValue),t=t.toString()):t="null",[e.acronym||e.id,t]}))];l.reportJson&&(a.push(["device",l.reportJson.configSettings.formFactor]),a.push(["version",l.reportJson.lighthouseVersion]));let o=new URLSearchParams(a),s=new URL("https://googlechrome.github.io/lighthouse/scorecalc/");return s.hash=o.toString(),s.href}overallImpact(e,t){if(!e.result.metricSavings)return{overallImpact:0,overallLinearImpact:0};let n=0,r=0;for(let[a,o]of Object.entries(e.result.metricSavings)){if(void 0===o)continue;let e=t.find((e=>e.acronym===a));if(!e||null===e.result.score)continue;let l=e.result.numericValue;if(!l)continue;r+=o/l*e.weight;let s=e.result.scoringOptions;s&&(n+=(i.computeLogNormalScore(s,l-o)-e.result.score)*e.weight)}return{overallImpact:n,overallLinearImpact:r}}_persistInsightToggleToStorage(e){try{window.localStorage.setItem(y,e)}finally{this._memoryInsightToggleState=e}}_getInsightToggleState(){let e=this._getRawInsightToggleState();return"DEFAULT"===e&&(e="INSIGHTS"),e}_getRawInsightToggleState(){try{let e=window.localStorage.getItem(y);if("AUDITS"===e||"INSIGHTS"===e)return e}catch{return this._memoryInsightToggleState}return"DEFAULT"}_setInsightToggleButtonText(e){let t=this._getInsightToggleState();e.innerText="AUDITS"===t?l.strings.tryInsights:l.strings.goBackToAudits}_renderInsightsToggle(e){let t=this.dom.createChildOf(e,"div","lh-perf-insights-toggle"),n=this.dom.createChildOf(t,"span","lh-perf-toggle-text"),r=this.dom.createElement("span","lh-perf-insights-icon insights-icon-url");n.appendChild(r),n.appendChild(this.dom.convertMarkdownLinkSnippets(l.strings.insightsNotice));let i=this.dom.createChildOf(t,"button","lh-button lh-button-insight-toggle");this._setInsightToggleButtonText(i),i.addEventListener("click",(e=>{e.preventDefault();let t=this.dom.maybeFind(".lh-perf-audits--swappable");t&&this.dom.swapSectionIfPossible(t);let n="AUDITS"===this._getInsightToggleState()?"INSIGHTS":"AUDITS";this.dom.fireEventOn("lh-analytics",this.dom.document(),{name:"toggle_insights",data:{newState:n}}),this._persistInsightToggleToStorage(n),this._setInsightToggleButtonText(i)})),t.appendChild(i)}render(e,t,n){let r=l.strings,i=this.dom.createElement("div","lh-category");i.id=e.id,i.append(this.renderCategoryHeader(e,t,n));let a=e.auditRefs.filter((e=>"metrics"===e.group));if(a.length){let[n,o]=this.renderAuditGroup(t.metrics),s=this.dom.createElement("input","lh-metrics-toggle__input"),c=`lh-metrics-toggle${l.getUniqueSuffix()}`;s.setAttribute("aria-label","Toggle the display of metric descriptions"),s.type="checkbox",s.id=c,n.prepend(s);let d=this.dom.find(".lh-audit-group__header",n),h=this.dom.createChildOf(d,"label","lh-metrics-toggle__label");h.htmlFor=c;let p=this.dom.createChildOf(h,"span","lh-metrics-toggle__labeltext--show"),g=this.dom.createChildOf(h,"span","lh-metrics-toggle__labeltext--hide");p.textContent=l.strings.expandView,g.textContent=l.strings.collapseView;let u=this.dom.createElement("div","lh-metrics-container");if(n.insertBefore(u,o),a.forEach((e=>{u.append(this._renderMetric(e))})),i.querySelector(".lh-gauge__wrapper")){let t=this.dom.find(".lh-category-header__description",i),n=this.dom.createChildOf(t,"div","lh-metrics__disclaimer"),a=this.dom.convertMarkdownLinkSnippets(r.varianceDisclaimer);n.append(a);let o=this.dom.createChildOf(n,"a","lh-calclink");o.target="_blank",o.textContent=r.calculatorLink,this.dom.safelySetHref(o,this._getScoringCalculatorHref(e.auditRefs))}n.classList.add("lh-audit-group--metrics"),i.append(n)}let o=this.dom.createChildOf(i,"div","lh-filmstrip-container"),s=e.auditRefs.find((e=>"screenshot-thumbnails"===e.id))?.result;if(s?.details){o.id=s.id;let e=this.detailsRenderer.render(s.details);e&&o.append(e)}this._renderInsightsToggle(i);let c=this.renderFilterableSection(e,t,["diagnostics"],a);c?.classList.add("lh-perf-audits--swappable","lh-perf-audits--legacy");let d=this.renderFilterableSection(e,t,["insights","diagnostics"],a);if(d?.classList.add("lh-perf-audits--swappable","lh-perf-audits--experimental"),c&&(i.append(c),d&&this.dom.registerSwappableSections(c,d)),"INSIGHTS"===this._getInsightToggleState()&&requestAnimationFrame((()=>{let e=this.dom.maybeFind(".lh-perf-audits--swappable");e&&this.dom.swapSectionIfPossible(e)})),this.dom.fireEventOn("lh-analytics",this.dom.document(),{name:"initial_insights_state",data:{state:this._getRawInsightToggleState()}}),(!n||"navigation"===n?.gatherMode)&&null!==e.score){let t=function(e){let t=e.createComponent("explodeyGauge");return e.find(".lh-exp-gauge-component",t)}(this.dom);w(this.dom,t,e),this.dom.find(".lh-score__gauge",i).replaceWith(t)}return i}renderFilterableSection(e,t,n,r){if(n.some((e=>!t[e])))return null;let i=this.dom.createElement("div"),a=new Set,o=e=>e.id.endsWith("-insight")?"insights":e.group??"",l=e.auditRefs.filter((e=>n.includes(o(e))));for(let e of l)e.result.replacesAudits?.forEach((e=>{a.add(e)}));let s=l.filter((e=>!a.has(e.id))).map((e=>{let{overallImpact:t,overallLinearImpact:n}=this.overallImpact(e,r),i=e.result.guidanceLevel||1;return{auditRef:e,auditEl:this.renderAudit(e),overallImpact:t,overallLinearImpact:n,guidanceLevel:i}})),c=s.filter((e=>!d.showAsPassed(e.auditRef.result))),h=s.filter((e=>d.showAsPassed(e.auditRef.result))),p={};for(let e of n){let n=this.renderAuditGroup(t[e]);n[0].classList.add(`lh-audit-group--${e}`),p[e]=n}function g(e){for(let t of s)if("All"===e)t.auditEl.hidden=!1;else{let n=void 0===t.auditRef.result.metricSavings?.[e];t.auditEl.hidden=n}c.sort(((t,n)=>{let r=t.auditRef.result.score||0,i=n.auditRef.result.score||0;if(r!==i)return r-i;if("All"!==e){let r=t.auditRef.result.metricSavings?.[e]??-1,i=n.auditRef.result.metricSavings?.[e]??-1;if(r!==i)return i-r}return t.overallImpact!==n.overallImpact?n.overallImpact*n.guidanceLevel-t.overallImpact*t.guidanceLevel:0===t.overallImpact&&0===n.overallImpact&&t.overallLinearImpact!==n.overallLinearImpact?n.overallLinearImpact*n.guidanceLevel-t.overallLinearImpact*t.guidanceLevel:n.guidanceLevel-t.guidanceLevel}));for(let e of c){if(!e.auditRef.group)continue;let t=p[o(e.auditRef)];if(!t)continue;let[n,r]=t;n.insertBefore(e.auditEl,r)}}let u=new Set;for(let e of c){let t=e.auditRef.result.metricSavings||{};for(let[e,n]of Object.entries(t))"number"==typeof n&&u.add(e)}let m=r.filter((e=>e.acronym&&u.has(e.acronym)));m.length&&this.renderMetricAuditFilter(m,i,g),g("All");for(let e of n)if(c.some((t=>o(t.auditRef)===e))){let t=p[e];if(!t)continue;i.append(t[0])}if(!h.length)return i;let f={auditRefsOrEls:h.map((e=>e.auditEl)),groupDefinitions:t},v=this.renderClump("passed",f);return i.append(v),i}renderMetricAuditFilter(e,t,n){let r=this.dom.createElement("div","lh-metricfilter");this.dom.createChildOf(r,"span","lh-metricfilter__text").textContent=l.strings.showRelevantAudits;let i=[{acronym:"All",id:"All"},...e],a=l.getUniqueSuffix();for(let e of i){let i=`metric-${e.acronym}-${a}`,o=this.dom.createChildOf(r,"input","lh-metricfilter__radio");o.type="radio",o.name=`metricsfilter-${a}`,o.id=i;let l=this.dom.createChildOf(r,"label","lh-metricfilter__label");l.htmlFor=i,l.title="result"in e?e.result.title:"",l.textContent=e.acronym||e.id,"All"===e.acronym&&(o.checked=!0,l.classList.add("lh-metricfilter__label--active")),t.append(r),o.addEventListener("input",(r=>{for(let e of t.querySelectorAll("label.lh-metricfilter__label"))e.classList.toggle("lh-metricfilter__label--active",e.htmlFor===i);t.classList.toggle("lh-category--filtered","All"!==e.acronym),n(e.acronym||"All");let a=t.querySelectorAll("div.lh-audit-group, details.lh-audit-group");for(let e of a){e.hidden=!1;let t=Array.from(e.querySelectorAll("div.lh-audit")),n=!!t.length&&t.every((e=>e.hidden));e.hidden=n}}))}}},k=class{constructor(e){this._dom=e,this._opts={}}renderReport(e,t,n){if(!this._dom.rootEl&&t){console.warn("Please adopt the new report API in renderer/api.js.");let e=t.closest(".lh-root");e?this._dom.rootEl=e:(t.classList.add("lh-root","lh-vars"),this._dom.rootEl=t)}else this._dom.rootEl&&t&&(this._dom.rootEl=t);n&&(this._opts=n),this._dom.setLighthouseChannel(e.configSettings.channel||"unknown");let r=d.prepareReportResult(e);return this._dom.rootEl.textContent="",this._dom.rootEl.append(this._renderReport(r)),this._opts.occupyEntireViewport&&this._dom.rootEl.classList.add("lh-max-viewport"),this._dom.rootEl}_renderReportTopbar(e){let t=this._dom.createComponent("topbar"),n=this._dom.find("a.lh-topbar__url",t);return n.textContent=e.finalDisplayedUrl,n.title=e.finalDisplayedUrl,this._dom.safelySetHref(n,e.finalDisplayedUrl),t}_renderReportHeader(){let e=this._dom.createComponent("heading"),t=this._dom.createComponent("scoresWrapper");return this._dom.find(".lh-scores-wrapper-placeholder",e).replaceWith(t),e}_renderReportFooter(e){let t=this._dom.createComponent("footer");return this._renderMetaBlock(e,t),this._dom.find(".lh-footer__version_issue",t).textContent=l.strings.footerIssue,this._dom.find(".lh-footer__version",t).textContent=e.lighthouseVersion,t}_renderMetaBlock(e,t){let n=d.getEmulationDescriptions(e.configSettings||{}),r=e.userAgent.match(/(\\w*Chrome\\/[\\d.]+)/),i=Array.isArray(r)?r[1].replace("/"," ").replace("Chrome","Chromium"):"Chromium",a=e.configSettings.channel,o=e.environment.benchmarkIndex.toFixed(0),s=e.environment.credits?.["axe-core"],c=[`${l.strings.runtimeSettingsBenchmark}: ${o}`,`${l.strings.runtimeSettingsCPUThrottling}: ${n.cpuThrottling}`];n.screenEmulation&&c.push(`${l.strings.runtimeSettingsScreenEmulation}: ${n.screenEmulation}`),s&&c.push(`${l.strings.runtimeSettingsAxeVersion}: ${s}`);let h=l.strings.runtimeAnalysisWindow;"timespan"===e.gatherMode?h=l.strings.runtimeAnalysisWindowTimespan:"snapshot"===e.gatherMode&&(h=l.strings.runtimeAnalysisWindowSnapshot);let p=[["date",`Captured at ${l.i18n.formatDateTime(e.fetchTime)}`],["devices",`${n.deviceEmulation} with Lighthouse ${e.lighthouseVersion}`,c.join("\\n")],["samples-one",l.strings.runtimeSingleLoad,l.strings.runtimeSingleLoadTooltip],["stopwatch",h],["networkspeed",`${n.summary}`,`${l.strings.runtimeSettingsNetworkThrottling}: ${n.networkThrottling}`],["chrome",`Using ${i}`+(a?` with ${a}`:""),`${l.strings.runtimeSettingsUANetwork}: "${e.environment.networkUserAgent}"`]],g=this._dom.find(".lh-meta__items",t);for(let[e,t,n]of p){let r=this._dom.createChildOf(g,"li","lh-meta__item");if(r.textContent=t,n){r.classList.add("lh-tooltip-boundary"),this._dom.createChildOf(r,"div","lh-tooltip").textContent=n}r.classList.add("lh-report-icon",`lh-report-icon--${e}`)}}_renderReportWarnings(e){if(!e.runWarnings||0===e.runWarnings.length)return this._dom.createElement("div");let t=this._dom.createComponent("warningsToplevel");this._dom.find(".lh-warnings__msg",t).textContent=l.strings.toplevelWarningsMessage;let n=[];for(let t of e.runWarnings){let e=this._dom.createElement("li");e.append(this._dom.convertMarkdownLinkSnippets(t)),n.push(e)}return this._dom.find("ul",t).append(...n),t}_renderScoreGauges(e,t,n){let r=[],i=[];for(let a of Object.values(e.categories)){let o=(n[a.id]||t).renderCategoryScore(a,e.categoryGroups||{},{gatherMode:e.gatherMode}),l=this._dom.find("a.lh-gauge__wrapper, a.lh-fraction__wrapper",o);l&&(this._dom.safelySetHref(l,`#${a.id}`),l.addEventListener("click",(e=>{if(!l.matches(\'[href^="#"]\'))return;let t=l.getAttribute("href"),n=this._dom.rootEl;if(!t||!n)return;let r=this._dom.find(t,n);e.preventDefault(),r.scrollIntoView()})),this._opts.onPageAnchorRendered?.(l)),d.isPluginCategory(a.id)?i.push(o):r.push(o)}return[...r,...i]}_renderReport(e){l.apply({providedStrings:e.i18n.rendererFormattedStrings,i18n:new _(e.configSettings.locale),reportJson:e});let t=new class{constructor(e,t={}){this._dom=e,this._fullPageScreenshot=t.fullPageScreenshot,this._entities=t.entities}render(e){switch(e.type){case"filmstrip":return this._renderFilmstrip(e);case"list":return this._renderList(e);case"checklist":return this._renderChecklist(e);case"table":case"opportunity":return this._renderTable(e);case"network-tree":case"criticalrequestchain":return g.render(this._dom,e,this);case"screenshot":case"debugdata":case"treemap-data":return null;default:return this._renderUnknown(e.type,e)}}_renderBytes(e){let t=l.i18n.formatBytesToKiB(e.value,e.granularity||.1),n=this._renderText(t);return n.title=l.i18n.formatBytes(e.value),n}_renderMilliseconds(e){let t;return t="duration"===e.displayUnit?l.i18n.formatDuration(e.value):l.i18n.formatMilliseconds(e.value,e.granularity||10),this._renderText(t)}renderTextURL(e){let t,n,r,a=e;try{let e=i.parseURL(a);t="/"===e.file?e.origin:e.file,n="/"===e.file||""===e.hostname?"":`(${e.hostname})`,r=a}catch{t=a}let o=this._dom.createElement("div","lh-text__url");if(o.append(this._renderLink({text:t,url:a})),n){let e=this._renderText(n);e.classList.add("lh-text__url-host"),o.append(e)}return r&&(o.title=a,o.dataset.url=a),o}_renderLink(e){let t=this._dom.createElement("a");if(this._dom.safelySetHref(t,e.url),!t.href){let t=this._renderText(e.text);return t.classList.add("lh-link"),t}return t.rel="noopener",t.target="_blank",t.textContent=e.text,t.classList.add("lh-link"),t}_renderText(e){let t=this._dom.createElement("div","lh-text");return t.textContent=e,t}_renderNumeric(e){let t=l.i18n.formatNumber(e.value,e.granularity||.1),n=this._dom.createElement("div","lh-numeric");return n.textContent=t,n}_renderThumbnail(e){let t=this._dom.createElement("img","lh-thumbnail"),n=e;return t.src=n,t.title=n,t.alt="",t}_renderUnknown(e,t){console.error(`Unknown details type: ${e}`,t);let n=this._dom.createElement("details","lh-unknown");return this._dom.createChildOf(n,"summary").textContent=`We don\'t know how to render audit details of type \\`${e}\\`. The Lighthouse version that collected this data is likely newer than the Lighthouse version of the report renderer. Expand for the raw JSON.`,this._dom.createChildOf(n,"pre").textContent=JSON.stringify(t,null,2),n}_renderTableValue(e,t){if(null==e)return null;if("object"==typeof e)switch(e.type){case"code":return this._renderCode(e.value);case"link":return this._renderLink(e);case"node":return this.renderNode(e);case"numeric":return this._renderNumeric(e);case"text":return this._renderText(e.value);case"source-location":return this.renderSourceLocation(e);case"url":return this.renderTextURL(e.value);default:return this._renderUnknown(e.type,e)}switch(t.valueType){case"bytes":{let n=Number(e);return this._renderBytes({value:n,granularity:t.granularity})}case"code":{let t=String(e);return this._renderCode(t)}case"ms":{let n={value:Number(e),granularity:t.granularity,displayUnit:t.displayUnit};return this._renderMilliseconds(n)}case"numeric":{let n=Number(e);return this._renderNumeric({value:n,granularity:t.granularity})}case"text":{let t=String(e);return this._renderText(t)}case"thumbnail":{let t=String(e);return this._renderThumbnail(t)}case"timespanMs":{let t=Number(e);return this._renderMilliseconds({value:t})}case"url":{let t=String(e);return v.some((e=>t.startsWith(e)))?this.renderTextURL(t):this._renderCode(t)}default:return this._renderUnknown(t.valueType,e)}}_getDerivedSubItemsHeading(e){return e.subItemsHeading?{key:e.subItemsHeading.key||"",valueType:e.subItemsHeading.valueType||e.valueType,granularity:e.subItemsHeading.granularity||e.granularity,displayUnit:e.subItemsHeading.displayUnit||e.displayUnit,label:""}:null}_renderTableRow(e,t){let n=this._dom.createElement("tr");for(let r of t){if(!r||!r.key){this._dom.createChildOf(n,"td","lh-table-column--empty");continue}let t,i=e[r.key];if(null!=i&&(t=this._renderTableValue(i,r)),t){let e=`lh-table-column--${r.valueType}`;this._dom.createChildOf(n,"td",e).append(t)}else this._dom.createChildOf(n,"td","lh-table-column--empty")}return n}_renderTableRowsFromItem(e,t){let n=this._dom.createFragment();if(n.append(this._renderTableRow(e,t)),!e.subItems)return n;let r=t.map(this._getDerivedSubItemsHeading);if(!r.some(Boolean))return n;for(let t of e.subItems.items){let e=this._renderTableRow(t,r);e.classList.add("lh-sub-item-row"),n.append(e)}return n}_adornEntityGroupRow(e){let t=e.dataset.entity;if(!t)return;let n=this._entities?.find((e=>e.name===t));if(!n)return;let r=this._dom.find("td",e);if(n.category){let e=this._dom.createElement("span");e.classList.add("lh-audit__adorn"),e.textContent=n.category,r.append(" ",e)}if(n.isFirstParty){let e=this._dom.createElement("span");e.classList.add("lh-audit__adorn","lh-audit__adorn1p"),e.textContent=l.strings.firstPartyChipLabel,r.append(" ",e)}if(n.homepage){let e=this._dom.createElement("a");e.href=n.homepage,e.target="_blank",e.title=l.strings.openInANewTabTooltip,e.classList.add("lh-report-icon--external"),r.append(" ",e)}}_renderEntityGroupRow(e,t){let n={...t[0]};n.valueType="text";let r=[n,...t.slice(1)],i=this._dom.createFragment();return i.append(this._renderTableRow(e,r)),this._dom.find("tr",i).classList.add("lh-row--group"),i}_getEntityGroupItems(e){let{items:t,headings:n,sortedBy:r}=e;if(!t.length||e.isEntityGrouped||!t.some((e=>e.entity)))return[];let i=new Set(e.skipSumming||[]),a=[];for(let e of n)!e.key||i.has(e.key)||b.includes(e.valueType)&&a.push(e.key);let o=n[0].key;if(!o)return[];let s=new Map;for(let e of t){let t="string"==typeof e.entity?e.entity:void 0,n=s.get(t)||{[o]:t||l.strings.unattributable,entity:t};for(let t of a)n[t]=Number(n[t]||0)+Number(e[t]||0);s.set(t,n)}let c=[...s.values()];return r&&c.sort(d.getTableItemSortComparator(r)),c}_renderTable(e){if(!e.items.length)return this._dom.createElement("span");let t=this._dom.createElement("table","lh-table"),n=this._dom.createChildOf(t,"thead"),r=this._dom.createChildOf(n,"tr");for(let t of e.headings){let e=`lh-table-column--${t.valueType||"text"}`,n=this._dom.createElement("div","lh-text");n.textContent=t.label,this._dom.createChildOf(r,"th",e).append(n)}let i=this._getEntityGroupItems(e),a=this._dom.createChildOf(t,"tbody");if(i.length)for(let t of i){let n="string"==typeof t.entity?t.entity:void 0,r=this._renderEntityGroupRow(t,e.headings);for(let t of e.items.filter((e=>e.entity===n)))r.append(this._renderTableRowsFromItem(t,e.headings));let i=this._dom.findAll("tr",r);n&&i.length&&(i.forEach((e=>e.dataset.entity=n)),this._adornEntityGroupRow(i[0])),a.append(r)}else{let t=!0;for(let n of e.items){let r=this._renderTableRowsFromItem(n,e.headings),i=this._dom.findAll("tr",r),o=i[0];if("string"==typeof n.entity&&(o.dataset.entity=n.entity),e.isEntityGrouped&&n.entity)o.classList.add("lh-row--group"),this._adornEntityGroupRow(o);else for(let e of i)e.classList.add(t?"lh-row--even":"lh-row--odd");t=!t,a.append(r)}}return t}_renderListValue(e){return"node"===e.type?this.renderNode(e):"text"===e.type?this._renderText(e.value):this.render(e)}_renderList(e){let t=this._dom.createElement("div","lh-list");return e.items.forEach((e=>{if("list-section"===e.type){let n=this._dom.createElement("div","lh-list-section");e.title&&this._dom.createChildOf(n,"div","lh-list-section__title").append(this._dom.convertMarkdownLinkSnippets(e.title)),e.description&&this._dom.createChildOf(n,"div","lh-list-section__description").append(this._dom.convertMarkdownLinkSnippets(e.description));let r=this._renderListValue(e.value);return r&&n.append(r),void t.append(n)}let n=this._renderListValue(e);n&&t.append(n)})),t}_renderChecklist(e){let t=this._dom.createElement("ul","lh-checklist");return Object.values(e.items).forEach((e=>{let n=this._dom.createChildOf(t,"li","lh-checklist-item"),r=e.value?"lh-report-plain-icon--checklist-pass":"lh-report-plain-icon--checklist-fail";this._dom.createChildOf(n,"span",`lh-report-plain-icon ${r}`).textContent=e.label})),t}renderNode(e){let t=this._dom.createElement("span","lh-node");if(e.nodeLabel){let n=this._dom.createElement("div");n.textContent=e.nodeLabel,t.append(n)}if(e.snippet){let n=this._dom.createElement("div");n.classList.add("lh-node__snippet"),n.textContent=e.snippet,t.append(n)}if(e.selector&&(t.title=e.selector),e.path&&t.setAttribute("data-path",e.path),e.selector&&t.setAttribute("data-selector",e.selector),e.snippet&&t.setAttribute("data-snippet",e.snippet),!this._fullPageScreenshot)return t;let n=e.lhId&&this._fullPageScreenshot.nodes[e.lhId];if(!n||0===n.width||0===n.height)return t;let r=f.render(this._dom,this._fullPageScreenshot.screenshot,n,{width:147,height:100});return r&&t.prepend(r),t}renderSourceLocation(e){if(!e.url)return null;let t,n,r=`${e.url}:${e.line+1}:${e.column}`;if(e.original&&(t=`${e.original.file||"<unmapped>"}:${e.original.line+1}:${e.original.column}`),"network"===e.urlProvider&&t)n=this._renderLink({url:e.url,text:t}),n.title=`maps to generated location ${r}`;else if("network"!==e.urlProvider||t)if("comment"===e.urlProvider&&t)n=this._renderText(`${t} (from source map)`),n.title=`${r} (from sourceURL)`;else{if("comment"!==e.urlProvider||t)return null;n=this._renderText(`${r} (from sourceURL)`)}else n=this.renderTextURL(e.url),this._dom.find(".lh-link",n).textContent+=`:${e.line+1}:${e.column}`;return n.classList.add("lh-source-location"),n.setAttribute("data-source-url",e.url),n.setAttribute("data-source-line",String(e.line)),n.setAttribute("data-source-column",String(e.column)),n}_renderFilmstrip(e){let t=this._dom.createElement("div","lh-filmstrip");for(let n of e.items){let e=this._dom.createChildOf(t,"div","lh-filmstrip__frame"),r=this._dom.createChildOf(e,"img","lh-filmstrip__thumbnail");r.src=n.data,r.alt="Screenshot"}return t}_renderCode(e){let t=this._dom.createElement("pre","lh-code");return t.textContent=e,t}}(this._dom,{fullPageScreenshot:e.fullPageScreenshot??void 0,entities:e.entities}),n=new p(this._dom,t),r={performance:new x(this._dom,t)},a=this._dom.createElement("div");a.append(this._renderReportHeader());let o,s=this._dom.createElement("div","lh-container"),c=this._dom.createElement("div","lh-report");c.append(this._renderReportWarnings(e)),1===Object.keys(e.categories).length?a.classList.add("lh-header--solo-category"):o=this._dom.createElement("div","lh-scores-header");let h=this._dom.createElement("div");if(h.classList.add("lh-scorescale-wrap"),h.append(this._dom.createComponent("scorescale")),o){let t=this._dom.find(".lh-scores-container",a);o.append(...this._renderScoreGauges(e,n,r)),t.append(o,h);let i=this._dom.createElement("div","lh-sticky-header");i.append(...this._renderScoreGauges(e,n,r)),s.append(i)}let u=this._dom.createElement("div","lh-categories");c.append(u);let m={gatherMode:e.gatherMode};for(let t of Object.values(e.categories)){let i=r[t.id]||n;i.dom.createChildOf(u,"div","lh-category-wrapper").append(i.render(t,e.categoryGroups,m))}n.injectFinalScreenshot(u,e.audits,h);let w=this._dom.createFragment();return this._opts.omitGlobalStyles||w.append(this._dom.createComponent("styles")),this._opts.omitTopbar||w.append(this._renderReportTopbar(e)),w.append(s),c.append(this._renderReportFooter(e)),s.append(a,c),e.fullPageScreenshot&&f.installFullPageScreenshot(this._dom.rootEl,e.fullPageScreenshot.screenshot),w}};function E(e,t){let n=e.rootEl;typeof t>"u"?n.classList.toggle("lh-dark"):n.classList.toggle("lh-dark",t)}var S=typeof btoa<"u"?btoa:e=>Buffer.from(e).toString("base64"),C=typeof atob<"u"?atob:e=>Buffer.from(e,"base64").toString();var A={toBase64:async function(e,t){let n=(new TextEncoder).encode(e);if(t.gzip)if(typeof CompressionStream<"u"){let e=new CompressionStream("gzip"),t=e.writable.getWriter();t.write(n),t.close();let r=await new Response(e.readable).arrayBuffer();n=new Uint8Array(r)}else n=window.pako.gzip(e);let r="";for(let e=0;e<n.length;e+=5e3)r+=String.fromCharCode(...n.subarray(e,e+5e3));return S(r)},fromBase64:function(e,t){let n=C(e),r=Uint8Array.from(n,(e=>e.charCodeAt(0)));return t.gzip?window.pako.ungzip(r,{to:"string"}):(new TextDecoder).decode(r)}};function L(){let e=window.location.host.endsWith(".vercel.app"),t=new URLSearchParams(window.location.search).has("dev");return e?`https://${window.location.host}/gh-pages`:t?"http://localhost:7333":"https://googlechrome.github.io/lighthouse"}function z(e){let t=e.generatedTime,n=e.fetchTime||t;return`${e.lighthouseVersion}-${e.finalDisplayedUrl}-${n}`}async function M(e,t,n){let r=new URL(t),i=!!window.CompressionStream;r.hash=await A.toBase64(JSON.stringify(e),{gzip:i}),i&&r.searchParams.set("gzip","1"),window.open(r.toString(),n)}async function T(e){let t="viewer-"+z(e);!function(e,t,n){let r=new URL(t).origin;window.addEventListener("message",(function t(n){n.origin===r&&i&&n.data.opened&&(i.postMessage(e,r),window.removeEventListener("message",t))}));let i=window.open(t,n)}({lhr:e},L()+"/viewer/",t)}function D(e){return function(e,t){let n=t?new Date(t):new Date,r=n.toLocaleTimeString("en-US",{hour12:!1}),i=n.toLocaleDateString("en-US",{year:"numeric",month:"2-digit",day:"2-digit"}).split("/");return i.unshift(i.pop()),`${e}_${i.join("-")}_${r}`.replace(/[/?<>\\\\:*|"]/g,"-")}(new URL(e.finalDisplayedUrl).hostname,e.fetchTime)}var F=class{constructor(e,t={}){this.json,this._dom=e,this._opts=t,this._topbar=t.omitTopbar?null:new class{constructor(e,t){this.lhr,this._reportUIFeatures=e,this._dom=t,this._dropDownMenu=new class{constructor(e){this._dom=e,this._toggleEl,this._menuEl,this.onDocumentKeyDown=this.onDocumentKeyDown.bind(this),this.onToggleClick=this.onToggleClick.bind(this),this.onToggleKeydown=this.onToggleKeydown.bind(this),this.onMenuFocusOut=this.onMenuFocusOut.bind(this),this.onMenuKeydown=this.onMenuKeydown.bind(this),this._getNextMenuItem=this._getNextMenuItem.bind(this),this._getNextSelectableNode=this._getNextSelectableNode.bind(this),this._getPreviousMenuItem=this._getPreviousMenuItem.bind(this)}setup(e){this._toggleEl=this._dom.find(".lh-topbar button.lh-tools__button",this._dom.rootEl),this._toggleEl.addEventListener("click",this.onToggleClick),this._toggleEl.addEventListener("keydown",this.onToggleKeydown),this._menuEl=this._dom.find(".lh-topbar div.lh-tools__dropdown",this._dom.rootEl),this._menuEl.addEventListener("keydown",this.onMenuKeydown),this._menuEl.addEventListener("click",e)}close(){this._toggleEl.classList.remove("lh-active"),this._toggleEl.setAttribute("aria-expanded","false"),this._menuEl.contains(this._dom.document().activeElement)&&this._toggleEl.focus(),this._menuEl.removeEventListener("focusout",this.onMenuFocusOut),this._dom.document().removeEventListener("keydown",this.onDocumentKeyDown)}open(e){this._toggleEl.classList.contains("lh-active")?e.focus():this._menuEl.addEventListener("transitionend",(()=>{e.focus()}),{once:!0}),this._toggleEl.classList.add("lh-active"),this._toggleEl.setAttribute("aria-expanded","true"),this._menuEl.addEventListener("focusout",this.onMenuFocusOut),this._dom.document().addEventListener("keydown",this.onDocumentKeyDown)}onToggleClick(e){e.preventDefault(),e.stopImmediatePropagation(),this._toggleEl.classList.contains("lh-active")?this.close():this.open(this._getNextMenuItem())}onToggleKeydown(e){switch(e.code){case"ArrowUp":e.preventDefault(),this.open(this._getPreviousMenuItem());break;case"ArrowDown":case"Enter":case" ":e.preventDefault(),this.open(this._getNextMenuItem())}}onMenuKeydown(e){let t=e.target;switch(e.code){case"ArrowUp":e.preventDefault(),this._getPreviousMenuItem(t).focus();break;case"ArrowDown":e.preventDefault(),this._getNextMenuItem(t).focus();break;case"Home":e.preventDefault(),this._getNextMenuItem().focus();break;case"End":e.preventDefault(),this._getPreviousMenuItem().focus()}}onDocumentKeyDown(e){27===e.keyCode&&this.close()}onMenuFocusOut(e){let t=e.relatedTarget;this._menuEl.contains(t)||this.close()}_getNextSelectableNode(e,t){let n=e.filter((e=>e instanceof HTMLElement)).filter((e=>!(e.hasAttribute("disabled")||"none"===window.getComputedStyle(e).display))),r=t?n.indexOf(t)+1:0;return r>=n.length&&(r=0),n[r]}_getNextMenuItem(e){let t=Array.from(this._menuEl.childNodes);return this._getNextSelectableNode(t,e)}_getPreviousMenuItem(e){let t=Array.from(this._menuEl.childNodes).reverse();return this._getNextSelectableNode(t,e)}}(this._dom),this._copyAttempt=!1,this.topbarEl,this.categoriesEl,this.stickyHeaderEl,this.highlightEl,this.onDropDownMenuClick=this.onDropDownMenuClick.bind(this),this.onKeyUp=this.onKeyUp.bind(this),this.onCopy=this.onCopy.bind(this),this.collapseAllDetails=this.collapseAllDetails.bind(this)}enable(e){this.lhr=e,this._dom.rootEl.addEventListener("keyup",this.onKeyUp),this._dom.document().addEventListener("copy",this.onCopy),this._dropDownMenu.setup(this.onDropDownMenuClick),this._setUpCollapseDetailsAfterPrinting(),this._dom.find(".lh-topbar__logo",this._dom.rootEl).addEventListener("click",(()=>E(this._dom))),this._setupStickyHeader()}onDropDownMenuClick(e){e.preventDefault();let t=e.target;if(t&&t.hasAttribute("data-action")){switch(t.getAttribute("data-action")){case"copy":this.onCopyButtonClick();break;case"print-summary":this.collapseAllDetails(),this._print();break;case"print-expanded":this.expandAllDetails(),this._print();break;case"save-json":{let e=JSON.stringify(this.lhr,null,2);this._reportUIFeatures._saveFile(new Blob([e],{type:"application/json"}));break}case"save-html":{let e=this._reportUIFeatures.getReportHtml();try{this._reportUIFeatures._saveFile(new Blob([e],{type:"text/html"}))}catch(e){this._dom.fireEventOn("lh-log",this._dom.document(),{cmd:"error",msg:"Could not export as HTML. "+e.message})}break}case"open-viewer":this._dom.isDevTools()?async function(e){let t="viewer-"+z(e),n=L()+"/viewer/";await M({lhr:e},n,t)}(this.lhr):T(this.lhr);break;case"save-gist":this._reportUIFeatures.saveAsGist();break;case"toggle-dark":E(this._dom);break;case"view-unthrottled-trace":this._reportUIFeatures._opts.onViewTrace?.()}this._dropDownMenu.close()}}onCopy(e){this._copyAttempt&&e.clipboardData&&(e.preventDefault(),e.clipboardData.setData("text/plain",JSON.stringify(this.lhr,null,2)),this._dom.fireEventOn("lh-log",this._dom.document(),{cmd:"log",msg:"Report JSON copied to clipboard"})),this._copyAttempt=!1}onCopyButtonClick(){this._dom.fireEventOn("lh-analytics",this._dom.document(),{name:"copy"});try{this._dom.document().queryCommandSupported("copy")&&(this._copyAttempt=!0,this._dom.document().execCommand("copy")||(this._copyAttempt=!1,this._dom.fireEventOn("lh-log",this._dom.document(),{cmd:"warn",msg:"Your browser does not support copy to clipboard."})))}catch(e){this._copyAttempt=!1,this._dom.fireEventOn("lh-log",this._dom.document(),{cmd:"log",msg:e.message})}}onKeyUp(e){(e.ctrlKey||e.metaKey)&&80===e.keyCode&&this._dropDownMenu.close()}expandAllDetails(){this._dom.findAll(".lh-categories details",this._dom.rootEl).map((e=>e.open=!0))}collapseAllDetails(){this._dom.findAll(".lh-categories details",this._dom.rootEl).map((e=>e.open=!1))}_print(){this._reportUIFeatures._opts.onPrintOverride?this._reportUIFeatures._opts.onPrintOverride(this._dom.rootEl):self.print()}resetUIState(){this._dropDownMenu.close()}_getScrollParent(e){let{overflowY:t}=window.getComputedStyle(e);return"visible"!==t&&"hidden"!==t?e:e.parentElement?this._getScrollParent(e.parentElement):document}_setUpCollapseDetailsAfterPrinting(){"onbeforeprint"in self?self.addEventListener("afterprint",this.collapseAllDetails):self.matchMedia("print").addListener((e=>{e.matches?this.expandAllDetails():this.collapseAllDetails()}))}_setupStickyHeader(){this.topbarEl=this._dom.find("div.lh-topbar",this._dom.rootEl),this.categoriesEl=this._dom.find("div.lh-categories",this._dom.rootEl),requestAnimationFrame((()=>requestAnimationFrame((()=>{try{this.stickyHeaderEl=this._dom.find("div.lh-sticky-header",this._dom.rootEl)}catch{return}this.highlightEl=this._dom.createChildOf(this.stickyHeaderEl,"div","lh-highlighter");let e=this._getScrollParent(this._dom.find(".lh-container",this._dom.rootEl));e.addEventListener("scroll",(()=>this._updateStickyHeader()));let t=e instanceof window.Document?document.documentElement:e;new window.ResizeObserver((()=>this._updateStickyHeader())).observe(t)}))))}_updateStickyHeader(){if(!this.stickyHeaderEl)return;let e=this.topbarEl.getBoundingClientRect().bottom>=this.categoriesEl.getBoundingClientRect().top,t=Array.from(this._dom.rootEl.querySelectorAll(".lh-category")).filter((e=>e.getBoundingClientRect().top-window.innerHeight/2<0)),n=t.length>0?t.length-1:0,r=this.stickyHeaderEl.querySelectorAll(".lh-gauge__wrapper, .lh-fraction__wrapper"),i=r[n],a=r[0].getBoundingClientRect().left,o=i.getBoundingClientRect().left-a;this.highlightEl.style.transform=`translate(${o}px)`,this.stickyHeaderEl.classList.toggle("lh-sticky-header--visible",e)}}(this,e),this._tablesHandledFor3p=new WeakSet,this.onMediaQueryChange=this.onMediaQueryChange.bind(this)}initFeatures(e){this.json=e,this._fullPageScreenshot=i.getFullPageScreenshot(e),this._topbar&&(this._topbar.enable(e),this._topbar.resetUIState()),this._setupMediaQueryListeners(),this._setupThirdPartyFilter(),this._setupElementScreenshotOverlay(this._dom.rootEl),this._dom._onSwap=()=>this._setupThirdPartyFilter();let t=this._dom.isDevTools()||this._opts.disableDarkMode||this._opts.disableAutoDarkModeAndFireworks;!t&&window.matchMedia("(prefers-color-scheme: dark)").matches&&E(this._dom,!0);let n=["performance","accessibility","best-practices","seo"].every((t=>{let n=e.categories[t];return n&&1===n.score})),r=this._opts.disableFireworks||this._opts.disableAutoDarkModeAndFireworks;if(n&&!r&&(this._enableFireworks(),t||E(this._dom,!0)),e.categories.performance&&e.categories.performance.auditRefs.some((t=>!("metrics"!==t.group||!e.audits[t.id].errorMessage)))){this._dom.find("input.lh-metrics-toggle__input",this._dom.rootEl).checked=!0}this.json.audits["script-treemap-data"]&&this.json.audits["script-treemap-data"].details&&this.addButton({text:l.strings.viewTreemapLabel,icon:"treemap",onClick:()=>function(e){if(!e.audits["script-treemap-data"].details)throw new Error("no script treemap data found");M({lhr:{mainDocumentUrl:e.mainDocumentUrl,finalUrl:e.finalUrl,finalDisplayedUrl:e.finalDisplayedUrl,audits:{"script-treemap-data":e.audits["script-treemap-data"]},configSettings:{locale:e.configSettings.locale}}},L()+"/treemap/","treemap-"+z(e))}(this.json)}),this._opts.onViewTrace&&("simulate"===e.configSettings.throttlingMethod?this._dom.find(\'a[data-action="view-unthrottled-trace"]\',this._dom.rootEl).classList.remove("lh-hidden"):this.addButton({text:l.strings.viewTraceLabel,onClick:()=>this._opts.onViewTrace?.()})),this._opts.getStandaloneReportHTML&&this._dom.find(\'a[data-action="save-html"]\',this._dom.rootEl).classList.remove("lh-hidden");for(let e of this._dom.findAll("[data-i18n]",this._dom.rootEl)){let t=e.getAttribute("data-i18n");e.textContent=l.strings[t]}}addButton(e){let t=this._dom.rootEl.querySelector(".lh-audit-group--metrics");if(!t)return;let n=t.querySelector(".lh-buttons");n||(n=this._dom.createChildOf(t,"div","lh-buttons"));let r=["lh-button"];e.icon&&(r.push("lh-report-icon"),r.push(`lh-report-icon--${e.icon}`));let i=this._dom.createChildOf(n,"button",r.join(" "));return i.textContent=e.text,i.addEventListener("click",e.onClick),i}resetUIState(){this._topbar&&this._topbar.resetUIState()}getReportHtml(){if(!this._opts.getStandaloneReportHTML)throw new Error("`getStandaloneReportHTML` is not set");return this.resetUIState(),this._opts.getStandaloneReportHTML()}saveAsGist(){throw new Error("Cannot save as gist from base report")}_enableFireworks(){this._dom.find(".lh-scores-container",this._dom.rootEl).classList.add("lh-score100")}_setupMediaQueryListeners(){let e=self.matchMedia("(max-width: 500px)");e.addListener(this.onMediaQueryChange),this.onMediaQueryChange(e)}_resetUIState(){this._topbar&&this._topbar.resetUIState()}onMediaQueryChange(e){this._dom.rootEl.classList.toggle("lh-narrow",e.matches)}_setupThirdPartyFilter(){let e=["uses-rel-preconnect","third-party-facades","network-dependency-tree-insight"],t=["legacy-javascript","legacy-javascript-insight"];Array.from(this._dom.rootEl.querySelectorAll("table.lh-table")).filter((e=>e.querySelector("td.lh-table-column--url, td.lh-table-column--source-location"))).filter((t=>{let n=t.closest(".lh-audit");if(!n)throw new Error(".lh-table not within audit");return!e.includes(n.id)})).forEach((e=>{if(this._tablesHandledFor3p.has(e))return;this._tablesHandledFor3p.add(e);let n=(d=e,Array.from(d.tBodies[0].rows)),r=n.filter((e=>!e.classList.contains("lh-sub-item-row"))),a=this._getThirdPartyRows(r,i.getFinalDisplayedUrl(this.json)),o=n.some((e=>e.classList.contains("lh-row--even"))),s=this._dom.createComponent("3pFilter"),c=this._dom.find("input",s);var d;c.addEventListener("change",(e=>{let t=e.target instanceof HTMLInputElement&&!e.target.checked,n=!0,i=r[0];for(;i;){let e=t&&a.includes(i);do{i.classList.toggle("lh-row--hidden",e),o&&(i.classList.toggle("lh-row--even",!e&&n),i.classList.toggle("lh-row--odd",!e&&!n)),i=i.nextElementSibling}while(i&&i.classList.contains("lh-sub-item-row"));e||(n=!n)}}));let h=a.filter((e=>!e.classList.contains("lh-row--group"))).length;this._dom.find(".lh-3p-filter-count",s).textContent=`${h}`,this._dom.find(".lh-3p-ui-string",s).textContent=l.strings.thirdPartyResourcesLabel;let p=a.length===r.length,g=!a.length;if((p||g)&&(this._dom.find("div.lh-3p-filter",s).hidden=!0),!e.parentNode)return;e.parentNode.insertBefore(s,e);let u=e.closest(".lh-audit");if(!u)throw new Error(".lh-table not within audit");t.includes(u.id)&&!p&&c.click()}))}_setupElementScreenshotOverlay(e){this._fullPageScreenshot&&f.installOverlayFeature({dom:this._dom,rootEl:e,overlayContainerEl:e,fullPageScreenshot:this._fullPageScreenshot})}_getThirdPartyRows(e,t){let n=i.getEntityFromUrl(t,this.json.entities),r=this.json.entities?.find((e=>!0===e.isFirstParty))?.name,a=[];for(let t of e){if(r){if(!t.dataset.entity||t.dataset.entity===r)continue}else{let e=t.querySelector("div.lh-text__url");if(!e)continue;let r=e.dataset.url;if(!r||i.getEntityFromUrl(r,this.json.entities)===n)continue}a.push(t)}return a}_saveFile(e){let t=e.type.match("json")?".json":".html",n=D({finalDisplayedUrl:i.getFinalDisplayedUrl(this.json),fetchTime:this.json.fetchTime})+t;this._opts.onSaveFileOverride?this._opts.onSaveFileOverride(e,n):this._dom.saveFile(e,n)}};window.__initLighthouseReport__=function(){let e=function(e,t={}){let n=document.createElement("article");n.classList.add("lh-root","lh-vars");let r=new a(n.ownerDocument,n),i=new k(r);return t._onSwapHook&&(r._onSwapHook=t._onSwapHook),i.renderReport(e,n,t),new F(r,t).initFeatures(e),n}(window.__LIGHTHOUSE_JSON__,{occupyEntireViewport:!0,getStandaloneReportHTML:()=>document.documentElement.outerHTML});document.body.append(e),document.addEventListener("lh-analytics",(e=>{let t=e;"gtag"in window&&window.gtag("event",t.detail.name,t.detail.data??{})})),document.addEventListener("lh-log",(e=>{let t=document.querySelector("div#lh-log");if(!t)return;let n=new class{constructor(e){this.el=e;let t=document.createElement("style");if(t.textContent="\\n      #lh-log {\\n        position: fixed;\\n        background-color: #323232;\\n        color: #fff;\\n        min-height: 48px;\\n        min-width: 288px;\\n        padding: 16px 24px;\\n        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);\\n        border-radius: 2px;\\n        margin: 12px;\\n        font-size: 14px;\\n        cursor: default;\\n        transition: transform 0.3s, opacity 0.3s;\\n        transform: translateY(100px);\\n        opacity: 0;\\n        bottom: 0;\\n        left: 0;\\n        z-index: 3;\\n        display: flex;\\n        flex-direction: row;\\n        justify-content: center;\\n        align-items: center;\\n      }\\n      \\n      #lh-log.lh-show {\\n        opacity: 1;\\n        transform: translateY(0);\\n      }\\n    ",!this.el.parentNode)throw new Error("element needs to be in the DOM");this.el.parentNode.insertBefore(t,this.el),this._id=void 0}log(e,t=!0){this._id&&clearTimeout(this._id),this.el.textContent=e,this.el.classList.add("lh-show"),t&&(this._id=setTimeout((()=>{this.el.classList.remove("lh-show")}),7e3))}warn(e){this.log("Warning: "+e)}error(e){this.log(e),setTimeout((()=>{throw new Error(e)}),0)}hide(){this._id&&clearTimeout(this._id),this.el.classList.remove("lh-show")}}(t),r=e.detail;switch(r.cmd){case"log":n.log(r.msg);break;case"warn":n.warn(r.msg);break;case"error":n.error(r.msg);break;case"hide":n.hide()}}))}})();\n/**\n * @license\n * Copyright 2017 Google LLC\n * SPDX-License-Identifier: Apache-2.0\n */\n/**\n * @license\n * Copyright 2023 Google LLC\n * SPDX-License-Identifier: Apache-2.0\n */\n/**\n * @license\n * Copyright 2020 Google LLC\n * SPDX-License-Identifier: Apache-2.0\n */\n/**\n * @license Copyright 2023 The Lighthouse Authors. All Rights Reserved.\n * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0\n * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.\n*/\n/**\n * @license\n * Copyright 2018 Google LLC\n * SPDX-License-Identifier: Apache-2.0\n */\n/**\n * @license\n * Copyright 2017 Google LLC\n * SPDX-License-Identifier: Apache-2.0\n *\n * Dummy text for ensuring report robustness: <\\/script> pre$`post %%LIGHTHOUSE_JSON%%\n * (this is handled by terser)\n */\n/**\n * @license\n * Copyright 2021 Google LLC\n * SPDX-License-Identifier: Apache-2.0\n */';
    var reportAssets = {
      REPORT_TEMPLATE,
      REPORT_JAVASCRIPT,
      // Flow report assets are not needed for every bundle.
      // Replacing/ignoring flow-report-assets.js (e.g. `rollupPlugins.shim`) will
      // remove the flow assets from the bundle.
      ...flowReportAssets
    };
    var ReportGenerator = class _ReportGenerator {
      /**
       * Replaces all the specified strings in source without serial replacements.
       * @param {string} source
       * @param {!Array<{search: string, replacement: string}>} replacements
       * @return {string}
       */
      static replaceStrings(source, replacements) {
        if (replacements.length === 0) {
          return source;
        }
        const firstReplacement = replacements[0];
        const nextReplacements = replacements.slice(1);
        return source.split(firstReplacement.search).map((part) => _ReportGenerator.replaceStrings(part, nextReplacements)).join(firstReplacement.replacement);
      }
      /**
       * @param {unknown} object
       * @return {string}
       */
      static sanitizeJson(object) {
        return JSON.stringify(object).replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
      }
      /**
       * Returns the standalone report HTML as a string with the report JSON and renderer JS inlined.
       * @param {LHResult} lhr
       * @return {string}
       */
      static generateReportHtml(lhr) {
        const sanitizedJson = _ReportGenerator.sanitizeJson(lhr);
        const sanitizedJavascript = reportAssets.REPORT_JAVASCRIPT.replace(/<\//g, "\\u003c/");
        return _ReportGenerator.replaceStrings(reportAssets.REPORT_TEMPLATE, [
          { search: "%%LIGHTHOUSE_JSON%%", replacement: sanitizedJson },
          { search: "%%LIGHTHOUSE_JAVASCRIPT%%", replacement: sanitizedJavascript }
        ]);
      }
      /**
       * Returns the standalone flow report HTML as a string with the report JSON and renderer JS inlined.
       * @param {FlowResult} flow
       * @return {string}
       */
      static generateFlowReportHtml(flow) {
        const sanitizedJson = _ReportGenerator.sanitizeJson(flow);
        const sanitizedJavascript = reportAssets.FLOW_REPORT_JAVASCRIPT.replace(/<\//g, "\\u003c/");
        return _ReportGenerator.replaceStrings(reportAssets.FLOW_REPORT_TEMPLATE, [
          { search: "%%LIGHTHOUSE_FLOW_JSON%%", replacement: sanitizedJson },
          { search: "%%LIGHTHOUSE_FLOW_JAVASCRIPT%%", replacement: sanitizedJavascript },
          { search: "/*%%LIGHTHOUSE_FLOW_CSS%%*/", replacement: reportAssets.FLOW_REPORT_CSS }
        ]);
      }
      /**
       * Converts the results to a CSV formatted string
       * Each row describes the result of 1 audit with
       *  - the name of the category the audit belongs to
       *  - the name of the audit
       *  - a description of the audit
       *  - the score type that is used for the audit
       *  - the score value of the audit
       *
       * @param {LHResult} lhr
       * @return {string}
       */
      static generateReportCSV(lhr) {
        const CRLF = "\r\n";
        const separator = ",";
        const escape = (value) => `"${value.replace(/"/g, '""')}"`;
        const rowFormatter = (row) => row.map((value) => {
          if (value === null)
            return "null";
          return value.toString();
        }).map(escape);
        const rows = [];
        const topLevelKeys = (
          /** @type {const} */
          ["requestedUrl", "finalDisplayedUrl", "fetchTime", "gatherMode"]
        );
        rows.push(rowFormatter(topLevelKeys));
        rows.push(rowFormatter(topLevelKeys.map((key) => lhr[key] ?? null)));
        rows.push([]);
        rows.push(["category", "score"]);
        for (const category of Object.values(lhr.categories)) {
          rows.push(rowFormatter([
            category.id,
            category.score
          ]));
        }
        rows.push([]);
        rows.push(["category", "audit", "score", "displayValue", "description"]);
        for (const category of Object.values(lhr.categories)) {
          for (const auditRef of category.auditRefs) {
            const audit = lhr.audits[auditRef.id];
            if (!audit)
              continue;
            rows.push(rowFormatter([
              category.id,
              auditRef.id,
              audit.score,
              audit.displayValue || "",
              audit.description
            ]));
          }
        }
        return rows.map((row) => row.join(separator)).join(CRLF);
      }
      /**
       * @param {LHResult|FlowResult} result
       * @return {result is FlowResult}
       */
      static isFlowResult(result) {
        return "steps" in result;
      }
      /**
       * Creates the results output in a format based on the `mode`.
       * @param {LHResult|FlowResult} result
       * @param {LHResult['configSettings']['output']} outputModes
       * @return {string|string[]}
       */
      static generateReport(result, outputModes) {
        const outputAsArray = Array.isArray(outputModes);
        if (typeof outputModes === "string")
          outputModes = [outputModes];
        const output = outputModes.map((outputMode) => {
          if (outputMode === "html") {
            if (_ReportGenerator.isFlowResult(result)) {
              return _ReportGenerator.generateFlowReportHtml(result);
            }
            return _ReportGenerator.generateReportHtml(result);
          }
          if (outputMode === "csv") {
            if (_ReportGenerator.isFlowResult(result)) {
              throw new Error("CSV output is not support for user flows");
            }
            return _ReportGenerator.generateReportCSV(result);
          }
          if (outputMode === "json") {
            return JSON.stringify(result, null, 2);
          }
          throw new Error("Invalid output mode: " + outputMode);
        });
        return outputAsArray ? output : output[0];
      }
    };
    return __toCommonJS(report_generator_exports);
  })();
  ;
  return umdExports.ReportGenerator ?? umdExports;
});

// gen/front_end/panels/lighthouse/LighthouseController.js
var LighthouseController_exports = {};
__export(LighthouseController_exports, {
  Events: () => Events,
  LighthouseController: () => LighthouseController,
  Presets: () => Presets,
  RuntimeSettings: () => RuntimeSettings
});
import * as Common from "./../../core/common/common.js";
import * as Host from "./../../core/host/host.js";
import * as i18n from "./../../core/i18n/i18n.js";
import * as SDK from "./../../core/sdk/sdk.js";
import * as EmulationModel from "./../../models/emulation/emulation.js";
import * as Emulation from "./../emulation/emulation.js";
var UIStrings = {
  /**
   *@description Explanation for user that Ligthhouse can only audit HTTP/HTTPS pages
   */
  canOnlyAuditHttphttpsPages: "Can only audit pages on HTTP or HTTPS. Navigate to a different page.",
  /**
   *@description Text when stored data in one location may affect Lighthouse run
   *@example {IndexedDB} PH1
   */
  thereMayBeStoredDataAffectingSingular: "There may be stored data affecting loading performance in this location: {PH1}. Audit this page in an incognito window to prevent those resources from affecting your scores.",
  /**
   *@description Text when stored data in multiple locations may affect Lighthouse run
   *@example {IndexedDB, WebSQL} PH1
   */
  thereMayBeStoredDataAffectingLoadingPlural: "There may be stored data affecting loading performance in these locations: {PH1}. Audit this page in an incognito window to prevent those resources from affecting your scores.",
  /**
   *@description Help text in Lighthouse Controller
   */
  multipleTabsAreBeingControlledBy: "Multiple tabs are being controlled by the same `service worker`. Close your other tabs on the same origin to audit this page.",
  /**
   *@description Help text in Lighthouse Controller
   */
  atLeastOneCategoryMustBeSelected: "At least one category must be selected.",
  /**
   *@description Text in Application Panel Sidebar of the Application panel
   */
  localStorage: "Local storage",
  /**
   *@description Text in Application Panel Sidebar of the Application panel
   */
  indexeddb: "IndexedDB",
  /**
   *@description Text in Application Panel Sidebar of the Application panel
   */
  webSql: "Web SQL",
  /**
   *@description Text of checkbox to include running the performance audits in Lighthouse
   */
  performance: "Performance",
  /**
   *@description Tooltip text of checkbox to include running the performance audits in Lighthouse
   */
  howLongDoesThisAppTakeToShow: "How long does this app take to show content and become usable",
  /**
   *@description Text of checkbox to include running the Best Practices audits in Lighthouse
   */
  bestPractices: "Best practices",
  /**
   *@description Tooltip text of checkbox to include running the Best Practices audits in Lighthouse
   */
  doesThisPageFollowBestPractices: "Does this page follow best practices for modern web development",
  /**
   *@description Text of checkbox to include running the Accessibility audits in Lighthouse
   */
  accessibility: "Accessibility",
  /**
   *@description Tooltip text of checkbox to include running the Accessibility audits in Lighthouse
   */
  isThisPageUsableByPeopleWith: "Is this page usable by people with disabilities or impairments",
  /**
   *@description Text of checkbox to include running the Search Engine Optimization audits in Lighthouse
   */
  seo: "SEO",
  /**
   *@description Tooltip text of checkbox to include running the Search Engine Optimization audits in Lighthouse
   */
  isThisPageOptimizedForSearch: "Is this page optimized for search engine results ranking",
  /**
   *@description ARIA label for a radio button input to emulate mobile device behavior when running audits in Lighthouse.
   */
  applyMobileEmulation: "Apply mobile emulation",
  /**
   *@description Tooltip text of checkbox to emulate mobile device behavior when running audits in Lighthouse
   */
  applyMobileEmulationDuring: "Apply mobile emulation during auditing",
  /**
   *@description Tooltip text of checkbox to emulate desktop device behavior when running audits in Lighthouse
   */
  applyDesktopEmulationDuring: "Apply desktop emulation during auditing",
  /**
   * @description ARIA label for a radio button input to select the Lighthouse mode.
   */
  lighthouseMode: "Lighthouse mode",
  /**
   * @description Tooltip text of a radio button to select the Lighthouse mode. "Navigation" is a Lighthouse mode that audits a page navigation. "Timespan" is a Lighthouse mode that audits user interactions over a period of time. "Snapshot" is a Lighthouse mode that audits the current page state.
   */
  runLighthouseInMode: "Run Lighthouse in navigation, timespan, or snapshot mode",
  /**
   * @description Label of a radio option for a Lighthouse mode that audits a page navigation. This should be marked as the default radio option.
   */
  navigation: "Navigation (Default)",
  /**
   * @description Tooltip description of a radio option for a Lighthouse mode that audits a page navigation.
   */
  navigationTooltip: "Navigation mode analyzes a page load, exactly like the original Lighthouse reports.",
  /**
   * @description Label of a radio option for a Lighthouse mode that audits user interactions over a period of time.
   */
  timespan: "Timespan",
  /**
   * @description Tooltip description of a radio option for a Lighthouse mode that audits user interactions over a period of time.
   */
  timespanTooltip: "Timespan mode analyzes an arbitrary period of time, typically containing user interactions.",
  /**
   * @description Label of a radio option for a Lighthouse mode that audits the current page state.
   */
  snapshot: "Snapshot",
  /**
   * @description Tooltip description of a radio option for a Lighthouse mode that audits the current page state.
   */
  snapshotTooltip: "Snapshot mode analyzes the page in a particular state, typically after user interactions.",
  /**
   *@description Text for the mobile platform, as opposed to desktop
   */
  mobile: "Mobile",
  /**
   *@description Text for the desktop platform, as opposed to mobile
   */
  desktop: "Desktop",
  /**
   * @description Text for an option to select a throttling method.
   */
  throttlingMethod: "Throttling method",
  /**
   * @description Text for an option in a dropdown to use simulated throttling. This is the default setting.
   */
  simulatedThrottling: "Simulated throttling (default)",
  /**
   * @description Text for an option in a dropdown to use DevTools throttling. This option should only be used by advanced users.
   */
  devtoolsThrottling: "DevTools throttling (advanced)",
  /**
   * @description Tooltip text that appears when hovering over the 'Simulated Throttling' checkbox in the settings pane opened by clicking the setting cog in the start view of the audits panel
   */
  simulateASlowerPageLoadBasedOn: "Simulated throttling simulates a slower page load based on data from an initial unthrottled load. DevTools throttling actually slows down the page.",
  /**
   *@description Text of checkbox to reset storage features prior to running audits in Lighthouse
   */
  clearStorage: "Clear storage",
  /**
   * @description Tooltip text of checkbox to reset storage features prior to running audits in
   * Lighthouse. Resetting the storage clears/empties it to a neutral state.
   */
  resetStorageLocalstorage: "Reset storage (`cache`, `service workers`, etc) before auditing. (Good for performance & `PWA` testing)",
  /**
   * @description Text of checkbox to enable JavaScript sampling while running audits in Lighthouse
   */
  enableSampling: "Enable JS sampling",
  /**
   * @description Tooltip text of checkbox to enable JavaScript sampling while running audits in
   * Lighthouse. Resetting the storage clears/empties it to a neutral state.
   */
  enableJavaScriptSampling: "Enable JavaScript sampling during the Lighthouse run. This will provide more execution details in the performance panel when you view the trace, but has higher CPU overhead and may impact the performance of the page.",
  /**
   *@description Explanation for user that Lighthouse can only audit when JavaScript is enabled
   */
  javaScriptDisabled: "JavaScript is disabled. You need to enable JavaScript to audit this page. Open the Command Menu and run the Enable JavaScript command to enable JavaScript."
};
var str_ = i18n.i18n.registerUIStrings("panels/lighthouse/LighthouseController.ts", UIStrings);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
var i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(void 0, str_);
var LighthouseController = class extends Common.ObjectWrapper.ObjectWrapper {
  protocolService;
  manager;
  serviceWorkerListeners;
  inspectedURL;
  currentLighthouseRun;
  emulationStateBefore;
  constructor(protocolService) {
    super();
    this.protocolService = protocolService;
    protocolService.registerStatusCallback((message) => this.dispatchEventToListeners(Events.AuditProgressChanged, { message }));
    for (const preset of Presets) {
      preset.setting.addChangeListener(this.recomputePageAuditability.bind(this));
    }
    for (const runtimeSetting of RuntimeSettings) {
      runtimeSetting.setting.addChangeListener(this.recomputePageAuditability.bind(this));
    }
    const javaScriptDisabledSetting = Common.Settings.Settings.instance().moduleSetting("java-script-disabled");
    javaScriptDisabledSetting.addChangeListener(this.recomputePageAuditability.bind(this));
    SDK.TargetManager.TargetManager.instance().observeModels(SDK.ServiceWorkerManager.ServiceWorkerManager, this);
    SDK.TargetManager.TargetManager.instance().addEventListener("InspectedURLChanged", this.recomputePageAuditability, this);
  }
  modelAdded(serviceWorkerManager) {
    if (serviceWorkerManager.target() !== SDK.TargetManager.TargetManager.instance().primaryPageTarget()) {
      return;
    }
    this.manager = serviceWorkerManager;
    this.serviceWorkerListeners = [
      this.manager.addEventListener("RegistrationUpdated", this.recomputePageAuditability, this),
      this.manager.addEventListener("RegistrationDeleted", this.recomputePageAuditability, this)
    ];
    this.recomputePageAuditability();
  }
  modelRemoved(serviceWorkerManager) {
    if (this.manager !== serviceWorkerManager) {
      return;
    }
    if (this.serviceWorkerListeners) {
      Common.EventTarget.removeEventListeners(this.serviceWorkerListeners);
    }
    this.manager = null;
    this.recomputePageAuditability();
  }
  hasActiveServiceWorker() {
    if (!this.manager) {
      return false;
    }
    const mainTarget = this.manager.target();
    if (!mainTarget) {
      return false;
    }
    const inspectedURL = Common.ParsedURL.ParsedURL.fromString(mainTarget.inspectedURL());
    const inspectedOrigin = inspectedURL && inspectedURL.securityOrigin();
    for (const registration of this.manager.registrations().values()) {
      if (registration.securityOrigin !== inspectedOrigin) {
        continue;
      }
      for (const version of registration.versions.values()) {
        if (version.controlledClients.length > 1) {
          return true;
        }
      }
    }
    return false;
  }
  hasAtLeastOneCategory() {
    return Presets.some((preset) => preset.setting.get());
  }
  unauditablePageMessage() {
    if (!this.manager || this.getFlags().mode !== "navigation") {
      return null;
    }
    const mainTarget = this.manager.target();
    const inspectedURL = mainTarget && mainTarget.inspectedURL();
    if (!inspectedURL?.startsWith("http")) {
      return i18nString(UIStrings.canOnlyAuditHttphttpsPages);
    }
    try {
      const isPdf = new URL(inspectedURL).pathname.endsWith(".pdf");
      if (isPdf) {
        return i18nString(UIStrings.canOnlyAuditHttphttpsPages);
      }
    } catch {
      return i18nString(UIStrings.canOnlyAuditHttphttpsPages);
    }
    return null;
  }
  javaScriptDisabled() {
    return Common.Settings.Settings.instance().moduleSetting("java-script-disabled").get();
  }
  async hasImportantResourcesNotCleared() {
    const clearStorageSetting = RuntimeSettings.find((runtimeSetting) => runtimeSetting.setting.name === "lighthouse.clear-storage");
    if (clearStorageSetting && !clearStorageSetting.setting.get()) {
      return "";
    }
    if (!this.manager) {
      return "";
    }
    const mainTarget = this.manager.target();
    const origin = mainTarget.inspectedURL();
    if (!origin) {
      return "";
    }
    const usageData = await mainTarget.storageAgent().invoke_getUsageAndQuota({ origin });
    if (usageData.getError()) {
      return "";
    }
    const locations = usageData.usageBreakdown.filter((usage) => usage.usage).map((usage) => STORAGE_TYPE_NAMES.get(usage.storageType)).map((i18nStringFn) => i18nStringFn ? i18nStringFn() : void 0).filter(Boolean);
    if (locations.length === 1) {
      return i18nString(UIStrings.thereMayBeStoredDataAffectingSingular, { PH1: String(locations[0]) });
    }
    if (locations.length > 1) {
      return i18nString(UIStrings.thereMayBeStoredDataAffectingLoadingPlural, { PH1: locations.join(", ") });
    }
    return "";
  }
  async evaluateInspectedURL() {
    const mainTarget = SDK.TargetManager.TargetManager.instance().primaryPageTarget();
    if (!mainTarget) {
      throw new Error("Unable to find main target required for Lighthouse");
    }
    const inspectedURL = mainTarget.inspectedURL();
    const resourceTreeModel = mainTarget.model(SDK.ResourceTreeModel.ResourceTreeModel);
    const navHistory = resourceTreeModel && await resourceTreeModel.navigationHistory();
    if (!resourceTreeModel || !navHistory) {
      return inspectedURL;
    }
    const { currentIndex, entries } = navHistory;
    const navigationEntry = entries[currentIndex];
    return navigationEntry.url;
  }
  getCurrentRun() {
    return this.currentLighthouseRun;
  }
  getFlags() {
    const flags = {};
    for (const runtimeSetting of RuntimeSettings) {
      runtimeSetting.setFlags(flags, runtimeSetting.setting.get());
    }
    return flags;
  }
  getCategoryIDs() {
    const categoryIDs = [];
    for (const preset of Presets) {
      if (preset.setting.get()) {
        categoryIDs.push(preset.configID);
      }
    }
    return categoryIDs;
  }
  async getInspectedURL(options) {
    if (options?.force || !this.inspectedURL) {
      this.inspectedURL = await this.evaluateInspectedURL();
    }
    return this.inspectedURL;
  }
  recomputePageAuditability() {
    const hasActiveServiceWorker = this.hasActiveServiceWorker();
    const hasAtLeastOneCategory = this.hasAtLeastOneCategory();
    const unauditablePageMessage = this.unauditablePageMessage();
    const javaScriptDisabled = this.javaScriptDisabled();
    let helpText = "";
    if (hasActiveServiceWorker) {
      helpText = i18nString(UIStrings.multipleTabsAreBeingControlledBy);
    } else if (!hasAtLeastOneCategory) {
      helpText = i18nString(UIStrings.atLeastOneCategoryMustBeSelected);
    } else if (unauditablePageMessage) {
      helpText = unauditablePageMessage;
    } else if (javaScriptDisabled) {
      helpText = i18nString(UIStrings.javaScriptDisabled);
    }
    this.dispatchEventToListeners(Events.PageAuditabilityChanged, { helpText });
    void this.hasImportantResourcesNotCleared().then((warning) => {
      if (this.getFlags().mode !== "navigation") {
        warning = "";
      }
      this.dispatchEventToListeners(Events.PageWarningsChanged, { warning });
    });
  }
  recordMetrics(flags, categoryIds) {
    Host.userMetrics.actionTaken(Host.UserMetrics.Action.LighthouseStarted);
    for (const preset of Presets) {
      if (!categoryIds.includes(preset.configID)) {
        continue;
      }
      Host.userMetrics.lighthouseCategoryUsed(preset.userMetric);
    }
    switch (flags.mode) {
      case "navigation":
        Host.userMetrics.lighthouseModeRun(
          0
          /* Host.UserMetrics.LighthouseModeRun.NAVIGATION */
        );
        break;
      case "timespan":
        Host.userMetrics.lighthouseModeRun(
          1
          /* Host.UserMetrics.LighthouseModeRun.TIMESPAN */
        );
        break;
      case "snapshot":
        Host.userMetrics.lighthouseModeRun(
          2
          /* Host.UserMetrics.LighthouseModeRun.SNAPSHOT */
        );
        break;
    }
  }
  async startLighthouse() {
    try {
      const inspectedURL = await this.getInspectedURL({ force: true });
      const categoryIDs = this.getCategoryIDs();
      const flags = this.getFlags();
      this.recordMetrics(flags, categoryIDs);
      this.currentLighthouseRun = { inspectedURL, categoryIDs, flags };
      await this.setupEmulationAndProtocolConnection();
      if (flags.mode === "timespan") {
        await this.protocolService.startTimespan(this.currentLighthouseRun);
      }
    } catch (err) {
      await this.restoreEmulationAndProtocolConnection();
      throw err;
    }
  }
  async collectLighthouseResults() {
    try {
      if (!this.currentLighthouseRun) {
        throw new Error("Lighthouse is not started");
      }
      const lighthouseResponse = await this.protocolService.collectLighthouseResults(this.currentLighthouseRun);
      if (!lighthouseResponse) {
        throw new Error("Auditing failed to produce a result");
      }
      if (lighthouseResponse.fatal) {
        const error = new Error(lighthouseResponse.message);
        error.stack = lighthouseResponse.stack;
        throw error;
      }
      Host.userMetrics.actionTaken(Host.UserMetrics.Action.LighthouseFinished);
      await this.restoreEmulationAndProtocolConnection();
      return lighthouseResponse;
    } catch (err) {
      await this.restoreEmulationAndProtocolConnection();
      throw err;
    } finally {
      this.currentLighthouseRun = void 0;
    }
  }
  async cancelLighthouse() {
    await this.restoreEmulationAndProtocolConnection();
    this.currentLighthouseRun = void 0;
  }
  /**
   * We set the device emulation on the DevTools-side for two reasons:
   * 1. To workaround some odd device metrics emulation bugs like occuluding viewports
   * 2. To get the attractive device outline
   */
  async setupEmulationAndProtocolConnection() {
    const flags = this.getFlags();
    const emulationModel = EmulationModel.DeviceModeModel.DeviceModeModel.instance();
    this.emulationStateBefore = {
      emulation: {
        type: emulationModel.type(),
        enabled: emulationModel.enabledSetting().get(),
        outlineEnabled: emulationModel.deviceOutlineSetting().get(),
        toolbarControlsEnabled: emulationModel.toolbarControlsEnabledSetting().get(),
        scale: emulationModel.scaleSetting().get(),
        device: emulationModel.device(),
        mode: emulationModel.mode()
      },
      network: { conditions: SDK.NetworkManager.MultitargetNetworkManager.instance().networkConditions() }
    };
    emulationModel.toolbarControlsEnabledSetting().set(false);
    if ("formFactor" in flags && flags.formFactor === "desktop") {
      emulationModel.enabledSetting().set(false);
      emulationModel.emulate(EmulationModel.DeviceModeModel.Type.None, null, null);
    } else if (flags.formFactor === "mobile") {
      emulationModel.enabledSetting().set(true);
      emulationModel.deviceOutlineSetting().set(true);
      for (const device of EmulationModel.EmulatedDevices.EmulatedDevicesList.instance().standard()) {
        if (device.title === "Moto G Power") {
          emulationModel.emulate(EmulationModel.DeviceModeModel.Type.Device, device, device.modes[0], 1);
        }
      }
    }
    await this.protocolService.attach();
  }
  async restoreEmulationAndProtocolConnection() {
    if (!this.currentLighthouseRun) {
      return;
    }
    await this.protocolService.detach();
    if (this.emulationStateBefore) {
      const emulationModel = EmulationModel.DeviceModeModel.DeviceModeModel.instance();
      emulationModel.emulate(EmulationModel.DeviceModeModel.Type.None, null, null);
      const { type, enabled, outlineEnabled, toolbarControlsEnabled, scale, device, mode: mode2 } = this.emulationStateBefore.emulation;
      emulationModel.enabledSetting().set(enabled);
      emulationModel.deviceOutlineSetting().set(outlineEnabled);
      emulationModel.toolbarControlsEnabledSetting().set(toolbarControlsEnabled);
      if (type === EmulationModel.DeviceModeModel.Type.Responsive) {
        emulationModel.scaleSetting().set(scale);
      }
      emulationModel.emulate(type, device, mode2, scale);
      SDK.NetworkManager.MultitargetNetworkManager.instance().setNetworkConditions(this.emulationStateBefore.network.conditions);
      delete this.emulationStateBefore;
    }
    Emulation.InspectedPagePlaceholder.InspectedPagePlaceholder.instance().update(true);
    const mainTarget = SDK.TargetManager.TargetManager.instance().primaryPageTarget();
    if (!mainTarget) {
      return;
    }
    const resourceTreeModel = mainTarget.model(SDK.ResourceTreeModel.ResourceTreeModel);
    if (!resourceTreeModel) {
      return;
    }
    const mode = this.currentLighthouseRun.flags.mode;
    if (mode === "navigation") {
      const inspectedURL = await this.getInspectedURL();
      await resourceTreeModel.navigate(inspectedURL);
    }
  }
};
var STORAGE_TYPE_NAMES = /* @__PURE__ */ new Map([
  ["local_storage", i18nLazyString(UIStrings.localStorage)],
  ["indexeddb", i18nLazyString(UIStrings.indexeddb)],
  ["websql", i18nLazyString(UIStrings.webSql)]
]);
var Presets = [
  // configID maps to Lighthouse's Object.keys(config.categories)[0] value
  {
    setting: Common.Settings.Settings.instance().createSetting(
      "lighthouse.cat-perf",
      true,
      "Synced"
      /* Common.Settings.SettingStorageType.SYNCED */
    ),
    configID: "performance",
    title: i18nLazyString(UIStrings.performance),
    description: i18nLazyString(UIStrings.howLongDoesThisAppTakeToShow),
    supportedModes: ["navigation", "timespan", "snapshot"],
    userMetric: 0
  },
  {
    setting: Common.Settings.Settings.instance().createSetting(
      "lighthouse.cat-a11y",
      true,
      "Synced"
      /* Common.Settings.SettingStorageType.SYNCED */
    ),
    configID: "accessibility",
    title: i18nLazyString(UIStrings.accessibility),
    description: i18nLazyString(UIStrings.isThisPageUsableByPeopleWith),
    supportedModes: ["navigation", "snapshot"],
    userMetric: 1
  },
  {
    setting: Common.Settings.Settings.instance().createSetting(
      "lighthouse.cat-best-practices",
      true,
      "Synced"
      /* Common.Settings.SettingStorageType.SYNCED */
    ),
    configID: "best-practices",
    title: i18nLazyString(UIStrings.bestPractices),
    description: i18nLazyString(UIStrings.doesThisPageFollowBestPractices),
    supportedModes: ["navigation", "timespan", "snapshot"],
    userMetric: 2
  },
  {
    setting: Common.Settings.Settings.instance().createSetting(
      "lighthouse.cat-seo",
      true,
      "Synced"
      /* Common.Settings.SettingStorageType.SYNCED */
    ),
    configID: "seo",
    title: i18nLazyString(UIStrings.seo),
    description: i18nLazyString(UIStrings.isThisPageOptimizedForSearch),
    supportedModes: ["navigation", "snapshot"],
    userMetric: 3
  }
];
var RuntimeSettings = [
  {
    setting: Common.Settings.Settings.instance().createSetting(
      "lighthouse.device-type",
      "mobile",
      "Synced"
      /* Common.Settings.SettingStorageType.SYNCED */
    ),
    title: i18nLazyString(UIStrings.applyMobileEmulation),
    description: i18nLazyString(UIStrings.applyMobileEmulationDuring),
    setFlags: (flags, value) => {
      flags.formFactor = value;
    },
    options: [
      {
        label: i18nLazyString(UIStrings.mobile),
        tooltip: i18nLazyString(UIStrings.applyMobileEmulationDuring),
        value: "mobile"
      },
      {
        label: i18nLazyString(UIStrings.desktop),
        tooltip: i18nLazyString(UIStrings.applyDesktopEmulationDuring),
        value: "desktop"
      }
    ],
    learnMore: void 0
  },
  {
    setting: Common.Settings.Settings.instance().createSetting(
      "lighthouse.mode",
      "navigation",
      "Synced"
      /* Common.Settings.SettingStorageType.SYNCED */
    ),
    title: i18nLazyString(UIStrings.lighthouseMode),
    description: i18nLazyString(UIStrings.runLighthouseInMode),
    setFlags: (flags, value) => {
      flags.mode = value;
    },
    options: [
      {
        label: i18nLazyString(UIStrings.navigation),
        tooltip: i18nLazyString(UIStrings.navigationTooltip),
        value: "navigation"
      },
      {
        label: i18nLazyString(UIStrings.timespan),
        tooltip: i18nLazyString(UIStrings.timespanTooltip),
        value: "timespan"
      },
      {
        label: i18nLazyString(UIStrings.snapshot),
        tooltip: i18nLazyString(UIStrings.snapshotTooltip),
        value: "snapshot"
      }
    ],
    learnMore: "https://github.com/GoogleChrome/lighthouse/blob/HEAD/docs/user-flows.md"
  },
  {
    // This setting is disabled, but we keep it around to show in the UI.
    setting: Common.Settings.Settings.instance().createSetting(
      "lighthouse.throttling",
      "simulate",
      "Synced"
      /* Common.Settings.SettingStorageType.SYNCED */
    ),
    title: i18nLazyString(UIStrings.throttlingMethod),
    // We will disable this when we have a Lantern trace viewer within DevTools.
    learnMore: "https://github.com/GoogleChrome/lighthouse/blob/master/docs/throttling.md#devtools-lighthouse-panel-throttling",
    description: i18nLazyString(UIStrings.simulateASlowerPageLoadBasedOn),
    setFlags: (flags, value) => {
      if (typeof value === "string") {
        flags.throttlingMethod = value;
      } else {
        flags.throttlingMethod = value ? "simulate" : "devtools";
      }
    },
    options: [
      { label: i18nLazyString(UIStrings.simulatedThrottling), value: "simulate" },
      { label: i18nLazyString(UIStrings.devtoolsThrottling), value: "devtools" }
    ]
  },
  {
    setting: Common.Settings.Settings.instance().createSetting(
      "lighthouse.clear-storage",
      true,
      "Synced"
      /* Common.Settings.SettingStorageType.SYNCED */
    ),
    title: i18nLazyString(UIStrings.clearStorage),
    description: i18nLazyString(UIStrings.resetStorageLocalstorage),
    setFlags: (flags, value) => {
      flags.disableStorageReset = !value;
    },
    options: void 0,
    learnMore: void 0
  },
  {
    setting: Common.Settings.Settings.instance().createSetting(
      "lighthouse.enable-sampling",
      false,
      "Synced"
      /* Common.Settings.SettingStorageType.SYNCED */
    ),
    title: i18nLazyString(UIStrings.enableSampling),
    description: i18nLazyString(UIStrings.enableJavaScriptSampling),
    setFlags: (flags, value) => {
      if (value) {
        flags.additionalTraceCategories = "disabled-by-default-v8.cpu_profiler";
      } else {
        flags.additionalTraceCategories = "";
      }
    },
    options: void 0,
    learnMore: void 0
  }
];
var Events;
(function(Events2) {
  Events2["PageAuditabilityChanged"] = "PageAuditabilityChanged";
  Events2["PageWarningsChanged"] = "PageWarningsChanged";
  Events2["AuditProgressChanged"] = "AuditProgressChanged";
})(Events || (Events = {}));

// gen/front_end/panels/lighthouse/LighthousePanel.js
var LighthousePanel_exports = {};
__export(LighthousePanel_exports, {
  LighthousePanel: () => LighthousePanel
});
import "./../../ui/legacy/legacy.js";
import * as Common5 from "./../../core/common/common.js";
import * as i18n12 from "./../../core/i18n/i18n.js";
import * as UI7 from "./../../ui/legacy/legacy.js";
import * as VisualLogging2 from "./../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/lighthouse/lighthousePanel.css.js
var lighthousePanel_css_default = `/*
 * Copyright 2017 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.lh-root {
  --report-menu-width: 0;

  user-select: text;
}
/* for View Trace button */

.lh-audit-group {
  position: relative;
}

button.view-trace {
  margin: 10px;
}

.lighthouse-results-container {
  position: relative;
}
/** \\'window.opener\\' is null for windows opened from DevTools. This breaks
    the LH viewer app, so disable this feature. */

.lh-tools--viewer {
  display: none !important; /* stylelint-disable-line declaration-no-important */
}

.lighthouse-settings-pane {
  flex: none;
}

.lighthouse-settings-pane devtools-toolbar {
  flex: 1 1;
  flex-wrap: wrap;
}

select.lighthouse-report {
  min-width: 140px;
  /* Up to 180px wide, but if window is very small ensure dropdown arrow is visible */
  max-width: min(180px, calc(100% - 30px));
}

.lighthouse-toolbar-container {
  display: flex;
  flex: none;
}

.lighthouse-toolbar-container > devtools-toolbar {
  background-color: var(--sys-color-cdt-base-container);
  border-bottom: 1px solid var(--sys-color-divider);
}

.lighthouse-toolbar-container > :first-child {
  flex: 1 1 auto;
}

.lh-devtools .lh-element-screenshot__overlay {
  position: absolute;
}

/*# sourceURL=${import.meta.resolve("./lighthousePanel.css")} */`;

// gen/front_end/panels/lighthouse/LighthouseProtocolService.js
var LighthouseProtocolService_exports = {};
__export(LighthouseProtocolService_exports, {
  ProtocolService: () => ProtocolService
});
import * as i18n3 from "./../../core/i18n/i18n.js";
import * as SDK2 from "./../../core/sdk/sdk.js";
var lastId = 1;
var ProtocolService = class {
  mainSessionId;
  rootTargetId;
  parallelConnection;
  lighthouseWorkerPromise;
  lighthouseMessageUpdateCallback;
  removeDialogHandler;
  configForTesting;
  async attach() {
    await SDK2.TargetManager.TargetManager.instance().suspendAllTargets();
    const mainTarget = SDK2.TargetManager.TargetManager.instance().primaryPageTarget();
    if (!mainTarget) {
      throw new Error("Unable to find main target required for Lighthouse");
    }
    const rootTarget = SDK2.TargetManager.TargetManager.instance().rootTarget();
    if (!rootTarget) {
      throw new Error("Could not find the root target");
    }
    const childTargetManager = mainTarget.model(SDK2.ChildTargetManager.ChildTargetManager);
    if (!childTargetManager) {
      throw new Error("Unable to find child target manager required for Lighthouse");
    }
    const resourceTreeModel = mainTarget.model(SDK2.ResourceTreeModel.ResourceTreeModel);
    if (!resourceTreeModel) {
      throw new Error("Unable to find resource tree model required for Lighthouse");
    }
    const rootChildTargetManager = rootTarget.model(SDK2.ChildTargetManager.ChildTargetManager);
    if (!rootChildTargetManager) {
      throw new Error("Could not find the child target manager class for the root target");
    }
    const { connection, sessionId } = await rootChildTargetManager.createParallelConnection((message) => {
      if (typeof message === "string") {
        message = JSON.parse(message);
      }
      this.dispatchProtocolMessage(message);
    });
    const dialogHandler = () => {
      void mainTarget.pageAgent().invoke_handleJavaScriptDialog({ accept: true });
    };
    resourceTreeModel.addEventListener(SDK2.ResourceTreeModel.Events.JavaScriptDialogOpening, dialogHandler);
    this.removeDialogHandler = () => resourceTreeModel.removeEventListener(SDK2.ResourceTreeModel.Events.JavaScriptDialogOpening, dialogHandler);
    this.parallelConnection = connection;
    this.rootTargetId = await rootChildTargetManager.getParentTargetId();
    this.mainSessionId = sessionId;
  }
  getLocales() {
    return [i18n3.DevToolsLocale.DevToolsLocale.instance().locale];
  }
  async startTimespan(currentLighthouseRun) {
    const { inspectedURL, categoryIDs, flags } = currentLighthouseRun;
    if (!this.mainSessionId || !this.rootTargetId) {
      throw new Error("Unable to get target info required for Lighthouse");
    }
    await this.sendWithResponse("startTimespan", {
      url: inspectedURL,
      categoryIDs,
      flags,
      config: this.configForTesting,
      locales: this.getLocales(),
      mainSessionId: this.mainSessionId,
      rootTargetId: this.rootTargetId
    });
  }
  async collectLighthouseResults(currentLighthouseRun) {
    const { inspectedURL, categoryIDs, flags } = currentLighthouseRun;
    if (!this.mainSessionId || !this.rootTargetId) {
      throw new Error("Unable to get target info required for Lighthouse");
    }
    let mode = flags.mode;
    if (mode === "timespan") {
      mode = "endTimespan";
    }
    return await this.sendWithResponse(mode, {
      url: inspectedURL,
      categoryIDs,
      flags,
      config: this.configForTesting,
      locales: this.getLocales(),
      mainSessionId: this.mainSessionId,
      rootTargetId: this.rootTargetId
    });
  }
  async detach() {
    const oldLighthouseWorker = this.lighthouseWorkerPromise;
    const oldParallelConnection = this.parallelConnection;
    this.lighthouseWorkerPromise = void 0;
    this.parallelConnection = void 0;
    if (oldLighthouseWorker) {
      (await oldLighthouseWorker).terminate();
    }
    if (oldParallelConnection) {
      await oldParallelConnection.disconnect();
    }
    await SDK2.TargetManager.TargetManager.instance().resumeAllTargets();
    this.removeDialogHandler?.();
  }
  registerStatusCallback(callback) {
    this.lighthouseMessageUpdateCallback = callback;
  }
  dispatchProtocolMessage(message) {
    const protocolMessage = message;
    if (protocolMessage.sessionId || protocolMessage.method?.startsWith("Target")) {
      void this.send("dispatchProtocolMessage", { message });
    }
  }
  initWorker() {
    this.lighthouseWorkerPromise = new Promise((resolve) => {
      const workerUrl = new URL("../../entrypoints/lighthouse_worker/lighthouse_worker.js", import.meta.url);
      const remoteBaseSearchParam = new URL(self.location.href).searchParams.get("remoteBase");
      if (remoteBaseSearchParam) {
        workerUrl.searchParams.set("remoteBase", remoteBaseSearchParam);
      }
      const worker = new Worker(workerUrl, { type: "module" });
      worker.addEventListener("message", (event) => {
        if (event.data === "workerReady") {
          resolve(worker);
          return;
        }
        this.onWorkerMessage(event);
      });
    });
    return this.lighthouseWorkerPromise;
  }
  async ensureWorkerExists() {
    let worker;
    if (!this.lighthouseWorkerPromise) {
      worker = await this.initWorker();
    } else {
      worker = await this.lighthouseWorkerPromise;
    }
    return worker;
  }
  onWorkerMessage(event) {
    const lighthouseMessage = event.data;
    if (lighthouseMessage.action === "statusUpdate") {
      if (this.lighthouseMessageUpdateCallback && lighthouseMessage.args && "message" in lighthouseMessage.args) {
        this.lighthouseMessageUpdateCallback(lighthouseMessage.args.message);
      }
    } else if (lighthouseMessage.action === "sendProtocolMessage") {
      if (lighthouseMessage.args && "message" in lighthouseMessage.args) {
        this.sendProtocolMessage(lighthouseMessage.args.message);
      }
    }
  }
  sendProtocolMessage(message) {
    if (this.parallelConnection) {
      this.parallelConnection.sendRawMessage(message);
    }
  }
  async send(action, args = {}) {
    const worker = await this.ensureWorkerExists();
    const messageId = lastId++;
    worker.postMessage({ id: messageId, action, args: { ...args, id: messageId } });
  }
  /** sendWithResponse currently only handles the original startLighthouse request and LHR-filled response. */
  async sendWithResponse(action, args = {}) {
    const worker = await this.ensureWorkerExists();
    const messageId = lastId++;
    const messageResult = new Promise((resolve) => {
      const workerListener = (event) => {
        const lighthouseMessage = event.data;
        if (lighthouseMessage.id === messageId) {
          worker.removeEventListener("message", workerListener);
          resolve(lighthouseMessage.result);
        }
      };
      worker.addEventListener("message", workerListener);
    });
    worker.postMessage({ id: messageId, action, args: { ...args, id: messageId } });
    return await messageResult;
  }
};

// gen/front_end/panels/lighthouse/LighthouseReportRenderer.js
var LighthouseReportRenderer_exports = {};
__export(LighthouseReportRenderer_exports, {
  LighthouseReportRenderer: () => LighthouseReportRenderer
});
import * as Common2 from "./../../core/common/common.js";
import * as Host2 from "./../../core/host/host.js";
import * as Platform from "./../../core/platform/platform.js";
import * as SDK3 from "./../../core/sdk/sdk.js";
import * as TextUtils from "./../../models/text_utils/text_utils.js";
import * as Workspace from "./../../models/workspace/workspace.js";
import * as LighthouseReport from "./../../third_party/lighthouse/report/report.js";
import * as Components from "./../../ui/legacy/components/utils/utils.js";
import * as UI from "./../../ui/legacy/legacy.js";
import * as ThemeSupport from "./../../ui/legacy/theme_support/theme_support.js";
import * as VisualLogging from "./../../ui/visual_logging/visual_logging.js";
var MaxLengthForLinks = 40;
var LighthouseReportRenderer = class _LighthouseReportRenderer {
  static renderLighthouseReport(lhr, artifacts, opts) {
    let onViewTrace = void 0;
    if (artifacts) {
      onViewTrace = async () => {
        Host2.userMetrics.actionTaken(Host2.UserMetrics.Action.LighthouseViewTrace);
        const trace = new SDK3.TraceObject.TraceObject(artifacts.Trace.traceEvents);
        void Common2.Revealer.reveal(trace);
      };
    }
    async function onSaveFileOverride(blob) {
      const domain = new Common2.ParsedURL.ParsedURL(lhr.finalUrl || lhr.finalDisplayedUrl).domain();
      const sanitizedDomain = domain.replace(/[^a-z0-9.-]+/gi, "_");
      const timestamp = Platform.DateUtilities.toISO8601Compact(new Date(lhr.fetchTime));
      const ext = blob.type.match("json") ? ".json" : ".html";
      const basename = `${sanitizedDomain}-${timestamp}${ext}`;
      const base64 = await blob.arrayBuffer().then(Common2.Base64.encode);
      await Workspace.FileManager.FileManager.instance().save(
        basename,
        new TextUtils.ContentData.ContentData(
          base64,
          /* isBase64= */
          true,
          blob.type
        ),
        /* forceSaveAs=*/
        true
      );
      Workspace.FileManager.FileManager.instance().close(basename);
    }
    async function onPrintOverride(rootEl) {
      const clonedReport = rootEl.cloneNode(true);
      const printWindow = window.open("", "_blank", "channelmode=1,status=1,resizable=1");
      if (!printWindow) {
        return;
      }
      printWindow.document.body.replaceWith(clonedReport);
      await _LighthouseReportRenderer.linkifyNodeDetails(clonedReport);
      opts?.beforePrint?.();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
      opts?.afterPrint?.();
    }
    function getStandaloneReportHTML() {
      return Lighthouse.ReportGenerator.ReportGenerator.generateReportHtml(lhr);
    }
    const reportEl = LighthouseReport.renderReport(lhr, {
      // Disable dark mode so we can manually adjust it.
      disableDarkMode: true,
      onViewTrace,
      onSaveFileOverride,
      onPrintOverride,
      getStandaloneReportHTML
    });
    reportEl.classList.add("lh-devtools");
    const updateDarkModeIfNecessary = () => {
      reportEl.classList.toggle("lh-dark", ThemeSupport.ThemeSupport.instance().themeName() === "dark");
    };
    ThemeSupport.ThemeSupport.instance().addEventListener(ThemeSupport.ThemeChangeEvent.eventName, updateDarkModeIfNecessary);
    updateDarkModeIfNecessary();
    reportEl._lighthouseResultForTesting = lhr;
    reportEl._lighthouseArtifactsForTesting = artifacts;
    _LighthouseReportRenderer.installVisualLogging(reportEl);
    void _LighthouseReportRenderer.waitForMainTargetLoad().then(() => {
      void _LighthouseReportRenderer.linkifyNodeDetails(reportEl);
      void _LighthouseReportRenderer.linkifySourceLocationDetails(reportEl);
    });
    return reportEl;
  }
  static async waitForMainTargetLoad() {
    const mainTarget = SDK3.TargetManager.TargetManager.instance().primaryPageTarget();
    if (!mainTarget) {
      return;
    }
    const resourceTreeModel = mainTarget.model(SDK3.ResourceTreeModel.ResourceTreeModel);
    if (!resourceTreeModel) {
      return;
    }
    await resourceTreeModel.once(SDK3.ResourceTreeModel.Events.Load);
  }
  static async linkifyNodeDetails(el) {
    const mainTarget = SDK3.TargetManager.TargetManager.instance().primaryPageTarget();
    if (!mainTarget) {
      return;
    }
    const domModel = mainTarget.model(SDK3.DOMModel.DOMModel);
    if (!domModel) {
      return;
    }
    for (const origElement of el.getElementsByClassName("lh-node")) {
      const origHTMLElement = origElement;
      const detailsItem = origHTMLElement.dataset;
      if (!detailsItem.path) {
        continue;
      }
      const nodeId = await domModel.pushNodeByPathToFrontend(detailsItem.path);
      if (!nodeId) {
        continue;
      }
      const node = domModel.nodeForId(nodeId);
      if (!node) {
        continue;
      }
      const element = await Common2.Linkifier.Linkifier.linkify(node, { tooltip: detailsItem.snippet, preventKeyboardFocus: void 0 });
      UI.Tooltip.Tooltip.install(origHTMLElement, "");
      const screenshotElement = origHTMLElement.querySelector(".lh-element-screenshot");
      origHTMLElement.textContent = "";
      if (screenshotElement) {
        origHTMLElement.append(screenshotElement);
      }
      origHTMLElement.appendChild(element);
    }
  }
  static async linkifySourceLocationDetails(el) {
    for (const origElement of el.getElementsByClassName("lh-source-location")) {
      const origHTMLElement = origElement;
      const detailsItem = origHTMLElement.dataset;
      if (!detailsItem.sourceUrl || !detailsItem.sourceLine || !detailsItem.sourceColumn) {
        continue;
      }
      const url = detailsItem.sourceUrl;
      const line = Number(detailsItem.sourceLine);
      const column = Number(detailsItem.sourceColumn);
      const element = await Components.Linkifier.Linkifier.linkifyURL(url, {
        lineNumber: line,
        columnNumber: column,
        showColumnNumber: false,
        inlineFrameIndex: 0,
        maxLength: MaxLengthForLinks
      });
      UI.Tooltip.Tooltip.install(origHTMLElement, "");
      origHTMLElement.textContent = "";
      origHTMLElement.appendChild(element);
    }
  }
  static installVisualLogging(el) {
    for (const auditEl of el.getElementsByClassName("lh-audit")) {
      const summaryEl = auditEl.querySelector("summary");
      if (!summaryEl) {
        continue;
      }
      const id = auditEl.id;
      if (!id) {
        continue;
      }
      auditEl.setAttribute("jslog", `${VisualLogging.item(`lighthouse.audit.${id}`)}`);
      let state;
      for (const className of auditEl.classList) {
        switch (className) {
          case "lh-audit--pass":
            state = "pass";
            break;
          case "lh-audit--average":
            state = "average";
            break;
          case "lh-audit--fail":
            state = "fail";
            break;
          case "lh-audit--informative":
            state = "informative";
            break;
        }
      }
      if (!state) {
        continue;
      }
      summaryEl.setAttribute("jslog", `${VisualLogging.expand(`lighthouse.audit-summary.${state}`).track({ click: true })}`);
    }
  }
};

// gen/front_end/panels/lighthouse/LighthouseReportSelector.js
var LighthouseReportSelector_exports = {};
__export(LighthouseReportSelector_exports, {
  Item: () => Item,
  ReportSelector: () => ReportSelector
});
import * as Common3 from "./../../core/common/common.js";
import * as i18n4 from "./../../core/i18n/i18n.js";
import * as UI2 from "./../../ui/legacy/legacy.js";
var UIStrings2 = {
  /**
   *@description Title of combo box in audits report selector
   */
  reports: "Reports",
  /**
   *@description New report item label in Lighthouse Report Selector
   */
  newReport: "(new report)"
};
var str_2 = i18n4.i18n.registerUIStrings("panels/lighthouse/LighthouseReportSelector.ts", UIStrings2);
var i18nString2 = i18n4.i18n.getLocalizedString.bind(void 0, str_2);
var ReportSelector = class {
  renderNewLighthouseView;
  newLighthouseItem;
  comboBoxInternal;
  itemByOptionElement;
  constructor(renderNewLighthouseView) {
    this.renderNewLighthouseView = renderNewLighthouseView;
    this.newLighthouseItem = document.createElement("option");
    this.comboBoxInternal = new UI2.Toolbar.ToolbarComboBox(this.handleChange.bind(this), i18nString2(UIStrings2.reports), "lighthouse-report");
    this.itemByOptionElement = /* @__PURE__ */ new Map();
    this.setEmptyState();
  }
  setEmptyState() {
    this.comboBoxInternal.removeOptions();
    this.comboBoxInternal.setEnabled(false);
    this.newLighthouseItem = document.createElement("option");
    this.newLighthouseItem.label = i18nString2(UIStrings2.newReport);
    this.comboBoxInternal.addOption(this.newLighthouseItem);
    this.comboBoxInternal.select(this.newLighthouseItem);
  }
  handleChange(_event) {
    const item2 = this.selectedItem();
    if (item2) {
      item2.select();
    } else {
      this.renderNewLighthouseView();
    }
  }
  selectedItem() {
    const option = this.comboBoxInternal.selectedOption();
    return this.itemByOptionElement.get(option);
  }
  hasItems() {
    return this.itemByOptionElement.size > 0;
  }
  comboBox() {
    return this.comboBoxInternal;
  }
  prepend(item2) {
    const optionEl = item2.optionElement();
    const selectEl = this.comboBoxInternal.element;
    this.itemByOptionElement.set(optionEl, item2);
    selectEl.insertBefore(optionEl, selectEl.firstElementChild);
    this.comboBoxInternal.setEnabled(true);
    this.comboBoxInternal.select(optionEl);
    item2.select();
  }
  clearAll() {
    for (const elem of this.comboBoxInternal.options()) {
      if (elem === this.newLighthouseItem) {
        continue;
      }
      this.itemByOptionElement.get(elem)?.delete();
      this.itemByOptionElement.delete(elem);
    }
    this.setEmptyState();
  }
  selectNewReport() {
    this.comboBoxInternal.select(this.newLighthouseItem);
  }
};
var Item = class {
  renderReport;
  showLandingCallback;
  element;
  constructor(lighthouseResult, renderReport2, showLandingCallback) {
    this.renderReport = renderReport2;
    this.showLandingCallback = showLandingCallback;
    const finalDisplayedUrl = lighthouseResult.finalDisplayedUrl || lighthouseResult.finalUrl || "";
    const url = new Common3.ParsedURL.ParsedURL(finalDisplayedUrl);
    const timestamp = lighthouseResult.fetchTime;
    this.element = document.createElement("option");
    this.element.label = `${new Date(timestamp).toLocaleTimeString()} - ${url.domain()}`;
  }
  select() {
    this.renderReport();
  }
  optionElement() {
    return this.element;
  }
  delete() {
    if (this.element) {
      this.element.remove();
    }
    this.showLandingCallback();
  }
};

// gen/front_end/panels/lighthouse/LighthouseStartView.js
var LighthouseStartView_exports = {};
__export(LighthouseStartView_exports, {
  StartView: () => StartView
});
import "./../../ui/legacy/legacy.js";
import * as i18n6 from "./../../core/i18n/i18n.js";
import * as Buttons from "./../../ui/components/buttons/buttons.js";
import * as UI4 from "./../../ui/legacy/legacy.js";

// gen/front_end/panels/lighthouse/lighthouseStartView.css.js
var lighthouseStartView_css_default = `/*
 * Copyright 2018 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */
/* <3 */

.lighthouse-start-view {
  line-height: 18px;
  padding: 24px;
  overflow: auto;
  height: 100%;
  /* for buttons */
  --legacy-accent-color: #0535c1;
  --legacy-accent-color-hover: #17b;
  --font-size: 14px;
  --report-font-family: roboto, helvetica, arial, sans-serif;
}

.lighthouse-start-view header {
  display: flex;
  font-size: 18px;
  flex-direction: row;
  align-items: center;
  column-gap: 16px;
  margin-bottom: 16px;
}

.lighthouse-logo {
  width: 75px;
  height: 75px;
  flex-shrink: 0;
  background-repeat: no-repeat;
  background-size: contain;
  /* stylelint-disable-next-line custom-property-pattern */
  background-image: var(--image-file-lighthouse_logo);
}

.lighthouse-start-view .lighthouse-logo {
  width: 45px;
  height: 45px;
}

.lighthouse-form-section {
  padding: 8px;
  flex: 1 1;
}

.lighthouse-form-section-label {
  margin: 7px 0;
  font-weight: 500;
}

.lighthouse-form-section-label i span {
  position: relative;
  top: -2px;
}

.lighthouse-form-section-label span.largeicon-checkmark {
  top: -4px;
}

.lighthouse-form-section-label .lighthouse-learn-more {
  margin: 20px;
}

.lighthouse-radio {
  display: flex;
  align-items: center;
}

.lighthouse-radio-text {
  margin-left: 3px;
}

.lighthouse-start-button-container {
  align-items: center;
}

.lighthouse-start-view header.hbox .lighthouse-start-button-container {
  margin-left: auto;
}

.lighthouse-start-view header.vbox .lighthouse-title {
  text-align: center;
}

.lighthouse-start-button-container button {
  margin: 16px auto;
  font-family: var(--report-font-family);
  font-weight: 500;
  font-size: var(--font-size);
}

.lighthouse-start-button-container button:disabled {
  cursor: not-allowed;
}

.lighthouse-launcher-row,
.lighthouse-radio {
  &:last-of-type {
    margin-bottom: 0;
  }

  &:not(:has(devtools-checkbox)) {
    margin-bottom: 6px;
  }
}

.lighthouse-launcher-row .dimmed {
  padding-left: 22px;
}

.lighthouse-help-text {
  text-align: center;
  color: #f00; /* stylelint-disable-line plugin/use_theme_colors */
  /* See: crbug.com/1152736 for color variable migration. */
  font-weight: bold;
  padding-left: 10px;
}

.lighthouse-warning-text {
  text-align: left;
  color: #ff8c00; /* stylelint-disable-line plugin/use_theme_colors */
  /* See: crbug.com/1152736 for color variable migration. */
  font-weight: bold;
  padding-left: 10px;
  padding-top: 10px;
}

.lighthouse-warning-text::before {
  content: "\u26A0";
  margin-right: 10px;
}

.lighthouse-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
}

.lighthouse-options.narrow {
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto;
}

.lighthouse-options.wide {
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
}

/*# sourceURL=${import.meta.resolve("./lighthouseStartView.css")} */`;

// gen/front_end/panels/lighthouse/RadioSetting.js
var RadioSetting_exports = {};
__export(RadioSetting_exports, {
  RadioSetting: () => RadioSetting
});
import * as UI3 from "./../../ui/legacy/legacy.js";
var RadioSetting = class {
  setting;
  options;
  element;
  radioElements;
  ignoreChangeEvents;
  selectedIndex;
  constructor(options, setting, description) {
    this.setting = setting;
    this.options = options;
    this.element = document.createElement("div");
    UI3.ARIAUtils.setDescription(this.element, description);
    UI3.ARIAUtils.markAsRadioGroup(this.element);
    this.radioElements = [];
    for (const option of this.options) {
      const fragment = UI3.Fragment.Fragment.build`
  <label $="label" class="lighthouse-radio">
  <input $="input" type="radio" value=${option.value} name=${setting.name}>
  <span $="span" class="lighthouse-radio-text">${option.label()}</span>
  </label>
  `;
      this.element.appendChild(fragment.element());
      const tooltip = option.tooltip?.() || description;
      if (description) {
        UI3.Tooltip.Tooltip.install(fragment.$("input"), tooltip);
        UI3.Tooltip.Tooltip.install(fragment.$("span"), tooltip);
      }
      const radioElement = fragment.$("input");
      radioElement.addEventListener("change", this.valueChanged.bind(this));
      this.radioElements.push(radioElement);
    }
    this.ignoreChangeEvents = false;
    this.selectedIndex = -1;
    setting.addChangeListener(this.settingChanged, this);
    this.settingChanged();
  }
  updateUI() {
    this.ignoreChangeEvents = true;
    if (this.radioElements[this.selectedIndex]) {
      this.radioElements[this.selectedIndex].checked = true;
    }
    this.ignoreChangeEvents = false;
  }
  settingChanged() {
    const value = this.setting.get();
    this.selectedIndex = this.options.findIndex((option) => option.value === value);
    this.updateUI();
  }
  valueChanged(_event) {
    if (this.ignoreChangeEvents) {
      return;
    }
    const selectedRadio = this.radioElements.find((radio) => radio.checked);
    if (!selectedRadio) {
      return;
    }
    this.setting.set(selectedRadio.value);
  }
};

// gen/front_end/panels/lighthouse/LighthouseStartView.js
var UIStrings3 = {
  /**
   * @description Text displayed as the title of a panel that can be used to audit a web page with Lighthouse.
   */
  generateLighthouseReport: "Generate a Lighthouse report",
  /**
   * @description Text that refers to the Lighthouse mode
   */
  mode: "Mode",
  /**
   * @description Title in the Lighthouse Start View for list of categories to run during audit
   */
  categories: "Categories",
  /**
   * @description Label for a button to start analyzing a page navigation with Lighthouse
   */
  analyzeNavigation: "Analyze page load",
  /**
   * @description Label for a button to start analyzing the current page state with Lighthouse
   */
  analyzeSnapshot: "Analyze page state",
  /**
   * @description Label for a button that starts a Lighthouse mode that analyzes user interactions over a period of time.
   */
  startTimespan: "Start timespan",
  /**
   * @description Text that is usually a hyperlink to more documentation
   */
  learnMore: "Learn more",
  /**
   * @description Text that refers to device such as a phone
   */
  device: "Device"
};
var str_3 = i18n6.i18n.registerUIStrings("panels/lighthouse/LighthouseStartView.ts", UIStrings3);
var i18nString3 = i18n6.i18n.getLocalizedString.bind(void 0, str_3);
var StartView = class extends UI4.Widget.Widget {
  controller;
  panel;
  settingsToolbarInternal;
  startButton;
  helpText;
  warningText;
  checkboxes = [];
  changeFormMode;
  constructor(controller, panel) {
    super(
      true
      /* useShadowDom */
    );
    this.registerRequiredCSS(lighthouseStartView_css_default);
    this.controller = controller;
    this.panel = panel;
    this.settingsToolbarInternal = document.createElement("devtools-toolbar");
    this.settingsToolbarInternal.classList.add("lighthouse-settings-toolbar");
    this.render();
  }
  populateRuntimeSettingAsRadio(settingName, label, parentElement) {
    const runtimeSetting = RuntimeSettings.find((item2) => item2.setting.name === settingName);
    if (!runtimeSetting?.options) {
      throw new Error(`${settingName} is not a setting with options`);
    }
    const labelEl = document.createElement("div");
    labelEl.classList.add("lighthouse-form-section-label");
    labelEl.textContent = label;
    if (runtimeSetting.learnMore) {
      const link = UI4.XLink.XLink.create(runtimeSetting.learnMore, i18nString3(UIStrings3.learnMore), "lighthouse-learn-more", void 0, "learn-more");
      labelEl.append(link);
    }
    parentElement.appendChild(labelEl);
    const control = new RadioSetting(runtimeSetting.options, runtimeSetting.setting, runtimeSetting.description());
    parentElement.appendChild(control.element);
    UI4.ARIAUtils.setLabel(control.element, label);
  }
  populateRuntimeSettingAsToolbarCheckbox(settingName, toolbar2) {
    const runtimeSetting = RuntimeSettings.find((item2) => item2.setting.name === settingName);
    if (!runtimeSetting?.title) {
      throw new Error(`${settingName} is not a setting with a title`);
    }
    runtimeSetting.setting.setTitle(runtimeSetting.title());
    const control = new UI4.Toolbar.ToolbarSettingCheckbox(runtimeSetting.setting, runtimeSetting.description());
    toolbar2.appendToolbarItem(control);
    if (runtimeSetting.learnMore) {
      const link = UI4.XLink.XLink.create(runtimeSetting.learnMore, i18nString3(UIStrings3.learnMore), "lighthouse-learn-more", void 0, "learn-more");
      link.style.margin = "5px";
      control.element.appendChild(link);
    }
  }
  populateRuntimeSettingAsToolbarDropdown(settingName, toolbar2) {
    const runtimeSetting = RuntimeSettings.find((item2) => item2.setting.name === settingName);
    if (!runtimeSetting?.title) {
      throw new Error(`${settingName} is not a setting with a title`);
    }
    const options = runtimeSetting.options?.map((option) => ({ label: option.label(), value: option.value })) || [];
    runtimeSetting.setting.setTitle(runtimeSetting.title());
    const control = new UI4.Toolbar.ToolbarSettingComboBox(options, runtimeSetting.setting, runtimeSetting.title());
    control.setTitle(runtimeSetting.description());
    toolbar2.appendToolbarItem(control);
    if (runtimeSetting.learnMore) {
      const link = UI4.XLink.XLink.create(runtimeSetting.learnMore, i18nString3(UIStrings3.learnMore), "lighthouse-learn-more", void 0, "learn-more");
      link.style.paddingLeft = "5px";
      link.style.display = "inline-flex";
      toolbar2.appendToolbarItem(new UI4.Toolbar.ToolbarItem(link));
    }
  }
  populateFormControls(fragment, mode) {
    const deviceTypeFormElements = fragment.$("device-type-form-elements");
    this.populateRuntimeSettingAsRadio("lighthouse.device-type", i18nString3(UIStrings3.device), deviceTypeFormElements);
    const categoryFormElements = fragment.$("categories-form-elements");
    this.checkboxes = [];
    for (const preset of Presets) {
      preset.setting.setTitle(preset.title());
      const checkbox = new UI4.Toolbar.ToolbarSettingCheckbox(preset.setting, preset.description());
      const row = categoryFormElements.createChild("div", "vbox lighthouse-launcher-row");
      row.appendChild(checkbox.element);
      checkbox.element.setAttribute("data-lh-category", preset.configID);
      this.checkboxes.push({ preset, checkbox });
      if (mode && !preset.supportedModes.includes(mode)) {
        checkbox.setEnabled(false);
        checkbox.setIndeterminate(true);
      }
    }
    UI4.ARIAUtils.markAsGroup(categoryFormElements);
    UI4.ARIAUtils.setLabel(categoryFormElements, i18nString3(UIStrings3.categories));
  }
  render() {
    this.populateRuntimeSettingAsToolbarCheckbox("lighthouse.clear-storage", this.settingsToolbarInternal);
    this.populateRuntimeSettingAsToolbarCheckbox("lighthouse.enable-sampling", this.settingsToolbarInternal);
    this.populateRuntimeSettingAsToolbarDropdown("lighthouse.throttling", this.settingsToolbarInternal);
    const { mode } = this.controller.getFlags();
    this.populateStartButton(mode);
    const fragment = UI4.Fragment.Fragment.build`
<form class="lighthouse-start-view">
  <header class="hbox">
    <div class="lighthouse-logo"></div>
    <div class="lighthouse-title">${i18nString3(UIStrings3.generateLighthouseReport)}</div>
    <div class="lighthouse-start-button-container" $="start-button-container">${this.startButton}</div>
  </header>
  <div $="help-text" class="lighthouse-help-text hidden"></div>
  <div class="lighthouse-options hbox">
    <div class="lighthouse-form-section">
      <div class="lighthouse-form-elements" $="mode-form-elements"></div>
    </div>
    <div class="lighthouse-form-section">
      <div class="lighthouse-form-elements" $="device-type-form-elements"></div>
    </div>
    <div class="lighthouse-form-categories">
      <div class="lighthouse-form-section">
        <div class="lighthouse-form-section-label">${i18nString3(UIStrings3.categories)}</div>
        <div class="lighthouse-form-elements" $="categories-form-elements"></div>
      </div>
    </div>
  </div>
  <div $="warning-text" class="lighthouse-warning-text hidden"></div>
</form>
    `;
    this.helpText = fragment.$("help-text");
    this.warningText = fragment.$("warning-text");
    const modeFormElements = fragment.$("mode-form-elements");
    this.populateRuntimeSettingAsRadio("lighthouse.mode", i18nString3(UIStrings3.mode), modeFormElements);
    this.populateFormControls(fragment, mode);
    this.contentElement.textContent = "";
    this.contentElement.append(fragment.element());
    this.refresh();
  }
  populateStartButton(mode) {
    let buttonLabel;
    let callback;
    if (mode === "timespan") {
      buttonLabel = i18nString3(UIStrings3.startTimespan);
      callback = () => {
        void this.panel.handleTimespanStart();
      };
    } else if (mode === "snapshot") {
      buttonLabel = i18nString3(UIStrings3.analyzeSnapshot);
      callback = () => {
        void this.panel.handleCompleteRun();
      };
    } else {
      buttonLabel = i18nString3(UIStrings3.analyzeNavigation);
      callback = () => {
        void this.panel.handleCompleteRun();
      };
    }
    const startButtonContainer = this.contentElement.querySelector(".lighthouse-start-button-container");
    if (startButtonContainer) {
      startButtonContainer.textContent = "";
      this.startButton = UI4.UIUtils.createTextButton(buttonLabel, callback, { variant: "primary", jslogContext: "lighthouse.start" });
      startButtonContainer.append(this.startButton);
    }
  }
  refresh() {
    const { mode } = this.controller.getFlags();
    this.populateStartButton(mode);
    for (const { checkbox, preset } of this.checkboxes) {
      if (preset.supportedModes.includes(mode)) {
        checkbox.setEnabled(true);
        checkbox.setIndeterminate(false);
      } else {
        checkbox.setEnabled(false);
        checkbox.setIndeterminate(true);
      }
    }
    this.onResize();
  }
  onResize() {
    const useNarrowLayout = this.contentElement.offsetWidth < 500;
    const useWideLayout = this.contentElement.offsetWidth > 800;
    const headerEl = this.contentElement.querySelector(".lighthouse-start-view header");
    const optionsEl = this.contentElement.querySelector(".lighthouse-options");
    if (headerEl) {
      headerEl.classList.toggle("hbox", !useNarrowLayout);
      headerEl.classList.toggle("vbox", useNarrowLayout);
    }
    if (optionsEl) {
      optionsEl.classList.toggle("wide", useWideLayout);
      optionsEl.classList.toggle("narrow", useNarrowLayout);
    }
  }
  focusStartButton() {
    this.startButton.focus();
  }
  setStartButtonEnabled(isEnabled) {
    if (this.helpText) {
      this.helpText.classList.toggle("hidden", isEnabled);
    }
    if (this.startButton) {
      this.startButton.disabled = !isEnabled;
    }
  }
  setUnauditableExplanation(text) {
    if (this.helpText) {
      this.helpText.textContent = text;
    }
  }
  setWarningText(text) {
    if (this.warningText) {
      this.warningText.textContent = text;
      this.warningText.classList.toggle("hidden", !text);
    }
  }
  wasShown() {
    super.wasShown();
    this.controller.recomputePageAuditability();
  }
  settingsToolbar() {
    return this.settingsToolbarInternal;
  }
};

// gen/front_end/panels/lighthouse/LighthouseStatusView.js
var LighthouseStatusView_exports = {};
__export(LighthouseStatusView_exports, {
  StatusPhases: () => StatusPhases,
  StatusView: () => StatusView,
  fastFactRotationInterval: () => fastFactRotationInterval,
  minimumTextVisibilityDuration: () => minimumTextVisibilityDuration
});
import * as Common4 from "./../../core/common/common.js";
import * as i18n8 from "./../../core/i18n/i18n.js";
import * as UI5 from "./../../ui/legacy/legacy.js";

// gen/front_end/panels/lighthouse/lighthouseDialog.css.js
var lighthouseDialog_css_default = `/*
 * Copyright 2017 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.lighthouse-view {
  flex: auto;
  align-items: start;
  width: 100%;
  max-width: var(--sys-size-34);

  .header {
    font: var(--sys-typescale-body2-medium);
    padding-top: var(--sys-size-3);
    margin: var(--sys-size-5) var(--sys-size-5) var(--sys-size-5) var(--sys-size-8);
    flex: none;
  }

  .lighthouse-dialog-text {
    margin: 0 var(--sys-size-8);
  }
}

.lighthouse-view button {
  z-index: 10;
  margin-left: auto;
  margin-right: 0;
}

.lighthouse-status {
  width: calc(100% - 2*var(--sys-size-8));
  flex: auto;
  color: var(
  --sys-color-on-surface);
  margin: 0 var(
  --sys-size-8);
}

.lighthouse-status-text {
  text-align: center;
  min-height: var(--sys-size-16);
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.lighthouse-status-text code {
  user-select: text;
  text-align: left;
  white-space: pre-wrap;
  overflow: auto;
}

.lighthouse-progress-wrapper {
  height: var(--sys-size-2);
  background-color: var(--sys-color-neutral-outline);
  position: relative;
  margin: var(--sys-size-5) 0;
}

.lighthouse-progress-bar {
  width: 0%;
  height: 100%;
  background: var(--sys-color-primary-bright);
  position: absolute;
  transform-origin: left;
  animation-fill-mode: forwards;
  animation-timing-function: ease-out;

  --progress-bar-loading-duration: 45s;
  --progress-bar-gathering-duration: 12s;
  --progress-bar-gathering-percent: 70%;
  --progress-bar-auditing-duration: 5s;
  --progress-bar-auditing-percent: 95%;
}

.lighthouse-progress-bar.errored {
  width: 100%;
  background: var(--sys-color-error);
}

.lighthouse-progress-bar.loading {
  animation-duration: var(--progress-bar-loading-duration);
  animation-name: progressBarLoading;
}

@keyframes progressBarLoading {
  0% { width: 0%; }
  100% { width: var(--progress-bar-gathering-percent); }
}

.lighthouse-progress-bar.gathering {
  animation-duration: var(--progress-bar-gathering-duration);
  animation-name: progressBarGathering;
}

@keyframes progressBarGathering {
  0% { width: var(--progress-bar-gathering-percent); }
  100% { width: var(--progress-bar-auditing-percent); }
}

.lighthouse-progress-bar.auditing {
  animation-duration: var(--progress-bar-auditing-duration);
  animation-name: progressBarAuditing;
}

@keyframes progressBarAuditing {
  0% { width: var(--progress-bar-auditing-percent); }
  100% { width: 99%; }
}

.lighthouse-report-error {
  display: block;
  margin-top: 5px;
}

.lighthouse-action-buttons {
  justify-content: space-between;
  align-self: end;
  width: calc(100% - 2*var(--sys-size-8));
  margin: var(--sys-size-6) var(--sys-size-8) var(--sys-size-8) var(--sys-size-8);
}

/*# sourceURL=${import.meta.resolve("./lighthouseDialog.css")} */`;

// gen/front_end/panels/lighthouse/LighthouseStatusView.js
var UIStrings4 = {
  /**
   *@description Text to cancel something
   */
  cancel: "Cancel",
  /**
   *@description Text when something is loading
   */
  loading: "Loading\u2026",
  /**
   *@description Status text in Lighthouse splash screen while an audit is being performed
   *@example {github.com} PH1
   */
  auditingS: "Auditing {PH1}",
  /**
   *@description Status text in Lighthouse splash screen while an audit is being performed
   */
  auditingYourWebPage: "Auditing your web page",
  /**
   *@description Status text in Lighthouse splash screen while an audit is being performed, and cancellation to take effect
   */
  cancelling: "Cancelling\u2026",
  /**
   *@description Status text in Lighthouse splash screen while preparing for an audit
   */
  lighthouseIsWarmingUp: "`Lighthouse` is warming up\u2026",
  /**
   *@description Status text in Lighthouse splash screen while an audit is being performed
   */
  lighthouseIsLoadingYourPage: "`Lighthouse` is loading your page",
  /**
   *@description Text in Lighthouse Status View
   *@example {75% of global mobile users in 2016 were on 2G or 3G [Source: GSMA Mobile]} PH1
   */
  fastFactMessageWithPlaceholder: "\u{1F4A1} {PH1}",
  /**
   *@description Text of a DOM element in Lighthouse Status View
   */
  ahSorryWeRanIntoAnError: "Ah, sorry! We ran into an error.",
  /**
   *@description Text in Lighthouse Status View
   */
  tryToNavigateToTheUrlInAFresh: "Try to navigate to the URL in a fresh `Chrome` profile without any other tabs or extensions open and try again.",
  /**
   *@description Text of a DOM element in Lighthouse Status View
   */
  ifThisIssueIsReproduciblePlease: "If this issue is reproducible, please report it at the `Lighthouse` `GitHub` repo.",
  /**
   *@description Text in Lighthouse splash screen when loading the page for auditing
   */
  lighthouseIsLoadingThePage: "Lighthouse is loading the page.",
  /**
   *@description Text in Lighthouse splash screen when Lighthouse is gathering information for display
   */
  lighthouseIsGatheringInformation: "`Lighthouse` is gathering information about the page to compute your score.",
  /**
   *@description Text in Lighthouse splash screen when Lighthouse is generating a report.
   */
  almostThereLighthouseIsNow: "Almost there! `Lighthouse` is now generating your report.",
  /**
   *@description Text in Lighthouse splash screen when loading the page for auditing
   */
  lighthouseIsLoadingYourPageWith: "`Lighthouse` is loading your page with throttling to measure performance on a mobile device on 3G.",
  /**
   *@description Text in Lighthouse splash screen when loading the page for auditing
   */
  lighthouseIsLoadingYourPageWithThrottling: "`Lighthouse` is loading your page with throttling to measure performance on a slow desktop on 3G.",
  /**
   *@description Text in Lighthouse splash screen when loading the page for auditing
   */
  lighthouseIsLoadingYourPageWithMobile: "`Lighthouse` is loading your page with mobile emulation.",
  /**
   *@description Fast fact in the splash screen while Lighthouse is performing an audit
   */
  mbTakesAMinimumOfSecondsTo: "1MB takes a minimum of 5 seconds to download on a typical 3G connection [Source: `WebPageTest` and `DevTools` 3G definition].",
  /**
   *@description Fast fact in the splash screen while Lighthouse is performing an audit
   */
  rebuildingPinterestPagesFor: "Rebuilding Pinterest pages for performance increased conversion rates by 15% [Source: `WPO Stats`]",
  /**
   *@description Fast fact in the splash screen while Lighthouse is performing an audit
   */
  byReducingTheResponseSizeOfJson: "By reducing the response size of JSON needed for displaying comments, Instagram saw increased impressions [Source: `WPO Stats`]",
  /**
   *@description Fast fact in the splash screen while Lighthouse is performing an audit
   */
  walmartSawAIncreaseInRevenueFor: "Walmart saw a 1% increase in revenue for every 100ms improvement in page load [Source: `WPO Stats`]",
  /**
   *@description Fast fact in the splash screen while Lighthouse is performing an audit
   */
  ifASiteTakesSecondToBecome: "If a site takes >1 second to become interactive, users lose attention, and their perception of completing the page task is broken [Source: `Google Developers Blog`]",
  /**
   *@description Fast fact in the splash screen while Lighthouse is performing an audit
   */
  OfGlobalMobileUsersInWereOnGOrG: "75% of global mobile users in 2016 were on 2G or 3G [Source: `GSMA Mobile`]",
  /**
   *@description Fast fact in the splash screen while Lighthouse is performing an audit
   */
  theAverageUserDeviceCostsLess: "The average user device costs less than 200 USD. [Source: `International Data Corporation`]",
  /**
   *@description Fast fact in the splash screen while Lighthouse is performing an audit
   */
  SecondsIsTheAverageTimeAMobile: "19 seconds is the average time a mobile web page takes to load on a 3G connection [Source: `Google DoubleClick blog`]",
  /**
   *@description Fast fact in the splash screen while Lighthouse is performing an audit
   */
  OfMobilePagesTakeNearlySeconds: "70% of mobile pages take nearly 7 seconds for the visual content above the fold to display on the screen. [Source: `Think with Google`]",
  /**
   *@description Fast fact in the splash screen while Lighthouse is performing an audit
   */
  asPageLoadTimeIncreasesFromOne: "As page load time increases from one second to seven seconds, the probability of a mobile site visitor bouncing increases 113%. [Source: `Think with Google`]",
  /**
   *@description Fast fact in the splash screen while Lighthouse is performing an audit
   */
  asTheNumberOfElementsOnAPage: "As the number of elements on a page increases from 400 to 6,000, the probability of conversion drops 95%. [Source: `Think with Google`]",
  /**
   *@description Fast fact in the splash screen while Lighthouse is performing an audit
   */
  lighthouseOnlySimulatesMobile: "`Lighthouse` only simulates mobile performance; to measure performance on a real device, try WebPageTest.org [Source: `Lighthouse` team]"
};
var str_4 = i18n8.i18n.registerUIStrings("panels/lighthouse/LighthouseStatusView.ts", UIStrings4);
var i18nString4 = i18n8.i18n.getLocalizedString.bind(void 0, str_4);
var i18nLazyString2 = i18n8.i18n.getLazilyComputedLocalizedString.bind(void 0, str_4);
var StatusView = class {
  panel;
  statusHeader;
  progressBar;
  statusText;
  cancelButton;
  inspectedURL;
  textChangedAt;
  fastFactsQueued;
  currentPhase;
  scheduledFastFactTimeout;
  dialog;
  constructor(panel) {
    this.panel = panel;
    this.statusHeader = null;
    this.progressBar = null;
    this.statusText = null;
    this.cancelButton = null;
    this.inspectedURL = "";
    this.textChangedAt = 0;
    this.fastFactsQueued = FastFacts.map((lazyString) => lazyString());
    this.currentPhase = null;
    this.scheduledFastFactTimeout = null;
    this.dialog = new UI5.Dialog.Dialog();
    this.dialog.setDimmed(true);
    this.dialog.setCloseOnEscape(false);
    this.dialog.setOutsideClickCallback((event) => event.consume(true));
    this.render();
  }
  render() {
    const dialogRoot = UI5.UIUtils.createShadowRootWithCoreStyles(this.dialog.contentElement, { cssFile: lighthouseDialog_css_default });
    const lighthouseViewElement = dialogRoot.createChild("div", "lighthouse-view vbox");
    const cancelButton = UI5.UIUtils.createTextButton(i18nString4(UIStrings4.cancel), this.cancel.bind(this), {
      jslogContext: "lighthouse.cancel"
    });
    const fragment = UI5.Fragment.Fragment.build`
  <span $="status-header" class="header">Auditing your web page…</span>
  <div class="lighthouse-status vbox" $="status-view">
  <div class="lighthouse-progress-wrapper" $="progress-wrapper">
  <div class="lighthouse-progress-bar" $="progress-bar"></div>
  </div>
  <div class="lighthouse-status-text" $="status-text"></div>
  </div>
  <div class="lighthouse-action-buttons">
  ${cancelButton}
  </div>
  `;
    lighthouseViewElement.appendChild(fragment.element());
    this.statusHeader = fragment.$("status-header");
    this.progressBar = fragment.$("progress-bar");
    this.statusText = fragment.$("status-text");
    UI5.ARIAUtils.markAsProgressBar(this.progressBar, 0, StatusPhases.length - 1);
    this.cancelButton = cancelButton;
    UI5.ARIAUtils.markAsStatus(this.statusText);
    this.dialog.setDefaultFocusedElement(cancelButton);
    this.dialog.setSizeBehavior(
      "SetExactWidthMaxHeight"
      /* UI.GlassPane.SizeBehavior.SET_EXACT_WIDTH_MAX_HEIGHT */
    );
    this.dialog.setMaxContentSize(new UI5.Geometry.Size(500, 400));
  }
  reset() {
    this.resetProgressBarClasses();
    clearTimeout(this.scheduledFastFactTimeout);
    this.textChangedAt = 0;
    this.fastFactsQueued = FastFacts.map((lazyString) => lazyString());
    this.currentPhase = null;
    this.scheduledFastFactTimeout = null;
  }
  show(dialogRenderElement) {
    this.reset();
    this.updateStatus(i18nString4(UIStrings4.loading));
    const parsedURL = Common4.ParsedURL.ParsedURL.fromString(this.inspectedURL);
    const pageHost = parsedURL?.host;
    const statusHeader = pageHost ? i18nString4(UIStrings4.auditingS, { PH1: pageHost }) : i18nString4(UIStrings4.auditingYourWebPage);
    this.renderStatusHeader(statusHeader);
    this.dialog.show(dialogRenderElement);
  }
  renderStatusHeader(statusHeader) {
    if (this.statusHeader) {
      this.statusHeader.textContent = `${statusHeader}\u2026`;
    }
  }
  hide() {
    if (this.dialog.isShowing()) {
      this.dialog.hide();
    }
  }
  setInspectedURL(url = "") {
    this.inspectedURL = url;
  }
  updateStatus(message) {
    if (!message || !this.statusText) {
      return;
    }
    if (message.startsWith("Cancel")) {
      this.commitTextChange(i18nString4(UIStrings4.cancelling));
      clearTimeout(this.scheduledFastFactTimeout);
      return;
    }
    const nextPhase = this.getPhaseForMessage(message);
    if (!nextPhase && !this.currentPhase) {
      this.commitTextChange(i18nString4(UIStrings4.lighthouseIsWarmingUp));
      clearTimeout(this.scheduledFastFactTimeout);
    } else if (nextPhase) {
      this.currentPhase = nextPhase;
      const text = this.getMessageForPhase(nextPhase);
      this.commitTextChange(text);
      this.scheduleFastFactCheck();
      this.resetProgressBarClasses();
      if (this.progressBar) {
        this.progressBar.classList.add(nextPhase.progressBarClass);
        const nextPhaseIndex = StatusPhases.indexOf(nextPhase);
        UI5.ARIAUtils.setProgressBarValue(this.progressBar, nextPhaseIndex, text);
      }
    }
  }
  cancel() {
    void this.panel.handleRunCancel();
  }
  getMessageForPhase(phase) {
    if (phase.message()) {
      return phase.message();
    }
    const deviceTypeSetting = RuntimeSettings.find((item2) => item2.setting.name === "lighthouse.device-type");
    const throttleSetting = RuntimeSettings.find((item2) => item2.setting.name === "lighthouse.throttling");
    const deviceType = deviceTypeSetting ? deviceTypeSetting.setting.get() : "";
    const throttling = throttleSetting ? throttleSetting.setting.get() : "";
    const match = LoadingMessages.find((item2) => {
      return item2.deviceType === deviceType && item2.throttling === throttling;
    });
    return match ? match.message() : i18nString4(UIStrings4.lighthouseIsLoadingYourPage);
  }
  getPhaseForMessage(message) {
    return StatusPhases.find((phase) => phase.statusMessageRegex.test(message)) || null;
  }
  resetProgressBarClasses() {
    if (this.progressBar) {
      this.progressBar.className = "lighthouse-progress-bar";
    }
  }
  scheduleFastFactCheck() {
    if (!this.currentPhase || this.scheduledFastFactTimeout) {
      return;
    }
    this.scheduledFastFactTimeout = window.setTimeout(() => {
      this.updateFastFactIfNecessary();
      this.scheduledFastFactTimeout = null;
      this.scheduleFastFactCheck();
    }, 100);
  }
  updateFastFactIfNecessary() {
    const now = performance.now();
    if (now - this.textChangedAt < fastFactRotationInterval) {
      return;
    }
    if (!this.fastFactsQueued.length) {
      return;
    }
    const fastFactIndex = Math.floor(Math.random() * this.fastFactsQueued.length);
    this.commitTextChange(i18nString4(UIStrings4.fastFactMessageWithPlaceholder, { PH1: this.fastFactsQueued[fastFactIndex] }));
    this.fastFactsQueued.splice(fastFactIndex, 1);
  }
  commitTextChange(text) {
    if (!this.statusText) {
      return;
    }
    this.textChangedAt = performance.now();
    this.statusText.textContent = text;
  }
  renderBugReport(err) {
    console.error(err);
    if (this.scheduledFastFactTimeout) {
      window.clearTimeout(this.scheduledFastFactTimeout);
    }
    this.resetProgressBarClasses();
    if (this.progressBar) {
      this.progressBar.classList.add("errored");
    }
    if (this.statusText) {
      this.commitTextChange("");
      UI5.UIUtils.createTextChild(this.statusText.createChild("p"), i18nString4(UIStrings4.ahSorryWeRanIntoAnError));
      if (KnownBugPatterns.some((pattern) => pattern.test(err.message))) {
        const message = i18nString4(UIStrings4.tryToNavigateToTheUrlInAFresh);
        UI5.UIUtils.createTextChild(this.statusText.createChild("p"), message);
      } else {
        this.renderBugReportBody(err, this.inspectedURL);
      }
    }
  }
  renderText(statusHeader, text) {
    this.renderStatusHeader(statusHeader);
    this.commitTextChange(text);
  }
  toggleCancelButton(show) {
    if (this.cancelButton) {
      this.cancelButton.style.visibility = show ? "visible" : "hidden";
    }
  }
  renderBugReportBody(err, auditURL) {
    const chromeVersion = navigator.userAgent.match(/Chrome\/(\S+)/) || ["", "Unknown"];
    const errorMessage = err.friendlyMessage || err.message;
    const issueBody = `
${errorMessage}
\`\`\`
Channel: DevTools
Initial URL: ${auditURL}
Chrome Version: ${chromeVersion[1]}
Stack Trace: ${err.stack}
\`\`\`
`;
    if (this.statusText) {
      UI5.UIUtils.createTextChild(this.statusText.createChild("p"), i18nString4(UIStrings4.ifThisIssueIsReproduciblePlease));
      UI5.UIUtils.createTextChild(this.statusText.createChild("code", "monospace"), issueBody.trim());
    }
  }
};
var fastFactRotationInterval = 6e3;
var minimumTextVisibilityDuration = 3e3;
var KnownBugPatterns = [
  /PARSING_PROBLEM/,
  /DOCUMENT_REQUEST/,
  /READ_FAILED/,
  /TRACING_ALREADY_STARTED/,
  /^You must provide a url to the runner/,
  /^You probably have multiple tabs open/
];
var StatusPhases = [
  {
    id: "loading",
    progressBarClass: "loading",
    message: i18nLazyString2(UIStrings4.lighthouseIsLoadingThePage),
    statusMessageRegex: /^(Navigating to)/
  },
  {
    id: "gathering",
    progressBarClass: "gathering",
    message: i18nLazyString2(UIStrings4.lighthouseIsGatheringInformation),
    statusMessageRegex: /(Gather|artifact)/i
  },
  {
    id: "auditing",
    progressBarClass: "auditing",
    message: i18nLazyString2(UIStrings4.almostThereLighthouseIsNow),
    statusMessageRegex: /^Audit/
  }
];
var LoadingMessages = [
  {
    deviceType: "mobile",
    throttling: "on",
    message: i18nLazyString2(UIStrings4.lighthouseIsLoadingYourPageWith)
  },
  {
    deviceType: "desktop",
    throttling: "on",
    message: i18nLazyString2(UIStrings4.lighthouseIsLoadingYourPageWithThrottling)
  },
  {
    deviceType: "mobile",
    throttling: "off",
    message: i18nLazyString2(UIStrings4.lighthouseIsLoadingYourPageWithMobile)
  },
  {
    deviceType: "desktop",
    throttling: "off",
    message: i18nLazyString2(UIStrings4.lighthouseIsLoadingThePage)
  }
];
var FastFacts = [
  i18nLazyString2(UIStrings4.mbTakesAMinimumOfSecondsTo),
  i18nLazyString2(UIStrings4.rebuildingPinterestPagesFor),
  i18nLazyString2(UIStrings4.byReducingTheResponseSizeOfJson),
  i18nLazyString2(UIStrings4.walmartSawAIncreaseInRevenueFor),
  i18nLazyString2(UIStrings4.ifASiteTakesSecondToBecome),
  i18nLazyString2(UIStrings4.OfGlobalMobileUsersInWereOnGOrG),
  i18nLazyString2(UIStrings4.theAverageUserDeviceCostsLess),
  i18nLazyString2(UIStrings4.SecondsIsTheAverageTimeAMobile),
  i18nLazyString2(UIStrings4.OfMobilePagesTakeNearlySeconds),
  i18nLazyString2(UIStrings4.asPageLoadTimeIncreasesFromOne),
  i18nLazyString2(UIStrings4.asTheNumberOfElementsOnAPage),
  i18nLazyString2(UIStrings4.OfMobilePagesTakeNearlySeconds),
  i18nLazyString2(UIStrings4.lighthouseOnlySimulatesMobile)
];

// gen/front_end/panels/lighthouse/LighthouseTimespanView.js
import * as i18n10 from "./../../core/i18n/i18n.js";
import * as Buttons2 from "./../../ui/components/buttons/buttons.js";
import * as UI6 from "./../../ui/legacy/legacy.js";
var UIStrings5 = {
  /**
   * @description Header indicating that a Lighthouse timespan is starting. "Timespan" is a Lighthouse mode that analyzes user interactions over a period of time.
   */
  timespanStarting: "Timespan starting\u2026",
  /**
   * @description Header indicating that a Lighthouse timespan has started. "Timespan" is a Lighthouse mode that analyzes user interactions over a period of time. "interact with the page" is a call to action for the user to interact with the web page.
   */
  timespanStarted: "Timespan started",
  /**
   * @description Call to action for the user to interact with the web page.
   */
  interactWithPage: "Interact with the page.",
  /**
   * @description Label for a button that ends a Lighthouse timespan. "timespan" is a Lighthouse mode that analyzes user interactions over a period of time.
   */
  endTimespan: "End timespan",
  /**
   * @description Label for a button that cancels a Lighthouse timespan.
   */
  cancel: "Cancel"
};
var str_5 = i18n10.i18n.registerUIStrings("panels/lighthouse/LighthouseTimespanView.ts", UIStrings5);
var i18nString5 = i18n10.i18n.getLocalizedString.bind(void 0, str_5);
var TimespanView = class extends UI6.Dialog.Dialog {
  panel;
  statusHeader;
  contentContainer;
  endButton;
  constructor(panel) {
    super();
    this.panel = panel;
    this.statusHeader = null;
    this.contentContainer = null;
    this.endButton = null;
    this.setDimmed(true);
    this.setCloseOnEscape(false);
    this.setOutsideClickCallback((event) => event.consume(true));
    this.render();
  }
  show(dialogRenderElement) {
    this.reset();
    super.show(dialogRenderElement);
  }
  reset() {
    if (this.statusHeader && this.contentContainer && this.endButton) {
      this.statusHeader.textContent = i18nString5(UIStrings5.timespanStarting);
      this.contentContainer.textContent = "";
      this.endButton.disabled = true;
    }
  }
  ready() {
    if (this.statusHeader && this.contentContainer && this.endButton) {
      this.statusHeader.textContent = i18nString5(UIStrings5.timespanStarted);
      this.contentContainer.textContent = i18nString5(UIStrings5.interactWithPage);
      this.endButton.disabled = false;
      this.endButton.focus();
    }
  }
  render() {
    const dialogRoot = UI6.UIUtils.createShadowRootWithCoreStyles(this.contentElement, { cssFile: lighthouseDialog_css_default });
    this.endButton = UI6.UIUtils.createTextButton(i18nString5(UIStrings5.endTimespan), this.endTimespan.bind(this), { variant: "primary", jslogContext: "lighthouse.end-time-span", className: "end-timespan" });
    const cancelButton = UI6.UIUtils.createTextButton(i18nString5(UIStrings5.cancel), this.cancel.bind(this), {
      className: "cancel",
      jslogContext: "lighthouse.cancel"
    });
    const fragment = UI6.Fragment.Fragment.build`
  <div class="lighthouse-view vbox">
  <span $="status-header" class="header"></span>
  <span $="call-to-action" class="lighthouse-dialog-text"></span>
  <div class="lighthouse-action-buttons hbox">
  ${cancelButton}
  ${this.endButton}
  </div>
  </div>
  `;
    this.statusHeader = fragment.$("status-header");
    this.contentContainer = fragment.$("call-to-action");
    dialogRoot.appendChild(fragment.element());
    this.setSizeBehavior(
      "SetExactWidthMaxHeight"
      /* UI.GlassPane.SizeBehavior.SET_EXACT_WIDTH_MAX_HEIGHT */
    );
    this.setMaxContentSize(new UI6.Geometry.Size(500, 400));
    this.reset();
  }
  async endTimespan() {
    await this.panel.handleTimespanEnd();
  }
  async cancel() {
    await this.panel.handleRunCancel();
  }
};

// gen/front_end/panels/lighthouse/LighthousePanel.js
var UIStrings6 = {
  /**
   *@description Text that appears when user drag and drop something (for example, a file) in Lighthouse Panel
   */
  dropLighthouseJsonHere: "Drop `Lighthouse` JSON here",
  /**
   *@description Tooltip text that appears when hovering over the largeicon add button in the Lighthouse Panel
   */
  performAnAudit: "Perform an audit\u2026",
  /**
   *@description Text to clear everything
   */
  clearAll: "Clear all",
  /**
   *@description Tooltip text that appears when hovering over the largeicon settings gear in show settings pane setting in start view of the audits panel
   */
  lighthouseSettings: "`Lighthouse` settings",
  /**
   *@description Status header in the Lighthouse panel
   */
  printing: "Printing",
  /**
   *@description Status text in the Lighthouse panel
   */
  thePrintPopupWindowIsOpenPlease: "The print popup window is open. Please close it to continue.",
  /**
   *@description Text in Lighthouse Panel
   */
  cancelling: "Cancelling"
};
var str_6 = i18n12.i18n.registerUIStrings("panels/lighthouse/LighthousePanel.ts", UIStrings6);
var i18nString6 = i18n12.i18n.getLocalizedString.bind(void 0, str_6);
var lighthousePanelInstace;
var LighthousePanel = class _LighthousePanel extends UI7.Panel.Panel {
  controller;
  startView;
  statusView;
  timespanView;
  warningText;
  unauditableExplanation;
  cachedRenderedReports;
  dropTarget;
  auditResultsElement;
  clearButton;
  newButton;
  reportSelector;
  settingsPane;
  rightToolbar;
  showSettingsPaneSetting;
  constructor(controller) {
    super("lighthouse");
    this.registerRequiredCSS(lighthousePanel_css_default);
    this.controller = controller;
    this.startView = new StartView(this.controller, this);
    this.timespanView = new TimespanView(this);
    this.statusView = new StatusView(this);
    this.warningText = null;
    this.unauditableExplanation = null;
    this.cachedRenderedReports = /* @__PURE__ */ new Map();
    this.dropTarget = new UI7.DropTarget.DropTarget(this.contentElement, [UI7.DropTarget.Type.File], i18nString6(UIStrings6.dropLighthouseJsonHere), this.handleDrop.bind(this));
    this.controller.addEventListener(Events.PageAuditabilityChanged, this.refreshStartAuditUI.bind(this));
    this.controller.addEventListener(Events.PageWarningsChanged, this.refreshWarningsUI.bind(this));
    this.controller.addEventListener(Events.AuditProgressChanged, this.refreshStatusUI.bind(this));
    this.renderToolbar();
    this.auditResultsElement = this.contentElement.createChild("div", "lighthouse-results-container");
    this.renderStartView();
    this.controller.recomputePageAuditability();
  }
  static instance(opts) {
    if (!lighthousePanelInstace || opts?.forceNew) {
      const protocolService = opts?.protocolService ?? new ProtocolService();
      const controller = opts?.controller ?? new LighthouseController(protocolService);
      lighthousePanelInstace = new _LighthousePanel(controller);
    }
    return lighthousePanelInstace;
  }
  static getEvents() {
    return Events;
  }
  async handleTimespanStart() {
    try {
      this.timespanView.show(this.contentElement);
      await this.controller.startLighthouse();
      this.timespanView.ready();
    } catch (err) {
      this.handleError(err);
    }
  }
  async handleTimespanEnd() {
    try {
      this.timespanView.hide();
      this.renderStatusView();
      const { lhr, artifacts } = await this.controller.collectLighthouseResults();
      this.buildReportUI(lhr, artifacts);
    } catch (err) {
      this.handleError(err);
    }
  }
  async handleCompleteRun() {
    try {
      await this.controller.startLighthouse();
      this.renderStatusView();
      const { lhr, artifacts } = await this.controller.collectLighthouseResults();
      this.buildReportUI(lhr, artifacts);
    } catch (err) {
      this.handleError(err);
    }
  }
  async handleRunCancel() {
    this.statusView.updateStatus(i18nString6(UIStrings6.cancelling));
    this.timespanView.hide();
    await this.controller.cancelLighthouse();
    this.renderStartView();
  }
  handleError(err) {
    if (err instanceof Error) {
      this.statusView.renderBugReport(err);
    }
  }
  refreshWarningsUI(evt) {
    if (this.controller.getCurrentRun()) {
      return;
    }
    this.warningText = evt.data.warning;
    this.startView.setWarningText(evt.data.warning);
  }
  refreshStartAuditUI(evt) {
    if (this.controller.getCurrentRun()) {
      return;
    }
    this.startView.refresh();
    this.unauditableExplanation = evt.data.helpText;
    this.startView.setUnauditableExplanation(evt.data.helpText);
    this.startView.setStartButtonEnabled(!evt.data.helpText);
  }
  refreshStatusUI(evt) {
    this.statusView.updateStatus(evt.data.message);
  }
  refreshToolbarUI() {
    this.clearButton.setEnabled(this.reportSelector.hasItems());
  }
  clearAll() {
    this.reportSelector.clearAll();
    this.renderStartView();
    this.refreshToolbarUI();
  }
  renderToolbar() {
    const lighthouseToolbarContainer = this.element.createChild("div", "lighthouse-toolbar-container");
    lighthouseToolbarContainer.setAttribute("jslog", `${VisualLogging2.toolbar()}`);
    lighthouseToolbarContainer.role = "toolbar";
    const toolbar2 = lighthouseToolbarContainer.createChild("devtools-toolbar");
    toolbar2.role = "presentation";
    this.newButton = new UI7.Toolbar.ToolbarButton(i18nString6(UIStrings6.performAnAudit), "plus");
    toolbar2.appendToolbarItem(this.newButton);
    this.newButton.addEventListener("Click", this.renderStartView.bind(this));
    toolbar2.appendSeparator();
    this.reportSelector = new ReportSelector(() => this.renderStartView());
    toolbar2.appendToolbarItem(this.reportSelector.comboBox());
    this.clearButton = new UI7.Toolbar.ToolbarButton(i18nString6(UIStrings6.clearAll), "clear");
    toolbar2.appendToolbarItem(this.clearButton);
    this.clearButton.addEventListener("Click", this.clearAll.bind(this));
    this.settingsPane = new UI7.Widget.HBox();
    this.settingsPane.show(this.contentElement);
    this.settingsPane.element.classList.add("lighthouse-settings-pane");
    this.settingsPane.element.appendChild(this.startView.settingsToolbar());
    this.showSettingsPaneSetting = Common5.Settings.Settings.instance().createSetting(
      "lighthouse-show-settings-toolbar",
      false,
      "Synced"
      /* Common.Settings.SettingStorageType.SYNCED */
    );
    this.rightToolbar = lighthouseToolbarContainer.createChild("devtools-toolbar");
    this.rightToolbar.role = "presentation";
    this.rightToolbar.appendSeparator();
    this.rightToolbar.appendToolbarItem(new UI7.Toolbar.ToolbarSettingToggle(this.showSettingsPaneSetting, "gear", i18nString6(UIStrings6.lighthouseSettings), "gear-filled"));
    this.showSettingsPaneSetting.addChangeListener(this.updateSettingsPaneVisibility.bind(this));
    this.updateSettingsPaneVisibility();
    this.refreshToolbarUI();
  }
  updateSettingsPaneVisibility() {
    this.settingsPane.element.classList.toggle("hidden", !this.showSettingsPaneSetting.get());
  }
  toggleSettingsDisplay(show) {
    this.rightToolbar.classList.toggle("hidden", !show);
    this.settingsPane.element.classList.toggle("hidden", !show);
    this.updateSettingsPaneVisibility();
  }
  renderStartView() {
    this.auditResultsElement.removeChildren();
    this.statusView.hide();
    this.reportSelector.selectNewReport();
    this.contentElement.classList.toggle("in-progress", false);
    this.startView.show(this.contentElement);
    this.toggleSettingsDisplay(true);
    this.startView.setUnauditableExplanation(this.unauditableExplanation);
    this.startView.setStartButtonEnabled(!this.unauditableExplanation);
    if (!this.unauditableExplanation) {
      this.startView.focusStartButton();
    }
    this.startView.setWarningText(this.warningText);
    this.newButton.setEnabled(false);
    this.refreshToolbarUI();
    this.setDefaultFocusedChild(this.startView);
  }
  renderStatusView() {
    const inspectedURL = this.controller.getCurrentRun()?.inspectedURL;
    this.contentElement.classList.toggle("in-progress", true);
    this.statusView.setInspectedURL(inspectedURL);
    this.statusView.show(this.contentElement);
  }
  beforePrint() {
    this.statusView.show(this.contentElement);
    this.statusView.toggleCancelButton(false);
    this.statusView.renderText(i18nString6(UIStrings6.printing), i18nString6(UIStrings6.thePrintPopupWindowIsOpenPlease));
  }
  afterPrint() {
    this.statusView.hide();
    this.statusView.toggleCancelButton(true);
  }
  renderReport(lighthouseResult, artifacts) {
    this.toggleSettingsDisplay(false);
    this.contentElement.classList.toggle("in-progress", false);
    this.startView.hideWidget();
    this.statusView.hide();
    this.auditResultsElement.removeChildren();
    this.newButton.setEnabled(true);
    this.refreshToolbarUI();
    const cachedRenderedReport = this.cachedRenderedReports.get(lighthouseResult);
    if (cachedRenderedReport) {
      this.auditResultsElement.appendChild(cachedRenderedReport);
      return;
    }
    const reportContainer = LighthouseReportRenderer.renderLighthouseReport(lighthouseResult, artifacts, {
      beforePrint: this.beforePrint.bind(this),
      afterPrint: this.afterPrint.bind(this)
    });
    this.cachedRenderedReports.set(lighthouseResult, reportContainer);
  }
  buildReportUI(lighthouseResult, artifacts) {
    if (lighthouseResult === null) {
      return;
    }
    const optionElement = new Item(lighthouseResult, () => this.renderReport(lighthouseResult, artifacts), this.renderStartView.bind(this));
    this.reportSelector.prepend(optionElement);
    this.refreshToolbarUI();
    this.renderReport(lighthouseResult);
    this.newButton.element.focus();
  }
  handleDrop(dataTransfer) {
    const items = dataTransfer.items;
    if (!items.length) {
      return;
    }
    const item2 = items[0];
    if (item2.kind === "file") {
      const file = items[0].getAsFile();
      if (!file) {
        return;
      }
      const reader = new FileReader();
      reader.onload = () => this.loadedFromFile(reader.result);
      reader.readAsText(file);
    }
  }
  loadedFromFile(report) {
    const data = JSON.parse(report);
    if (!data["lighthouseVersion"]) {
      return;
    }
    this.buildReportUI(data);
  }
  elementsToRestoreScrollPositionsFor() {
    const els = super.elementsToRestoreScrollPositionsFor();
    const lhContainerEl = this.auditResultsElement.querySelector(".lh-container");
    if (lhContainerEl) {
      els.push(lhContainerEl);
    }
    return els;
  }
};

// gen/front_end/panels/lighthouse/LighthouseReporterTypes.js
var LighthouseReporterTypes_exports = {};
__export(LighthouseReporterTypes_exports, {
  LighthouseReportGenerator: () => LighthouseReportGenerator
});
var LighthouseReportGenerator = class {
  generateReportHtml(_lhr) {
    return "";
  }
};
export {
  LighthouseController_exports as LighthouseController,
  LighthousePanel_exports as LighthousePanel,
  LighthouseProtocolService_exports as LighthouseProtocolService,
  LighthouseReportRenderer_exports as LighthouseReportRenderer,
  LighthouseReportSelector_exports as LighthouseReportSelector,
  LighthouseReporterTypes_exports as LighthouseReporterTypes,
  LighthouseStartView_exports as LighthouseStartView,
  LighthouseStatusView_exports as LighthouseStatusView,
  RadioSetting_exports as RadioSetting
};
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
//# sourceMappingURL=lighthouse.js.map
