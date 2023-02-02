<script setup lang="ts">
import { computed, defineEmits, defineProps, ref, withDefaults } from "vue";

/* Composition */
// import you composition api...
import useModel from "@/composition/model";
import useInputMessage from "@/composition/inputMessage";
import useToggle from "@/composition/toggle";

/* Components */
// import you components...
import SelectOptions from "@/components/ui/UiSelect/components/SelectOptions.vue";

/* Types */
// declare components component...
interface OptionObject {
  [key: string]: string;
}
type Option = string | null | OptionObject;
type SelectValue =
  | string
  | string[]
  | number
  | number[]
  | OptionObject
  | OptionObject[]
  | null;

interface Props {
  value: SelectValue;
  options: Option[];
  keyProp?: string;
  keyLabel?: string;
  keyValue?: string;
  disabled?: boolean;
  label?: string;
  error?: boolean;
  dense?: boolean;
  outline?: boolean;
  errorMessage?: string;
  hintMessage?: string;
  beforeIcon?: string;
  multiple?: boolean;
  clickMethodBefore?: () => void;
  cleanable?: boolean;
}
interface Emit {
  (e: "update:value", value: Option): void;
}

/* Props */
// property default value...
const props = withDefaults(defineProps<Props>(), {
  value: "",
  disabled: false,
  error: false,
  keyProp: "value",
  keyLabel: "label",
});

/* Emits */
const emit = defineEmits<Emit>();

/* Composition */
// declare you composition api...
const model = useModel(props, emit, "value");
const { message, showMessage } = useInputMessage(props);
const { isToggle, toggle } = useToggle();

/* Data */
// declare reactive variables...

/* Life hooks */
// life cycle hooks...

/* Computed */
// you computational properties...
const sizeIcon = computed(() => (props.dense ? 16 : 20));
const isFocus = computed(() => isToggle.value);
const displayClearBtn = computed(() => {
  if (!props.cleanable) {
    return false;
  }
  if (props.multiple) {
    return model.value && model.value.length;
  }
  return !!model.value;
});
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
  };
});

// Строковое значение label для отображения
const optionLabelString = computed((): string => {
  // Если не передан keyValue то отображаем значение без изменений
  if (!props.keyValue) return model.value;
  // Ищим значение для отображения из опций
  return getOptionLabelByValue(model.value);
});

// Строковое значение label для множества выбранных значений
const optionLabelMultiple = computed((): string => {
  if (!Array.isArray(model.value)) return "";
  const labels = model.value.reduce((acc, current) => {
    if (!current) return acc;

    if (typeof current === "object") {
      acc.push(current[props.keyLabel]);
      return acc;
    }
    acc.push(getOptionLabelByValue(current));
    return acc;
  }, [] as string[]);
  return labels.join(", ");
});

const optionLabel = computed((): string => {
  if (!model.value) return "";
  if (props.multiple) {
    return optionLabelMultiple.value;
  }
  if (typeof model.value === "object") {
    return model.value[props.keyLabel];
  }
  return optionLabelString.value;
});

/* Methods */
// promote your methods...
// Получение label из опций для отображения
function getOptionLabelByValue(value: string): string {
  const options = props.options;
  const option = options.find((opt) => {
    if (typeof opt === "string") {
      return opt === value;
    }
    return opt && opt[props.keyProp] === value;
  });

  if (!option) return "";

  if (typeof option === "string") {
    return option;
  }

  return option[props.keyLabel];
}
function clearValue() {
  isToggle.value = false;
  if (props.multiple) {
    model.value = [];
    return;
  }
  model.value = null;
}
</script>

<template>
  <div class="ui-select" :class="classes">
    <label v-if="label" class="ui-select__label" v-text="label" />
    <div class="ui-select__control">
      <slot name="before">
        <ui-icon
          v-if="beforeIcon"
          :name="beforeIcon"
          :class="{ clickable: isClickableSlot.before }"
        />
      </slot>
      <div class="control" @click.stop="toggle">
        <span v-text="optionLabel" />
      </div>
      <div class="actions">
        <ui-icon
          v-if="displayClearBtn"
          name="cancel_round"
          class="clickable"
          @click.stop="clearValue"
        />
        <ui-icon
          name="arrow_down"
          class="clickable"
          :class="{ rotate: isToggle }"
          @click.stop="toggle"
        />
      </div>
    </div>
    <select-options
      v-model:show="isToggle"
      v-model:select-value="model"
      :key-prop="keyProp"
      :key-label="keyLabel"
      :key-value="keyValue"
      :multiple="multiple"
      :list="options"
    />
    <div v-if="showMessage" class="ui-select__message">
      <ui-icon
        name="notice"
        :size="sizeIcon"
        class="ui-select__message__icon"
      />
      <span class="ui-select__message__text" v-text="message" />
    </div>
  </div>
</template>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...

/* Selector */
// style component...
.ui-select {
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
    position: relative;
    z-index: 10;
    height: 56px;
    padding: 0 16px;
    display: flex;
    gap: 16px;
    border-radius: 8px;
    align-items: center;
    outline: 1px solid transparent;
    background-color: $light-background-primary;
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
  .actions {
    display: flex;
    flex-wrap: nowrap;
  }
}
.outline {
  .ui-select__control {
    outline: 1px solid $light-text-body-secondary;
  }
}
.focus {
  .ui-select__control {
    outline: 1px solid $light-primary-50;
  }
}
.error {
  .ui-select__control {
    outline: 1px solid $light-error;
  }
  .ui-select__message__icon,
  .ui-select__message__text {
    color: $light-error;
  }
}
.disabled {
  .ui-select__control {
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
  .ui-select__control {
    height: 42px;
  }
  .ui-select__label {
    font-size: 14px;
    margin-bottom: 6px;
  }
  .ui-select__message {
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
.rotate {
  transform: rotate(180deg);
}
</style>
