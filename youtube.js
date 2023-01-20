// Load the iFrame API
let tag = document.createElement('script');
let firstScriptTag = document.getElementsByTagName('script')[0];
tag.src = "https://www.youtube.com/iframe_api";
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
let player;
// function onYouTubeIframeAPIReady() {
//   player = new YT.Player('player', {
//     height: '390',
//     width: '640',
//     videoId: 'i5Cyi_4GIeU',
//     playerVars: {
//       'playsinline': 1
//     },
//     events: {
//       'onReady': onPlayerReady,
//       'onStateChange': onPlayerStateChange
//     }
//   });
// }

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
let done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}

function stopVideo() {
  player.stopVideo();
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
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: videoId,
    playerVars: {
      'playsinline': 1
    }
  });
}

function extractVideoId(vidLink) {
  return vidLink.split("v=")[1].substring(0,11);
}

const videoForm = document.getElementById('video');
videoForm.addEventListener('submit', changeVideo);