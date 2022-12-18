import { Component, Input, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { debug } from 'console';
import { BetPlayerInnerModel } from 'src/data/matches-data';
import { faCrown } from '@fortawesome/free-solid-svg-icons';

export interface BetPlayerTable {
  name: string;
  position: number;
  point: number;
}

@Component({
  selector: 'app-bet-players',
  templateUrl: './bet-players.component.html',
  styleUrls: ['./bet-players.component.css']
})
export class BetPlayersComponent implements OnInit {
  crownIcon = faCrown;
  @Input() betPlayerOverview: any;
  displayedColumns: string[] = ['position', 'name', 'point'];
  dataSource: BetPlayerTable[] = [
    { position: 1, name: 'Ba***',   point: 43 },
    { position: 2, name: 'Sa***',   point: 57+8 },//+8 Sa*** for betting 1st
    { position: 3, name: 'Bo***', point: 36 +3 },//+4 Bo*** for betting 3st
    { position: 4, name: 'Gl***',   point: 44 },
  { position: 5, name: 'Gr***',  point: 42 },
    { position: 6, name: 'Ve***',   point: 37 },
    { position: 7, name: 'Ga***', point: 41 },
    { position: 8, name: 'Ma***',  point: 35 },
  ]

  sortedData: BetPlayerTable[];
  constructor() {
    this.sortedData = this.dataSource.slice();
  }

  ngOnInit(): void {
    this.calculateResult();
    this.sortInitTable();
  }

  sortInitTable() {
    this.sortedData.sort((a, b) => {
      return compare(a.point, b.point, false);
    });
  }

  calculateResult(): void {
    for (let i = 0; i < this.betPlayerOverview.length; i++) {
      for (let j = 0; j < this.betPlayerOverview[i].BetPlayerInnerModel.length; j++) {
        let score1 = 0;
        if (this.isStrictWin(this.betPlayerOverview[i].BetPlayerInnerModel[j], i))
          score1 += 3;
        else if (this.isPartialtWin(this.betPlayerOverview[i].BetPlayerInnerModel[j], i))
          score1 += 1;

        this.dataSource[j].point += score1;
      }
    }

    this.sortedData = this.dataSource.slice();
  }

  isPartialtWin(element: BetPlayerInnerModel, index: number) {
    if (this.betPlayerOverview[index].TeamScore1 == -1 || this.betPlayerOverview[index].TeamScore2 == -1)
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
    if (this.betPlayerOverview[index].TeamScore1 > this.betPlayerOverview[index].TeamScore2)
      realScore = 1;
    else if (this.betPlayerOverview[index].TeamScore1 < this.betPlayerOverview[index].TeamScore2)
      realScore = 2;
    else
      realScore = 0;

    return betType == realScore;
  }

  isStrictWin(element: BetPlayerInnerModel, index: number) {
    if (this.betPlayerOverview[index].TeamScore1 == -1 || this.betPlayerOverview[index].TeamScore2 == -1)
      return false;

    if (element.TeamBetScore1 == -1 || element.TeamBetScore2 == -1)
      return false;

    var result = element.TeamBetScore1 == this.betPlayerOverview[index].TeamScore1
      && element.TeamBetScore2 == this.betPlayerOverview[index].TeamScore2;
    return result;
  }

  sortData(sort: Sort) {
    const data = this.dataSource.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'point':
          return compare(a.point, b.point, isAsc);
        case 'position':
          return compare(a.position, b.position, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
