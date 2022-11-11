import { Component, OnInit } from '@angular/core';
import {Hero} from "../class/hero";
import {Arme} from "../class/arme";
import {ArmeService} from "../service/arme.service";
import {HeroService} from "../service/hero.service";
import Swal from "sweetalert2";
import {Toast} from "../abstract/Toast";

@Component({
  selector: 'app-armes',
  templateUrl: './armes.component.html',
  styleUrls: ['./armes.component.css']
})
export class ArmesComponent extends Toast implements OnInit {
  armes: Arme[] = [];
  page : number = 1;
  heroes : Hero[] = [];
  constructor(private armeService:ArmeService,private heroService:HeroService) { super()}

  ngOnInit(): void {
    this.getArmes();

  }

  getArmes(): void {
    this.armeService.getArmes()
      .subscribe(armes => {this.armes = armes;this.getHeroes()});
  }
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(hero =>this.heroes = hero);
  }

  deleteArme(armeDelete : Arme){
    var existe = false;
    for (var hero of this.heroes) {
      if(hero.idArme == armeDelete.id){
        existe = true;
      }
    }
    if(existe){
      this.errorAlert("Suppression Impossible car il y a un ou plusieurs Hero associé à l'arme !")
    }else{
      this.armeService.deleteArme(armeDelete)
    }

  }
  toast(arme : Arme){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Voulez vous supprimer l arme '+ arme.name.bold() + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Supprimé!',
          'L arme '+arme.name.bold()  +' a été supprimé.',
          'success'
        )
        this.deleteArme(arme)
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Annulé',
          '' +
          'Suppression de l arme '+ arme.name.bold() +' annulé.',
          'error'
        )

      }
    })
  }
}
