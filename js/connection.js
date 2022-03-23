"use-strict"

const getAnimes = async () => {
    try {
        let response = await fetch("http://localhost:5000/api/animes");
        response = await response.json();
        return response;
    } catch (err) {
        return err;
    }
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

(async () => {
    console.log('Lancement scipt : Connexion');
    console.log(await getAnimes());
})()