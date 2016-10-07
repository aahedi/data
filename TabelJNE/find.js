var FormName = "url2go";
var FieldName = "go";

function CapitalizeNames() {
var ValueString = new String();
eval('ValueString=document.'+FormName+'.'+FieldName+'.value');
ValueString = ValueString.replace(/ +/g,' ');
var names = ValueString.split(' ');
for(var i = 0; i < names.length; i++) {
   if(names[i].length > 1) {
	   names[i] = names[i].toLowerCase();
	   letters = names[i].split('');
   	letters[0] = letters[0].toUpperCase();
	   names[i] = letters.join('');
	   }
	else { names[i] = names[i].toUpperCase(); }
	}
ValueString = names.join(' ');
eval('document.'+FormName+'.'+FieldName+'.value=ValueString');
return true;
}

function gotoURL() {
var newURL = document.url2go.ge.value + document.url2go.go.value
document.location.href=newURL
}
