import { renderContenidoTop } from "./renderContent.js";
import { renderContenidoDetalles } from "./renderContent.js";
// variables del DOM
const div_container_index = document.getElementById("container");
const div_movies_top = document.getElementById("container-top-movies");
const div_series_top = document.getElementById("container-top-series");
const form_buscar_contenido = document.getElementById("form-buscar-contenido");
const select_tipo_contenido = document.getElementById("select-tipo-contenido");
const h3_title_resultdo = document.createElement("h3");

// agregar eventos a elementos
form_buscar_contenido.addEventListener('submit', (event) => buscarContenido(event));


// constantes de la app
const CANTIDAD_TOP = 5;
const CANTIDAD_CONTENIDO_RELACIONADO = 5;
const API_URL = "https://api.imdbapi.dev"

const TIPO_CONTENIDO = {
    pelicula: {id: 'movie', nombre: 'Peliculas'},
    documental: {id: 'tvMiniSeries', nombre: 'Mini Series'},
    serie: {id: 'tvSeries', nombre: 'Series'}
};
const LIST_SECCIONES_TOP = [ 
    {id: TIPO_CONTENIDO.pelicula.id, div_container: div_movies_top},
    {id: TIPO_CONTENIDO.serie.id, div_container: div_series_top}
];

// variable de la app
// let listaMultimedia = [{
//     img: "https://m.media-amazon.com/images/S/pv-target-images/ae4816cade1a5b7f29787d0b89610132c72c7747041481c6619b9cc3302c0101.jpg",
//     title: "Avatar",
//     sinopsis: "Un exmarine viaja a Pandora y se involucra en el conflicto entre humanos y nativos.",
//     tipo: "pelicula"
//   },
//   {
//     img: "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZmUt.jpg",
//     title: "Inception",
//     sinopsis: "Un ladrón especializado en sueños recibe la misión de implantar una idea.",
//     tipo: "pelicula"
//   },
//   {
//     img: "https://m.media-amazon.com/images/M/MV5BZjhkNjk3.jpg",
//     title: "The Dark Knight",
//     sinopsis: "Batman enfrenta al Joker, quien busca sembrar el caos en Gotham.",
//     tipo: "pelicula"
//   },
//   {
//     img: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3.jpg",
//     title: "Interstellar",
//     sinopsis: "Un grupo de astronautas viaja por el espacio para salvar a la humanidad.",
//     tipo: "pelicula"
//   },
//   {
//     img: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3.jpg",
//     title: "Titanic",
//     sinopsis: "Una historia de amor a bordo del famoso barco que terminó en tragedia.",
//     tipo: "pelicula"
//   },
//   {
//     img: "https://m.media-amazon.com/images/M/MV5BMmEzNTY1ZTUt.jpg",
//     title: "Gladiator",
//     sinopsis: "Un general romano busca venganza tras la traición del emperador.",
//     tipo: "pelicula"
//   },
//   {
//     img: "https://m.media-amazon.com/images/M/MV5BMTk4OTk2.jpg",
//     title: "The Matrix",
//     sinopsis: "Un hacker descubre la verdad sobre la realidad y su papel en la guerra contra las máquinas.",
//     tipo: "pelicula"
//   },
//   {
//     img: "https://m.media-amazon.com/images/M/MV5BYmMyMzY3.jpg",
//     title: "Joker",
//     sinopsis: "La historia del origen del icónico villano de Gotham.",
//     tipo: "pelicula"
//   },
//   {
//     img: "https://m.media-amazon.com/images/M/MV5BN2EyZjM3.jpg",
//     title: "Avengers: Endgame",
//     sinopsis: "Los Vengadores intentan revertir el daño causado por Thanos.",
//     tipo: "pelicula"
//   },
//   {
//     img: "https://m.media-amazon.com/images/M/MV5BMjMxNjY2.jpg",
//     title: "The Shawshank Redemption",
//     sinopsis: "Un hombre condenado injustamente encuentra esperanza en prisión.",
//     tipo: "pelicula"
//   },

