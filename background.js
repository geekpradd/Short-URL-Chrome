function resetDefaultSuggestion(){
  chrome.omnibox.setDefaultSuggestion({
    description:"ShortURL:Shorten the URL %s"
  });
}
resetDefaultSuggestion();
function getUrl(){

}
function navigate(url){
  chrome.tabs.query({active:true,currentWindow:true},function(tabs){
    chrome.tabs.update(tabs[0].id,{url:url});
  });
}
chrome.omnibox.onInputEntered.addListener(function(text){
  navigate("name.html?url=" + encodeURIComponent(text));
});
chrome.browserAction.onClicked.addListener(function(tab){
  var urla;
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
     urla = tabs[0].url;
     create(urla);

});
function create(argv){
  var string= "name.html?url="+encodeURIComponent(argv);
  chrome.tabs.create({'url':string});
}
});


