import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeroDetailComponent } from './data/hero-detail/hero-detail.component';
import { HeroesComponent } from './data/heroes/heroes.component';
import { MessagesComponent } from './data/messages/messages.component';

import { AppRoutingModule } from './app-routing.module';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { HeroeNewComponent } from './data/heroe-new/heroe-new.component';
import { ArmesComponent } from './data/armes/armes.component';
import { ArmeNewComponent } from './data/arme-new/arme-new.component';
import { ArmeDetailComponent } from './data/arme-detail/arme-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListHeroesComponent } from './data/list-heroes/list-heroes.component';
import {NgxPaginationModule} from "ngx-pagination";
import { ListArmesComponent } from './data/list-armes/list-armes.component';
import {MatSliderModule} from "@angular/material/slider";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    MatSliderModule,
  ],
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    HeroeNewComponent,
    ArmesComponent,
    ArmeNewComponent,
    ArmeDetailComponent,
    ListHeroesComponent,
    ListArmesComponent,
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
