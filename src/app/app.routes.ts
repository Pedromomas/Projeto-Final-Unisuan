import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome', // <--- ISSO AQUI TIRA A TELA PRETA
    pathMatch: 'full',
  },
  {
    path: 'welcome',
    loadComponent: () => import('./pages/welcome/welcome.page').then( m => m.WelcomePage)
  },
  {
    path: 'imc',
    loadComponent: () => import('./pages/imc/imc.page').then( m => m.ImcPage)
  },
  {
    path: 'treino',
    loadComponent: () => import('./pages/treino/treino.page').then( m => m.TreinoPage)
  },
  {
    path: 'dieta',
    loadComponent: () => import('./pages/dieta/dieta.page').then( m => m.DietaPage)
  },
];