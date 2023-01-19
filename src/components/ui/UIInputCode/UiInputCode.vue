<script setup lang="ts">
import { defineProps, ref, withDefaults, computed, defineEmits } from "vue";

/* Composition */
// import you composition api...
import useInputMessage from "@/composition/inputMessage";
import useElementChildren from "@/composition/elementChildren";

/* Components */
// import you components...
import ControlCode from "@/components/ui/UIInputCode/components/ControlCode.vue";

/* Types */
// declare components component...
type Value = string;
interface Props {
  modelValue: string;
  mask: string;
  label?: string;
  error?: boolean;
  disabled?: boolean;
  hintMessage?: string;
  errorMessage?: string;
  dense?: boolean;
}
interface Emit {
  (e: "update:modelValue", value: Value): void;
}

/* Props */
// property default value...
const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  error: false,
});

/* Emits */
const emit = defineEmits<Emit>();

/* Composition */
// declare you composition api...
const { message, showMessage } = useInputMessage(props);

/* Data */
// declare reactive variables...
const container = ref<HTMLElement | null>(null);

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

const sizeIcon = computed(() => (props.dense ? 16 : 20));

const controls = computed(() =>
  useElementChildren(container.value, "tabindex")
);

const maskControls = computed(() => {
  return props.mask.split("-");
});

const numColumn = computed(() => {
  if (!props.mask) return 0;
  return props.mask.split("-").length;
});

const values = computed(() => {
  return props.modelValue.split("-");
});

/* Methods */
// promote your methods...
function inputHandler(value: Value, num: number) {
  const newValue = values.value;
  newValue[num] = value;
  emit("update:modelValue", newValue.join("-"));
}

function getControlByTabIndex(index: number) {
  if (!controls.value || Array.isArray(controls.value)) return null;
  return controls.value[index] as HTMLInputElement;
}

function changeFocus(index: number) {
  const control = getControlByTabIndex(index);
  if (!control) return;
  control.focus();
}
</script>

<template>
  <div class="ui-input" :class="classes">
    <span v-if="label" class="ui-input__label" v-text="label" />
    <div ref="container" class="ui-input__controls">
      <ControlCode
        v-for="num in numColumn"
        :key="num"
        :model-value="values[num - 1]"
        :mask="maskControls[num - 1]"
        :dense="dense"
        :error="error"
        :disabled="disabled"
        :tab-index="num"
        @update:modelValue="(val) => inputHandler(val, num - 1)"
        @next="changeFocus"
        @prev="changeFocus"
      />
    </div>
    <div v-if="showMessage" class="ui-input__message">
      <ui-icon name="notice" :size="sizeIcon" class="ui-input__message__icon" />
      <span class="ui-input__message__text" v-text="message" />
    </div>
  </div>
</template>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...
$num-columns: v-bind(numColumn);

/* Selector */
// style component...
.ui-input {
  display: flex;
  flex-direction: column;
  position: relative;
  &__label {
    width: fit-content;
    font-weight: 700;
    padding: 0 16px;
    color: $light-text-title;
    margin-bottom: 8px;
  }
  &__controls {
    height: 56px;
    gap: 16px;
    display: flex;
    grid-template-columns: repeat($num-columns, auto);
  }
  &__message {
    position: absolute;
    bottom: -22px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    gap: 2px;
    &__icon {
      color: $light-secondary-50;
    }
    &__text {
      font-size: 14px;
      color: $light-text-title;
    }
  }
}
.dense {
  .ui-input__controls {
    height: 42px;
  }
  .ui-input__label {
    font-size: 14px;
    margin-bottom: 6px;
  }
  .ui-input__message {
    bottom: -18px;
    &__text {
      font-size: 12px;
    }
  }
}
.error {
  .ui-input__message__icon,
  .ui-input__message__text {
    color: $light-error;
  }
}
</style>
