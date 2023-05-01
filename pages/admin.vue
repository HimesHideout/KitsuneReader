<script setup>
definePageMeta({
  middleware: "auth-custom"
})

const { signOut } = useAuth()
let {data: chapters} = await useFetch("/api/chapters")
</script>

<template>
  <div>
    <Button label="Sign out" @click="signOut({callbackUrl: '/'})" />
    <DataView :value="chapters" :data-key="'id'" layout="grid">
      <template #header>
        <h1>Chapters</h1>
      </template>
      <template #grid="slotProps">
        <NuxtLink :to="'/admin/chapter/{{slotProps.data.chapter_number}}'" class="col-6 sm:col-4 md:col-3 lg:col-2 flex-none p-2 border-round">
          <Card>
            <template #header>
              <nuxt-img :src="slotProps.data.cover" placeholder/>
            </template>
            <template #title>
              Chapter {{ slotProps.data.id }}
            </template>
            <template #content>
              <h3>{{ slotProps.data.title }}</h3>
            </template>
          </Card>
        </NuxtLink>
      </template>
    </DataView>
    <Card class="col-6 sm:col-4 md:col-3 lg:col-2 flex-none p-2 border-round">
      <template #header>
        <Button icon="pi pi-plus" rounded outlined severity="success" />
      </template>
      <template #title>
        <h3>Create new chapter</h3>
      </template>
      <template #content>
        <p>a</p>
      </template>
    </Card>
  </div>
</template>

<style scoped></style>
