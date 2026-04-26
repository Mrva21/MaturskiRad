import { Routes } from '@angular/router';
import { Pocetna } from './components/pocetna/pocetna';
import { Igrice } from './components/igrice/igrice';
import { TopOcenjene } from './components/top-ocenjene/top-ocenjene';
import { Trending } from './components/trending/trending';
import { Diskusije } from './components/diskusije/diskusije';
import { Detalji } from './components/detalji/detalji';

export const routes: Routes = [
  {path:'', component:Pocetna},
  {path:'games', component:Igrice},
  {path:'top-rated', component:TopOcenjene},
  {path:'trending', component:Trending},
  {path:'discussions', component:Diskusije},
  {path:'game/:id', component:Detalji}
];
