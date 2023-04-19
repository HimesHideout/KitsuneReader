export default defineNuxtRouteMiddleware((to, from) => {
    const { status, signIn } = useAuth()
    if (status.value === 'authenticated') {
      return
    }

    return navigateTo("/api/auth/signin")
})
