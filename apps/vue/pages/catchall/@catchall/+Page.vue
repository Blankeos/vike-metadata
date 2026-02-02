<template>
  <div>
    <h1>CATCHALL</h1>
    <div>
      <div>URL pathname: {{ urlPathname }}</div>
      <div>Slug: {{ normalizedSlug }}</div>
      <div>Previous slug: {{ previousSlug }}</div>
      <div>Slug changed: {{ slugChanged ? 'yes' : 'no' }}</div>
    </div>
    <div>
      <a href="/catchall/one">/catchall/one</a>
      <span>{{ ' | ' }}</span>
      <a href="/catchall/two">/catchall/two</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { usePageContext } from 'vike-vue/usePageContext';
import { useMetadata } from 'src';

const pageContext = usePageContext();
const urlPathname = computed(() => pageContext.urlPathname || '');
const prefix = '/catchall/';
const slug = computed(() =>
  urlPathname.value.startsWith(prefix)
    ? urlPathname.value.slice(prefix.length)
    : urlPathname.value.replace(/^\//, ''),
);
const normalizedSlug = computed(() => slug.value || '(root)');

const previousSlug = ref(normalizedSlug.value);
watch(normalizedSlug, (value) => {
  previousSlug.value = value;
});

const slugChanged = computed(() => previousSlug.value !== normalizedSlug.value);

useMetadata({
  title: 'Catchall',
  description: 'Catchall example page',
  keywords: ['Catchall', 'Page'],
});
</script>
