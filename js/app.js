import { renderContenidoTop } from "./renderContent.js";

// variables del DOM
const div_container_index = document.getElementById("container");
const div_movies_top = document.getElementById("container-top-movies");
const div_series_top = document.getElementById("container-top-series");
const h3_title_resultdo = document.createElement("h3");

// constantes de la app
const CANTIDAD_TOP = 5;
const CANTIDAD_CONTENIDO_RELACIONADO = 5;

const TIPO_CONTENIDO = {
    pelicula: {id: 'pelicula', nombre: 'Peliculas'},
    documental: {id: 'documental', nombre: 'Documentales'},
    serie: {id: 'serie', nombre: 'Series'}, 
    cartoon: {id: 'cartoon', nombre: 'Cartoon'}
};
const LIST_SECCIONES_TOP = [ 
    {id: TIPO_CONTENIDO.pelicula.id, div_container: div_movies_top},
    {id: TIPO_CONTENIDO.serie.id, div_container: div_series_top}
];

// variable de la app
const listaMultimedia = [{
    img: "https://m.media-amazon.com/images/S/pv-target-images/ae4816cade1a5b7f29787d0b89610132c72c7747041481c6619b9cc3302c0101.jpg",
    title: "Avatar",
    sinopsis: "Un exmarine viaja a Pandora y se involucra en el conflicto entre humanos y nativos.",
    tipo: "pelicula"
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZmUt.jpg",
    title: "Inception",
    sinopsis: "Un ladrón especializado en sueños recibe la misión de implantar una idea.",
    tipo: "pelicula"
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BZjhkNjk3.jpg",
    title: "The Dark Knight",
    sinopsis: "Batman enfrenta al Joker, quien busca sembrar el caos en Gotham.",
    tipo: "pelicula"
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3.jpg",
    title: "Interstellar",
    sinopsis: "Un grupo de astronautas viaja por el espacio para salvar a la humanidad.",
    tipo: "pelicula"
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3.jpg",
    title: "Titanic",
    sinopsis: "Una historia de amor a bordo del famoso barco que terminó en tragedia.",
    tipo: "pelicula"
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMmEzNTY1ZTUt.jpg",
    title: "Gladiator",
    sinopsis: "Un general romano busca venganza tras la traición del emperador.",
    tipo: "pelicula"
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMTk4OTk2.jpg",
    title: "The Matrix",
    sinopsis: "Un hacker descubre la verdad sobre la realidad y su papel en la guerra contra las máquinas.",
    tipo: "pelicula"
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BYmMyMzY3.jpg",
    title: "Joker",
    sinopsis: "La historia del origen del icónico villano de Gotham.",
    tipo: "pelicula"
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BN2EyZjM3.jpg",
    title: "Avengers: Endgame",
    sinopsis: "Los Vengadores intentan revertir el daño causado por Thanos.",
    tipo: "pelicula"
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMjMxNjY2.jpg",
    title: "The Shawshank Redemption",
    sinopsis: "Un hombre condenado injustamente encuentra esperanza en prisión.",
    tipo: "pelicula"
  },

  {
    img: "https://m.media-amazon.com/images/M/MV5BMmEzNTY1ZTUt.jpg",
    title: "Breaking Bad",
    sinopsis: "Un profesor de química comienza a fabricar metanfetamina tras un diagnóstico terminal.",
    tipo: "serie"
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BYmMyMzY3.jpg",
    title: "Stranger Things",
    sinopsis: "Niños descubren experimentos secretos y criaturas de otra dimensión.",
    tipo: "serie"
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMTk4OTk2.jpg",
    title: "Game of Thrones",
    sinopsis: "Familias nobles luchan por el control del Trono de Hierro.",
    tipo: "serie"
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BN2EyZjM3.jpg",
    title: "The Mandalorian",
    sinopsis: "Un cazarrecompensas protege a un misterioso niño en la galaxia.",
    tipo: "serie"
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3.jpg",
    title: "The Witcher",
    sinopsis: "Un cazador de monstruos lucha por sobrevivir en un mundo lleno de magia.",
    tipo: "serie"
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZmUt.jpg",
    title: "The Office",
    sinopsis: "Comedia sobre el día a día de empleados en una oficina.",
    tipo: "serie"
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3.jpg",
    title: "Friends",
    sinopsis: "Seis amigos viven experiencias inolvidables en Nueva York.",
    tipo: "serie"
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMjMxNjY2.jpg",
    title: "The Boys",
    sinopsis: "Un grupo intenta exponer a superhéroes corruptos.",
    tipo: "serie"
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BZjhkNjk3.jpg",
    title: "Dark",
    sinopsis: "La desaparición de un niño revela secretos temporales en un pueblo alemán.",
    tipo: "serie"
  },
  {
    img: "https://m.media-amazon.com/images/M/MV5BMmEzNTY1ZTUt.jpg",
    title: "House of the Dragon",
    sinopsis: "La historia de la casa Targaryen antes de los eventos de Game of Thrones.",
    tipo: "serie"
}];

initApp();

// iniciar la app
function initApp() {
    try {
        // llamar a las api y obtener y guardar los datos

        renderContenidoTop(listaMultimedia, LIST_SECCIONES_TOP, CANTIDAD_TOP);

    } catch (error) {
        
    }
}

// funciones de la app
function buscarContenido(event) {
    event.preventDefault();
    const {txtBuscar, tipoContenido} = event.target;

    if (!txtBuscar  || !tipoContenido) return;
    renderResultBusqueda(listaMultimedia);
}