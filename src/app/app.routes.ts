import { Routes } from '@angular/router';
// Importação dos Guardas do Firebase para proteção
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

// Funções de proteção
// Se não estiver logado, manda para o Login
const redirecionarParaLogin = () => redirectUnauthorizedTo(['/login']);
// Se JÁ estiver logado, manda para a Home (evita entrar no login de novo)
const redirecionarParaHome = () => redirectLoggedInTo(['/home']);

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage),
    ...canActivate(redirecionarParaHome)
  },
  {
    path: 'cadastro',
    loadComponent: () => import('./pages/cadastro/cadastro.page').then( m => m.CadastroPage),
    ...canActivate(redirecionarParaHome)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    ...canActivate(redirecionarParaLogin)
  },
  {
    path: 'perfil',
    loadComponent: () => import('./pages/perfil/perfil.page').then( m => m.PerfilPage),
    ...canActivate(redirecionarParaLogin)
  },
  {
    path: 'evolucao',
    loadComponent: () => import('./pages/evolucao/evolucao.page').then( m => m.EvolucaoPage),
    ...canActivate(redirecionarParaLogin)
  },
  {
    // Nova Rota da Dieta
    path: 'dieta',
    loadComponent: () => import('./pages/dieta/dieta.page').then( m => m.DietaPage),
    ...canActivate(redirecionarParaLogin)
  },
  {
    path: 'treino-detalhe/:tipo/:biotipo',
    loadComponent: () => import('./pages/treino-detalhe/treino-detalhe.page').then( m => m.TreinoDetalhePage),
    ...canActivate(redirecionarParaLogin)
  },
  {
    path: 'calculadora',
    loadComponent: () => import('./pages/calculadora/calculadora.page').then( m => m.CalculadoraPage)
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin.page').then( m => m.AdminPage)
  },
  {
    // Rota para detalhes do usuário (admin)
    // O ":id" é o parâmetro dinâmico que passamos na URL
    path: 'admin/usuario-detalhe/:id',
    loadComponent: () => import('./pages/admin/usuario-detalhe/usuario-detalhe.page').then( m => m.UsuarioDetalhePage)
  },
];