<script setup lang="ts">
import { computed, defineProps, withDefaults } from "vue";

/* Composition */
// import you composition api...

/* Components */
// import you components...

/* Types */
// declare components component...
interface Props {
  name: string;
  size?: number | string;
}

/* Props */
// property default value...
const props = withDefaults(defineProps<Props>(), {
  size: 24,
});

/* Emits */
// declare emits component...

/* Composition */
// declare you composition api...

/* Data */
// declare reactive variables...

/* Life hooks */
// life cycle hooks...

/* Computed */
// you computational properties...
const svgName = computed(() => `#${props.name}`);
const sizeIcon = computed(() => leadToPixel(props.size));

/* Methods */
// promote your methods...
function leadToPixel(value: any) {
  switch (typeof value) {
    case "number":
      return `${value}px`;
    default:
      return value;
  }
}
</script>

<template>
  <svg role="img" viewBox="0 0 24 24" class="ui-icon">
    <use :xlink:href="svgName" />
  </svg>
</template>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...
$size: v-bind(sizeIcon);

/* Selector */
// style component...
.ui-icon {
  width: $size;
  height: $size;
  color: $light-icon;
}
</style>
