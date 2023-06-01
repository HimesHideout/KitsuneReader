<script setup></script>

<template>
  <div class="h-screen">
    <div class="flex align-items-center justify-content-around">
      <h2>HIME BIRTHDAY PROJECT 2023</h2>
    </div>
    <div class="flex flex-wrap align-items-center justify-content-around content mb-8">
      <Card class="w-5 mb-8" id="MangaCard">
        <template #header>
          <img src="~/assets/logos/Zero_Cards_Over_Logo.png" style="display: block; margin-top: 2em; margin-left: auto; margin-right: auto; max-width: 55%; max-height: 60%; "/>
        </template>
        <template #title>
          <p>A Collaborative Manga Project, put together by the talented writers and artists in Hime's Hideout</p>
        </template>
        <template #footer>
          <div class="flex flex-wrap justify-content-around gap-2 align-content-end">
            <NuxtLink to="/reader/0" class=""><Button label="Start Reading" id="ReadingButton"/></NuxtLink>
            <NuxtLink to="/chapters" class=""><Button label="Chapter Select" id="ChaptersButton"/></NuxtLink>
          </div>
        </template>
      </Card>
      <Card class="w-5 mb-8" id="MessagesCard">
        <template #header>
          <img src="~/assets/logos/Superchat_Logo.png" style="display: block; margin-top: 2em; margin-left: auto; margin-right: auto; max-width: 80%; max-height: 70%; "/>
        </template>
        <template #title>
          <p>Birthday messages from the kits in the community!</p>
        </template>
        <template #footer>
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

p {
  font-size: 1.2em;
  text-align: center;
}

#ReadingButton{
  background-color: #fa8943;
  color: #e2e2e2;
  border-color: #fa8943;
  border-radius: 2em;
  font-size: 1.3em;
  padding: 0.7em;
}

#ChaptersButton{
  background-color: #fa8943;
  color: #e2e2e2;
  border-color: #fa8943;
  border-radius: 2em;
  font-size: 1.3em;
  padding: 0.7em;
}

#MessagesButton {
  background-color: #ff66c4;
  color: #e2e2e2;
  border-color: #ff66c4;
  border-radius: 2em;
  padding-left: 1.5em;
  padding-right: 1.5em;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  font-size:1.3em;
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
