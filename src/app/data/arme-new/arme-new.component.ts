import { Component, OnInit } from '@angular/core';
import {ArmeService} from "../service/arme.service";
import {Arme} from "../class/arme";
import Swal from "sweetalert2";
import {first} from "rxjs";
import {ImageUpload} from "../abstract/ImageUpload";
import {Toast} from "../abstract/Toast";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-arme-new',
  templateUrl: './arme-new.component.html',
  styleUrls: ['./arme-new.component.css']
})
export class ArmeNewComponent extends ImageUpload implements OnInit {
  name: string = "";
  pointVie : number = 0;
  attaque : number = 0;
  esquive : number = 0;
  degat : number = 0;
  totalPoints : number = 0;
  newArme : Arme = new Arme();
  armes: Arme[] = [];
  valSelectArme : number = 1;
  imgSource : string = "";
  isDisabled : boolean = false;

  constructor(private armeService:ArmeService,storage: AngularFireStorage) {
    super(storage);
  }

  ngOnInit(): void {
    this.getImages("armes/");
  }

  createArme(){
    console.log(this.imgSource)
    if(this.name.trim() != "" && this.imgSource != ""){
      this.newArme.name = this.name;
      this.newArme.esquive = this.esquive;
      this.newArme.pointVie = this.pointVie;
      this.newArme.attaque = this.attaque;
      this.newArme.degats = this.degat;
      this.newArme.imgSource = this.imgSource;
      this.armeService.getArmes().pipe(first())
        .subscribe(arme =>{this.armes = arme; this.verif();});
      return true;
    }else {
      this.errorAlert("Erreur: champ image ou name vide")
      return false
    }
  }
  verif(){
    let existe = false;
    this.armes.forEach(a => {
      if(a.name.toUpperCase() == this.newArme.name.toUpperCase()){
        existe = true;
      }
    });
    if(!existe){
      this.successAlert("Ajout d'une nouvelle arme");
      this.armeService.addArme(this.newArme);
      this.initializeValeur();

    }else{
      this.errorAlert("Existe")
    }
  }
  initializeValeur(){
    this.name = "";
    this.attaque = 0;
    this.esquive = 0;
    this.degat = 0;
    this.pointVie = 0;
    this.totalPoints = 0;
  }
  selectArme(imgSourceSelect : string){
    // on met à jour l'image principale
    this.imgSource = imgSourceSelect;
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
  }
  add(nameValAjoute : string){
    this.getTotalPoints("+");
    switch (nameValAjoute) {
      case "attaque" :
        this.attaque += 1;
        if(this.attaque == 5 || this.totalPoints == 0){
          this.isDisabled = true;
        }
        this.isDisabled
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

