import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../class/hero';
import { HeroService } from '../service/hero.service';
import Swal from "sweetalert2";
import {first} from "rxjs";
import {ImageUpload} from "../abstract/ImageUpload";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Arme} from "../class/arme";
import {ArmeService} from "../service/arme.service";


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent extends ImageUpload  implements OnInit {
  hero?:Hero;
  affErreur?:Boolean ;
  CONST_TOTALPOINT : number = 40
  totalPoints : number = 40;
  imgSourceHero : string  = "";
  imgSourceArme : string  = "";
  imageListArmes : any = [];
  armes: Arme[] = [];
  idArme : string = "";

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private armeService: ArmeService,
    private location: Location,storage: AngularFireStorage) {
    super(storage)
  }

  ngOnInit(): void {
    this.getHero();
    this.getImages("heroes/");
    this.getArmes();

  }

    getHero(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));

    this.heroService.getHero(id)
      .subscribe(hero =>{this.hero = hero; this.initTotalPoint();});
  }
  getArmes(): void {
    this.armeService.getArmes()
      .subscribe(armes => {this.armes = armes;  this.initTotalPointArme();});
  }
  private initTotalPoint() {
    if(this.hero != undefined){
      this.totalPoints = this.CONST_TOTALPOINT;
      this.totalPoints -= (this.hero?.esquive + this.hero?.pointVie + this.hero?.attaque + this.hero?.degats);
      this.idArme = this.hero.idArme;
      this.imgSourceHero = this.hero.imgSource
    }
  }
  // pour afficher l'image dès l'ouverture de la page détail
  initTotalPointArme(){
    for(var arme of this.armes){
      if(arme.id == this.idArme){
        this.imgSourceArme = arme.imgSource;
      }
    }
  }

  selectHeroImg(imgSourceSelectHero : string){
    this.imgSourceHero = imgSourceSelectHero
    // on met à jour l'image principale
    if(this.hero != undefined){
      this.hero.imgSource = imgSourceSelectHero;
    }
  }
  selectArmeImg(imgSourceSelectArme: string, idArme : string){
    this.imgSourceArme = imgSourceSelectArme;
    // dès qu'on sélectionne un image on mettre à jour l'id de l'arme selectionnée
    if(this.hero){
      this.hero.idArme = idArme;
    }
  }

  saveImageStorage(){
    let nameImg;
    this.isSelectPhoto = false;
    if(this.imageList.length){
      nameImg =  Math.max.apply(Math, this.imageList.map(function (o : any) { return Number(o.name); }));
      nameImg ++;
    }else{
      nameImg = 1;
    }
    this.uploadImage("heroes/", String(nameImg))
    this.imageUrl = undefined;
    let e;
    this.onSelectedFile(e)

  }

  goBack(): void {
    this.location.back();
  }
  add(nameValAjoute : string){
    if(this.hero != undefined){
      this.getTotalPoints("+");
      switch (nameValAjoute) {
        case "attaque" :
            this.hero.attaque += 1;
          break;
        case "esquive" :
          this.hero.esquive += 1;
          break;
        case "pointVie" :
          this.hero.pointVie += 1;
          break;
        case  "degat" :
          this.hero.degats += 1;
          break;
      }
    }

  }
  remove(nameValAjoute : string){
    if(this.hero != undefined){
      this.getTotalPoints("-");
      switch (nameValAjoute) {
        case "attaque" :
          this.hero.attaque -= 1;
          break;
        case "esquive" :
          this.hero.esquive -= 1;
          break;
        case "pointVie" :
          this.hero.pointVie -= 1;
          break;
        case  "degat" :
          this.hero.degats -= 1;
          break;
      }
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

  updateHero(hero : Hero) {
    if(this.hero){
      if(this.hero.name.trim() != "" && this.imgSourceHero != "" && this.imgSourceArme != ""){
        this.heroService.updateHero(hero)
        this.successAlert("Modification effectué")
      }else{
        this.errorAlert("Erreur :  image ou champ name vide !")
      }
    }

  }


}
