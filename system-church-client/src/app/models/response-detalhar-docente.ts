import { Acao } from "./acao";
import { Capacitacao } from "./siec/capacitacao";

export class ResponseDetalharDocente {

    nome:string;
    imgDocente:string;
    titulacao:string;
    tribunal:string;
    email:string;
    atuacao:string[];
    escolaAtuacao:string;
    curriculoLates:string;
    curriculoResumido:string;
    areaAtuacao:string[];
    cursoDocente:Array<Capacitacao>;
    cursoComoAluno:Array<Acao>;
    formador:Array<Capacitacao>;
    cpf:string;

}
