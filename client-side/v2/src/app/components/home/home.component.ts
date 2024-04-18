import { Component, OnInit } from '@angular/core';
import { CardDto } from 'src/app/services/card.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  cardList: CardDto[] = [];
  constructor() { }

  ngOnInit(): void {
    this.cardList = [
      {
        id: 1,
        title: "1",
        description: ["Ah boy/ girl, still single ah?", "------------------", "还是单身啊？"],
        flip: false
      },
      {
        id: 2,
        title: "2",
        description: ["Did you gain weight?", "------------------", "你好像肥了hor..."],
        flip: false
      },
      {
        id: 3,
        title: "3",
        description: ["What job you working as now? My son/ daughter is...", "------------------", "你好像肥了hor..."],
        flip: false
      },
      {
        id: 4,
        title: "4",
        description: ["Did you gain weight?", "------------------", "你好像肥了hor..."],
        flip: false
      },
      {
        id: 5,
        title: "5",
        description: ["Did you gain weight?", "------------------", "你好像肥了hor..."],
        flip: false
      },
      {
        id: 6,
        title: "6",
        description: ["Did you gain weight?", "------------------", "你好像肥了hor..."],
        flip: false
      }
    ]
  }

  editList() {
    console.log("Edit List")
  }
}
