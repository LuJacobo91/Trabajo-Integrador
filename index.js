// URL de la API de Jamendo
const apiUrl = 'https://api.jamendo.com/v3.0/';

// Cliente ID de la API de Jamendo
const clientId = 'fd999a30';

// Obtener la lista de canciones
fetch(apiUrl + 'tracks/?client_id=' + clientId + '&format=json&limit=20&fuzzytags=rock')
  .then(response => response.json())
  .then(data => {
    const tracksContainer = document.getElementById('tracks');
// Obtener el reproductor de audio
    const player = document.getElementById('player');
    // Mostrar cada canción en la lista
    const volumenControl = document.getElementById('volumen');
    data.results.forEach(track => {
      const trackElement = document.createElement('ul');
      const minutos = Math.floor(track.duration / 60);
      const segundos = track.duration % 60;
      const duracionFormateada = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
      
      trackElement.textContent = duracionFormateada + ' ' +' - '+ ' ' + track.name;
      trackElement.addEventListener('click', () => {
        loadAndPlayTrack(track);
      });
      tracksContainer.appendChild(trackElement);
    });
    // Ajustar el volumen
    volumenControl.addEventListener('input', () => {
      player.volume = volumenControl.value;
    });
    
    player.volume = volumenControl.value;
  
  })
  
  .catch(error => console.error(error));{
    
  }

  const playBtn = document.getElementById('playBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
   
   //Funcion para pausar o darle play 
 function togglePlay() {
  if (player.paused){
    toggleIcon();    
    return player.play();
  } else {
    toggleIcon();
    // updateProgresss();
    return player.pause();
  }
}

 //Funcion para cambiar el icono play o pause
 function toggleIcon() {
  var element = document.getElementById("iconPlay");
  element.classList.toggle("fa-pause-circle");
  element.classList.toggle("fa-play-circle");
}

  
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

  

  function updateProgresss(){
    if (player.currentTime >0){
     const barra = document.getElementById('progress-bar')
     barra.value = (player.currentTime / player.duration) * 100
     
     
      
    }
  }

  function loadAndPlayTrack(track) {
    // Cargar y reproducir la canción seleccionada
    player.src = track.audio;
    player.play();
    
    // Actualizar la información de la canción actual
    const currentTrackName = document.getElementById('currentTrackName');
    currentTrackName.textContent = track.name;
 			document.querySelector('audio').addEventListener('timeupdate',function(){
			});}

 

      