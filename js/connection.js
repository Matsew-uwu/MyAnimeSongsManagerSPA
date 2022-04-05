/**
 * Récupère tous les animes (GET)
 * @returns {Promise<Anime>} Les animes (promesse json)
 */
const getAnimes = async () => {
    let response = await fetch("http://localhost:5000/api/animes");

    if (!response.ok) {
        const message = `Connexion à l'API impossible : ${response.status}`;
        throw new Error(message);
    }

    return await response.json();
}

/**
 * Récupère toutes les chansons (GET)
 * @returns {Promise<Song>} Les chansons (promesse json)
 */
const getSongs = async () => {
    try {
        let response = await fetch("http://localhost:5000/api/songs");
        response = await response.json();
        return response;
    } catch (err) { 
        return err;
    }
}

/**
 * Récupère un anime (GET)
 * @param {int} id l'id de l'anime à récuperer
 * @returns {Promise<Anime>} promesse avec l'anime qui correspond a l'id
 */
const getAnime = async (id) => {
    return fetch(`http://localhost:5000/api/anime/${id}`)
    .then((response) => {
        return response.json();
    })
    .catch((err) => {
        console.log(res);
    })
    .then((response) => {
        return response;
    }); 
}

/**
 * Envoie les données de l'anime en PUT
 * @param {Anime} anime 
 */
const putAnime = async (anime) => {
    const uri = `http://localhost:5000/api/anime/${anime.id}`;
    fetch(uri, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(anime)
    })
    .then(res => {
        return res.json();
    })
    .then(res => {
        console.log(`PUT : ${res}`);
        refreshTableAnimes();
    })
    .catch(err => {
        console.log(err);
    })
}

const SendEditedAnime = async () => {
    // Trigger si le champs pour le titre est vide
    if (isInputEmpty(document.getElementById("anime-put-name"))) {
        document.getElementById('form-put-anime').classList.add('need-validation', 'was-validated');
        return;
    }

    // Récupère les information du formulaire
    let id = document.getElementById("anime-id").innerText;
    let name = document.getElementById("anime-put-name").value;
    let text = document.getElementById("anime-put-text").value;
    let img = document.getElementById("anime-put-url").value;
    let uri = "";

    // Envoie l'anime
    let anime = new Anime(id, name, text, img, uri);
    await putAnime(anime);

    // Ferme le modal
    AnimeEditionModal.hide()
}

/**
 * DELETE un anime
 * @param {int} id 
 */
 const deleteAnime = async (id) => {
    const uri = `http://localhost:5000/api/anime/${id}`;
    fetch(uri, {
    method: 'DELETE'
    })
    .then(res => {
        return res.json();
    })
    .then(res => {
        console.log(`DELETE : ${res}`);
        refreshTableAnimes();
    })
    .catch(err => {
        console.log(err);
    })
}

const SendDeleteAnime = async () => {
    // Récupère les information du formulaire
    let id = document.getElementById("anime-id2").innerText;
    await deleteAnime(id);
}

/**
 * Crée un anime en POST
 * @param {Anime} anime 
 */
 const postAnime = async (anime) => {
    const uri = `http://localhost:5000/api/animes`;
    fetch(uri, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(anime)
    })
    .then(res => {
        return res.json();
    })
    .then(res => {
        console.log(`POST : ${res}`);
        refreshTableAnimes();
    })
    .catch(err => {
        console.log(err);
    })
}

const SendCreatedAnime = async () => {
    
    // Trigger si le champs pour le titre est vide
    if (isInputEmpty(document.getElementById("anime-post-name"))) {
        document.getElementById('form-post-anime').classList.add('need-validation', 'was-validated');
        return;
    }

    // Récupère les information du formulaire
    let id = null; //id n'est pas utilisé par l'api
    let name = document.getElementById("anime-post-name").value;
    let text = document.getElementById("anime-post-text").value;
    let img = document.getElementById("anime-post-url").value;
    let uri = "";

    // Envoie l'anime
    let anime = new Anime(id, name, text, img, uri);
    await postAnime(anime);

    // Vide le formulaire
    refreshFormAnime(this);
    
    // Ferme le modal
    AnimeAjoutModal.hide();
}

(async () => {
    console.log('Lancement scipt : Connexion');
    console.log(await getAnimes());
})()




//Chansons


/**
 * Récupère une chanson (GET)
 * @param {int} id l'id de la chanson à récuperer
 * @returns {Promise<Song>} promesse avec la chanson qui correspond a l'id
 */
 const getSong = async (id) => {
    return fetch(`http://localhost:5000/api/song/${id}`)
    .then((response) => {
        return response.json();
    })
    .catch((err) => {
        console.log(res);
    })
    .then((response) => {
        return response;
    }); 
}

/**
 * Envoie les données de la chanson en PUT
 * @param {Song} song 
 */
const putSong = async (song) => {
    const uri = `http://localhost:5000/api/song/${song.id}`;
    fetch(uri, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(song)
    })
    .then(res => {
        return res.json();
    })
    .then(res => {
        console.log(`PUT : ${res}`);
        refreshTableSongs();
    })
    .catch(err => {
        console.log(err);
    })
}

/*const SendEditedSong = async () => {
    // Récupère les information du formulaire
    let id = document.getElementById("song-id").innerText;
    let name = document.getElementById("name").value;
    let text = document.getElementById("text").value;
    let img = document.getElementById("anime-img-url").value;
    let uri = "";

    let anime = new Anime(id, name, text, img, uri);
    await putAnime(anime);
}*/

/**
 * DELETE une chanson
 * @param {int} id 
 */
 const deleteSong = async (id) => {
    const uri = `http://localhost:5000/api/song/${id}`;
    fetch(uri, {
    method: 'DELETE'
    })
    .then(res => {
        return res.json();
    })
    .then(res => {
        console.log(`DELETE : ${res}`);
        refreshTableSongs();
    })
    .catch(err => {
        console.log(err);
    })
}

const SendDeleteSong = async () => {
    // Récupère les information du formulaire
    let id = document.getElementById("song-id2").innerText;
    await deleteSong(id);
}

/**
 * Crée une chanson en POST
 * @param {Song} song 
 */
 const postSong = async (song) => {
    const uri = `http://localhost:5000/api/songs`;
    fetch(uri, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(song)
    })
    .then(res => {
        return res.json();
    })
    .then(res => {
        console.log(`POST : ${res}`);
        refreshTableSongs();
    })
    .catch(err => {
        console.log(err);
    })
}

/*const SendCreatedSong = async () => {
    // Récupère les information du formulaire
    let id = null; //id n'est pas utilisé par l'api
    let name = document.getElementById("anime-post-name").value;
    let text = document.getElementById("anime-post-text").value;
    let img = document.getElementById("anime-post-image").value;
    let uri = "";

    let anime = new Anime(id, name, text, img, uri);
    await postAnime(anime);
}
*/
(async () => {
    console.log('Lancement scipt : Connexion');
    console.log(await getAnimes());
})()