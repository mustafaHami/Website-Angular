import { Component, OnInit } from '@angular/core';
import {HeroService} from "../service/hero.service";
import {Hero} from "../class/hero";
import {Arme} from "../class/arme";
import {ArmeService} from "../service/arme.service";
import {first} from "rxjs";

@Component({
  selector: 'app-list-heroes',
  templateUrl: './list-heroes.component.html',
  styleUrls: ['./list-heroes.component.css']
})
export class ListHeroesComponent implements OnInit {
  heroes: Hero[] = [];
  saveTabHeroesArmes : Hero[] = []; // ce tableau va me permettre d'enregistrer les heroesArmes, pour que quand il fait une recherche,
                                // j'initialise le tableau HeroArme avec ce tableau et faire la recherche sur tous les heros et non sur les heros trièe car quand je trie je remplace le tableau heroarme.
          // plus de details dans la fonction recherche
  arme?:Arme;
  heroArme : any = [];
  armes: Arme[] = [];
  btnRadioSelect : string = ""; // btn radio sélectionner pour appliquer un style
  btnRadio : any = ['Attaque','Esquive','Dégât','Point de vie'];// un tableau pour l'affichage des boutons
  valInput = "";
  existePas : boolean = false;
  constructor(private heroService: HeroService,private armeService: ArmeService) { }

  ngOnInit(): void {
    this.getHeroes();
  }
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(hero =>{this.heroes = hero; this.getArmes();});
  }

  getArmes(): void {
    this.armeService.getArmes().pipe(first())
      .subscribe(armes => {this.armes = armes;this.getArmesHeroes();});
  }

  // on crée un tableau associatif pour récupérer l'arme correspondant a un hero
  getArmesHeroes(){
    this.heroArme = [];
    for (var hero of this.heroes) {
      for(var arme of this.armes){
        if(hero.idArme == arme.id){
          this.heroArme.push({hero : hero, arme : arme});
        }
      }
    }
    this.saveTabHeroesArmes = this.heroArme
  }
  affListChange(aff: string){
    this.btnRadioSelect = aff;
    switch (aff){
      case "Attaque" :
        this.heroArme.sort(function compare(a:any, b: any) {
          if (a.hero.attaque < b.hero.attaque)
            return 1;
          if (a.hero.attaque > b.hero.attaque )
            return -1;

          return 0;
        });
        break;
      case "Esquive" :
        this.heroArme.sort(function compare(a:any, b: any) {
          if (a.hero.esquive < b.hero.esquive)
            return 1;
          if (a.hero.esquive > b.hero.esquive )
            return -1;

          return 0;
        });
        break;
      case "Dégât" :
        this.heroArme.sort(function compare(a:any, b: any) {
          if (a.hero.degats < b.hero.degats)
            return 1;
          if (a.hero.degats > b.hero.degats )
            return -1;

          return 0;
        });
        break;
      case "Point de vie" :
        this.heroArme.sort(function compare(a:any, b: any) {
          if (a.hero.pointVie < b.hero.pointVie)
            return 1;
          if (a.hero.pointVie > b.hero.pointVie )
            return -1;

          return 0;
        });
        break;
      case "Tous" :
        this.getHeroes();
        this.valInput = "";
        this.btnRadioSelect = "";
        break;
    }
  }
  rechercheHero(event : any){
    this.valInput =  event.target.value.toLowerCase(); // je récupère la valeur du input
    this.existePas = false;
    var newTab = []; // je crée un nve tableau pour enregistrer les heros valide
    this.heroArme = this.saveTabHeroesArmes; // permet de trier sur tous les heros
    for (var i = 0; i < this.heroArme.length; i++) {
      if (this.heroArme[i].hero.name.toLowerCase().includes(this.valInput)) {
        newTab.push(this.heroArme[i]); // si le hero contient la valeur du input on enregistre dans le tableau
      }
      else {
       // on fait rien
      }
    }
    this.heroArme = newTab; // puis on redonne le nve tableau dans le tableau des heroes
    if(this.heroArme.length == 0 ){
      this.getHeroes()
      this.existePas = true;
    }else if (this.valInput == ""){
      this.getHeroes()
    }
    this.affListChange(this.btnRadioSelect);// pour quelle soit trièe toujours en fonction de ce qu'il à selectionnée
  }
}
