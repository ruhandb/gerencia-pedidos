/* mousetrap v1.6.3 craig.is/killing/mice */
(function(q,u,c){function v(a,b,g){a.addEventListener?a.addEventListener(b,g,!1):a.attachEvent("on"+b,g)}function z(a){if("keypress"==a.type){var b=String.fromCharCode(a.which);a.shiftKey||(b=b.toLowerCase());return b}return n[a.which]?n[a.which]:r[a.which]?r[a.which]:String.fromCharCode(a.which).toLowerCase()}function F(a){var b=[];a.shiftKey&&b.push("shift");a.altKey&&b.push("alt");a.ctrlKey&&b.push("ctrl");a.metaKey&&b.push("meta");return b}function w(a){return"shift"==a||"ctrl"==a||"alt"==a||
"meta"==a}function A(a,b){var g,d=[];var e=a;"+"===e?e=["+"]:(e=e.replace(/\+{2}/g,"+plus"),e=e.split("+"));for(g=0;g<e.length;++g){var m=e[g];B[m]&&(m=B[m]);b&&"keypress"!=b&&C[m]&&(m=C[m],d.push("shift"));w(m)&&d.push(m)}e=m;g=b;if(!g){if(!p){p={};for(var c in n)95<c&&112>c||n.hasOwnProperty(c)&&(p[n[c]]=c)}g=p[e]?"keydown":"keypress"}"keypress"==g&&d.length&&(g="keydown");return{key:m,modifiers:d,action:g}}function D(a,b){return null===a||a===u?!1:a===b?!0:D(a.parentNode,b)}function d(a){function b(a){a=
a||{};var b=!1,l;for(l in p)a[l]?b=!0:p[l]=0;b||(x=!1)}function g(a,b,t,f,g,d){var l,E=[],h=t.type;if(!k._callbacks[a])return[];"keyup"==h&&w(a)&&(b=[a]);for(l=0;l<k._callbacks[a].length;++l){var c=k._callbacks[a][l];if((f||!c.seq||p[c.seq]==c.level)&&h==c.action){var e;(e="keypress"==h&&!t.metaKey&&!t.ctrlKey)||(e=c.modifiers,e=b.sort().join(",")===e.sort().join(","));e&&(e=f&&c.seq==f&&c.level==d,(!f&&c.combo==g||e)&&k._callbacks[a].splice(l,1),E.push(c))}}return E}function c(a,b,c,f){k.stopCallback(b,
b.target||b.srcElement,c,f)||!1!==a(b,c)||(b.preventDefault?b.preventDefault():b.returnValue=!1,b.stopPropagation?b.stopPropagation():b.cancelBubble=!0)}function e(a){"number"!==typeof a.which&&(a.which=a.keyCode);var b=z(a);b&&("keyup"==a.type&&y===b?y=!1:k.handleKey(b,F(a),a))}function m(a,g,t,f){function h(c){return function(){x=c;++p[a];clearTimeout(q);q=setTimeout(b,1E3)}}function l(g){c(t,g,a);"keyup"!==f&&(y=z(g));setTimeout(b,10)}for(var d=p[a]=0;d<g.length;++d){var e=d+1===g.length?l:h(f||
A(g[d+1]).action);n(g[d],e,f,a,d)}}function n(a,b,c,f,d){k._directMap[a+":"+c]=b;a=a.replace(/\s+/g," ");var e=a.split(" ");1<e.length?m(a,e,b,c):(c=A(a,c),k._callbacks[c.key]=k._callbacks[c.key]||[],g(c.key,c.modifiers,{type:c.action},f,a,d),k._callbacks[c.key][f?"unshift":"push"]({callback:b,modifiers:c.modifiers,action:c.action,seq:f,level:d,combo:a}))}var k=this;a=a||u;if(!(k instanceof d))return new d(a);k.target=a;k._callbacks={};k._directMap={};var p={},q,y=!1,r=!1,x=!1;k._handleKey=function(a,
d,e){var f=g(a,d,e),h;d={};var k=0,l=!1;for(h=0;h<f.length;++h)f[h].seq&&(k=Math.max(k,f[h].level));for(h=0;h<f.length;++h)f[h].seq?f[h].level==k&&(l=!0,d[f[h].seq]=1,c(f[h].callback,e,f[h].combo,f[h].seq)):l||c(f[h].callback,e,f[h].combo);f="keypress"==e.type&&r;e.type!=x||w(a)||f||b(d);r=l&&"keydown"==e.type};k._bindMultiple=function(a,b,c){for(var d=0;d<a.length;++d)n(a[d],b,c)};v(a,"keypress",e);v(a,"keydown",e);v(a,"keyup",e)}if(q){var n={8:"backspace",9:"tab",13:"enter",16:"shift",17:"ctrl",
18:"alt",20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"ins",46:"del",91:"meta",93:"meta",224:"meta"},r={106:"*",107:"+",109:"-",110:".",111:"/",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},C={"~":"`","!":"1","@":"2","#":"3",$:"4","%":"5","^":"6","&":"7","*":"8","(":"9",")":"0",_:"-","+":"=",":":";",'"':"'","<":",",">":".","?":"/","|":"\\"},B={option:"alt",command:"meta","return":"enter",
escape:"esc",plus:"+",mod:/Mac|iPod|iPhone|iPad/.test(navigator.platform)?"meta":"ctrl"},p;for(c=1;20>c;++c)n[111+c]="f"+c;for(c=0;9>=c;++c)n[c+96]=c.toString();d.prototype.bind=function(a,b,c){a=a instanceof Array?a:[a];this._bindMultiple.call(this,a,b,c);return this};d.prototype.unbind=function(a,b){return this.bind.call(this,a,function(){},b)};d.prototype.trigger=function(a,b){if(this._directMap[a+":"+b])this._directMap[a+":"+b]({},a);return this};d.prototype.reset=function(){this._callbacks={};
this._directMap={};return this};d.prototype.stopCallback=function(a,b){if(-1<(" "+b.className+" ").indexOf(" mousetrap ")||D(b,this.target))return!1;if("composedPath"in a&&"function"===typeof a.composedPath){var c=a.composedPath()[0];c!==a.target&&(b=c)}return"INPUT"==b.tagName||"SELECT"==b.tagName||"TEXTAREA"==b.tagName||b.isContentEditable};d.prototype.handleKey=function(){return this._handleKey.apply(this,arguments)};d.addKeycodes=function(a){for(var b in a)a.hasOwnProperty(b)&&(n[b]=a[b]);p=null};
d.init=function(){var a=d(u),b;for(b in a)"_"!==b.charAt(0)&&(d[b]=function(b){return function(){return a[b].apply(a,arguments)}}(b))};d.init();q.Mousetrap=d;"undefined"!==typeof module&&module.exports&&(module.exports=d);"function"===typeof define&&define.amd&&define(function(){return d})}})("undefined"!==typeof window?window:null,"undefined"!==typeof window?document:null);

