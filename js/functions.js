/**
 * Récupère les animes et les ajoutes dans la table correspondante
 */
 const refreshTable = async () => {
    const animes = await getAnimes();
    let table = document.getElementById("table");
    table.innerHTML = "";

    for (const a of animes){
        let anime = new Anime(a.id, a.name, a.text, a.img, uri="");

        let row = table.insertRow(-1);
        row.id = "anime-"+anime.name;

        let cellId = row.insertCell(0);
        cellId.append(anime.id);
        cellId.disabled = true;

        let cellName = row.insertCell(1);
        cellName.append(anime.name);

        let cellText = row.insertCell(2);
        cellText.append(anime.text);

        let cellImg = row.insertCell(3);
        cellImg.append(anime.img);

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
        // Insertion du bouton de suppression
        let btnSuppr = document.createElement('button');
        btnSuppr.append('Supprimer');
        btnSuppr.id = anime.id;
        btnSuppr.setAttribute('data-bs-toggle', "modal");
        btnSuppr.setAttribute('data-bs-target', "#animeSupprimerModal");
        btnSuppr.onclick = function(){
            fillAnimeDeleteModal(this);
        };

        
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
    document.querySelector("#animeEditionModal #text").innerHTML = anime.text;
    document.querySelector("#animeEditionModal #anime-img").setAttribute("src", anime.img);
    console.log(anime.img)
}

/**
 * Fonction chargée de préremplir le popup de suppression
 */
 const fillAnimeDeleteModal = async (self) => {
    let anime = await getAnime(self.id);

    document.getElementById("anime-name2").innerHTML = anime.name;
    document.getElementById("anime-id2").innerHTML = self.id;

}

(async () => {
    console.log('Lancement scipt : Functions');
    refreshTable();
})()

