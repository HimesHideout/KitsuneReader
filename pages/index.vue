<script setup></script>

<template>
  <div class="h-screen">
    <div class="flex align-items-center justify-content-around title">
      <h2>HIME BIRTHDAY PROJECT 2023</h2>
    </div>
    <div class="flex align-items-center justify-content-around content">
      <Card class="w-5 my-5">
        <template #title>
          <p>A Collaborative Manga Project, put together by the talented writers and artists in Hime's Hideout</p>
          </template>
        <template #content>
          <NuxtLink to="/cover"><Button label="Manga" /></NuxtLink>
        </template>
      </Card>
      <Card class="w-5 my-5">
        <template #title>
          <p>Birthday messages from the kits in the community!</p>
        </template>
        <template #content>
          <NuxtLink to="/messages"><Button label="Messages" /></NuxtLink>
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
</style>
