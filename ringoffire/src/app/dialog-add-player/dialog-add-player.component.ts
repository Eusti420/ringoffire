import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms'; // FormsModule importieren
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-dialog-add-player',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule], 
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss'] 
})
export class DialogAddPlayerComponent {
  name: string = '';  // Eigenschaft "name" hinzufügen
  
  constructor(public dialog: MatDialog) { // MatDialog statt MatDialogModule

  }

  onNoClick(): void {
    this.dialog.closeAll();
  }

  
}
