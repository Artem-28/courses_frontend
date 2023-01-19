import { createI18n } from "vue-i18n";

import enUS from "@/plugins/localisation/messageSchema/enUs.json";
import ruRu from "@/plugins/localisation/messageSchema/ruRu.json";

type MessageSchema = typeof enUS;

const i18n = createI18n<[MessageSchema], "en-US" | "ru-RU">({
  locale: "ru-RU",
  legacy: false,
  allowComposition: true,
  messages: {
    "ru-RU": ruRu,
    "en-US": enUS,
  },
});

export default i18n;
