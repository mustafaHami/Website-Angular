import { Component, OnInit } from '@angular/core';

import { Hero } from '../class/hero';
import { HeroService } from '../service/hero.service';
import {Arme} from "../class/arme";
import {ArmeService} from "../service/arme.service";
import {first} from "rxjs";
import Swal from "sweetalert2";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  page : number = 1;
  arme?:Arme;
  heroArme : any = [];
  armes: Arme[] = [];
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

  }
  deleteHero(hero : Hero) {
    this.heroService.deleteHero(hero)
  }
  toast(hero : Hero){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Voulez vous supprimer le Hero '+ hero.name.bold() + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Supprimé!',
          'Le Hero '+hero.name.bold()  +' a été supprimé.',
          'success'
        )
        this.deleteHero(hero)
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Annulé',
          '' +
          'Suppression du hero '+ hero.name.bold() +' annulé.',
          'error'
        )

      }
    })
  }
}
