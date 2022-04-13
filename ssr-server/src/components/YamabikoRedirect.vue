<script setup lang="ts">
import { ref } from "@vue/reactivity"
const response = ref('')
const message = ref('')
const send = () => {
   fetch('/api/yamabiko-redirect',{
     method: 'POST',
     headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
     body: JSON.stringify({
       message: message.value
     })
   })
}
</script>

<template>
  <h2>redirectパターン</h2>
  <form action="/form/yamabiko" method="GET">
    <input 
      id="yamabiko-form"
      type="text" 
      name="message"
      placeholder="say yahho!" 
      v-model="message"
    />
    <button id="yamabiko-form-button">
      send
    </button>
  </form>

</template>