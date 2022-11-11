import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {Location} from "@angular/common";
import {ArmeService} from "../service/arme.service";
import {Hero} from "../class/hero";
import {Arme} from "../class/arme";
import Swal from "sweetalert2";
import {ImageUpload} from "../abstract/ImageUpload";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-arme-detail',
  templateUrl: './arme-detail.component.html',
  styleUrls: ['./arme-detail.component.css']
})
export class ArmeDetailComponent extends ImageUpload implements OnInit {
  arme: Arme | undefined;
  valSelectArme : number = 1;
  totalPoints : number = 0;
  valSelectHero : number = 1;
  constructor(
    private route: ActivatedRoute,
    private armeService: ArmeService,
    private location: Location, storage: AngularFireStorage) { super(storage)}

  ngOnInit(): void {
    this.getArme();
    this.getImages("armes/");
  }

  getArme(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));

    this.armeService.getArme(id)
      .subscribe(arme =>{this.arme = arme;this.initTotalPoint();});
  }
  selectArme(imgSourceSelect : string){
    // on met à jour l'image principale
    if(this.arme){
      this.arme.imgSource = imgSourceSelect;
    }
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
    this.uploadImage("armes/", String(nameImg))
    this.imageUrl = undefined;
    let e;
    this.onSelectedFile(e)
  }

  private initTotalPoint() {
    if(this.arme != undefined){
      this.totalPoints -= (this.arme?.esquive + this.arme?.pointVie + this.arme?.attaque + this.arme?.degats);
    }
  }
  add(nameValAjoute : string){
    if(this.arme != undefined){
      this.getTotalPoints("+");
      switch (nameValAjoute) {
        case "attaque" :
          this.arme.attaque += 1;
          break;
        case "esquive" :
          this.arme.esquive += 1;
          break;
        case "pointVie" :
          this.arme.pointVie += 1;
          break;
        case  "degat" :
          this.arme.degats += 1;
          break;
      }
    }

  }
  remove(nameValAjoute : string){
    if(this.arme != undefined){
      this.getTotalPoints("-");
      switch (nameValAjoute) {
        case "attaque" :
          this.arme.attaque -= 1;
          break;
        case "esquive" :
          this.arme.esquive -= 1;
          break;
        case "pointVie" :
          this.arme.pointVie -= 1;
          break;
        case  "degat" :
          this.arme.degats -= 1;
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

  updateArme(arme : Arme) {
    if (this.arme) {
      if (this.arme.name.trim() != "" && this.arme.imgSource != "") {
        this.armeService.updateArme(arme)
        this.successAlert("Armes modifié");
      } else {
        this.errorAlert("Erreur: champs images ou name vide")
      }
    }

  }

}

