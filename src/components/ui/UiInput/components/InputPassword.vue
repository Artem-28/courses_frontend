<script setup lang="ts">
import { defineEmits, defineProps, withDefaults, ref, computed } from "vue";

/* Composition */
// import you composition api...
import useModel from "@/composition/model";
import useInputMethod from "@/composition/inputMethod";
import useToggle from "@/composition/toggle";

/* Components */
// import you components...
import UiInputDefault from "@/components/ui/UiInput/components/InputDefault.vue";

/* Types */
// declare components component...
type Value = number | string | null;
interface Props {
  name: string;
  modelValue: Value;
  label?: string;
  placeholder?: string;
  hintMessage?: string;
  errorMessage?: string;
  beforeIcon?: string;
  afterIcon?: string;
  outline?: boolean;
  error?: boolean;
  disabled?: boolean;
  type?: string;
}
interface Emit {
  (e: "update:modelValue", value: Value): void;
  (e: "focus", event: FocusEvent): void;
  (e: "blur", event: FocusEvent): void;
}

/* Props */
// property default value...
const props = withDefaults(defineProps<Props>(), {
  outline: false,
  error: false,
});

/* Emits */
const emit = defineEmits<Emit>();

/* Composition */
// declare you composition api...
const model = useModel(props, emit);
const { emitBlur, emitFocus } = useInputMethod(emit);
const { isToggle, toggle } = useToggle();

/* Data */
// declare reactive variables...

/* Life hooks */
// life cycle hooks...

/* Computed */
// you computational properties...
const inputType = computed(() => (isToggle.value ? "text" : "password"));
const inputIcon = computed(() => (isToggle.value ? "eye_on" : "eye_off"));

/* Methods */
// promote your methods...
</script>

<template>
  <UiInputDefault
    v-model="model"
    v-bind="props"
    :type="inputType"
    :after-icon="inputIcon"
    :click-method-after="toggle"
    @focus="emitBlur"
    @blur="emitFocus"
  />
</template>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...

/* Selector */
// style component...
</style>
