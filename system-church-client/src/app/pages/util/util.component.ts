export class Util{

    formatarCpf(cpf: string): string{
        if(cpf == null || cpf == undefined || cpf == ''){
            return cpf;
        }
        return cpf.substring(0, 3) + "." + cpf.substring(3, 6) + "." + cpf.substring(6, 9) + "-" + cpf.substring(9, 12);
    }

    formatarTelefone(telefone: string): string{
        if(telefone == null || telefone == undefined || telefone == ''){
            return telefone;
        }
        return "(" + telefone.substring(0, 2) + ") " + telefone.substring(2, 7) + "-" + telefone.substring(7, 11);
    }

}