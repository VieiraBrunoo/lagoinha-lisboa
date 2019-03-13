export class MaskUtil {
    static cepToMask(cep: string) {
  
      let mask;
      if (cep != null) {
        if (cep.length <= 8 ) {
        mask = cep.replace(/(.{5})/g, '$&' + '-');
        } else {
        mask = cep;
        }
      } else {
        mask = null;
      }
      return mask;
    }
  
    static maskToCep(mask: string) {
      let cep;
      if (mask != null) {
        cep = mask.replace(/-/gi, '');
      } else {
        cep = null;
      }
      return cep;
    }
  
    static telefoneToMask(telefone: string) {
      let mask;
      if (telefone != null && telefone.length === 11) {
        mask = '(' + telefone.substring(0, 2) + ') ' + telefone.substring(2, 7) + '-' + telefone.substring(7, telefone.length);
      } else if (telefone != null && telefone.length === 10) {
        mask = '(' + telefone.substring(0, 2) + ') ' + telefone.substring(2, 6) + '-' + telefone.substring(6, telefone.length);
      } else if (telefone != null && telefone.length > 11) {
        mask = telefone;
      } else if (telefone != null && telefone.length === 9) {
        mask = telefone.substring(0, 5) + '-' + telefone.substring(5, telefone.length);
      } else if (telefone != null && telefone.length === 8) {
        mask = telefone.substring(0, 4) + '-' + telefone.substring(4, telefone.length);
      } else {
        mask = null;
      }
      return mask;
    }
  
    static maskToTelefone(mask: string) {
      let telefone;
      if (mask != null) {
        telefone = mask.replace(/\(/gi, '').replace(/-/gi, '').replace(/\)/gi, '').replace(/\ /gi, '');
      } else {
        telefone = null;
      }
      return telefone;
    }
  
    static cpfToMask(cpf: string) {
      let mask;
      if (cpf != null && cpf.length != 0) {
        if (cpf.length <= 11) {
        mask = cpf.substring(0, 3) + '.' + cpf.substring(3, 6) + '.' + cpf.substring(6, 9) + cpf.substring(9, cpf.length);
        mask = mask.replace(/(.{11})/g, '$&' + '-');
        } else {
        mask = cpf;
        }
      } else {
        mask = null;
      }
      return mask;
    }
  
    static maskToCpf(mask: string) {
      let cpf;
      if (mask != null) {
        cpf = mask.replace(/\./gi, '');
        cpf = cpf.replace(/-/gi, '');
      } else {
        cpf = null;
      }
      return cpf;
    }
  
   static validar_cpf(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf == '') return false;
    if (cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999")
        return false;
    let add = 0;
    let i;
    for (i = 0; i < 9; i++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
        return false;
    add = 0;
    for (i = 0; i < 10; i++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
        return false;
    return true;
    }
    
  
    static validar_cnpj(cnpj) {
   
      cnpj = cnpj.replace(/[^\d]+/g, '');
   
      if (cnpj == '') return false;
   
      if (cnpj.length != 14)
          return false;
   
   
      if (cnpj == "00000000000000" ||
          cnpj == "11111111111111" ||
          cnpj == "22222222222222" ||
          cnpj == "33333333333333" ||
          cnpj == "44444444444444" ||
          cnpj == "55555555555555" ||
          cnpj == "66666666666666" ||
          cnpj == "77777777777777" ||
          cnpj == "88888888888888" ||
          cnpj == "99999999999999")
          return false;
   
   
      let tamanho = cnpj.length - 2
      let numeros = cnpj.substring(0, tamanho);
      let digitos = cnpj.substring(tamanho);
      let soma = 0;
      let pos = tamanho - 7;
      let i;
      for (i = tamanho; i >= 1; i--) {
          soma += numeros.charAt(tamanho - i) * pos--;
          if (pos < 2)
              pos = 9;
      }
      let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(0)) return false;
      tamanho = tamanho + 1;
      numeros = cnpj.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (i = tamanho; i >= 1; i--) {
          soma += numeros.charAt(tamanho - i) * pos--;
          if (pos < 2)
              pos = 9;
      }
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(1))
          return false;
   
      return true;
   
  }
  
  static cnpjToMask(cnpj: string) {
    let mask;
    if (cnpj != null && cnpj.length != 0) {
      if (cnpj.length <= 14) {
        mask = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"\$1.\$2.\$3\/\$4\-\$5");
      } else {
      mask = cnpj;
      }
    } else {
      mask = null;
    }
    return mask;
  }
  
  static maskToCnpj(mask: string) {
    let cnpj;
    if (mask != null) {
      cnpj = mask.replace(/\./gi, '');
      cnpj = cnpj.replace(/-/gi, '');
      cnpj = cnpj.replace(/\//gi, '');
    } else {
      cnpj = null;
    }
    return cnpj;
  }
  
  static contaToMask(conta: string) {
    let mask;
    if (conta != null && conta.length != 0) {
      if (conta.length <= 7) {
        mask = conta.substring(0, 7) + '-' + conta.substring(7, 8);
      } else {
        mask = conta;
      }
    } else {
      mask = null;
    }
    return mask;
  }
  
  }
  