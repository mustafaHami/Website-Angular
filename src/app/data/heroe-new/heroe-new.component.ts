import { Component, OnInit } from '@angular/core';
import {HeroService} from "../service/hero.service";
import {Hero} from "../class/hero";
import Swal from 'sweetalert2';
import {first} from "rxjs";
import {ImageUpload} from "../abstract/ImageUpload";
import {set} from "@angular/fire/database";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {connectStorageEmulator} from "@angular/fire/storage";
import {ArmeService} from "../service/arme.service";
import {Arme} from "../class/arme";


@Component({
  selector: 'app-heroe-new',
  templateUrl: './heroe-new.component.html',
  styleUrls: ['./heroe-new.component.css']
})
export class HeroeNewComponent extends ImageUpload implements OnInit  {
  name: string = "";
  pointVie : number = 1;
  attaque : number = 1;
  esquive : number = 1;
  degat : number = 1 ;
  totalPoints : number = 40;
  newHero : Hero = new Hero();
  heroes: Hero[] = [];
  imgSourceHero : string  = "";
  imgSourceArme : string  = "";
  imageListArmes : any = [];
  armes: Arme[] = [];
  idArme : string = "";
  constructor(private heroService:HeroService, storage: AngularFireStorage,private armeService:ArmeService) {
    super(storage)
  }

  ngOnInit(): void {
    this.totalPoints -= (this.pointVie + this.degat + this.esquive + this.attaque)
    // je récupère tous les images de heroes
    this.getImages("heroes/");
    this.getArmes();

  }
  // seul les armes déja créé s'afficheront
  getArmes(): void {
    this.armeService.getArmes()
      .subscribe(armes => this.armes = armes);
  }

  saveImageStorage(){
    let nameImg;
    this.isSelectPhoto =false;
    if(this.imageList.length){
      nameImg =  Math.max.apply(Math, this.imageList.map(function (o : any) { return Number(o.name); }));
      nameImg ++;
    }else{
      nameImg = 1;
    }
    this.uploadImage("heroes/", String(nameImg))
    this.imageUrl = undefined;
  }

  createHero(){

    if(this.name.trim() != "" && this.imgSourceHero != "" && this.imgSourceArme != ""){
      this.newHero.name = this.name;
      this.newHero.esquive = this.esquive;
      this.newHero.pointVie = this.pointVie;
      this.newHero.attaque = this.attaque;
      this.newHero.degats = this.degat;
      this.newHero.imgSource = this.imgSourceHero;
      this.newHero.idArme = this.idArme;
      this.heroService.getHeroes().pipe(first())
        .subscribe(hero =>{this.heroes = hero; this.verif();});
      this.successAlert("Hero ajouté !");
      return true;
    }else {
      this.errorAlert("Erreur : les Champs images ou le champ name vide");
      return false
    }
  }
  verif(){
    let existe = false;
    this.heroes.forEach(h => {
      if(h.name.toUpperCase() == this.newHero.name.toUpperCase()){
        existe = true;
      }
    });
    if(!existe){
      this.successAlert("Ajout d'un nouveau hero");
      this.heroService.addHero(this.newHero);
      this.initializeValeur();

    }else{
      this.errorAlert("Existe")
    }
  }
  initializeValeur(){
    this.name = "";
    this.attaque = 1;
    this.esquive = 1;
    this.degat = 1;
    this.pointVie = 1;
    this.totalPoints = 36
  }
  // je lui donne en paramètre le hero selectionné et la source de cette image
  // deux méthodes permet de modifier les images de container
  selectHeroImg(imgSourceSelectHero : string){
    // on met à jour l'image principale
    this.imgSourceHero = imgSourceSelectHero;
  }
  selectArmeImg(imgSourceSelectArme: string, idArme : string){
    this.imgSourceArme = imgSourceSelectArme;
    // dès qu'on sélectionne un image on mettre à jour l'id de l'arme selectionnée
    this.idArme = idArme;
  }

  add(nameValAjoute : string){
    this.getTotalPoints("+");
    switch (nameValAjoute) {
      case "attaque" :
        this.attaque += 1;
        break;
      case "esquive" :
        this.esquive += 1;
        break;
      case "pointVie" :
        this.pointVie += 1;
        break;
      case  "degat" :
        this.degat += 1;
        break;
    }
  }
  remove(nameValAjoute : string){
    this.getTotalPoints("-");
    switch (nameValAjoute) {
      case "attaque" :
        this.attaque -= 1;
        break;
      case "esquive" :
        this.esquive -= 1;
        break;
      case "pointVie" :
        this.pointVie -= 1;
        break;
      case  "degat" :
        this.degat -= 1;
        break;
    }
  }
  // guetteur permettant de calculer le totalPoint
  getTotalPoints(calcul : string) : void{
    switch (calcul) {
      case "+" :
        this.totalPoints -= 1;
        break;
      case "-" :
        this.totalPoints += 1;
        break;

    }
  }
}
