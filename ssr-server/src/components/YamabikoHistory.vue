<script setup lang="ts">
import { ref, useSSRContext } from '@vue/runtime-core'
import { getData } from '../utils/api'

const isServer = import.meta.env.SSR
const data = ref({history: []})
const fetchData = async () => {
  if (isServer){
    const ctx = useSSRContext()
    data.value.history = ctx.session.messages
  } else {
    const res = await getData('/api/yamabiko/history')//.then((response)=>response.json())
    data.value = res
  }
}

fetchData()
</script>

<template>
  <h2>History</h2>
  <p id="yamabiko-response">
    res: {{ data }}
  </p>
  <ul id="yamabiko-history">
    <li
      v-for="(message,index) in data.history"
      :id="`history-${index+1}`"
      :key="index+message"
    >
      {{ message }}
    </li>
  </ul>
</template>