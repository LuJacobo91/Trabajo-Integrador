//# sourceURL=factorialize.js
// URL de la API de Jamendo
const apiUrl = 'https://api.jamendo.com/v3.0/';

// Cliente ID de la API de Jamendo
const clientId = 'fd999a30';

// variables para funciones prev y next
let tracks = [];
let currentTrackIndex = 0;

// Obtener la lista de canciones
fetch(apiUrl + 'tracks/?client_id=' + clientId + '&format=json&limit=20&fuzzytags=rock')
  .then(response => response.json())
  .then(data => {
    
    const tracksContainer = document.getElementById('tracks');  
    tracks = data.results;
    // Obtener el reproductor de audio
    const player = document.getElementById('player');
    // Obtener el control de volumen
    const volumenControl = document.getElementById('volumen');
    // Mostrar cada canción en la lista
      data.results.forEach(track => {
      const trackElement = document.createElement('ul'); // crea elementos de listas desordenadas
      // Mostrar tiempo de las canciones en minutos y segundos
      const minutos = Math.floor(track.duration / 60);
      const segundos = track.duration % 60;
      //const duracionFormateada = minutos+":"+segundos;
      const duracionFormateada = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
      // Carga lista de canciones con su tiempo de duracion
            trackElement.textContent = duracionFormateada + ' ' +' - '+ ' ' + track.name; 
            const trackImage = document.createElement('div'); // crea elementos de imagenes
            trackImage.src = track.album_image; // carga las imagenes de los albumes

      trackElement.addEventListener('click', () => {
        updateActiveClick(trackElement); // Marcar la cancion activa en la lista al seleccionar con click
        loadAndPlayTrack(track);         // Carga y reproduce la canción seleccionada y actualiza la información 
      });
      tracksContainer.appendChild(trackElement);
    });
    // Ajustar el volumen
    volumenControl.addEventListener('input', () => {
      player.volume = volumenControl.value;
    });       
  })
      .catch(error => console.error(error));{
  }
 
   //Funcion para pausar o darle play 
 function togglePlay() { 
  if (player.paused){
    toggleIcon();
       
    return player.play();
  } else {
    toggleIcon();
    
    return player.pause();
    
  }
}


 //Funcion para cambiar el icono play o pause
 function toggleIcon() {
  var element = document.getElementById("iconPlay");
  element.classList.toggle("fa-pause-circle");
  element.classList.toggle("fa-play-circle");
}


 // Obtener el reproductor de audio
const player = document.getElementById('player');

// función para pasar a la siguiente canción
function nextMusic() {
    currentTrackIndex++; // Aumenta el índice de la canción actual en 1 :: OK
  if (currentTrackIndex >= tracks.length) { // Comprobar si se paso del final de la lista y vuelve al comienzo :: OK
    currentTrackIndex = 0;
  }
  
  // Actualiza el nombre de la canción con la funcion activa :: OK
  const currentTrack = tracks[currentTrackIndex];
  const currentTrackNameElement = document.getElementById('currentTrackName');
   currentTrackNameElement.innerText = currentTrack.name;
   
   // Carga la nueva cancion y la reproduce  :: OK
  player.src = currentTrack.audio;
  player.load();
  player.play();
}

// función para volver a la canción anterior
function prevMusic() {
    currentTrackIndex--; // Reduce el índice de la canción actual en 1 :: OK
    if (currentTrackIndex < 0) {
  currentTrackIndex = tracks.length - 1;
  }
  
  // Actualiza el nombre de la canción con la funcion activa :: OK
  const currentTrack = tracks[currentTrackIndex];
  const currentTrackNameElement = document.getElementById('currentTrackName');
  currentTrackNameElement.innerText = currentTrack.name;
   
  // Carga la nueva cancion y la reproduce  :: OK
  player.src = currentTrack.audio;
  player.load();
  player.play();
  }

  // Barra de progreso  y tiempo de canciones :: OK
  const timerActive = document.getElementById('duracion-total');
  const currentTrackTime = document.getElementById('currentTrackTime');
  player.addEventListener('timeupdate', () => {
    
    // Barra de progreso :: OK
    if (player.currentTime >0){
        const barra = document.getElementById('progress-bar')
          barra.value = (player.currentTime / player.duration) * 100
    }
    // Mostrar el tiempo de la canción actual :: OK
    const currentMinutes = Math.floor(player.currentTime / 60);
    const currentSeconds = Math.floor(player.currentTime % 60);
    const totalMinutes = Math.floor(player.duration / 60);
    const totalSeconds = Math.floor(player.duration % 60);
    timerActive.innerHTML = `${currentMinutes.toString().padStart(2, '0')}:${currentSeconds.toString().padStart(2, '0')} / ${totalMinutes.toString().padStart(2, '0')}:${totalSeconds.toString().padStart(2, '0')}`;
  
  
  });
  


  // Carga y reproduce la canción seleccionada y actualiza la información :: OK
  function loadAndPlayTrack(track) {
    // Actualiza el nombre de la canción actual
  const currentTrackNameElement = document.getElementById('currentTrackName');
  currentTrackNameElement.innerText = track.name;

    // Actualiza la imagen del álbum en la página
    const albumImageElement = document.getElementById('album-image');
    albumImageElement.src = track.album_image;

  // Carga y reproduce la canción seleccionada
  player.src = track.audio;
  player.load();
  player.play();

  // Actualiza el índice de la canción actual para que funcionen los botones next y prev :: OK
  currentTrackIndex = tracks.indexOf(track);

  player.addEventListener('ended', () => {
    nextMusic(); // Reproduce la siguiente canción al terminar la actual :: OK
    updateActiveTrack(); // Actualiza la canción activa en la lista :: OK
   });

  }

       // función para marcar la cancion activa en la lista al cambiar con los botones next y prev :: OK
        function updateActiveTrack() {
        const tracksContainer = document.getElementById('tracks');
        const trackElements = tracksContainer.children;
        console.log('trackElements:', trackElements);
        console.log('currentTrackIndex:', currentTrackIndex);
        for (let i = 0; i < trackElements.length; i++) {
          if (i === currentTrackIndex) {
            trackElements[i].classList.add('active');
          } else {
            trackElements[i].classList.remove('active');
          }
        }
      }
      
      // función para marcar la cancion activa en la lista al seleccionar con click :: OK
      function updateActiveClick(trackElement) {
        const previousActiveTrack = document.querySelector('.active');
        if (previousActiveTrack) {
          previousActiveTrack.classList.remove('active');
        }
        trackElement.classList.add('active');
      }

      // Ajustar el volumen, mostrar porcentaje :: OK
      const volumenBarra = document.getElementById('volumen');
      const volumenPorcentaje = document.getElementById('volumen-porcentaje');
      
      volumenBarra.addEventListener('input', () => {
        const porcentaje = volumenBarra.value;
        volumenPorcentaje.textContent = `${porcentaje}%`;
        player.volume = porcentaje / 100;
      });

// funcion para adelantar y retroceder desde la barra de progreso :: OK
const progressBar = document.getElementById('progress-bar');
progressBar.addEventListener('click', function(event) {
  // Obtener la posición x del clic del usuario
  const clickX = event.clientX;
  
  const barLeftX = progressBar.getBoundingClientRect().left;
  const progressBarPosition = clickX - barLeftX;
  const duration = player.duration;
  const currentPosition = (progressBarPosition / progressBar.offsetWidth) * duration;
  
  player.currentTime = currentPosition;
});