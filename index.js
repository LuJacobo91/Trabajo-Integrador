
// Obtener el elemento donde se mostrarán las canciones
const tracksContainer = document.getElementById('tracks');



// Obtener el reproductor de audio
const player = document.getElementById('player');

// URL de la API de Jamendo
const apiUrl = 'https://api.jamendo.com/v3.0/';

// Cliente ID de la API de Jamendo
const clientId = 'fd999a30';

// Obtener la lista de canciones
fetch(apiUrl + 'tracks/?client_id=' + clientId + '&format=json&limit=20&fuzzytags=rock')
  .then(response => response.json())
  .then(data => {
    // Mostrar cada canción en la lista
    data.results.forEach(track => {
      const trackElement = document.createElement('div');
      trackElement.textContent = track.name;
      trackElement.addEventListener('click', () => {
        // Cargar y reproducir la canción seleccionada
        player.src = track.audio;
        player.play();
      });
      tracksContainer.appendChild(trackElement);
    });
  })
  .catch(error => console.error(error));
  
  // Manejar los eventos de los botones
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

playBtn.addEventListener('click', () => {
  player.play();
});

pauseBtn.addEventListener('click', () => {
  player.pause();
});

prevBtn.addEventListener('click', () => {
  // Obtener la canción anterior en la lista
  const prevTrack = tracksContainer.previousSibling;
  if (prevTrack) {
    player.src = prevTrack.querySelector('audio').src;
    player.play();
  }
});

nextBtn.addEventListener('click', () => {
  // Obtener la siguiente canción en la lista
  const nextTrack = tracksContainer.nextSibling;
  if (nextTrack) {
    player.src = nextTrack.querySelector('audio').src;
    player.play();
  }
});