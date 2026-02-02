<template>
  <div>
    <h1>HOME</h1>
    <button type="button" @click="state.count++">Increment {{ state.count }}</button>
  </div>
</template>

<script setup lang="ts">
import { useMetadata } from 'src/index';
import { reactive } from 'vue';

const state = reactive({ count: 0 });

useMetadata({
  description: 'Home page description',
  keywords: ['Home', 'Page'],
});
</script>
