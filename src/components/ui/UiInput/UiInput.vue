<script setup lang="ts">
import {
  computed,
  defineEmits,
  defineProps,
  withDefaults,
  defineAsyncComponent,
} from "vue";

/* Composition */
// import you composition api...
import useModel from "@/composition/model";
import useInputMethod from "@/composition/inputMethod";

/* Components */
// import you components...
const input_default = defineAsyncComponent(
  () => import("@/components/ui/UiInput/components/InputDefault.vue")
);
const input_password = defineAsyncComponent(
  () => import("@/components/ui/UiInput/components/InputPassword.vue")
);

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
  dense?: boolean;
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
  dense: false,
  type: "text",
});

/* Emits */
const emit = defineEmits<Emit>();

/* Composition */
// declare you composition api...
const model = useModel(props, emit);
const { emitBlur, emitFocus } = useInputMethod(emit);

/* Data */
// declare reactive variables...

/* Life hooks */
// life cycle hooks...

/* Computed */
// you computational properties...
const component = computed(() => {
  switch (props.type) {
    case "password":
      return input_password;
    default:
      return input_default;
  }
});

/* Methods */
// promote your methods...
</script>

<template>
  <component
    :is="component"
    v-model="model"
    v-bind="props"
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
