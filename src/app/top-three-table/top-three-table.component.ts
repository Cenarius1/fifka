import { Component, OnInit, Input } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { BetPlayerInnerModel, BetPlayerOverviewModel,TopThreeTeamsModel} from 'src/data/matches-data';

@Component({
  selector: 'app-top-three-table',
  templateUrl: './top-three-table.component.html',
  styleUrls: ['./top-three-table.component.css']
})
export class TopThreeTableComponent implements OnInit {

  @Input() betPlayerOverview: any;
  displayedColumns: string[] = ['position', 'name', 'top1', 'top2', 'top3'];
  top1Team = "Argentina";
  top2Team = "France";
  top3Team = "Croatia";
  constructor() {
  }

  ngOnInit(): void {
  }

  is1rdPlace(element: string) {
    return element == this.top1Team;
  }

  is2rdPlace(element: string) {
    return element == this.top2Team;
  }

  is3rdPlace(element: string) {
    return element == this.top3Team;
  }
}