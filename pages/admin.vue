<script setup>
definePageMeta({
  middleware: "auth-custom"
})

const { signOut } = useAuth()
</script>

<template>
  <div>
    <Button label="Sign out" @click="signOut({callbackUrl: '/'})" />
    Page: foo
  </div>
</template>

<style scoped></style>
