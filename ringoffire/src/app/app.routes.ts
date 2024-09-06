import { Routes } from '@angular/router';
import { StartingscreenComponent } from './starting-screen/startingscreen.component';
import { GameComponent } from './game/game.component';

export const routes: Routes = [
    { path: '', component: StartingscreenComponent },
    { path: 'game', component: GameComponent }

];
