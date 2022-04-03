/**
 * Récupère les chansons et les ajoutes dans la table correspondante
 */
 const refreshTableSongs = async () => {
    const songs = await getSongs();
    console.log(songs);
    let table = document.getElementById("table");
    table.innerHTML = "";

    //Refonte du header du tableau pour les chansons
    let tableHeader = document.getElementById("table-header");
    tableHeader.innerHTML = "";
    let numero = document.createElement("th");
    numero.setAttribute("scope", "col");
    numero.append("#");

    let titre = document.createElement("th");
    titre.setAttribute("scope", "col");
    titre.append("Titre");

    let relation = document.createElement("th");
    relation.setAttribute("scope", "col");
    relation.append("Type");

    let liens = document.createElement("th");
    liens.setAttribute("scope", "col");
    liens.append("Liens");

    let thBtnAjouter = document.createElement("th");
    thBtnAjouter.setAttribute("scope", "col");
    let btnAjouter = document.createElement("button");
    btnAjouter.classList.add("btn", "btn-primary");
    btnAjouter.type="submit";
    btnAjouter.setAttribute("data-bs-toggle", "modal")
    btnAjouter.setAttribute("data-bs-target", "songAjoutModal");
    

    for (const s of songs){
        let song = new Song(s.id, s.title, s.relation, s.interpreter, ytb_url=s.ytb_url, spoty_url=s.spoty_url, s.anime_id);
        //création de la ligne
        let row = CreateSongLine(table, song);

        // Insertion des boutons
        let { btnEdit, btnSuppr } = CreateButtonsDelEditSong(song);
        let cellBtn = row.insertCell(4);
        cellBtn.append(btnEdit, btnSuppr);
    }
}

/**
 * Fonction chargée de préremplir le formulaire d'édition
 */
const fillSongEditModal = async (self) => {
    let song = await getSong(self.id);

    document.getElementById("song-id").innerHTML = song.id;
    document.querySelector("#songEditionModal #name").value = song.name;
    document.querySelector("#songEditionModal #text").value = song.text;
    document.querySelector("#songEditionModal #song-img").setAttribute("src", song.img);
    document.querySelector("#songEditionModal #song-img-url").value = song.img;
    
}

/**
 * Fonction chargée de préremplir le popup de suppression de la chanson
 */
 const fillSongDeleteModal = async (self) => {
    let song = await getSong(self.id);

    document.getElementById("song-name2").innerHTML = song.name;
    document.getElementById("song-id2").innerHTML = self.id;

}

/**
 * Crée la ligne avec la chanson dans le tableau
 * @param {HTMLElement} table le tableau dans lequel il faut ajouter la ligne
 * @param {Song} song la chanson
 * @returns {HTMLTableRowElement} la ligne à inserer dans le tableau
 */
function CreateSongLine(table, song) {
    let row = table.insertRow(-1);
    row.id = "song-" + song.name;

    let cellId = row.insertCell(0);
    cellId.append(song.id);
    cellId.disabled = true;

    let cellName = row.insertCell(1);
    cellName.append(song.name);

    let cellText = row.insertCell(2);
    cellText.append(song.text);

    let cellImg = row.insertCell(3);
    cellImg.append(song.img);
    return row;
}

/**
 * Crée les boutons d'édition et de suppression des chansons
 * @param {Song} song la chanson de la ligne dans le tableau
 * @returns { HTMLButtonElement} {btnEdit, btnSuppr} les deux boutons
 */
function CreateButtonsDelEditSong(song) {
    // Insertion du bouton d'édition
    let btnEdit = document.createElement('button');
    btnEdit.append('Éditer');
    btnEdit.type = "button";
    btnEdit.id = song.id;
    btnEdit.setAttribute('data-bs-toggle', "modal");
    btnEdit.setAttribute('data-bs-target', "#songEditionModal");
    btnEdit.onclick = function () {
        fillSongEditModal(this);
    };
    // Insertion du bouton de suppression
    let btnSuppr = document.createElement('button');
    btnSuppr.append('Supprimer');
    btnSuppr.id = song.id;
    btnSuppr.setAttribute('data-bs-toggle', "modal");
    btnSuppr.setAttribute('data-bs-target', "#songSupprimerModal");
    btnSuppr.onclick = function () {
        fillSongDeleteModal(this);
    };
    return { btnEdit, btnSuppr };
}