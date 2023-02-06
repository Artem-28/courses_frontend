import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import i18n from "@/plugins/localisation/i18n";

// Directives
import outside from "@/directives/outside";

// Components
import UiTabs from "@/components/ui/UiTabs/UiTabs.vue";
import UiTabsPanel from "@/components/ui/UiTabsPanel/UiTabsPanel.vue";
import UiIcon from "@/components/ui/UiIcon/UiIcon.vue";
import UiInput from "@/components/ui/UiInput/UiInput.vue";
import UiInputCode from "@/components/ui/UIInputCode/UiInputCode.vue";
import UiChip from "@/components/ui/UiChip/UiChip.vue";
import UiSelect from "@/components/ui/UiSelect/UiSelect.vue";

const app = createApp(App);
app.directive("outside", outside);
app.use(router);
app.use(i18n);
app.component("UiTabs", UiTabs);
app.component("UiTabsPanel", UiTabsPanel);
app.component("UiIcon", UiIcon);
app.component("UiInput", UiInput);
app.component("UiInputCode", UiInputCode);
app.component("UiChip", UiChip);
app.component("UiSelect", UiSelect);
app.mount("#app");
