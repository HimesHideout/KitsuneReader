<script setup>
let {data: chapters} = await useFetch("/api/chapters")

</script>

<template>
  <div>
    <DataView :value="chapters" :data-key="'id'" layout="grid">
      <template #header>
        <NuxtLink to="/cover" id="link-back-chapters">
        <Button icon="pi pi-angle-left" class="forefront" text></Button>
        </NuxtLink>
        <h1>Zero Cards, Over</h1>
      </template>
      <template #grid="slotProps">
        <NuxtLink :to="'/reader/' + slotProps.data.chapter_number" class="col-6 sm:col-4 md:col-3 lg:col-2 flex-none p-2 border-round">
          <Card>
            <template #header>
              <nuxt-img :src="slotProps.data.cover" placeholder/>
            </template>
            <template #title>
              {{ slotProps.data.type }} {{ slotProps.data.type_number }}
            </template>
            <template #content>
              <h3>{{ slotProps.data.title }}</h3>
            </template>
          </Card>
        </NuxtLink>
      </template>
    </DataView>
  </div>
</template>

<style scoped>

</style>
