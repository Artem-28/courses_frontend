<script setup lang="ts">
import useToggle from "@/composition/toggle";
import { ref, reactive } from "vue";
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

/* Data */
// declare reactive variables...
const email = ref(null);
const password = ref(null);
const error = ref(false);
const selectValue = ref(null);

const selectOptionsObject = [
  { label: "option 1", value: "opt 1" },
  { label: "option 2", value: "opt 2" },
  { label: "option 3", value: "opt 3" },
  { label: "option 4", value: "opt 5" },
  { label: "option 5", value: "opt 6" },
  { label: "option 6", value: "opt 7" },
  { label: "option 7", value: "opt 8" },
  { label: "option 8", value: "opt 9" },
  { label: "option 9", value: "opt 10" },
  { label: "option 10", value: "opt 11" },
];

const chips = reactive({
  first: false,
  second: false,
});

/* Life hooks */
// life cycle hooks...

/* Computed */
// you computational properties...

/* Methods */
// promote your methods...
</script>

<template>
  <form @submit.prevent class="form-login">
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
      :placeholder="$t('placeholder.password')"
      cleanable
      multiple
      :options="selectOptionsObject"
      outline
    />
    <pre>{{ chips }}</pre>
    <ui-chip
      v-model:selected="chips.first"
      label="Add to calendar"
      icon-right="info"
      icon-left="info"
      removable
    />
    <ui-chip
      v-model:selected="chips.second"
      label="Add to calendar"
      icon-right="info"
      icon-left="info"
    />
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
