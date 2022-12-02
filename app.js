// Almacenamos en variables la claves de nuestra api para el texto y para las imagenes
let urlText =  'http://www.omdbapi.com/?i=tt3896198&apikey=d915cd32'
let urlPoster = 'http://img.omdbapi.com/?apikey=d915cd32'




// Vamos a obtener los elementos 
const getSeachText = ()=>{

    const submit = document.getElementById('submit');

    submit.addEventListener('click', async (e)=>{
        e.preventDefault();

        // Vamos a crear una promesa que es un nuevo objeto, esto para pasarle la informacion capturada a testApi
        let promise = new Promise((resolve, reject)=>{

            const movieSearchTitle = document.getElementById('movieSearchTitle').value ? document.getElementById('movieSearchTitle') : false;

            // Que informacion se esta capturando
            // console.log(movieSearchText);

            if(movieSearchTitle) {
                resolve()
            } else{
                console.log('reject');
                reject();
            }

        });

        promise.then(
            await(testApi(movieSearchTitle.value)),
            error => console.log(error),
        )

        
    });    
}

getSeachText();





// Creamos una funcioon asyncrono para realizar una busqueda (fetch) y coo segundo parametro le pasamos un metodo GET
const testApi = async (movieSearch) =>{

    // Peticion de la informacion
    let urlText = `http://www.omdbapi.com/?t=${movieSearch}&type=movie&apikey=23daade9`


    // const resultText = await fetch('http://www.omdbapi.com/?apikey=23daade9', {
    //     method: 'GET'
    // });

    // Podemos realizar busquedas ejecutando la informacion que nos arroja la API para llamas a nombre de la peli, genero etc
    const resultText = await fetch(urlText, {
        method: 'GET'
    });

    const dataText = await resultText.json();

    console.log(dataText)

    // Peticion del poster
    let urlPoster = `http://img.omdbapi.com/?i=${dataText.imdbID}&type=movie&apikey=23daade9`

    // Resultado del poster
    const resultPoster = await fetch(urlPoster, {
        method: 'GET'
    });

    const dataPoster = await resultPoster.url;

    // llamado a la funcion pintar
    printMovies(dataText, dataPoster);


    // Almaceno el resultado de la busqueda en un json 
   let resultJson; 


    // Si la conuslta resulta en un ok, se va a imprimir el resultado
    // Esto es solo para entender como se hacen las consultas
    if(resultText.ok){
        resultJson = await resultText.json();

        console.log(resultText)
        console.log(resultJson)

        // Ya podemos iprimir resultados de la busqueda 
        console.log(resultJson.Director);
        console.log(resultJson.Poster)
    }

    // Vamos a crear los primeros estatus 
    if(resultText.status == 300) {
        console.log(resultText)
    }


};

// Ejecutamos la funcion 
// Luego no lo necesitamos porque lo estamos ejecutando desde la promesa
// testApi()



const printMovies = async(dataText, dataPoster) =>{

    let cardMovie = document.getElementById('cardMovie');
    cardMovie.innerHTML = "";

    const moviePoster = document.createElement('img');
    moviePoster.className = 'card-img-top';
    moviePoster.src = dataPoster;
    moviePoster.alt = dataText.Title;

    const movieTitle = document.createElement('h4');
    movieTitle.className = 'card-title pt-4 pl-2'
    movieTitle.textContent = dataText.Title.toUpperCase()


    const movieLink = document.createElement('a');
    movieLink.className = 'btn btn-dark'
    movieLink.href = `https://www.imdb.com/title/${dataText.imdbID}/`;
    movieLink.textContent = 'IMDB';
    movieLink.target = '_blank';

    const movieUl = document.createElement('ul');
    movieUl.className = "list-group list-group-flush"

    let movieArray = [];

    for(let key in dataText){
        movieArray.push(key + ": " + dataText[key]);
    }

    // Puevo ver los elementos que estoy almacenando en el array
    // console.log(movieArray);
    
    movieArray.map((value, index) => {

        if([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].includes(index)) {
            let dataLi = document.createElement('li');
            dataLi.className = 'list-group-item'
            dataLi.textContent = value;

            movieUl.appendChild(dataLi)
        }

    })

    cardMovie.appendChild(moviePoster);
    cardMovie.appendChild(movieTitle);
    cardMovie.appendChild(movieLink);
    cardMovie.appendChild(movieUl);

};


