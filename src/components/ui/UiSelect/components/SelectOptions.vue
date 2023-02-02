<script setup lang="ts">
import {
  computed,
  defineEmits,
  defineProps,
  withDefaults,
  Transition,
  ref,
} from "vue";

/* Composition */
// import you composition api...
import useModel from "@/composition/model";
import useDropDown from "@/composition/dropDown";

/* Components */
// import you components...

/* Types */
// declare components component...
interface OptionObject {
  [key: string]: string;
}
interface OptionFormat {
  value: Option;
  prop: string;
  label: string;
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
  show: boolean;
  selectValue: SelectValue;
  list: Option[];
  keyProp: string;
  keyLabel: string;
  keyValue?: string;
  multiple?: boolean;
  maxHeight?: string | number;
}
interface Emit {
  (e: "update:show", value: boolean): void;
  (e: "update:selectValue", value: SelectValue): void;
}

/* Props */
// property default value...
const props = withDefaults(defineProps<Props>(), {
  show: false,
  maxHeight: "100vh",
});

/* Emits */
const emit = defineEmits<Emit>();

/* Data */
// declare reactive variables...
const content = ref<HTMLDivElement | null>(null);

/* Composition */
// declare you composition api...
const modelShow = useModel(props, emit, "show");
const modelSelectValue = useModel(props, emit, "selectValue");
const open = useDropDown(content, modelShow);

/* Life hooks */
// life cycle hooks...

/* Computed */
// you computational properties...
const maxHeightOptions = computed((): string => leadToPixel(props.maxHeight));

const activeSelectProp = computed((): string[] => {
  const value = modelSelectValue.value;
  // Если значение не является массивом
  if (!Array.isArray(value)) {
    return [getPropFromOption(value)];
  }
  // Если значение является массивом
  return value.map((val) => getPropFromOption(val));
});

const options = computed(() => {
  return props.list.reduce((acc, current) => {
    // Если опция является неопределена
    if (!current) return acc;
    // Если опция является объектом
    if (typeof current === "object") {
      acc.push(transformOptionObject(current));
      return acc;
    }
    // Если опция является строкой
    acc.push(transformOptionString(current));
    return acc;
  }, [] as OptionFormat[]);
});

/* Methods */
// promote your methods...
function leadToPixel(value: any): string {
  switch (typeof value) {
    case "number":
      return `${value}px`;
    default:
      return value;
  }
}
function getPropFromOption(option: Option): string {
  if (!option) return "";
  switch (typeof option) {
    case "object":
      return option[props.keyProp];
    case "string":
    case "number":
      return option;
    default:
      return "";
  }
}

function updateValueMultiple(optionValue: Option) {
  if (Array.isArray(modelSelectValue.value)) {
    modelSelectValue.value.push(optionValue);
    return;
  }
  modelSelectValue.value = [optionValue];
}
// Удаление значение из уже выбранных
function removeValueHandler(optionValue: Option): void {
  const value = optionValue;
  // Если выбранное знвачение не является массивом
  if (!Array.isArray(modelSelectValue.value)) {
    // то просто удаляем это значение
    modelSelectValue.value = null;
    return;
  }
  // Если выбранное значение является массивом
  modelSelectValue.value = modelSelectValue.value.filter((val) => {
    // Если масив соостоит из строковых значений
    // Возвращаем все значения которые не совпадают с текущим
    if (typeof val === "string" || typeof val === "number") {
      return val !== value;
    }
    // Если массив состоит из объектов
    // Если был передан keyValue то находим значение по ключу
    if (props.keyValue) {
      return val[props.keyValue] !== value;
    }
    // Преобразовываем значения в строку и сравниваем
    return JSON.stringify(val) !== JSON.stringify(value);
  });
}
function handlerSelectItem(option: OptionFormat): void {
  const value = option.value;
  // Если выбрана уже активная опция
  if (isActiveOption(option.prop)) {
    removeValueHandler(value);
    return;
  }
  if (props.multiple) {
    updateValueMultiple(value);
    return;
  }
  modelSelectValue.value = value;
  modelShow.value = false;
}
function isActiveOption(prop: string): boolean {
  return activeSelectProp.value.includes(prop);
}
function transformOptionString(option: string) {
  return { label: option, prop: option, value: option };
}
function transformOptionObject(option: OptionObject) {
  return {
    label: option[props.keyLabel],
    prop: option[props.keyProp],
    value: props.keyValue ? option[props.keyValue] : option,
  };
}
function outsideHandler() {
  modelShow.value = false;
}
</script>

<template>
  <div v-outside="outsideHandler" class="options-wrapper">
    <ul ref="content" v-if="open" class="select-options">
      <li
        v-for="(opt, index) in options"
        :key="index"
        class="select-options__item"
        :class="{ active: isActiveOption(opt.prop) }"
        @click="handlerSelectItem(opt)"
      >
        <span v-text="opt.label" />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...
$max-height-options: v-bind(maxHeightOptions);

/* Selector */
// style component...
.options-wrapper {
  position: relative;
  height: 0;
  width: 100%;
  bottom: 5px;
}
.select-options {
  position: absolute;
  width: 100%;
  outline: 1px solid $light-text-body-secondary;
  border-radius: 0 0 8px 8px;
  list-style: none;
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
</style>
