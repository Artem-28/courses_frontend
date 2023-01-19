<script setup lang="ts">
import { ref } from "vue";

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
const name = ref<null | string>(null);
const email = ref<null | string>(null);
const password = ref<null | string>(null);
const confirmPassword = ref<null | string>(null);
const code = ref<string>("");
const error = ref(false);

/* Life hooks */
// life cycle hooks...

/* Computed */
// you computational properties...

/* Methods */
// promote your methods...
</script>

<template>
  <form class="form-registration" @submit.prevent>
    <ui-input
      v-model="name"
      name="name"
      :label="$t('base.name')"
      :placeholder="$t('placeholder.name')"
      outline
    />
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
      outline
    />
    <ui-input
      v-model="confirmPassword"
      name="confirmPassword"
      type="password"
      :label="$t('base.password_confirm')"
      :placeholder="$t('placeholder.password_confirm')"
      outline
    />
    <ui-input-code
      v-model="code"
      mask="#-#-#-#-#-#"
      :label="$t('base.confirm_code')"
    />
  </form>
</template>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...

/* Selector */
// style component...
.form-registration {
  width: 100%;
  padding: 40px 104px 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
