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
const email = ref(null);
const password = ref(null);
const error = ref(false);

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
