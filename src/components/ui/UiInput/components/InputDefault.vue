<script setup lang="ts">
import { withDefaults, defineProps, computed, ref, defineEmits } from "vue";

/* Composition */
// import you composition api...
import useModel from "@/composition/model";
import useInputMethod from "@/composition/inputMethod";
import useInputMessage from "@/composition/inputMessage";

/* Components */
// import you components...

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
  clickMethodBefore?: () => void;
  clickMethodAfter?: () => void;
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
  error: false,
  outline: false,
  disabled: false,
});

/* Emits */
const emit = defineEmits<Emit>();

/* Composition */
// declare you composition api...
const model = useModel(props, emit);
const { emitBlur, emitFocus } = useInputMethod(emit);
const { message, showMessage } = useInputMessage(props);

/* Data */
// declare reactive variables...
const isFocus = ref(false);
const control = ref<HTMLInputElement | null>(null);
const focusTimeout = ref<null | number>(null);

/* Life hooks */
// life cycle hooks...

/* Computed */
// you computational properties...
const classes = computed(() => {
  return {
    focus: isFocus.value,
    outline: props.outline,
    error: props.error,
    disabled: props.disabled,
    dense: props.dense,
  };
});
const isClickableSlot = computed(() => {
  return {
    before: props.clickMethodBefore,
    after: props.clickMethodAfter,
  };
});

const sizeIcon = computed(() => (props.dense ? 16 : 20));

/* Methods */
// promote your methods...
function focusHandler(event: FocusEvent) {
  isFocus.value = true;
  emitFocus(event);
}
function blurHandler(event: FocusEvent) {
  focusTimeout.value = setTimeout(() => {
    isFocus.value = false;
  }, 100);
  emitBlur(event);
}
function focus() {
  if (!control.value) return;
  control.value.focus();
}
function clickSlotHandler(type: "before" | "after") {
  if (focusTimeout.value) {
    clearInterval(focusTimeout.value);
  }
  if (type === "before" && props.clickMethodBefore) {
    props.clickMethodBefore();
  }
  if (type === "after" && props.clickMethodAfter) {
    props.clickMethodAfter();
  }
  focus();
}
</script>

<template>
  <div class="ui-input" :class="classes">
    <label v-if="label" :for="name" class="ui-input__label" v-text="label" />
    <div class="ui-input__control">
      <slot name="before">
        <ui-icon
          v-if="beforeIcon"
          :name="beforeIcon"
          :class="{ clickable: isClickableSlot.before }"
          @click="clickSlotHandler('before')"
        />
      </slot>
      <input
        v-model="model"
        ref="control"
        :id="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :type="type"
        class="control"
        @focus="focusHandler"
        @blur="blurHandler"
      />
      <slot name="after">
        <ui-icon
          v-if="afterIcon"
          :name="afterIcon"
          :class="{ clickable: isClickableSlot.after }"
          @click="clickSlotHandler('after')"
        />
      </slot>
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
  &__control {
    height: 56px;
    padding: 0 16px;
    display: flex;
    gap: 16px;
    border-radius: 8px;
    align-items: center;
    outline: 1px solid transparent;
    transition: all 0.2s;
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
  .control {
    height: 100%;
    width: 100%;
    flex-grow: 1;
    display: flex;
    align-items: center;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 120%;
    color: $light-text-title;
  }
  .control::placeholder {
    color: $light-text-body-secondary;
  }
}
.outline {
  .ui-input__control {
    outline: 1px solid $light-text-body-secondary;
  }
}
.focus {
  .ui-input__control {
    outline: 1px solid $light-primary-50;
  }
}
.error {
  .ui-input__control {
    outline: 1px solid $light-error;
  }
  .ui-input__message__icon,
  .ui-input__message__text {
    color: $light-error;
  }
}
.disabled {
  .ui-input__control {
    outline: 1px solid $light-primary-10;
    background-color: $light-primary-10;
    cursor: not-allowed;
  }
  .control {
    color: $light-text-body-primary;
    cursor: not-allowed;
  }
  .control::placeholder {
    color: $light-text-body-secondary;
  }
}
.dense {
  .ui-input__control {
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
  .control {
    font-size: 14px;
  }
}
.clickable {
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    color: $light-primary-50;
  }
}
</style>
