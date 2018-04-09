/*Writer: aahedi*/
/*CSS
*{
    -webkit-touch-callout: auto;
    -webkit-user-select: auto;
    -khtml-user-select: auto;
    -moz-user-select: auto;
    -ms-user-select: auto;
    user-select: auto;
}
*/

//menonaktifkan semua proteksi seperti disable klik kanan dll.
document.oncontextmenu = function(){}
document.ondragstart = function(){}
document.onselectstart = function(){}
document.onmousedown = function(){}
document.onmouseup = function(){}

function disableSelection(target){
if (typeof target.onselectstart!="undefined") //IE route
	target.onselectstart=function(){}
else if (typeof target.style.MozUserSelect!="undefined") //Firefox route
	target.style.MozUserSelect="auto"
else //All other route (ie: Opera)
	target.onmousedown=function(){}
target.style.cursor = "default"
}
disableSelection(document.body)

//membuat semua link buka di tab baru
var donam = window.location.hostname.split('.')[1];
var links = document.links;
for (var i = 0; i < links.length; i++) {
     //links[i].target = "_blank";
     
     if(donam =='tribunnews' || donam =='grid'){
     links[i].href = links[i].href+"?page=all"
     }
}

//supaya WHM button buka di Tab baru
function clickableSafeRedirect(clickEvent, target, newWindow) {
    var eventSource = clickEvent.target.tagName.toLowerCase();
    var eventParent = clickEvent.target.parentNode.tagName.toLowerCase();
    var eventTable = clickEvent.target.parentNode.parentNode.parentNode;
    if (jQuery(eventTable).hasClass('collapsed')) {
        // This is a mobile device sized display, and datatables has triggered folding
        return false;
    }
    if(eventSource != 'button' && eventSource != 'a') {
        if(eventParent != 'button' && eventParent != 'a') {
            if (newWindow) {
                window.open(target,'_blank');
            } else {
                window.open(target,'_blank');
            }
        }
    }
}

//menonaktifkan inject telkom
if (self==top) {
function netbro_cache_analytics(fn, callback) {}
function sync(fn) {}
function requestCfs(){}
}
