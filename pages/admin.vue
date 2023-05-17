<script setup>
definePageMeta({
  middleware: "auth"
})

const { signOut } = useAuth()
let {data: chapters} = await useFetch("/api/chapters")
</script>

<template>
  <div>
    <Button label="Sign out" @click="signOut({callbackUrl: '/'})" />
    <DataTable :value="chapters" stripedRows>
      <Column expander></Column>
      <Column field="title" header="Title"></Column>
      <Column field="cover" header="Cover"></Column>
      <Column field="type" header="Type"></Column>
      <Column field="type_number" header="Type Number"></Column>
    </DataTable>
  </div>
</template>

<style scoped></style>
