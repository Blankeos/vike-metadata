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
      <a href="/catchall/1">/catchall/1</a>
      <span>{{ ' | ' }}</span>
      <a href="/catchall/2">/catchall/2</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue';
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

const alternateIcons = {
  icon: '/icon-alt.svg',
  shortcut: '/icon-alt.svg',
  apple: '/icon-alt.svg',
};

const previousSlug = ref(normalizedSlug.value);
watch(normalizedSlug, (value) => {
  previousSlug.value = value;
});

const slugChanged = computed(() => previousSlug.value !== normalizedSlug.value);

watchEffect(() => {
  useMetadata({
    title: `Catchall ${normalizedSlug.value}`,
    description: 'Catchall example page',
    keywords: ['Catchall', 'Page'],
    icons: normalizedSlug.value === '2' ? alternateIcons : undefined,
  });
});
</script>
