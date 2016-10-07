"use strict";function Compressor(e,t){return this instanceof Compressor?(TreeTransformer.call(this,this.before,this.after),void(this.options=defaults(e,{sequences:!t,properties:!t,dead_code:!t,drop_debugger:!t,unsafe:!1,unsafe_comps:!1,conditionals:!t,comparisons:!t,evaluate:!t,booleans:!t,loops:!t,unused:!t,hoist_funs:!t,keep_fargs:!1,hoist_vars:!1,if_return:!t,join_vars:!t,cascade:!t,side_effects:!t,pure_getters:!1,pure_funcs:null,negate_iife:!t,screw_ie8:!1,drop_console:!1,angular:!1,warnings:!0,global_defs:{}},!0))):new Compressor(e,t)}Compressor.prototype=new TreeTransformer,merge(Compressor.prototype,{option:function(e){return this.options[e]},warn:function(){this.options.warnings&&AST_Node.warn.apply(AST_Node,arguments)},before:function(e,t){if(e._squeezed)return e;var n=!1;return e instanceof AST_Scope&&(e=e.hoist_declarations(this),n=!0),t(e,this),e=e.optimize(this),n&&e instanceof AST_Scope&&(e.drop_unused(this),t(e,this)),e._squeezed=!0,e}}),function(){function e(e,t){e.DEFMETHOD("optimize",function(e){var n=this;if(n._optimized)return n;var r=t(n,e);return r._optimized=!0,r===n?r:r.transform(e)})}function t(e,t,n){return n||(n={}),t&&(n.start||(n.start=t.start),n.end||(n.end=t.end)),new e(n)}function n(e,n,r){if(n instanceof AST_Node)return n.transform(e);switch(typeof n){case"string":return t(AST_String,r,{value:n}).optimize(e);case"number":return t(isNaN(n)?AST_NaN:AST_Number,r,{value:n}).optimize(e);case"boolean":return t(n?AST_True:AST_False,r).optimize(e);case"undefined":return t(AST_Undefined,r).optimize(e);default:if(null===n)return t(AST_Null,r).optimize(e);if(n instanceof RegExp)return t(AST_RegExp,r).optimize(e);throw Error(string_template("Can't handle constant of type: {type}",{type:typeof n}))}}function r(e){if(null===e)return[];if(e instanceof AST_BlockStatement)return e.body;if(e instanceof AST_EmptyStatement)return[];if(e instanceof AST_Statement)return[e];throw Error("Can't convert thing to statement array")}function i(e){return null===e?!0:e instanceof AST_EmptyStatement?!0:e instanceof AST_BlockStatement?0==e.body.length:!1}function o(e){return e instanceof AST_Switch?e:(e instanceof AST_For||e instanceof AST_ForIn||e instanceof AST_DWLoop)&&e.body instanceof AST_BlockStatement?e.body:e}function a(e,n){function i(e){function r(e,n){return t(AST_SimpleStatement,e,{body:t(AST_Assign,e,{operator:"=",left:t(AST_Dot,n,{expression:t(AST_SymbolRef,n,n),property:"$inject"}),right:t(AST_Array,e,{elements:e.argnames.map(function(e){return t(AST_String,e,{value:e.name})})})})})}return e.reduce(function(e,t){e.push(t);var i=t.start,o=i.comments_before;if(o&&o.length>0){var a=o.pop();/@ngInject/.test(a.value)&&(t instanceof AST_Defun?e.push(r(t,t.name)):t instanceof AST_Definitions?t.definitions.forEach(function(t){t.value&&t.value instanceof AST_Lambda&&e.push(r(t.value,t.name))}):n.warn("Unknown statement marked with @ngInject [{file}:{line},{col}]",i))}return e},[])}function a(e){var t=[];return e.reduce(function(e,n){return n instanceof AST_BlockStatement?(d=!0,e.push.apply(e,a(n.body))):n instanceof AST_EmptyStatement?d=!0:n instanceof AST_Directive?t.indexOf(n.value)<0?(e.push(n),t.push(n.value)):d=!0:e.push(n),e},[])}function f(e,n){var i=n.self(),a=i instanceof AST_Lambda,s=[];e:for(var f=e.length;--f>=0;){var l=e[f];switch(!0){case a&&l instanceof AST_Return&&!l.value&&0==s.length:d=!0;continue e;case l instanceof AST_If:if(l.body instanceof AST_Return){if((a&&0==s.length||s[0]instanceof AST_Return&&!s[0].value)&&!l.body.value&&!l.alternative){d=!0;var u=t(AST_SimpleStatement,l.condition,{body:l.condition});s.unshift(u);continue e}if(s[0]instanceof AST_Return&&l.body.value&&s[0].value&&!l.alternative){d=!0,l=l.clone(),l.alternative=s[0],s[0]=l.transform(n);continue e}if((0==s.length||s[0]instanceof AST_Return)&&l.body.value&&!l.alternative&&a){d=!0,l=l.clone(),l.alternative=s[0]||t(AST_Return,l,{value:t(AST_Undefined,l)}),s[0]=l.transform(n);continue e}if(!l.body.value&&a){d=!0,l=l.clone(),l.condition=l.condition.negate(n),l.body=t(AST_BlockStatement,l,{body:r(l.alternative).concat(s)}),l.alternative=null,s=[l.transform(n)];continue e}if(1==s.length&&a&&s[0]instanceof AST_SimpleStatement&&(!l.alternative||l.alternative instanceof AST_SimpleStatement)){d=!0,s.push(t(AST_Return,s[0],{value:t(AST_Undefined,s[0])}).transform(n)),s=r(l.alternative).concat(s),s.unshift(l);continue e}}var _=c(l.body),S=_ instanceof AST_LoopControl?n.loopcontrol_target(_.label):null;if(_&&(_ instanceof AST_Return&&!_.value&&a||_ instanceof AST_Continue&&i===o(S)||_ instanceof AST_Break&&S instanceof AST_BlockStatement&&i===S)){_.label&&remove(_.label.thedef.references,_),d=!0;var p=r(l.body).slice(0,-1);l=l.clone(),l.condition=l.condition.negate(n),l.body=t(AST_BlockStatement,l,{body:r(l.alternative).concat(s)}),l.alternative=t(AST_BlockStatement,l,{body:p}),s=[l.transform(n)];continue e}var _=c(l.alternative),S=_ instanceof AST_LoopControl?n.loopcontrol_target(_.label):null;if(_&&(_ instanceof AST_Return&&!_.value&&a||_ instanceof AST_Continue&&i===o(S)||_ instanceof AST_Break&&S instanceof AST_BlockStatement&&i===S)){_.label&&remove(_.label.thedef.references,_),d=!0,l=l.clone(),l.body=t(AST_BlockStatement,l.body,{body:r(l.body).concat(s)}),l.alternative=t(AST_BlockStatement,l.alternative,{body:r(l.alternative).slice(0,-1)}),s=[l.transform(n)];continue e}s.unshift(l);break;default:s.unshift(l)}}return s}function l(e,t){var n=!1,r=e.length,i=t.self();return e=e.reduce(function(e,r){if(n)s(t,r,e);else{if(r instanceof AST_LoopControl){var a=t.loopcontrol_target(r.label);r instanceof AST_Break&&a instanceof AST_BlockStatement&&o(a)===i||r instanceof AST_Continue&&o(a)===i?r.label&&remove(r.label.thedef.references,r):e.push(r)}else e.push(r);c(r)&&(n=!0)}return e},[]),d=e.length!=r,e}function u(e,n){function r(){i=AST_Seq.from_array(i),i&&o.push(t(AST_SimpleStatement,i,{body:i})),i=[]}if(e.length<2)return e;var i=[],o=[];return e.forEach(function(e){e instanceof AST_SimpleStatement?i.push(e.body):(r(),o.push(e))}),r(),o=_(o,n),d=o.length!=e.length,o}function _(e,n){function r(e){i.pop();var t=o.body;return t instanceof AST_Seq?t.add(e):t=AST_Seq.cons(t,e),t.transform(n)}var i=[],o=null;return e.forEach(function(e){if(o)if(e instanceof AST_For){var n={};try{o.body.walk(new TreeWalker(function(e){if(e instanceof AST_Binary&&"in"==e.operator)throw n})),!e.init||e.init instanceof AST_Definitions?e.init||(e.init=o.body,i.pop()):e.init=r(e.init)}catch(a){if(a!==n)throw a}}else e instanceof AST_If?e.condition=r(e.condition):e instanceof AST_With?e.expression=r(e.expression):e instanceof AST_Exit&&e.value?e.value=r(e.value):e instanceof AST_Exit?e.value=r(t(AST_Undefined,e)):e instanceof AST_Switch&&(e.expression=r(e.expression));i.push(e),o=e instanceof AST_SimpleStatement?e:null}),i}function S(e){var t=null;return e.reduce(function(e,n){return n instanceof AST_Definitions&&t&&t.TYPE==n.TYPE?(t.definitions=t.definitions.concat(n.definitions),d=!0):n instanceof AST_For&&t instanceof AST_Definitions&&(!n.init||n.init.TYPE==t.TYPE)?(d=!0,e.pop(),n.init?n.init.definitions=t.definitions.concat(n.init.definitions):n.init=t,e.push(n),t=n):(t=n,e.push(n)),e},[])}function p(e){e.forEach(function(e){e instanceof AST_SimpleStatement&&(e.body=function n(e){return e.transform(new TreeTransformer(function(e){if(e instanceof AST_Call&&e.expression instanceof AST_Function)return t(AST_UnaryPrefix,e,{operator:"!",expression:e});if(e instanceof AST_Call)e.expression=n(e.expression);else if(e instanceof AST_Seq)e.car=n(e.car);else if(e instanceof AST_Conditional){var r=n(e.condition);if(r!==e.condition){e.condition=r;var i=e.consequent;e.consequent=e.alternative,e.alternative=i}}return e}))}(e.body))})}var d;do d=!1,n.option("angular")&&(e=i(e)),e=a(e),n.option("dead_code")&&(e=l(e,n)),n.option("if_return")&&(e=f(e,n)),n.option("sequences")&&(e=u(e,n)),n.option("join_vars")&&(e=S(e,n));while(d);return n.option("negate_iife")&&p(e,n),e}function s(e,t,n){e.warn("Dropping unreachable code [{file}:{line},{col}]",t.start),t.walk(new TreeWalker(function(t){return t instanceof AST_Definitions?(e.warn("Declarations in unreachable code! [{file}:{line},{col}]",t.start),t.remove_initializers(),n.push(t),!0):t instanceof AST_Defun?(n.push(t),!0):t instanceof AST_Scope?!0:void 0}))}function f(e,t){return e.print_to_string().length>t.print_to_string().length?t:e}function c(e){return e&&e.aborts()}function l(e,n){function i(i){i=r(i),e.body instanceof AST_BlockStatement?(e.body=e.body.clone(),e.body.body=i.concat(e.body.body.slice(1)),e.body=e.body.transform(n)):e.body=t(AST_BlockStatement,e.body,{body:i}).transform(n),l(e,n)}var o=e.body instanceof AST_BlockStatement?e.body.body[0]:e.body;o instanceof AST_If&&(o.body instanceof AST_Break&&n.loopcontrol_target(o.body.label)===e?(e.condition=e.condition?t(AST_Binary,e.condition,{left:e.condition,operator:"&&",right:o.condition.negate(n)}):o.condition.negate(n),i(o.alternative)):o.alternative instanceof AST_Break&&n.loopcontrol_target(o.alternative.label)===e&&(e.condition=e.condition?t(AST_Binary,e.condition,{left:e.condition,operator:"&&",right:o.condition}):o.condition,i(o.body)))}function u(e,t){var n=t.option("pure_getters");t.options.pure_getters=!1;var r=e.has_side_effects(t);return t.options.pure_getters=n,r}function _(e,n){return n.option("booleans")&&n.in_boolean_context()?t(AST_True,e):e}e(AST_Node,function(e){return e}),AST_Node.DEFMETHOD("equivalent_to",function(e){return this.print_to_string()==e.print_to_string()}),function(e){var t=["!","delete"],n=["in","instanceof","==","!=","===","!==","<","<=",">=",">"];e(AST_Node,function(){return!1}),e(AST_UnaryPrefix,function(){return member(this.operator,t)}),e(AST_Binary,function(){return member(this.operator,n)||("&&"==this.operator||"||"==this.operator)&&this.left.is_boolean()&&this.right.is_boolean()}),e(AST_Conditional,function(){return this.consequent.is_boolean()&&this.alternative.is_boolean()}),e(AST_Assign,function(){return"="==this.operator&&this.right.is_boolean()}),e(AST_Seq,function(){return this.cdr.is_boolean()}),e(AST_True,function(){return!0}),e(AST_False,function(){return!0})}(function(e,t){e.DEFMETHOD("is_boolean",t)}),function(e){e(AST_Node,function(){return!1}),e(AST_String,function(){return!0}),e(AST_UnaryPrefix,function(){return"typeof"==this.operator}),e(AST_Binary,function(e){return"+"==this.operator&&(this.left.is_string(e)||this.right.is_string(e))}),e(AST_Assign,function(e){return("="==this.operator||"+="==this.operator)&&this.right.is_string(e)}),e(AST_Seq,function(e){return this.cdr.is_string(e)}),e(AST_Conditional,function(e){return this.consequent.is_string(e)&&this.alternative.is_string(e)}),e(AST_Call,function(e){return e.option("unsafe")&&this.expression instanceof AST_SymbolRef&&"String"==this.expression.name&&this.expression.undeclared()})}(function(e,t){e.DEFMETHOD("is_string",t)}),function(e){function t(e,t){if(!t)throw Error("Compressor must be passed");return e._eval(t)}AST_Node.DEFMETHOD("evaluate",function(t){if(!t.option("evaluate"))return[this];try{var r=this._eval(t);return[f(n(t,r,this),this),r]}catch(i){if(i!==e)throw i;return[this]}}),e(AST_Statement,function(){throw Error(string_template("Cannot evaluate a statement [{file}:{line},{col}]",this.start))}),e(AST_Function,function(){throw e}),e(AST_Node,function(){throw e}),e(AST_Constant,function(){return this.getValue()}),e(AST_UnaryPrefix,function(n){var r=this.expression;switch(this.operator){case"!":return!t(r,n);case"typeof":if(r instanceof AST_Function)return"function";if(r=t(r,n),r instanceof RegExp)throw e;return typeof r;case"void":return void t(r,n);case"~":return~t(r,n);case"-":if(r=t(r,n),0===r)throw e;return-r;case"+":return+t(r,n)}throw e}),e(AST_Binary,function(n){var r=this.left,i=this.right;switch(this.operator){case"&&":return t(r,n)&&t(i,n);case"||":return t(r,n)||t(i,n);case"|":return t(r,n)|t(i,n);case"&":return t(r,n)&t(i,n);case"^":return t(r,n)^t(i,n);case"+":return t(r,n)+t(i,n);case"*":return t(r,n)*t(i,n);case"/":return t(r,n)/t(i,n);case"%":return t(r,n)%t(i,n);case"-":return t(r,n)-t(i,n);case"<<":return t(r,n)<<t(i,n);case">>":return t(r,n)>>t(i,n);case">>>":return t(r,n)>>>t(i,n);case"==":return t(r,n)==t(i,n);case"===":return t(r,n)===t(i,n);case"!=":return t(r,n)!=t(i,n);case"!==":return t(r,n)!==t(i,n);case"<":return t(r,n)<t(i,n);case"<=":return t(r,n)<=t(i,n);case">":return t(r,n)>t(i,n);case">=":return t(r,n)>=t(i,n);case"in":return t(r,n)in t(i,n);case"instanceof":return t(r,n)instanceof t(i,n)}throw e}),e(AST_Conditional,function(e){return t(this.condition,e)?t(this.consequent,e):t(this.alternative,e)}),e(AST_SymbolRef,function(n){var r=this.definition();if(r&&r.constant&&r.init)return t(r.init,n);throw e}),e(AST_Dot,function(n){if(n.option("unsafe")&&"length"==this.property){var r=t(this.expression,n);if("string"==typeof r)return r.length}throw e})}(function(e,t){e.DEFMETHOD("_eval",t)}),function(e){function n(e){return t(AST_UnaryPrefix,e,{operator:"!",expression:e})}e(AST_Node,function(){return n(this)}),e(AST_Statement,function(){throw Error("Cannot negate a statement")}),e(AST_Function,function(){return n(this)}),e(AST_UnaryPrefix,function(){return"!"==this.operator?this.expression:n(this)}),e(AST_Seq,function(e){var t=this.clone();return t.cdr=t.cdr.negate(e),t}),e(AST_Conditional,function(e){var t=this.clone();return t.consequent=t.consequent.negate(e),t.alternative=t.alternative.negate(e),f(n(this),t)}),e(AST_Binary,function(e){var t=this.clone(),r=this.operator;if(e.option("unsafe_comps"))switch(r){case"<=":return t.operator=">",t;case"<":return t.operator=">=",t;case">=":return t.operator="<",t;case">":return t.operator="<=",t}switch(r){case"==":return t.operator="!=",t;case"!=":return t.operator="==",t;case"===":return t.operator="!==",t;case"!==":return t.operator="===",t;case"&&":return t.operator="||",t.left=t.left.negate(e),t.right=t.right.negate(e),f(n(this),t);case"||":return t.operator="&&",t.left=t.left.negate(e),t.right=t.right.negate(e),f(n(this),t)}return n(this)})}(function(e,t){e.DEFMETHOD("negate",function(e){return t.call(this,e)})}),function(e){e(AST_Node,function(){return!0}),e(AST_EmptyStatement,function(){return!1}),e(AST_Constant,function(){return!1}),e(AST_This,function(){return!1}),e(AST_Call,function(e){var t=e.option("pure_funcs");return t?t.indexOf(this.expression.print_to_string())<0:!0}),e(AST_Block,function(e){for(var t=this.body.length;--t>=0;)if(this.body[t].has_side_effects(e))return!0;return!1}),e(AST_SimpleStatement,function(e){return this.body.has_side_effects(e)}),e(AST_Defun,function(){return!0}),e(AST_Function,function(){return!1}),e(AST_Binary,function(e){return this.left.has_side_effects(e)||this.right.has_side_effects(e)}),e(AST_Assign,function(){return!0}),e(AST_Conditional,function(e){return this.condition.has_side_effects(e)||this.consequent.has_side_effects(e)||this.alternative.has_side_effects(e)}),e(AST_Unary,function(e){return"delete"==this.operator||"++"==this.operator||"--"==this.operator||this.expression.has_side_effects(e)}),e(AST_SymbolRef,function(){return!1}),e(AST_Object,function(e){for(var t=this.properties.length;--t>=0;)if(this.properties[t].has_side_effects(e))return!0;return!1}),e(AST_ObjectProperty,function(e){return this.value.has_side_effects(e)}),e(AST_Array,function(e){for(var t=this.elements.length;--t>=0;)if(this.elements[t].has_side_effects(e))return!0;return!1}),e(AST_Dot,function(e){return e.option("pure_getters")?this.expression.has_side_effects(e):!0}),e(AST_Sub,function(e){return e.option("pure_getters")?this.expression.has_side_effects(e)||this.property.has_side_effects(e):!0}),e(AST_PropAccess,function(e){return!e.option("pure_getters")}),e(AST_Seq,function(e){return this.car.has_side_effects(e)||this.cdr.has_side_effects(e)})}(function(e,t){e.DEFMETHOD("has_side_effects",t)}),function(e){function t(){var e=this.body.length;return e>0&&c(this.body[e-1])}e(AST_Statement,function(){return null}),e(AST_Jump,function(){return this}),e(AST_BlockStatement,t),e(AST_SwitchBranch,t),e(AST_If,function(){return this.alternative&&c(this.body)&&c(this.alternative)})}(function(e,t){e.DEFMETHOD("aborts",t)}),e(AST_Directive,function(e){return e.scope.has_directive(e.value)!==e.scope?t(AST_EmptyStatement,e):e}),e(AST_Debugger,function(e,n){return n.option("drop_debugger")?t(AST_EmptyStatement,e):e}),e(AST_LabeledStatement,function(e,n){return e.body instanceof AST_Break&&n.loopcontrol_target(e.body.label)===e.body?t(AST_EmptyStatement,e):0==e.label.references.length?e.body:e}),e(AST_Block,function(e,t){return e.body=a(e.body,t),e}),e(AST_BlockStatement,function(e,n){switch(e.body=a(e.body,n),e.body.length){case 1:return e.body[0];case 0:return t(AST_EmptyStatement,e)}return e}),AST_Scope.DEFMETHOD("drop_unused",function(e){var n=this;if(e.option("unused")&&!(n instanceof AST_Toplevel)&&!n.uses_eval){var r=[],i=new Dictionary,o=this,a=new TreeWalker(function(t,s){if(t!==n){if(t instanceof AST_Defun)return i.add(t.name.name,t),!0;if(t instanceof AST_Definitions&&o===n)return t.definitions.forEach(function(t){t.value&&(i.add(t.name.name,t.value),t.value.has_side_effects(e)&&t.value.walk(a))}),!0;if(t instanceof AST_SymbolRef)return push_uniq(r,t.definition()),!0;if(t instanceof AST_Scope){var f=o;return o=t,s(),o=f,!0}}});n.walk(a);for(var s=0;s<r.length;++s)r[s].orig.forEach(function(e){var t=i.get(e.name);t&&t.forEach(function(e){var t=new TreeWalker(function(e){e instanceof AST_SymbolRef&&push_uniq(r,e.definition())});e.walk(t)})});var f=new TreeTransformer(function(i,o,a){if(i instanceof AST_Lambda&&!(i instanceof AST_Accessor)&&!e.option("keep_fargs"))for(var s=i.argnames,c=s.length;--c>=0;){var l=s[c];if(!l.unreferenced())break;s.pop(),e.warn("Dropping unused function argument {name} [{file}:{line},{col}]",{name:l.name,file:l.start.file,line:l.start.line,col:l.start.col})}if(i instanceof AST_Defun&&i!==n)return member(i.name.definition(),r)?i:(e.warn("Dropping unused function {name} [{file}:{line},{col}]",{name:i.name.name,file:i.name.start.file,line:i.name.start.line,col:i.name.start.col}),t(AST_EmptyStatement,i));if(i instanceof AST_Definitions&&!(f.parent()instanceof AST_ForIn)){var u=i.definitions.filter(function(t){if(member(t.name.definition(),r))return!0;var n={name:t.name.name,file:t.name.start.file,line:t.name.start.line,col:t.name.start.col};return t.value&&t.value.has_side_effects(e)?(t._unused_side_effects=!0,e.warn("Side effects in initialization of unused variable {name} [{file}:{line},{col}]",n),!0):(e.warn("Dropping unused variable {name} [{file}:{line},{col}]",n),!1)});u=mergeSort(u,function(e,t){return!e.value&&t.value?-1:!t.value&&e.value?1:0});for(var _=[],c=0;c<u.length;){var S=u[c];S._unused_side_effects?(_.push(S.value),u.splice(c,1)):(_.length>0&&(_.push(S.value),S.value=AST_Seq.from_array(_),_=[]),++c)}return _=_.length>0?t(AST_BlockStatement,i,{body:[t(AST_SimpleStatement,i,{body:AST_Seq.from_array(_)})]}):null,0!=u.length||_?0==u.length?_:(i.definitions=u,_&&(_.body.unshift(i),i=_),i):t(AST_EmptyStatement,i)}if(i instanceof AST_For&&(o(i,this),i.init instanceof AST_BlockStatement)){var p=i.init.body.slice(0,-1);return i.init=i.init.body.slice(-1)[0].body,p.push(i),a?MAP.splice(p):t(AST_BlockStatement,i,{body:p})}return i instanceof AST_Scope&&i!==n?i:void 0});n.transform(f)}}),AST_Scope.DEFMETHOD("hoist_declarations",function(e){var n=e.option("hoist_funs"),r=e.option("hoist_vars"),i=this;if(n||r){var o=[],a=[],s=new Dictionary,f=0,c=0;i.walk(new TreeWalker(function(e){return e instanceof AST_Scope&&e!==i?!0:e instanceof AST_Var?(++c,!0):void 0})),r=r&&c>1;var l=new TreeTransformer(function(e){if(e!==i){if(e instanceof AST_Directive)return o.push(e),t(AST_EmptyStatement,e);if(e instanceof AST_Defun&&n)return a.push(e),t(AST_EmptyStatement,e);if(e instanceof AST_Var&&r){e.definitions.forEach(function(e){s.set(e.name.name,e),++f});var c=e.to_assignments(),u=l.parent();return u instanceof AST_ForIn&&u.init===e?null==c?e.definitions[0].name:c:u instanceof AST_For&&u.init===e?c:c?t(AST_SimpleStatement,e,{body:c}):t(AST_EmptyStatement,e)}if(e instanceof AST_Scope)return e}});if(i=i.transform(l),f>0){var u=[];if(s.each(function(e,t){i instanceof AST_Lambda&&find_if(function(t){return t.name==e.name.name},i.argnames)?s.del(t):(e=e.clone(),e.value=null,u.push(e),s.set(t,e))}),u.length>0){for(var _=0;_<i.body.length;){if(i.body[_]instanceof AST_SimpleStatement){var S,p,d=i.body[_].body;if(d instanceof AST_Assign&&"="==d.operator&&(S=d.left)instanceof AST_Symbol&&s.has(S.name)){var T=s.get(S.name);if(T.value)break;T.value=d.right,remove(u,T),u.push(T),i.body.splice(_,1);continue}if(d instanceof AST_Seq&&(p=d.car)instanceof AST_Assign&&"="==p.operator&&(S=p.left)instanceof AST_Symbol&&s.has(S.name)){var T=s.get(S.name);if(T.value)break;T.value=p.right,remove(u,T),u.push(T),i.body[_].body=d.cdr;continue}}if(i.body[_]instanceof AST_EmptyStatement)i.body.splice(_,1);else{if(!(i.body[_]instanceof AST_BlockStatement))break;var h=[_,1].concat(i.body[_].body);i.body.splice.apply(i.body,h)}}u=t(AST_Var,i,{definitions:u}),a.push(u)}}i.body=o.concat(a,i.body)}return i}),e(AST_SimpleStatement,function(e,n){return n.option("side_effects")&&!e.body.has_side_effects(n)?(n.warn("Dropping side-effect-free statement [{file}:{line},{col}]",e.start),t(AST_EmptyStatement,e)):e}),e(AST_DWLoop,function(e,n){var r=e.condition.evaluate(n);if(e.condition=r[0],!n.option("loops"))return e;if(r.length>1){if(r[1])return t(AST_For,e,{body:e.body});if(e instanceof AST_While&&n.option("dead_code")){var i=[];return s(n,e.body,i),t(AST_BlockStatement,e,{body:i})}}return e}),e(AST_While,function(e,n){return n.option("loops")?(e=AST_DWLoop.prototype.optimize.call(e,n),e instanceof AST_While&&(l(e,n),e=t(AST_For,e,e).transform(n)),e):e}),e(AST_For,function(e,n){var r=e.condition;if(r&&(r=r.evaluate(n),e.condition=r[0]),!n.option("loops"))return e;if(r&&r.length>1&&!r[1]&&n.option("dead_code")){var i=[];return e.init instanceof AST_Statement?i.push(e.init):e.init&&i.push(t(AST_SimpleStatement,e.init,{body:e.init})),s(n,e.body,i),t(AST_BlockStatement,e,{body:i})}return l(e,n),e}),e(AST_If,function(e,n){if(!n.option("conditionals"))return e;var r=e.condition.evaluate(n);if(e.condition=r[0],r.length>1)if(r[1]){if(n.warn("Condition always true [{file}:{line},{col}]",e.condition.start),n.option("dead_code")){var o=[];return e.alternative&&s(n,e.alternative,o),o.push(e.body),t(AST_BlockStatement,e,{body:o}).transform(n)}}else if(n.warn("Condition always false [{file}:{line},{col}]",e.condition.start),n.option("dead_code")){var o=[];return s(n,e.body,o),e.alternative&&o.push(e.alternative),t(AST_BlockStatement,e,{body:o}).transform(n)}i(e.alternative)&&(e.alternative=null);var a=e.condition.negate(n),l=f(e.condition,a)===a;if(e.alternative&&l){l=!1,e.condition=a;var u=e.body;e.body=e.alternative||t(AST_EmptyStatement),e.alternative=u}if(i(e.body)&&i(e.alternative))return t(AST_SimpleStatement,e.condition,{body:e.condition}).transform(n);if(e.body instanceof AST_SimpleStatement&&e.alternative instanceof AST_SimpleStatement)return t(AST_SimpleStatement,e,{body:t(AST_Conditional,e,{condition:e.condition,consequent:e.body.body,alternative:e.alternative.body})}).transform(n);if(i(e.alternative)&&e.body instanceof AST_SimpleStatement)return l?t(AST_SimpleStatement,e,{body:t(AST_Binary,e,{operator:"||",left:a,right:e.body.body})}).transform(n):t(AST_SimpleStatement,e,{body:t(AST_Binary,e,{operator:"&&",left:e.condition,right:e.body.body})}).transform(n);if(e.body instanceof AST_EmptyStatement&&e.alternative&&e.alternative instanceof AST_SimpleStatement)return t(AST_SimpleStatement,e,{body:t(AST_Binary,e,{operator:"||",left:e.condition,right:e.alternative.body})}).transform(n);if(e.body instanceof AST_Exit&&e.alternative instanceof AST_Exit&&e.body.TYPE==e.alternative.TYPE)return t(e.body.CTOR,e,{value:t(AST_Conditional,e,{condition:e.condition,consequent:e.body.value||t(AST_Undefined,e.body).optimize(n),alternative:e.alternative.value||t(AST_Undefined,e.alternative).optimize(n)})}).transform(n);if(e.body instanceof AST_If&&!e.body.alternative&&!e.alternative&&(e.condition=t(AST_Binary,e.condition,{operator:"&&",left:e.condition,right:e.body.condition}).transform(n),e.body=e.body.body),c(e.body)&&e.alternative){var _=e.alternative;return e.alternative=null,t(AST_BlockStatement,e,{body:[e,_]}).transform(n)}if(c(e.alternative)){var S=e.body;return e.body=e.alternative,e.condition=l?a:e.condition.negate(n),e.alternative=null,t(AST_BlockStatement,e,{body:[e,S]}).transform(n)}return e}),e(AST_Switch,function(e,n){if(0==e.body.length&&n.option("conditionals"))return t(AST_SimpleStatement,e,{body:e.expression}).transform(n);for(;;){var r=e.body[e.body.length-1];if(r){var i=r.body[r.body.length-1];if(i instanceof AST_Break&&o(n.loopcontrol_target(i.label))===e&&r.body.pop(),r instanceof AST_Default&&0==r.body.length){e.body.pop();continue}}break}var a=e.expression.evaluate(n);e:if(2==a.length)try{if(e.expression=a[0],!n.option("dead_code"))break e;var s=a[1],f=!1,l=!1,u=!1,_=!1,S=!1,p=new TreeTransformer(function(r,i,o){if(r instanceof AST_Lambda||r instanceof AST_SimpleStatement)return r;if(r instanceof AST_Switch&&r===e)return r=r.clone(),i(r,this),S?r:t(AST_BlockStatement,r,{body:r.body.reduce(function(e,t){return e.concat(t.body)},[])}).transform(n);if(r instanceof AST_If||r instanceof AST_Try){var a=f;return f=!l,i(r,this),f=a,r}if(r instanceof AST_StatementWithBody||r instanceof AST_Switch){var a=l;return l=!0,i(r,this),l=a,r}if(r instanceof AST_Break&&this.loopcontrol_target(r.label)===e)return f?(S=!0,r):l?r:(_=!0,o?MAP.skip:t(AST_EmptyStatement,r));if(r instanceof AST_SwitchBranch&&this.parent()===e){if(_)return MAP.skip;if(r instanceof AST_Case){var p=r.expression.evaluate(n);if(p.length<2)throw e;return p[1]===s||u?(u=!0,c(r)&&(_=!0),i(r,this),r):MAP.skip}return i(r,this),r}});p.stack=n.stack.slice(),e=e.transform(p)}catch(d){if(d!==e)throw d}return e}),e(AST_Case,function(e,t){return e.body=a(e.body,t),e}),e(AST_Try,function(e,t){return e.body=a(e.body,t),e}),AST_Definitions.DEFMETHOD("remove_initializers",function(){this.definitions.forEach(function(e){e.value=null})}),AST_Definitions.DEFMETHOD("to_assignments",function(){var e=this.definitions.reduce(function(e,n){if(n.value){var r=t(AST_SymbolRef,n.name,n.name);e.push(t(AST_Assign,n,{operator:"=",left:r,right:n.value}))}return e},[]);return 0==e.length?null:AST_Seq.from_array(e)}),e(AST_Definitions,function(e){return 0==e.definitions.length?t(AST_EmptyStatement,e):e}),e(AST_Function,function(e,t){return e=AST_Lambda.prototype.optimize.call(e,t),t.option("unused")&&e.name&&e.name.unreferenced()&&(e.name=null),e}),e(AST_Call,function(e,r){if(r.option("unsafe")){var i=e.expression;if(i instanceof AST_SymbolRef&&i.undeclared())switch(i.name){case"Array":if(1!=e.args.length)return t(AST_Array,e,{elements:e.args}).transform(r);break;case"Object":if(0==e.args.length)return t(AST_Object,e,{properties:[]});break;case"String":if(0==e.args.length)return t(AST_String,e,{value:""});if(e.args.length<=1)return t(AST_Binary,e,{left:e.args[0],operator:"+",right:t(AST_String,e,{value:""})}).transform(r);break;case"Number":if(0==e.args.length)return t(AST_Number,e,{value:0});if(1==e.args.length)return t(AST_UnaryPrefix,e,{expression:e.args[0],operator:"+"}).transform(r);case"Boolean":if(0==e.args.length)return t(AST_False,e);if(1==e.args.length)return t(AST_UnaryPrefix,e,{expression:t(AST_UnaryPrefix,null,{expression:e.args[0],operator:"!"}),operator:"!"}).transform(r);break;case"Function":if(all(e.args,function(e){return e instanceof AST_String}))try{var o="(function("+e.args.slice(0,-1).map(function(e){return e.value}).join(",")+"){"+e.args[e.args.length-1].value+"})()",a=parse(o);a.figure_out_scope({screw_ie8:r.option("screw_ie8")});var s=new Compressor(r.options);a=a.transform(s),a.figure_out_scope({screw_ie8:r.option("screw_ie8")}),a.mangle_names();var c;try{a.walk(new TreeWalker(function(e){if(e instanceof AST_Lambda)throw c=e,a}))}catch(l){if(l!==a)throw l}var u=c.argnames.map(function(n,r){return t(AST_String,e.args[r],{value:n.print_to_string()})}),o=OutputStream();return AST_BlockStatement.prototype._codegen.call(c,c,o),o=(""+o).replace(/^\{|\}$/g,""),u.push(t(AST_String,e.args[e.args.length-1],{value:o})),e.args=u,e}catch(l){if(!(l instanceof JS_Parse_Error))throw console.log(l),l;r.warn("Error parsing code passed to new Function [{file}:{line},{col}]",e.args[e.args.length-1].start),r.warn(""+l)}}else{if(i instanceof AST_Dot&&"toString"==i.property&&0==e.args.length)return t(AST_Binary,e,{left:t(AST_String,e,{value:""}),operator:"+",right:i.expression}).transform(r);if(i instanceof AST_Dot&&i.expression instanceof AST_Array&&"join"==i.property){var _=0==e.args.length?",":e.args[0].evaluate(r)[1];if(null!=_){var S=i.expression.elements.reduce(function(e,t){if(t=t.evaluate(r),0==e.length||1==t.length)e.push(t);else{var i=e[e.length-1];if(2==i.length){var o=""+i[1]+_+t[1];e[e.length-1]=[n(r,o,i[0]),o]}else e.push(t)}return e},[]);if(0==S.length)return t(AST_String,e,{value:""});if(1==S.length)return S[0][0];if(""==_){var p;return p=S[0][0]instanceof AST_String||S[1][0]instanceof AST_String?S.shift()[0]:t(AST_String,e,{value:""}),S.reduce(function(e,n){return t(AST_Binary,n[0],{operator:"+",left:e,right:n[0]})},p).transform(r)}var d=e.clone();return d.expression=d.expression.clone(),d.expression.expression=d.expression.expression.clone(),d.expression.expression.elements=S.map(function(e){return e[0]}),f(e,d)}}}}return r.option("side_effects")&&e.expression instanceof AST_Function&&0==e.args.length&&!AST_Block.prototype.has_side_effects.call(e.expression,r)?t(AST_Undefined,e).transform(r):r.option("drop_console")&&e.expression instanceof AST_PropAccess&&e.expression.expression instanceof AST_SymbolRef&&"console"==e.expression.expression.name&&e.expression.expression.undeclared()?t(AST_Undefined,e).transform(r):e.evaluate(r)[0]}),e(AST_New,function(e,n){if(n.option("unsafe")){var r=e.expression;if(r instanceof AST_SymbolRef&&r.undeclared())switch(r.name){case"Object":case"RegExp":case"Function":case"Error":case"Array":return t(AST_Call,e,e).transform(n)}}return e}),e(AST_Seq,function(e,n){if(!n.option("side_effects"))return e;if(!e.car.has_side_effects(n)){var r;if(!(e.cdr instanceof AST_SymbolRef&&"eval"==e.cdr.name&&e.cdr.undeclared()&&(r=n.parent())instanceof AST_Call&&r.expression===e))return e.cdr}if(n.option("cascade")){if(e.car instanceof AST_Assign&&!e.car.left.has_side_effects(n)){if(e.car.left.equivalent_to(e.cdr))return e.car;if(e.cdr instanceof AST_Call&&e.cdr.expression.equivalent_to(e.car.left))return e.cdr.expression=e.car,e.cdr}if(!e.car.has_side_effects(n)&&!e.cdr.has_side_effects(n)&&e.car.equivalent_to(e.cdr))return e.car}return e.cdr instanceof AST_UnaryPrefix&&"void"==e.cdr.operator&&!e.cdr.expression.has_side_effects(n)?(e.cdr.operator=e.car,e.cdr):e.cdr instanceof AST_Undefined?t(AST_UnaryPrefix,e,{operator:"void",expression:e.car}):e}),AST_Unary.DEFMETHOD("lift_sequences",function(e){if(e.option("sequences")&&this.expression instanceof AST_Seq){var t=this.expression,n=t.to_array();return this.expression=n.pop(),n.push(this),t=AST_Seq.from_array(n).transform(e)}return this}),e(AST_UnaryPostfix,function(e,t){return e.lift_sequences(t)}),e(AST_UnaryPrefix,function(e,n){e=e.lift_sequences(n);var r=e.expression;if(n.option("booleans")&&n.in_boolean_context()){switch(e.operator){case"!":if(r instanceof AST_UnaryPrefix&&"!"==r.operator)return r.expression;break;case"typeof":return n.warn("Boolean expression always true [{file}:{line},{col}]",e.start),t(AST_True,e)}r instanceof AST_Binary&&"!"==e.operator&&(e=f(e,r.negate(n)))}return e.evaluate(n)[0]}),AST_Binary.DEFMETHOD("lift_sequences",function(e){if(e.option("sequences")){if(this.left instanceof AST_Seq){var t=this.left,n=t.to_array();return this.left=n.pop(),n.push(this),t=AST_Seq.from_array(n).transform(e)}if(this.right instanceof AST_Seq&&this instanceof AST_Assign&&!u(this.left,e)){var t=this.right,n=t.to_array();
return this.right=n.pop(),n.push(this),t=AST_Seq.from_array(n).transform(e)}}return this});var S=makePredicate("== === != !== * & | ^");e(AST_Binary,function(e,n){var r=n.has_directive("use asm")?noop:function(t,r){if(r||!e.left.has_side_effects(n)&&!e.right.has_side_effects(n)){t&&(e.operator=t);var i=e.left;e.left=e.right,e.right=i}};if(S(e.operator)&&(e.right instanceof AST_Constant&&!(e.left instanceof AST_Constant)&&(e.left instanceof AST_Binary&&PRECEDENCE[e.left.operator]>=PRECEDENCE[e.operator]||r(null,!0)),/^[!=]==?$/.test(e.operator))){if(e.left instanceof AST_SymbolRef&&e.right instanceof AST_Conditional){if(e.right.consequent instanceof AST_SymbolRef&&e.right.consequent.definition()===e.left.definition()){if(/^==/.test(e.operator))return e.right.condition;if(/^!=/.test(e.operator))return e.right.condition.negate(n)}if(e.right.alternative instanceof AST_SymbolRef&&e.right.alternative.definition()===e.left.definition()){if(/^==/.test(e.operator))return e.right.condition.negate(n);if(/^!=/.test(e.operator))return e.right.condition}}if(e.right instanceof AST_SymbolRef&&e.left instanceof AST_Conditional){if(e.left.consequent instanceof AST_SymbolRef&&e.left.consequent.definition()===e.right.definition()){if(/^==/.test(e.operator))return e.left.condition;if(/^!=/.test(e.operator))return e.left.condition.negate(n)}if(e.left.alternative instanceof AST_SymbolRef&&e.left.alternative.definition()===e.right.definition()){if(/^==/.test(e.operator))return e.left.condition.negate(n);if(/^!=/.test(e.operator))return e.left.condition}}}if(e=e.lift_sequences(n),n.option("comparisons"))switch(e.operator){case"===":case"!==":(e.left.is_string(n)&&e.right.is_string(n)||e.left.is_boolean()&&e.right.is_boolean())&&(e.operator=e.operator.substr(0,2));case"==":case"!=":e.left instanceof AST_String&&"undefined"==e.left.value&&e.right instanceof AST_UnaryPrefix&&"typeof"==e.right.operator&&n.option("unsafe")&&(e.right.expression instanceof AST_SymbolRef&&e.right.expression.undeclared()||(e.right=e.right.expression,e.left=t(AST_Undefined,e.left).optimize(n),2==e.operator.length&&(e.operator+="=")))}if(n.option("booleans")&&n.in_boolean_context())switch(e.operator){case"&&":var i=e.left.evaluate(n),o=e.right.evaluate(n);if(i.length>1&&!i[1]||o.length>1&&!o[1])return n.warn("Boolean && always false [{file}:{line},{col}]",e.start),t(AST_False,e);if(i.length>1&&i[1])return o[0];if(o.length>1&&o[1])return i[0];break;case"||":var i=e.left.evaluate(n),o=e.right.evaluate(n);if(i.length>1&&i[1]||o.length>1&&o[1])return n.warn("Boolean || always true [{file}:{line},{col}]",e.start),t(AST_True,e);if(i.length>1&&!i[1])return o[0];if(o.length>1&&!o[1])return i[0];break;case"+":var i=e.left.evaluate(n),o=e.right.evaluate(n);if(i.length>1&&i[0]instanceof AST_String&&i[1]||o.length>1&&o[0]instanceof AST_String&&o[1])return n.warn("+ in boolean context always true [{file}:{line},{col}]",e.start),t(AST_True,e)}if(n.option("comparisons")){if(!(n.parent()instanceof AST_Binary)||n.parent()instanceof AST_Assign){var a=t(AST_UnaryPrefix,e,{operator:"!",expression:e.negate(n)});e=f(e,a)}switch(e.operator){case"<":r(">");break;case"<=":r(">=")}}return"+"==e.operator&&e.right instanceof AST_String&&""===e.right.getValue()&&e.left instanceof AST_Binary&&"+"==e.left.operator&&e.left.is_string(n)?e.left:(n.option("evaluate")&&"+"==e.operator&&(e.left instanceof AST_Constant&&e.right instanceof AST_Binary&&"+"==e.right.operator&&e.right.left instanceof AST_Constant&&e.right.is_string(n)&&(e=t(AST_Binary,e,{operator:"+",left:t(AST_String,null,{value:""+e.left.getValue()+e.right.left.getValue(),start:e.left.start,end:e.right.left.end}),right:e.right.right})),e.right instanceof AST_Constant&&e.left instanceof AST_Binary&&"+"==e.left.operator&&e.left.right instanceof AST_Constant&&e.left.is_string(n)&&(e=t(AST_Binary,e,{operator:"+",left:e.left.left,right:t(AST_String,null,{value:""+e.left.right.getValue()+e.right.getValue(),start:e.left.right.start,end:e.right.end})})),e.left instanceof AST_Binary&&"+"==e.left.operator&&e.left.is_string(n)&&e.left.right instanceof AST_Constant&&e.right instanceof AST_Binary&&"+"==e.right.operator&&e.right.left instanceof AST_Constant&&e.right.is_string(n)&&(e=t(AST_Binary,e,{operator:"+",left:t(AST_Binary,e.left,{operator:"+",left:e.left.left,right:t(AST_String,null,{value:""+e.left.right.getValue()+e.right.left.getValue(),start:e.left.right.start,end:e.right.left.end})}),right:e.right.right}))),e.right instanceof AST_Binary&&e.right.operator==e.operator&&("*"==e.operator||"&&"==e.operator||"||"==e.operator)?(e.left=t(AST_Binary,e.left,{operator:e.operator,left:e.left,right:e.right.left}),e.right=e.right.right,e.transform(n)):e.evaluate(n)[0])}),e(AST_SymbolRef,function(e,r){if(e.undeclared()){var i=r.option("global_defs");if(i&&i.hasOwnProperty(e.name))return n(r,i[e.name],e);switch(e.name){case"undefined":return t(AST_Undefined,e);case"NaN":return t(AST_NaN,e);case"Infinity":return t(AST_Infinity,e)}}return e}),e(AST_Undefined,function(e,n){if(n.option("unsafe")){var r=n.find_parent(AST_Scope),i=r.find_variable("undefined");if(i){var o=t(AST_SymbolRef,e,{name:"undefined",scope:r,thedef:i});return o.reference(),o}}return e});var p=["+","-","/","*","%",">>","<<",">>>","|","^","&"];e(AST_Assign,function(e,t){return e=e.lift_sequences(t),"="==e.operator&&e.left instanceof AST_SymbolRef&&e.right instanceof AST_Binary&&e.right.left instanceof AST_SymbolRef&&e.right.left.name==e.left.name&&member(e.right.operator,p)&&(e.operator=e.right.operator+"=",e.right=e.right.right),e}),e(AST_Conditional,function(e,n){if(!n.option("conditionals"))return e;if(e.condition instanceof AST_Seq){var r=e.condition.car;return e.condition=e.condition.cdr,AST_Seq.cons(r,e)}var i=e.condition.evaluate(n);if(i.length>1)return i[1]?(n.warn("Condition always true [{file}:{line},{col}]",e.start),e.consequent):(n.warn("Condition always false [{file}:{line},{col}]",e.start),e.alternative);var o=i[0].negate(n);f(i[0],o)===o&&(e=t(AST_Conditional,e,{condition:o,consequent:e.alternative,alternative:e.consequent}));var a=e.consequent,s=e.alternative;if(a instanceof AST_Assign&&s instanceof AST_Assign&&a.operator==s.operator&&a.left.equivalent_to(s.left))return t(AST_Assign,e,{operator:a.operator,left:a.left,right:t(AST_Conditional,e,{condition:e.condition,consequent:a.right,alternative:s.right})});if(a instanceof AST_Call&&s.TYPE===a.TYPE&&a.args.length==s.args.length&&a.expression.equivalent_to(s.expression)){if(0==a.args.length)return t(AST_Seq,e,{car:e.condition,cdr:a});if(1==a.args.length)return a.args[0]=t(AST_Conditional,e,{condition:e.condition,consequent:a.args[0],alternative:s.args[0]}),a}return a instanceof AST_Conditional&&a.alternative.equivalent_to(s)?t(AST_Conditional,e,{condition:t(AST_Binary,e,{left:e.condition,operator:"&&",right:a.condition}),consequent:a.consequent,alternative:s}):e}),e(AST_Boolean,function(e,n){if(n.option("booleans")){var r=n.parent();return r instanceof AST_Binary&&("=="==r.operator||"!="==r.operator)?(n.warn("Non-strict equality against boolean: {operator} {value} [{file}:{line},{col}]",{operator:r.operator,value:e.value,file:r.start.file,line:r.start.line,col:r.start.col}),t(AST_Number,e,{value:+e.value})):t(AST_UnaryPrefix,e,{operator:"!",expression:t(AST_Number,e,{value:1-e.value})})}return e}),e(AST_Sub,function(e,n){var r=e.property;if(r instanceof AST_String&&n.option("properties")){if(r=r.getValue(),RESERVED_WORDS(r)?n.option("screw_ie8"):is_identifier_string(r))return t(AST_Dot,e,{expression:e.expression,property:r}).optimize(n);var i=parseFloat(r);isNaN(i)||""+i!=r||(e.property=t(AST_Number,e.property,{value:i}))}return e}),e(AST_Dot,function(e,t){return e.evaluate(t)[0]}),e(AST_Array,_),e(AST_Object,_),e(AST_RegExp,_)}();