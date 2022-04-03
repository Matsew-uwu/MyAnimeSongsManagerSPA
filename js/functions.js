/**
 * Récupère les animes et les ajoutes dans la table correspondante
 */
 const refreshTable = async () => {
    const animes = await getAnimes();
    let table = document.getElementById("table");
    table.innerHTML = "";
    CreateTableHeader(["#", "Titre", "Description", "Ref. Image"]);

    for (const a of animes){
        let anime = new Anime(a.id, a.name, a.text, a.img, uri="");

        //création de la ligne
        let row = CreateAnimeLine(table, anime);

        // Insertion des boutons
        let { btnEdit, btnSuppr } = CreateButtonsDelEditAnime(anime);
        let cellBtn = row.insertCell(4);
        cellBtn.append(btnEdit, btnSuppr);
    }
}

/**
 * Fonction chargée de préremplir le formulaire d'édition
 */
const fillAnimeEditModal = async (self) => {
    let anime = await getAnime(self.id);

    document.getElementById("anime-id").innerHTML = anime.id;
    document.querySelector("#animeEditionModal #name").value = anime.name;
    document.querySelector("#animeEditionModal #text").value = anime.text;
    img = isValidUrl(anime.img) ? anime.img : `http://localhost:5000/api/image/${anime.img}`;
    document.querySelector("#animeEditionModal #anime-img").setAttribute("src", img);
    document.querySelector("#animeEditionModal #anime-img-url").value = anime.img;
    
}

/**
 * Fonction chargée de préremplir le popup de suppression
 */
 const fillAnimeDeleteModal = async (self) => {
    let anime = await getAnime(self.id);

    document.getElementById("anime-name2").innerHTML = anime.name;
    document.getElementById("anime-id2").innerHTML = self.id;

}

/**
 * Crée la ligne avec l'anime dans le tableau
 * @param {HTMLElement} table le tableau dans lequel il faut ajouter la ligne
 * @param {Anime} anime l'anime
 * @returns {HTMLTableRowElement} la ligne à inserer dans le tableau
 */
const CreateAnimeLine = (table, anime) => {
    let row = table.insertRow(-1);
    row.id = "anime-" + anime.name;

    let cellId = row.insertCell(0);
    cellId.append(anime.id);
    cellId.disabled = true;

    let cellName = row.insertCell(1);
    cellName.append(anime.name);

    let cellText = row.insertCell(2);
    cellText.append(anime.text);

    let cellImg = row.insertCell(3);
    cellImg.append(anime.img);
    return row;
}

/**
 * Crée les boutons d'édition et de suppression des animes
 * @param {Anime} anime l'anime de la ligne dans le tableau
 * @returns { HTMLButtonElement} {btnEdit, btnSuppr} les deux boutons
 */
const CreateButtonsDelEditAnime = (anime) => {
    // Insertion du bouton d'édition
    let btnEdit = document.createElement('button');
    btnEdit.append('Éditer');
    btnEdit.type = "button";
    btnEdit.id = anime.id;
    btnEdit.setAttribute('data-bs-toggle', "modal");
    btnEdit.setAttribute('data-bs-target', "#animeEditionModal");
    btnEdit.onclick = function () {
        fillAnimeEditModal(this);
    };
    // Insertion du bouton de suppression
    let btnSuppr = document.createElement('button');
    btnSuppr.append('Supprimer');
    btnSuppr.id = anime.id;
    btnSuppr.setAttribute('data-bs-toggle', "modal");
    btnSuppr.setAttribute('data-bs-target', "#animeSupprimerModal");
    btnSuppr.onclick = function () {
        fillAnimeDeleteModal(this);
    };
    return { btnEdit, btnSuppr };
}

/**
 * Créer l'entête de la table
 * @param {List} attributes liste des attributs de l'entête de la table
 */
const CreateTableHeader = (attributes) => {
    let header = document.getElementById("table-header");
    header.innerHTML = "";

    let i;
    let cell;
    for (i = 0; i < attributes.length; i++) {
        cell = header.insertCell(i);
        cell.append(attributes[i]);
    }
    cell = header.insertCell(i);
    // Création bouton d'ajout
    let button = document.createElement("button");
    button.classList.add('btn', "btn-primary");
    button.setAttribute("data-bs-toggle", "modal");
    button.setAttribute("data-bs-target", "#animeAjoutModal");
    button.append('Ajouter');
    cell.append(button)

}

/**
 * Simple fonction pour vérifier la validité d'une url
 * @param {String} url 
 * @returns 
 */
const isValidUrl = url => {
    const matchpattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
    return matchpattern.test(url);
}


//Crée ou recharge le tableau au lancement du site
(async () => {
    console.log('Lancement scipt : Functions');
    refreshTable("anime");
})()



