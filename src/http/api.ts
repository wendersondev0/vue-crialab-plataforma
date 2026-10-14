import type { Sessao } from '~/types/loja'

export class ApiErro extends Error {
  status: number

  constructor(mensagem: string, status: number) {
    super(mensagem)
    this.status = status
  }
}

export async function api<T>(caminho: string, opcoes: { method?: string; body?: unknown; autenticado?: boolean } = {}): Promise<T> {
  const config = useRuntimeConfig()
  const sessao = useSessaoStore()
  sessao.restaurar()
  if (opcoes.autenticado && sessao.acesso && sessao.expirado() && sessao.refreshToken)
    await renovar(sessao)

  try {
    return await $fetch<T>(`${config.public.apiUrl}${caminho}`, {
      method: (opcoes.method || 'GET') as 'GET',
      body: opcoes.body as Record<string, unknown> | undefined,
      headers: opcoes.autenticado && sessao.acesso ? { Authorization: `Bearer ${sessao.acesso}` } : undefined,
    })
  }
  catch (erro) {
    const falha = erro as { statusCode?: number; data?: { title?: string } }
    throw new ApiErro(falha.data?.title || 'Não foi possível concluir a operação.', falha.statusCode || 500)
  }
}

async function renovar(sessao: ReturnType<typeof useSessaoStore>) {
  const config = useRuntimeConfig()
  try {
    const nova = await $fetch<Sessao>(`${config.public.apiUrl}/v1/auth/atualizar`, {
      method: 'POST',
      body: { refreshToken: sessao.refreshToken },
    })
    sessao.gravar(nova)
  }
  catch {
    sessao.sair()
  }
}
