import { Routes } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { HomeComponent } from './main-content/home/home.component';
import { RoomsComponent } from './main-content/rooms/rooms.component';
import { LablesComponent } from './main-content/lables/lables.component';
import { SettingsComponent } from './main-content/settings/settings.component';

export const routes: Routes = [
    {
        path: '',
        component: MainContentComponent,
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: 'home',
                component: HomeComponent
            },            
            {
                path: 'rooms',
                component: RoomsComponent
            },
            {
                path: 'lables',
                component: LablesComponent
            },
            {
                path: 'settings',
                component: SettingsComponent
            },
        ]
    }
];
