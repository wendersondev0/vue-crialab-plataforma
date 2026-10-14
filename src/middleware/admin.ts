export default defineNuxtRouteMiddleware(() => {
  const sessao = useSessaoStore()
  if (import.meta.server)
    return
  sessao.restaurar()
  if (!sessao.usuario?.papeis.includes('AdministradorGeral'))
    return navigateTo('/')
})
