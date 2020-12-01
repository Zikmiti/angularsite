import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Categorie } from '../Categorie';

@Component({
  selector: 'app-cat-form',
  templateUrl: './cat-form.component.html',
  styleUrls: ['./cat-form.component.css']
})


@Injectable()
export class CatFormComponent implements OnInit {
  public categories = JSON.parse(sessionStorage.getItem('Categories'));
  public libelle: string;

  constructor(private Httpclient: HttpClient) { }

  ngOnInit(): void {

    this.categories = JSON.parse(sessionStorage.getItem('Categories'));

  }

  AddCategorie(): void {
    let categorie = new Categorie(null, this.libelle);



    this.Httpclient
      .post('https://127.0.0.1:8000/api/categories', categorie)
      .subscribe(
        (response: Categorie) => {

          categorie.id = response.id;
          this.categories.push(categorie);
          sessionStorage.setItem('Categories', JSON.stringify(this.categories));

        },
        (error) => {
          console.error(error);
        }
      );
  }

  deleteCategorie(i): void {
    let url = 'https://127.0.0.1:8000/api/categories/' + this.categories[i].id;
    this.Httpclient
      .delete(url)
      .subscribe(
        (response) => {
          // console.log(response);
          this.categories.splice(i, 1);
          sessionStorage.setItem('Categories', JSON.stringify(this.categories));
          location.reload();
        },
        (error) => {
          console.error(error);
          // this.categories.splice(i, 1);
          // sessionStorage.setItem('Categories', JSON.stringify(this.categories));
          // location.reload();
        }
      );
  }




}
