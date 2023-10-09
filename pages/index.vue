<script setup></script>

<template>
  <div class="h-screen">
    <div class="flex flex-column align-items-center justify-content-evenly">
      <div class="flex align-items-center justify-content-center">
        <h2>2 YEAR ANNIVERSARY</h2>
      </div>
      <div class="flex flex-wrap justify-content-evenly align-items-center mb-5 gap-4">
        <div class="card flex-column justify-content-center">
          <Image
            preview
            :pt="{
              rotateRightButton: {class: 'hidden'},
              rotateLeftButton: {class: 'hidden'},
              zoomInButton: {class: 'hidden'},
              zoomOutButton: {class: 'hidden'}
            }"
          >
            <template #image>
              <img src="~/assets/art/CyberNatasha_2nd_Anniversary.png" class="h-27rem w-12"/>
            </template>
            <template #preview>
              <img src="~/assets/art/CyberNatasha_2nd_Anniversary.png" class="h-screen"/>
            </template>
          </Image>
          <div>Art by: CyberNatasha</div>
        </div>
        <Card class="w-4 h-25rem overflow-auto" id="AnniversaryCard">
          <!--Uncomment and change the logo here-->
          <!-- <template #header>
            <img src="~/assets/logos/Superchat_Logo.png" style="display: block; margin-top: 2em; margin-left: auto; margin-right: auto; max-width: 80%; max-height: 70%; "/>
          </template> -->
          <template #title>
            <p class="lg:text-4xl sm:text-2xl text-center no-underline">Anniversary messages from the kits in the community!</p>
          </template>
          <template #content>
            <div class="flex justify-content-center">
              <NuxtLink to="/anniversaryMessages"><Button label="Go" id="AnniversaryButton"/></NuxtLink>
            </div>
          </template>
        </Card>
        <div class="card flex-column align-items-center justify-content-center">
          <!-- The rotate & zoom buttons on preview are hidden since 
          they require more work to work with the custom preview elements. -->
          <Image
            preview
            :pt="{
              rotateRightButton: {class: 'hidden'},
              rotateLeftButton: {class: 'hidden'},
              zoomInButton: {class: 'hidden'},
              zoomOutButton: {class: 'hidden'}
            }"
          >
            <template #image>
              <img src="~/assets/art/AlexC_2nd_Anniversary.png" class="h-21rem w-12"/>
            </template>
            <template #preview>
              <img src="~/assets/art/AlexC_2nd_Anniversary.png" class="h-screen"/>
            </template>
          </Image>
          <div>Art by: Alex Chan</div>
        </div>
      </div>
      <div class="flex align-items-center justify-content-center">
        <h2>HIME BIRTHDAY PROJECT 2023</h2>
      </div>
      <div class="flex flex-wrap align-items-center justify-content-around">
        <Card class="w-5 mb-8 overflow-auto" id="MangaCard">
          <template #header>
            <img src="~/assets/logos/Zero_Cards_Over_Logo.png" style="display: block; margin-top: 2em; margin-left: auto; margin-right: auto; max-width: 55%; max-height: 60%; "/>
          </template>
          <template #title>
            <p class="lg:text-3xl text-2xl text-center">A Collaborative Manga Project, put together by the talented writers and artists in Hime's Hideout</p>
          </template>
          <template #content>
            <div class="flex flex-wrap justify-content-around gap-3 align-content-center">
              <NuxtLink to="/reader/0#1" class=""><Button label="Start Reading" :external="true" class="sm:text-base md:text-xl p-3 no-underline" id="ReadingButton"/></NuxtLink>
              <NuxtLink to="/chapters" class=""><Button label="Chapter Select" class="sm:text-base md:text-xl p-3 no-underline" id="ChaptersButton"/></NuxtLink>
            </div>
          </template>
        </Card>
        <Card class="w-5 mb-8 overflow-auto" id="MessagesCard">
          <template #header>
            <img src="~/assets/logos/Superchat_Logo.png" style="display: block; margin-top: 2em; margin-left: auto; margin-right: auto; max-width: 80%; max-height: 70%; "/>
          </template>
          <template #title>
            <p class="lg:text-3xl sm:text-2xl text-center no-underline">Birthday messages from the kits in the community!</p>
          </template>
          <template #content>
            <div class="flex justify-content-center">
              <NuxtLink to="/messages"><Button label="Go" id="MessagesButton"/></NuxtLink>
            </div>
          </template>
        </Card>
      </div>
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
  padding-left: 1.5em;
  padding-right: 1.5em;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  font-size:1.3em;
}

/* Change coloring for button */
#AnniversaryButton {
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

/* Change coloring for card */
#AnniversaryCard {
  background: linear-gradient(to right, #004aad, #cb6ce6);
  border-radius: 2em;
}

</style>
