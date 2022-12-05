import { Component, OnInit, Input } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { BetPlayerInnerModel, BetPlayerOverviewModel } from 'src/data/matches-data';

export interface BetPlayerTable {
  name: string;
  position: number;
  prediction: string;
}

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  @Input() betPlayerOverview: any;
  displayedColumns: string[] = ['position', 'name', 'prediction'];
  constructor() {
  }

  ngOnInit(): void {
  }

  isStrictWin(element: BetPlayerInnerModel, index: number) {
    if (this.betPlayerOverview.TeamScore1 == -1 || this.betPlayerOverview.TeamScore2 == -1)
      return false;

    if (element.TeamBetScore1 == -1 || element.TeamBetScore2 == -1)
      return false;

    var result = element.TeamBetScore1 == this.betPlayerOverview.TeamScore1 && element.TeamBetScore2 == this.betPlayerOverview.TeamScore2;
    return result;
  }

  isPartialtWin(element: BetPlayerInnerModel, index: number) {
    if (this.betPlayerOverview.TeamScore1 == -1 || this.betPlayerOverview.TeamScore2 == -1)
      return false;

    if (element.TeamBetScore1 == -1 || element.TeamBetScore2 == -1)
      return false;

    let betType = -1;
    //1 first team won
    //2 first team won
    //0 draw
    if (element.TeamBetScore1 > element.TeamBetScore2)
      betType = 1;
    else if (element.TeamBetScore1 < element.TeamBetScore2)
      betType = 2;
    else
      betType = 0;

    let realScore = -1;
    //1 first team won
    //2 first team won
    //0 draw
    if (this.betPlayerOverview.TeamScore1 > this.betPlayerOverview.TeamScore2)
      realScore = 1;
    else if (this.betPlayerOverview.TeamScore1 < this.betPlayerOverview.TeamScore2)
      realScore = 2;
    else
      realScore = 0;

    return betType == realScore;
  }
}