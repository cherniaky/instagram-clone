(this["webpackJsonpinstagram-clone"]=this["webpackJsonpinstagram-clone"]||[]).push([[7],{107:function(e,t,n){},108:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var a=n(16),r=n(45),i=n(6),o=["count","wrapper","className","containerClassName","containerTestId","circle","style"],u=i.createContext({});function s(e){var t,n,s=e.count,d=void 0===s?1:s,l=e.wrapper,c=e.className,h=e.containerClassName,m=e.containerTestId,f=e.circle,g=void 0!==f&&f,v=e.style,b=Object(r.a)(e,o),y=i.useContext(u),p=Object(a.a)(Object(a.a)(Object(a.a)({},y),b),{},{circle:g}),w=Object(a.a)(Object(a.a)({},v),function(e){var t=e.baseColor,n=e.highlightColor,a=e.width,r=e.height,i=e.borderRadius,o=e.circle,u=e.direction,s=e.duration,d=e.enableAnimation,l=void 0===d||d,c={};return"rtl"===u&&(c["--animation-direction"]="reverse"),"number"===typeof s&&(c["--animation-duration"]="".concat(s,"s")),l||(c["--pseudo-element-display"]="none"),"string"!==typeof a&&"number"!==typeof a||(c.width=a),"string"!==typeof r&&"number"!==typeof r||(c.height=r),"string"!==typeof i&&"number"!==typeof i||(c.borderRadius=i),o&&(c.borderRadius="50%"),"undefined"!==typeof t&&(c["--base-color"]=t),"undefined"!==typeof n&&(c["--highlight-color"]=n),c}(p)),M="react-loading-skeleton";c&&(M+=" ".concat(c));for(var D=null!==(t=p.inline)&&void 0!==t&&t,W=[],S=0;S<d;S++){var P=i.createElement("span",{className:M,style:w,key:S},"\u200c");D?W.push(P):W.push(i.createElement(i.Fragment,{key:S},P,i.createElement("br",null)))}return i.createElement("span",{className:h,"data-testid":m,"aria-live":"polite","aria-busy":null===(n=p.enableAnimation)||void 0===n||n},l?W.map((function(e,t){return i.createElement(l,{key:t},e)})):W)}},121:function(e,t,n){"use strict";function a(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}function r(e){a(1,arguments);var t=Object.prototype.toString.call(e);return e instanceof Date||"object"===typeof e&&"[object Date]"===t?new Date(e.getTime()):"number"===typeof e||"[object Number]"===t?new Date(e):("string"!==typeof e&&"[object String]"!==t||"undefined"===typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function i(e,t){a(2,arguments);var n=r(e),i=r(t),o=n.getTime()-i.getTime();return o<0?-1:o>0?1:o}function o(e,t){a(2,arguments);var n=r(e),i=r(t),o=n.getFullYear()-i.getFullYear(),u=n.getMonth()-i.getMonth();return 12*o+u}function u(e){a(1,arguments);var t=r(e);return t.setHours(23,59,59,999),t}function s(e){a(1,arguments);var t=r(e),n=t.getMonth();return t.setFullYear(t.getFullYear(),n+1,0),t.setHours(23,59,59,999),t}function d(e){a(1,arguments);var t=r(e);return u(t).getTime()===s(t).getTime()}function l(e,t){a(2,arguments);var n,u=r(e),s=r(t),l=i(u,s),c=Math.abs(o(u,s));if(c<1)n=0;else{1===u.getMonth()&&u.getDate()>27&&u.setDate(30),u.setMonth(u.getMonth()-l*c);var h=i(u,s)===-l;d(r(e))&&1===c&&1===i(e,s)&&(h=!1),n=l*(c-Number(h))}return 0===n?0:n}function c(e,t){return a(2,arguments),r(e).getTime()-r(t).getTime()}n.d(t,"a",(function(){return A}));var h={ceil:Math.ceil,round:Math.round,floor:Math.floor,trunc:function(e){return e<0?Math.ceil(e):Math.floor(e)}};function m(e){return e?h[e]:h.trunc}function f(e,t,n){a(2,arguments);var r=c(e,t)/1e3;return m(null===n||void 0===n?void 0:n.roundingMethod)(r)}var g={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}},v=function(e,t,n){var a,r=g[e];return a="string"===typeof r?r:1===t?r.one:r.other.replace("{{count}}",t.toString()),null!==n&&void 0!==n&&n.addSuffix?n.comparison&&n.comparison>0?"in "+a:a+" ago":a};function b(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.width?String(t.width):e.defaultWidth,a=e.formats[n]||e.formats[e.defaultWidth];return a}}var y={date:b({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:b({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:b({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},p={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"},w=function(e,t,n,a){return p[e]};function M(e){return function(t,n){var a,r=n||{};if("formatting"===(r.context?String(r.context):"standalone")&&e.formattingValues){var i=e.defaultFormattingWidth||e.defaultWidth,o=r.width?String(r.width):i;a=e.formattingValues[o]||e.formattingValues[i]}else{var u=e.defaultWidth,s=r.width?String(r.width):e.defaultWidth;a=e.values[s]||e.values[u]}return a[e.argumentCallback?e.argumentCallback(t):t]}}var D={ordinalNumber:function(e,t){var n=Number(e),a=n%100;if(a>20||a<10)switch(a%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:M({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:M({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(e){return e-1}}),month:M({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:M({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:M({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})};function W(e){return function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=n.width,r=a&&e.matchPatterns[a]||e.matchPatterns[e.defaultMatchWidth],i=t.match(r);if(!i)return null;var o,u=i[0],s=a&&e.parsePatterns[a]||e.parsePatterns[e.defaultParseWidth],d=Array.isArray(s)?P(s,(function(e){return e.test(u)})):S(s,(function(e){return e.test(u)}));o=e.valueCallback?e.valueCallback(d):d,o=n.valueCallback?n.valueCallback(o):o;var l=t.slice(u.length);return{value:o,rest:l}}}function S(e,t){for(var n in e)if(e.hasOwnProperty(n)&&t(e[n]))return n}function P(e,t){for(var n=0;n<e.length;n++)if(t(e[n]))return n}var T,k={ordinalNumber:(T={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(e){return parseInt(e,10)}},function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e.match(T.matchPattern);if(!n)return null;var a=n[0],r=e.match(T.parsePattern);if(!r)return null;var i=T.valueCallback?T.valueCallback(r[0]):r[0];i=t.valueCallback?t.valueCallback(i):i;var o=e.slice(a.length);return{value:i,rest:o}}),era:W({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:W({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:W({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:W({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:W({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},j={code:"en-US",formatDistance:v,formatLong:y,formatRelative:w,localize:D,match:k,options:{weekStartsOn:0,firstWeekContainsDate:1}};function C(e){return function(e,t){if(null==e)throw new TypeError("assign requires that input parameter not be null or undefined");for(var n in t=t||{})Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}({},e)}function x(e){var t=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()));return t.setUTCFullYear(e.getFullYear()),e.getTime()-t.getTime()}var X=1440,N=43200;function A(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};a(2,arguments);var o=n.locale||j;if(!o.formatDistance)throw new RangeError("locale must contain formatDistance property");var u=i(e,t);if(isNaN(u))throw new RangeError("Invalid time value");var s,d,c=C(n);c.addSuffix=Boolean(n.addSuffix),c.comparison=u,u>0?(s=r(t),d=r(e)):(s=r(e),d=r(t));var h,m=f(d,s),g=(x(d)-x(s))/1e3,v=Math.round((m-g)/60);if(v<2)return n.includeSeconds?m<5?o.formatDistance("lessThanXSeconds",5,c):m<10?o.formatDistance("lessThanXSeconds",10,c):m<20?o.formatDistance("lessThanXSeconds",20,c):m<40?o.formatDistance("halfAMinute",null,c):m<60?o.formatDistance("lessThanXMinutes",1,c):o.formatDistance("xMinutes",1,c):0===v?o.formatDistance("lessThanXMinutes",1,c):o.formatDistance("xMinutes",v,c);if(v<45)return o.formatDistance("xMinutes",v,c);if(v<90)return o.formatDistance("aboutXHours",1,c);if(v<X){var b=Math.round(v/60);return o.formatDistance("aboutXHours",b,c)}if(v<2520)return o.formatDistance("xDays",1,c);if(v<N){var y=Math.round(v/X);return o.formatDistance("xDays",y,c)}if(v<86400)return h=Math.round(v/N),o.formatDistance("aboutXMonths",h,c);if((h=l(d,s))<12){var p=Math.round(v/N);return o.formatDistance("xMonths",p,c)}var w=h%12,M=Math.floor(h/12);return w<3?o.formatDistance("aboutXYears",M,c):w<9?o.formatDistance("overXYears",M,c):o.formatDistance("almostXYears",M+1,c)}}}]);
//# sourceMappingURL=7.265e3473.chunk.js.map