import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { HttpClientModule } from "@angular/common/http";
import { CrudComponent } from './crud/crud.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormComponent } from './form/form.component';
import { CatFormComponent } from './cat-form/cat-form.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    CatalogueComponent,
    ConnexionComponent,
    CrudComponent,
    FormComponent,
    CatFormComponent
  ],
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {


}
export class AppBootstrapModule { }
