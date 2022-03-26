/**
 * Récupère les animes et les ajoutes dans la table correspondante
 */
 const refreshTable = async () => {
    const animes = await getAnimes();
    let table = document.getElementById("table");
    table.innerHTML = "";

    for (const a of animes){
        let anime = new Anime(a.id, a.name, a.text, a.img, uri="");

        let row = table.insertRow(0);
        row.id = "anime-"+anime.name;

        let cellId = row.insertCell(0);
        cellId.append(anime.id);
        cellId.disabled = true;

        let cellName = row.insertCell(1);
        cellName.append(anime.name);
        cellName.classList.add("text-truncate");
        cellName.style.maxWidth = "";

        let cellText = row.insertCell(2);
        cellText.append(anime.text);
        cellText.style.maxWidth = "400px";

        let cellImg = row.insertCell(3);
        cellImg.append(anime.img);
        cellImg.classList.add("text-truncate");
        cellImg.style.maxWidth = "250px";

        // Insertion des bouton d'édition - (EN COURS)
        let cellBtn = row.insertCell(4);
        let btnEdit = document.createElement('button');
        btnEdit.append('Éditer');
        btnEdit.type = "button";
        btnEdit.id = anime.id;
        btnEdit.setAttribute('data-bs-toggle', "modal");
        btnEdit.setAttribute('data-bs-target', "#animeEditionModal");
        btnEdit.onclick = function(){
            fillAnimeEditModal(this);
        };
        let btnSuppr = document.createElement('button');
        btnSuppr.append('Supprimer');
        btnSuppr.disabled = true;

        
        cellBtn.append(btnEdit, btnSuppr);
    }
    console.log('table refresh');
}

/**
 * Fonction chargée de préremplir le formulaire d'édition
 */
const fillAnimeEditModal = async (self) => {
    let anime = await getAnime(self.id);

    document.getElementById("anime-id").innerHTML = anime.id;
    document.querySelector("#animeEditionModal #name").value = anime.name;
    document.querySelector("#animeEditionModal #text").value = anime.text;
}


/**
 * Fonction chargée de notifier l'utilisateur de la validation de son action
 */
const onValid = () => {
    
    
}


(async () => {
    console.log('Lancement scipt : Functions');
    refreshTable();
})()