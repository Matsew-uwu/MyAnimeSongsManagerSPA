const createTable = async () => {
    const animes = await getAnimes();
    let table = document.getElementById("tablesAnimes");
    for (let i = 0; i < animes.length; i++) {
        let anime = new Anime(animes[i].id, animes[i].name, animes[i].text, animes[i].img, uri="");

        let ligne = document.createElement("tr");
        ligne.id = "anime-"+anime.name;

        let th = document.createElement("th");
        th.append(anime.id);
        ligne.appendChild(th);

        let tdTitre = document.createElement("td");
        tdTitre.append(anime.name);
        ligne.appendChild(tdTitre);

        let tdDesc = document.createElement("td");
        tdDesc.append(anime.text);
        ligne.appendChild(tdDesc);

        let tdImg = document.createElement("td");
        tdImg.append(anime.img);
        ligne.appendChild(tdImg);

        table.appendChild(ligne);
    }
}

createTable();