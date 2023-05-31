<script setup>
let {data: chapters} = await useFetch("/api/chapters")

</script>

<template>
  <div>
    <header>
        <NuxtLink to="/" id="link-back-chapters" class="absolute">
            <Button icon="pi pi-angle-left" class="forefront" text></Button>
        </NuxtLink>
        <div class="flex align-items-center justify-content-around">
          <h2>CHAPTERS</h2>
        </div>
    </header>
    <div>
      <DataView :value="chapters" :data-key="'id'" layout="grid">
        <template #grid="slotProps">
          <NuxtLink :to="'/reader/' + slotProps.data.chapter_number" class="col-6 sm:col-4 md:col-3 lg:col-2 flex p-2 border-round no-underline">
            <Card>
              <template #header>
                <nuxt-img :src="slotProps.data.cover" placeholder/>
              </template>
              <template #title>
                {{ slotProps.data.type }} {{ slotProps.data.type == "Chapter" ? slotProps.data.type_number : "" }}
              </template>
              <template #content>
                <h3>{{ slotProps.data.title }}</h3>
              </template>
            </Card>
          </NuxtLink>
        </template>
      </DataView>
    </div>
  </div>
</template>

<style scoped>

</style>
