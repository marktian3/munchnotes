// Load the iFrame API
let tag = document.createElement('script');
let firstScriptTag = document.getElementsByTagName('script')[0];
tag.src = "https://www.youtube.com/iframe_api";
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'dQw4w9WgXcQ',
    playerVars: {
      'playsinline': 1
    }
  });
}


// Change videos when new link is submitted
function changeVideo(event) {
  let formElement = document.forms.video;
  let formData = new FormData(formElement);
  let vidLink = formData.get('vid-link');
  let videoId = extractVideoId(vidLink);
  console.log(videoId);
  updatePlayer(videoId);
  event.preventDefault();
}

function updatePlayer(videoId) {
  player.loadVideoById(videoId); 
}

function onPlayerReady(event) {
  event.target.playVideo();
}


function extractVideoId(vidLink) {
  return vidLink.split("v=")[1].substring(0,11);
}

const videoForm = document.getElementById('video');
videoForm.addEventListener('submit', changeVideo);