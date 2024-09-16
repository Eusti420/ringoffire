import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; // Hier den MatDialog-Service importieren
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { AppComponent } from '../app.component';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { addDoc } from '@angular/fire/firestore';





@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, MatDialogModule, GameInfoComponent, AppComponent],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'] // Korrektur: "styleUrl" zu "styleUrls"
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  game!: Game;
  currentCard: string = '';
  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>;


  constructor(public dialog: MatDialog) { 
    const aCollection = collection(this.firestore, 'games');
    this.items$ = collectionData(aCollection);
  }

  ngOnInit(): void {
    this.newGame();
    const gamesCollection = collection(this.firestore, 'games');
    
    // Korrekte Verwendung von `subscribe`
    collectionData(gamesCollection).subscribe((games) => {
      console.log('game update', games);
    });
  };

  newGame() {
    const gamesCollection = collection(this.firestore, 'games');

    this.game = new Game();
    addDoc(gamesCollection, this.game.toJson())
    .then(() => {
      console.log('Document successfully added!');
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });  
  };

  takeCard() {
    if (!this.pickCardAnimation) {
      this.pickCardAnimation = true;
      this.currentCard = this.game.stack.pop() ?? '';

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    
      setTimeout(() => {
        this.pickCardAnimation = false;
        this.game.playedCards.push(this.currentCard);
      }, 1000);
    }
  };

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent); 

    dialogRef.afterClosed().subscribe((name: string) => { 
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
}
