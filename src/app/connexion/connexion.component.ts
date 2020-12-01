import { Component, OnInit, Injectable } from '@angular/core';
import axios from 'axios';
import * as jQuery from 'jquery';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})

@Injectable()
export class ConnexionComponent implements OnInit {

  public login: string;
  public password: string;
  public auth: boolean;
  public message: string;

  constructor() { }

  ngOnInit(): void {

    if (sessionStorage.getItem('ConnectedUser') == "true") {
      this.auth = true;
      jQuery("app-connexion").css("position", "initial")
      jQuery("app-connexion").css("width", "100%")           //obligé de faire ça pour le format mobile 
    }
    else {

      jQuery("app-connexion").css("position", "fixed")
    }

  }


  Submitlogin(): void {

    let session_url = 'https://127.0.0.1:8000/login';
    let username = this.login;
    let password = this.password;

    axios(session_url, {
      method: "POST",
      withCredentials: false,  // <- important json_login sans credential
      data: {
        username,
        password
      },
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }).then(function (response) {
      sessionStorage.setItem('ConnectedUser', "true");        // <- pour garder en mémoire user 
      ConnexionComponent.prototype.auth = true;
      location.reload();
    }).catch(function (error) {
      ConnexionComponent.prototype.message = "Identifiant ou mot de passe invalide !";
    });




  }

}
