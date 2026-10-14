export type LojaPublica = {
  id: string
  nome: string
  slug: string
  descricao: string
  logo: string
  capa: string
  cnpj: string
  telefone: string
  whatsapp: string
  email: string
  seloOficial: boolean
  plano: string
  redes: { rede: string; url: string }[]
}

export type Usuario = {
  id: string
  nome: string
  email: string
  emailConfirmado: boolean
  papeis: string[]
  lojaId: string | null
}

export type Sessao = {
  usuario: Usuario
  acesso: string
  acessoExpiraEm: string
  refreshToken: string
  refreshExpiraEm: string
}

export type Permissoes = {
  pedidos: boolean
  estoque: boolean
  orcamento: boolean
  financeiro: boolean
  patrimonio: boolean
}

export type MinhaLoja = {
  id: string
  nome: string
  slug: string
  plano: string
  planoCodigo: string
  mensalidade: number
  podePublicar: boolean
  podeVenderArquivo: boolean
  dono: boolean
  permissoes: Permissoes
  faturas: { id: string; competencia: string; valor: number; status: string }[]
  convites: { id: string; email: string; aceito: boolean; permissoes: Permissoes }[]
}

export type ConfiguracaoPlataforma = {
  taxaVendaPercentual: number
  limiarFreteGratis: number
  descontoAVistaPercentual: number
  tetoFaturamentoDispensaMensalidade: number
  mensalidadeAtelie: number
  mensalidadeLoja: number
}
