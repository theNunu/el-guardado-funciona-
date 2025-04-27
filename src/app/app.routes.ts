import { Routes } from '@angular/router';
import { ChampionComponent } from './component/champion/champion.component';
import { MomoComponent } from './component/momo/momo.component';

export const routes: Routes = [


    {
        path: 'momo', component: MomoComponent
    },
    {
        path: '', component:ChampionComponent
    },
    

];
