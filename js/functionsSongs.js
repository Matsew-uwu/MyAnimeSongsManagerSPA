/**
 * Récupère les chansons et les ajoutes dans la table correspondante
 */
 const refreshTableSongs = async (limit = 15, page = 1, tag = "", argument = "", order = "") => {
    const songs = await getSongs(15, 1, tag);
    document.getElementById('table-content').setAttribute('type', "songs");
    let table = document.getElementById("table");
    table.innerHTML = "";
    CreateTableHeader(["#", "Titre", "Relation", "Interpreteur", "Liens", "Anime Cover"], "song");
    

    for (const s of songs){
        let song = new Song(s.id, s.title, s.relation, s.interpreter, ytb_url=s.ytb_url, spoty_url=s.spoty_url, s.anime_id);
        //création de la ligne
        let row = CreateSongLine(table, song);

        
    }
}

/**
 * Fonction chargée de préremplir le formulaire d'édition
 */
const fillSongEditModal = async (self) => {
    let song = await getSong(self.id);

    document.getElementById("song-id").innerHTML = song.id;
    document.getElementById("song-put-name").value = song.title;
    document.getElementById("song-put-relation").value = song.relation;
    document.getElementById("song-put-interpreter").value = song.interpreter;
    document.getElementById("song-put-youtube").value = song.ytb_url;
    document.getElementById("song-put-spotify").value = song.spoty_url;    
}

/**
 * Fonction chargée de préremplir le popup de suppression de la chanson
 */
 const fillSongDeleteModal = async (self) => {
    let song = await getSong(self.id);

    document.getElementById("song-name2").innerHTML = song.title;
    document.getElementById("song-id2").innerHTML = self.id;
    
}

/**
 * Fonction chargée de préremplir le popup de l'ajout de la chanson (les animes possibles)
 */
 const fillSongCreateModal = async (self) => {
    await creerOptionsAnimes();
}

/**
 * Crée la ligne avec la chanson dans le tableau
 * @param {HTMLElement} table le tableau dans lequel il faut ajouter la ligne
 * @param {Song} song la chanson
 * @returns {HTMLTableRowElement} la ligne à inserer dans le tableau
 */
async function CreateSongLine(table, song) {
    let row = table.insertRow(-1);
    row.id = "song-" + song.title;

    let cellId = row.insertCell(0);
    cellId.append(song.id);
    cellId.disabled = true;

    let cellName = row.insertCell(1);
    cellName.append(song.title);

    let cellRelation = row.insertCell(2);
    cellRelation.append(song.relation);

    let cellInterpreter = row.insertCell(3);
    cellInterpreter.append(song.interpreter);

    let cellLiens = row.insertCell(4);
    insererLiensLigne(song, cellLiens);

    let cellAnime = row.insertCell(5);
    let anime = await getAnime(song.anime_id);
    let image = document.createElement("img");
    if(isValidUrl(anime.img)){
        image.src = anime.img;
    }
    else{
        image.src = `http://localhost:5000/api/image/${anime.img}`;
    }
    image.style.width = "150px";
    cellAnime.append(image);

    // Insertion des boutons
    let { btnEdit, btnSuppr } = CreateButtonsDelEditSong(song);
    btnSuppr.classList.add("ms-2");
    let cellBtn = row.insertCell(6);
    let div = document.createElement('div');
    div.append(btnEdit, btnSuppr)
    div.classList.add('d-flex');
    cellBtn.append(div);

    return row;
}

function insererLiensLigne(song, cellLiens) {
    let lienYoutube = document.createElement("p");
    lienYoutube.append("https://www.youtube.com/watch?v=" + song.ytb_url);
    let lienSpotify = document.createElement("p");
    lienSpotify.append(song.spoty_url);
    cellLiens.appendChild(lienYoutube);
    cellLiens.appendChild(lienSpotify);
}

async function creerOptionsAnimes() {
    let animes = await getAnimes(limit = 100); //recuperer tous les animes
    let select = document.getElementById("song-post-animes");
    select.innerHTML=""; //clear le select si les options ont deja ete ajoutes avant

    //creation des options des animes
    for (const anime of animes) {
        let opt = document.createElement('option');
            opt.value = anime.id;
            opt.innerHTML = anime.name;
            select.appendChild(opt);
    }
}

/**
 * Crée les boutons d'édition et de suppression des chansons
 * @param {Song} song la chanson de la ligne dans le tableau
 * @returns { HTMLButtonElement } {btnEdit, btnSuppr} les deux boutons
 */
 const CreateButtonsDelEditSong = (song) => {
    // Insertion du bouton d'édition
    let btnEdit = document.createElement('button');
    btnEdit.innerHTML = '<i class="fa fa-bars"></i>';
    btnEdit.type = "button";
    btnEdit.classList.add("btn", "btn-secondary");
    btnEdit.id = song.id;
    btnEdit.setAttribute('data-bs-toggle', "modal");
    btnEdit.setAttribute('data-bs-target', "#songEditionModal");
    btnEdit.onclick = function () {
        fillSongEditModal(this);
    };
    // Insertion du bouton de suppression
    let btnSuppr = document.createElement('button');
    btnSuppr.innerHTML = '<i class="fa fa-trash"></i>';
    btnSuppr.classList.add("btn", "btn-secondary");
    btnSuppr.id = song.id;
    btnSuppr.setAttribute('data-bs-toggle', "modal");
    btnSuppr.setAttribute('data-bs-target', "#songSupprimerModal");
    btnSuppr.onclick = function () {
        fillSongDeleteModal(this);
    };
    return { btnEdit, btnSuppr };
}



(async () => {
    console.log('Lancement script : Fonctions Songs');
})()