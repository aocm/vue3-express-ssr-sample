<script setup lang="ts">
import { ref } from "@vue/reactivity"

const data = ref('init')
const message = ref('init')
const getOrigin = () => {
   data.value = window.origin
}
const send = () => {
   data.value = message.value
}
</script>

<template>
  <h1>yamabiko</h1>
  <input 
    type="text" 
    placeholder="say yahho!" 
    v-model="message"
  />
  <button @click="send">
    send
  </button>
  <p>{{data}}</p>
</template>

