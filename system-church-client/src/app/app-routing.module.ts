import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MaskUtil } from './utils/mask-util';
import { CadastroMembroComponent } from './pages/membros/cadastro/cadastro-membro/cadastro-membro.component';
import { PesquisaDetalhadaMembroComponent } from './pages/membros/pesquisa/pesquisa-detalhada-membro/pesquisa-detalhada-membro.component';
import { PesquisaMembroComponent } from './pages/membros/pesquisa/pesquisa-membro/pesquisa-membro.component';
import { DetalharMembroComponent } from './pages/membros/detalhar-membro/detalhar-membro.component';
import { HomeComponent} from './pages/home/home.component';
import { PesquisaGcComponent } from './pages/gc/pesquisa/pesquisa-gc/pesquisa-gc.component';
import { PesquisaDetalhadaGcComponent } from './pages/gc/pesquisa/pesquisa-detalhada-gc/pesquisa-detalhada-gc.component';
import { CadastroGcComponent } from './pages/gc/cadastro/cadastro-gc/cadastro-gc.component';
import { DadosComponent } from './pages/gc/cadastro/dados/dados.component';

const routes: Routes = [
  // Padrão para telas com base no perfil
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cadastro-membro', component: CadastroMembroComponent},
  { path: 'pesquisa/pesquisa-membro', component: PesquisaMembroComponent},
  { path: 'pesquisa/pesquisa-membro-detalhada', component: PesquisaDetalhadaMembroComponent},
  { path: 'detalhar-membro/detalhar-membro', component: DetalharMembroComponent},
  { path: 'cadastro-gc', component: CadastroGcComponent},
  { path: 'pesquisa/pesquisa-gc', component: PesquisaGcComponent},
  { path: 'pesquisa/pesquisa-gc-detalhada', component: PesquisaDetalhadaGcComponent},
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
  providers: [MaskUtil]
})
export class AppRoutingModule {}
