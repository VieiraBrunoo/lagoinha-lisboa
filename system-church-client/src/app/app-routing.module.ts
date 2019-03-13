import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MaskUtil } from './utils/mask-util';
import { CadastroMembroComponent } from './pages/membros/cadastro/cadastro-membro/cadastro-membro.component';
import { PesquisaDetalhadaMembroComponent } from './pages/membros/pesquisa/pesquisa-detalhada-membro/pesquisa-detalhada-membro.component';
import { PesquisaMembroComponent } from './pages/membros/pesquisa/pesquisa-membro/pesquisa-membro.component';
import { DetalharMembroComponent } from './pages/membros/detalhar-membro/detalhar-membro.component';
import { HomeComponent} from './pages/home/home.component';

const routes: Routes = [
  // Padrão para telas com base no perfil
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cadastro-membro', component: CadastroMembroComponent},
  { path: 'pesquisa/pesquisa-membro', component: PesquisaMembroComponent},
  { path: 'pesquisa/pesquisa-membro-detalhada', component: PesquisaDetalhadaMembroComponent},
  { path: 'detalhar-membro/detalhar-membro', component: DetalharMembroComponent},
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
  providers: [MaskUtil]
})
export class AppRoutingModule {}
