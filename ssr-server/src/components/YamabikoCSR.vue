<script setup lang="ts">
import { ref } from "@vue/reactivity"
const response = ref('')
const message = ref('')
const send = () => {
   response.value = message.value
}
</script>

<template>
  <h2>クライアント内操作パターン</h2>
  <input 
    id="yamabiko-input"
    type="text" 
    placeholder="say yahho!" 
    v-model="message"
  />
  <button id="yamabiko-button" @click="send">
    send
  </button>
  <p id="yamabiko-response">res: {{response}}</p>
</template>