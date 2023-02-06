<script setup lang="ts">
import { computed, defineEmits, defineProps, ref, withDefaults } from "vue";
import isEqual from "@/helpers/isEqual";

/* Composition */
// import you composition api...
import useModel from "@/composition/model";
import useInputMessage from "@/composition/inputMessage";
import useToggle from "@/composition/toggle";
import useDropDown from "@/composition/dropDown";

/* Components */
// import you components...

/* Types */
// declare components component...
interface OptionObject {
  [key: string]: string;
}
interface SelectOption {
  value: Option;
  label: string;
  prop: number | string;
}
interface SelectedMap {
  [key: string | number]: SelectOption;
}
type Option = string | OptionObject;
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
  keyLabel?: string;
  keyValue?: string;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  error?: boolean;
  dense?: boolean;
  outline?: boolean;
  errorMessage?: string;
  hintMessage?: string;
  beforeIcon?: string;
  multiple?: boolean;
  clickMethodBefore?: () => void;
  cleanable?: boolean;
  hideDropdownIcon?: boolean;
  optionHeight?: string | number;
  transitionDuration?: number;
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
  keyLabel: "label",
  hideDropdownIcon: false,
});

/* Emits */
const emit = defineEmits<Emit>();

/* Data */
// declare reactive variables...
const optionsContainer = ref<HTMLDivElement | null>(null);

/* Composition */
// declare you composition api...
const model = useModel(props, emit, "value");
const { message, showMessage } = useInputMessage(props);
const { isToggle, toggle } = useToggle(false, props.disabled);
const open = useDropDown(optionsContainer, isToggle, {
  maxHeight: props.optionHeight,
  duration: props.transitionDuration,
});

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

const showPlaceholder = computed((): boolean => {
  const isSelectedValue = !!Object.keys(selectedOptionMap.value).length;
  return !isSelectedValue && !!props.placeholder;
});
// Строковое значение лейблов выбранных опций
const optionLabel = computed((): string => {
  const selectedOptions = selectedOptionMap.value as SelectedMap;
  const labels = Object.values(selectedOptions).map((opt) => opt.label);
  return labels.join(", ");
});

// Мапа выбранных опций
const selectedOptionMap = computed(() => {
  if (!model.value) return {};

  // Если значение является массивом
  if (Array.isArray(model.value)) {
    return model.value.reduce((acc, current) => {
      const option = getSelectOptionByValue(current);
      if (!option) return acc;
      acc[option.prop] = option;
      return acc;
    }, {} as SelectedMap);
  }
  // Если является объектом
  const option = getSelectOptionByValue(model.value);
  if (!option) return {};
  return { [option.prop]: option };
});

// Приводим опции к единому виду
const selectOptions = computed(() => {
  return props.options.reduce((acc, current, index) => {
    // Если опция является неопределена
    if (!current) return acc;
    // Если опция является объектом
    if (typeof current === "object") {
      acc.push(transformObjectIntoOption(current, index));
      return acc;
    }
    // Если опция является строкой
    acc.push(transformStringIntoOption(current, index));
    return acc;
  }, [] as SelectOption[]);
});

/* Methods */
// promote your methods...
// Получение опции по переданному значению
function getSelectOptionByValue(value: Option) {
  if (!value) return null;
  return selectOptions.value.find((opt) => isEqual(opt.value, value));
}

// Трансвормирование объекта в опцию
function transformObjectIntoOption(
  option: OptionObject,
  index: number
): SelectOption {
  return {
    label: option[props.keyLabel],
    value: props.keyValue ? option[props.keyValue] : option,
    prop: index,
  };
}

// Трансформирование строки в опцию
function transformStringIntoOption(option: string, index: number) {
  return {
    label: option,
    value: option,
    prop: index,
  };
}

// Обработчик выбора элемента опции
function handlerSelectItem(option: SelectOption): void {
  // Если опция уже выбрана
  if (isActiveOption(option.prop)) {
    removeValueHandler(option.prop);
    return;
  }

  // Если мультисклкт
  if (props.multiple) {
    updateValueMultiple(option.value);
    return;
  }
  model.value = option.value;
  toggle();
}

// Обновление значений мультиселект
function updateValueMultiple(optionValue: Option) {
  if (Array.isArray(model.value)) {
    model.value.push(optionValue);
    return;
  }
  model.value = [optionValue];
}

// Обработчик удаления выбранной опции
function removeValueHandler(propKey: string | number) {
  const selectedOptions = { ...selectedOptionMap.value } as SelectedMap;
  delete selectedOptions[propKey];
  const values = Object.values(selectedOptions).map((opt) => opt.value);
  if (props.multiple) {
    model.value = values;
    return;
  }
  if (!values.length) {
    model.value = null;
  }
  const [value] = values;
  model.value = value;
}

// Проверяет является ли опция активной
function isActiveOption(propKey: string | number) {
  return Object.prototype.hasOwnProperty.call(selectedOptionMap.value, propKey);
}
// Удаление всех выбранных значений
function clearValue() {
  if (props.multiple) {
    model.value = [];
    return;
  }
  model.value = null;
}
function outsideHandler() {
  isToggle.value = false;
}
</script>

<template>
  <div v-outside="outsideHandler" class="ui-select" :class="classes">
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
        <span
          v-if="showPlaceholder"
          class="control__placeholder"
          v-text="placeholder"
        />
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
          v-if="!hideDropdownIcon"
          name="arrow_down"
          class="clickable"
          :class="{ rotate: isToggle }"
          @click.stop="toggle"
        />
      </div>
    </div>
    <div class="ui-select__options">
      <ul ref="optionsContainer" v-if="open" class="options">
        <li
          v-for="option in selectOptions"
          :key="option.prop"
          class="options__item"
          :class="{ active: isActiveOption(option.prop) }"
          @click="handlerSelectItem(option)"
        >
          <span v-text="option.label" />
        </li>
      </ul>
    </div>
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
    z-index: 20;
    padding: 16px;
    display: flex;
    gap: 16px;
    border-radius: 8px;
    align-items: center;
    outline: 1px solid transparent;
    background-color: $light-background-primary;
    transition: all 0.2s;
  }
  &__options {
    position: relative;
    height: 0;
    width: 100%;
    bottom: 5px;
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
    line-height: 100%;
    color: $light-text-title;
    &__placeholder {
      color: $light-text-body-secondary;
    }
  }
  .actions {
    display: flex;
    flex-wrap: nowrap;
  }
}
.options {
  position: absolute;
  width: 100%;
  outline: 1px solid $light-text-body-secondary;
  border-radius: 0 0 8px 8px;
  list-style: none;
  z-index: 10;
  &__item {
    padding: 16px 16px;
    background-color: $light-background-primary;
    cursor: pointer;
    transition: all 0.2s;
  }
  &__item:not(:last-child) {
    border-bottom: 1px solid $light-background-primary;
  }
  &__item.active {
    background-color: $light-primary-10;
    color: $light-primary-50;
  }
  &__item:not(.active):hover {
    background-color: $light-progress;
  }
  &__item:first-child {
    padding-top: 21px;
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
    &__placeholder {
      color: $light-text-body-secondary;
    }
  }
  .clickable {
    cursor: not-allowed;
    &:hover {
      color: $light-text-body-secondary;
    }
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
