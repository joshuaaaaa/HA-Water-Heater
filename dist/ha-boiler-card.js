function t(t,e,i,o){var s,r=arguments.length,n=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(n=(r<3?s(n):r>3?s(e,i,n):s(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),s=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new r(i,t,o)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,o))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:g}=Object,u=globalThis,m=u.trustedTypes,f=m?m.emptyScript:"",_=u.reactiveElementPolyfillSupport,y=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!l(t,e),$={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:b};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(t,i,e);void 0!==o&&c(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){const{get:o,set:s}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:o,set(e){const r=o?.call(this);s?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=g(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,o)=>{if(i)t.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of o){const o=document.createElement("style"),s=e.litNonce;void 0!==s&&o.setAttribute("nonce",s),o.textContent=i.cssText,t.appendChild(o)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(void 0!==o&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(o):this.setAttribute(o,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,o=i._$Eh.get(t);if(void 0!==o&&this._$Em!==o){const t=i.getPropertyOptions(o),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=o;const r=s.fromAttribute(e,t.type);this[o]=r??this._$Ej?.get(o)??r,this._$Em=null}}requestUpdate(t,e,i,o=!1,s){if(void 0!==t){const r=this.constructor;if(!1===o&&(s=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??b)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:s},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==s||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===o&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,o=this[e];!0!==t||this._$AL.has(e)||void 0===o||this.C(e,void 0,i,o)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[y("elementProperties")]=new Map,x[y("finalized")]=new Map,_?.({ReactiveElement:x}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,k=t=>t,S=w.trustedTypes,A=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,T="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+E,z=`<${C}>`,F=document,H=()=>F.createComment(""),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,P=Array.isArray,N="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,j=/-->/g,D=/>/g,L=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),B=/'/g,R=/"/g,U=/^(?:script|style|textarea|title)$/i,W=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),V=W(1),I=W(2),G=Symbol.for("lit-noChange"),Y=Symbol.for("lit-nothing"),Z=new WeakMap,K=F.createTreeWalker(F,129);function q(t,e){if(!P(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,o=[];let s,r=2===e?"<svg>":3===e?"<math>":"",n=O;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,h=0;for(;h<i.length&&(n.lastIndex=h,l=n.exec(i),null!==l);)h=n.lastIndex,n===O?"!--"===l[1]?n=j:void 0!==l[1]?n=D:void 0!==l[2]?(U.test(l[2])&&(s=RegExp("</"+l[2],"g")),n=L):void 0!==l[3]&&(n=L):n===L?">"===l[0]?(n=s??O,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?L:'"'===l[3]?R:B):n===R||n===B?n=L:n===j||n===D?n=O:(n=L,s=void 0);const d=n===L&&t[e+1].startsWith("/>")?" ":"";r+=n===O?i+z:c>=0?(o.push(a),i.slice(0,c)+T+i.slice(c)+E+d):i+E+(-2===c?e:d)}return[q(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class X{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let s=0,r=0;const n=t.length-1,a=this.parts,[l,c]=J(t,e);if(this.el=X.createElement(l,i),K.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=K.nextNode())&&a.length<n;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(T)){const e=c[r++],i=o.getAttribute(t).split(E),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:s,name:n[2],strings:i,ctor:"."===n[1]?ot:"?"===n[1]?st:"@"===n[1]?rt:it}),o.removeAttribute(t)}else t.startsWith(E)&&(a.push({type:6,index:s}),o.removeAttribute(t));if(U.test(o.tagName)){const t=o.textContent.split(E),e=t.length-1;if(e>0){o.textContent=S?S.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],H()),K.nextNode(),a.push({type:2,index:++s});o.append(t[e],H())}}}else if(8===o.nodeType)if(o.data===C)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=o.data.indexOf(E,t+1));)a.push({type:7,index:s}),t+=E.length-1}s++}}static createElement(t,e){const i=F.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,o){if(e===G)return e;let s=void 0!==o?i._$Co?.[o]:i._$Cl;const r=M(e)?void 0:e._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),void 0===r?s=void 0:(s=new r(t),s._$AT(t,i,o)),void 0!==o?(i._$Co??=[])[o]=s:i._$Cl=s),void 0!==s&&(e=Q(t,s._$AS(t,e.values),s,o)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??F).importNode(e,!0);K.currentNode=o;let s=K.nextNode(),r=0,n=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new et(s,s.nextSibling,this,t):1===a.type?e=new a.ctor(s,a.name,a.strings,this,t):6===a.type&&(e=new nt(s,this,t)),this._$AV.push(e),a=i[++n]}r!==a?.index&&(s=K.nextNode(),r++)}return K.currentNode=F,o}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=Y,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),M(t)?t===Y||null==t||""===t?(this._$AH!==Y&&this._$AR(),this._$AH=Y):t!==this._$AH&&t!==G&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>P(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Y&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(F.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=X.createElement(q(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{const t=new tt(o,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Z.get(t.strings);return void 0===e&&Z.set(t.strings,e=new X(t)),e}k(t){P(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const s of t)o===e.length?e.push(i=new et(this.O(H()),this.O(H()),this,this.options)):i=e[o],i._$AI(s),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,s){this.type=1,this._$AH=Y,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Y}_$AI(t,e=this,i,o){const s=this.strings;let r=!1;if(void 0===s)t=Q(this,t,e,0),r=!M(t)||t!==this._$AH&&t!==G,r&&(this._$AH=t);else{const o=t;let n,a;for(t=s[0],n=0;n<s.length-1;n++)a=Q(this,o[i+n],e,n),a===G&&(a=this._$AH[n]),r||=!M(a)||a!==this._$AH[n],a===Y?t=Y:t!==Y&&(t+=(a??"")+s[n+1]),this._$AH[n]=a}r&&!o&&this.j(t)}j(t){t===Y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class ot extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Y?void 0:t}}class st extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Y)}}class rt extends it{constructor(t,e,i,o,s){super(t,e,i,o,s),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??Y)===G)return;const i=this._$AH,o=t===Y&&i!==Y||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==Y&&(i===Y||o);o&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const at=w.litHtmlPolyfillSupport;at?.(X,et),(w.litHtmlVersions??=[]).push("3.3.3");const lt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ct extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const o=i?.renderBefore??e;let s=o._$litPart$;if(void 0===s){const t=i?.renderBefore??null;o._$litPart$=s=new et(e.insertBefore(H(),t),t,void 0,i??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return G}}ct._$litElement$=!0,ct.finalized=!0,lt.litElementHydrateSupport?.({LitElement:ct});const ht=lt.litElementPolyfillSupport;ht?.({LitElement:ct}),(lt.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const dt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},pt={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:b},gt=(t=pt,e,i)=>{const{kind:o,metadata:s}=i;let r=globalThis.litPropertyMetadata.get(s);if(void 0===r&&globalThis.litPropertyMetadata.set(s,r=new Map),"setter"===o&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===o){const{name:o}=i;return{set(i){const s=e.get.call(this);e.set.call(this,i),this.requestUpdate(o,s,t,!0,i)},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===o){const{name:o}=i;return function(i){const s=this[o];e.call(this,i),this.requestUpdate(o,s,t,!0,i)}}throw Error("Unsupported decorator location: "+o)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ut(t){return(e,i)=>"object"==typeof i?gt(t,e,i):((t,e,i)=>{const o=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),o?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function mt(t){return ut({...t,state:!0,attribute:!1})}const ft=50,_t=50,yt=100,vt=200,bt=12,$t={boiler_fill:"#4CAF50",boiler_stroke:"#546E7A",cold_water:"#2196F3",warm_water:"#FF9800",hot_water:"#F44336",gradient_start:"#2196F3",gradient_end:"#F44336"},xt={ocean:{boiler_fill:"#4DD0E1",boiler_stroke:"#0097A7",cold_water:"#B3E5FC",warm_water:"#4FC3F7",hot_water:"#0288D1",gradient_start:"#E1F5FE",gradient_end:"#01579B"},sunset:{boiler_fill:"#FF9800",boiler_stroke:"#E65100",cold_water:"#FFE0B2",warm_water:"#FFB74D",hot_water:"#E64A19",gradient_start:"#FFF3E0",gradient_end:"#BF360C"},forest:{boiler_fill:"#66BB6A",boiler_stroke:"#2E7D32",cold_water:"#C8E6C9",warm_water:"#81C784",hot_water:"#43A047",gradient_start:"#E8F5E9",gradient_end:"#1B5E20"},fire:{boiler_fill:"#FF5722",boiler_stroke:"#BF360C",cold_water:"#FFCCBC",warm_water:"#FF7043",hot_water:"#D84315",gradient_start:"#FBE9E7",gradient_end:"#4E342E"},ice:{boiler_fill:"#81D4FA",boiler_stroke:"#0277BD",cold_water:"#E1F5FE",warm_water:"#4FC3F7",hot_water:"#0288D1",gradient_start:"#F1F8FB",gradient_end:"#01579B"}},wt={cs:{average_temp:"Průměrná teplota",heating:"Topí se",target:"Cílová teplota",anode_check:"Kontrola anody",cleaning_check:"Čištění",days_remaining:"zbývá dní",overdue:"po termínu",power_consumption:"Spotřeba",heating_source:"Zdroj ohřevu",low_temperature:"Nízká teplota!",temperature_drop:"Prudký pokles teploty!",legionella_risk:"Riziko legionely - ohřejte na 60°C",unusual_consumption:"Neobvyklá spotřeba energie",maintenance_due:"Údržba je potřeba",turn_on:"Zapnout",turn_off:"Vypnout",control:"Ovládání",maintenance:"Údržba",anode:"Anoda",cleaning:"Čištění",not_set:"Nenastaveno",no_sensors:"Nejsou nakonfigurovány žádné senzory",remaining_days:"Zbývá {days} dní",overdue_days:"Po termínu ({days} dní)",status_heating:"Ohřev",status_ready:"Připraveno",status_cooling:"Chladne",hot_water:"Teplá voda",showers:"sprch",stored_energy:"Uložená energie",heat_loss:"Tepelná ztráta",time_to_cold:"Vystydne za",energy_today:"Dnes",history:"Historie teplot",show_history:"Zobrazit historii",hide_history:"Skrýt historii",no_history:"Zatím nejsou nasbíraná data",operation_mode:"Režim",target_control:"Cílová teplota",electric_heating:"Elektrický ohřev",solar_heating:"Solární ohřev",gas_heating:"Plynový ohřev",heat_pump_heating:"Tepelné čerpadlo",mode_eco:"Eko",mode_performance:"Výkon",mode_high_demand:"Vysoká spotřeba",mode_heat_pump:"Tep. čerpadlo",mode_electric:"Elektřina",mode_gas:"Plyn",mode_off:"Vypnuto",unavailable_entity:"Entita nenalezena"},en:{average_temp:"Average Temperature",heating:"Heating",target:"Target Temperature",anode_check:"Anode Check",cleaning_check:"Cleaning",days_remaining:"days remaining",overdue:"overdue",power_consumption:"Consumption",heating_source:"Heating Source",low_temperature:"Low temperature!",temperature_drop:"Rapid temperature drop!",legionella_risk:"Legionella risk - heat to 60°C",unusual_consumption:"Unusual energy consumption",maintenance_due:"Maintenance required",turn_on:"Turn On",turn_off:"Turn Off",control:"Control",maintenance:"Maintenance",anode:"Anode",cleaning:"Cleaning",not_set:"Not set",no_sensors:"No sensors configured",remaining_days:"{days} days left",overdue_days:"Overdue ({days} days)",status_heating:"Heating",status_ready:"Ready",status_cooling:"Cooling down",hot_water:"Hot water",showers:"showers",stored_energy:"Stored energy",heat_loss:"Heat loss",time_to_cold:"Cold in",energy_today:"Today",history:"Temperature history",show_history:"Show history",hide_history:"Hide history",no_history:"No data collected yet",operation_mode:"Mode",target_control:"Target temperature",electric_heating:"Electric heating",solar_heating:"Solar heating",gas_heating:"Gas heating",heat_pump_heating:"Heat pump",mode_eco:"Eco",mode_performance:"Performance",mode_high_demand:"High demand",mode_heat_pump:"Heat pump",mode_electric:"Electric",mode_gas:"Gas",mode_off:"Off",unavailable_entity:"Entity not found"},de:{average_temp:"Durchschnittstemperatur",heating:"Heizung",target:"Zieltemperatur",anode_check:"Anode Prüfung",cleaning_check:"Reinigung",days_remaining:"Tage übrig",overdue:"überfällig",power_consumption:"Verbrauch",heating_source:"Heizquelle",low_temperature:"Niedrige Temperatur!",temperature_drop:"Schneller Temperaturabfall!",legionella_risk:"Legionellen-Risiko - auf 60°C erhitzen",unusual_consumption:"Ungewöhnlicher Energieverbrauch",maintenance_due:"Wartung erforderlich",turn_on:"Einschalten",turn_off:"Ausschalten",control:"Steuerung",maintenance:"Wartung",anode:"Anode",cleaning:"Reinigung",not_set:"Nicht gesetzt",no_sensors:"Keine Sensoren konfiguriert",remaining_days:"Noch {days} Tage",overdue_days:"Überfällig ({days} Tage)",status_heating:"Heizt",status_ready:"Bereit",status_cooling:"Kühlt ab",hot_water:"Warmwasser",showers:"Duschen",stored_energy:"Gespeicherte Energie",heat_loss:"Wärmeverlust",time_to_cold:"Kalt in",energy_today:"Heute",history:"Temperaturverlauf",show_history:"Verlauf anzeigen",hide_history:"Verlauf ausblenden",no_history:"Noch keine Daten gesammelt",operation_mode:"Modus",target_control:"Zieltemperatur",electric_heating:"Elektrische Heizung",solar_heating:"Solarheizung",gas_heating:"Gasheizung",heat_pump_heating:"Wärmepumpe",mode_eco:"Eco",mode_performance:"Leistung",mode_high_demand:"Hoher Bedarf",mode_heat_pump:"Wärmepumpe",mode_electric:"Elektrisch",mode_gas:"Gas",mode_off:"Aus",unavailable_entity:"Entität nicht gefunden"},sk:{average_temp:"Priemerná teplota",heating:"Kúrenie",target:"Cieľová teplota",anode_check:"Kontrola anódy",cleaning_check:"Čistenie",days_remaining:"zostáva dní",overdue:"po termíne",power_consumption:"Spotreba",heating_source:"Zdroj kúrenia",low_temperature:"Nízka teplota!",temperature_drop:"Prudký pokles teploty!",legionella_risk:"Riziko legionely - ohrejte na 60°C",unusual_consumption:"Neobvyklá spotreba energie",maintenance_due:"Údržba je potrebná",turn_on:"Zapnúť",turn_off:"Vypnúť",control:"Ovládanie",maintenance:"Údržba",anode:"Anóda",cleaning:"Čistenie",not_set:"Nenastavené",no_sensors:"Nie sú nakonfigurované žiadne senzory",remaining_days:"Zostáva {days} dní",overdue_days:"Po termíne ({days} dní)",status_heating:"Ohrev",status_ready:"Pripravené",status_cooling:"Chladne",hot_water:"Teplá voda",showers:"spŕch",stored_energy:"Uložená energia",heat_loss:"Tepelná strata",time_to_cold:"Vychladne za",energy_today:"Dnes",history:"História teplôt",show_history:"Zobraziť históriu",hide_history:"Skryť históriu",no_history:"Zatiaľ nie sú nazbierané dáta",operation_mode:"Režim",target_control:"Cieľová teplota",electric_heating:"Elektrický ohrev",solar_heating:"Solárny ohrev",gas_heating:"Plynový ohrev",heat_pump_heating:"Tepelné čerpadlo",mode_eco:"Eko",mode_performance:"Výkon",mode_high_demand:"Vysoká spotreba",mode_heat_pump:"Tep. čerpadlo",mode_electric:"Elektrina",mode_gas:"Plyn",mode_off:"Vypnuté",unavailable_entity:"Entita nenájdená"},pl:{average_temp:"Średnia temperatura",heating:"Ogrzewanie",target:"Temperatura docelowa",anode_check:"Sprawdzenie anody",cleaning_check:"Czyszczenie",days_remaining:"dni pozostało",overdue:"po terminie",power_consumption:"Zużycie",heating_source:"Źródło ogrzewania",low_temperature:"Niska temperatura!",temperature_drop:"Szybki spadek temperatury!",legionella_risk:"Ryzyko legionelli - podgrzej do 60°C",unusual_consumption:"Niezwykłe zużycie energii",maintenance_due:"Wymagana konserwacja",turn_on:"Włącz",turn_off:"Wyłącz",control:"Sterowanie",maintenance:"Konserwacja",anode:"Anoda",cleaning:"Czyszczenie",not_set:"Nie ustawiono",no_sensors:"Nie skonfigurowano czujników",remaining_days:"Pozostało {days} dni",overdue_days:"Po terminie ({days} dni)",status_heating:"Grzanie",status_ready:"Gotowe",status_cooling:"Stygnie",hot_water:"Ciepła woda",showers:"pryszniców",stored_energy:"Zmagazynowana energia",heat_loss:"Straty ciepła",time_to_cold:"Wystygnie za",energy_today:"Dzisiaj",history:"Historia temperatur",show_history:"Pokaż historię",hide_history:"Ukryj historię",no_history:"Brak zebranych danych",operation_mode:"Tryb",target_control:"Temperatura docelowa",electric_heating:"Ogrzewanie elektryczne",solar_heating:"Ogrzewanie solarne",gas_heating:"Ogrzewanie gazowe",heat_pump_heating:"Pompa ciepła",mode_eco:"Eko",mode_performance:"Wydajność",mode_high_demand:"Wysokie zapotrzebowanie",mode_heat_pump:"Pompa ciepła",mode_electric:"Elektryczny",mode_gas:"Gaz",mode_off:"Wyłączony",unavailable_entity:"Nie znaleziono encji"}},kt=["sensor","number","input_number"],St=["switch","input_boolean","climate","water_heater","binary_sensor"],At=["water_heater","climate","number","input_number","sensor"];let Tt=class extends ct{setConfig(t){this._config={...t}}_fireChange(t){this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}_setValue(t,e){const i={...this._config};""===e||null==e||"number"==typeof e&&isNaN(e)?delete i[t]:i[t]=e,this._fireChange(i)}_entityOptions(t){return this.hass?.states?Object.keys(this.hass.states).filter(e=>t.includes(e.split(".")[0])).sort():[]}_updateSensor(t,e){const i=[...this._config.sensors||[]];i[t]={...i[t],...e},this._fireChange({...this._config,sensors:i})}_addSensor(){const t=[...this._config.sensors||[]];t.push({entity:"",position:t.length+1}),this._fireChange({...this._config,sensors:t})}_removeSensor(t){const e=[...this._config.sensors||[]];e.splice(t,1),this._fireChange({...this._config,sensors:e})}_moveSensor(t,e){const i=[...this._config.sensors||[]],o=t+e;o<0||o>=i.length||([i[t],i[o]]=[i[o],i[t]],i.forEach((t,e)=>{t.position=e+1}),this._fireChange({...this._config,sensors:i}))}_textField(t,e){return V`
      <label class="field">
        <span class="field-label">${t}</span>
        <input
          type="text"
          .value=${this._config[e]??""}
          @change=${t=>this._setValue(e,t.target.value)}
        />
      </label>
    `}_entityField(t,e,i){const o=`list-${String(e)}`;return V`
      <label class="field">
        <span class="field-label">${t}</span>
        <input
          type="text"
          list=${o}
          placeholder="entity_id"
          .value=${this._config[e]??""}
          @change=${t=>this._setValue(e,t.target.value.trim())}
        />
        <datalist id=${o}>
          ${this._entityOptions(i).map(t=>V`<option value=${t}></option>`)}
        </datalist>
      </label>
    `}_numberField(t,e,i=1){return V`
      <label class="field">
        <span class="field-label">${t}</span>
        <input
          type="number"
          step=${i}
          .value=${void 0!==this._config[e]?String(this._config[e]):""}
          @change=${t=>{const i=t.target.value;this._setValue(e,""===i?void 0:parseFloat(i))}}
        />
      </label>
    `}_selectField(t,e,i){return V`
      <label class="field">
        <span class="field-label">${t}</span>
        <select @change=${t=>this._setValue(e,t.target.value)}>
          ${i.map(t=>V`
            <option value=${t.value} ?selected=${(this._config[e]??"")===t.value}>
              ${t.label}
            </option>
          `)}
        </select>
      </label>
    `}_toggle(t,e,i=!1){const o=this._config[e]??i;return V`
      <label class="toggle">
        <input
          type="checkbox"
          .checked=${o}
          @change=${t=>this._setValue(e,t.target.checked)}
        />
        <span>${t}</span>
      </label>
    `}render(){return this._config?V`
      <div class="editor">
        <div class="section">
          <div class="section-title">Základní / Basic</div>
          ${this._textField("Název / Title","title")}
          ${this._selectField("Jazyk / Language","language",[{value:"cs",label:"Čeština"},{value:"en",label:"English"},{value:"de",label:"Deutsch"},{value:"sk",label:"Slovenčina"},{value:"pl",label:"Polski"}])}
          ${this._selectField("Motiv / Theme","theme",[{value:"",label:"—"},{value:"ocean",label:"Ocean"},{value:"sunset",label:"Sunset"},{value:"forest",label:"Forest"},{value:"fire",label:"Fire"},{value:"ice",label:"Ice"},{value:"custom",label:"Custom"}])}
          ${this._selectField("Rozvržení / Layout","layout_style",[{value:"default",label:"Default"},{value:"horizontal",label:"Horizontal"},{value:"minimal",label:"Minimal"},{value:"wide",label:"Wide"}])}
          ${this._selectField("Režim zobrazení / Display mode","display_mode",[{value:"normal",label:"Normal"},{value:"compact",label:"Compact"}])}
        </div>

        <div class="section">
          <div class="section-title">Senzory / Sensors</div>
          ${(this._config.sensors||[]).map((t,e)=>V`
            <div class="sensor-editor">
              <div class="sensor-editor-row">
                <input
                  type="text"
                  list="list-sensor-entities"
                  placeholder="sensor.bojler_horni"
                  .value=${t.entity||""}
                  @change=${t=>this._updateSensor(e,{entity:t.target.value.trim()})}
                />
                <button class="icon-button" title="Nahoru" @click=${()=>this._moveSensor(e,-1)}>▲</button>
                <button class="icon-button" title="Dolů" @click=${()=>this._moveSensor(e,1)}>▼</button>
                <button class="icon-button danger" title="Odebrat" @click=${()=>this._removeSensor(e)}>✕</button>
              </div>
              <div class="sensor-editor-row">
                <input
                  type="text"
                  placeholder="Název / Name"
                  .value=${t.name||""}
                  @change=${t=>this._updateSensor(e,{name:t.target.value})}
                />
                <input
                  class="position-input"
                  type="number"
                  min="1"
                  placeholder="pozice"
                  .value=${void 0!==t.position?String(t.position):""}
                  @change=${t=>this._updateSensor(e,{position:parseInt(t.target.value,10)||void 0})}
                />
              </div>
            </div>
          `)}
          <datalist id="list-sensor-entities">
            ${this._entityOptions(kt).map(t=>V`<option value=${t}></option>`)}
          </datalist>
          <button class="add-button" @click=${()=>this._addSensor()}>+ Přidat senzor</button>
        </div>

        <div class="section">
          <div class="section-title">Entity</div>
          ${this._entityField("Ohřev / Heating","heating_entity",St)}
          ${this._entityField("Cílová teplota / Target","target_temp_entity",At)}
          ${this._entityField("Ovládání / Control","control_entity",St)}
          ${this._entityField("Výkon / Power (W)","power_entity",kt)}
          ${this._entityField("Spotřeba dnes / Energy today","energy_today_entity",kt)}
          ${this._selectField("Typ ohřevu / Heating type","heating_type",[{value:"electric",label:"⚡ Electric"},{value:"solar",label:"☀️ Solar"},{value:"gas",label:"🔥 Gas"},{value:"heat_pump",label:"🌡️ Heat pump"}])}
        </div>

        <div class="section">
          <div class="section-title">Nádoba / Tank</div>
          ${this._numberField("Objem (l) / Volume","tank_volume")}
          ${this._numberField("Teplota přívodu (°C) / Cold inlet","cold_water_temp")}
          ${this._numberField("Užitná teplota (°C) / Usable temp","mixed_water_temp")}
          ${this._numberField("Objem sprchy (l) / Shower volume","shower_volume")}
          ${this._numberField("Min. teplota / Min temp","min_temp")}
          ${this._numberField("Max. teplota / Max temp","max_temp")}
          ${this._numberField("Varování při teplotě / Low temp warning","low_temp_warning")}
          ${this._numberField("Cena energie / Energy cost","energy_cost",.01)}
          ${this._textField("Měna / Currency","currency")}
        </div>

        <div class="section">
          <div class="section-title">Vizualizace / Visualization</div>
          ${this._selectField("Stratifikace / Stratification","stratification_style",[{value:"gradient",label:"Gradient"},{value:"layers",label:"Layers"}])}
          <div class="toggles">
            ${this._toggle("Teplotní stupnice","show_scale",!0)}
            ${this._toggle("Značky senzorů","show_sensor_markers",!0)}
            ${this._toggle("Displej na bojleru","show_display_panel",!0)}
            ${this._toggle("Hladina teplé vody","show_hot_water_level",!0)}
            ${this._toggle("Izolace","show_insulation",!0)}
            ${this._toggle("Trubky","show_pipes",!0)}
            ${this._toggle("Nohy","show_legs",!0)}
            ${this._toggle("Gradient","show_gradient",!0)}
            ${this._toggle("Stratifikace","show_stratification",!0)}
            ${this._toggle("Animace","advanced_animations",!0)}
            ${this._toggle("Stavové odznaky","show_status_badges",!0)}
          </div>
        </div>

        <div class="section">
          <div class="section-title">Data a ovládání / Data & controls</div>
          <div class="toggles">
            ${this._toggle("Průměrná teplota","show_average",!0)}
            ${this._toggle("Sparkline","show_sparkline")}
            ${this._toggle("Trend","show_trend",!0)}
            ${this._toggle("Statistika vody","show_water_stats",!0)}
            ${this._toggle("Tepelná ztráta","show_heat_loss",!0)}
            ${this._toggle("Graf historie","show_history_chart")}
            ${this._toggle("Ukládat historii","persist_history",!0)}
            ${this._toggle("Tlačítko zapnutí","show_control_button")}
            ${this._toggle("Ovládání cílové teploty","show_target_control")}
            ${this._toggle("Režimy ohřevu","show_operation_modes")}
            ${this._toggle("More-info dialog","enable_more_info",!0)}
          </div>
          ${this._selectField("Styl tlačítka / Button style","button_style",[{value:"default",label:"Default"},{value:"switch",label:"Switch"},{value:"icon",label:"Icon"},{value:"minimal",label:"Minimal"}])}
          ${this._numberField("Historie (min) / History duration","history_duration")}
          ${this._numberField("Vzorkování (s) / Sample interval","history_interval")}
        </div>

        <div class="section">
          <div class="section-title">Údržba / Maintenance</div>
          ${this._textField("Výměna anody (YYYY-MM-DD)","anode_last_change")}
          ${this._numberField("Interval anody (dny)","anode_change_interval")}
          ${this._textField("Poslední čištění (YYYY-MM-DD)","cleaning_last_date")}
          ${this._numberField("Interval čištění (dny)","cleaning_interval")}
        </div>

        <div class="hint">
          Pokročilé volby (barvy, upozornění, notifikace, více zdrojů ohřevu) lze nastavit
          v YAML editoru. / Advanced options are available in the YAML editor.
        </div>
      </div>
    `:V``}static get styles(){return n`
      .editor {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .section {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 12px;
        border: 1px solid var(--divider-color);
        border-radius: 8px;
      }

      .section-title {
        font-size: 14px;
        font-weight: 600;
        color: var(--primary-text-color);
      }

      .field {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .field-label {
        flex: 0 0 45%;
        font-size: 13px;
        color: var(--secondary-text-color);
      }

      input[type='text'],
      input[type='number'],
      select {
        flex: 1 1 auto;
        min-width: 0;
        padding: 8px;
        border: 1px solid var(--divider-color);
        border-radius: 6px;
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color);
        font-size: 13px;
        font-family: inherit;
      }

      .toggles {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: 6px;
      }

      .toggle {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
        color: var(--primary-text-color);
        cursor: pointer;
      }

      .sensor-editor {
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding: 8px;
        background: var(--secondary-background-color);
        border-radius: 6px;
      }

      .sensor-editor-row {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .position-input {
        flex: 0 0 80px;
      }

      .icon-button {
        flex: 0 0 auto;
        width: 30px;
        height: 30px;
        border: 1px solid var(--divider-color);
        border-radius: 6px;
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color);
        cursor: pointer;
      }

      .icon-button.danger {
        color: var(--error-color, #f44336);
      }

      .add-button {
        padding: 8px 12px;
        border: 1px dashed var(--divider-color);
        border-radius: 6px;
        background: transparent;
        color: var(--primary-color);
        cursor: pointer;
        font-size: 13px;
      }

      .hint {
        font-size: 12px;
        color: var(--secondary-text-color);
        font-style: italic;
      }
    `}};var Et;t([ut({attribute:!1})],Tt.prototype,"hass",void 0),t([mt()],Tt.prototype,"_config",void 0),Tt=t([dt("ha-boiler-card-editor")],Tt);const Ct=["water_heater","climate","number","input_number"];let zt=Et=class extends ct{constructor(){super(...arguments),this.tempHistory=new Map,this.lastNotificationTime=new Map,this.chartExpanded=!1,this.lastSampleTime=0,this.lastPersistTime=0,this.storageKey=""}setConfig(t){if(!t)throw new Error("Invalid configuration");this.config={show_average:!0,show_gradient:!0,show_stratification:!0,show_sparkline:!1,min_temp:0,max_temp:100,display_mode:"normal",heating_type:"electric",anode_change_interval:365,cleaning_interval:180,enable_more_info:!0,energy_cost:0,advanced_animations:!0,stratification_style:"gradient",show_scale:!0,show_sensor_markers:!0,show_display_panel:!0,show_hot_water_level:!0,show_insulation:!0,show_pipes:!0,show_legs:!0,show_water_stats:!0,show_trend:!0,show_heat_loss:!0,show_status_badges:!0,show_history_chart:!1,cold_water_temp:10,mixed_water_temp:40,shower_volume:40,history_duration:120,history_interval:60,persist_history:!0,temp_step:1,currency:"",...t},this.chartExpanded=!!this.config.show_history_chart,this.storageKey="ha-boiler-card:history:"+this.getHistoryId(),this.loadHistory()}connectedCallback(){super.connectedCallback(),this.loadHistory()}disconnectedCallback(){this.persistHistory(!0),super.disconnectedCallback()}shouldUpdate(t){return!!this.config&&(t.has("hass")&&this.hass?.states&&this.updateTempHistory(),!0)}getHistoryId(){const t=[this.config.title||"",...(this.config.sensors||[]).map(t=>t.entity)].join("|");let e=0;for(let i=0;i<t.length;i++)e=(e<<5)-e+t.charCodeAt(i),e|=0;return Math.abs(e).toString(36)}getHistoryWindow(){return 60*(this.config.history_duration||120)*1e3}trimHistory(t){const e=Date.now()-this.getHistoryWindow(),i=t.filter(t=>t.timestamp>e);return i.length>720?i.slice(-720):i}loadHistory(){if(this.config?.persist_history&&this.storageKey)try{const t=window.localStorage.getItem(this.storageKey);if(!t)return;const e=JSON.parse(t),i=new Map;Object.entries(e).forEach(([t,e])=>{if(!Array.isArray(e))return;const o=e.filter(t=>"number"==typeof t?.value&&"number"==typeof t?.timestamp);i.set(t,this.trimHistory(o))}),i.size>0&&(this.tempHistory=i)}catch{}}persistHistory(t=!1){if(!this.config?.persist_history||!this.storageKey)return;const e=Date.now();if(t||!(e-this.lastPersistTime<6e4)){this.lastPersistTime=e;try{const t={};this.tempHistory.forEach((e,i)=>{t[i]=e}),window.localStorage.setItem(this.storageKey,JSON.stringify(t))}catch{}}}updateTempHistory(){if(!this.config.sensors||0===this.config.sensors.length)return;const t=Date.now(),e=1e3*Math.max(5,this.config.history_interval||60);if(t-this.lastSampleTime<e)return;this.lastSampleTime=t;const i=this.isHeatingActive(),o=(e,o)=>{const s=this.tempHistory.get(e)||[];s.push({value:o,timestamp:t,heating:i}),this.tempHistory.set(e,this.trimHistory(s))};this.config.sensors.forEach(t=>{const e=this.getSensorValue(t.entity);null!==e&&o(t.entity,e)});const s=this.getAverageTemperature();null!==s&&o("average",s),this.persistHistory()}getSensorValue(t){if(!this.hass?.states)return null;const e=this.hass.states[t];if(!e)return null;const i=parseFloat(e.state);return isNaN(i)?null:i}getAverageTemperature(){if(!this.config.sensors||0===this.config.sensors.length)return null;const t=[];return this.config.sensors.forEach(e=>{const i=this.getSensorValue(e.entity);null!==i&&t.push(i)}),0===t.length?null:t.reduce((t,e)=>t+e,0)/t.length}isHeating(){if(!this.config.heating_entity||!this.hass?.states)return!1;const t=this.hass.states[this.config.heating_entity];return!!t&&("on"===t.state||"heating"===t.state)}isHeatingActive(){return this.isHeating()||this.getActiveHeatingSources().length>0}getActiveHeatingSources(){return this.config.heating_sources&&this.hass?.states?this.config.heating_sources.filter(t=>{const e=this.hass.states[t.entity];return e&&("on"===e.state||"heating"===e.state)}).sort((t,e)=>(t.priority||0)-(e.priority||0)):[]}getPowerConsumption(){if(!this.config.power_entity||!this.hass?.states)return null;const t=this.getSensorValue(this.config.power_entity);if(null===t)return null;return{power:t,cost:t/1e3*(this.config.energy_cost||0)}}getEnergyToday(){if(!this.config.energy_today_entity||!this.hass?.states)return null;const t=this.getSensorValue(this.config.energy_today_entity);if(null===t)return null;const e=this.hass.states[this.config.energy_today_entity],i=e?.attributes?.unit_of_measurement||"kWh";return{energy:t,cost:t*(this.config.energy_cost||0),unit:i}}getTargetTemperature(){if(!this.config.target_temp_entity||!this.hass?.states)return null;const t=this.hass.states[this.config.target_temp_entity];if(!t)return null;const e=t.attributes?.temperature;if("number"==typeof e&&!isNaN(e))return e;const i=parseFloat(t.state);return isNaN(i)?null:i}canSetTargetTemperature(){if(!this.config.target_temp_entity||!this.hass?.states)return!1;if(!this.hass.states[this.config.target_temp_entity])return!1;const t=this.config.target_temp_entity.split(".")[0];return Ct.includes(t)}getTargetTempStep(){const t=this.config.target_temp_entity?this.hass?.states?.[this.config.target_temp_entity]:void 0,e=t?.attributes?.target_temp_step??t?.attributes?.step;return"number"==typeof e&&e>0?e:this.config.temp_step&&this.config.temp_step>0?this.config.temp_step:1}setTargetTemperature(t){if(!this.canSetTargetTemperature())return;const e=this.config.target_temp_entity,i=this.getTargetTemperature();if(null===i)return;const o=this.hass.states[e],s=o?.attributes?.min_temp??o?.attributes?.min??this.config.min_temp??0,r=o?.attributes?.max_temp??o?.attributes?.max??this.config.max_temp??100,n=this.getTargetTempStep(),a=n<1?1:0,l=i+t*n,c=parseFloat(Math.min(r,Math.max(s,l)).toFixed(a));if(c===i)return;const h=e.split(".")[0];"water_heater"===h||"climate"===h?this.hass.callService(h,"set_temperature",{entity_id:e,temperature:c}):this.hass.callService(h,"set_value",{entity_id:e,value:c})}getOperationModes(){const t=this.config.target_temp_entity||this.config.control_entity;if(!t||!this.hass?.states)return null;if("water_heater"!==t.split(".")[0])return null;const e=this.hass.states[t],i=e?.attributes?.operation_list;return Array.isArray(i)&&0!==i.length?{modes:i,current:e.attributes?.operation_mode||e.state}:null}setOperationMode(t){const e=this.config.target_temp_entity||this.config.control_entity;e&&this.hass.callService("water_heater","set_operation_mode",{entity_id:e,operation_mode:t})}getTemperatureProfile(){const t=[...this.config.sensors||[]].sort((t,e)=>(t.position||0)-(e.position||0)),e=[],i=t.length;return 0===i||t.forEach((t,o)=>{const s=this.getSensorValue(t.entity);null!==s&&e.push({ratio:(o+.5)/i,temp:s,sensor:t})}),e}getHotWaterFraction(){const t=this.getTemperatureProfile();if(0===t.length)return null;const e=this.config.mixed_water_temp??40;if(1===t.length)return t[0].temp>=e?1:0;if(t[0].temp<e)return 0;for(let i=0;i<t.length-1;i++){const o=t[i],s=t[i+1];if(o.temp>=e&&s.temp<e){const t=o.temp-s.temp,i=0===t?0:(o.temp-e)/t;return o.ratio+i*(s.ratio-o.ratio)}}return 1}getWaterStats(){if(!this.config.tank_volume||this.config.tank_volume<=0)return null;const t=this.getAverageTemperature();if(null===t)return null;const e=this.config.tank_volume,i=this.config.cold_water_temp??10,o=this.config.mixed_water_temp??40,s=this.config.shower_volume||40;if(o<=i)return null;const r=Math.max(0,e*(t-i)/(o-i));return{usableLiters:r,showers:r/s,storedEnergy:Math.max(0,4.186*e*(t-i)/3600),hotFraction:this.getHotWaterFraction()??Math.max(0,Math.min(1,(t-i)/(o-i)))}}getHeatLoss(){const t=this.tempHistory.get("average");if(!t||t.length<4)return null;const e=[];for(let i=t.length-1;i>=0&&!t[i].heating;i--)e.unshift(t[i]);if(e.length<4)return null;if((e[e.length-1].timestamp-e[0].timestamp)/6e4<20)return null;const i=e.length,o=e[0].timestamp;let s=0,r=0,n=0,a=0;e.forEach(t=>{const e=(t.timestamp-o)/6e4;s+=e,r+=t.value,n+=e*t.value,a+=e*e});const l=i*a-s*s;if(0===l)return null;const c=60*-((i*n-s*r)/l);if(c<=.05)return null;const h=this.config.low_temp_warning??this.config.mixed_water_temp??40,d=e[e.length-1].value;return{ratePerHour:c,hoursToThreshold:d>h?(d-h)/c:0,threshold:h}}getTrend(t){if(!this.config.show_trend)return null;const e=this.tempHistory.get(t);if(!e||e.length<2)return null;const i=Date.now(),o=e.find(t=>t.timestamp>=i-9e5)||e[0],s=e[e.length-1];if(o===s)return null;const r=s.value-o.value;return{direction:Math.abs(r)<.3?"flat":r>0?"up":"down",delta:r}}getStatus(){if(this.isHeatingActive())return{key:"status_heating",icon:"🔥",className:"heating"};const t=this.getHeatLoss();return t&&t.ratePerHour>.3?{key:"status_cooling",icon:"❄️",className:"cooling"}:{key:"status_ready",icon:"✅",className:"ready"}}getColors(){return this.config.theme&&"custom"!==this.config.theme&&xt[this.config.theme]?{...$t,...xt[this.config.theme],...this.config.colors||{}}:this.config.colors?{...$t,...this.config.colors}:{...$t}}t(t,e){const i=this.config.language||"cs",o=wt[i]||wt.cs,s=this.config.custom_labels?.[t];let r=s||o[t]||wt.en[t]||t;return e&&Object.entries(e).forEach(([t,e])=>{r=r.replace(`{${t}}`,String(e))}),r}static hexToRgb(t){const e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t.trim());return e?[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]:null}static srgbToLinear(t){const e=t/255;return e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)}static linearToSrgb(t){const e=t<=.0031308?12.92*t:1.055*Math.pow(t,1/2.4)-.055;return Math.round(255*Math.max(0,Math.min(1,e)))}static rgbToOklab([t,e,i]){const o=Et.srgbToLinear(t),s=Et.srgbToLinear(e),r=Et.srgbToLinear(i),n=Math.cbrt(.4122214708*o+.5363325363*s+.0514459929*r),a=Math.cbrt(.2119034982*o+.6806995451*s+.1073969566*r),l=Math.cbrt(.0883024619*o+.2817188376*s+.6299787005*r);return[.2104542553*n+.793617785*a-.0040720468*l,1.9779984951*n-2.428592205*a+.4505937099*l,.0259040371*n+.7827717662*a-.808675766*l]}static oklabToRgb([t,e,i]){const o=Math.pow(t+.3963377774*e+.2158037573*i,3),s=Math.pow(t-.1055613458*e-.0638541728*i,3),r=Math.pow(t-.0894841775*e-1.291485548*i,3);return[Et.linearToSrgb(4.0767416621*o-3.3077115913*s+.2309699292*r),Et.linearToSrgb(-1.2684380046*o+2.6097574011*s-.3413193965*r),Et.linearToSrgb(-.0041960863*o-.7034186147*s+1.707614701*r)]}static mix(t,e,i){const o=Et.hexToRgb(t),s=Et.hexToRgb(e);if(!o||!s)return null;const r=Et.rgbToOklab(o),n=Et.rgbToOklab(s),a=r.map((t,e)=>t+(n[e]-t)*i);return Et.oklabToRgb(a)}static forText(t){const[e,i,o]=Et.rgbToOklab(t),s=Math.min(.64,Math.max(.46,e));return Et.oklabToRgb([s,1.3*i,1.3*o])}getTemperatureColor(t,e=!1){if(null===t)return"#888";const i=this.getColors(),o=this.config.min_temp??0,s=this.config.max_temp??100,r=Math.max(0,Math.min(1,(t-o)/(s-o||1))),n=i.cold_water||$t.cold_water,a=i.warm_water||$t.warm_water,l=i.hot_water||$t.hot_water,c=r<.5?Et.mix(n,a,r/.5):Et.mix(a,l,(r-.5)/.5);if(c){const[t,i,o]=e?Et.forText(c):c;return`rgb(${t}, ${i}, ${o})`}return r<.3?n:r<.6?a:l}getHeatingIcon(t){switch(t){case"solar":return"☀️";case"gas":return"🔥";case"heat_pump":return"🌡️";default:return"⚡"}}getHeatingLabel(t){switch(t){case"solar":return this.t("solar_heating");case"gas":return this.t("gas_heating");case"heat_pump":return this.t("heat_pump_heating");default:return this.t("electric_heating")}}formatDuration(t){if(t<1)return`${Math.max(1,Math.round(60*t))} min`;if(t<24){const e=Math.floor(t),i=Math.round(60*(t-e));return i>0?`${e} h ${i} min`:`${e} h`}return`${Math.round(t/24)} d`}calculateTimeToTarget(){const t=this.getTargetTemperature(),e=this.getAverageTemperature();if(null===t||null===e)return null;if(e>=t)return null;if(!this.isHeatingActive())return null;const i=this.tempHistory.get("average");if(!i||i.length<2)return null;const o=i.filter(t=>!1!==t.heating),s=o.length>=2?o:i,r=s[0],n=s[s.length-1],a=(n.timestamp-r.timestamp)/1e3/60,l=n.value-r.value;if(a<5||l<=0)return null;const c=l/a,h=t-e,d=Math.ceil(h/c);if(d<60)return`~${d} min`;return`~${Math.floor(d/60)}h ${d%60}min`}getDaysSince(t){if(!t)return null;const e=new Date(t);if(isNaN(e.getTime()))return null;const i=Date.now()-e.getTime();return Math.floor(i/864e5)}getMaintenanceStatus(t,e){if(null===t)return{status:"ok",text:this.t("not_set")};const i=e-t;return i<=0?{status:"overdue",text:this.t("overdue_days",{days:-i})}:i<=30?{status:"warning",text:this.t("remaining_days",{days:i})}:{status:"ok",text:this.t("remaining_days",{days:i})}}hasLowTempWarning(){if(!this.config.low_temp_warning)return!1;const t=this.getAverageTemperature();return null!==t&&t<this.config.low_temp_warning}checkAlerts(){if(!this.config.alerts)return[];const t=[],e=this.getAverageTemperature();return this.config.alerts.forEach(i=>{if(!1!==i.enabled)switch(i.type){case"temperature_drop":{const o=this.tempHistory.get("average");if(o&&o.length>=2&&null!==e){const s=Date.now()-36e5,r=o.find(t=>t.timestamp<s);r&&r.value-e>(i.threshold||10)&&t.push(i)}break}case"legionella_risk":{const o=this.tempHistory.get("average"),s=i.min_temp||60,r=60*(i.duration||168)*60*1e3;if(o&&o.length>0){const n=Date.now()-r,a=o.some(t=>t.timestamp>n&&t.value>=s);!a&&null!==e&&e<s&&t.push(i)}break}case"unusual_consumption":{const e=this.getPowerConsumption();e&&i.threshold&&e.power>i.threshold&&t.push(i);break}}}),t}sendNotification(t,e){if(!this.config.notifications?.enabled)return;if(!this.config.notifications.events?.includes(t))return;if(!this.hass)return;const i=60*(this.config.notifications.interval||30)*1e3,o=Date.now(),s=this.lastNotificationTime.get(t);if(s&&o-s<i)return;this.lastNotificationTime.set(t,o);const r=this.config.notifications.service||"persistent_notification.create",[n,a]=r.split(".");this.hass.callService(n,a,{message:e,title:"HA Boiler Card"})}toggleControlEntity(){if(!this.config.control_entity||!this.hass?.states)return;const t=this.hass.states[this.config.control_entity];if(!t)return;const e=this.config.control_entity.split(".")[0],i="on"===t.state?"turn_off":"turn_on";this.hass.callService(e,i,{entity_id:this.config.control_entity})}getControlState(){if(!this.config.control_entity||!this.hass?.states)return!1;const t=this.hass.states[this.config.control_entity];return"on"===t?.state}showMoreInfo(t){t&&this.config.enable_more_info&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}tempToY(t){const e=this.config.min_temp??0,i=this.config.max_temp??100,o=Math.max(0,Math.min(1,(t-e)/(i-e||1)));return _t+vt*(1-o)}renderWaterGradientStops(){const t=this.getColors(),e=this.getTemperatureProfile();if(0===e.length||!this.config.show_stratification){const e=this.getAverageTemperature(),i=this.config.show_gradient&&null!==e?this.getTemperatureColor(e):t.gradient_start||$t.gradient_start,o=this.config.show_gradient&&null!==e?this.getTemperatureColor(e-5):t.gradient_end||$t.gradient_end;return I`
        <stop offset="0%" stop-color="${i}" stop-opacity="0.95"/>
        <stop offset="100%" stop-color="${o}" stop-opacity="0.75"/>
      `}const i=e.map(t=>I`
      <stop offset="${(100*t.ratio).toFixed(1)}%" stop-color="${this.getTemperatureColor(t.temp)}" stop-opacity="0.95"/>
    `);return I`
      <stop offset="0%" stop-color="${this.getTemperatureColor(e[0].temp)}" stop-opacity="0.95"/>
      ${i}
      <stop offset="100%" stop-color="${this.getTemperatureColor(e[e.length-1].temp)}" stop-opacity="0.9"/>
    `}renderStratificationLayers(){const t=this.getTemperatureProfile();if(0===t.length)return I``;const e=vt/t.length;return I`${t.map((t,i)=>I`
      <rect
        x="${ft}"
        y="${_t+i*e}"
        width="${yt}"
        height="${e}"
        fill="${this.getTemperatureColor(t.temp)}"
        opacity="0.9"
      />
    `)}`}renderBubbles(){if(!this.config.advanced_animations||!this.isHeatingActive())return I``;return I`
      <g class="bubbles">
        ${[{x:68,r:2.5,cls:"bubble-1"},{x:84,r:1.8,cls:"bubble-2"},{x:100,r:3,cls:"bubble-3"},{x:116,r:2,cls:"bubble-4"},{x:132,r:2.4,cls:"bubble-5"}].map(t=>I`
          <circle cx="${t.x}" cy="236" r="${t.r}" fill="#ffffff" opacity="0.65"
                  class="bubble ${t.cls}"/>
        `)}
      </g>
    `}renderHeatingElement(){const t=this.isHeatingActive();return I`
      <g class="heating-element ${t?"active":""}">
        <path d="M 66 238 L 74 232 L 82 244 L 90 232 L 98 244 L 106 232 L 114 244 L 122 232 L 130 238"
              fill="none"
              stroke="${t?"#FF6B35":"var(--disabled-text-color, #9e9e9e)"}"
              stroke-width="3.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              filter="${t?"url(#glow)":"none"}"/>
      </g>
    `}renderHotWaterLevel(){if(!this.config.show_hot_water_level)return I``;const t=this.getHotWaterFraction();if(null===t||t<=0||t>=1)return I``;const e=_t+vt*t,i=this.config.mixed_water_temp??40;return I`
      <g class="hot-level">
        <rect x="${ft}" y="${_t}" width="${yt}" height="${e-_t}"
              fill="#ffffff" opacity="0.12"/>
        <line x1="${ft}" y1="${e}" x2="${ft+yt}" y2="${e}"
              stroke="#ffffff" stroke-width="1.5" stroke-dasharray="5 3" opacity="0.85"/>
        <text x="${ft+16}" y="${e-5}" class="level-label">≥ ${i}°</text>
      </g>
    `}renderScale(){if(!this.config.show_scale)return I``;const t=this.config.min_temp??0,e=this.config.max_temp??100,i=Array.from({length:5},(i,o)=>{const s=t+(e-t)*o/4,r=this.tempToY(s);return I`
        <g>
          <line x1="42" y1="${r}" x2="${ft-2}" y2="${r}" class="scale-tick"/>
          <text x="39" y="${r+3}" class="scale-label" text-anchor="end">${Math.round(s)}°</text>
        </g>
      `}),o=this.getTargetTemperature(),s=null!==o&&o>=t&&o<=e?I`
      <g class="target-marker">
        <line x1="${ft}" y1="${this.tempToY(o)}" x2="${ft+yt}" y2="${this.tempToY(o)}"
              class="target-line"/>
        <polygon points="${ft+yt+2},${this.tempToY(o)-4} ${ft+yt+2},${this.tempToY(o)+4} ${ft+yt-4},${this.tempToY(o)}"
                 class="target-arrow"/>
        <title>${this.t("target")}: ${o.toFixed(1)}°C</title>
      </g>
    `:I``;return I`
      <g class="scale">
        ${i}
        ${s}
      </g>
    `}renderSensorMarkers(){if(!this.config.show_sensor_markers)return I``;const t=this.getTemperatureProfile();return 0===t.length?I``:I`${t.map(t=>{const e=_t+vt*t.ratio,i=t.sensor.name||this.hass?.states?.[t.sensor.entity]?.attributes?.friendly_name||t.sensor.entity;return I`
        <g class="sensor-marker" @click=${e=>{e.stopPropagation(),this.showMoreInfo(t.sensor.entity)}}>
          <title>${i}: ${t.temp.toFixed(1)} °C</title>
          <line x1="${ft+2}" y1="${e}" x2="${ft+yt-2}" y2="${e}"
                class="marker-line"/>
          <circle cx="${ft+7}" cy="${e}" r="3" fill="#ffffff" opacity="0.9"/>
          <rect x="${ft+yt-42}" y="${e-8}" width="38" height="16" rx="8"
                fill="rgba(0, 0, 0, 0.42)"/>
          <text x="${ft+yt-23}" y="${e+4}" class="marker-label" text-anchor="middle">
            ${t.temp.toFixed(1)}°
          </text>
        </g>
      `})}`}renderPipes(){if(!this.config.show_pipes)return I``;const t=this.isHeatingActive()&&this.config.advanced_animations;return I`
      <g class="pipes">
        <!-- Hot water outlet -->
        <line x1="${ft+yt-6}" y1="72" x2="182" y2="72" class="pipe pipe-hot"/>
        ${t?I`<line x1="${ft+yt-6}" y1="72" x2="182" y2="72" class="pipe-flow flow-out"/>`:I``}
        <circle cx="182" cy="72" r="4" class="pipe-cap pipe-hot-cap"/>

        <!-- Cold water inlet -->
        <line x1="${ft+yt-6}" y1="228" x2="182" y2="228" class="pipe pipe-cold"/>
        ${t?I`<line x1="182" y1="228" x2="${ft+yt-6}" y2="228" class="pipe-flow flow-in"/>`:I``}
        <circle cx="182" cy="228" r="4" class="pipe-cap pipe-cold-cap"/>
      </g>
    `}renderDisplayPanel(t){if(!this.config.show_display_panel)return I``;const e=this.getStatus(),i=this.getTargetTemperature();return I`
      <g class="display-panel">
        <rect x="56" y="10" width="88" height="32" rx="7" class="panel-bg"/>
        <circle cx="67" cy="26" r="3.5" class="panel-led led-${e.className}"/>
        <text x="106" y="31" text-anchor="middle" class="panel-temp">
          ${null!==t?`${t.toFixed(1)}°`:"--"}
        </text>
        ${null!==i?I`<text x="136" y="39" text-anchor="end" class="panel-target">🎯 ${i.toFixed(0)}°</text>`:I``}
        <title>${this.t(e.key)}${null!==t?` · ${t.toFixed(1)} °C`:""}</title>
      </g>
    `}renderBoilerSVG(){const t=this.getColors(),e=this.getAverageTemperature(),i=t.boiler_stroke||$t.boiler_stroke,o="compact"===this.config.display_mode,s=this.config.show_stratification&&"layers"===this.config.stratification_style,r=this.config.control_entity||this.config.heating_entity;return V`
      <svg
        class="boiler-svg ${o?"compact":""} ${this.config.enable_more_info&&r?"clickable":""}"
        viewBox="0 0 200 300"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="${this.t("average_temp")}: ${null!==e?e.toFixed(1):"--"} °C"
        @click=${()=>this.showMoreInfo(r)}
      >
        <defs>
          <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            ${this.renderWaterGradientStops()}
          </linearGradient>

          <linearGradient id="tankShine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.35"/>
            <stop offset="35%" stop-color="#ffffff" stop-opacity="0.05"/>
            <stop offset="100%" stop-color="#000000" stop-opacity="0.18"/>
          </linearGradient>

          <clipPath id="tankClip">
            <rect x="${ft}" y="${_t}" width="${yt}" height="${vt}"
                  rx="${bt}" ry="${bt}"/>
          </clipPath>

          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <!-- Legs -->
        ${this.config.show_legs?I`
          <g class="legs">
            <rect x="64" y="248" width="9" height="20" rx="2" class="leg"/>
            <rect x="127" y="248" width="9" height="20" rx="2" class="leg"/>
            <rect x="56" y="266" width="88" height="5" rx="2.5" class="leg-base"/>
          </g>
        `:I``}

        <!-- Insulation jacket -->
        ${this.config.show_insulation?I`
          <rect x="${ft-7}" y="${_t-7}" width="${yt+14}" height="${vt+14}"
                rx="${bt+5}" ry="${bt+5}" class="insulation"/>
        `:I``}

        ${this.renderPipes()}

        <!-- Water body -->
        <g clip-path="url(#tankClip)">
          ${s?this.renderStratificationLayers():I`<rect x="${ft}" y="${_t}" width="${yt}" height="${vt}" fill="url(#waterGradient)"/>`}

          ${this.renderHotWaterLevel()}
          ${this.renderHeatingElement()}
          ${this.renderBubbles()}

          <rect x="${ft}" y="${_t}" width="${yt}" height="${vt}" fill="url(#tankShine)"/>
          ${this.renderSensorMarkers()}
        </g>

        <!-- Tank outline -->
        <rect x="${ft}" y="${_t}" width="${yt}" height="${vt}"
              rx="${bt}" ry="${bt}"
              fill="none" stroke="${i}" stroke-width="2.5"/>

        ${this.renderScale()}

        ${this.renderDisplayPanel(e)}
      </svg>
    `}renderTrend(t){const e=this.getTrend(t);if(!e)return Y;const i="up"===e.direction?"▲":"down"===e.direction?"▼":"▬";return V`
      <span class="trend trend-${e.direction}" title="${e.delta>=0?"+":""}${e.delta.toFixed(1)} °C">
        ${i} ${Math.abs(e.delta)>=.1?`${e.delta>0?"+":"−"}${Math.abs(e.delta).toFixed(1)}°`:""}
      </span>
    `}renderSparkline(t){if(!this.config.show_sparkline)return V``;const e=this.tempHistory.get(t);if(!e||e.length<2)return V``;const i=e.map(t=>t.value),o=Math.min(...i),s=Math.max(...i)-o||1,r=i.map((t,e)=>{const r=e/(i.length-1)*48,n=20-(t-o)/s*20;return`${r.toFixed(1)},${n.toFixed(1)}`}).join(" ");return V`
      <svg class="sparkline" width="${48}" height="${20}" viewBox="0 0 ${48} ${20}">
        <polyline fill="none" stroke="currentColor" stroke-width="1.5" points="${r}"/>
      </svg>
    `}renderSensor(t){const e=this.hass?.states?.[t.entity],i=this.getSensorValue(t.entity),o=e?.attributes?.unit_of_measurement||"°C",s=t.name||e?.attributes?.friendly_name||t.entity,r=this.getTemperatureColor(i,!0),n="compact"===this.config.display_mode,a=!!e;return V`
      <div
        class="sensor-row ${this.config.enable_more_info?"clickable":""} ${n?"compact":""} ${a?"":"unavailable"}"
        @click=${()=>this.showMoreInfo(t.entity)}
        title="${a?s:`${this.t("unavailable_entity")}: ${t.entity}`}"
      >
        <div class="sensor-info">
          <div class="sensor-label">
            ${a?"":"⚠️ "}${s}
          </div>
          ${this.renderSparkline(t.entity)}
        </div>
        <div class="sensor-readout">
          ${this.renderTrend(t.entity)}
          <div class="sensor-value" style="color: ${r}">
            ${null!==i?i.toFixed(1):a?"--":"N/A"} ${o}
          </div>
        </div>
      </div>
    `}renderStatusBadges(){if(!this.config.show_status_badges)return V``;const t=this.getStatus(),e=this.getAverageTemperature(),i=this.getTargetTemperature(),o=this.getWaterStats(),s=this.getPowerConsumption();return V`
      <div class="badges">
        <div class="badge badge-${t.className}">
          <span class="badge-icon">${t.icon}</span>
          <span>${this.t(t.key)}</span>
        </div>

        ${null!==e?V`
          <div class="badge">
            <span class="badge-icon">🌡️</span>
            <span style="color: ${this.getTemperatureColor(e,!0)}">${e.toFixed(1)} °C</span>
          </div>
        `:""}

        ${null!==i?V`
          <div class="badge">
            <span class="badge-icon">🎯</span>
            <span>${i.toFixed(1)} °C</span>
          </div>
        `:""}

        ${o?V`
          <div class="badge">
            <span class="badge-icon">🚿</span>
            <span>${Math.round(o.usableLiters)} l</span>
          </div>
        `:""}

        ${s&&s.power>0?V`
          <div class="badge">
            <span class="badge-icon">⚡</span>
            <span>${(s.power/1e3).toFixed(2)} kW</span>
          </div>
        `:""}
      </div>
    `}renderWaterStats(){if(!this.config.show_water_stats)return V``;const t=this.getWaterStats(),e=this.config.show_heat_loss?this.getHeatLoss():null;return t||e?V`
      <div class="water-stats">
        ${t?V`
          <div class="stat">
            <div class="stat-label">💧 ${this.t("hot_water")}</div>
            <div class="stat-value">${Math.round(t.usableLiters)} l</div>
            <div class="stat-sub">≈ ${t.showers.toFixed(1)} ${this.t("showers")}</div>
          </div>

          <div class="stat">
            <div class="stat-label">🔋 ${this.t("stored_energy")}</div>
            <div class="stat-value">${t.storedEnergy.toFixed(1)} kWh</div>
            ${this.config.energy_cost?V`
              <div class="stat-sub">≈ ${(t.storedEnergy*this.config.energy_cost).toFixed(2)} ${this.config.currency||""}</div>
            `:""}
          </div>
        `:""}

        ${e?V`
          <div class="stat">
            <div class="stat-label">📉 ${this.t("heat_loss")}</div>
            <div class="stat-value">${e.ratePerHour.toFixed(1)} °C/h</div>
            ${null!==e.hoursToThreshold&&e.hoursToThreshold>0?V`
              <div class="stat-sub">${this.t("time_to_cold")} ${this.formatDuration(e.hoursToThreshold)}</div>
            `:""}
          </div>
        `:""}
      </div>
    `:V``}renderEnergyInfo(){const t=this.getPowerConsumption(),e=this.getEnergyToday();return t||e?V`
      <div class="energy-info">
        <div class="energy-label">💡 ${this.t("power_consumption")}</div>
        <div class="energy-values">
          ${t?V`
            <div class="energy-power">${(t.power/1e3).toFixed(2)} kW</div>
            ${this.config.energy_cost?V`
              <div class="energy-cost">${t.cost.toFixed(2)} ${this.config.currency||""}/h</div>
            `:""}
          `:""}
        </div>
        ${e?V`
          <div class="energy-values energy-today">
            <div class="energy-today-label">${this.t("energy_today")}</div>
            <div class="energy-power">${e.energy.toFixed(2)} ${e.unit}</div>
            ${this.config.energy_cost?V`
              <div class="energy-cost">${e.cost.toFixed(2)} ${this.config.currency||""}</div>
            `:""}
          </div>
        `:""}
      </div>
    `:V``}renderHeatingSources(){const t=this.getActiveHeatingSources();return this.config.heating_entity&&!this.config.heating_sources?this.isHeating()?V`
        <div class="heating-indicator ${"compact"===this.config.display_mode?"compact":""}">
          <span class="heating-icon">${this.getHeatingIcon(this.config.heating_type||"electric")}</span>
          <span>${this.getHeatingLabel(this.config.heating_type||"electric")}</span>
        </div>
      `:V``:0===t.length?V``:V`
      <div class="heating-sources">
        ${t.map(t=>V`
          <div class="heating-source ${"compact"===this.config.display_mode?"compact":""}">
            <span class="heating-icon">${this.getHeatingIcon(t.type)}</span>
            <span>${t.name||this.getHeatingLabel(t.type)}</span>
            ${t.priority?V`<span class="priority">P${t.priority}</span>`:""}
          </div>
        `)}
      </div>
    `}renderTargetTemp(){const t=this.getTargetTemperature();if(null===t)return V``;const e=this.calculateTimeToTarget(),i="compact"===this.config.display_mode,o=!!this.config.show_target_control&&this.canSetTargetTemperature();return V`
      <div class="target-temp ${i?"compact":""}">
        ${o?V`
          <div class="target-control">
            <button class="step-button" @click=${t=>{t.stopPropagation(),this.setTargetTemperature(-1)}}
                    aria-label="-">−</button>
            <div class="target-value">${t.toFixed(1)} °C</div>
            <button class="step-button" @click=${t=>{t.stopPropagation(),this.setTargetTemperature(1)}}
                    aria-label="+">+</button>
          </div>
        `:V`
          <div>${this.t("target")}: ${t.toFixed(1)} °C</div>
        `}
        ${e?V`<div class="time-estimate">⏱️ ${e}</div>`:""}
      </div>
    `}renderOperationModes(){if(!this.config.show_operation_modes)return V``;const t=this.getOperationModes();return t?V`
      <div class="operation-modes">
        <div class="operation-label">${this.t("operation_mode")}</div>
        <div class="operation-chips">
          ${t.modes.map(e=>V`
            <button
              class="mode-chip ${e===t.current?"active":""}"
              @click=${()=>this.setOperationMode(e)}
            >
              ${this.t(`mode_${e.replace(/\s+/g,"_").toLowerCase()}`)||e}
            </button>
          `)}
        </div>
      </div>
    `:V``}renderHistoryChart(){if(!this.config.show_history_chart)return V``;const t=this.tempHistory.get("average")||[];return V`
      <div class="history-section">
        <button class="history-header" @click=${()=>{this.chartExpanded=!this.chartExpanded}}>
          <span>📈 ${this.t("history")}</span>
          <span class="history-toggle">${this.chartExpanded?"▾":"▸"}</span>
        </button>

        ${this.chartExpanded?t.length<2?V`<div class="no-history">${this.t("no_history")}</div>`:this.renderChartSvg(t):""}
      </div>
    `}renderChartSvg(t){const e=300,i=120,o=10,s=8,r=28,n=e-r-s,a=i-o-18,l=this.getTargetTemperature(),c=t.map(t=>t.value);null!==l&&c.push(l);const h=Math.min(...c),d=Math.max(...c),p=Math.max(1,.15*(d-h)),g=h-p,u=d+p,m=u-g||1,f=t[0].timestamp,_=t[t.length-1].timestamp,y=_-f||1,v=t=>r+(t-f)/y*n,b=t=>o+(1-(t-g)/m)*a,$=t.map(t=>`${v(t.timestamp).toFixed(1)},${b(t.value).toFixed(1)}`),x=`M ${$.join(" L ")}`,w=`${x} L ${r+n},${o+a} L ${r},${o+a} Z`,k=[];let S=null;t.forEach((e,i)=>{e.heating&&null===S&&(S=e.timestamp);const s=i===t.length-1;if((!e.heating||s)&&null!==S){const t=S;k.push(I`
          <rect x="${v(t)}" y="${o}" width="${Math.max(1,v(e.timestamp)-v(t))}"
                height="${a}" class="chart-heating-band"/>
        `),S=null}});const A=t=>new Date(t).toLocaleTimeString(this.hass?.locale?.language||void 0,{hour:"2-digit",minute:"2-digit"});return V`
      <svg class="history-chart" viewBox="0 0 ${e} ${i}" role="img">
        <defs>
          <linearGradient id="chartArea" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="var(--primary-color, #03a9f4)" stop-opacity="0.35"/>
            <stop offset="100%" stop-color="var(--primary-color, #03a9f4)" stop-opacity="0.02"/>
          </linearGradient>
        </defs>

        ${k}

        ${[u,(u+g)/2,g].map(t=>I`
          <line x1="${r}" y1="${b(t)}" x2="${e-s}" y2="${b(t)}"
                class="chart-grid"/>
          <text x="${r-4}" y="${b(t)+3}" class="chart-label" text-anchor="end">
            ${t.toFixed(0)}°
          </text>
        `)}

        ${null!==l?I`
          <line x1="${r}" y1="${b(l)}" x2="${e-s}" y2="${b(l)}"
                class="chart-target"/>
        `:I``}

        <path d="${w}" fill="url(#chartArea)"/>
        <path d="${x}" class="chart-line"/>
        <circle cx="${v(_)}" cy="${b(t[t.length-1].value)}" r="3" class="chart-dot"/>

        <text x="${r}" y="${116}" class="chart-label">${A(f)}</text>
        <text x="${e-s}" y="${116}" class="chart-label" text-anchor="end">${A(_)}</text>
      </svg>
    `}renderMaintenanceInfo(){const t=this.getDaysSince(this.config.anode_last_change),e=this.getDaysSince(this.config.cleaning_last_date),i=this.getMaintenanceStatus(t,this.config.anode_change_interval||365),o=this.getMaintenanceStatus(e,this.config.cleaning_interval||180);return null===t||"overdue"!==i.status&&"warning"!==i.status||this.sendNotification("maintenance_due",`${this.t("anode_check")}: ${i.text}`),null===e||"overdue"!==o.status&&"warning"!==o.status||this.sendNotification("maintenance_due",`${this.t("cleaning_check")}: ${o.text}`),null===t&&null===e?V``:V`
      <div class="maintenance-section">
        <div class="maintenance-title">${this.t("maintenance")}</div>

        ${null!==t?V`
          <div class="maintenance-item ${i.status}">
            <div class="maintenance-label">
              <span class="maintenance-icon">🔧</span>
              ${this.t("anode")}
            </div>
            <div class="maintenance-value">${i.text}</div>
          </div>
        `:""}

        ${null!==e?V`
          <div class="maintenance-item ${o.status}">
            <div class="maintenance-label">
              <span class="maintenance-icon">🧹</span>
              ${this.t("cleaning")}
            </div>
            <div class="maintenance-value">${o.text}</div>
          </div>
        `:""}
      </div>
    `}renderAlerts(){const t=this.checkAlerts(),e=this.getAverageTemperature(),i=this.hasLowTempWarning();return 0!==t.length||i?(i&&null!==e&&this.sendNotification("low_temperature",`${this.t("low_temperature")} (${e.toFixed(1)}°C)`),V`
      ${i?V`
        <div class="warning-banner">
          <span class="warning-icon">⚠️</span>
          <span>${this.t("low_temperature")} (${e?.toFixed(1)}°C)</span>
        </div>
      `:""}

      ${t.map(t=>(this.sendNotification(t.type,t.message||this.t(t.type)),V`
          <div class="warning-banner alert-${t.type}">
            <span class="warning-icon">
              ${"legionella_risk"===t.type?"🦠":"temperature_drop"===t.type?"❄️":"⚡"}
            </span>
            <span>${t.message||this.t(t.type)}</span>
          </div>
        `))}
    `):V``}renderControlButton(){if(!this.config.show_control_button||!this.config.control_entity)return V``;const t=this.getControlState(),e=this.hass?.states?.[this.config.control_entity];if(!e)return V``;const i=this.config.button_style||"default";return"switch"===i?V`
        <div class="control-section control-section-switch">
          <span class="control-label-left">${this.t("control")}</span>
          <label class="switch">
            <input type="checkbox" .checked=${t} @change=${()=>this.toggleControlEntity()}>
            <span class="slider"></span>
          </label>
        </div>
      `:"icon"===i?V`
        <div class="control-section control-section-icon">
          <button
            class="control-button-icon ${t?"on":"off"}"
            @click=${()=>this.toggleControlEntity()}
            title="${t?this.t("turn_off"):this.t("turn_on")}"
          >
            <span class="power-icon">⏻</span>
          </button>
        </div>
      `:"minimal"===i?V`
        <div class="control-section control-section-minimal">
          <button
            class="control-button-minimal ${t?"on":"off"}"
            @click=${()=>this.toggleControlEntity()}
            title="${this.t("control")}"
          >
            ${t?this.t("turn_off"):this.t("turn_on")}
          </button>
        </div>
      `:V`
      <div class="control-section">
        <button
          class="control-button ${t?"on":"off"}"
          @click=${()=>this.toggleControlEntity()}
          title="${this.t("control")}"
        >
          <span class="control-icon">${t?"🔴":"⚪"}</span>
          <span class="control-label">${t?this.t("turn_off"):this.t("turn_on")}</span>
        </button>
      </div>
    `}render(){if(!this.config||!this.hass)return V``;const t=this.getAverageTemperature(),e="compact"===this.config.display_mode,i=this.config.layout_style||"default",o=[...this.config.sensors||[]].sort((t,e)=>(t.position||0)-(e.position||0));return V`
      <ha-card class="layout-${i}">
        <div class="card-content ${e?"compact":""}">
          ${this.config.title?V`<h2 class="card-title">${this.config.title}</h2>`:""}

          ${this.renderStatusBadges()}

          ${this.renderAlerts()}

          ${this.renderControlButton()}

          ${this.renderOperationModes()}

          <div class="boiler-container ${e?"compact":""} layout-${i}">
            <div class="boiler-visual">
              ${this.renderBoilerSVG()}
              ${this.renderHeatingSources()}
              ${this.renderTargetTemp()}
              ${this.renderEnergyInfo()}
            </div>

            <div class="sensors-panel ${e?"compact":""}">
              ${o.length>0?V`
                <div class="sensors-list">
                  ${o.map(t=>this.renderSensor(t))}
                </div>
              `:V`
                <div class="no-sensors">${this.t("no_sensors")}</div>
              `}

              ${this.config.show_average&&null!==t?V`
                <div class="average-temp ${e?"compact":""}">
                  <div class="sensor-label">${this.t("average_temp")}</div>
                  <div class="sensor-value average" style="color: ${this.getTemperatureColor(t,!0)}">
                    ${t.toFixed(1)}°C
                  </div>
                </div>
              `:""}

              ${this.renderWaterStats()}

              ${this.renderMaintenanceInfo()}
            </div>
          </div>

          ${this.renderHistoryChart()}
        </div>
      </ha-card>
    `}static get styles(){return n`
      :host {
        display: block;
      }

      ha-card {
        padding: 16px;
      }

      .card-title {
        margin: 0 0 16px 0;
        font-size: 24px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .card-content {
        padding: 0;
      }

      .card-content.compact {
        font-size: 0.9em;
      }

      /* Status badges */
      .badges {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 16px;
      }

      .badge {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        border-radius: 16px;
        background: var(--secondary-background-color);
        font-size: 13px;
        font-weight: 500;
        color: var(--primary-text-color);
        white-space: nowrap;
      }

      .badge-icon {
        font-size: 14px;
        line-height: 1;
      }

      .badge-heating {
        background: rgba(255, 107, 53, 0.18);
        color: #FF6B35;
      }

      .badge-cooling {
        background: rgba(33, 150, 243, 0.18);
        color: #2196F3;
      }

      .badge-ready {
        background: rgba(76, 175, 80, 0.18);
        color: #4CAF50;
      }

      .warning-banner {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 16px;
        background: rgba(255, 152, 0, 0.15);
        border-left: 4px solid #ff9800;
        border-radius: 4px;
        margin-bottom: 16px;
        font-weight: 500;
        color: #ff9800;
      }

      .warning-icon {
        font-size: 20px;
      }

      .control-section {
        display: flex;
        justify-content: center;
        margin-bottom: 16px;
      }

      .control-button {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 24px;
        border: none;
        border-radius: 24px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      }

      .control-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      }

      .control-button:active {
        transform: translateY(0);
      }

      .control-button.on {
        background: linear-gradient(135deg, #f44336 0%, #e53935 100%);
        color: white;
      }

      .control-button.off {
        background: linear-gradient(135deg, #78909c 0%, #607d8b 100%);
        color: white;
      }

      .control-icon {
        font-size: 20px;
      }

      .control-label {
        user-select: none;
      }

      /* Button Style Variants (v1.5.0) */
      .control-section-switch {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        background: var(--secondary-background-color);
        border-radius: 12px;
        margin-bottom: 16px;
        max-width: 300px;
        margin-left: auto;
        margin-right: auto;
      }

      .control-label-left {
        font-size: 16px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .switch {
        position: relative;
        display: inline-block;
        width: 51px;
        height: 28px;
      }

      .switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: .4s;
        border-radius: 28px;
      }

      .slider:before {
        position: absolute;
        content: "";
        height: 20px;
        width: 20px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        transition: .4s;
        border-radius: 50%;
      }

      input:checked + .slider {
        background-color: #4CAF50;
      }

      input:checked + .slider:before {
        transform: translateX(23px);
      }

      .control-section-icon {
        display: flex;
        justify-content: center;
        margin-bottom: 16px;
      }

      .control-button-icon {
        width: 56px;
        height: 56px;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      }

      .control-button-icon.on {
        background: #4CAF50;
        color: white;
      }

      .control-button-icon.off {
        background: #9E9E9E;
        color: white;
      }

      .control-button-icon:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      }

      .power-icon {
        font-size: 28px;
        font-weight: bold;
      }

      .control-section-minimal {
        display: flex;
        justify-content: center;
        margin-bottom: 16px;
      }

      .control-button-minimal {
        padding: 8px 20px;
        border: 2px solid var(--divider-color);
        border-radius: 8px;
        background: transparent;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.2s ease;
      }

      .control-button-minimal.on {
        border-color: #4CAF50;
        color: #4CAF50;
      }

      .control-button-minimal.off {
        border-color: var(--secondary-text-color);
        color: var(--secondary-text-color);
      }

      .control-button-minimal:hover {
        background: var(--secondary-background-color);
      }

      /* Operation modes (v1.6.0) */
      .operation-modes {
        display: flex;
        align-items: center;
        gap: 12px;
        flex-wrap: wrap;
        margin-bottom: 16px;
      }

      .operation-label {
        font-size: 13px;
        font-weight: 500;
        color: var(--secondary-text-color);
      }

      .operation-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }

      .mode-chip {
        padding: 6px 14px;
        border: 1px solid var(--divider-color);
        border-radius: 16px;
        background: transparent;
        color: var(--primary-text-color);
        font-size: 13px;
        cursor: pointer;
        transition: background 0.2s, border-color 0.2s;
      }

      .mode-chip:hover {
        background: var(--secondary-background-color);
      }

      .mode-chip.active {
        background: var(--primary-color);
        border-color: var(--primary-color);
        color: var(--text-primary-color, #fff);
        font-weight: 600;
      }

      /* Layout Style Variants (v1.5.0) */
      .layout-horizontal .boiler-container {
        flex-direction: row;
        max-width: 100%;
      }

      .layout-horizontal .boiler-visual {
        min-width: 180px;
      }

      .layout-horizontal .boiler-svg {
        width: 180px;
        height: 270px;
      }

      .layout-minimal .boiler-container {
        gap: 16px;
      }

      .layout-minimal .boiler-visual {
        min-width: 150px;
      }

      .layout-minimal .boiler-svg {
        width: 150px;
        height: 225px;
      }

      .layout-minimal .card-title {
        font-size: 20px;
        margin-bottom: 12px;
      }

      .layout-minimal .sensor-row {
        padding: 8px 12px;
      }

      .layout-minimal .sensor-value {
        font-size: 16px;
      }

      .layout-wide .boiler-container {
        gap: 32px;
      }

      .layout-wide .boiler-visual {
        min-width: 250px;
      }

      .layout-wide .boiler-svg {
        width: 250px;
        height: 375px;
      }

      .layout-wide .sensor-row {
        padding: 14px;
      }

      .layout-wide .sensor-value {
        font-size: 22px;
      }

      .boiler-container {
        display: flex;
        flex-wrap: wrap;
        gap: 24px;
        align-items: flex-start;
        justify-content: center;
        width: 100%;
        overflow: hidden;
      }

      .boiler-container.compact {
        gap: 16px;
      }

      .boiler-visual {
        flex: 0 0 auto;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        min-width: 200px;
      }

      .boiler-visual.compact {
        min-width: 150px;
      }

      .boiler-svg {
        width: 200px;
        height: 300px;
        filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.12));
      }

      .boiler-svg.compact {
        width: 150px;
        height: 225px;
      }

      .boiler-svg.clickable {
        cursor: pointer;
      }

      /* SVG parts (v1.6.0) */
      .insulation {
        fill: var(--divider-color, #b0bec5);
        opacity: 0.35;
      }

      .leg, .leg-base {
        fill: var(--secondary-text-color, #78909c);
        opacity: 0.55;
      }

      .panel-bg {
        fill: #263238;
        opacity: 0.9;
      }

      .panel-temp {
        fill: #ffffff;
        font-size: 17px;
        font-weight: 700;
        font-family: var(--paper-font-body1_-_font-family, inherit);
      }

      .panel-target {
        fill: #ffffff;
        font-size: 7px;
        opacity: 0.8;
        font-family: var(--paper-font-body1_-_font-family, inherit);
      }

      .panel-led {
        fill: #9e9e9e;
      }

      .led-heating {
        fill: #FF6B35;
        animation: pulse 1.5s ease-in-out infinite;
      }

      .led-ready {
        fill: #4CAF50;
      }

      .led-cooling {
        fill: #42A5F5;
      }

      .pipe {
        stroke-width: 7;
        stroke-linecap: round;
      }

      .pipe-hot {
        stroke: #EF5350;
      }

      .pipe-cold {
        stroke: #42A5F5;
      }

      .pipe-cap {
        fill: var(--secondary-text-color, #78909c);
      }

      .pipe-flow {
        stroke: #ffffff;
        stroke-width: 2.5;
        stroke-linecap: round;
        stroke-dasharray: 4 8;
        opacity: 0.85;
        animation: flow-dash 1.2s linear infinite;
      }

      .flow-in {
        animation-direction: reverse;
      }

      .scale-tick {
        stroke: var(--secondary-text-color, #9e9e9e);
        stroke-width: 1;
        opacity: 0.7;
      }

      .scale-label {
        fill: var(--secondary-text-color, #9e9e9e);
        font-size: 9px;
        font-family: var(--paper-font-body1_-_font-family, inherit);
      }

      .target-line {
        stroke: var(--primary-color, #03a9f4);
        stroke-width: 1.5;
        stroke-dasharray: 4 3;
        opacity: 0.9;
      }

      .target-arrow {
        fill: var(--primary-color, #03a9f4);
      }

      .marker-line {
        stroke: #ffffff;
        stroke-width: 0.75;
        stroke-dasharray: 2 3;
        opacity: 0.45;
      }

      .marker-label, .level-label {
        fill: #ffffff;
        font-size: 10px;
        font-weight: 600;
        font-family: var(--paper-font-body1_-_font-family, inherit);
        paint-order: stroke;
        stroke: rgba(0, 0, 0, 0.35);
        stroke-width: 0.6px;
      }

      .sensor-marker {
        cursor: pointer;
      }

      /* Animations */
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.6; }
      }

      @keyframes bubble-rise {
        0% { transform: translateY(0); opacity: 0.7; }
        100% { transform: translateY(-185px); opacity: 0; }
      }

      @keyframes flow-dash {
        from { stroke-dashoffset: 12; }
        to { stroke-dashoffset: 0; }
      }

      .heating-element.active path {
        animation: pulse 1.5s ease-in-out infinite;
      }

      .bubble {
        animation: bubble-rise 3s ease-in infinite;
      }

      .bubble-1 { animation-delay: 0s; animation-duration: 3s; }
      .bubble-2 { animation-delay: 0.7s; animation-duration: 3.5s; }
      .bubble-3 { animation-delay: 1.4s; animation-duration: 2.8s; }
      .bubble-4 { animation-delay: 2.1s; animation-duration: 3.2s; }
      .bubble-5 { animation-delay: 1.1s; animation-duration: 3.8s; }

      @media (prefers-reduced-motion: reduce) {
        .bubble, .pipe-flow, .heating-element.active path,
        .heating-indicator, .heating-source, .led-heating {
          animation: none;
        }
      }

      /* Heating indicators */
      .heating-indicator, .heating-source {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        background: rgba(255, 107, 53, 0.2);
        border-radius: 20px;
        font-weight: 500;
        color: #FF6B35;
        animation: pulse 2s ease-in-out infinite;
      }

      .heating-sources {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .heating-indicator.compact, .heating-source.compact {
        padding: 6px 12px;
        font-size: 0.9em;
      }

      .heating-icon {
        font-size: 20px;
      }

      .priority {
        font-size: 0.8em;
        opacity: 0.7;
        margin-left: auto;
      }

      /* Energy info */
      .energy-info {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 8px 12px;
        background: var(--secondary-background-color);
        border-radius: 12px;
        font-size: 13px;
        width: 100%;
        box-sizing: border-box;
      }

      .energy-label {
        color: var(--secondary-text-color);
        font-weight: 500;
      }

      .energy-values {
        display: flex;
        gap: 12px;
        align-items: baseline;
      }

      .energy-today {
        border-top: 1px solid var(--divider-color);
        padding-top: 4px;
        margin-top: 2px;
      }

      .energy-today-label {
        font-size: 12px;
        color: var(--secondary-text-color);
      }

      .energy-power {
        font-size: 16px;
        font-weight: 600;
        color: var(--primary-color);
      }

      .energy-cost {
        font-size: 12px;
        color: var(--secondary-text-color);
      }

      .target-temp {
        padding: 6px 12px;
        background: var(--secondary-background-color);
        border-radius: 12px;
        font-size: 14px;
        color: var(--secondary-text-color);
        text-align: center;
      }

      .target-temp.compact {
        padding: 4px 8px;
        font-size: 12px;
      }

      .target-control {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .target-value {
        font-size: 18px;
        font-weight: 600;
        color: var(--primary-text-color);
        font-variant-numeric: tabular-nums;
        min-width: 70px;
      }

      .step-button {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: none;
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        font-size: 18px;
        line-height: 1;
        cursor: pointer;
        transition: transform 0.15s ease, opacity 0.15s ease;
      }

      .step-button:hover {
        transform: scale(1.1);
      }

      .step-button:active {
        opacity: 0.7;
      }

      .time-estimate {
        margin-top: 4px;
        font-size: 12px;
        color: var(--primary-color);
        font-weight: 500;
      }

      .sensors-panel {
        flex: 1 1 240px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        min-width: 240px;
        max-width: 100%;
        overflow: hidden;
      }

      .sensors-panel.compact {
        gap: 12px;
      }

      .sensors-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .sensor-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px;
        background: var(--secondary-background-color);
        border-radius: 8px;
        transition: transform 0.2s, box-shadow 0.2s;
        min-width: 0;
        overflow: hidden;
      }

      .sensor-row.compact {
        padding: 8px 10px;
      }

      .sensor-row.clickable {
        cursor: pointer;
      }

      .sensor-row.clickable:hover {
        transform: translateX(4px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .sensor-info {
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 0;
        flex: 1;
      }

      .sensor-label {
        font-size: 14px;
        color: var(--secondary-text-color);
        font-weight: 400;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex-shrink: 1;
      }

      .sensor-readout {
        display: flex;
        align-items: baseline;
        gap: 8px;
        flex-shrink: 0;
      }

      .sensor-value {
        font-size: 20px;
        font-weight: 600;
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
        flex-shrink: 0;
      }

      .sensor-row.compact .sensor-value {
        font-size: 16px;
      }

      .trend {
        font-size: 12px;
        font-weight: 600;
        white-space: nowrap;
        opacity: 0.9;
      }

      .trend-up {
        color: var(--error-color, #f44336);
      }

      .trend-down {
        color: var(--info-color, #2196f3);
      }

      .trend-flat {
        color: var(--secondary-text-color);
      }

      /* Sparkline */
      .sparkline {
        opacity: 0.6;
        color: var(--primary-color);
      }

      .sensor-row.unavailable {
        opacity: 0.6;
        background: rgba(244, 67, 54, 0.1);
        border: 1px solid var(--error-color, #f44336);
      }

      .sensor-row.unavailable .sensor-value {
        color: var(--error-color, #f44336) !important;
      }

      .average-temp {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        background: var(--primary-background-color);
        border: 2px solid var(--divider-color);
        border-radius: 12px;
        margin-top: 8px;
      }

      .average-temp.compact {
        padding: 12px;
      }

      .sensor-value.average {
        font-size: 24px;
      }

      .average-temp.compact .sensor-value.average {
        font-size: 20px;
      }

      /* Water statistics (v1.6.0) */
      .water-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
        gap: 8px;
      }

      .stat {
        padding: 10px 12px;
        background: var(--secondary-background-color);
        border-radius: 8px;
        min-width: 0;
      }

      .stat-label {
        font-size: 12px;
        color: var(--secondary-text-color);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .stat-value {
        font-size: 18px;
        font-weight: 600;
        color: var(--primary-text-color);
        font-variant-numeric: tabular-nums;
        margin-top: 2px;
      }

      .stat-sub {
        font-size: 11px;
        color: var(--secondary-text-color);
        margin-top: 2px;
      }

      /* History chart (v1.6.0) */
      .history-section {
        margin-top: 16px;
        border-top: 1px solid var(--divider-color);
        padding-top: 8px;
      }

      .history-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 8px 4px;
        border: none;
        background: transparent;
        color: var(--primary-text-color);
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
      }

      .history-toggle {
        color: var(--secondary-text-color);
      }

      .history-chart {
        width: 100%;
        height: auto;
      }

      .chart-grid {
        stroke: var(--divider-color, #cfd8dc);
        stroke-width: 0.5;
        opacity: 0.8;
      }

      .chart-label {
        fill: var(--secondary-text-color, #9e9e9e);
        font-size: 8px;
        font-family: var(--paper-font-body1_-_font-family, inherit);
      }

      .chart-line {
        fill: none;
        stroke: var(--primary-color, #03a9f4);
        stroke-width: 2;
        stroke-linejoin: round;
        stroke-linecap: round;
      }

      .chart-dot {
        fill: var(--primary-color, #03a9f4);
      }

      .chart-target {
        stroke: var(--warning-color, #ff9800);
        stroke-width: 1;
        stroke-dasharray: 4 3;
      }

      .chart-heating-band {
        fill: #FF6B35;
        opacity: 0.12;
      }

      .no-history {
        padding: 16px;
        text-align: center;
        color: var(--secondary-text-color);
        font-size: 13px;
        font-style: italic;
      }

      .maintenance-section {
        margin-top: 8px;
        padding: 12px;
        background: var(--secondary-background-color);
        border-radius: 8px;
      }

      .maintenance-title {
        font-size: 14px;
        font-weight: 600;
        color: var(--primary-text-color);
        margin-bottom: 12px;
      }

      .maintenance-item {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
        border-bottom: 1px solid var(--divider-color);
      }

      .maintenance-item:last-child {
        border-bottom: none;
      }

      .maintenance-label {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
        color: var(--secondary-text-color);
      }

      .maintenance-icon {
        font-size: 16px;
      }

      .maintenance-value {
        font-size: 13px;
        font-weight: 500;
      }

      .maintenance-item.ok .maintenance-value {
        color: var(--success-color, #4caf50);
      }

      .maintenance-item.warning .maintenance-value {
        color: var(--warning-color, #ff9800);
      }

      .maintenance-item.overdue .maintenance-value {
        color: var(--error-color, #f44336);
        font-weight: 600;
      }

      .no-sensors {
        padding: 24px;
        text-align: center;
        color: var(--secondary-text-color);
        font-style: italic;
      }

      @media (max-width: 600px) {
        .boiler-container {
          flex-direction: column;
        }

        .boiler-svg {
          width: 170px;
          height: 255px;
        }

        .sensors-panel {
          width: 100%;
        }
      }
    `}getCardSize(){let t="compact"===this.config.display_mode?4:5;return this.config.show_status_badges&&(t+=1),this.config.show_water_stats&&this.config.tank_volume&&(t+=1),this.config.show_history_chart&&this.chartExpanded&&(t+=2),t}static getConfigElement(){return document.createElement("ha-boiler-card-editor")}static getStubConfig(){return{type:"custom:ha-boiler-card",title:"Bojler",show_average:!0,show_gradient:!0,show_stratification:!0,show_sparkline:!1,display_mode:"normal",heating_type:"electric",min_temp:0,max_temp:80,enable_more_info:!0,advanced_animations:!0,show_scale:!0,show_sensor_markers:!0,show_display_panel:!0,show_status_badges:!0,tank_volume:120,sensors:[]}}};t([ut({attribute:!1})],zt.prototype,"hass",void 0),t([mt()],zt.prototype,"config",void 0),t([mt()],zt.prototype,"tempHistory",void 0),t([mt()],zt.prototype,"lastNotificationTime",void 0),t([mt()],zt.prototype,"chartExpanded",void 0),zt=Et=t([dt("ha-boiler-card")],zt),window.customCards=window.customCards||[],window.customCards.push({type:"custom:ha-boiler-card",name:"Boiler Card",description:"Custom card for displaying water heater with temperature sensors",preview:!0,documentationURL:"https://github.com/joshuaaaaa/HA-Water-Heater"}),console.info("%c HA-BOILER-CARD %c v1.6.0 ","color: white; background: #03a9f4; font-weight: 700;","color: #03a9f4; background: white; font-weight: 700;");export{zt as BoilerCard};
//# sourceMappingURL=ha-boiler-card.js.map
