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
  disabled?: boolean;
  outline?: boolean;
  square?: boolean;
  dense?: boolean;
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
const isVisible = useModel(props, emit);

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

const textColor = computed(() => {
  let color = "#FFFFFF";
  if (props.outline) {
    color = transformColor.value;
  }
  return color;
});
const iconSize = computed(() => (props.dense ? 19 : 21));
const icon = computed(() => {
  const icon = {
    left: props.iconLeft,
    right: props.iconRight,
  };
  if (isSelect.value) {
    icon.left = props.iconSelected;
  }
  return icon;
});

const isClickable = computed(() => {
  return props.clickable || props.selected !== undefined;
});

const classes = computed(() => ({
  clickable: isClickable.value,
  disabled: props.disabled,
  outline: props.outline,
  square: props.square,
  dense: props.dense,
}));

/* Methods */
// promote your methods...
function clickHandler() {
  if (props.disabled) return;
  if (props.selected !== undefined) {
    selectHandler();
  }
}
function selectHandler() {
  if (props.disabled) return;
  isSelect.value = !isSelect.value;
}
function removeHandler(event: Event) {
  if (props.disabled) return;
  event.stopPropagation();
  isVisible.value = !isVisible.value;
}
function iconRightClickHandler(event: Event) {
  console.log(event);
}
</script>

<template>
  <div v-if="isVisible" class="ui-chip" :class="classes" @click="clickHandler">
    <slot>
      <ui-icon
        v-if="icon.left"
        :name="icon.left"
        :size="iconSize"
        class="ui-chip__icon"
      />
      <div class="ui-chip__label">
        <span v-text="label" />
      </div>
      <ui-icon
        v-if="icon.right"
        :name="icon.right"
        :size="iconSize"
        class="ui-chip__icon"
        @click="iconRightClickHandler"
      />
      <ui-icon
        v-if="removable"
        :name="iconRemove"
        :size="iconSize"
        class="ui-chip__icon remove-icon"
        :class="{ removable }"
        @click="removeHandler"
      />
    </slot>
  </div>
</template>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...
$color: v-bind(transformColor);
$text-color: v-bind(textColor);

/* Selector */
// style component...
.ui-chip {
  width: fit-content;
  height: 28px;
  background-color: $color;
  color: $text-color;
  padding: 0 8px;
  border-radius: 16px;
  margin: 4px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  &__icon {
    color: $text-color;
  }
  &__label {
    font-size: 14px;
  }
}
.remove-icon {
  opacity: 0.6;
  transition: all 0.2s;
  &:hover {
    opacity: 1;
  }
}
.clickable {
  cursor: pointer;
}
.dense.ui-chip {
  height: 21px;
  padding: 0 2px;
  gap: 2px;
}
.disabled.ui-chip {
  opacity: 0.6;
  cursor: not-allowed;
  .remove-icon:hover {
    opacity: 0.6;
  }
}
.outline.ui-chip {
  background-color: transparent;
  outline: 1px solid currentColor;
}
.square.ui-chip {
  border-radius: 4px;
}
</style>
