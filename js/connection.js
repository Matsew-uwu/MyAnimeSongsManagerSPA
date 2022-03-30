const getAnimes = async () => {
    let response = await fetch("http://localhost:5000/api/animes");

    if (!response.ok) {
        const message = `Connexion à l'API impossible : ${response.status}`;
        throw new Error(message);
    }

    return await response.json();
}

const getSongs = async () => {
    try {
        let response = await fetch("http://localhost:5000/api/songs");
        response = await response.json();
        return response;
    } catch (err) { 
        return err;
    }
}

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
 * Envoie les données de l'anime en POST
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
        // Print result as string
        refreshTable();
    })
    .catch(err => {
        console.log(err);
    })
}

const postAnime = (anime) => {
    const uri = `http://localhost:5000/api/anime/`;
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
            console.log(`PUT : ${res}`);
            // Print result as string
            refreshTable();
        })
        .catch(err => {
            console.log(err);
        })
}

const SendEditedAnime = async () => {
    // Récupère les information du formulaire
    let id = document.getElementById("anime-id").innerText;
    let name = document.getElementById("anime-name").value;
    let text = document.getElementById("anime-text").value;
    let img = "";
    let uri = "";

    let anime = new Anime(id, name, text, img, uri);
    await putAnime(anime);
}

const addAnime = async () => {
    // Récupère les information du formulaire
    let name = document.getElementById("anime-name").value;
    let text = document.getElementById("anime-text").value;
    let img = "";
    let uri = "";

    let anime = new Anime(id, name, text, img, uri);
    await postAnime(anime);
}

(async () => {
    console.log('Lancement scipt : Connexion');
    console.log(await getAnimes());
})()