/**
 * Classe de l'Anime
 */
class Anime{
    /**
     * Constructeur de l'Anime
     *
     * @param {string} name le nom de l'Anime
     * @param {string} text la description de l'Anime
     * @param {string} img l'image de l'Anime (un url ou le nom du fichier)
     * @param {string} uri l'uri de l'anime
     * 
     */
    constructor(name, text, img, uri){
        this.name = name;
        this.text = text;
        this.img = img;
        this.uri = uri;
    }
}

/**
 * Classe de la chanson
 */
class Song{
    /**
     * Constructeur de la chanson
     *
     * @param {string} name le nom de la chanson
     * @param {string} relation type de la chanson (opening, ending etc)
     * @param {string} interpreter l'auteur
     * @param {string} ytb_url le lien youtube (embed)
     * @param {string} spoty_url le lien spotify (embed)
     * @param {Anime} anime l'anime auquel correspond la chanson
     * @param {string} uri l'uri de la chanson
     * 
     */

    constructor(name, relation, interpreter, ytb_url, spoty_url, anime, uri){
        this.name = name;
        this.relation = relation;
        this.interpreter = interpreter;
        this.ytb_url = ytb_url;
        this.spoty_url = spoty_url;
        this.anime = anime //de class Anime
        this.uri = uri;
    }
}