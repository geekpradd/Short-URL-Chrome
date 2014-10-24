function GetUrlValue(VarSearch){
    var SearchString = window.location.search.substring(1);
    var VariableArray = SearchString.split('&');
    for(var i = 0; i < VariableArray.length; i++){
        var KeyValuePair = VariableArray[i].split('=');
        if(KeyValuePair[0] == VarSearch){
            return KeyValuePair[1];
        }
    }
}
function ValidUrl(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  if(!pattern.test(str)) {
    return false;
  } else {
    return true;
  }
}

function copyTextToClipboard(text) {
    var copyFrom = $('<textarea/>');
    copyFrom.text(text);
    $('body').append(copyFrom);
    copyFrom.select();
    document.execCommand('copy');
    copyFrom.remove();
}

// Usage example

//chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
///    var url = tabs[0].url;
//    alert(url);
//});

$url=decodeURIComponent(GetUrlValue('url'));
$status=ValidUrl($url);
if($status){
  $('.dr').html("Please wait while we are contacting our Servers..");
  $.ajax({
    url:'http://shorturl.hol.es/api/shorten/index.php',
    data:{
      url:$url
    },
    type:"POST",
    dataType:'json',
    success:function(json){

      $('.dr').html("Your Shortened URL is <a href='" + decodeURIComponent(json.url) + "'>" + decodeURIComponent(json.url)+"</a> <br><br><br>It has been automatically copied to your Clipboard.");
      copyTextToClipboard(decodeURIComponent(json.url));
    },
    error:function( xhr, status, errorThrown ) {

             alert( "Sorry, there was a problem! Looks like you have an Internet Problem" );
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
        console.dir( xhr );
    },
    complete:function(xhr,status){

    }
  });
}
else{
  $('.dr').html("Looks like the parameter passed is not a correct URL. Note that chrome:// URLs are not valid.");
}
