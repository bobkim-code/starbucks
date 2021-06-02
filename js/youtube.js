

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


function onYouTubeIframeAPIReady() {
    new YT.Player('player', {
    videoId: 'An6LvWQuj_8', //최초 재생할 유뷰트 영상 아이디
    playerVars:{
      autoplay:true, //자동재생
      loop:true, // 반복재생
      playList:'An6LvWQuj_8' //반복재생시 재생할 유튜브 영상 아이디 (필수)
    },
    events:{
      onReady:function(event){
        event.target.mute(); //음소거
      }
    }   
  });
}