<script setup>
definePageMeta({
  middleware: "auth"
})

import { useToast } from 'primevue/usetoast'
useHead({script: [{src: "https://upload-widget.cloudinary.com/global/all.js", type: "text/javascript"}]})

const effects = ["Normal", "Constellation", "Morning", "Twilight", "LightPrism", "DarkPrism", "DayTornado", "Fancy", "Hexagon", "Rainbow", "SunTornado", "Clouds", "DarkComicRush", "DarkTriangular", "LightComicRush", "MemoryRipples", "PaleGradient", "SpringLeaves", "StaticSlow", "StarrySky", "UpBubbles"]
const { signOut } = useAuth()
const config = useRuntimeConfig()
const expandedRows = ref([])
const editingRows = ref([])
const editingExpandedRows = ref([])
const uploadImageVariable = ref([])
let upload_widget = null
const toast = useToast()

let {data: chapters} = await useFetch("/api/all")


function onRowReorder(event, isPage=false) { 
  if (!isPage) {
    chapters.value = event.value
    for (let i = 0; i < chapters.value.length; i++) {
      chapters.value[i].chapter_number = i + 1
    }
    updateChapters()
  } else {
    chapters.value[event.value[0].chapter_number].pages = event.value
    for (let i = 0; i < chapters.value[event.value[0].chapter_number].pages.length; i++) {
      chapters.value[event.value[0].chapter_number].pages[i].page_number = i + 1
    }
    updatePages(event.value[0].chapter_number, chapters.value[event.value[0].chapter_number].pages)
  }
}

function onRowEditSave(event, values=null) {
  let { newData, index, data} = event
  if (values == null) {
    chapters.value[index] = newData
    useFetch(`/api/chapter/${data.chapter_number}`,
    {
      method: "PUT",
      body: newData
    })
  } else {
    values[index] = newData
    useFetch(`/api/page/${data.page_number}`,
    {
      method: "PUT",
      body: newData
    })
  }
}

function addPage(pages, chapter_number) {
  let new_page = {
    chapter_number: chapter_number,
    page_number: pages.length + 1,
    image: `${pages.length + 1}.png`,
    effects: null
  }
  pages.push(new_page)
  useFetch("/api/page", {
    method: "POST",
    body: new_page
  })
}

async function removePage(page, index) {
  chapters.value[page.chapter_number].pages.splice(index, 1)
  for (let i = 0; i < chapters.value[page.chapter_number].pages.length; i++) {
    chapters.value[page.chapter_number].pages[i].page_number = i + 1
  }
  await useFetch(`/api/page/${page.page_number}`, {
    method: "DELETE",
    body: page
  })
}

function updatePages(chapter_number, pages) {
  useFetch("/api/pages", {
    method: "POST",
    body: {pages, chapter_number}
  })
}

function updateChapters() {
  useFetch("/api/chapters", {
    method: "POST",
    body: chapters.value
  })
}

function uploadImage(data, field) {
  uploadImageVariable.value = [data, field]
  upload_widget.update({folder: `kitsune-reader/${data.chapter_number}`})
  upload_widget.open()
}

async function generateCloudinarySignature(callback, params_to_sign) {
  let { data: signature} = await useFetch("/api/cloudinary_sign",
    {
      method: "POST",
      body: params_to_sign
    }
  )

  callback(signature.value)
}

function uploadCallback(error, result) {
  if (error) {
    console.log(error)
    return
  } else if (result.event === "success") {
    let filename = ""
    if (uploadImageVariable.value[0].page_number === undefined) {
      filename = result.info.public_id.replace("kitsune-reader", "")
    } else {
      filename = result.info.public_id.replace(`${result.info.folder}/`, "")
    }
    filename = `${filename}.${result.info.format}`
    uploadImageVariable.value[0][uploadImageVariable.value[1]] = filename
    uploadImageVariable.value = []
  }
}

onMounted(() => {
  upload_widget = cloudinary.createUploadWidget({
    cloudName: config.public.CLOUDINARY_CLOUD_NAME,
    uploadPreset: config.public.CLOUDINARY_UPLOAD_PRESET,
    api_key: config.public.CLOUDINARY_API_KEY,
    uploadSignature: generateCloudinarySignature
  }, uploadCallback)
})

</script>

<template>
  <div>
    <header>
      <NuxtLink to="/" id="link-back-chapters" class="absolute mt-3 ml-3">
          <Button label="Sign out" @click="signOut({callbackUrl: '/'})" class="forefront" />
      </NuxtLink>
      <div class="flex align-items-center justify-content-around">
        <h2>ADMIN</h2>
      </div>
  </header>
    <DataTable :value="chapters" editMode="row" v-model:expandedRows="expandedRows" v-model:editingRows="editingRows" 
    @row-edit-save="onRowEditSave" dataKey="_id" stripedRows>
      <!-- <Column rowReorder></Column> -->
      <Column expander></Column>
      <Column field="chapter_number" header="Chapter"></Column>
      <Column field="title" header="Title">
        <template #editor="{ data, field }">
          <InputText v-model="data[field]"/>
        </template>
      </Column>
      <Column field="cover" header="Cover">
        <template #body="slotProps">
          <nuxt-img :src="slotProps.data.cover" sizes="5vw sm:5vw"></nuxt-img>
        </template>
        <template #editor="{ data, field }">
          <Button label="Upload image" @click="uploadImage(data, field)"/>
        </template>
      </Column>
      <Column field="type" header="Type">
        <template #editor="{ data, field }">
          <InputText v-model="data[field]"/>
        </template></Column>
      <Column field="type_number" header="Type Number">
        <template #editor="{ data, field }">
          <InputNumber v-model="data[field]" :min="1" :allowEmpty="false" :maxFractionDigits="0" showButtons />
        </template>
      </Column>
      <Column :rowEditor="true" v-if="editingExpandedRows.length == 0"></Column>
      <template #expansion="slotProps">
        <div>
          <DataTable :value="slotProps.data.pages" editMode="row" @rowReorder="(event) => onRowReorder(event, true)" v-model:editingRows="editingExpandedRows" 
          @row-edit-save="(event) => onRowEditSave(event, slotProps.data.pages)" dataKey="_id" stripedRows>
            <Column rowReorder></Column>
            <Column field="page_number" header="Page"></Column>
            <Column field="image" header="Image">
              <template #body="slotProps">
                <nuxt-img :src="slotProps.data.chapter_number + '/' + slotProps.data.image" sizes="5vw sm:5vw"></nuxt-img>
              </template>
              <template #editor="{ data, field }">
                <Button label="Upload image" @click="uploadImage(data, field)"/>
              </template>
            </Column>
            <Column field="effects" header="Effects">
              <template #editor="{ data, field }">
                <Dropdown v-model="data[field]" :options="effects" placeholder="Select the page effect..." showClear />
              </template>
            </Column>
            <Column :rowEditor="true" v-if="editingRows.length == 0"></Column>
            <Column>
              <template #body="slotProps">    
                <Button icon="pi pi-times" text @click="removePage(slotProps.data, slotProps.index)"/>
              </template>
            </Column>
          </DataTable>
          <Button label="Add page" @click="addPage(slotProps.data.pages, slotProps.data.chapter_number)" />
        </div>
      </template>
    </DataTable>
  </div>
</template>

<style scoped></style>
