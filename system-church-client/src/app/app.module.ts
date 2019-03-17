import { AcaoService } from './service/acao/acao.service';
import { SiecWsService } from './service/siec-ws/siec.ws.service';
import { TemaAtuacaoService } from './service/tema-atuacao/tema.atuacao.service';
import { DocenteService } from './service/docente/docente.service';
import { EscolaService } from './service/escola/escola.service';
import { TribunalService } from './service/tribunal/tribunal.service';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { forwardRef, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MatIconModule, MatPaginatorIntl, MatGridListModule, MatSlideToggleModule, MatNativeDateModule, MatDatepickerModule, MAT_DATE_LOCALE } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { ToasterModule } from 'angular2-toaster';
import 'hammerjs';
import { BlockUIModule } from 'ng-block-ui';
import { RecaptchaModule, RecaptchaSettings, RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import { ChartsModule } from 'ng2-charts';
import { NgxHmCarouselModule } from 'ngx-hm-carousel';
import { NgxMaskModule } from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/_guards';
import { AuthInterceptor } from './auth/_guards/auth.interceptor';
import { AuthModule } from './auth/_guards/auth.module';
import { IdentityStorage } from './auth/_models/identity.storage';
import { AuthenticationService } from './auth/_services';
import { BaseComponent } from './pages/base/base.component';
import { LoginComponent } from './pages/login/login.component';
import { MatPaginatorIntlGerman } from './pages/table-format-page/mat-paginator-int';
import { FooterComponent } from './pages/template/footer/footer.component';
import { HeaderComponent } from './pages/template/header/header.component';
import { PadraoService } from './service/padrao/padrao.service';
import { UsuarioService } from './service/usuario/usuario.service';
import { DadosPessoaisComponent } from './pages/membros/cadastro/dados-pessoais/dados-pessoais.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DadosGcComponent } from './pages/membros/cadastro/dados-gc/dados-gc.component';
import { DadosFamiliaresComponent } from './pages/membros/cadastro/dados-familiares/dados-familiares.component';
import { DadosBatimosComponent } from './pages/membros/cadastro/dados-batismo/dados-batismo.component';
import { ParametroService } from './service/parametro/parametro.service';
import { CadastroMembroComponent } from './pages/membros/cadastro/cadastro-membro/cadastro-membro.component';
import { TemaClassificacaoService } from './service/tema-classificacao/tema.classificacao.service';
import { PesquisaMembroComponent } from './pages/membros/pesquisa/pesquisa-membro/pesquisa-membro.component';
import { DocumentoService } from './service/documento/documento.service';
import { PesquisaDetalhadaMembroComponent } from './pages/membros/pesquisa/pesquisa-detalhada-membro/pesquisa-detalhada-membro.component';
import { DetalharMembroComponent } from './pages/membros/detalhar-membro/detalhar-membro.component';
import { MaterialModule } from './material.module';
import { BancoService } from './service/banco/banco.service';
const globalSettings: RecaptchaSettings = {siteKey: '6Lc8vGwUAAAAAOsheXbsSd7qKpwLv0t2ECF1i___'};
import { ImageCropperModule } from 'ngx-image-cropper';
import { FotoCropDialogComponent } from './pages/membros/cadastro/foto-crop-dialog/foto-crop-dialog.component';
import { MenuPrincipalComponent } from './pages/template/menu-principal/menu-principal.component';
import { HomeComponent } from './pages/home/home.component';
import { MembroService } from './service/membro/membro.service';
import { GcService } from './service/gc/gc.service';
import { PesquisaGcComponent } from './pages/gc/pesquisa/pesquisa-gc/pesquisa-gc.component';
import { PesquisaDetalhadaGcComponent } from './pages/gc/pesquisa/pesquisa-detalhada-gc/pesquisa-detalhada-gc.component';
import { CadastroGcComponent } from './pages/gc/cadastro/cadastro-gc/cadastro-gc.component';
import { DadosComponent } from './pages/gc/cadastro/dados/dados.component';






@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    BaseComponent,
    LoginComponent,
    DadosBatimosComponent,
    DadosPessoaisComponent,
    DadosGcComponent,
    DadosFamiliaresComponent,
    CadastroMembroComponent,
    PesquisaMembroComponent,
    PesquisaDetalhadaMembroComponent,
    DetalharMembroComponent,
    FotoCropDialogComponent,
    MenuPrincipalComponent,
    HomeComponent,
    CadastroGcComponent,
    DadosComponent,
    PesquisaDetalhadaGcComponent,
    PesquisaGcComponent
 ],
  imports: [
    MatSlideToggleModule,
    MatDialogModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    MatIconModule,
    BrowserModule,
    MaterialModule,
    FlexLayoutModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    NgxMaskModule.forRoot(),
    BlockUIModule.forRoot(),
    ToasterModule.forRoot(),
    AuthModule,
    ChartsModule,
    NgxHmCarouselModule,
    RecaptchaModule.forRoot(),
    ImageCropperModule
  ],

  providers: [
    AcaoService,
    BancoService,
    EscolaService,
    DocenteService,
    DocumentoService,
    ParametroService,
    TribunalService,
    PadraoService, 
    SiecWsService,
    IdentityStorage, 
    TemaAtuacaoService,
    TemaClassificacaoService,
    AuthGuard, 
    AuthenticationService,
    UsuarioService,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy } ,
    { provide: RECAPTCHA_SETTINGS, useValue: globalSettings, },
    { provide: MatPaginatorIntl, useClass: forwardRef(() => MatPaginatorIntlGerman), },
    LoginComponent,
    MembroService,
    GcService,
  ],
  entryComponents: [
    FotoCropDialogComponent
  ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
