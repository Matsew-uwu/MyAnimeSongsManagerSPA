"use-strict"

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
    .then((response) => {
        return response;
    });
}

(async () => {
    console.log('Lancement scipt : Connexion');
    console.log(await getAnimes());
})()