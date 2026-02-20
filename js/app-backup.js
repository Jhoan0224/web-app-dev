
// cargar dinamicamente resultados de busqueda dentro de la app principal
const div_container_index = document.getElementById("container");
const div_movies_top = document.getElementById("container-top-movies");
const div_series_top = document.getElementById("container-top-series");
const h3_title_resultdo = document.createElement("h3");

// variales de la app
const CANTIDAD_TOP = 5;
const TIPO_CONTENIDO = {
    pelicula: {id: 'pelicula', nombre: 'Peliculas'},
    serie: {id: 'serie', nombre: 'Series'}, 
    documental: {id: 'documental', nombre: 'Documentales'},
    cartoon: {id: 'cartoon', nombre: 'Cartoon'}
};

const LIST_SECCIONES_TOP = [ 
    {id: TIPO_CONTENIDO.pelicula.id, div_container: div_movies_top},
    {id: TIPO_CONTENIDO.serie.id, div_container: div_series_top}
];
const listaMultimedia = [ {
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


function renderContenidoDetalles2(event, idContenido) {
    event.preventDefault();
    const contenidoDetalles = listaMultimedia.find(contenido => contenido.title == idContenido);
    div_container_index.innerHTML = "";

    let tmpl_contenido_detalles = document.createElement("div");
    let tmpl_contenido_relacionado = document.createElement("div");
    div_container_index.append(tmpl_contenido_detalles, tmpl_contenido_relacionado);

    fetch('../templates/contenido-detalles.html')
        .then(tmpl => {return tmpl.text()})
        .then(tmpl => {
            const tmplRender = tmpl.replace("{{img}}", contenidoDetalles.img)
            .replace("{{title}}", contenidoDetalles.title)
            .replace("{{fechaEstreno}}", 'dec 2025')
            .replace("{{director}}", "Carlos del toro")
            .replace("{{actores}}", "Carlos, Juan, Pepito y Victor")
            .replace("{{sinopsis}}", contenidoDetalles.sinopsis);
            
            tmpl_contenido_detalles.innerHTML = tmplRender.trim();

        })
        .catch(err => console.error('error en template detalles', err));
    
    tmpl_contenido_relacionado.classList.add("contenido-relacionado");


    for (let content of listaMultimedia) {
        
        const div_card_contenido = document.createElement("div");
        const img_card = document.createElement("img");
        const div_card_info = document.createElement("div");
        const p_title = document.createElement("p");
        const p_pelicula_fecha = document.createElement("p");
        const p_duracion = document.createElement("p");
        const btn_ver_detalles = document.createElement("btn");

        
        div_card_contenido.classList.add("card-contenido-relacionado");
        p_title.classList.add("card-title-contenido-relacionado");
        div_card_info.classList.add("card-info-contenido-relacionado");

        img_card.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZhb_fM6ZgrWqfLhzRP838s48bds1cHW1F8Q&s';
        p_title.innerText = content.title;
        p_pelicula_fecha.innerText = "Pelicula, Dic 2025";
        p_duracion.innerText = "2h 50min";
        btn_ver_detalles.innerText = "Ver detalles";

        div_card_info.append(p_pelicula_fecha, p_duracion, btn_ver_detalles);
        div_card_contenido.append(img_card, p_title, div_card_info);
        
        tmpl_contenido_relacionado.append(div_card_contenido);
    }
    
}

function renderContenidoDetalles(idContenido) {
    const contenidoDetalles = listaMultimedia.find(contenido => contenido.title == idContenido);
    
    console.log(contenidoDetalles);
    
    /* limpiamos al div container index*/
    div_container_index.innerHTML = "";

    /* crear la card y sus componentes internos*/
    const div_contenido_detalles = document.createElement("div");
    const div_info_left = document.createElement("div");
    const div_info_right = document.createElement("div");
    const img_card = document.createElement("img");
    const p_title_card = document.createElement("p");
    const p_sinopsis = document.createElement("p");
    const p_fecha_estreno = document.createElement("p");
    const p_director = document.createElement("p");
    const p_actores = document.createElement("p");
    const btn_ver_video = document.createElement("button");

    /* agregar clases a los elementos */
    div_contenido_detalles.classList.add("card-contenido-detalles");
    div_info_left.classList.add("card-detalles-left");
    div_info_left.classList.add("card-detalles-left");
    div_info_right.classList.add("card-detalles-right");
    btn_ver_video.classList.add("btn-ver-contenido");

    /* agregar datos */
    img_card.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZhb_fM6ZgrWqfLhzRP838s48bds1cHW1F8Q&s";
    p_title_card.innerText = contenidoDetalles.title;
    p_director.innerText = "Director: "+ 'Carlos';
    p_sinopsis.innerText = "Sinopsis: " + contenidoDetalles.sinopsis;
    p_fecha_estreno.innerText = 'fecha de lanzamiento Diciembre 2025';
    p_actores.innerHTML = "Actores principales: " + "Juan, Pepito y Ramon";
    
    btn_ver_video.innerText = "Ver";
    btn_ver_video.addEventListener("click", () => (s));
    
    /* aqui llenamos los datos para cada card */
    div_info_left.append(img_card);
    div_info_right.append(p_title_card, p_fecha_estreno, p_director, p_actores, p_sinopsis, btn_ver_video);
    div_contenido_detalles.append(div_info_left, div_info_right);

    /* agregamos al div container index*/
    div_container_index.appendChild(div_contenido_detalles);
}

renderContenidoTop(LIST_SECCIONES_TOP, listaMultimedia);



