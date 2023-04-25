//# sourceURL=factorialize.js   // Para que funcione el debugger en Chrome
// URL de la API de Jamendo :: OK
const apiUrl = 'https://api.jamendo.com/v3.0/';

// Cliente ID de la API de Jamendo :: OK
const clientId = 'fd999a30';

// variables para funciones prev y next :: OK
let tracks = []; // Lista de canciones :: OK
let currentTrackIndex = 0; // Índice de la canción actual :: OK

// Obtener la lista de canciones  :: OK
fetch(apiUrl + 'tracks/?client_id=' + clientId + '&format=json&limit=20&fuzzytags=rock') // Obtener la lista de canciones :: OK
  .then(response => response.json()) // Obtener la respuesta en formato JSON :: OK
  .then(data => { // Obtener la lista de canciones :: OK
    
    const tracksContainer = document.getElementById('tracks');  // Obtener el contenedor de canciones  :: OK
    tracks = data.results; // Guardar la lista de canciones en la variable tracks  :: OK
    // Obtener el reproductor de audio  :: OK
    const player = document.getElementById('player');
    // Obtener el control de volumen  :: OK 
    const volumenControl = document.getElementById('volumen');
      
      // Mostrar cada canción en la lista de canciones :: OK
      data.results.forEach(track => { // Recorre la lista de canciones :: OK
      const trackElement = document.createElement('ul'); // crea elementos de listas desordenadas :: OK
      
      // Mostrar tiempo de las canciones en minutos y segundos :: OK
      const minutos = Math.floor(track.duration / 60);
      const segundos = track.duration % 60;
      //const duracionFormateada = minutos+":"+segundos; // Formato de tiempo de canciones :: OK
      const duracionFormateada = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`; // Formato de tiempo de canciones mejorado :: OK
            
            // Carga lista de canciones con su tiempo de duracion :: OK
            trackElement.textContent = duracionFormateada + ' ' +' - '+ ' ' + track.name;
            const trackImage = document.createElement('div'); // crea elementos de imagenes 
            trackImage.src = track.album_image; // carga las imagenes de los albumes de las canciones en la lista de canciones :: OK

      trackElement.addEventListener('click', () => { // Escucha el evento de click en la lista de canciones :: OK
        updateActiveClick(trackElement); // Marcar la cancion activa en la lista al seleccionar con click :: OK
        loadAndPlayTrack(track);         // Carga y reproduce la canción seleccionada y actualiza la información :: OK
        
      });
      tracksContainer.appendChild(trackElement); // Agrega la canción a la lista de canciones :: OK
    });
    // Ajustar el volumen
    volumenControl.addEventListener('input', () => { // Escucha el evento de cambio de valor del control de volumen :: OK
      player.volume = volumenControl.value / 100; // Ajusta el volumen de la canción seleccionada :: OK
    });   
       
  })
      .catch(error => console.error(error));{ // Captura de errores :: OK
  }
 

   //Funcion para pausar o reproducir la canción
   let playMusic = false; // variable booleana para rastrear si alguna canción se ha reproducido previamente

   function togglePlay() { 
     if (!playMusic) { 
      loadAndPlayTrack(tracks[0]); // Si ninguna canción se ha reproducido aún, reproducir la canción actual desde el principio
       toggleIcon();
       playMusic = true;
     } else { // Si ya se ha reproducido una canción, volver a su funcionalidad normal de pausa/reproducción
       if (player.paused) {
         toggleIcon();
         player.play();
       } else {
         toggleIcon();
         player.pause();
       }
     }
   }
 //Funcion para cambiar el icono play o pause
 function toggleIcon() { 
  var element = document.getElementById("iconPlay"); // Obtener el elemento del icono de play :: OK
  element.classList.toggle("fa-pause-circle"); // Cambia el icono de play a pause y viceversa :: OK
  element.classList.toggle("fa-play-circle"); // Cambia el icono de play a pause y viceversa :: OK
}


 // Obtener el reproductor de audio
const player = document.getElementById('player');

// función para pasar a la siguiente canción
function nextMusic() {
    currentTrackIndex++; // Aumenta el índice de la canción actual en 1 :: OK
  if (currentTrackIndex >= tracks.length) { // Comprobar si currentTrackIndex es mayor o igual que el número de canciones :: OK
    currentTrackIndex = 0; // Comprobar si se paso del final de la lista y vuelve al comienzo :: OK
  }
  
  // Actualiza el nombre de la canción con la funcion activa :: OK
  const currentTrack = tracks[currentTrackIndex]; // Toma la canción seleccionada :: OK
  const currentTrackNameElement = document.getElementById('currentTrackName'); // Obtener el nombre de la canción actual :: OK
   currentTrackNameElement.innerText = currentTrack.name; // Actualiza el nombre de la canción con la funcion activa :: OK
   // Actualiza la imagen del álbum en la página
   const albumImageElement = document.getElementById('album-image');  // Toma el elemento de la imagen del album :: OK
   albumImageElement.src = currentTrack.album_image;  // Carga la imagen del album de la canción seleccionada :: OK

   
   // Carga la nueva cancion y la reproduce  :: OK
  player.src = currentTrack.audio; // Toma la canción seleccionada :: OK
  player.load(); // Carga la canción seleccionada :: OK
  player.play(); // Reproduce la canción seleccionada :: OK
}

// función para volver a la canción anterior
function prevMusic() {
    currentTrackIndex--; // Reduce el índice de la canción actual en 1 :: OK
    if (currentTrackIndex < 0) { // Comprobar si currentTrackIndex es menor que 0 :: OK
  currentTrackIndex = tracks.length - 1; // Comprobar si se paso del comienzo de la lista y vuelve al final :: OK
  }
  
  // Actualiza el nombre de la canción con la funcion activa :: OK
  const currentTrack = tracks[currentTrackIndex]; // Toma la canción seleccionada :: OK
  const currentTrackNameElement = document.getElementById('currentTrackName'); // Obtener el nombre de la canción actual :: OK
  currentTrackNameElement.innerText = currentTrack.name; // Actualiza el nombre de la canción con la funcion activa :: OK
   
// Actualiza la imagen del álbum en la página
const albumImageElement = document.getElementById('album-image');  // Toma el elemento de la imagen del album :: OK
albumImageElement.src = currentTrack.album_image;  // Carga la imagen del album de la canción seleccionada :: OK


  // Carga la nueva cancion y la reproduce  :: OK
  player.src = currentTrack.audio; // Toma la canción seleccionada :: OK 
  player.load(); // Carga la canción seleccionada :: OK
  player.play(); // Reproduce la canción seleccionada :: OK
  }

  // Barra de progreso  y tiempo de canciones :: OK
  const timerActive = document.getElementById('duracion-total'); // Obtener el tiempo de la canción actual :: OK
  const timerTotal = document.getElementById('duracion-actual'); // Obtener el
  const currentTrackTime = document.getElementById('currentTrackTime'); // Obtener el tiempo de la canción actual :: OK
  player.addEventListener('timeupdate', () => { // Actualiza el tiempo de la canción actual :: OK
    
    // Barra de progreso :: OK
    if (player.currentTime >0){ // Comprueba que el reproductor este reproduciendo una canción :: OK
        const barra = document.getElementById('progress-bar') // Obtener la barra de progreso :: OK
          barra.value = (player.currentTime / player.duration) * 100 // Calcula el porcentaje de la barra de progreso :: OK
    }

    // Mostrar el tiempo de la canción actual :: OK
    const currentMinutes = Math.floor(player.currentTime / 60); // Calcula los minutos de la canción actual :: OK
    const currentSeconds = Math.floor(player.currentTime % 60); // Calcula los segundos de la canción actual :: OK
    const totalMinutes = Math.floor(player.duration / 60); // Calcula los minutos de la canción total :: OK
    const totalSeconds = Math.floor(player.duration % 60); // Calcula los segundos de la canción total :: OK
    // Formato de tiempo de canciones :: OK
    timerActive.innerHTML = `${currentMinutes.toString().padStart(2, '0')}:${currentSeconds.toString().padStart(2, '0')}`;
    timerTotal.innerHTML = `${totalMinutes.toString().padStart(2, '0')}:${totalSeconds.toString().padStart(2, '0')}`;
  });
  


  // Carga y reproduce la canción seleccionada y actualiza la información :: OK
  function loadAndPlayTrack(track) {
    // Actualiza el nombre de la canción actual
  const currentTrackNameElement = document.getElementById('currentTrackName'); // Toma el elemento del nombre de la canción actual :: OK
  currentTrackNameElement.innerText = track.name; // Actualiza el nombre de la canción actual :: OK

    // Actualiza la imagen del álbum en la página
    const albumImageElement = document.getElementById('album-image');  // Toma el elemento de la imagen del album :: OK
    albumImageElement.src = track.album_image;  // Carga la imagen del album de la canción seleccionada :: OK

   
  
  player.src = track.audio; // Toma la canción seleccionada de la lista :: OK
  player.load(); // Carga la canción seleccionada :: OK
  player.play(); // Reproduce la canción seleccionada :: OK
  playMusic = true; // para avisar que ya se reproujo la canción :: OK
 
  // Actualiza el índice de la canción actual para que funcionen los botones next y prev :: OK
  currentTrackIndex = tracks.indexOf(track);

  player.addEventListener('ended', () => {// Reproduce la siguiente canción al terminar la actual :: OK
    nextMusic(); // Reproduce la siguiente canción al terminar la actual :: OK
    updateActiveTrack(); // Actualiza la canción activa en la lista :: OK
   });

  }

       // función para marcar la cancion activa en la lista al cambiar con los botones next y prev :: OK
        function updateActiveTrack() { // Actualiza la canción activa en la lista :: OK
        const tracksContainer = document.getElementById('tracks'); // Tomar la lista de canciones
        const trackElements = tracksContainer.children; // Tomar los elementos de la lista
        console.log('trackElements:', trackElements); // Imprime los elementos de la lista
        console.log('currentTrackIndex:', currentTrackIndex); // Imprime el índice de la canción actual
        for (let i = 0; i < trackElements.length; i++) { // Recorrer los elementos de la lista
          if (i === currentTrackIndex) { // Comprobar si el elemento es el actual
            trackElements[i].classList.add('active'); // Agregar la clase "active" al elemento seleccionado
          } else {
            trackElements[i].classList.remove('active'); // Remover la clase "active" del elemento anterior
          }
        }
      }
      
      // función para marcar la cancion activa en la lista al seleccionar con click :: OK
      function updateActiveClick(trackElement) { // Recibe el elemento seleccionado
        const previousActiveTrack = document.querySelector('.active'); // Tomar el elemento anterior con la clase "active"
        if (previousActiveTrack) { // Comprobar si hay una canción activa
          previousActiveTrack.classList.remove('active'); // Remover la clase "active" del elemento anterior
        }
        trackElement.classList.add('active'); // Agregar la clase "active" al elemento seleccionado
      }

      // Ajustar el volumen, mostrar porcentaje :: OK
      const volumenBarra = document.getElementById('volumen'); // Tomar el elemento de la barra de volumen
      const volumenPorcentaje = document.getElementById('volumen-porcentaje'); // Mostrar el porcentaje de volumen 
      
      volumenBarra.addEventListener('input', () => { // Escuchar el evento input de la barra de volumen
        const porcentaje = volumenBarra.value; // Tomar el valor de l a barra de volumen
        volumenPorcentaje.textContent = `${porcentaje}%`; //  Mostrar el porcentaje
        player.volume = porcentaje / 100; // Ajustar el volumen
      });

// funcion para adelantar y retroceder desde la barra de progreso :: OK
const progressBar = document.getElementById('progress-bar');
progressBar.addEventListener('click', function(event) {

  const clickX = event.clientX; // tomar la posición x del clic del usuario
  
  const barLeftX = progressBar.getBoundingClientRect().left; // tomar la posición x del elemento
  const progressBarPosition = clickX - barLeftX;  // tomar la posición x del clic del usuario dentro del elemento
  const duration = player.duration; // tomar la duración total de la canción
  const currentPosition = (progressBarPosition / progressBar.offsetWidth) * duration; // tomar la posición x del clic del usuario dentro del elemento en relación a la duración total de la canción
  
  player.currentTime = currentPosition; // Actualizar la posición actual de la canción
});


// Función para mostrar o ocultar la lista de canciones :: OK
function mostrarOcultar() {
  var contenido = document.getElementById("tracks");
  if (contenido.style.display === "none") {
    contenido.style.display = "block";
  } else {
    contenido.style.display = "none";
  }
}


// Obtener el elemento que muestra u oculta la lista de canciones :: OK
var verOcultar = document.getElementById("ver-ocultar");

// Obtener el contenedor que se va a mover :: OK
var contenedorOne = document.getElementById("contenedor-one");

// Función para cambiar la posición del contenedor :: OK
function cambiarPosicion() {
 
  var tracksVisible = document.getElementById("tracks").offsetParent !== null;

  // Cambiar la posición del contenedor según la visibilidad de los tracks
  if (window.innerWidth <= 768) {
    
    contenedorOne.style.left = "";
    contenedorOne.style.right = "";

  }
  if (window.innerWidth <= 480) {
     contenedorOne.style.left = "";
    contenedorOne.style.right = "";

  }

  if (tracksVisible) {
   
    contenedorOne.style.right = "20%";
  } else {
    contenedorOne.style.left = "";
    contenedorOne.style.right = "";
  }
}

