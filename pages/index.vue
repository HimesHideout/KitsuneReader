<script setup>
import VanillaTilt from "vanilla-tilt";
</script>

<template>
  <div class="h-screen">
    <div class="flex align-items-center justify-content-around">
      <h2>HIME BIRTHDAY PROJECT 2023</h2>
    </div>
    <div class="flex flex-wrap align-items-center justify-content-around content mb-8">
      <Card class="w-5 mb-8">
        <template #title>
          <p>A Collaborative Manga Project, put together by the talented writers and artists in Hime's Hideout</p>
          </template>
        <template #content>
          <NuxtLink to="/cover"><Button label="Manga" /></NuxtLink>
        </template>
      </Card>
      <Card class="w-5 mb-8">
        <template #title>
          <p>Birthday messages from the kits in the community!</p>
        </template>
        <template #content>
          <NuxtLink to="/messages"><Button label="Birthday Messages" /></NuxtLink>
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>
.title {
  height: 20%;
}

.content {
  height: 80%;
}

.p-card {
  height: 80%;
  min-width: 20em;
}
</style>
