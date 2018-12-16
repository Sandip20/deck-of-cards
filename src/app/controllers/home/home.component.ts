import { AuthService } from './../../services/auth.service';
import { CardserviceService } from '../../services/card.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  droppedItems = [];
  spades = [];
  hearts = [];
  diamonds = [];
  clubs = [];
  deck = {
    cards: []
  }
  profileUrl;
  constructor(private cardService: CardserviceService, private authService: AuthService) {
    this.getUserActivity();

  }

  ngOnInit() {
    this.authService.getProfile(localStorage.getItem('username')).subscribe(res => {
      this.profileUrl = res.profileUrl;
    },
      err => {
        console.log(err);
      })
  }

  reset() {
    this.deck.cards = [];
    this.cardService.getCards(localStorage.getItem('username')).subscribe((res) => {
      console.log(res);
      this.deck.cards = res;
      this.shuffle();
      this.spades = [];
      this.hearts = [];
      this.diamonds = [];
      this.clubs = [];

    },
      (err) => {
        console.log(err);
      })


  }
  randomInt(min, max): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  cut(cards) {
    if (!cards || !cards.length) {
      return {
        top: [],
        bottom: []
      };
    } else if (cards.length === 1) {
      return {
        top: [cards[0]],
        bottom: []
      };
    } else {

      var middle = Math.floor(cards.length / 2);
      var variance = this.randomInt(1, 5) - 6;
      middle += variance;
      middle = Math.max(middle, 1);
      return {
        top: cards.slice(0, middle),
        bottom: cards.slice(middle)
      };
    }
  }
  shuffle() {

    for (var i = 0; i < 20; i++) {
      
      var halves = this.cut(this.deck.cards);
      
      var pile = [];
      while (halves.top.length > 0 || halves.bottom.length > 0) {
        
        var take = this.randomInt(1, 5);
        
        pile = pile.concat(halves.top.splice(0, take));
        
        take = this.randomInt(1, 5);
        
        pile = pile.concat(halves.bottom.splice(0, take));
      }
      
      this.deck.cards = this.cutInPlace(pile);
    }
  }
  cutInPlace(pile) {
    var halves = this.cut(pile);
    return halves.bottom.concat(halves.top);
  }
  dragEnd(event) {
    console.log(event);
  }
  getIndex(name: String): number {
    let index = -1;
    this.deck.cards.indexOf(name);
    this.deck.cards.forEach((item, idx) => {
      if (name == item.displayName) {
        index = idx;
      }

    })

    return index;
  }
  onDItemDrop(e: any) {
    if (e.dragData.suit.name == 'Diamonds') {
      let index = this.getIndex(e.dragData.displayName);
      this.deck.cards.splice(index, 1);
      this.diamonds.push(e.dragData);
      this.updateUserActivity(e.dragData, 'diamonds');
    }
  }
  onHItemDrop(e: any) {
    if (e.dragData.suit.name == 'Hearts') {
      let index = this.getIndex(e.dragData.displayName);
      this.deck.cards.splice(index, 1);
      this.hearts.push(e.dragData);
      this.updateUserActivity(e.dragData, 'hearts');
    }
  }
  onCItemDrop(e: any) {
    if (e.dragData.suit.name == 'Clubs') {
      let index = this.getIndex(e.dragData.displayName);
      this.deck.cards.splice(index, 1);
      this.clubs.push(e.dragData);
      this.updateUserActivity(e.dragData, 'clubs');
    }
  }
  onSItemDrop(e: any) {
    if (e.dragData.suit.name == 'Spades') {
      let index = this.getIndex(e.dragData.displayName);
      this.deck.cards.splice(index, 1);
      this.spades.push(e.dragData);
      this.updateUserActivity(e.dragData, 'spades');
    }
  }
  
  updateUserActivity(data: String, type: String) {
    
    this.cardService.updateActivity(data, localStorage.getItem('username'), type).subscribe((res) => {
      console.log(res);

    },
      (err) => {
        console.log(err);
      });
  }
  getUserActivity() {
    this.cardService.getUserActivity(localStorage.getItem('username')).subscribe((res) => {
      this.spades = res.rSpades;
      this.clubs = res.rClubs;
      this.hearts = res.rHearts;
      this.diamonds = res.rDiamonds;
      this.deck.cards = res.ritems;
      this.shuffle();
    },
      (err) => {
        console.log(err);
      }
    )
  }
}
