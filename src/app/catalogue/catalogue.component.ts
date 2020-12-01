import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Categorie } from '../Categorie';
import { Article } from '../Article';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})

@Injectable()
export class CatalogueComponent implements OnInit {
  public articles = JSON.parse(sessionStorage.getItem('Articles'));


  constructor(private Httpclient: HttpClient) {

  }

  ngOnInit(): void {





  }

}