function e(e,t,i,s){var n,r=arguments.length,o=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(r<3?n(o):r>3?n(t,i,o):n(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;let r=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=n.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(t,e))}return e}toString(){return this.cssText}};const o=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1],e[0]);return new r(i,e,s)},a=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new r("string"==typeof e?e:e+"",void 0,s))(t)})(e):e,{is:l,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:p,getOwnPropertySymbols:d,getPrototypeOf:u}=Object,g=globalThis,m=g.trustedTypes,f=m?m.emptyScript:"",_=g.reactiveElementPolyfillSupport,y=(e,t)=>e,v={toAttribute(e,t){switch(t){case Boolean:e=e?f:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},$=(e,t)=>!l(e,t),b={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:$};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=b){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);void 0!==s&&c(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:n}=h(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:s,set(t){const r=s?.call(this);n?.call(this,t),this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??b}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const e=this.properties,t=[...p(e),...d(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,s)=>{if(i)e.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of s){const s=document.createElement("style"),n=t.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=i.cssText,e.appendChild(s)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(t,i.type);this._$Em=e,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(e,t){const i=this.constructor,s=i._$Eh.get(e);if(void 0!==s&&this._$Em!==s){const e=i.getPropertyOptions(s),n="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:v;this._$Em=s;const r=n.fromAttribute(t,e.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(e,t,i,s=!1,n){if(void 0!==e){const r=this.constructor;if(!1===s&&(n=this[e]),i??=r.getPropertyOptions(e),!((i.hasChanged??$)(n,t)||i.useDefault&&i.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:n},r){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),!0!==n||void 0!==r)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===s&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,s=this[t];!0!==e||this._$AL.has(t)||void 0===s||this.C(t,void 0,i,s)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[y("elementProperties")]=new Map,w[y("finalized")]=new Map,_?.({ReactiveElement:w}),(g.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,A=e=>e,k=x.trustedTypes,E=k?k.createPolicy("lit-html",{createHTML:e=>e}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,H="?"+C,T=`<${H}>`,P=document,z=()=>P.createComment(""),F=e=>null===e||"object"!=typeof e&&"function"!=typeof e,M=Array.isArray,N="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,B=/>/g,R=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,j=/"/g,L=/^(?:script|style|textarea|title)$/i,I=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),V=I(1),W=I(2),q=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),Z=new WeakMap,K=P.createTreeWalker(P,129);function J(e,t){if(!M(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(t):t}const Y=(e,t)=>{const i=e.length-1,s=[];let n,r=2===t?"<svg>":3===t?"<math>":"",o=U;for(let t=0;t<i;t++){const i=e[t];let a,l,c=-1,h=0;for(;h<i.length&&(o.lastIndex=h,l=o.exec(i),null!==l);)h=o.lastIndex,o===U?"!--"===l[1]?o=O:void 0!==l[1]?o=B:void 0!==l[2]?(L.test(l[2])&&(n=RegExp("</"+l[2],"g")),o=R):void 0!==l[3]&&(o=R):o===R?">"===l[0]?(o=n??U,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?R:'"'===l[3]?j:D):o===j||o===D?o=R:o===O||o===B?o=U:(o=R,n=void 0);const p=o===R&&e[t+1].startsWith("/>")?" ":"";r+=o===U?i+T:c>=0?(s.push(a),i.slice(0,c)+S+i.slice(c)+C+p):i+C+(-2===c?t:p)}return[J(e,r+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),s]};class X{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let n=0,r=0;const o=e.length-1,a=this.parts,[l,c]=Y(e,t);if(this.el=X.createElement(l,i),K.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(s=K.nextNode())&&a.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const e of s.getAttributeNames())if(e.endsWith(S)){const t=c[r++],i=s.getAttribute(e).split(C),o=/([.?@])?(.*)/.exec(t);a.push({type:1,index:n,name:o[2],strings:i,ctor:"."===o[1]?se:"?"===o[1]?ne:"@"===o[1]?re:ie}),s.removeAttribute(e)}else e.startsWith(C)&&(a.push({type:6,index:n}),s.removeAttribute(e));if(L.test(s.tagName)){const e=s.textContent.split(C),t=e.length-1;if(t>0){s.textContent=k?k.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],z()),K.nextNode(),a.push({type:2,index:++n});s.append(e[t],z())}}}else if(8===s.nodeType)if(s.data===H)a.push({type:2,index:n});else{let e=-1;for(;-1!==(e=s.data.indexOf(C,e+1));)a.push({type:7,index:n}),e+=C.length-1}n++}}static createElement(e,t){const i=P.createElement("template");return i.innerHTML=e,i}}function Q(e,t,i=e,s){if(t===q)return t;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const r=F(t)?void 0:t._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),void 0===r?n=void 0:(n=new r(e),n._$AT(e,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(t=Q(e,n._$AS(e,t.values),n,s)),t}class ee{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??P).importNode(t,!0);K.currentNode=s;let n=K.nextNode(),r=0,o=0,a=i[0];for(;void 0!==a;){if(r===a.index){let t;2===a.type?t=new te(n,n.nextSibling,this,e):1===a.type?t=new a.ctor(n,a.name,a.strings,this,e):6===a.type&&(t=new oe(n,this,e)),this._$AV.push(t),a=i[++o]}r!==a?.index&&(n=K.nextNode(),r++)}return K.currentNode=P,s}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class te{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Q(this,e,t),F(e)?e===G||null==e||""===e?(this._$AH!==G&&this._$AR(),this._$AH=G):e!==this._$AH&&e!==q&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>M(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==G&&F(this._$AH)?this._$AA.nextSibling.data=e:this.T(P.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,s="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=X.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{const e=new ee(s,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=Z.get(e.strings);return void 0===t&&Z.set(e.strings,t=new X(e)),t}k(e){M(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const n of e)s===t.length?t.push(i=new te(this.O(z()),this.O(z()),this,this.options)):i=t[s],i._$AI(n),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=A(e).nextSibling;A(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ie{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,n){this.type=1,this._$AH=G,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=G}_$AI(e,t=this,i,s){const n=this.strings;let r=!1;if(void 0===n)e=Q(this,e,t,0),r=!F(e)||e!==this._$AH&&e!==q,r&&(this._$AH=e);else{const s=e;let o,a;for(e=n[0],o=0;o<n.length-1;o++)a=Q(this,s[i+o],t,o),a===q&&(a=this._$AH[o]),r||=!F(a)||a!==this._$AH[o],a===G?e=G:e!==G&&(e+=(a??"")+n[o+1]),this._$AH[o]=a}r&&!s&&this.j(e)}j(e){e===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class se extends ie{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===G?void 0:e}}class ne extends ie{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==G)}}class re extends ie{constructor(e,t,i,s,n){super(e,t,i,s,n),this.type=5}_$AI(e,t=this){if((e=Q(this,e,t,0)??G)===q)return;const i=this._$AH,s=e===G&&i!==G||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,n=e!==G&&(i===G||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class oe{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Q(this,e)}}const ae=x.litHtmlPolyfillSupport;ae?.(X,te),(x.litHtmlVersions??=[]).push("3.3.2");const le=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ce extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const s=i?.renderBefore??t;let n=s._$litPart$;if(void 0===n){const e=i?.renderBefore??null;s._$litPart$=n=new te(t.insertBefore(z(),e),e,void 0,i??{})}return n._$AI(e),n})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}ce._$litElement$=!0,ce.finalized=!0,le.litElementHydrateSupport?.({LitElement:ce});const he=le.litElementPolyfillSupport;he?.({LitElement:ce}),(le.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pe={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:$},de=(e=pe,t,i)=>{const{kind:s,metadata:n}=i;let r=globalThis.litPropertyMetadata.get(n);if(void 0===r&&globalThis.litPropertyMetadata.set(n,r=new Map),"setter"===s&&((e=Object.create(e)).wrapped=!0),r.set(i.name,e),"accessor"===s){const{name:s}=i;return{set(i){const n=t.get.call(this);t.set.call(this,i),this.requestUpdate(s,n,e,!0,i)},init(t){return void 0!==t&&this.C(s,void 0,e,t),t}}}if("setter"===s){const{name:s}=i;return function(i){const n=this[s];t.call(this,i),this.requestUpdate(s,n,e,!0,i)}}throw Error("Unsupported decorator location: "+s)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ue(e){return(t,i)=>"object"==typeof i?de(e,t,i):((e,t,i)=>{const s=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),s?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ge(e){return ue({...e,state:!0,attribute:!1})}const me={ocean:{boiler_fill:"#4DD0E1",boiler_stroke:"#0097A7",cold_water:"#B3E5FC",warm_water:"#4FC3F7",hot_water:"#0288D1",gradient_start:"#E1F5FE",gradient_end:"#01579B"},sunset:{boiler_fill:"#FF9800",boiler_stroke:"#E65100",cold_water:"#FFE0B2",warm_water:"#FFB74D",hot_water:"#E64A19",gradient_start:"#FFF3E0",gradient_end:"#BF360C"},forest:{boiler_fill:"#66BB6A",boiler_stroke:"#2E7D32",cold_water:"#C8E6C9",warm_water:"#81C784",hot_water:"#43A047",gradient_start:"#E8F5E9",gradient_end:"#1B5E20"},fire:{boiler_fill:"#FF5722",boiler_stroke:"#BF360C",cold_water:"#FFCCBC",warm_water:"#FF7043",hot_water:"#D84315",gradient_start:"#FBE9E7",gradient_end:"#4E342E"},ice:{boiler_fill:"#81D4FA",boiler_stroke:"#0277BD",cold_water:"#E1F5FE",warm_water:"#4FC3F7",hot_water:"#0288D1",gradient_start:"#F1F8FB",gradient_end:"#01579B"}},fe={cs:{average_temp:"Průměrná teplota",heating:"Topí se",target:"Cílová teplota",anode_check:"Kontrola anody",cleaning_check:"Čištění",days_remaining:"zbývá dní",overdue:"po termínu",power_consumption:"Spotřeba",heating_source:"Zdroj ohřevu",low_temperature:"Nízká teplota!",temperature_drop:"Prudký pokles teploty!",legionella_risk:"Riziko legionely - ohřejte na 60°C",unusual_consumption:"Neobvyklá spotřeba energie",maintenance_due:"Údržba je potřeba"},en:{average_temp:"Average Temperature",heating:"Heating",target:"Target Temperature",anode_check:"Anode Check",cleaning_check:"Cleaning",days_remaining:"days remaining",overdue:"overdue",power_consumption:"Consumption",heating_source:"Heating Source",low_temperature:"Low temperature!",temperature_drop:"Rapid temperature drop!",legionella_risk:"Legionella risk - heat to 60°C",unusual_consumption:"Unusual energy consumption",maintenance_due:"Maintenance required"},de:{average_temp:"Durchschnittstemperatur",heating:"Heizung",target:"Zieltemperatur",anode_check:"Anode Prüfung",cleaning_check:"Reinigung",days_remaining:"Tage übrig",overdue:"überfällig",power_consumption:"Verbrauch",heating_source:"Heizquelle",low_temperature:"Niedrige Temperatur!",temperature_drop:"Schneller Temperaturabfall!",legionella_risk:"Legionellen-Risiko - auf 60°C erhitzen",unusual_consumption:"Ungewöhnlicher Energieverbrauch",maintenance_due:"Wartung erforderlich"},sk:{average_temp:"Priemerná teplota",heating:"Kúrenie",target:"Cieľová teplota",anode_check:"Kontrola anódy",cleaning_check:"Čistenie",days_remaining:"zostáva dní",overdue:"po termíne",power_consumption:"Spotreba",heating_source:"Zdroj kúrenia",low_temperature:"Nízka teplota!",temperature_drop:"Prudký pokles teploty!",legionella_risk:"Riziko legionely - ohrejte na 60°C",unusual_consumption:"Neobvyklá spotreba energie",maintenance_due:"Údržba je potrebná"},pl:{average_temp:"Średnia temperatura",heating:"Ogrzewanie",target:"Temperatura docelowa",anode_check:"Sprawdzenie anody",cleaning_check:"Czyszczenie",days_remaining:"dni pozostało",overdue:"po terminie",power_consumption:"Zużycie",heating_source:"Źródło ogrzewania",low_temperature:"Niska temperatura!",temperature_drop:"Szybki spadek temperatury!",legionella_risk:"Ryzyko legionelli - podgrzej do 60°C",unusual_consumption:"Niezwykłe zużycie energii",maintenance_due:"Wymagana konserwacja"}};let _e=class extends ce{constructor(){super(...arguments),this.tempHistory=new Map}setConfig(e){if(!e)throw new Error("Invalid configuration");this.config={show_average:!0,show_gradient:!0,show_stratification:!0,show_sparkline:!1,min_temp:0,max_temp:100,display_mode:"normal",heating_type:"electric",anode_change_interval:365,cleaning_interval:180,enable_more_info:!0,energy_cost:0,advanced_animations:!0,...e}}shouldUpdate(e){return!!this.config&&(!e.has("hass")||(this.hass?.states&&this.config.target_temp_entity&&this.updateTempHistory(),!0))}updateTempHistory(){if(!this.config.sensors)return;const e=Date.now(),t=e-18e5;this.config.sensors.forEach(i=>{const s=this.getSensorValue(i.entity);if(null===s)return;this.tempHistory.has(i.entity)||this.tempHistory.set(i.entity,[]);const n=this.tempHistory.get(i.entity);n.push({value:s,timestamp:e}),this.tempHistory.set(i.entity,n.filter(e=>e.timestamp>t))});const i=this.getAverageTemperature();if(null!==i){this.tempHistory.has("average")||this.tempHistory.set("average",[]);const s=this.tempHistory.get("average");s.push({value:i,timestamp:e}),this.tempHistory.set("average",s.filter(e=>e.timestamp>t))}}getSensorValue(e){if(!this.hass?.states)return null;const t=this.hass.states[e];if(!t)return null;const i=parseFloat(t.state);return isNaN(i)?null:i}getAverageTemperature(){if(!this.config.sensors||0===this.config.sensors.length)return null;const e=[];return this.config.sensors.forEach(t=>{const i=this.getSensorValue(t.entity);null!==i&&e.push(i)}),0===e.length?null:e.reduce((e,t)=>e+t,0)/e.length}isHeating(){if(!this.config.heating_entity||!this.hass?.states)return!1;const e=this.hass.states[this.config.heating_entity];return e&&("on"===e.state||"heating"===e.state)}getActiveHeatingSources(){return this.config.heating_sources&&this.hass?.states?this.config.heating_sources.filter(e=>{const t=this.hass.states[e.entity];return t&&("on"===t.state||"heating"===t.state)}).sort((e,t)=>(e.priority||0)-(t.priority||0)):[]}getPowerConsumption(){if(!this.config.power_entity||!this.hass?.states)return null;const e=this.getSensorValue(this.config.power_entity);if(null===e)return null;return{power:e,cost:e/1e3*(this.config.energy_cost||0)}}getColors(){const e={boiler_fill:"#4CAF50",boiler_stroke:"#388E3C",cold_water:"#2196F3",warm_water:"#FF9800",hot_water:"#F44336",gradient_start:"#2196F3",gradient_end:"#F44336"};return this.config.theme&&"custom"!==this.config.theme&&me[this.config.theme]?{...e,...me[this.config.theme]}:this.config.colors?{...e,...this.config.colors}:e}t(e){const t=this.config.language||"cs",i=fe[t]||fe.cs;return this.config.custom_labels&&this.config.custom_labels[e]?this.config.custom_labels[e]:i[e]||e}checkAlerts(){if(!this.config.alerts)return[];const e=[],t=this.getAverageTemperature();return this.config.alerts.forEach(i=>{if(!1!==i.enabled)switch(i.type){case"temperature_drop":{const s=this.tempHistory.get("average");if(s&&s.length>=2&&null!==t){const n=Date.now()-36e5,r=s.find(e=>e.timestamp<n);r&&r.value-t>(i.threshold||10)&&e.push(i)}break}case"legionella_risk":{const s=this.tempHistory.get("average"),n=i.min_temp||60,r=60*(i.duration||168)*60*1e3;if(s&&s.length>0){const o=Date.now()-r,a=s.some(e=>e.timestamp>o&&e.value>=n);!a&&null!==t&&t<n&&e.push(i)}break}case"unusual_consumption":{const t=this.getPowerConsumption();if(t&&i.threshold){const s=i.threshold;t.power>s&&e.push(i)}break}}}),e}sendNotification(e,t){if(!this.config.notifications?.enabled)return;if(!this.config.notifications.events?.includes(e))return;if(!this.hass)return;const i=this.config.notifications.service||"persistent_notification.create",[s,n]=i.split(".");this.hass.callService(s,n,{message:t,title:"HA Boiler Card"})}getTemperatureColor(e){if(null===e)return"#888";const t=this.getColors(),i=this.config.min_temp||0,s=this.config.max_temp||100,n=Math.max(0,Math.min(1,(e-i)/(s-i)));return n<.3?t.cold_water||"#2196F3":n<.6?t.warm_water||"#FF9800":t.hot_water||"#F44336"}getHeatingIcon(e){switch(e){case"solar":return"☀️";case"gas":return"🔥";case"heat_pump":return"🌡️";default:return"⚡"}}getHeatingLabel(e){switch(e){case"solar":return"Solární ohřev";case"gas":return"Plynový ohřev";case"heat_pump":return"Tepelné čerpadlo";default:return"Elektrický ohřev"}}calculateTimeToTarget(){if(!this.config.target_temp_entity)return null;const e=this.getSensorValue(this.config.target_temp_entity),t=this.getAverageTemperature();if(null===e||null===t)return null;if(t>=e)return null;if(!this.isHeating()&&0===this.getActiveHeatingSources().length)return null;const i=this.tempHistory.get("average");if(!i||i.length<2)return null;const s=i[0],n=i[i.length-1],r=(n.timestamp-s.timestamp)/1e3/60,o=n.value-s.value;if(r<5||o<=0)return null;const a=o/r,l=e-t,c=Math.ceil(l/a);if(c<60)return`~${c} min`;return`~${Math.floor(c/60)}h ${c%60}min`}getDaysSince(e){if(!e)return null;try{const t=new Date(e),i=(new Date).getTime()-t.getTime();return Math.floor(i/864e5)}catch{return null}}getMaintenanceStatus(e,t){if(null===e)return{status:"ok",text:"Nenastaveno"};const i=t-e;return i<=0?{status:"overdue",text:`Po termínu (${-i} dní)`}:i<=30?{status:"warning",text:`Zbývá ${i} dní`}:{status:"ok",text:`Zbývá ${i} dní`}}hasLowTempWarning(){if(!this.config.low_temp_warning)return!1;const e=this.getAverageTemperature();return null!==e&&e<this.config.low_temp_warning}renderSparkline(e){if(!this.config.show_sparkline)return V``;const t=this.tempHistory.get(e);if(!t||t.length<2)return V``;const i=t.map(e=>e.value),s=Math.min(...i),n=Math.max(...i)-s||1,r=i.map((e,t)=>`${t/(i.length-1)*40},${20-(e-s)/n*20}`).join(" ");return W`
      <svg class="sparkline" width="${40}" height="${20}" viewBox="0 0 ${40} ${20}">
        <polyline
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          points="${r}"
        />
      </svg>
    `}renderBubbles(){return this.config.advanced_animations&&(this.isHeating()||0!==this.getActiveHeatingSources().length)?W`
      <g class="bubbles">
        <circle cx="80" cy="240" r="3" fill="#fff" opacity="0.6" class="bubble bubble-1"/>
        <circle cx="95" cy="235" r="2" fill="#fff" opacity="0.5" class="bubble bubble-2"/>
        <circle cx="105" cy="242" r="2.5" fill="#fff" opacity="0.7" class="bubble bubble-3"/>
        <circle cx="115" cy="238" r="2" fill="#fff" opacity="0.6" class="bubble bubble-4"/>
      </g>
    `:V``}renderStratificationLayers(){if(!this.config.show_stratification||!this.config.sensors)return V``;const e=[...this.config.sensors].sort((e,t)=>(e.position||0)-(t.position||0)),t=e.map((e,t)=>{const i=this.getSensorValue(e.entity),s=this.getTemperatureColor(i),n=(e.position||1)-1;return W`
        <rect
          x="51"
          y="${50+40*n+1}"
          width="98"
          height="${38}"
          fill="${s}"
          opacity="0.4"
        />
      `});return W`${t}`}renderBoilerSVG(){const e=this.isHeating(),t=this.getActiveHeatingSources(),i=this.getAverageTemperature(),s=this.getColors(),n=this.config.show_gradient&&null!==i?this.getTemperatureColor(i):s.boiler_fill||"#4A90E2",r=s.boiler_stroke||"#333",o="compact"===this.config.display_mode;return V`
      <svg class="boiler-svg ${o?"compact":""}" viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="boilerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:${s.gradient_start||n};stop-opacity:0.3" />
            <stop offset="100%" style="stop-color:${s.gradient_end||n};stop-opacity:0.9" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <!-- Stratification layers -->
        ${this.renderStratificationLayers()}

        <!-- Tank body -->
        <rect x="50" y="50" width="100" height="200" rx="10" ry="10"
              fill="${this.config.show_stratification?"none":"url(#boilerGradient)"}"
              stroke="${r}"
              stroke-width="2"/>

        <!-- Top cap -->
        <ellipse cx="100" cy="50" rx="50" ry="15"
                 fill="${n}"
                 stroke="${r}"
                 stroke-width="2"
                 opacity="0.8"/>

        <!-- Bottom cap -->
        <ellipse cx="100" cy="250" rx="50" ry="15"
                 fill="${n}"
                 stroke="${r}"
                 stroke-width="2"
                 opacity="0.6"/>

        <!-- Heating element indicator -->
        ${e||t.length>0?W`
          <rect x="70" y="240" width="60" height="8" rx="4"
                fill="#FF6B35"
                filter="url(#glow)"
                class="heating-pulse"/>
        `:""}

        <!-- Bubbles animation -->
        ${this.renderBubbles()}

        <!-- Pipe connections -->
        <circle cx="140" cy="80" r="8" fill="#666" stroke="#333" stroke-width="1"/>
        <rect x="140" y="76" width="30" height="8" fill="#666" stroke="#333" stroke-width="1"/>

        <circle cx="140" cy="220" r="8" fill="#666" stroke="#333" stroke-width="1"/>
        <rect x="140" y="216" width="30" height="8" fill="#666" stroke="#333" stroke-width="1"/>

        <!-- Temperature markers -->
        <line x1="45" y1="80" x2="50" y2="80" stroke="#999" stroke-width="1"/>
        <line x1="45" y1="115" x2="50" y2="115" stroke="#999" stroke-width="1"/>
        <line x1="45" y1="150" x2="50" y2="150" stroke="#999" stroke-width="1"/>
        <line x1="45" y1="185" x2="50" y2="185" stroke="#999" stroke-width="1"/>
        <line x1="45" y1="220" x2="50" y2="220" stroke="#999" stroke-width="1"/>
      </svg>
    `}handleSensorClick(e){if(!this.config.enable_more_info)return;const t=new CustomEvent("hass-more-info",{detail:{entityId:e},bubbles:!0,composed:!0});this.dispatchEvent(t)}renderSensor(e,t){const i=this.hass?.states?.[e.entity],s=this.getSensorValue(e.entity),n=i?.attributes?.unit_of_measurement||"°C",r=e.name||i?.attributes?.friendly_name||e.entity,o=this.getTemperatureColor(s),a="compact"===this.config.display_mode,l=!!i;return V`
      <div
        class="sensor-row ${this.config.enable_more_info?"clickable":""} ${a?"compact":""} ${l?"":"unavailable"}"
        @click=${()=>this.handleSensorClick(e.entity)}
        title="${l?"":"Entita nenalezena: "+e.entity}"
      >
        <div class="sensor-info">
          <div class="sensor-label">
            ${l?"":"⚠️ "}${r}
          </div>
          ${this.renderSparkline(e.entity)}
        </div>
        <div class="sensor-value" style="color: ${o}">
          ${null!==s?s.toFixed(1):l?"--":"N/A"} ${n}
        </div>
      </div>
    `}renderEnergyInfo(){const e=this.getPowerConsumption();return e?V`
      <div class="energy-info">
        <div class="energy-label">💡 Spotřeba</div>
        <div class="energy-values">
          <div class="energy-power">${(e.power/1e3).toFixed(2)} kW</div>
          ${this.config.energy_cost?V`
            <div class="energy-cost">${e.cost.toFixed(2)} Kč/h</div>
          `:""}
        </div>
      </div>
    `:V``}renderHeatingSources(){const e=this.getActiveHeatingSources();if(this.config.heating_entity&&!this.config.heating_sources){return this.isHeating()?V`
        <div class="heating-indicator ${"compact"===this.config.display_mode?"compact":""}">
          <span class="heating-icon">${this.getHeatingIcon(this.config.heating_type||"electric")}</span>
          <span>${this.getHeatingLabel(this.config.heating_type||"electric")}</span>
        </div>
      `:V``}return 0===e.length?V``:V`
      <div class="heating-sources">
        ${e.map(e=>V`
          <div class="heating-source ${"compact"===this.config.display_mode?"compact":""}">
            <span class="heating-icon">${this.getHeatingIcon(e.type)}</span>
            <span>${e.name||this.getHeatingLabel(e.type)}</span>
            ${e.priority?V`<span class="priority">P${e.priority}</span>`:""}
          </div>
        `)}
      </div>
    `}renderMaintenanceInfo(){const e=this.getDaysSince(this.config.anode_last_change),t=this.getDaysSince(this.config.cleaning_last_date),i=this.getMaintenanceStatus(e,this.config.anode_change_interval||365),s=this.getMaintenanceStatus(t,this.config.cleaning_interval||180);return null===e&&null===t?V``:V`
      <div class="maintenance-section">
        <div class="maintenance-title">Údržba</div>

        ${null!==e?V`
          <div class="maintenance-item ${i.status}">
            <div class="maintenance-label">
              <span class="maintenance-icon">🔧</span>
              Anoda
            </div>
            <div class="maintenance-value">
              ${i.text}
            </div>
          </div>
        `:""}

        ${null!==t?V`
          <div class="maintenance-item ${s.status}">
            <div class="maintenance-label">
              <span class="maintenance-icon">🧹</span>
              Čištění
            </div>
            <div class="maintenance-value">
              ${s.text}
            </div>
          </div>
        `:""}
      </div>
    `}renderAlerts(){const e=this.checkAlerts(),t=this.getAverageTemperature(),i=this.hasLowTempWarning();return 0!==e.length||i?V`
      ${i?V`
        <div class="warning-banner">
          <span class="warning-icon">⚠️</span>
          <span>${this.t("low_temperature")} (${t?.toFixed(1)}°C)</span>
        </div>
      `:""}

      ${e.map(e=>(this.sendNotification(e.type,e.message||this.t(e.type)),V`
          <div class="warning-banner alert-${e.type}">
            <span class="warning-icon">
              ${"legionella_risk"===e.type?"🦠":"temperature_drop"===e.type?"❄️":"⚡"}
            </span>
            <span>${e.message||this.t(e.type)}</span>
          </div>
        `))}
    `:V``}render(){if(!this.config||!this.hass)return V``;const e=this.getAverageTemperature(),t=this.config.target_temp_entity?this.getSensorValue(this.config.target_temp_entity):null,i=this.calculateTimeToTarget(),s="compact"===this.config.display_mode,n=[...this.config.sensors||[]].sort((e,t)=>(e.position||0)-(t.position||0));return V`
      <ha-card>
        <div class="card-content ${s?"compact":""}">
          ${this.config.title?V`<h2 class="card-title">${this.config.title}</h2>`:""}

          ${this.renderAlerts()}

          <div class="boiler-container ${s?"compact":""}">
            <div class="boiler-visual">
              ${this.renderBoilerSVG()}

              ${this.renderHeatingSources()}

              ${null!==t?V`
                <div class="target-temp ${s?"compact":""}">
                  <div>Cílová: ${t.toFixed(1)}°C</div>
                  ${i?V`
                    <div class="time-estimate">⏱️ ${i}</div>
                  `:""}
                </div>
              `:""}

              ${this.renderEnergyInfo()}
            </div>

            <div class="sensors-panel ${s?"compact":""}">
              ${n.length>0?V`
                <div class="sensors-list">
                  ${n.map((e,t)=>this.renderSensor(e,t))}
                </div>
              `:V`
                <div class="no-sensors">Nejsou nakonfigurovány žádné senzory</div>
              `}

              ${this.config.show_average&&null!==e?V`
                <div class="average-temp ${s?"compact":""}">
                  <div class="sensor-label">Průměrná teplota</div>
                  <div class="sensor-value average" style="color: ${this.getTemperatureColor(e)}">
                    ${e.toFixed(1)}°C
                  </div>
                </div>
              `:""}

              ${this.renderMaintenanceInfo()}
            </div>
          </div>
        </div>
      </ha-card>
    `}static get styles(){return o`
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

      .boiler-container {
        display: flex;
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
        filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
      }

      .boiler-svg.compact {
        width: 150px;
        height: 225px;
      }

      /* Animations */
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.6; }
      }

      @keyframes bubble-rise {
        0% {
          transform: translateY(0);
          opacity: 0.7;
        }
        100% {
          transform: translateY(-200px);
          opacity: 0;
        }
      }

      .heating-pulse {
        animation: pulse 1.5s ease-in-out infinite;
      }

      .bubble {
        animation: bubble-rise 3s ease-in infinite;
      }

      .bubble-1 {
        animation-delay: 0s;
        animation-duration: 3s;
      }

      .bubble-2 {
        animation-delay: 0.7s;
        animation-duration: 3.5s;
      }

      .bubble-3 {
        animation-delay: 1.4s;
        animation-duration: 2.8s;
      }

      .bubble-4 {
        animation-delay: 2.1s;
        animation-duration: 3.2s;
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

      .time-estimate {
        margin-top: 4px;
        font-size: 12px;
        color: var(--primary-color);
        font-weight: 500;
      }

      .sensors-panel {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        gap: 16px;
        min-width: 0;
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

      .maintenance-section {
        margin-top: 16px;
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
          width: 150px;
          height: 225px;
        }

        .sensors-panel {
          width: 100%;
        }
      }
    `}getCardSize(){return"compact"===this.config.display_mode?4:5}static getConfigElement(){return document.createElement("ha-boiler-card-editor")}static getStubConfig(){return{type:"custom:ha-boiler-card",title:"Bojler",show_average:!0,show_gradient:!0,show_stratification:!0,show_sparkline:!1,display_mode:"normal",heating_type:"electric",min_temp:0,max_temp:80,enable_more_info:!0,advanced_animations:!0,sensors:[]}}};e([ue({attribute:!1})],_e.prototype,"hass",void 0),e([ge()],_e.prototype,"config",void 0),e([ge()],_e.prototype,"tempHistory",void 0),_e=e([(e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)})("ha-boiler-card")],_e),window.customCards=window.customCards||[],window.customCards.push({type:"custom:ha-boiler-card",name:"Boiler Card",description:"Custom card for displaying water heater with temperature sensors"});export{_e as BoilerCard};
//# sourceMappingURL=ha-boiler-card.js.map
