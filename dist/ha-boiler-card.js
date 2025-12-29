function t(t,e,i,n){var o,s=arguments.length,r=s<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,n);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(s<3?o(r):s>3?o(e,i,r):o(e,i))||r);return s>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),o=new WeakMap;let s=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1],t[0]);return new s(i,t,n)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,n))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:p,getOwnPropertySymbols:d,getPrototypeOf:u}=Object,g=globalThis,f=g.trustedTypes,m=f?f.emptyScript:"",_=g.reactiveElementPolyfillSupport,y=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!l(t,e),$={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:b};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(t,i,e);void 0!==n&&c(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){const{get:n,set:o}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:n,set(e){const s=n?.call(this);o?.call(this,e),this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...p(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,n)=>{if(i)t.adoptedStyleSheets=n.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of n){const n=document.createElement("style"),o=e.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=i.cssText,t.appendChild(n)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(void 0!==n&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,n=i._$Eh.get(t);if(void 0!==n&&this._$Em!==n){const t=i.getPropertyOptions(n),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=n;const s=o.fromAttribute(e,t.type);this[n]=s??this._$Ej?.get(n)??s,this._$Em=null}}requestUpdate(t,e,i,n=!1,o){if(void 0!==t){const s=this.constructor;if(!1===n&&(o=this[t]),i??=s.getPropertyOptions(t),!((i.hasChanged??b)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:n,wrapped:o},s){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),!0!==o||void 0!==s)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===n&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,n=this[e];!0!==t||this._$AL.has(e)||void 0===n||this.C(e,void 0,i,n)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[y("elementProperties")]=new Map,x[y("finalized")]=new Map,_?.({ReactiveElement:x}),(g.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,A=t=>t,k=w.trustedTypes,E=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,T="?"+C,H=`<${T}>`,z=document,P=()=>z.createComment(""),F=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,N="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,B=/>/g,j=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,D=/"/g,L=/^(?:script|style|textarea|title)$/i,I=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),V=I(1),W=I(2),q=Symbol.for("lit-noChange"),Z=Symbol.for("lit-nothing"),G=new WeakMap,K=z.createTreeWalker(z,129);function Y(t,e){if(!M(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,n=[];let o,s=2===e?"<svg>":3===e?"<math>":"",r=O;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,h=0;for(;h<i.length&&(r.lastIndex=h,l=r.exec(i),null!==l);)h=r.lastIndex,r===O?"!--"===l[1]?r=U:void 0!==l[1]?r=B:void 0!==l[2]?(L.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=j):void 0!==l[3]&&(r=j):r===j?">"===l[0]?(r=o??O,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?j:'"'===l[3]?D:R):r===D||r===R?r=j:r===U||r===B?r=O:(r=j,o=void 0);const p=r===j&&t[e+1].startsWith("/>")?" ":"";s+=r===O?i+H:c>=0?(n.push(a),i.slice(0,c)+S+i.slice(c)+C+p):i+C+(-2===c?e:p)}return[Y(t,s+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),n]};class X{constructor({strings:t,_$litType$:e},i){let n;this.parts=[];let o=0,s=0;const r=t.length-1,a=this.parts,[l,c]=J(t,e);if(this.el=X.createElement(l,i),K.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(n=K.nextNode())&&a.length<r;){if(1===n.nodeType){if(n.hasAttributes())for(const t of n.getAttributeNames())if(t.endsWith(S)){const e=c[s++],i=n.getAttribute(t).split(C),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:r[2],strings:i,ctor:"."===r[1]?nt:"?"===r[1]?ot:"@"===r[1]?st:it}),n.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:o}),n.removeAttribute(t));if(L.test(n.tagName)){const t=n.textContent.split(C),e=t.length-1;if(e>0){n.textContent=k?k.emptyScript:"";for(let i=0;i<e;i++)n.append(t[i],P()),K.nextNode(),a.push({type:2,index:++o});n.append(t[e],P())}}}else if(8===n.nodeType)if(n.data===T)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=n.data.indexOf(C,t+1));)a.push({type:7,index:o}),t+=C.length-1}o++}}static createElement(t,e){const i=z.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,n){if(e===q)return e;let o=void 0!==n?i._$Co?.[n]:i._$Cl;const s=F(e)?void 0:e._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),void 0===s?o=void 0:(o=new s(t),o._$AT(t,i,n)),void 0!==n?(i._$Co??=[])[n]=o:i._$Cl=o),void 0!==o&&(e=Q(t,o._$AS(t,e.values),o,n)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,n=(t?.creationScope??z).importNode(e,!0);K.currentNode=n;let o=K.nextNode(),s=0,r=0,a=i[0];for(;void 0!==a;){if(s===a.index){let e;2===a.type?e=new et(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new rt(o,this,t)),this._$AV.push(e),a=i[++r]}s!==a?.index&&(o=K.nextNode(),s++)}return K.currentNode=z,n}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,n){this.type=2,this._$AH=Z,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),F(t)?t===Z||null==t||""===t?(this._$AH!==Z&&this._$AR(),this._$AH=Z):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>M(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Z&&F(this._$AH)?this._$AA.nextSibling.data=t:this.T(z.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=X.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(e);else{const t=new tt(n,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=G.get(t.strings);return void 0===e&&G.set(t.strings,e=new X(t)),e}k(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,n=0;for(const o of t)n===e.length?e.push(i=new et(this.O(P()),this.O(P()),this,this.options)):i=e[n],i._$AI(o),n++;n<e.length&&(this._$AR(i&&i._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,n,o){this.type=1,this._$AH=Z,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Z}_$AI(t,e=this,i,n){const o=this.strings;let s=!1;if(void 0===o)t=Q(this,t,e,0),s=!F(t)||t!==this._$AH&&t!==q,s&&(this._$AH=t);else{const n=t;let r,a;for(t=o[0],r=0;r<o.length-1;r++)a=Q(this,n[i+r],e,r),a===q&&(a=this._$AH[r]),s||=!F(a)||a!==this._$AH[r],a===Z?t=Z:t!==Z&&(t+=(a??"")+o[r+1]),this._$AH[r]=a}s&&!n&&this.j(t)}j(t){t===Z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class nt extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Z?void 0:t}}class ot extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Z)}}class st extends it{constructor(t,e,i,n,o){super(t,e,i,n,o),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??Z)===q)return;const i=this._$AH,n=t===Z&&i!==Z||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==Z&&(i===Z||n);n&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const at=w.litHtmlPolyfillSupport;at?.(X,et),(w.litHtmlVersions??=[]).push("3.3.2");const lt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ct extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const n=i?.renderBefore??e;let o=n._$litPart$;if(void 0===o){const t=i?.renderBefore??null;n._$litPart$=o=new et(e.insertBefore(P(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}ct._$litElement$=!0,ct.finalized=!0,lt.litElementHydrateSupport?.({LitElement:ct});const ht=lt.litElementPolyfillSupport;ht?.({LitElement:ct}),(lt.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pt={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:b},dt=(t=pt,e,i)=>{const{kind:n,metadata:o}=i;let s=globalThis.litPropertyMetadata.get(o);if(void 0===s&&globalThis.litPropertyMetadata.set(o,s=new Map),"setter"===n&&((t=Object.create(t)).wrapped=!0),s.set(i.name,t),"accessor"===n){const{name:n}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(n,o,t,!0,i)},init(e){return void 0!==e&&this.C(n,void 0,t,e),e}}}if("setter"===n){const{name:n}=i;return function(i){const o=this[n];e.call(this,i),this.requestUpdate(n,o,t,!0,i)}}throw Error("Unsupported decorator location: "+n)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ut(t){return(e,i)=>"object"==typeof i?dt(t,e,i):((t,e,i)=>{const n=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),n?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function gt(t){return ut({...t,state:!0,attribute:!1})}const ft={ocean:{boiler_fill:"#4DD0E1",boiler_stroke:"#0097A7",cold_water:"#B3E5FC",warm_water:"#4FC3F7",hot_water:"#0288D1",gradient_start:"#E1F5FE",gradient_end:"#01579B"},sunset:{boiler_fill:"#FF9800",boiler_stroke:"#E65100",cold_water:"#FFE0B2",warm_water:"#FFB74D",hot_water:"#E64A19",gradient_start:"#FFF3E0",gradient_end:"#BF360C"},forest:{boiler_fill:"#66BB6A",boiler_stroke:"#2E7D32",cold_water:"#C8E6C9",warm_water:"#81C784",hot_water:"#43A047",gradient_start:"#E8F5E9",gradient_end:"#1B5E20"},fire:{boiler_fill:"#FF5722",boiler_stroke:"#BF360C",cold_water:"#FFCCBC",warm_water:"#FF7043",hot_water:"#D84315",gradient_start:"#FBE9E7",gradient_end:"#4E342E"},ice:{boiler_fill:"#81D4FA",boiler_stroke:"#0277BD",cold_water:"#E1F5FE",warm_water:"#4FC3F7",hot_water:"#0288D1",gradient_start:"#F1F8FB",gradient_end:"#01579B"}},mt={cs:{average_temp:"Průměrná teplota",heating:"Topí se",target:"Cílová teplota",anode_check:"Kontrola anody",cleaning_check:"Čištění",days_remaining:"zbývá dní",overdue:"po termínu",power_consumption:"Spotřeba",heating_source:"Zdroj ohřevu",low_temperature:"Nízká teplota!",temperature_drop:"Prudký pokles teploty!",legionella_risk:"Riziko legionely - ohřejte na 60°C",unusual_consumption:"Neobvyklá spotřeba energie",maintenance_due:"Údržba je potřeba",turn_on:"Zapnout",turn_off:"Vypnout",control:"Ovládání"},en:{average_temp:"Average Temperature",heating:"Heating",target:"Target Temperature",anode_check:"Anode Check",cleaning_check:"Cleaning",days_remaining:"days remaining",overdue:"overdue",power_consumption:"Consumption",heating_source:"Heating Source",low_temperature:"Low temperature!",temperature_drop:"Rapid temperature drop!",legionella_risk:"Legionella risk - heat to 60°C",unusual_consumption:"Unusual energy consumption",maintenance_due:"Maintenance required",turn_on:"Turn On",turn_off:"Turn Off",control:"Control"},de:{average_temp:"Durchschnittstemperatur",heating:"Heizung",target:"Zieltemperatur",anode_check:"Anode Prüfung",cleaning_check:"Reinigung",days_remaining:"Tage übrig",overdue:"überfällig",power_consumption:"Verbrauch",heating_source:"Heizquelle",low_temperature:"Niedrige Temperatur!",temperature_drop:"Schneller Temperaturabfall!",legionella_risk:"Legionellen-Risiko - auf 60°C erhitzen",unusual_consumption:"Ungewöhnlicher Energieverbrauch",maintenance_due:"Wartung erforderlich",turn_on:"Einschalten",turn_off:"Ausschalten",control:"Steuerung"},sk:{average_temp:"Priemerná teplota",heating:"Kúrenie",target:"Cieľová teplota",anode_check:"Kontrola anódy",cleaning_check:"Čistenie",days_remaining:"zostáva dní",overdue:"po termíne",power_consumption:"Spotreba",heating_source:"Zdroj kúrenia",low_temperature:"Nízka teplota!",temperature_drop:"Prudký pokles teploty!",legionella_risk:"Riziko legionely - ohrejte na 60°C",unusual_consumption:"Neobvyklá spotreba energie",maintenance_due:"Údržba je potrebná",turn_on:"Zapnúť",turn_off:"Vypnúť",control:"Ovládanie"},pl:{average_temp:"Średnia temperatura",heating:"Ogrzewanie",target:"Temperatura docelowa",anode_check:"Sprawdzenie anody",cleaning_check:"Czyszczenie",days_remaining:"dni pozostało",overdue:"po terminie",power_consumption:"Zużycie",heating_source:"Źródło ogrzewania",low_temperature:"Niska temperatura!",temperature_drop:"Szybki spadek temperatury!",legionella_risk:"Ryzyko legionelli - podgrzej do 60°C",unusual_consumption:"Niezwykłe zużycie energii",maintenance_due:"Wymagana konserwacja",turn_on:"Włącz",turn_off:"Wyłącz",control:"Sterowanie"}};let _t=class extends ct{constructor(){super(...arguments),this.tempHistory=new Map,this.lastNotificationTime=new Map}setConfig(t){if(!t)throw new Error("Invalid configuration");this.config={show_average:!0,show_gradient:!0,show_stratification:!0,show_sparkline:!1,min_temp:0,max_temp:100,display_mode:"normal",heating_type:"electric",anode_change_interval:365,cleaning_interval:180,enable_more_info:!0,energy_cost:0,advanced_animations:!0,...t}}shouldUpdate(t){return!!this.config&&(!t.has("hass")||(this.hass?.states&&this.config.target_temp_entity&&this.updateTempHistory(),!0))}updateTempHistory(){if(!this.config.sensors)return;const t=Date.now(),e=t-18e5;this.config.sensors.forEach(i=>{const n=this.getSensorValue(i.entity);if(null===n)return;this.tempHistory.has(i.entity)||this.tempHistory.set(i.entity,[]);const o=this.tempHistory.get(i.entity);o.push({value:n,timestamp:t}),this.tempHistory.set(i.entity,o.filter(t=>t.timestamp>e))});const i=this.getAverageTemperature();if(null!==i){this.tempHistory.has("average")||this.tempHistory.set("average",[]);const n=this.tempHistory.get("average");n.push({value:i,timestamp:t}),this.tempHistory.set("average",n.filter(t=>t.timestamp>e))}}getSensorValue(t){if(!this.hass?.states)return null;const e=this.hass.states[t];if(!e)return null;const i=parseFloat(e.state);return isNaN(i)?null:i}getAverageTemperature(){if(!this.config.sensors||0===this.config.sensors.length)return null;const t=[];return this.config.sensors.forEach(e=>{const i=this.getSensorValue(e.entity);null!==i&&t.push(i)}),0===t.length?null:t.reduce((t,e)=>t+e,0)/t.length}isHeating(){if(!this.config.heating_entity||!this.hass?.states)return!1;const t=this.hass.states[this.config.heating_entity];return t&&("on"===t.state||"heating"===t.state)}getActiveHeatingSources(){return this.config.heating_sources&&this.hass?.states?this.config.heating_sources.filter(t=>{const e=this.hass.states[t.entity];return e&&("on"===e.state||"heating"===e.state)}).sort((t,e)=>(t.priority||0)-(e.priority||0)):[]}getPowerConsumption(){if(!this.config.power_entity||!this.hass?.states)return null;const t=this.getSensorValue(this.config.power_entity);if(null===t)return null;return{power:t,cost:t/1e3*(this.config.energy_cost||0)}}getColors(){const t={boiler_fill:"#4CAF50",boiler_stroke:"#388E3C",cold_water:"#2196F3",warm_water:"#FF9800",hot_water:"#F44336",gradient_start:"#2196F3",gradient_end:"#F44336"};return this.config.theme&&"custom"!==this.config.theme&&ft[this.config.theme]?{...t,...ft[this.config.theme]}:this.config.colors?{...t,...this.config.colors}:t}t(t){const e=this.config.language||"cs",i=mt[e]||mt.cs;return this.config.custom_labels&&this.config.custom_labels[t]?this.config.custom_labels[t]:i[t]||t}checkAlerts(){if(!this.config.alerts)return[];const t=[],e=this.getAverageTemperature();return this.config.alerts.forEach(i=>{if(!1!==i.enabled)switch(i.type){case"temperature_drop":{const n=this.tempHistory.get("average");if(n&&n.length>=2&&null!==e){const o=Date.now()-36e5,s=n.find(t=>t.timestamp<o);s&&s.value-e>(i.threshold||10)&&t.push(i)}break}case"legionella_risk":{const n=this.tempHistory.get("average"),o=i.min_temp||60,s=60*(i.duration||168)*60*1e3;if(n&&n.length>0){const r=Date.now()-s,a=n.some(t=>t.timestamp>r&&t.value>=o);!a&&null!==e&&e<o&&t.push(i)}break}case"unusual_consumption":{const e=this.getPowerConsumption();if(e&&i.threshold){const n=i.threshold;e.power>n&&t.push(i)}break}}}),t}sendNotification(t,e){if(!this.config.notifications?.enabled)return;if(!this.config.notifications.events?.includes(t))return;if(!this.hass)return;const i=60*(this.config.notifications.interval||30)*1e3,n=Date.now(),o=this.lastNotificationTime.get(t);if(o&&n-o<i)return;this.lastNotificationTime.set(t,n);const s=this.config.notifications.service||"persistent_notification.create",[r,a]=s.split(".");this.hass.callService(r,a,{message:e,title:"HA Boiler Card"})}toggleControlEntity(){if(!this.config.control_entity||!this.hass?.states)return;const t=this.hass.states[this.config.control_entity];if(!t)return;const e=this.config.control_entity.split(".")[0],i="on"===t.state?"turn_off":"turn_on";this.hass.callService(e,i,{entity_id:this.config.control_entity})}getControlState(){if(!this.config.control_entity||!this.hass?.states)return!1;const t=this.hass.states[this.config.control_entity];return"on"===t?.state}getTemperatureColor(t){if(null===t)return"#888";const e=this.getColors(),i=this.config.min_temp||0,n=this.config.max_temp||100,o=Math.max(0,Math.min(1,(t-i)/(n-i)));return o<.3?e.cold_water||"#2196F3":o<.6?e.warm_water||"#FF9800":e.hot_water||"#F44336"}getHeatingIcon(t){switch(t){case"solar":return"☀️";case"gas":return"🔥";case"heat_pump":return"🌡️";default:return"⚡"}}getHeatingLabel(t){switch(t){case"solar":return"Solární ohřev";case"gas":return"Plynový ohřev";case"heat_pump":return"Tepelné čerpadlo";default:return"Elektrický ohřev"}}calculateTimeToTarget(){if(!this.config.target_temp_entity)return null;const t=this.getSensorValue(this.config.target_temp_entity),e=this.getAverageTemperature();if(null===t||null===e)return null;if(e>=t)return null;if(!this.isHeating()&&0===this.getActiveHeatingSources().length)return null;const i=this.tempHistory.get("average");if(!i||i.length<2)return null;const n=i[0],o=i[i.length-1],s=(o.timestamp-n.timestamp)/1e3/60,r=o.value-n.value;if(s<5||r<=0)return null;const a=r/s,l=t-e,c=Math.ceil(l/a);if(c<60)return`~${c} min`;return`~${Math.floor(c/60)}h ${c%60}min`}getDaysSince(t){if(!t)return null;try{const e=new Date(t),i=(new Date).getTime()-e.getTime();return Math.floor(i/864e5)}catch{return null}}getMaintenanceStatus(t,e){if(null===t)return{status:"ok",text:"Nenastaveno"};const i=e-t;return i<=0?{status:"overdue",text:`Po termínu (${-i} dní)`}:i<=30?{status:"warning",text:`Zbývá ${i} dní`}:{status:"ok",text:`Zbývá ${i} dní`}}hasLowTempWarning(){if(!this.config.low_temp_warning)return!1;const t=this.getAverageTemperature();return null!==t&&t<this.config.low_temp_warning}renderSparkline(t){if(!this.config.show_sparkline)return V``;const e=this.tempHistory.get(t);if(!e||e.length<2)return V``;const i=e.map(t=>t.value),n=Math.min(...i),o=Math.max(...i)-n||1,s=i.map((t,e)=>`${e/(i.length-1)*40},${20-(t-n)/o*20}`).join(" ");return W`
      <svg class="sparkline" width="${40}" height="${20}" viewBox="0 0 ${40} ${20}">
        <polyline
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          points="${s}"
        />
      </svg>
    `}renderBubbles(){return this.config.advanced_animations&&(this.isHeating()||0!==this.getActiveHeatingSources().length)?W`
      <g class="bubbles">
        <circle cx="80" cy="240" r="3" fill="#fff" opacity="0.6" class="bubble bubble-1"/>
        <circle cx="95" cy="235" r="2" fill="#fff" opacity="0.5" class="bubble bubble-2"/>
        <circle cx="105" cy="242" r="2.5" fill="#fff" opacity="0.7" class="bubble bubble-3"/>
        <circle cx="115" cy="238" r="2" fill="#fff" opacity="0.6" class="bubble bubble-4"/>
      </g>
    `:V``}renderStratificationLayers(){if(!this.config.show_stratification||!this.config.sensors)return V``;const t=[...this.config.sensors].sort((t,e)=>(t.position||0)-(e.position||0)),e=t.map((t,e)=>{const i=this.getSensorValue(t.entity),n=this.getTemperatureColor(i),o=(t.position||1)-1;return W`
        <rect
          x="51"
          y="${50+40*o+1}"
          width="98"
          height="${38}"
          fill="${n}"
          opacity="0.4"
        />
      `});return W`${e}`}renderBoilerSVG(){const t=this.isHeating(),e=this.getActiveHeatingSources(),i=this.getAverageTemperature(),n=this.getColors(),o=this.config.show_gradient&&null!==i?this.getTemperatureColor(i):n.boiler_fill||"#4A90E2",s=n.boiler_stroke||"#333",r="compact"===this.config.display_mode;return V`
      <svg class="boiler-svg ${r?"compact":""}" viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="boilerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:${n.gradient_start||o};stop-opacity:0.3" />
            <stop offset="100%" style="stop-color:${n.gradient_end||o};stop-opacity:0.9" />
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
              stroke="${s}"
              stroke-width="2"/>

        <!-- Top cap -->
        <ellipse cx="100" cy="50" rx="50" ry="15"
                 fill="${o}"
                 stroke="${s}"
                 stroke-width="2"
                 opacity="0.8"/>

        <!-- Bottom cap -->
        <ellipse cx="100" cy="250" rx="50" ry="15"
                 fill="${o}"
                 stroke="${s}"
                 stroke-width="2"
                 opacity="0.6"/>

        <!-- Heating element indicator -->
        ${t||e.length>0?W`
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
    `}handleSensorClick(t){if(!this.config.enable_more_info)return;const e=new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0});this.dispatchEvent(e)}renderSensor(t,e){const i=this.hass?.states?.[t.entity],n=this.getSensorValue(t.entity),o=i?.attributes?.unit_of_measurement||"°C",s=t.name||i?.attributes?.friendly_name||t.entity,r=this.getTemperatureColor(n),a="compact"===this.config.display_mode,l=!!i;return V`
      <div
        class="sensor-row ${this.config.enable_more_info?"clickable":""} ${a?"compact":""} ${l?"":"unavailable"}"
        @click=${()=>this.handleSensorClick(t.entity)}
        title="${l?"":"Entita nenalezena: "+t.entity}"
      >
        <div class="sensor-info">
          <div class="sensor-label">
            ${l?"":"⚠️ "}${s}
          </div>
          ${this.renderSparkline(t.entity)}
        </div>
        <div class="sensor-value" style="color: ${r}">
          ${null!==n?n.toFixed(1):l?"--":"N/A"} ${o}
        </div>
      </div>
    `}renderEnergyInfo(){const t=this.getPowerConsumption();return t?V`
      <div class="energy-info">
        <div class="energy-label">💡 Spotřeba</div>
        <div class="energy-values">
          <div class="energy-power">${(t.power/1e3).toFixed(2)} kW</div>
          ${this.config.energy_cost?V`
            <div class="energy-cost">${t.cost.toFixed(2)} Kč/h</div>
          `:""}
        </div>
      </div>
    `:V``}renderHeatingSources(){const t=this.getActiveHeatingSources();if(this.config.heating_entity&&!this.config.heating_sources){return this.isHeating()?V`
        <div class="heating-indicator ${"compact"===this.config.display_mode?"compact":""}">
          <span class="heating-icon">${this.getHeatingIcon(this.config.heating_type||"electric")}</span>
          <span>${this.getHeatingLabel(this.config.heating_type||"electric")}</span>
        </div>
      `:V``}return 0===t.length?V``:V`
      <div class="heating-sources">
        ${t.map(t=>V`
          <div class="heating-source ${"compact"===this.config.display_mode?"compact":""}">
            <span class="heating-icon">${this.getHeatingIcon(t.type)}</span>
            <span>${t.name||this.getHeatingLabel(t.type)}</span>
            ${t.priority?V`<span class="priority">P${t.priority}</span>`:""}
          </div>
        `)}
      </div>
    `}renderMaintenanceInfo(){const t=this.getDaysSince(this.config.anode_last_change),e=this.getDaysSince(this.config.cleaning_last_date),i=this.getMaintenanceStatus(t,this.config.anode_change_interval||365),n=this.getMaintenanceStatus(e,this.config.cleaning_interval||180);return"overdue"!==i.status&&"warning"!==i.status||this.sendNotification("maintenance_due",`${this.t("anode_check")}: ${i.text}`),"overdue"!==n.status&&"warning"!==n.status||this.sendNotification("maintenance_due",`${this.t("cleaning_check")}: ${n.text}`),null===t&&null===e?V``:V`
      <div class="maintenance-section">
        <div class="maintenance-title">Údržba</div>

        ${null!==t?V`
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

        ${null!==e?V`
          <div class="maintenance-item ${n.status}">
            <div class="maintenance-label">
              <span class="maintenance-icon">🧹</span>
              Čištění
            </div>
            <div class="maintenance-value">
              ${n.text}
            </div>
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
    `):V``}renderControlButton(){if(!this.config.show_control_button||!this.config.control_entity)return V``;const t=this.getControlState(),e=this.hass?.states?.[this.config.control_entity];if(!!!e)return V``;const i=this.config.button_style||"default";return"switch"===i?V`
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
    `}render(){if(!this.config||!this.hass)return V``;const t=this.getAverageTemperature(),e=this.config.target_temp_entity?this.getSensorValue(this.config.target_temp_entity):null,i=this.calculateTimeToTarget(),n="compact"===this.config.display_mode,o=this.config.layout_style||"default",s=[...this.config.sensors||[]].sort((t,e)=>(t.position||0)-(e.position||0));return V`
      <ha-card class="layout-${o}">
        <div class="card-content ${n?"compact":""}">
          ${this.config.title?V`<h2 class="card-title">${this.config.title}</h2>`:""}

          ${this.renderAlerts()}

          ${this.renderControlButton()}

          <div class="boiler-container ${n?"compact":""} layout-${o}">
            <div class="boiler-visual">
              ${this.renderBoilerSVG()}

              ${this.renderHeatingSources()}

              ${null!==e?V`
                <div class="target-temp ${n?"compact":""}">
                  <div>Cílová: ${e.toFixed(1)}°C</div>
                  ${i?V`
                    <div class="time-estimate">⏱️ ${i}</div>
                  `:""}
                </div>
              `:""}

              ${this.renderEnergyInfo()}
            </div>

            <div class="sensors-panel ${n?"compact":""}">
              ${s.length>0?V`
                <div class="sensors-list">
                  ${s.map((t,e)=>this.renderSensor(t,e))}
                </div>
              `:V`
                <div class="no-sensors">Nejsou nakonfigurovány žádné senzory</div>
              `}

              ${this.config.show_average&&null!==t?V`
                <div class="average-temp ${n?"compact":""}">
                  <div class="sensor-label">Průměrná teplota</div>
                  <div class="sensor-value average" style="color: ${this.getTemperatureColor(t)}">
                    ${t.toFixed(1)}°C
                  </div>
                </div>
              `:""}

              ${this.renderMaintenanceInfo()}
            </div>
          </div>
        </div>
      </ha-card>
    `}static get styles(){return r`
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

      /* Switch style */
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

      /* Icon style */
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

      /* Minimal style */
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

      /* Layout Style Variants (v1.5.0) */

      /* Horizontal layout */
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

      /* Minimal layout - smaller, more compact */
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

      /* Wide layout - bigger boiler, more space */
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
    `}getCardSize(){return"compact"===this.config.display_mode?4:5}static getConfigElement(){return document.createElement("ha-boiler-card-editor")}static getStubConfig(){return{type:"custom:ha-boiler-card",title:"Bojler",show_average:!0,show_gradient:!0,show_stratification:!0,show_sparkline:!1,display_mode:"normal",heating_type:"electric",min_temp:0,max_temp:80,enable_more_info:!0,advanced_animations:!0,sensors:[]}}};t([ut({attribute:!1})],_t.prototype,"hass",void 0),t([gt()],_t.prototype,"config",void 0),t([gt()],_t.prototype,"tempHistory",void 0),t([gt()],_t.prototype,"lastNotificationTime",void 0),_t=t([(t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)})("ha-boiler-card")],_t),window.customCards=window.customCards||[],window.customCards.push({type:"custom:ha-boiler-card",name:"Boiler Card",description:"Custom card for displaying water heater with temperature sensors"});export{_t as BoilerCard};
//# sourceMappingURL=ha-boiler-card.js.map
