import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; // Hier den MatDialog-Service importieren
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'] // Korrektur: "styleUrl" zu "styleUrls"
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  game!: Game;
  currentCard: string = '';

  constructor(public dialog: MatDialog) { // MatDialog statt MatDialogModule

  }

  ngOnInit(): void {
    this.newGame();
  };

  newGame() {
    this.game = new Game();
  };

  takeCard() {
    if (!this.pickCardAnimation) {
      this.pickCardAnimation = true;
      this.currentCard = this.game.stack.pop() ?? '';
      console.log('New card: ' + this.currentCard);
      console.log('game is', this.game);

      setTimeout(() => {
        this.pickCardAnimation = false;
        this.game.playedCards.push(this.currentCard);
      }, 1000);
    }
  };

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent); // Korrektur: Komma entfernt

    dialogRef.afterClosed().subscribe((result: any) => { // result-Typ explizit angeben
      console.log('The dialog was closed', result);
    });
  }
}
