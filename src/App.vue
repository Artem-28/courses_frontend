<template>
  <router-view />
  <icons-list />
</template>
<script setup lang="ts"></script>
<script>
import IconsList from "@/components/ui/UiIcon/IconList.vue";
export default {
  components: { IconsList },
};
</script>
