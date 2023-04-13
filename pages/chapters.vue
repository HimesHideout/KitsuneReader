<script setup>
let chapters = [
  {id: 1, title: "Attack on Donut", cover: "/images/test/Test (1).png", pages: 3},
  {id: 2, title: "Re:Zero Deaths, Over", cover: "/images/test/Test (2).png", pages: 4},
  {id: 3, title: "Your Card in April", cover: "/images/test/Test (3).png", pages: 3},
  {id: 4, title: "New Crunchy City Revengers", cover: "/images/test/Test (3).png", pages: 3},
  {id: 5, title: "There's no Card in Ba Sing Se", cover: "/images/test/Test (3).png", pages: 3},
]
</script>

<template>
  <div>
    <DataView :value="chapters" :data-key="'id'" layout="grid">
      <template #header>
        <h1>Chapters</h1>
      </template>
      <template #grid="slotProps">
        <NuxtLink :to="'/page/'" class="col-6 sm:col-4 md:col-3 lg:col-2 flex-none p-2 border-round">
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
  </div>
</template>

<style scoped>

</style>
