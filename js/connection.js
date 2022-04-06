/**
 * Récupère tous les animes (GET)
 * @returns {Promise<Anime>} Les animes (Promesse json)
 */
const getAnimes = async (limit = 15, page = 1, tag = "", argument = "", order = "") => {
    let uri = `http://localhost:5000/api/animes?limit=${limit}&page=${page}&tag=${tag}&argument=${argument}&order=${order}`;
    let response = await fetch(uri);

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
const getSongs = async (limit = 15, page = 1, tag = "", argument = "", order = "") => {
    let uri = `http://localhost:5000/api/songs?limit=${limit}&page=${page}&tag=${tag}&argument=${argument}&order=${order}`;
    try {
        let response = await fetch(uri);
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
        console.log(err);
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

/**
 * Recupere les donnees du formulaire de l'edition d'un anime et cree la requete put
 */
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

/**
 * Recupere l'id de l'anime a supprimer et cree la requete delete
 */
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

/**
 * Recupere les donnees du formulaire de l'ajout d'un anime et cree la requete post
 */
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
    let uri = ""; //non utilise

    // Envoie l'anime
    let anime = new Anime(id, name, text, img, uri);
    await postAnime(anime);

    // Vide le formulaire
    refreshFormAnime(this);
    
    // Ferme le modal
    AnimeAjoutModal.hide();
}


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
        console.log(err);
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

/**
 * Recupere les donnees du formulaire de l'edition d'une chanson et cree la requete put
 */
const SendEditedSong = async () => {
    // Récupère les information du formulaire
    let id = document.getElementById("song-id").innerText;
    let titre = document.getElementById("song-put-name").value;
    let relation = document.getElementById("song-put-relation").value;
    let interpreter = document.getElementById("song-put-interpreter").value;
    let youtube = document.getElementById("song-put-youtube").value;
    let spotify = document.getElementById("song-put-spotify").value;

    let song = new Song(id, titre, relation, interpreter, youtube, spotify, null, ""); //il faut recuperer l'id de l'anime normalement mais visiblement ca ne gene pas
    await putSong(song);
}

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

/**
 * Recupere l'id de la chanson a supprimer et cree la requete delete
 */
const SendDeleteSong = async () => {
    // Récupère les information du formulaire
    let id = document.getElementById("song-id2").innerText;
    await deleteSong(id);
}

/**
 * Crée une chanson en POST et envoie la requete
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

/**
 * Recupere les donnees du formulaire de l'ajout d'une chanson et cree la requete post
 */
const SendCreatedSong = async () => {
    // Récupère les information du formulaire
    let id = null; //gere automatiquement
    let titre = document.getElementById("song-post-name").value;
    let relation = document.getElementById("song-post-relation").value;
    let interpreter = document.getElementById("song-post-interpreter").value;
    let youtube = document.getElementById("song-post-youtube").value;
    let spotify = document.getElementById("song-post-spotify").value;
    let anime_id = document.getElementById("song-post-animes").value;
    let uri = ""; //non utilise
    
    let song = new Song(id, titre, relation, interpreter, youtube, spotify, anime_id, uri);
    await postSong(song);
}

(async () => {
    console.log('Lancement script : Connexion');
})()