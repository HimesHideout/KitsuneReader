<script setup>
let chapters = [
  {id: 1, title: "Attack on Donut", cover: "/images/test/Test (1).png", pages: 3},
  {id: 2, title: "Re:Zero Deaths, Over", cover: "/images/test/Test (2).png", pages: 4},
  {id: 3, title: "Your Card in April", cover: "/images/test/Test (3).png", pages: 3},
]
</script>

<template>
  <div>
    <DataView :value="chapters" :data-key="'id'" layout="grid">
      <template #header>
        <h1>Chapters</h1>
      </template>
      <template #grid="slotProps">
        <div class="grid grid-cols-3">
          <NuxtLink :to="'/page/'" style="width: 20vw">
            <Card>
              <template #header>
                <nuxt-img :src="slotProps.data.cover" sizes="xs:20vw" placeholder/>
              </template>
              <template #title>
                Chapter {{ slotProps.data.id }}
              </template>
              <template #content>
                <h3>{{ slotProps.data.title }}</h3>
              </template>
            </Card>
          </NuxtLink>
        </div>
      </template>
    </DataView>
  </div>
</template>

<style scoped>

</style>
