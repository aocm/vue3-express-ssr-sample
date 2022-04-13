<script setup lang="ts">
import { ref } from "@vue/reactivity"
import { useRoute, useRouter } from "vue-router"
const route = useRoute()
// console.log(route)
const response = ref('')
</script>

<template>
  <h2>Yamabiko</h2>
  <p id="yamabiko-response">res: {{route.query.message}}</p>
</template>