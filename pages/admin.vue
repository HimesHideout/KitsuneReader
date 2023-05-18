<script setup>
definePageMeta({
  middleware: "auth"
})

import { useToast } from 'primevue/usetoast'

const { signOut } = useAuth()
const expandedRows = ref([])
const editingRows = ref([])
const toast = useToast()

let {data: chapters} = await useFetch("/api/all")

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
    <DataTable :value="chapters" editMode="row" @rowReorder="onRowReorder" v-model:expandedRows="expandedRows" v-model:editingRows="editingRows" dataKey="_id" stripedRows>
      <Column rowReorder></Column>
      <Column expander></Column>
      <Column field="chapter_number" header="Chapter"></Column>
      <Column field="title" header="Title">
        <template #editor="{ data, field }">
          <InputText v-model="data[field]"/>
        </template>
      </Column>
      <Column field="cover" header="Cover">
        <template #body="slotProps">
          <nuxt-img :src="slotProps.data.cover" sizes="5vw sm:5vw"></nuxt-img>
        </template>
      </Column>
      <Column field="type" header="Type">
        <template #editor="{ data, field }">
          <InputText v-model="data[field]"/>
        </template></Column>
      <Column field="type_number" header="Type Number">
        <template #editor="{ data, field }">
          <InputNumber v-model="data[field]" :min="1" :allowEmpty="false" :maxFractionDigits="0" showButtons />
        </template>
      </Column>
      <Column :rowEditor="true"></Column>
      <template #expansion="slotProps">
        <div>
          <DataTable :value="slotProps.data.pages">
            <Column field="page_number" header="Page"></Column>
            <Column field="image" header="Image"></Column>
            <Column field="effects" header="Effects"></Column>
          </DataTable>
        </div>
      </template>
    </DataTable>
  </div>
</template>

<style scoped></style>
