import { HttpClient } from '@angular/common/http';
import { Categorie } from './Categorie';
import { Component, OnInit, Injectable } from '@angular/core';
import { Article } from './Article';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent implements OnInit {

  title = 'Mini-site';
  connect: boolean
  categories: Categorie[];
  articles: Article[];

  constructor(private Httpclient: HttpClient) { }

  ngOnInit(): void {

    if (sessionStorage.getItem('ConnectedUser') == "true") {
      this.connect = true;
    }

    if (sessionStorage.getItem('Categories') == null) {
      this.Httpclient
        .get<Categorie[]>('https://127.0.0.1:8000/api/categories')
        .subscribe(
          (reponse) => {
            this.categories = reponse['hydra:member'];
            sessionStorage.setItem('Categories', JSON.stringify(reponse['hydra:member']));
            // console.log(this.categories);

          },

          (error) => {
            console.error(error);
          }

        );
    }

    if (sessionStorage.getItem('Articles') == null) {

      this.Httpclient
        .get<Article[]>('https://127.0.0.1:8000/api/articles')
        .subscribe(
          (reponse) => {
            this.articles = reponse['hydra:member'];
            sessionStorage.setItem('Articles', JSON.stringify(reponse['hydra:member']));
            // console.log(this.articles);

          },

          (error) => {
            console.error(error);
          }

        );



    }
  }


  logout() {
    sessionStorage.removeItem("ConnectedUser");
    document.location.reload();
  }


}
