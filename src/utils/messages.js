import { capitalize } from './functions'

export const MESSAGES = {
  ERRORS: {
    PARTNER: {
      CONNECTED: (name = 'usuário') =>
        `${capitalize(
          name
        )} já conectado. Deve desconectar de conexões terceiras para poder conecatar com outro usuário.`,
      NOT_FOUND: 'Usuario não encontrado',
      IM_ALONE: 'Você não es†á conecatdo com ninguem'
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
        `${capitalize(partnerName)} adicionado como parceiro(a)`,
      DISCONNECTED: 'Usuário desconectado com sucesso'
    },
    GENERIC: {
      TITLE: 'Operação realizada com sucesso!'
    },
    AUTH: {
      LOGIN: 'Login efetuado. Redirecionando...',
      REGISTER: 'Conta criada com sucesso. Redirecionando para login'
    },
    SERVICE: {
      RULEDELETED: 'Agenda deletada!',
      RULECREATED: 'Agenda criada!'
    }
  }
}

// 'Seu token expirou. Deslogue e logue novamente')
