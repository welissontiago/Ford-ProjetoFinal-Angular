import { AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map, catchError, of } from 'rxjs';

export class Validacoes {
  static ValidaCpf(controle: AbstractControl) {
    const cpf = controle.value;

    let soma: number = 0;
    let resto: number;
    let valido = true;

    const regex = new RegExp('^[0-9]{11}$');

    if (
      cpf == '00000000000' ||
      cpf == '11111111111' ||
      cpf == '22222222222' ||
      cpf == '33333333333' ||
      cpf == '44444444444' ||
      cpf == '55555555555' ||
      cpf == '66666666666' ||
      cpf == '77777777777' ||
      cpf == '88888888888' ||
      cpf == '99999999999' ||
      !regex.test(cpf)
    ) {
      valido = false;
    } else {
      for (let i = 1; i <= 9; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
      resto = (soma * 10) % 11;

      if (resto == 10 || resto == 11) resto = 0;
      if (resto != parseInt(cpf.substring(9, 10))) valido = false;

      soma = 0;
      for (let i = 1; i <= 10; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
      resto = (soma * 10) % 11;

      if (resto == 10 || resto == 11) resto = 0;
      if (resto != parseInt(cpf.substring(10, 11))) valido = false;
    }

    return valido ? null : { cpfInvalido: true };
  }

  static ValidaTelefone(controle: AbstractControl): ValidationErrors | null {
    const tel = controle.value;
    const exp = /^\(\d{2}\)\s?\d{4,5}-\d{4}$/;

    if (tel && !exp.test(tel)) {
      return { telefoneInvalido: true };
    }

    return null;
  }

  static cepExiste(http: HttpClient) {
    return (controle: AbstractControl) => {
      const cep = controle.value?.replace(/\D/g, '');

      if (!cep || cep.length !== 8) {
        return of({ cepInvalido: true });
      }

      return http.get<any>(`https://viacep.com.br/ws/${cep}/json/`).pipe(
        map((res) => {
          if (res.erro) {
            return { cepNaoEncontrado: true };
          }
          return null;
        }),
        catchError(() => of({ cepErroConsulta: true }))
      );
    };
  }
}
