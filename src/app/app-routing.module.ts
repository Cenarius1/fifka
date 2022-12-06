import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BetPlayersComponent } from './bet-players/bet-players.component';

const routes: Routes = [
  { path: 'first-component', component: BetPlayersComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
