import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import * as jQuery from 'jquery';
import { Article } from '../Article';
import { Categorie } from '../Categorie';
declare var $;

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  articles = JSON.parse(sessionStorage.getItem('Articles'));
  categories = JSON.parse(sessionStorage.getItem('Categories'));


  constructor(public Httpclient: HttpClient) {

    this.articles = JSON.parse(sessionStorage.getItem('Articles'));

    this.categories = JSON.parse(sessionStorage.getItem('Categories'));
    this.FormatCat();
  }


  FormatCat() {
    console.log(this.articles)

    this.articles.forEach(article => {
      var CategorieLibelles = [];

      article.categorie.forEach(Artcategorie => {

        this.categories.forEach(categorie => {

          if (Artcategorie == categorie["@id"]) {
            CategorieLibelles.push({ "libelle": categorie.libelle, "id": categorie.id });
          }

        });

      });

      article.categorie = CategorieLibelles;
    });
  }

  ngOnInit(): void {
    var categories = [];

  }

  initForm(): void {
    jQuery('#nom').val("");
    jQuery('#nom')[0].dispatchEvent(new Event("input", { bubbles: true }));

    jQuery('#description').val("");
    jQuery('#description')[0].dispatchEvent(new Event("input", { bubbles: true }));

    jQuery('#image').val("");
    jQuery('#image')[0].dispatchEvent(new Event("input", { bubbles: true }));

    jQuery('#identifiant').val("");
    jQuery('#identifiant')[0].dispatchEvent(new Event("input", { bubbles: true }));

    jQuery('#prix').val("");
    jQuery('#prix')[0].dispatchEvent(new Event("input", { bubbles: true }));
  }

  edit(id): void {


    jQuery('#nom').val(this.articles[id].nom);
    jQuery('#nom')[0].dispatchEvent(new Event("input", { bubbles: true }));  // Permet de déclancher l'event NgModel Avec le Val() de Jquery

    jQuery('#description').val(this.articles[id].description);
    jQuery('#description')[0].dispatchEvent(new Event("input", { bubbles: true }));

    jQuery('#image').val(this.articles[id].image);
    jQuery('#image')[0].dispatchEvent(new Event("input", { bubbles: true }));

    jQuery('#identifiant').val(this.articles[id].id);
    jQuery('#identifiant')[0].dispatchEvent(new Event("input", { bubbles: true }));


    jQuery('#prix').val(this.articles[id].prix);
    jQuery('#prix')[0].dispatchEvent(new Event("input", { bubbles: true }));


    var res = [];

    this.articles[id].categorie.forEach(cat => {
      res.push(cat.id);                 // Permet de activer les options du multi-select
    });

    console.log(res);
    jQuery("#categories").val(res);

  }


  delete(id): void {
    this.Httpclient
      .delete<any[]>('https://127.0.0.1:8000/api/articles/' + this.articles[id].id)
      .subscribe(
        (reponse) => {
          this.articles.splice(id, 1);
          console.log(JSON.stringify(this.articles[id]))
          sessionStorage.setItem('Articles', JSON.stringify(this.articles));
          this.FormatCat();                            //ICI le bug des categories session article catégorie dne ressemble pas à la meme chose apres suppression

        },

        (error) => {

          // console.log(JSON.stringify(this.articles))
          this.articles.splice(id, 1);
          sessionStorage.setItem('Articles', JSON.stringify(this.articles));
          this.FormatCat();
          console.error(error);
        }

      );
  }


}
