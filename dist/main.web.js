var BPTest=function(e){"use strict";class t{reset(){}}class r extends t{}class s extends t{constructor(e,t){if(super(),this.value=0,Array.isArray(t))throw new Error("Invalid componentData type: Expected object, found array");throw new Error("Invalid type for value property: Expected number, found object")}getValue(){return this.value}}const i={};async function n(e,...t){if(void 0!==i[e])return await Promise.all(Object.values(i[e]).map(e=>e(...t)))}class o extends u{get filterValue(){return"string"!=typeof this.value?(n("error",new Error(`Value to compare against is of type ${typeof this.value}, expected string`)),!1):void 0!==this.entity.getActiveComponent(this.value)}eval(){return"=="===this.operator?this.filterValue:"!="===this.operator?!this.filterValue:(n("error",new Error(`Invalid operator for ${this.constructor.name} filter: ${this.operator}`)),!1)}}class a{constructor(e,t){this.filters=t.map(t=>f(e,t))}eval(){for(const e of this.filters)if(!e.eval())return!1;return!0}}class c{constructor(e,t){this.filters=t.map(t=>f(e,t))}eval(){for(const e of this.filters)if(e.eval())return!0;return!1}}class h{constructor(e,t){this.filters=t.map(t=>f(e,t))}eval(){for(const e of this.filters)if(e.eval())return!1;return!0}}class u{constructor(e,t){var r,s,i;this.entity=e,this.operator=(i="==","string"!=typeof(r=t)[s="operator"]?(n("error",new Error(`Invalid type for property "${s}": Expected string, found ${typeof r[s]}`)),i):r[s]),"="!==this.operator&&"equals"!==this.operator||(this.operator="=="),"<>"!==this.operator&&"not"!==this.operator||(this.operator="!="),this.value=t.value}eval(){switch(this.operator){case"==":return this.value===this.filterValue;case"!=":return this.value!==this.filterValue;case"<=":return this.value<=this.filterValue;case">=":return this.value>=this.filterValue;case"<":return this.value<this.filterValue;case">":return this.value>this.filterValue}return!1}}class l extends u{constructor(){super(...arguments),this.filterValue=0}eval(){return!1}}const p=new Map([["distance_to_nearest_player",class extends u{get filterValue(){const e=this.entity.getWorld().allEntities().filter(e=>"minecraft:player"===e.flags.get("identifier")).map(e=>this.entity.position.distanceTo(e.position));let t=1/0;for(const r of e)t>r&&(t=r);return t}}],["has_component",o],["has_tag",class extends o{get filterValue(){return"string"!=typeof this.value?(n("error",new Error(`Value to compare against is of type ${typeof this.value}, expected string`)),!1):this.entity.tags.has(this.value)}}],["has_target",class extends u{get filterValue(){return"boolean"!=typeof this.value?(n("error",new Error(`Value to compare against is of type ${typeof this.value}, expected boolean`)),!1):this.entity.getTarget("target").isAlive&&this.entity.getTarget("target")!==this.entity}}]]);function f(e,t){return t.all_of?new a(e,t.all_of):t.any_of?new c(e,t.all_of):t.none_of?new h(e,t.all_of):new(p.get(t.test)??l)(e.getTarget(t.subject),t)}const g=new Map([["minecraft:can_power_jump",class extends t{}],["minecraft:health",class extends t{constructor(e,t){if(super(),this.entity=e,this.value=20,this.max=20,this.min=0,Array.isArray(t))throw new Error("Invalid componentData type: Expected object, found array");throw new Error("Invalid type for value property: Expected number, found object")}getValue(){return this.value}getMax(){return this.max}getMin(){return this.min}damage(e){this.value-=e,this.value<this.min&&(this.value=this.min),this.value<=0&&this.entity.kill()}heal(e){this.value+=e,this.value>this.max&&(this.value=this.max)}}],["minecraft:mark_variant",s],["minecraft:persistent",class extends t{}],["minecraft:skin_id",s],["minecraft:type_family",class extends t{constructor(e,t){if(super(),this.entity=e,Array.isArray(t))throw new Error("Invalid componentData type: Expected object, found array");throw Array.isArray(t?.family),new Error("Invalid type for value property: Expected number, found object")}getFamilies(){return this.families}}],["minecraft:variant",s],["minecraft:timer",class extends r{constructor(e,t){if(super(),this.entity=e,this.startTick=-1,this.isActive=!0,Array.isArray(t))throw new Error("Invalid componentData type: Expected object, found array");throw new Error("Invalid type for value property: Expected number, found object")}reset(){this.startTick=-1}tick(e){-1===this.startTick&&(this.startTick=e),this.startTick+this.time>=e&&(this.timeDownEvent.trigger(),this.looping?this.reset():this.entity.removeTickable(this))}}]]);class m{constructor(e,t){this.entity=e,this.componentGroups=new Map,Object.entries(t).map(([e,t])=>this.createComponentGroup(e,t))}createComponentGroup(e,t){const r=new E(this.entity,t);return this.componentGroups.set(e,r),r}addComponentGroup(e){const t=this.componentGroups.get(e);if(!t)throw new Error(`Undefined component group: "${e}"`);t.add()}removeComponentGroup(e){const t=this.componentGroups.get(e);if(!t)throw new Error(`Undefined component group: "${e}"`);t.remove()}}class E{constructor(e,t){this.entity=e,this.components=new Map,Object.entries(t).map(([e,t])=>{const r=function(e,t,r){const s=g.get(t);if(s)return new s(e,r)}(this.entity,e,t);r&&this.components.set(e,r)})}add(){this.components.forEach((e,t)=>this.entity.activateComponent(t,e))}remove(){this.components.forEach((e,t)=>this.entity.deactivateComponent(t))}}class d{constructor(e){this.value=e}isStatic(){return!0}eval(){return this.value}}class w{constructor(e,t,r){this.left=e,this.right=t,this.evalHelper=r}isStatic(){return this.left.isStatic()&&this.right.isStatic()}eval(){return this.evalHelper()}}class v{constructor(e=0){this.precedence=e}parse(e,t,r){const s=e.parseExpression(this.precedence);switch(r[1]){case"+":return new w(t,s,()=>{const e=t.eval(),i=s.eval();if("number"!=typeof e&&"boolean"!=typeof e||"number"!=typeof i&&"boolean"!=typeof i)throw new Error(`Cannot use numeric operators for expression "${e} ${r[1]} ${i}"`);return e+i});case"-":return new w(t,s,()=>{const e=t.eval(),i=s.eval();if("number"!=typeof e&&"boolean"!=typeof e||"number"!=typeof i&&"boolean"!=typeof i)throw new Error(`Cannot use numeric operators for expression "${e} ${r[1]} ${i}"`);return e-i});case"*":return new w(t,s,()=>{const e=t.eval(),i=s.eval();if("number"!=typeof e&&"boolean"!=typeof e||"number"!=typeof i&&"boolean"!=typeof i)throw new Error(`Cannot use numeric operators for expression "${e} ${r[1]} ${i}"`);return e*i});case"/":return new w(t,s,()=>{const e=t.eval(),i=s.eval();if("number"!=typeof e&&"boolean"!=typeof e||"number"!=typeof i&&"boolean"!=typeof i)throw new Error(`Cannot use numeric operators for expression "${e} ${r[1]} ${i}"`);return e/i});case"&&":return new w(t,s,()=>t.eval()&&s.eval());case"||":return new w(t,s,()=>t.eval()||s.eval());case"<":return new w(t,s,()=>t.eval()<s.eval());case"<=":return new w(t,s,()=>t.eval()<=s.eval());case">":return new w(t,s,()=>t.eval()>s.eval());case">=":return new w(t,s,()=>t.eval()>=s.eval());case"==":return new w(t,s,()=>t.eval()===s.eval());case"!=":return new w(t,s,()=>t.eval()!==s.eval());case"??":return new w(t,s,()=>t.eval()??s.eval());case"=":return new w(t,s,()=>{if(t.setPointer)return t.setPointer(s.eval()),0;throw Error(`Cannot assign to "${t.eval()}"`)});default:throw new Error("Operator not implemented")}}}var y;!function(e){e[e.SCOPE=1]="SCOPE",e[e.STATEMENT=2]="STATEMENT",e[e.PROPERTY_ACCESS=3]="PROPERTY_ACCESS",e[e.ARRAY_ACCESS=4]="ARRAY_ACCESS",e[e.ASSIGNMENT=5]="ASSIGNMENT",e[e.CONDITIONAL=6]="CONDITIONAL",e[e.NULLISH_COALESCING=7]="NULLISH_COALESCING",e[e.AND=8]="AND",e[e.OR=9]="OR",e[e.COMPARE=10]="COMPARE",e[e.SUM=11]="SUM",e[e.PRODUCT=12]="PRODUCT",e[e.EXPONENT=13]="EXPONENT",e[e.PREFIX=14]="PREFIX",e[e.POSTFIX=15]="POSTFIX",e[e.FUNCTION=16]="FUNCTION"}(y||(y={}));class x{constructor(e,t){this.tokenType=e,this.expression=t}isStatic(){return this.expression.isStatic()}eval(){const e=this.expression.eval();switch(this.tokenType){case"MINUS":if("number"!=typeof e)throw new Error(`Cannot use "-" operator in front of ${typeof e}: "-${e}"`);return-e;case"BANG":if("string"==typeof e)throw new Error(`Cannot use "!" operator in front of string: "!${e}"`);return!e}}}class R{constructor(e=0){this.precedence=e}parse(e,t){return new x(t[0],e.parseExpression(this.precedence))}}class C{constructor(e=0){this.precedence=e}parse(e,t){return new d(Number(t[1]))}}const S=(e,t)=>e+Math.random()*(t-e),A=(e,t)=>Math.round(e+Math.random()*(t-e)),b={"math.abs":Math.abs,"math.acos":Math.acos,"math.asin":Math.asin,"math.atan":Math.atan,"math.atan2":Math.atan2,"math.ceil":Math.ceil,"math.clamp":(e,t,r)=>"number"!=typeof e||Number.isNaN(e)?t:e>r?r:e<t?t:e,"math.cos":Math.cos,"math.die_roll":(e,t,r)=>{let s=0;for(;0<e;)s+=S(t,r);return s},"math.die_roll_integer":(e,t,r)=>{let s=0;for(;0<e;)s+=A(t,r);return s},"math.exp":Math.exp,"math.floor":Math.floor,"math.hermite_blend":e=>3*e^2-2*e^3,"math.lerp":(e,t,r)=>(r<0?r=0:r>1&&(r=1),e+(t-e)*r),"math.lerp_rotate":(e,t,r)=>{const s=e=>((e+180)%360+180)%360;if((e=s(e))>(t=s(t))){let r=e;e=t,t=r}return t-e>180?s(t+r*(360-(t-e))):e+r*(t-e)},"math.ln":Math.log,"math.max":Math.max,"math.min":Math.min,"math.mod":(e,t)=>e%t,"math.pi":Math.PI,"math.pow":Math.pow,"math.random":S,"math.random_integer":A,"math.round":Math.round,"math.sin":Math.sin,"math.sqrt":Math.sqrt,"math.trunc":Math.trunc};let T={};function _(e,t="",r={}){for(let s in e)"object"!=typeof e[s]||Array.isArray(e[s])?r[`${t}${s}`]=e[s]:_(e[s],`${t}${s}.`,r);return r}class I{constructor(e,t=!1){this.name=e,this.isFunctionCall=t}isStatic(){return!1}setPointer(e){!function(e,t){if("."===e[1])switch(e[0]){case"q":e="query"+e.substring(1,e.length);case"t":e="temp"+e.substring(1,e.length);case"v":e="variable"+e.substring(1,e.length);case"c":e="context"+e.substring(1,e.length)}T[e]=t}(this.name,e)}setFunctionCall(e=!0){this.isFunctionCall=e}eval(){const e=function(e){if("."===e[1])switch(e[0]){case"q":e="query"+e.substring(1,e.length);case"t":e="temp"+e.substring(1,e.length);case"v":e="variable"+e.substring(1,e.length);case"c":e="context"+e.substring(1,e.length)}return T[e]}(this.name);return this.isFunctionCall||"function"!=typeof e?e:e()}}class N{constructor(e=0){this.precedence=e}parse(e,t){return new I(t[1])}}class O{constructor(e=0){this.precedence=e}parse(e,t){const r=e.parseExpression(this.precedence);return e.consume("RIGHT_PARENT"),r}}class P{constructor(e,t,r){this.leftExpression=e,this.thenExpression=t,this.elseExpression=r}get isReturn(){return this.leftResult?this.thenExpression.isReturn:this.elseExpression.isReturn}get isContinue(){return this.leftResult?this.thenExpression.isContinue:this.elseExpression.isContinue}get isBreak(){return this.leftResult?this.thenExpression.isBreak:this.elseExpression.isBreak}isStatic(){return this.leftExpression.isStatic()&&this.thenExpression.isStatic()&&this.elseExpression.isStatic()}eval(){return this.leftResult=this.leftExpression.eval(),this.leftResult?this.thenExpression.eval():this.elseExpression.eval()}}class M{constructor(e=0){this.precedence=e}parse(e,t,r){let s,i=e.parseExpression(this.precedence-1);if(e.match("COLON"))s=e.parseExpression(this.precedence-1);else{if(!e.match("SEMICOLON",!1))throw new Error("Binary conditional operator without ending semicolon.");s=new d(0)}return new P(t,i,s)}}class L{constructor(e){this.expression=e,this.isReturn=!0}isStatic(){return!1}eval(){return this.expression.eval()}}class k{constructor(e=0){this.precedence=e}parse(e,t){const r=e.parseExpression(y.STATEMENT);return new L(e.match("SEMICOLON")?r:new d(0))}}class G{constructor(e){this.expressions=e,this.didReturn=!1,this.wasLoopBroken=!1,this.wasLoopContinued=!1}get isReturn(){return this.didReturn}get isBreak(){return!!this.wasLoopBroken&&(this.wasLoopBroken=!1,!0)}get isContinue(){return!!this.wasLoopContinued&&(this.wasLoopContinued=!1,!0)}isStatic(){let e=0;for(;e<this.expressions.length;){if(!this.expressions[e].isStatic())return!1;e++}return!0}eval(){this.didReturn=!1,this.wasLoopBroken=!1,this.wasLoopContinued=!1;let e=0;for(;e<this.expressions.length;){let t=this.expressions[e].eval();if(this.expressions[e].isReturn)return this.didReturn=!0,t;if(this.expressions[e].isContinue)return void(this.wasLoopContinued=!0);if(this.expressions[e].isBreak)return void(this.wasLoopBroken=!0);e++}return 0}getExpression(){return this.expressions[0]}}class U{constructor(e,t=!1){this.value=e,this.isReturn=t}isStatic(){return!0}eval(){return this.value}}class ${constructor(e=0){this.precedence=e}parse(e,t,r){if(e.useOptimizer&&(t.isStatic()&&(t=new U(t.eval(),t.isReturn)),t.isReturn))return t;let s,i=[t];do{if(s=e.parseExpression(this.precedence),e.useOptimizer){if(s.isStatic()){if(!s.isReturn&&e.agressiveStaticOptimizer)continue;s=new U(s.eval(),s.isReturn)}if(s.isReturn){i.push(s);break}}i.push(s)}while(e.match("SEMICOLON")||s.isReturn);return new G(i)}}class F{constructor(e){this.name=e}isStatic(){return!0}eval(){return this.name.substring(1,this.name.length-1)}}class q{constructor(e=0){this.precedence=e}parse(e,t){return new F(t[1])}}class H{constructor(e,t){this.name=e,this.args=t}isStatic(){return!1}eval(){const e=[];let t=0;for(;t<this.args.length;)e.push(this.args[t++].eval());return this.name.eval()(...e)}}class B{constructor(e=0){this.precedence=e}parse(e,t,r){const s=[];if(!t.setFunctionCall)throw new Error(`Expression "${t.eval()}" is not callable!`);if(t.setFunctionCall(!0),!e.match("RIGHT_PARENT")){do{s.push(e.parseExpression())}while(e.match("COMMA"));e.consume("RIGHT_PARENT")}return new H(t,s)}}class V{constructor(e,t){this.name=e,this.lookup=t}isStatic(){return!1}setPointer(e){this.name.eval()[this.lookup.eval()]=e}eval(){return this.name.eval()[this.lookup.eval()]}}class j{constructor(e=0){this.precedence=e}parse(e,t,r){const s=e.parseExpression(this.precedence-1);if(!t.setPointer)throw new Error(`"${t.eval()}" is not an array`);if(!e.match("ARRAY_RIGHT"))throw new Error(`No closing bracket for opening bracket "[${s.eval()}"`);return new V(t,s)}}class z{constructor(e=0){this.precedence=e}parse(e,t){let r,s=!1,i=[];do{if(e.match("CURLY_RIGHT")){s=!0;break}if(r=e.parseExpression(y.STATEMENT),e.useOptimizer&&(r.isStatic()&&(r=new U(r.eval(),r.isReturn)),r.isReturn)){i.push(r);break}i.push(r)}while(e.match("SEMICOLON")||r.isReturn);if(!s&&!e.match("CURLY_RIGHT"))throw new Error("Missing closing curly bracket");return new G(i)}}class D{constructor(e,t){this.count=e,this.expression=t}get isReturn(){return this.expression.isReturn}isStatic(){return this.count.isStatic()&&this.expression.isStatic()}eval(){const e=Number(this.count.eval());if(Number.isNaN(e))throw new Error(`First loop() argument must be of type number, received "${typeof this.count.eval()}"`);if(e>1024)throw new Error(`Cannot loop more than 1024x times, received "${e}"`);let t=0;for(;t<e;){t++;const e=this.expression.eval();if(this.expression.isBreak)break;if(!this.expression.isContinue&&this.expression.isReturn)return e}return 0}}class Y{constructor(e=0){this.precedence=e}parse(e,t){e.consume("LEFT_PARENT");const r=[];if(e.match("RIGHT_PARENT"))throw new Error("loop() called without arguments");do{r.push(e.parseExpression())}while(e.match("COMMA"));if(e.consume("RIGHT_PARENT"),2!==r.length)throw new Error("There must be exactly two loop() arguments; found "+r.length);return new D(r[0],r[1])}}class X{constructor(e,t,r){if(this.variable=e,this.arrayExpression=t,this.expression=r,!this.variable.setPointer)throw new Error(`First for_each() argument must be a variable, received "${typeof this.variable.eval()}"`)}get isReturn(){return this.expression.isReturn}isStatic(){return this.variable.isStatic()&&this.arrayExpression.isStatic()&&this.expression.isStatic()}eval(){const e=this.arrayExpression.eval();if(!Array.isArray(e))throw new Error(`Second for_each() argument must be an array, received "${typeof e}"`);let t=0;for(;t<e.length;){this.variable.setPointer(e[t++]);const r=this.expression.eval();if(this.expression.isBreak)break;if(!this.expression.isContinue&&this.expression.isReturn)return r}return 0}}class Q{constructor(e=0){this.precedence=e}parse(e,t){e.consume("LEFT_PARENT");const r=[];if(e.match("RIGHT_PARENT"))throw new Error("for_each() called without arguments");do{r.push(e.parseExpression())}while(e.match("COMMA"));if(e.consume("RIGHT_PARENT"),3!==r.length)throw new Error("There must be exactly three loop() arguments; found "+r.length);return new X(r[0],r[1],r[2])}}class W{constructor(){this.isContinue=!0}isStatic(){return!1}eval(){return 0}}class K{constructor(e=0){this.precedence=e}parse(e,t){return new W}}class Z{constructor(){this.isBreak=!0}isStatic(){return!1}eval(){return 0}}class J{constructor(e=0){this.precedence=e}parse(e,t){return new Z}}class ee{constructor(e){this.value=e}isStatic(){return!0}eval(){return this.value}}class te{constructor(e=0){this.precedence=e}parse(e,t){return new ee("true"===t[1])}}class re extends class{constructor(e,t=!1,r=!0){this.tokenIterator=e,this.useOptimizer=t,this.agressiveStaticOptimizer=r,this.prefixParselets=new Map,this.infixParselets=new Map,this.readTokens=[],this.lastConsumed=["SOF",""]}parseExpression(e=0){let t=this.consume();if("EOF"===t[0])return new d(0);const r=this.prefixParselets.get(t[0]);if(!r)throw new Error(`Cannot parse ${t[0]} expression "${t[1]}"`);let s=r.parse(this,t);return s.isReturn?s:this.parseInfixExpression(s,e)}parseInfixExpression(e,t=0){let r;for(;t<this.getPrecedence();)r=this.consume(),e=this.infixParselets.get(r[0]).parse(this,e,r);return e}getPrecedence(){const e=this.infixParselets.get(this.lookAhead(0)?.[0]);return e?.precedence??0}getLastConsumed(){return this.lastConsumed}consume(e){this.tokenIterator.step();const t=this.lookAhead(0);if(e){if(t[0]!==e)throw new Error(`Expected token "${e}" and found "${t[0]}"`);this.consume()}return this.lastConsumed=this.readTokens.pop(),this.lastConsumed}match(e,t=!0){return this.lookAhead(0)[0]===e&&(t&&this.consume(),!0)}lookAhead(e){for(;e>=this.readTokens.length;)this.readTokens.push(this.tokenIterator.next());return this.readTokens[e]}registerInfix(e,t){this.infixParselets.set(e,t)}registerPrefix(e,t){this.prefixParselets.set(e,t)}getInfix(e){return this.infixParselets.get(e)}getPrefix(e){return this.prefixParselets.get(e)}getTokenizerPosition(){return this.tokenIterator.getPosition()}}{constructor(e,t=!0,r=!0){super(e,t,r),this.registerPrefix("NAME",new N),this.registerPrefix("STRING",new q),this.registerPrefix("NUMBER",new C),this.registerPrefix("TRUE",new te(y.PREFIX)),this.registerPrefix("FALSE",new te(y.PREFIX)),this.registerPrefix("RETURN",new k),this.registerPrefix("CONTINUE",new K),this.registerPrefix("BREAK",new J),this.registerPrefix("LOOP",new Y),this.registerPrefix("FOR_EACH",new Q),this.registerInfix("QUESTION",new M(y.CONDITIONAL)),this.registerPrefix("LEFT_PARENT",new O),this.registerInfix("LEFT_PARENT",new B(y.FUNCTION)),this.registerInfix("ARRAY_LEFT",new j(y.ARRAY_ACCESS)),this.registerPrefix("CURLY_LEFT",new z(y.SCOPE)),this.registerInfix("SEMICOLON",new $(y.STATEMENT)),this.registerPrefix("MINUS",new R(y.PREFIX)),this.registerPrefix("BANG",new R(y.PREFIX)),this.registerInfix("PLUS",new v(y.SUM)),this.registerInfix("MINUS",new v(y.SUM)),this.registerInfix("ASTERISK",new v(y.PRODUCT)),this.registerInfix("SLASH",new v(y.PRODUCT)),this.registerInfix("EQUALS",new v(y.COMPARE)),this.registerInfix("NOT_EQUALS",new v(y.COMPARE)),this.registerInfix("GREATER_OR_EQUALS",new v(y.COMPARE)),this.registerInfix("GREATER",new v(y.COMPARE)),this.registerInfix("SMALLER_OR_EQUALS",new v(y.COMPARE)),this.registerInfix("SMALLER",new v(y.COMPARE)),this.registerInfix("AND",new v(y.AND)),this.registerInfix("OR",new v(y.OR)),this.registerInfix("NULLISH_COALESCING",new v(y.NULLISH_COALESCING)),this.registerInfix("ASSIGN",new v(y.ASSIGNMENT))}}const se=new Map([["==","EQUALS"],["!=","NOT_EQUALS"],["??","NULLISH_COALESCING"],["&&","AND"],["||","OR"],[">=","GREATER_OR_EQUALS"],["<=","SMALLER_OR_EQUALS"],[">","GREATER"],["<","SMALLER"],["(","LEFT_PARENT"],[")","RIGHT_PARENT"],["[","ARRAY_LEFT"],["]","ARRAY_RIGHT"],["{","CURLY_LEFT"],["}","CURLY_RIGHT"],[",","COMMA"],["=","ASSIGN"],["+","PLUS"],["-","MINUS"],["*","ASTERISK"],["/","SLASH"],["?","QUESTION"],[":","COLON"],[";","SEMICOLON"],["!","BANG"]]),ie=new Set(["return","continue","break","for_each","loop","false","true"]);function ne(e){return e>="a"&&e<="z"}function oe(e){return e>="0"&&e<="9"}let ae={},ce=0;function he(e,t,r={}){t&&function(e){T={...b,..._(e)}}(t);const s=function(e,{useCache:t=!0,useOptimizer:r=!0,useAgressiveStaticOptimizer:s=!0,maxCacheSize:i=256}={}){if(t){const t=ae[e];if(t)return t}const n=new re(function(e){let t=0,r=0,s=0,i=0;return{getPosition:()=>({startLineNumber:i,endLineNumber:s,startColumn:r,endColumn:t}),step(){r=t,i=s},next(){for(;t<e.length;){let r=t+1<e.length?se.get(e[t]+e[t+1]):void 0;if(r)return t++,[r,e[t-1]+e[t++]];if(r=se.get(e[t]),r)return[r,e[t++]];if("'"===e[t]){let r=t+1;for(;r<e.length&&"'"!==e[r];)r++;r++;const s=["STRING",e.substring(t,r)];return t=r,s}if(ne(e[t])){let r=t+1;for(;r<e.length&&(ne(e[r])||oe(e[r])||"_"===e[r]||"."===e[r]);)r++;const s=e.substring(t,r).toLowerCase(),i=[ie.has(s)?s.toUpperCase():"NAME",s];return t=r,i}if(oe(e[t])){let r=t+1,s=!1;for(;r<e.length&&(oe(e[r])||"."===e[r]&&!s);)"."===e[r]&&(s=!0),r++;const i=["NUMBER",e.substring(t,r)];return t=r,i}"\n"!==e[t]&&"\r"!==e[t]||s++,t++}return["EOF",""]},hasNext:()=>t<e.length}}(e),r,s).parseExpression();return t&&(ce>i&&(ae={}),ae[e]=r&&n.isStatic()?new U(n.eval()):n,ce++),n}(e,r).eval();return void 0===s?0:"boolean"==typeof s?Number(s):s}class ue{constructor(e){this.entity=e,this.registry=new Map}set(e,t){this.registry.set(e,t)}get(e){return this.registry.get(e)}}function le(e,t,r){return t+r>e&&t-r<e}class pe{constructor(e,t,r){this.x=e,this.y=t,this.z=r}getX(){return this.x}getY(){return this.y}getZ(){return this.z}at(e){return"number"==typeof e?this.asArray()[e]:this.asObject()[e]}asArray(){return[this.x,this.y,this.z]}asObject(){return{x:this.x,y:this.y,z:this.z}}distanceTo(e){return Math.sqrt(Math.pow(this.x-e.getX(),2)+Math.pow(this.y-e.getY(),2)+Math.pow(this.z-e.getZ(),2))}isWithin(e,t){return le(this.x,e.getX(),t)&&le(this.y,e.getY(),t)&&le(this.z,e.getZ(),t)}}class fe{constructor(e){this.entity=e,this.registry=new Map}set(e,t){this.registry.set(e,t)}get(e){return this.registry.get(e)}}class ge{constructor(e,t){this.entity=e,this.eventToTrigger=t,"string"!=typeof t&&n("error",new Error("event.trigger must be of type string, found "+typeof t))}trigger(){"string"==typeof this.eventToTrigger&&this.entity.triggerEvent(this.eventToTrigger)}}class me{constructor(e,t){this.entity=e,this.sequence=[];for(const r of t){const t=we(e,r);if(!t)continue;const s=r.filters;void 0!==s?this.sequence.push([f(e,s),t]):this.sequence.push([null,t])}}trigger(){this.sequence.forEach(([e,t])=>{e&&!e.eval()||t.trigger()})}}class Ee{trigger(){}}class de{constructor(e,t){this.entity=e,this.addGroups=t.add?.component_groups??[],this.removeGroups=t.remove?.component_groups??[]}trigger(){this.removeGroups.forEach(e=>this.entity.componentGroups.removeComponentGroup(e)),this.addGroups.forEach(e=>this.entity.componentGroups.addComponentGroup(e))}}function we(e,t){for(const[r,s]of Object.entries(t)){if("add"===r||"remove"===r)return new de(e,t);if("sequence"===r)return new me(e,s);if("randomize"===r)return new me(e,s);if("trigger"===r)return new ge(e,s);if("weight"===r)return new Ee}}class ve{constructor(e,t){this.events=new Map,Object.entries(t).map(([t,r])=>{const s=we(e,r);s&&this.events.set(t,s)})}trigger(e){const t=this.events.get(e);if(!t)return n("error",new Error(`Event "${e}" not defined on entity`));t.trigger()}}return e.Entity=class extends class{constructor(){this.tickables=new Set}tick(e){this.tickables.forEach(t=>t.tick(e))}removeTickable(e){this.tickables.delete(e)}addTickable(e){this.tickables.add(e)}schedule(e){const t={tick:r=>{e.tick(r),this.tickables.delete(t)}};this.tickables.add(t)}}{constructor(e,t){super(),this.world=e,this.position=new pe(0,0,0),this.flags=new ue(this),this.tags=new Set,this.targetRegistry=new fe(this),this.activeComponents=new Map,this.queryEnv=function(e){const t=t=>e.getActiveComponent(t);return{"query.variant":()=>t("minecraft:variant")?.getValue()??0,"query.mark_variant":()=>t("minecraft:mark_variant")?.getValue()??0,"query.skin_id":()=>t("minecraft:skin_id")?.getValue()??0,"query.health":e.getHealth,"query.is_alive":()=>e.getHealth()>0,"query.position":t=>void 0===t?e.position.asObject():e.position.at(t),"query.has_any_family":(...e)=>(t("minecraft:type_family")?.getFamilies()??[]).some(t=>e.includes(t)),"query.blocking":()=>e.flags.get("isBlocking"),"query.can_climb":()=>e.flags.get("canClimb"),"query.can_fly":()=>e.flags.get("canFly"),"query.can_power_jump":()=>void 0!==t("minecraft:can_power_jump"),"query.can_swim":()=>e.flags.get("canSwim"),"query.can_walk":()=>e.flags.get("canWalk"),"query.is_on_fire":()=>e.flags.get("isOnFire"),"query.is_onfire":()=>e.flags.get("isOnFire"),"query.get_actor_info_id":()=>e.flags.get("numericalIdentifier"),"query.actor_count":()=>e.getWorld().getEntityCount(),"query.count":e=>Array.isArray(e)?e.length:1,"query.combine_entities":(...e)=>e.flat(1/0),"query.get_nearby_entities":(t,r)=>e.getWorld().nearbyEntities(e.position,t).filter(e=>e.flags.get("identifier")===r),"query.get_nearby_entities_except_self":(t,r)=>e.getWorld().nearbyEntities(e.position,t).filter(t=>t!==e&&(!r||t.flags.get("identifier")===r))}}(this),this.world.addEntity(this),this.targetRegistry.set("self",this);const{description:r,component_groups:s,components:i,events:o}=t["minecraft:entity"]||{};if(r||n("error",new Error("Entity has no valid description")),this.flags.set("identifier",r.identifier),this.flags.set("runtimeIdentifier",r.runtime_identifier),this.flags.set("isSpawnable",r.is_spawnable),this.flags.set("isSummonable",r.is_summonable),this.flags.set("isExperimental",r.is_experimental),this.componentGroups=new m(this,s??{}),i){this.componentGroups.createComponentGroup(this.flags.get("identifier"),i).add()}this.events=new ve(this,o??{})}executeMoLang(e){he(e,this.queryEnv)}activateComponent(e,t){const s=this.activeComponents.get(e);s&&s.reset(),s instanceof r&&this.tickables.delete(s),t instanceof r&&this.tickables.add(t),this.activeComponents.set(e,t)}deactivateComponent(e){const t=this.activeComponents.get(e);if(!t)throw new Error(`Component "${e}" cannot be deactivated because it is not active at the moment.`);t.reset(),t instanceof r&&this.tickables.delete(t),this.activeComponents.delete(e)}triggerEvent(e){this.events.trigger(e)}getActiveComponent(e){return this.activeComponents.get(e)}getWorld(){return this.world}getTarget(e){return e?this.targetRegistry.get(e)??this:this}kill(){this.world.deleteEntity(this)}getHealth(){return this.getActiveComponent("minecraft:health")?.getValue()??20}get isAlive(){return this.getHealth()>0}},e.World=class{constructor({isExperimental:e}){this.entityPool=new Set,this.nextEntityId=0,this.entityCount=0,this.isExperimental=e}getIsExperimental(){return this.isExperimental}getEntityCount(){return this.entityCount}addEntity(e){this.entityPool.add(e),this.entityCount++,this.nextEntityId++,e.flags.set("numericalIdentifier",this.nextEntityId)}deleteEntity(e){this.entityPool.delete(e),this.entityCount--}nearbyEntities(e,t){return[...this.entityPool].filter(r=>r.position.isWithin(e,t))}allEntities(){return[...this.entityPool]}},e}({});
