import { capitalize } from './functions'

export const MESSAGES = {
  ERRORS: {
    PARTNER: {
      CONNECTED:
        'Usuário já conectado. Peça a ele(a) que desconecte de seu parceiro',
      NOT_FOUND: 'Usuario não encontrado'
    },
    GENERIC: {
      TITLE: 'Ocorreu um erro!',
      CONTENT: 'Erro inesperado, tente novamente mais tarde.'
    },
    AUTH: {
      NOT_AUTHENTICATED: 'Seu token expirou. Deslogue e logue novamente',
      LOGIN: {
        FAIL_TITLE: 'Falha no login',
        FAIL: 'Usuário ou senha incorreto(s)',
        INVALID_EMAIL: 'Email inválido',
        EMPTY_PASSWORD: 'Por favor insira a senha'
      }
    }
  },
  SUCCESS: {
    PARTNER: {
      CONNECTED: partnerName =>
        `${capitalize(partnerName)} adicionado como parceiro(a)`
    },
    GENERIC: {
      TITLE: 'Operação realizada com sucesso!'
    },
    AUTH: {
      LOGIN: 'Login efetuado. Redirecionando...'
    },
    SERVICE: {
      RULEDELETED: 'Agenda deletada!',
      RULECREATED: 'Agenda criada!'
    }
  }
}

// 'Seu token expirou. Deslogue e logue novamente')
