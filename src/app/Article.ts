import { Categorie } from './Categorie';

export class Article {

    id: number;
    nom: string;
    description: string;
    image: string;
    prix: string;
    categorie: Categorie[];

    constructor(id: number, nom: string, description: string, image: string, prix: string, categorie: Categorie[]) {
        this.id = id;
        this.nom = nom;
        this.description = description;
        this.prix = prix;
        this.image = image;
        this.categorie = categorie;
    }

}