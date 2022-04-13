<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <h2>Yamabiko</h2>
  <p id="yamabiko-response">
    res: {{ route.query.message }}
  </p>
</template>