Vue.component('percent-gain-text', {
    data: function () {
        return {
            className: ""
        }
    },
    props: ['current', 'last', 'inverse'],
    methods: {
        toPercent: function (current, last, inverse) {
            if(!last || last <=0) return "";
            let percent = Math.round(((current / last * 100) -100)*100)/100;
            if(percent > 0){
                this.className = !inverse ? "text-success" : "text-danger";
            }else{
                this.className = !inverse ? "text-danger" : "text-success";
                percent*= -1;
            }
            return percent.toLocaleString() + '%';
        }
    },
    template: '<p class="mb-0 mt-2" :class="className">' +
              '     {{ toPercent(current, last, inverse) }}'+
              '     <span class="text-black ml-1"><small>(último fechamento)</small></span>' +
              '</p>'
});

Vue.component('card-indicator', {
    props: ['current', 'last', 'inverse', 'icon', 'title', 'col'],
    template: "<div :class='col' class='grid-margin stretch-card'> " +
              "          <div class='card'> " +
              "              <div class='card-body'> " +
              "                  <p class='card-title text-md-center text-xl-left'>{{ title }}</p> " +
              "                  <div  " +
              "                      class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center'> " +
              "                      <h3 class='mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0'> " +
              "                          <slot></slot></h3> " +
              "                      <span :class='icon' class='icon-md text-muted mb-0 mb-md-3 mb-xl-0'></span> " +
              "                  </div>                                     " +
              "                  <percent-gain-text v-if='current' :current='current'  " +
              "                                      :last='last' :inverse='inverse'> " +
              "                  </percent-gain-text> " +
              "              </div> " +
              "          </div> " +
              "      </div>"
});
(function($) {
  'use strict';
  //Open submenu on hover in compact sidebar mode and horizontal menu mode
  $(document).on('mouseenter mouseleave', '.sidebar .nav-item', function(ev) {
    var body = $('body');
    var sidebarIconOnly = body.hasClass("sidebar-icon-only");
    var sidebarFixed = body.hasClass("sidebar-fixed");
    if (!('ontouchstart' in document.documentElement)) {
      if (sidebarIconOnly) {
        if (sidebarFixed) {
          if (ev.type === 'mouseenter') {
            body.removeClass('sidebar-icon-only');
          }
        } else {
          var $menuItem = $(this);
          if (ev.type === 'mouseenter') {
            $menuItem.addClass('hover-open')
          } else {
            $menuItem.removeClass('hover-open')
          }
        }
      }
    }
  });
})(jQuery);
(function($) {
  'use strict';
  $(function() {
    var body = $('body');
    var contentWrapper = $('.content-wrapper');
    var scroller = $('.container-scroller');
    var footer = $('.footer');
    var sidebar = $('.sidebar');

    //Add active class to nav-link based on url dynamically
    //Active class can be hard coded directly in html file also as required

    function addActiveClass(element) {
      if (current === "") {
        //for root url
        if (element.attr('href').indexOf("index.html") !== -1) {
          element.parents('.nav-item').last().addClass('active');
          if (element.parents('.sub-menu').length) {
            element.closest('.collapse').addClass('show');
            element.addClass('active');
          }
        }
      } else {
        //for other url
        if (element.attr('href').indexOf(current) !== -1) {
          element.parents('.nav-item').last().addClass('active');
          if (element.parents('.sub-menu').length) {
            element.closest('.collapse').addClass('show');
            element.addClass('active');
          }
          if (element.parents('.submenu-item').length) {
            element.addClass('active');
          }
        }
      }
    }

    var current = location.pathname.split("/").slice(-1)[0].replace(/^\/|\/$/g, '');
    $('.nav li a', sidebar).each(function() {
      var $this = $(this);
      addActiveClass($this);
    })

    //Close other submenu in sidebar on opening any

    sidebar.on('show.bs.collapse', '.collapse', function() {
      sidebar.find('.collapse.show').collapse('hide');
    });


    //Change sidebar 
    $('[data-toggle="minimize"]').on("click", function() {
      body.toggleClass('sidebar-icon-only');
    });

    //checkbox and radios
    $(".form-check label,.form-radio label").append('<i class="input-helper"></i>');

  });

  // focus input when clicking on search icon
  $('#navbar-search-icon').click(function() {
    $("#navbar-search-input").focus();
  });
  
})(jQuery);
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("jquery"),require("moment"),require("pc-bootstrap4-datetimepicker")):"function"==typeof define&&define.amd?define("VueBootstrapDatetimePicker",["jquery","moment","pc-bootstrap4-datetimepicker"],t):"object"==typeof exports?exports.VueBootstrapDatetimePicker=t(require("jquery"),require("moment"),require("pc-bootstrap4-datetimepicker")):e.VueBootstrapDatetimePicker=t(e.jQuery,e.moment,e["pc-bootstrap4-datetimepicker"])}(window,function(e,t,n){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(t,n){t.exports=e},function(e,n){e.exports=t},function(e,t){e.exports=n},function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),i=n(1),u=n.n(i),a=(n(2),["hide","show","change","error","update"]),c=function(e,t,n,r,o,i,u,a){var c,p="function"==typeof e?e.options:e;if(t&&(p.render=t,p.staticRenderFns=[],p._compiled=!0),c)if(p.functional){p._injectStyles=c;var s=p.render;p.render=function(e,t){return c.call(t),s(e,t)}}else{var f=p.beforeCreate;p.beforeCreate=f?[].concat(f,c):[c]}return{exports:e,options:p}}({name:"date-picker",props:{value:{default:null,required:!0,validator:function(e){return null===e||e instanceof Date||"string"==typeof e||e instanceof String||e instanceof u.a}},config:{type:Object,default:function(){return{}}},wrap:{type:Boolean,default:!1}},data:function(){return{dp:null,elem:null}},mounted:function(){this.dp||(this.elem=o()(this.wrap?this.$el.parentNode:this.$el),this.elem.datetimepicker(this.config),this.dp=this.elem.data("DateTimePicker"),this.dp.date(this.value),this.elem.on("dp.change",this.onChange),this.registerEvents())},watch:{value:function(e){this.dp&&this.dp.date(e||null)},config:{deep:!0,handler:function(e){this.dp&&this.dp.options(e)}}},methods:{onChange:function(e){var t=e.date?e.date.format(this.dp.format()):null;this.$emit("input",t)},registerEvents:function(){var e=this;a.forEach(function(t){e.elem.on("dp."+t,function(){for(var n=arguments.length,r=Array(n),o=0;o<n;o++)r[o]=arguments[o];e.$emit.apply(e,["dp-"+t].concat(r))})})}},beforeDestroy:function(){this.dp&&(this.dp.destroy(),this.dp=null,this.elem=null)}},function(){var e=this.$createElement,t=this._self._c||e;return this.config.inline?t("div",{staticClass:"datetimepicker-inline"}):t("input",{staticClass:"form-control",attrs:{type:"text"}})});c.options.__file="component.vue";var p=c.exports;n.d(t,"Plugin",function(){return s}),n.d(t,"Component",function(){return p});var s=function(e,t){var n="date-picker";"string"==typeof t&&(n=t),e.component(n,p)};p.install=s,t.default=p}]).default});
!function(o){"use strict";o=o&&o.hasOwnProperty("default")?o.default:o;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;var e,t,r=(function(e,t){e.exports=function(r){function n(e){if(o[e])return o[e].exports;var t=o[e]={exports:{},id:e,loaded:!1};return r[e].call(t.exports,t,t.exports,n),t.loaded=!0,t.exports}var o={};return n.m=r,n.c=o,n.p="",n(0)}([function(e,t,r){function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=r(3);Object.defineProperty(t,"conformToMask",{enumerable:!0,get:function(){return n(o).default}});var i=r(2);Object.defineProperty(t,"adjustCaretPosition",{enumerable:!0,get:function(){return n(i).default}});var a=r(5);Object.defineProperty(t,"createTextMaskInputElement",{enumerable:!0,get:function(){return n(a).default}})},function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.placeholderChar="_",t.strFunction="function"},function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=e.previousConformedValue,r=void 0===t?U:t,n=e.previousPlaceholder,o=void 0===n?U:n,i=e.currentCaretPosition,a=void 0===i?0:i,u=e.conformedValue,l=e.rawValue,s=e.placeholderChar,c=e.placeholder,f=e.indexesOfPipedChars,d=void 0===f?D:f,p=e.caretTrapIndexes,v=void 0===p?D:p;if(0===a||!l.length)return 0;var m=l.length,h=r.length,y=c.length,g=u.length,b=m-h,x=0<b,C=0===h;if(1<b&&!x&&!C)return a;var O=0,w=void 0,S=void 0;if(!x||r!==u&&u!==c){var _=u.toLowerCase(),T=l.toLowerCase().substr(0,a).split(U).filter(function(e){return-1!==_.indexOf(e)});S=T[T.length-1];var P=o.substr(0,T.length).split(U).filter(function(e){return e!==s}).length,k=c.substr(0,T.length).split(U).filter(function(e){return e!==s}).length!==P,E=void 0!==o[T.length-1]&&void 0!==c[T.length-2]&&o[T.length-1]!==s&&o[T.length-1]!==c[T.length-1]&&o[T.length-1]===c[T.length-2];!x&&(k||E)&&0<P&&-1<c.indexOf(S)&&void 0!==l[a]&&(w=!0,S=l[a]);for(var $=d.map(function(e){return _[e]}).filter(function(e){return e===S}).length,N=T.filter(function(e){return e===S}).length,V=c.substr(0,c.indexOf(s)).split(U).filter(function(e,t){return e===S&&l[t]!==e}).length+N+$+(w?1:0),F=0,M=0;M<g;M++){var j=_[M];if(O=M+1,j===S&&F++,V<=F)break}}else O=a-b;if(x){for(var I=O,A=O;A<=y;A++)if(c[A]===s&&(I=A),c[A]===s||-1!==v.indexOf(A)||A===y)return I}else if(w){for(var R=O-1;0<=R;R--)if(u[R]===S||-1!==v.indexOf(R)||0===R)return R}else for(var L=O;0<=L;L--)if(c[L-1]===s||-1!==v.indexOf(L)||0===L)return L};var D=[],U=""},function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});var D="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.default=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:B,t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:q,r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{};if(!(0,U.isArray)(t)){if((void 0===t?"undefined":D(t))!==W.strFunction)throw new Error("Text-mask:conformToMask; The mask property must be an array.");t=t(e,r),t=(0,U.processCaretTraps)(t).maskWithoutCaretTraps}var n=r.guide,o=void 0===n||n,i=r.previousConformedValue,a=void 0===i?B:i,u=r.placeholderChar,l=void 0===u?W.placeholderChar:u,s=r.placeholder,c=void 0===s?(0,U.convertMaskToPlaceholder)(t,l):s,f=r.currentCaretPosition,d=r.keepCharPositions,p=!1===o&&void 0!==a,v=e.length,m=a.length,h=c.length,y=t.length,g=v-m,b=0<g,x=f+(b?-g:0),C=x+Math.abs(g);if(!0===d&&!b){for(var O=B,w=x;w<C;w++)c[w]===l&&(O+=l);e=e.slice(0,x)+O+e.slice(x,v)}for(var S=e.split(B).map(function(e,t){return{char:e,isNew:x<=t&&t<C}}),_=v-1;0<=_;_--){var T=S[_].char;T!==l&&T===c[x<=_&&m===y?_-g:_]&&S.splice(_,1)}var P=B,k=!1;e:for(var E=0;E<h;E++){var $=c[E];if($===l){if(0<S.length)for(;0<S.length;){var N=S.shift(),V=N.char,F=N.isNew;if(V===l&&1!=p){P+=l;continue e}if(t[E].test(V)){if(!0===d&&!1!==F&&a!==B&&!1!==o&&b){for(var M=S.length,j=null,I=0;I<M;I++){var A=S[I];if(A.char!==l&&!1===A.isNew)break;if(A.char===l){j=I;break}}null!==j?(P+=V,S.splice(j,1)):E--}else P+=V;continue e}k=!0}0==p&&(P+=c.substr(E,h));break}P+=$}if(p&&0==b){for(var R=null,L=0;L<P.length;L++)c[L]===l&&(R=L);P=null!==R?P.substr(0,R+1):B}return{conformedValue:P,meta:{someCharsRejected:k}}};var U=r(4),W=r(1),q=[],B=""},function(e,t,r){function n(e){return Array.isArray&&Array.isArray(e)||e instanceof Array}Object.defineProperty(t,"__esModule",{value:!0}),t.convertMaskToPlaceholder=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:i,t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:o.placeholderChar;if(!n(e))throw new Error("Text-mask:convertMaskToPlaceholder; The mask property must be an array.");if(-1===e.indexOf(t))return e.map(function(e){return e instanceof RegExp?t:e}).join("");throw new Error("Placeholder character must not be used as part of the mask. Please specify a character that is not present in your mask as your placeholder character.\n\nThe placeholder character that was received is: "+JSON.stringify(t)+"\n\nThe mask that was received is: "+JSON.stringify(e))},t.isArray=n,t.isString=function(e){return"string"==typeof e||e instanceof String},t.isNumber=function(e){return"number"==typeof e&&void 0===e.length&&!isNaN(e)},t.isNil=function(e){return null==e},t.processCaretTraps=function(e){for(var t=[],r=void 0;-1!==(r=e.indexOf(a));)t.push(r),e.splice(r,1);return{maskWithoutCaretTraps:e,indexes:t}};var o=r(1),i=[],a="[]"},function(e,t,r){function n(e){return e&&e.__esModule?e:{default:e}}function N(e){if((0,I.isString)(e))return e;if((0,I.isNumber)(e))return String(e);if(null==e)return R;throw new Error("The 'value' provided to Text Mask needs to be a string or a number. The value received was:\n\n "+JSON.stringify(e))}Object.defineProperty(t,"__esModule",{value:!0});var V=Object.assign||function(e){for(var t=arguments,r=1;r<arguments.length;r++){var n=t[r];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},F="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.default=function(E){var $={previousConformedValue:void 0,previousPlaceholder:void 0};return{state:$,update:function(e){var t,r,n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:E,o=n.inputElement,i=n.mask,a=n.guide,u=n.pipe,l=n.placeholderChar,s=void 0===l?A.placeholderChar:l,c=n.keepCharPositions,f=void 0!==c&&c,d=n.showMask,p=void 0!==d&&d;if(void 0===e&&(e=o.value),e!==$.previousConformedValue){(void 0===i?"undefined":F(i))===D&&void 0!==i.pipe&&void 0!==i.mask&&(u=i.pipe,i=i.mask);var v=void 0,m=void 0;if(i instanceof Array&&(v=(0,I.convertMaskToPlaceholder)(i,s)),!1!==i){var h=N(e),y=o.selectionEnd,g=$.previousConformedValue,b=$.previousPlaceholder,x=void 0;if((void 0===i?"undefined":F(i))===A.strFunction){if(!1===(m=i(h,{currentCaretPosition:y,previousConformedValue:g,placeholderChar:s})))return;var C=(0,I.processCaretTraps)(m);m=C.maskWithoutCaretTraps,x=C.indexes,v=(0,I.convertMaskToPlaceholder)(m,s)}else m=i;var O={previousConformedValue:g,guide:a,placeholderChar:s,pipe:u,placeholder:v,currentCaretPosition:y,keepCharPositions:f},w=(0,j.default)(h,m,O).conformedValue,S=(void 0===u?"undefined":F(u))===A.strFunction,_={};S&&(!1===(_=u(w,V({rawValue:h},O)))?_={value:g,rejected:!0}:(0,I.isString)(_)&&(_={value:_}));var T=S?_.value:w,P=(0,M.default)({previousConformedValue:g,previousPlaceholder:b,conformedValue:T,placeholder:v,rawValue:h,currentCaretPosition:y,placeholderChar:s,indexesOfPipedChars:_.indexesOfPipedChars,caretTrapIndexes:x}),k=T===v&&0===P?p?v:R:T;$.previousConformedValue=k,$.previousPlaceholder=v,o.value!==k&&(o.value=k,t=o,r=P,document.activeElement===t&&(U?W(function(){return t.setSelectionRange(r,r,L)},0):t.setSelectionRange(r,r,L)))}}}}};var o=r(2),M=n(o),i=r(3),j=n(i),I=r(4),A=r(1),R="",L="none",D="object",U="undefined"!=typeof navigator&&/Android/i.test(navigator.userAgent),W="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:setTimeout}])}(e={exports:{}},e.exports),e.exports);(t=r)&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")&&t.default;function h(e){return e.replace(/\D+/g,"")}function y(e,t){return t&&e.startsWith(t)?e.substr(t.length):e}function g(e,t){return t&&e.endsWith(t)?e.slice(0,-1*t.length):e}function u(e,t){void 0===t&&(t={});var r=t.prefix,n=t.suffix,o=t.thousandsSeparatorSymbol,i=t.decimalSymbol;if("number"==typeof e)return e;if(e&&"string"==typeof e){if(e.match(/^-?\d+(\.\d+)?$/))return Number(e);var a=e.startsWith("-");e=y(e,"-"),e=y(e,r);var u=(e=g(e,n)).split(i);if(2<u.length)return null;var l=u[0].replace(new RegExp("."===o?"\\.":o,"g"),"");if(l.length&&!l.match(/^\d+$/g))return null;var s=l;if(2===u.length){var c=u[1];if(c.length&&!c.match(/^\d+$/g))return null;s+="."+c}if(s)return a&&(s="-"+s),s=Number(s),Number.isNaN(s)?null:s}return null}function b(e){return e.split("").map(function(e){return n.test(e)?n:e})}var i=r.createTextMaskInputElement,a=(r.textMaskCore,{locale:void 0,currency:"EUR",distractionFree:!0,min:null,max:null,validateOnInput:!1}),n=/\d/;function l(e,t){var r=new Intl.NumberFormat(e,{style:"currency",currency:t}).format(1234),n=(r.match(/0/g)||[]).length,o=0<n?r.substr(r.indexOf("4")+1,1):null,i=null!==o;return{prefix:r.substring(0,r.indexOf("1")),suffix:r.substring(r.lastIndexOf(0<n?"0":"4")+1),thousandsSeparatorSymbol:r.substr(r.indexOf("1")+1,1),decimalSymbol:o,decimalLimit:n,allowDecimal:i}}var s={bind:function(e,t){var n=f(e,t.value);o.nextTick(function(){n.value&&d(n)}),n.addEventListener("input",function(){p(n)},{capture:!0}),n.addEventListener("format",function(e){var t=e.detail;n.$ci.focus||(p(n,t.value),n.dispatchEvent(new Event("format-complete")))}),n.addEventListener("focus",function(){var e=n.$ci,t=e.options,r=e.currencyFormatConfig;n.$ci.focus=!0,t.distractionFree&&setTimeout(function(){var e=v(n);p(n,u(n.value,r)),n.setSelectionRange(e,e)},0)}),n.addEventListener("blur",function(){n.$ci.focus=!1,d(n)})},componentUpdated:function(e,t){if(t.value&&c(t.oldValue,t.value)){var r=f(e,t.value);d(r,r.$ci.numberValue)}}},c=function(t,r){return Object.keys(a).some(function(e){return t[e]!==r[e]})},f=function(e,t){var r=e.matches("input")?e:e.querySelector("input");if(!r)throw new Error("The directive must be applied on an element consists of an input element");var n=Object.assign({},o.prototype.$CI_DEFAULT_OPTIONS||a,t);if(null!=n.min&&null!=n.max&&n.min>n.max)throw new Error("Invalid number range");return r.$ci=Object.assign({},r.$ci||{},{options:n,currencyFormatConfig:l(n.locale,n.currency),textMaskInputElement:i({inputElement:r,mask:[]})}),r},d=function(e,t){void 0===t&&(t=u(e.value,e.$ci.currencyFormatConfig)),null==t||e.$ci.currencyFormatConfig.allowDecimal||(t=Math.round(t)),p(e,t),e.dispatchEvent(new Event("input"))},p=function(e,t,r){void 0===t&&(t=e.value),void 0===r&&(r=e.$ci);var n=r.options,o=r.currencyFormatConfig,i=r.textMaskInputElement,a=r.focus&&n.distractionFree;"number"==typeof t&&(null!=n.min&&t<n.min&&(t=n.min),null!=n.max&&t>n.max&&(t=n.max),t=new Intl.NumberFormat(n.locale,{minimumFractionDigits:a?0:o.decimalLimit}).format(t),n.distractionFree&&(t+=" ")),i.update(t,{inputElement:e,pipe:function(e,t){var r=t.previousConformedValue;if(n.validateOnInput){if(null!=n.min&&u(e,o)<n.min)return r;if(null!=n.max&&u(e,o)>n.max)return r}return e},mask:function(e){void 0===e&&(e={});var u=e.prefix,l=e.suffix,s=e.thousandsSeparatorSymbol,c=e.allowDecimal,f=e.allowNegative,d=e.decimalSymbol,p=e.decimalLimit,v=u?u.length:0,m=l?l.length:0;return function(e){void 0===e&&(e="");var t,r,n=-1!==e.indexOf(d),o=e.startsWith("-")&&f;if(e=y(e,"-"),e=y(e,u),e=g(e,l),n&&c){var i=e.split(d);t=i[0],r=b(h(i[1]))}else t=e;t=(t=(t=h(t)).replace(/^0+(0$|[^0])/,"$1")).replace(/\B(?=(\d{3})+(?!\d))/g,s);var a=b(t);return n&&c&&(a.push("[]",d,"[]"),r&&("number"==typeof p&&(r=r.slice(0,p)),a=a.concat(r))),0<v&&(a=u.split("").concat(a)),o&&(a=[/-/].concat(a)),0<m&&(a=a.concat(l.split(""))),a}}(Object.assign({},o,{prefix:a?"":o.prefix,suffix:a?"":o.suffix,thousandsSeparatorSymbol:a?"":o.thousandsSeparatorSymbol,allowNegative:null===n.min&&null===n.max||n.min<0||n.max<0}))}),e.$ci.numberValue=u(e.value,o)},v=function(e,t){void 0===t&&(t=e.$ci.currencyFormatConfig);var r=t.prefix,n=t.thousandsSeparatorSymbol;return Math.max(0,e.selectionStart-r.length-(e.value.substring(0,e.selectionStart).match(new RegExp("."===n?"\\.":n,"g"))||[]).length)};var m=function(e,t,r,n,o,i,a,u,l,s){"boolean"!=typeof a&&(l=u,u=a,a=!1);var c,f="function"==typeof r?r.options:r;if(e&&e.render&&(f.render=e.render,f.staticRenderFns=e.staticRenderFns,f._compiled=!0,o&&(f.functional=!0)),n&&(f._scopeId=n),i?(c=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),t&&t.call(this,l(e)),e&&e._registeredComponents&&e._registeredComponents.add(i)},f._ssrRegister=c):t&&(c=a?function(){t.call(this,s(this.$root.$options.shadowRoot))}:function(e){t.call(this,u(e))}),c)if(f.functional){var d=f.render;f.render=function(e,t){return c.call(t),d(e,t)}}else{var p=f.beforeCreate;f.beforeCreate=p?[].concat(p,c):[c]}return r}({render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("input",e._g({directives:[{name:"currency",rawName:"v-currency",value:e.options,expression:"options"}],domProps:{value:e.formattedValue}},e.listeners()))},staticRenderFns:[]},void 0,{name:"CurrencyInput",directives:{currency:s},props:{value:{type:Number,default:null},locale:{type:String,default:void 0},currency:{type:String,default:void 0},distractionFree:{type:Boolean,default:void 0},min:{type:Number,default:void 0},max:{type:Number,default:void 0},validateOnInput:{type:Boolean,default:void 0}},data:function(){return{formattedValue:this.value}},computed:{options:function(){var t=this,r=Object.assign({},this.$CI_DEFAULT_OPTIONS||a);return Object.keys(r).forEach(function(e){void 0!==t[e]&&(r[e]=t[e])}),r},currencyFormatConfig:function(){return l(this.options.locale,this.options.currency)}},watch:{value:function(e){this.$el.dispatchEvent(new CustomEvent("format",{detail:{value:e}}))}},methods:{listeners:function(){var e=this;return Object.assign({},this.$listeners,{input:function(){return e.emitValue()},"format-complete":function(){return e.emitValue()}})},emitValue:function(){this.$emit("input",u(this.$el.value,this.currencyFormatConfig)),this.formattedValue=this.$el.value}}},void 0,!1,void 0,void 0,void 0),x={install:function(e,t){void 0===t&&(t={});var r=t.componentName;void 0===r&&(r=m.name);var n=t.directiveName;void 0===n&&(n="currency");var o=t.globalOptions;void 0===o&&(o={});var i=Object.assign({},a,o);e.prototype.$CI_DEFAULT_OPTIONS=i,e.component(r,m),e.directive(n,s),e.prototype.$parseCurrency=function(e,t,r){return void 0===t&&(t=i.locale),void 0===r&&(r=i.currency),u(e,l(t,r))}}};"undefined"!=typeof window&&window.Vue&&window.Vue.use(x)}(Vue);

