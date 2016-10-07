"use strict";function SymbolDef(e,n,t){this.name=t.name,this.orig=[t],this.scope=e,this.references=[],this.global=!1,this.mangled_name=null,this.undeclared=!1,this.constant=!1,this.index=n}SymbolDef.prototype={unmangleable:function(e){return this.global&&!(e&&e.toplevel)||this.undeclared||!(e&&e.eval)&&(this.scope.uses_eval||this.scope.uses_with)},mangle:function(e){if(!this.mangled_name&&!this.unmangleable(e)){var n=this.scope;!e.screw_ie8&&this.orig[0]instanceof AST_SymbolLambda&&(n=n.parent_scope),this.mangled_name=n.next_mangled(e,this)}}},AST_Toplevel.DEFMETHOD("figure_out_scope",function(e){e=defaults(e,{screw_ie8:!1});var n=this,t=n.parent_scope=null,i=null,a=0,s=new TreeWalker(function(n,o){if(e.screw_ie8&&n instanceof AST_Catch){var r=t;return t=new AST_Scope(n),t.init_scope_vars(a),t.parent_scope=r,o(),t=r,!0}if(n instanceof AST_Scope){n.init_scope_vars(a);var r=n.parent_scope=t,c=i;return i=t=n,++a,o(),--a,t=r,i=c,!0}if(n instanceof AST_Directive)return n.scope=t,push_uniq(t.directives,n.value),!0;if(n instanceof AST_With)for(var l=t;l;l=l.parent_scope)l.uses_with=!0;else if(n instanceof AST_Symbol&&(n.scope=t),n instanceof AST_SymbolLambda)i.def_function(n);else if(n instanceof AST_SymbolDefun)(n.scope=i.parent_scope).def_function(n);else if(n instanceof AST_SymbolVar||n instanceof AST_SymbolConst){var f=i.def_variable(n);f.constant=n instanceof AST_SymbolConst,f.init=s.parent().value}else n instanceof AST_SymbolCatch&&(e.screw_ie8?t:i).def_variable(n)});n.walk(s);var o=null,r=n.globals=new Dictionary,s=new TreeWalker(function(e,t){if(e instanceof AST_Lambda){var i=o;return o=e,t(),o=i,!0}if(e instanceof AST_SymbolRef){var a=e.name,c=e.scope.find_variable(a);if(c)e.thedef=c;else{var l;if(r.has(a)?l=r.get(a):(l=new SymbolDef(n,r.size(),e),l.undeclared=!0,l.global=!0,r.set(a,l)),e.thedef=l,"eval"==a&&s.parent()instanceof AST_Call)for(var f=e.scope;f&&!f.uses_eval;f=f.parent_scope)f.uses_eval=!0;o&&"arguments"==a&&(o.uses_arguments=!0)}return e.reference(),!0}});n.walk(s)}),AST_Scope.DEFMETHOD("init_scope_vars",function(e){this.directives=[],this.variables=new Dictionary,this.functions=new Dictionary,this.uses_with=!1,this.uses_eval=!1,this.parent_scope=null,this.enclosed=[],this.cname=-1,this.nesting=e}),AST_Scope.DEFMETHOD("strict",function(){return this.has_directive("use strict")}),AST_Lambda.DEFMETHOD("init_scope_vars",function(){AST_Scope.prototype.init_scope_vars.apply(this,arguments),this.uses_arguments=!1}),AST_SymbolRef.DEFMETHOD("reference",function(){var e=this.definition();e.references.push(this);for(var n=this.scope;n&&(push_uniq(n.enclosed,e),n!==e.scope);)n=n.parent_scope;this.frame=this.scope.nesting-e.scope.nesting}),AST_Scope.DEFMETHOD("find_variable",function(e){return e instanceof AST_Symbol&&(e=e.name),this.variables.get(e)||this.parent_scope&&this.parent_scope.find_variable(e)}),AST_Scope.DEFMETHOD("has_directive",function(e){return this.parent_scope&&this.parent_scope.has_directive(e)||(this.directives.indexOf(e)<0?null:this)}),AST_Scope.DEFMETHOD("def_function",function(e){this.functions.set(e.name,this.def_variable(e))}),AST_Scope.DEFMETHOD("def_variable",function(e){var n;return this.variables.has(e.name)?(n=this.variables.get(e.name),n.orig.push(e)):(n=new SymbolDef(this,this.variables.size(),e),this.variables.set(e.name,n),n.global=!this.parent_scope),e.thedef=n}),AST_Scope.DEFMETHOD("next_mangled",function(e){var n=this.enclosed;e:for(;;){var t=base54(++this.cname);if(is_identifier(t)&&e.except.indexOf(t)<0){for(var i=n.length;--i>=0;){var a=n[i],s=a.mangled_name||a.unmangleable(e)&&a.name;if(t==s)continue e}return t}}}),AST_Function.DEFMETHOD("next_mangled",function(e,n){for(var t=n.orig[0]instanceof AST_SymbolFunarg&&this.name&&this.name.definition();;){var i=AST_Lambda.prototype.next_mangled.call(this,e,n);if(!t||t.mangled_name!=i)return i}}),AST_Scope.DEFMETHOD("references",function(e){return e instanceof AST_Symbol&&(e=e.definition()),this.enclosed.indexOf(e)<0?null:e}),AST_Symbol.DEFMETHOD("unmangleable",function(e){return this.definition().unmangleable(e)}),AST_SymbolAccessor.DEFMETHOD("unmangleable",function(){return!0}),AST_Label.DEFMETHOD("unmangleable",function(){return!1}),AST_Symbol.DEFMETHOD("unreferenced",function(){return 0==this.definition().references.length&&!(this.scope.uses_eval||this.scope.uses_with)}),AST_Symbol.DEFMETHOD("undeclared",function(){return this.definition().undeclared}),AST_LabelRef.DEFMETHOD("undeclared",function(){return!1}),AST_Label.DEFMETHOD("undeclared",function(){return!1}),AST_Symbol.DEFMETHOD("definition",function(){return this.thedef}),AST_Symbol.DEFMETHOD("global",function(){return this.definition().global}),AST_Toplevel.DEFMETHOD("_default_mangler_options",function(e){return defaults(e,{except:[],eval:!1,sort:!1,toplevel:!1,screw_ie8:!1})}),AST_Toplevel.DEFMETHOD("mangle_names",function(e){e=this._default_mangler_options(e);var n=-1,t=[],i=new TreeWalker(function(a,s){if(a instanceof AST_LabeledStatement){var o=n;return s(),n=o,!0}if(a instanceof AST_Scope){var r=(i.parent(),[]);return a.variables.each(function(n){e.except.indexOf(n.name)<0&&r.push(n)}),e.sort&&r.sort(function(e,n){return n.references.length-e.references.length}),void t.push.apply(t,r)}if(a instanceof AST_Label){var c;do c=base54(++n);while(!is_identifier(c));return a.mangled_name=c,!0}return e.screw_ie8&&a instanceof AST_SymbolCatch?void t.push(a.definition()):void 0});this.walk(i),t.forEach(function(n){n.mangle(e)})}),AST_Toplevel.DEFMETHOD("compute_char_frequency",function(e){e=this._default_mangler_options(e);var n=new TreeWalker(function(n){n instanceof AST_Constant?base54.consider(n.print_to_string()):n instanceof AST_Return?base54.consider("return"):n instanceof AST_Throw?base54.consider("throw"):n instanceof AST_Continue?base54.consider("continue"):n instanceof AST_Break?base54.consider("break"):n instanceof AST_Debugger?base54.consider("debugger"):n instanceof AST_Directive?base54.consider(n.value):n instanceof AST_While?base54.consider("while"):n instanceof AST_Do?base54.consider("do while"):n instanceof AST_If?(base54.consider("if"),n.alternative&&base54.consider("else")):n instanceof AST_Var?base54.consider("var"):n instanceof AST_Const?base54.consider("const"):n instanceof AST_Lambda?base54.consider("function"):n instanceof AST_For?base54.consider("for"):n instanceof AST_ForIn?base54.consider("for in"):n instanceof AST_Switch?base54.consider("switch"):n instanceof AST_Case?base54.consider("case"):n instanceof AST_Default?base54.consider("default"):n instanceof AST_With?base54.consider("with"):n instanceof AST_ObjectSetter?base54.consider("set"+n.key):n instanceof AST_ObjectGetter?base54.consider("get"+n.key):n instanceof AST_ObjectKeyVal?base54.consider(n.key):n instanceof AST_New?base54.consider("new"):n instanceof AST_This?base54.consider("this"):n instanceof AST_Try?base54.consider("try"):n instanceof AST_Catch?base54.consider("catch"):n instanceof AST_Finally?base54.consider("finally"):n instanceof AST_Symbol&&n.unmangleable(e)?base54.consider(n.name):n instanceof AST_Unary||n instanceof AST_Binary?base54.consider(n.operator):n instanceof AST_Dot&&base54.consider(n.property)});this.walk(n),base54.sort()});var base54=function(){function e(){i=Object.create(null),t=a.split("").map(function(e){return e.charCodeAt(0)}),t.forEach(function(e){i[e]=0})}function n(e){var n="",i=54;do n+=String.fromCharCode(t[e%i]),e=Math.floor(e/i),i=64;while(e>0);return n}var t,i,a="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_0123456789";return n.consider=function(e){for(var n=e.length;--n>=0;){var t=e.charCodeAt(n);t in i&&++i[t]}},n.sort=function(){t=mergeSort(t,function(e,n){return is_digit(e)&&!is_digit(n)?1:is_digit(n)&&!is_digit(e)?-1:i[n]-i[e]})},n.reset=e,e(),n.get=function(){return t},n.freq=function(){return i},n}();AST_Toplevel.DEFMETHOD("scope_warnings",function(e){e=defaults(e,{undeclared:!1,unreferenced:!0,assign_to_global:!0,func_arguments:!0,nested_defuns:!0,eval:!0});var n=new TreeWalker(function(t){if(e.undeclared&&t instanceof AST_SymbolRef&&t.undeclared()&&AST_Node.warn("Undeclared symbol: {name} [{file}:{line},{col}]",{name:t.name,file:t.start.file,line:t.start.line,col:t.start.col}),e.assign_to_global){var i=null;t instanceof AST_Assign&&t.left instanceof AST_SymbolRef?i=t.left:t instanceof AST_ForIn&&t.init instanceof AST_SymbolRef&&(i=t.init),i&&(i.undeclared()||i.global()&&i.scope!==i.definition().scope)&&AST_Node.warn("{msg}: {name} [{file}:{line},{col}]",{msg:i.undeclared()?"Accidental global?":"Assignment to global",name:i.name,file:i.start.file,line:i.start.line,col:i.start.col})}e.eval&&t instanceof AST_SymbolRef&&t.undeclared()&&"eval"==t.name&&AST_Node.warn("Eval is used [{file}:{line},{col}]",t.start),e.unreferenced&&(t instanceof AST_SymbolDeclaration||t instanceof AST_Label)&&t.unreferenced()&&AST_Node.warn("{type} {name} is declared but not referenced [{file}:{line},{col}]",{type:t instanceof AST_Label?"Label":"Symbol",name:t.name,file:t.start.file,line:t.start.line,col:t.start.col}),e.func_arguments&&t instanceof AST_Lambda&&t.uses_arguments&&AST_Node.warn("arguments used in function {name} [{file}:{line},{col}]",{name:t.name?t.name.name:"anonymous",file:t.start.file,line:t.start.line,col:t.start.col}),e.nested_defuns&&t instanceof AST_Defun&&!(n.parent()instanceof AST_Scope)&&AST_Node.warn('Function {name} declared in nested statement "{type}" [{file}:{line},{col}]',{name:t.name.name,type:n.parent().TYPE,file:t.start.file,line:t.start.line,col:t.start.col})});this.walk(n)});