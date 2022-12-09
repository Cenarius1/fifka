import { BetPlayerOverviewModel, MatchesData, TopThreeTeamsModel } from './../data/matches-data';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'katar2022';
  matchesData: BetPlayerOverviewModel[] = [];
  topThreeData: TopThreeTeamsModel[] = [];

  constructor() {
    this.matchesData = MatchesData.MatchesData.sort((a, b) => a.Date < b.Date ? -1 : a.Date > b.Date ? 1 : 0);
    this.matchesData.reverse();
    this.topThreeData = MatchesData.TopThreeTeamsData;
  }
}