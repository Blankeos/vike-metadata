<template>
  <div>
    <h1>NO SSR</h1>
    <button type="button" @click="state.count++">Increment {{ state.count }}</button>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useMetadata } from 'src';

const state = reactive({ count: 0 });

useMetadata({
  title: 'No SSR',
  description: 'No SSR page description',
  keywords: ['No SSR', 'Page'],
});
</script>
