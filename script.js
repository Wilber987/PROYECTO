const API_KEY = 'AIzaSyCjxy39o8_e1C7SQRhriQCV5sozaqoV_Z4'; 
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('results');
const videoPlayer = document.getElementById('videoPlayer');
const pauseButton = document.getElementById('pauseButton');
const playButton = document.getElementById('playButton');
const playlistsContainer = document.getElementById('playlists');
const createPlaylistButton = document.getElementById('createPlaylist');

let playlists = JSON.parse(localStorage.getItem('playlists')) || [];

function renderPlaylists() {
  playlistsContainer.innerHTML = playlists
    .map((playlist, index) => `<li onclick="playPlaylist(${index})">${playlist.name}</li>`)
    .join('');
}

function playPlaylist(index) {
  const playlist = playlists[index];
  if (playlist.videos.length > 0) {
    videoPlayer.src = `https://www.youtube.com/embed/${playlist.videos[0]}`;
  }
}

createPlaylistButton.addEventListener('click', () => {
  const name = prompt('Ingrese el nombre de la lista de reproducción:');
  
});

function handleEnter(event) {
  if (event.key === 'Enter') {
    searchVideos();
  }
}

function searchVideos() {
  const query = searchInput.value;
  fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${query}&type=video&key=AIzaSyCjxy39o8_e1C7SQRhriQCV5sozaqoV_Z4`)
    .then((response) => response.json())
    .then((data) => {
      resultsContainer.innerHTML = data.items
        .map(
          (item) => `
          <div class="result" onclick="selectVideo('${item.id.videoId}', '${item.snippet.title}')">
            <img src="${item.snippet.thumbnails.medium.url}" alt="${item.snippet.title}">
            <p>${item.snippet.title}</p>
          </div>`
        )
        .join('');
    });
}

function selectVideo(videoId, title) {
  videoPlayer.src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;
  document.getElementById('currentVideoTitle').textContent = title;
}

pauseButton.addEventListener('click', () => {
  videoPlayer.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
});

playButton.addEventListener('click', () => {
  videoPlayer.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
});

renderPlaylists();
