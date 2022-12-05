import { MatchesData } from './../data/matches-data';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'katar2022';
  matchesData = MatchesData.MatchesData;

  constructor() {
  }
}


