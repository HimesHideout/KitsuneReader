export default defineNuxtRouteMiddleware((to, from) => {
    const { status, signIn } = useAuth()
    if (status.value === 'authenticated') {
      return
    }

    //return signIn(undefined, {callbackUrl: to.path})
    return navigateTo("/api/auth/signin")
})
