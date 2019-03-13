import { TemaAtuacao } from "./temaAtuacao";
import { DocenteTemaAtuacao } from "./docenteTemaAtuacao";
import { DocenteAtuacao } from './docenteAtuacao';

export class Docente {

    id: number;
    escola: number;
    tribunal: number;
    banco: number;
    nome: string;
    email: string;
    cpf: string;
    contato1: string;
    contato2: string;
    curriculoLattes: string;
    curriculoResumido: string;
    dataCriacao: Date;
    dataValidacao: Date;
    flagEstrangeiro: string;
    flagFigurarBanco: string;
    flagTipoConta: string;
    codigoAgencia: string;
    numeroConta: string;
    operacao: string;
    titulacao: string;
    categoriaProfissional: string;
    status: string;
    usuarioValidacao: string;
    fotoPerfil: File;

    docenteTemaAtuacaoList: Array<DocenteTemaAtuacao>;
    temaClassificacao: number;

    docenteAtuacaoList: Array<string>;
    docenteAtuacaoData: Date;
    docenteAtuacaoUsuario: string;
    docenteAtuacaoFlagAptidao: string;

    docenteAtuacao: DocenteAtuacao;
}
