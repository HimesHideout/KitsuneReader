<script setup></script>

<template>
  <div class="h-screen">
    <div class="flex align-items-center justify-content-around">
      <h2>HIME BIRTHDAY PROJECT 2023</h2>
    </div>
    <div class="flex flex-wrap align-items-center justify-content-around content mb-8">
      <Card class="w-5 mb-8" id="MangaCard">
        <template #title>
          <p>A Collaborative Manga Project, put together by the talented writers and artists in Hime's Hideout</p>
          </template>
        <template #content>
          <div class="flex justify-content-around">
            <NuxtLink to="/reader/1" class=""><Button label="Start Reading" id="ReadingButton"/></NuxtLink>
            <NuxtLink to="/chapters" class=""><Button label="Chapter Select" id="ChaptersButton"/></NuxtLink>
          </div>
        </template>
      </Card>
      <Card class="w-5 mb-8" id="MessagesCard">
        <template #title>
          <p>Birthday messages from the kits in the community!</p>
        </template>
        <template #content>
          <div class="flex justify-content-center">
            <NuxtLink to="/messages"><Button label="Go" id="MessagesButton"/></NuxtLink>
          </div>
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

#ReadingButton{
  background-color: #fa8943;
  color: #e2e2e2;
  border-color: #fa8943;
  border-radius: 2em;
}

#ChaptersButton{
  background-color: #fa8943;
  color: #e2e2e2;
  border-color: #fa8943;
  border-radius: 2em;
}

#MessagesButton {
  background-color: #ff66c4;
  color: #e2e2e2;
  border-color: #ff66c4;
  border-radius: 2em;
  padding-left: 2em;
  padding-right: 2em;
  padding-top: 1em;
  padding-bottom: 1em;
}

#MangaCard {
  background: linear-gradient(to right, #8c52ff, #00bf63);
  border-radius: 2em;
}

#MessagesCard {
  background: linear-gradient(to right, #004aad, #cb6ce6);
  border-radius: 2em;
}


</style>
