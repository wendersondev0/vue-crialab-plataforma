export default defineNuxtRouteMiddleware(() => {
  const sessao = useSessaoStore()
  if (import.meta.server)
    return
  sessao.restaurar()
  if (!sessao.acesso)
    return navigateTo('/conta/entrar')
})
