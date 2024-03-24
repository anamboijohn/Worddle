<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import WordleBoard from './components/WordleBoard.vue'
</script>

<template>
  <wordle-board msg="You did it!" />
  <RouterView />
</template>
