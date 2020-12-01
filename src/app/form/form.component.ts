import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import * as jQuery from 'jquery';
import { Article } from '../Article';
import { Categorie } from '../Categorie';
import { Session } from 'protractor';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})


@Injectable()
export class FormComponent implements OnInit {

  public categories = JSON.parse(sessionStorage.getItem('Categories'));
  public articles = JSON.parse(sessionStorage.getItem('Articles'));



  public id: number;
  public nom: string;
  public description: string;
  public image: string;
  public prix: string;
  public currentArticle: Article;
  public Activecategories: Categorie[];

  constructor(private Httpclient: HttpClient) {



  }

  ngOnInit(): void {

    // this.categories = JSON.parse(sessionStorage.getItem('Categories'));
    // this.articles = JSON.parse(sessionStorage.getItem('Articles'));

  }

  post(object: Article): void {

    // console.log(object)

    object.id = null;

    this.Httpclient
      .post('https://127.0.0.1:8000/api/articles', object)
      .subscribe(
        (reponse) => {
          this.Httpclient
            .get<Article[]>('https://127.0.0.1:8000/api/articles')
            .subscribe(
              (response) => {
                this.categories = response['hydra:member'];
                sessionStorage.setItem('Articles', JSON.stringify(response['hydra:member']));
                location.reload();
              },
              (error) => {
                console.error(error);
              }
            );
        },
        (error) => {
          console.error(error);
        }
      );
  }



  put(object: Article): void {
    console.log('put')
    this.Httpclient
      .put('https://127.0.0.1:8000/api/articles/' + object.id, object)
      .subscribe(
        (response) => {

          this.articles.forEach(element => {
            // console.log(element) 
            if (element.id == object.id) {
              this.articles.splice(this.articles.indexOf(element), 1);
            }
          });

          this.articles.unshift(object);
          sessionStorage.setItem('Articles', JSON.stringify(this.articles));

          location.reload();
        },
        (error) => {
          console.error(error);
        }
      );
  }


  valid(): void {

    // console.log(this.id);
    // console.log(this.description);
    // console.log(this.nom);
    // console.log(this.prix);
    // console.log(this.image);
    this.Activecategories = jQuery("#categories").val();

    var catIRI = [];

    this.Activecategories.forEach(cat => {
      catIRI.push(`/api/categories/${cat}`)
    });

    var articleEdit = new Article(this.id, this.nom, this.description, this.image, this.prix, catIRI);

    console.log(this.id);

    if (JSON.stringify(this.id) != JSON.stringify("")) {
      this.put(articleEdit);
    }
    else {
      this.post(articleEdit);
    }
  }

}
