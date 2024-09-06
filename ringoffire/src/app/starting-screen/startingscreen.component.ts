import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-startingscreen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './startingscreen.component.html',
  styleUrl: './startingscreen.component.scss'
})


export class StartingscreenComponent {

  constructor(private router: Router) {

  }


  newGame() {
    this.router.navigateByUrl('/game');
  }
  

}


