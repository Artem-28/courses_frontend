<script setup lang="ts">
import { defineProps, ref, withDefaults, computed, defineEmits } from "vue";

/* Composition */
// import you composition api...
import useModel from "@/composition/model";

/* Components */
// import you components...

/* Types */
// declare components component...
type Value = any;
interface Emit {
  (e: "update:modelValue", value: Value): void;
  (e: "next", index: number): void;
  (e: "prev", index: number): void;
}
interface Props {
  modelValue: Value;
  mask: string;
  tabIndex?: number;
  error?: boolean;
  disabled?: boolean;
  dense?: boolean;
}

/* Props */
// property default value...
const props = withDefaults(defineProps<Props>(), {
  tabIndex: 1,
});

/* Emits */
const emit = defineEmits<Emit>();

/* Composition */
// declare you composition api...
const model = useModel(props, emit, "modelValue");

/* Data */
// declare reactive variables...
const control = ref<HTMLInputElement | null>(null);

/* Life hooks */
// life cycle hooks...

/* Computed */
// you computational properties...
const classes = computed(() => {
  return {
    error: props.error,
    disabled: props.disabled,
    dense: props.dense,
  };
});

const maxLength = computed(() => props.mask.length);

const inputWidth = computed(() => {
  const size = props.dense ? 30 : 38;
  const step = props.dense ? 12 : 18;
  return `${size + maxLength.value * step}px`;
});

/* Methods */
// promote your methods...
function updateBinding(value: Value) {
  if (!control.value) return;
  control.value.value = value;
  control.value.dispatchEvent(new Event("input"));
}

function validate(value: Value) {
  const str = value.replace(/[^[0-9]/g, "");
  return str.substring(str.length - maxLength.value);
}
function keyUpHandler(e: KeyboardEvent) {
  const value = (e.target as HTMLInputElement).value;
  const validValue = validate(value);
  if (validValue.length === maxLength.value) {
    emit("next", props.tabIndex + 1);
  }
  updateBinding(validValue);
}

function backspaceHandler(value: Value) {
  if (value) return;
  emit("prev", props.tabIndex - 1);
}
function keydownHandler(e: KeyboardEvent) {
  const value = (e.target as HTMLInputElement).value;
  switch (e.code) {
    case "Backspace":
      backspaceHandler(value);
      break;
    default:
      break;
  }
}
</script>

<template>
  <input
    ref="control"
    v-model="model"
    :disabled="disabled"
    :tabindex="tabIndex"
    :class="classes"
    class="control"
    @keyup="keyUpHandler"
    @keydown="keydownHandler"
  />
</template>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...
$width-control: v-bind(inputWidth);

/* Selector */
// style component...
.control {
  width: $width-control;
  display: flex;
  height: 100%;
  text-align: center;
  font-style: normal;
  font-weight: 400;
  font-size: 30px;
  line-height: 120%;
  color: $light-text-title;
  outline: 1px solid $light-text-body-secondary;
  border-radius: 8px;
  transition: all 0.2s;
}
.control:focus {
  outline: 1px solid $light-primary-50;
}
.control.error {
  outline: 1px solid $light-error;
}
.control.disabled {
  outline: 1px solid $light-primary-10;
  background-color: $light-primary-10;
  color: $light-text-body-primary;
  cursor: not-allowed;
}
.control.dense {
  font-size: 20px;
}
</style>
