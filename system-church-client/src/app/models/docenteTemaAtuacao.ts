import { TemaAtuacao } from './temaAtuacao';
import { Docente } from "./docente";


export class DocenteTemaAtuacao {
    id: number;
    idTemaAtuacao: number;
    idTemaClassificacao: number;
    docente: Docente;
    temaAtuacao: TemaAtuacao;

}