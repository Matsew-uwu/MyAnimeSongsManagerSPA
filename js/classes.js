class Anime{
    constructor(name, text, img, uri){
        this.name = name;
        this.text = text;
        this.img = img;
        this.uri = uri;
    }
}

class Song{
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