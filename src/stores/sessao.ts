import { defineStore } from 'pinia'
import type { Sessao, Usuario } from '~/types/loja'

const chave = 'crialab-sessao'

type Estado = {
  acesso: string
  acessoExpiraEm: string
  refreshToken: string
  usuario: Usuario | null
}

export const useSessaoStore = defineStore('sessao', {
  state: (): Estado => ({
    acesso: '',
    acessoExpiraEm: '',
    refreshToken: '',
    usuario: null,
  }),
  actions: {
    restaurar() {
      if (!import.meta.client || this.acesso)
        return
      const bruto = localStorage.getItem(chave)
      if (!bruto)
        return
      const dados = JSON.parse(bruto) as Estado
      this.acesso = dados.acesso
      this.acessoExpiraEm = dados.acessoExpiraEm
      this.refreshToken = dados.refreshToken
      this.usuario = dados.usuario
    },
    gravar(sessao: Sessao) {
      this.acesso = sessao.acesso
      this.acessoExpiraEm = sessao.acessoExpiraEm
      this.refreshToken = sessao.refreshToken
      this.usuario = sessao.usuario
      if (import.meta.client)
        localStorage.setItem(chave, JSON.stringify(this.$state))
    },
    definirUsuario(usuario: Usuario) {
      this.usuario = usuario
      if (import.meta.client && this.acesso)
        localStorage.setItem(chave, JSON.stringify(this.$state))
    },
    expirado() {
      if (!this.acessoExpiraEm)
        return true
      return new Date(this.acessoExpiraEm).getTime() - 15000 < Date.now()
    },
    sair() {
      this.acesso = ''
      this.acessoExpiraEm = ''
      this.refreshToken = ''
      this.usuario = null
      if (import.meta.client)
        localStorage.removeItem(chave)
    },
  },
})
