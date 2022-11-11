import { Component, OnInit } from '@angular/core';
import {HeroService} from "../service/hero.service";
import {Arme} from "../class/arme";
import {first} from "rxjs";
import {ArmeService} from "../service/arme.service";
import {Hero} from "../class/hero";

@Component({
  selector: 'app-list-armes',
  templateUrl: './list-armes.component.html',
  styleUrls: ['./list-armes.component.css']
})
export class ListArmesComponent implements OnInit {
  btnRadioSelect : string = ""; // btn radio sélectionner pour appliquer un style
  btnRadio : any = ['Attaque','Esquive','Dégât','Point de vie'];// un tableau pour l'affichage des boutons
  valInput = "";
  existePas : boolean = false;
  armes: Arme[] = [];
  saveTabHeroesArmes : Arme[] = []; // ce tableau va me permettre d'enregistrer les armes, pour que quand il fait une recherche,
  // j'initialise le tableau armes avec ce tableau et faire la recherche sur tous les armes et non sur les armes trie car quand je trie je remplace le tableau armes.
  // plus de details dans la fonction recherche
  constructor(private armeService:ArmeService,) { }

  ngOnInit(): void {
    this.getArmes()
  }
  getArmes(): void {
    this.armeService.getArmes().pipe(first())
      .subscribe(armes => {this.armes = armes;this.saveTabHeroesArmes = this.armes;});
  }
  affListChange(aff: string){
    this.btnRadioSelect = aff;
    switch (aff){
      case "Attaque" :
        this.armes.sort(function compare(a:any, b: any) {
          if (a.attaque < b.attaque)
            return 1;
          if (a.attaque > b.attaque )
            return -1;

          return 0;
        });
        break;
      case "Esquive" :
        this.armes.sort(function compare(a:any, b: any) {
          if (a.esquive < b.esquive)
            return 1;
          if (a.esquive > b.esquive )
            return -1;

          return 0;
        });
        break;
      case "Dégât" :
        this.armes.sort(function compare(a:any, b: any) {
          if (a.degats < b.degats)
            return 1;
          if (a.degats > b.degats )
            return -1;

          return 0;
        });
        break;
      case "Point de vie" :
        this.armes.sort(function compare(a:any, b: any) {
          if (a.pointVie < b.pointVie)
            return 1;
          if (a.pointVie > b.pointVie )
            return -1;

          return 0;
        });
        break;
      case "Tous" :
        this.getArmes();
        this.valInput = "";
        this.btnRadioSelect = "";
        break;
    }
  }
  rechercheHero(event : any){
    this.valInput =  event.target.value.toLowerCase(); // je récupère la valeur du input
    this.existePas = false;
    var newTab = []; // je crée un nve tableau pour enregistrer les armes valide
    this.armes = this.saveTabHeroesArmes; // permet de trier sur tous les heros
    for (var i = 0; i < this.armes.length; i++) {
      if (this.armes[i].name.toLowerCase().includes(this.valInput)) {
        newTab.push(this.armes[i]); // si le hero contient la valeur du input on enregistre dans le tableau
      }
      else {
        // on fait rien
      }
    }
    this.armes = newTab; // puis on redonne le nve tableau dans le tableau des heroes
    if(this.armes.length == 0 ){
      this.getArmes()
      this.existePas = true;
    }else if (this.valInput == ""){
      this.getArmes()
    }
    this.affListChange(this.btnRadioSelect);// pour quelle soit trièe toujours en fonction de ce qu'il à selectionnée
  }
}
