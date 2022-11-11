import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './data/heroes/heroes.component';
import { HeroDetailComponent } from './data/hero-detail/hero-detail.component';
import {HeroeNewComponent} from "./data/heroe-new/heroe-new.component";
import {ArmeNewComponent} from "./data/arme-new/arme-new.component";
import {ArmesComponent} from "./data/armes/armes.component";
import {ArmeDetailComponent} from "./data/arme-detail/arme-detail.component";
import {ListHeroesComponent} from "./data/list-heroes/list-heroes.component";
import {ListArmesComponent} from "./data/list-armes/list-armes.component";

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'newHeroe', component: HeroeNewComponent},
  { path: '', redirectTo: '/heroes', pathMatch: 'full' },
  { path: 'detailHero/:id', component: HeroDetailComponent },
  { path: 'armes', component: ArmesComponent },
  { path: 'newArme', component: ArmeNewComponent },
  { path: 'detailArme/:id', component: ArmeDetailComponent },
  { path: 'listheroes', component: ListHeroesComponent},
  { path: 'listarmes', component: ListArmesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