function initFirebase(projectId, apiKey, messagingSenderId){
    firebase.initializeApp({
        apiKey: apiKey,
        authDomain: projectId + ".firebaseapp.com",
        databaseURL: "https://" + projectId + ".firebaseio.com",
        projectId: projectId,
        storageBucket: projectId + ".appspot.com",
        messagingSenderId: messagingSenderId
    });
    return firebase;
}

var fb = initFirebase("gerencia-pedidos", "AIzaSyAtwfzcmzo4NvoLl61SALRaRv5LNEzvMFs", "911417125547");

var AUTH = fb.auth();
var DB = fb.database();
var CLIENTE = 'retro-sports-bar';

function ref(path){
    return DB.ref(CLIENTE + "/" + path);
}

function onTimeDB(path, obj, beforeEvent, afterEvent){
    var r = ref(path);
    r.on('child_added', function (d) {
        var keyValue = { key: d.key, value: d.val()};
        if(beforeEvent) beforeEvent(keyValue);
        Vue.set(obj, keyValue.key, keyValue.value);
        if(afterEvent) afterEvent(keyValue);
    });

    r.on('child_changed', function (d) {
        var keyValue = { key: d.key, value: d.val()};
        if(beforeEvent) beforeEvent(keyValue);
        Vue.set(obj, keyValue.key, keyValue.value);
        if(afterEvent) afterEvent(keyValue);
    });

    r.on('child_removed', function (d) {
        var keyValue = { key: d.key, value: d.val()};
        if(beforeEvent) beforeEvent(keyValue);
        Vue.delete(obj, keyValue.key);
        if(afterEvent) afterEvent(keyValue);
    });
}

