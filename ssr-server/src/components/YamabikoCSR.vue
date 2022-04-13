<script setup lang="ts">
import { ref } from "@vue/reactivity"
import Yamabiko from "../domain/yamabiko"
const response = ref('')
const message = ref('')

const send = () => {
  try{
    const yamabiko = new Yamabiko(message.value)
    response.value = yamabiko.message
  }catch(e){
    window.alert(e.message)
  }
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