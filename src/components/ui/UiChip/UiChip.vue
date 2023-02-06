<script setup lang="ts">
import { computed, defineEmits, defineProps, ref, withDefaults } from "vue";
import useModel from "@/composition/model";

/* Composition */
// import you composition api...

/* Components */
// import you components...

/* Types */
// declare components component...
interface Props {
  modelValue?: boolean;
  selected?: boolean;
  removable?: boolean;
  clickable?: boolean;
  label?: string;
  color?: string;
  iconLeft?: string;
  iconRight?: string;
  iconSelected?: string;
  iconRemove?: string;
}
interface Emit {
  (e: "update:modelValue", value: boolean): void;
  (e: "update:selected", value: boolean): void;
}

/* Props */
// property default value...
const props = withDefaults(defineProps<Props>(), {
  modelValue: true,
  color: "primary",
  iconSelected: "check",
  iconRemove: "cancel_round",
});

/* Emits */
const emit = defineEmits<Emit>();

/* Data */
// declare reactive variables...

/* Composition */
// declare you composition api...
const isSelect = useModel(props, emit, "selected");

/* Life hooks */
// life cycle hooks...

/* Computed */
// you computational properties...
const transformColor = computed(() => {
  switch (props.color) {
    case "primary":
      return "#5541D7";
    case "secondary":
      return "#2D96EE";
    case "accept-primary":
      return "#42BDA1";
    default:
      return props.color;
  }
});

const icon = computed(() => {
  const icon = {
    left: props.iconLeft,
    right: props.iconRight,
  };
  if (isSelect.value) {
    icon.left = props.iconSelected;
  }
  if (props.removable) {
    icon.right = props.iconRemove;
  }
  return icon;
});

const isClickable = computed(() => {
  return props.clickable || props.selected !== undefined;
});

const classes = computed(() => ({ clickable: isClickable.value }));

/* Methods */
// promote your methods...
function clickHandler() {
  if (props.selected !== undefined) {
    selectHandler();
  }
}
function selectHandler() {
  isSelect.value = !isSelect.value;
}
function removeHandler(event: Event) {
  event.stopPropagation();
}
function iconRightClickHandler(event: Event) {
  if (props.removable) {
    removeHandler(event);
  }
}
</script>

<template>
  <div class="ui-chip" :class="classes" @click="clickHandler">
    <ui-icon
      v-if="icon.left"
      :name="icon.left"
      :size="20"
      class="ui-chip__icon"
    />
    <div class="ui-chip__label">
      <span v-text="label" />
    </div>
    <ui-icon
      v-if="icon.right"
      :name="icon.right"
      :size="16"
      class="ui-chip__icon"
      :class="{ removable }"
      @click="iconRightClickHandler"
    />
  </div>
</template>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...
$background-color: v-bind(transformColor);

/* Selector */
// style component...
.ui-chip {
  width: fit-content;
  background-color: $background-color;
  color: white;
  margin: 4px;
  padding: 0 12px;
  border-radius: 16px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  &__icon {
    color: white;
  }
  &__label {
    padding: 7px 0;
    font-size: 14px;
  }
}
.clickable {
  cursor: pointer;
}
</style>
