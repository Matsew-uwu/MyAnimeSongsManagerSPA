/**
 * Récupère les animes et les ajoutes dans la table correspondante
 */
 const createTable = async () => {
    const animes = await getAnimes();
    let table = document.getElementById("table");

    for (const a of animes){
        let anime = new Anime(a.id, a.name, a.text, a.img, uri="");

        let row = table.insertRow(0);
        row.id = "anime-"+anime.name;

        let cellId = row.insertCell(0);
        cellId.append(anime.id);

        let cellName = row.insertCell(1);
        cellName.append(anime.name);

        let cellText = row.insertCell(2);
        cellText.append(anime.text);

        let cellImg = row.insertCell(3);
        cellImg.append(anime.img);
    }
}

(async () => {
    console.log('Lancement scipt : Functions');
    createTable();
})()