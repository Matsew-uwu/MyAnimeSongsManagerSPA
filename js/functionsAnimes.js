// Récupération de modals pour manipulation
let AnimeAjoutModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('animeAjoutModal'));
let AnimeEditionModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('animeEditionModal'));

// Empeche la validation de la barre de recherche
let bar = document.getElementById("search-bar");
bar.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        refreshSearch();
        event.preventDefault();
    }
});

/**
 * Récupère les animes et les ajoutes dans la table correspondante
 */
 const refreshTableAnimes = async (limit = 15, page = 1, tag = "", argument = "", order = "") => {
    const animes = await getAnimes(limit, page, tag, argument, order);
    document.getElementById('table-content').setAttribute('type', "animes");
    let table = document.getElementById("table");
    table.innerHTML = "";
    CreateTableHeader(["#", "Titre", "Description", "Cover"], "anime");

    for (const a of animes){
        let anime = new Anime(a.id, a.name, a.text, a.img, uri="");

        //création de la ligne
        let row = CreateAnimeLine(table, anime);

        // Insertion des boutons
        let { btnEdit, btnSuppr } = CreateButtonsDelEditAnime(anime);
        btnSuppr.classList.add("ms-2");
        let cellBtn = row.insertCell(4);
        let div = document.createElement('div');
        div.append(btnEdit, btnSuppr)
        div.classList.add('d-flex');
        cellBtn.append(div);
    }
}

/**
 * Fonction chargée de préremplir le formulaire d'édition
 */
const fillAnimeEditModal = async (self) => {
    let anime = await getAnime(self.id);

    let form = document.getElementById('form-put-anime');
    form.classList.remove("need-validation", "was-validated");
    document.getElementById("anime-id").innerHTML = anime.id;
    document.querySelector("#animeEditionModal #anime-put-name").value = anime.name;
    document.querySelector("#animeEditionModal #anime-put-text").value = anime.text;
    img = isValidUrl(anime.img) ? anime.img : `http://localhost:5000/api/image/${anime.img}`;
    document.querySelector("#animeEditionModal #anime-put-img").setAttribute("src", img);
    document.querySelector("#animeEditionModal #anime-put-url").value = anime.img;
    
}

/**
 * Fonction chargée de préremplir le popup de suppression
 */
 const fillAnimeDeleteModal = async (self) => {
    let anime = await getAnime(self.id);

    document.getElementById("anime-name2").innerHTML = anime.name;
    document.getElementById("anime-id2").innerHTML = self.id;

}

const refreshFormAnime = (self) => {
    document.getElementById("form-post-anime").classList.remove("need-validation", "was-validated");
    document.getElementById("anime-post-name").value = "";
    document.getElementById("anime-post-url").value = "";
    document.getElementById("anime-post-text").value = "";
    document.getElementById("anime-post-img").src = "";
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
    let img = document.createElement("img");
    
    img.src = isValidUrl(anime.img) ? anime.img  : `http://localhost:5000/api/image/${anime.img}`;

    img.alt = anime.img
    img.style.width = "150px";
    cellImg.appendChild(img);
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
    btnEdit.innerHTML = '<i class="fa fa-bars"></i>';
    btnEdit.type = "button";
    btnEdit.classList.add("btn", "btn-secondary");
    btnEdit.id = anime.id;
    btnEdit.setAttribute('data-bs-toggle', "modal");
    btnEdit.setAttribute('data-bs-target', "#animeEditionModal");
    btnEdit.onclick = function () {
        fillAnimeEditModal(this);
    };
    // Insertion du bouton de suppression
    let btnSuppr = document.createElement('button');
    btnSuppr.innerHTML = '<i class="fa fa-trash"></i>';
    btnSuppr.classList.add("btn", "btn-secondary");
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
 * @param {String} type le type de l'entete ( doit etre "anime" ou "song" )
 */
const CreateTableHeader = (attributes, type) => {
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
    button.setAttribute("data-bs-target", "#"+type+"AjoutModal");
    if (type === "song") {
        button.onclick = function () {
            fillSongCreateModal(this);
        };
    }
    button.innerHTML = '<i class="fa fa-plus"></i>';
    cell.append(button)
    cell.classList.add("text-center");

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

/**
 * Actualise l'affiche de l'image de couverture
 * @param {HTMLInputElement} field 
 */
const refreshCover = (field, target) => {
    isValidUrl(field.value) ? document.getElementById(target).src = field.value  : document.getElementById(target).src = `http://localhost:5000/api/image/${field.value}`;
}

const isInputEmpty = (input) => {
    return input.value.length == 0;
}

const refreshSearch = () => {
    if (document.getElementById('table-content').getAttribute('type') == "animes"){
        refreshTableAnimes(15, 1, bar.value);
    } else if (document.getElementById('table-content').getAttribute('type') == "songs") {
        refreshTableSongs(15, 1, bar.value);
    }
}

const getAnimesPage = (page) => {
    console.log('animes')
    refreshTableAnimes(15, page, bar.value);
}

const getSongsPage = (page) => {
    console.log('songs')
    console.log(page)
    refreshTableSongs(50, page, bar.value);
}

const getPaginationPage = (page) => {
    if (document.getElementById('table-content').getAttribute('type') == "animes"){
        getAnimesPage(page);
    } else if (document.getElementById('table-content').getAttribute('type') == "songs") {
        getSongsPage(page);
    }
}


//Crée ou recharge le tableau au lancement du site
(async () => {
    console.log('Lancement script : Fonctions Animes');
    refreshTableAnimes("anime");
})()



