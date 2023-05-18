<script setup>
definePageMeta({
  middleware: "auth"
})

import { useToast } from 'primevue/usetoast'

const { signOut } = useAuth()
const expandedRows = ref([])
const editingRows = ref([])
const toast = useToast()

let {data: chapters} = await useFetch("/api/chapters")

function onRowReorder(event) {
  chapters.value = event.value
}
</script>

<template>
  <div>
    <header>
      <NuxtLink to="/cover" id="link-back-chapters" class="absolute mt-3 ml-3">
          <Button label="Sign out" @click="signOut({callbackUrl: '/'})" class="forefront" />
      </NuxtLink>
      <div class="flex align-items-center justify-content-around">
        <h2>ADMIN</h2>
      </div>
  </header>
    <DataTable :value="chapters" @rowReorder="onRowReorder" v-model:expandedRows="expandedRows" dataKey="id" stripedRows>
      <Column rowReorder></Column>
      <Column expander></Column>
      <Column field="title" header="Title"></Column>
      <Column field="cover" header="Cover"></Column>
      <Column field="type" header="Type"></Column>
      <Column field="type_number" header="Type Number"></Column>
    </DataTable>
  </div>
</template>

<style scoped></style>
