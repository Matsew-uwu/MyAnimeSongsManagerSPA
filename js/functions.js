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

        let tdButton = document.createElement("td");
        let btnEdit = document.createElement("button");
        btnEdit.append("editer");
        let btnSuppr = document.createElement("button");
        btnSuppr.append("supprimer");
        tdButton.appendChild(btnEdit);
        tdButton.appendChild(btnSuppr);
        ligne.appendChild(tdButton);

        table.appendChild(ligne);
    }
}

createTable();