import { Component, Input, OnInit } from '@angular/core';
import { CardDto } from 'src/app/services/card.service';
import { CharacterDTO } from 'src/app/services/character.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() character: CharacterDTO = new CharacterDTO();
  @Input() cardList: CardDto[] = [];

  selectedCard: CardDto = new CardDto();

  constructor() { }

  ngOnInit(): void {
  }

  cardClicked(card: CardDto) {
    card.flip = !card.flip;
    if (card.flip) {
      this.selectedCard = card;
    }
  }
}
