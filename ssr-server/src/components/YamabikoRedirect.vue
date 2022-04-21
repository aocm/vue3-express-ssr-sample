<script setup lang="ts">
import { ref } from '@vue/reactivity'
const message = ref('')
// const send = () => {
//   fetch('/api/yamabiko-redirect', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body: JSON.stringify({
//       message: message.value
//     })
//   })
// }
</script>

<template>
  <h2>redirectパターン</h2>
  <form
    action="/api/yamabiko"
    method="POST"
  >
    <input
      id="yamabiko-form"
      v-model="message"
      type="text"
      name="message"
      placeholder="say yahho!"
    >
    <button id="yamabiko-form-button">
      send
    </button>
  </form>
</template>