function moveRecord(oldRef, newRef, beforeMove, afterMove) {
    oldRef.once('value', function (snap) {
        if (beforeMove) beforeMove(snap.val());
        newRef.update(snap.val(), function (error) {
            if (!error) { oldRef.remove(); }
            else if (typeof (console) !== 'undefined' && console.error) { console.error(error); }
            if (afterMove) afterMove(snap.val());
        });
    });
}
var fbMx = {
    data: function () {
        return {
            cliente: CLIENTE,
            db: null,
            auth: null
        }
    },
    created: function () {
        let fb = this.initFirebase("gerencia-pedidos", "AIzaSyAtwfzcmzo4NvoLl61SALRaRv5LNEzvMFs", "911417125547");
        this.auth = fb.auth();
        this.db = fb.database();
        console.log('fbMx Loaded.');
    },
    methods: {
        ref: function (path) {
            return this.db.ref(this.cliente + "/" + path);
        },
        initFirebase: function(projectId, apiKey, messagingSenderId){
            firebase.initializeApp({
                apiKey: apiKey,
                authDomain: projectId + ".firebaseapp.com",
                databaseURL: "https://" + projectId + ".firebaseio.com",
                projectId: projectId,
                storageBucket: projectId + ".appspot.com",
                messagingSenderId: messagingSenderId
            });
            return firebase;
        },
        onTimeDB: function(path, obj, beforeEvent, afterEvent){
            var r = this.ref(path);
            r.on('child_added', function (d) {
                var keyValue = { key: d.key, value: d.val()};
                if(beforeEvent) beforeEvent(keyValue, 'A');
                Vue.set(obj, keyValue.key, keyValue.value);
                if(afterEvent) afterEvent(keyValue, 'A');
            });
        
            r.on('child_changed', function (d) {
                var keyValue = { key: d.key, value: d.val()};
                if(beforeEvent) beforeEvent(keyValue, 'C');
                Vue.set(obj, keyValue.key, keyValue.value);
                if(afterEvent) afterEvent(keyValue, 'C');
            });
        
            r.on('child_removed', function (d) {
                var keyValue = { key: d.key, value: d.val()};
                if(beforeEvent) beforeEvent(keyValue, 'R');
                Vue.delete(obj, keyValue.key);
                if(afterEvent) afterEvent(keyValue, 'R');
            });
        },
        moveRecord: function(oldRef, newRef, beforeMove, afterMove) {
            oldRef.once('value', function (snap) {
                if (beforeMove) beforeMove(snap.val());
                newRef.update(snap.val(), function (error) {
                    if (!error) { oldRef.remove(); }
                    else if (typeof (console) !== 'undefined' && console.error) { console.error(error); }
                    if (afterMove) afterMove(snap.val());
                });
            });
        }
    }
}
var utilMx = {
    created: function () {
        console.log('utilMx Loaded.');
    },
    methods: {
        getAnchor: function (){
            var urlParts   = document.URL.split('#');
            return (urlParts.length > 1) ? urlParts[1] : null;
        },
        fullScreen: function(){
            var doc = window.document;
            var docEl = doc.documentElement;

            var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
            var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

            if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
                requestFullScreen.call(docEl);
            }
            else {
                cancelFullScreen.call(doc);
            }
        }
    },
    filters: {
        formatDate: function (date) {
            return date ? moment(date, "YYYY-MM-DD HH:mm:ss").format("DD/MM HH:mm") : "";
        },
        formatTime: function (date) {
            return date ? moment(date, "YYYY-MM-DD HH:mm:ss").format("HH:mm") : "";
        },
        miliToMin: function (ms) {
            return Math.round(moment.duration(ms, 'ms').asMinutes()) + " min";
        },
        formatDuration: function (ms) {
            return moment.duration(ms, 'ms').humanize();
        },
        upper: function (str) {
            return str ? str.toUpperCase() : "";
        },
        moeda: function (val) {
            return val ? val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : "";
        }
    }
}