//   {
//     img: "https://m.media-amazon.com/images/M/MV5BMmEzNTY1ZTUt.jpg",
//     title: "Breaking Bad",
//     sinopsis: "Un profesor de química comienza a fabricar metanfetamina tras un diagnóstico terminal.",
//     tipo: "serie"
//   },
//   {
//     img: "https://m.media-amazon.com/images/M/MV5BYmMyMzY3.jpg",
//     title: "Stranger Things",
//     sinopsis: "Niños descubren experimentos secretos y criaturas de otra dimensión.",
//     tipo: "serie"
//   },
//   {
//     img: "https://m.media-amazon.com/images/M/MV5BMTk4OTk2.jpg",
//     title: "Game of Thrones",
//     sinopsis: "Familias nobles luchan por el control del Trono de Hierro.",
//     tipo: "serie"
//   },
//   {
//     img: "https://m.media-amazon.com/images/M/MV5BN2EyZjM3.jpg",
//     title: "The Mandalorian",
//     sinopsis: "Un cazarrecompensas protege a un misterioso niño en la galaxia.",
//     tipo: "serie"
//   },
//   {
//     img: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3.jpg",
//     title: "The Witcher",
//     sinopsis: "Un cazador de monstruos lucha por sobrevivir en un mundo lleno de magia.",
//     tipo: "serie"
//   },
//   {
//     img: "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZmUt.jpg",
//     title: "The Office",
//     sinopsis: "Comedia sobre el día a día de empleados en una oficina.",
//     tipo: "serie"
//   },
//   {
//     img: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3.jpg",
//     title: "Friends",
//     sinopsis: "Seis amigos viven experiencias inolvidables en Nueva York.",
//     tipo: "serie"
//   },
//   {
//     img: "https://m.media-amazon.com/images/M/MV5BMjMxNjY2.jpg",
//     title: "The Boys",
//     sinopsis: "Un grupo intenta exponer a superhéroes corruptos.",
//     tipo: "serie"
//   },
//   {
//     img: "https://m.media-amazon.com/images/M/MV5BZjhkNjk3.jpg",
//     title: "Dark",
//     sinopsis: "La desaparición de un niño revela secretos temporales en un pueblo alemán.",
//     tipo: "serie"
//   },
//   {
//     img: "https://m.media-amazon.com/images/M/MV5BMmEzNTY1ZTUt.jpg",
//     title: "House of the Dragon",
//     sinopsis: "La historia de la casa Targaryen antes de los eventos de Game of Thrones.",
//     tipo: "serie"
// }];
let listaMultimedia = []
initApp(); // primera funcion en ser iniciada


// iniciar la app
function initApp() {
    try {
        // cargar elementos del DOM
        cargarElementosDOM();
        // llamar a las api y obtener y guardar los datos
        //callAPI()

        renderContenidoTop(listaMultimedia, LIST_SECCIONES_TOP, CANTIDAD_TOP);

    } catch (error) {
        console.error(error)
    }
}

// funciones de la app
export function buscarContenido(event) {
    event.preventDefault();
    const {txtBuscar, tipoContenido} = event.target;

    if (!txtBuscar  || !tipoContenido) return;
    console.log('filtro >> ' + txtBuscar.value + ' -- ' + tipoContenido.value);
    // filtro de busqueda 
    fetch(`${API_URL}/titles`)
        .then(data => {return data.json()})
        .then(data => {
        const listFilterMultimedia = data.titles;

        const listaFilter =  listFilterMultimedia.filter(contenido => (
            contenido.primaryTitle.includes(txtBuscar.value) &&
            contenido.type === tipoContenido.value
        ));

        console.log(listaFilter);

        if(listaFilter) {
             for (let content in listaFilter) {

                /* crear elementos de las card*/
                const div_card = document.createElement("div");
                const div_card_info = document.createElement("div");
                const img_card = document.createElement("img");
                const p_title = document.createElement("p");
                const p_label_sinopsis = document.createElement("p");
                const p_sinopsis = document.createElement("p");
                const btn_card_access = document.createElement("button");

                /* agregamos sus clases de css */
                div_card.classList.add("card-top");
                div_card_info.classList.add("card-top-info");
                p_label_sinopsis.classList.add("label-sinopsis-card-top");
                p_sinopsis.classList.add("sinopsis-card-top");
                btn_card_access.classList.add("btn-card-top");
                
                /* agregamos el contendo a dicho card */
                img_card.src = listaFilter[content].primaryImage.url;
                p_title.innerText = listaFilter[content].primaryTitle;
                p_label_sinopsis.innerText = "Sinopsis";
                p_sinopsis.innerText = listaFilter[content].plot;
                btn_card_access.innerText = 'Detalles';

                let id = listaFilter[content].id
                /* agregamos id relacionado a la pelicula */
                btn_card_access.addEventListener("click", (event) => renderContenidoDetalles(event, id));

                /* emsamblar contenedores */ 
                div_card_info.append(p_label_sinopsis, p_sinopsis, btn_card_access);
                div_card.append(img_card, p_title, div_card_info);

                // agregar al DOM visual
                div_container_index.innerHTML = "";
                div_container_index.append(div_card);
            }
        }
        })
        .catch(err => console.error('error en template detalles', err));
}


function cargarElementosDOM() {
    // cargar el select con options
    for (let tipoContenido of Object.values(TIPO_CONTENIDO)) {

        const option_element = document.createElement("option");
        option_element.value = tipoContenido.id;
        option_element.text = tipoContenido.nombre;

        select_tipo_contenido.add(option_element);
    }
}

function callAPI() {
    // obtener todos lo titulos
    console.log("calling api");
    fetch(`${API_URL}/titles`)
        .then(data => {return data.json()})
        .then(data => {
            console.log(data.titles);
            listaMultimedia = data.titles;
            renderContenidoTop([data.titles], LIST_SECCIONES_TOP, CANTIDAD_TOP);

        })
        .catch(erro => console.error(erro)) 
}