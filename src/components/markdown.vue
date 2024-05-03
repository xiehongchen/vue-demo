<template>
  <component :is = "content" :key="currentName" v-highlight/>
</template>

<script lang="ts" setup>
  import { shallowRef, watchEffect, computed, ComputedRef } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const content: any = shallowRef(null);
console.log('route', route)
  const currentName: ComputedRef = computed(() => {
    return route.params.name;
  });

  console.log('currentName', currentName.value)

  watchEffect(() => {
    if (route.path.startsWith('/doc/')) {
      import(/* @vite-ignore */'./markdown/' + currentName.value + '.md')
      .then(e => {
        content.value = e.default;
      }).catch(() => {
      });
    }
  });
</script>
