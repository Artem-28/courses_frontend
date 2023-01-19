<script setup lang="ts">
import { ref } from "vue";

/* Composition */
// import you composition api...
import { useI18n } from "vue-i18n";

/* Components */
// import you components...
import FormLogin from "@/components/forms/FormLogin/FormLogin.vue";
import FormRegistration from "@/components/forms/FormRegistration/FormRegistration.vue";

/* Types */
// declare components component...

/* Props */
// property default value...

/* Emits */

/* Composition */
// declare you composition api...
const { t } = useI18n();

/* Data */
// declare reactive variables...
const tabs = [
  { label: t("base.login"), value: "login" },
  { label: t("base.registration"), value: "registration" },
];
const activeTab = ref("login");

/* Life hooks */
// life cycle hooks...

/* Computed */
// you computational properties...

/* Methods */
// promote your methods...
</script>

<template>
  <div class="auth-page">
    <ui-tabs v-model="activeTab" :tabs="tabs" fill />
    <ui-tabs-panel v-model="activeTab">
      <template v-slot:login>
        <FormLogin />
      </template>

      <template v-slot:registration>
        <FormRegistration />
      </template>
    </ui-tabs-panel>
  </div>
</template>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...

/* Selector */
// style component...
.auth-page {
  padding-top: 218px;
}
</style>
