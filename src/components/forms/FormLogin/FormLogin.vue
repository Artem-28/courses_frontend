<script setup lang="ts">
import { ref } from "vue";
import UiSelect from "@/components/ui/UiSelect/UiSelect.vue";
import useToggle from "@/composition/toggle";
import UiIcon from "@/components/ui/UiIcon/UiIcon.vue";

/* Composition */
// import you composition api...

/* Components */
// import you components...

/* Types */
// declare components component...

/* Props */
// property default value...

/* Emits */

/* Composition */
// declare you composition api...
const { isToggle, toggle } = useToggle();

/* Data */
// declare reactive variables...
const email = ref(null);
const password = ref(null);
const error = ref(false);
const selectValue = ref(null);
const selectOptions = [
  "option 1",
  "option 2",
  "option 3",
  "option 4",
  "option 5",
];
const selectOptionsObject = [
  { label: "option 1", value: "opt 1" },
  { label: "option 2", value: "opt 2" },
  { label: "option 3", value: "opt 3" },
  { label: "option 4", value: "opt 5" },
  { label: "option 5", value: "opt 6" },
];
const selectOptionsCustomLabel = [
  { name: "option 1", value: 1 },
  { name: "option 2", value: 2 },
  { name: "option 3", value: 3 },
  { name: "option 4", value: 4 },
  { name: "option 5", value: 5 },
];

/* Life hooks */
// life cycle hooks...

/* Computed */
// you computational properties...

/* Methods */
// promote your methods...
</script>

<template>
  <form @submit.prevent class="form-login">
    <ui-icon name="twitter" />
    <ui-input
      v-model="email"
      name="email"
      :label="$t('base.email')"
      :placeholder="$t('placeholder.email')"
      outline
    />
    <ui-input
      v-model="password"
      name="password"
      type="password"
      :label="$t('base.password')"
      :placeholder="$t('placeholder.password')"
      error-message="Error message"
      :error="error"
      outline
    />
    <ui-select
      v-model:value="selectValue"
      :label="$t('base.password')"
      key-label="name"
      key-value="value"
      :options="selectOptionsCustomLabel"
      outline
    />
    <pre>{{ selectValue }}</pre>
  </form>
</template>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...

/* Selector */
// style component...
.form-login {
  width: 100%;
  padding: 40px 104px 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
