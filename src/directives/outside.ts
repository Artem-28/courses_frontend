import { Directive, onMounted, onBeforeUnmount } from "vue";

let handler: (e: MouseEvent) => void;

const outside: Directive = {
  mounted(el, binding) {
    handler = (event: MouseEvent) => {
      if (!el.contains(event.target as Node)) {
        binding.value(event);
      }
    };
    document.addEventListener("click", handler);
  },
  beforeUnmount() {
    document.removeEventListener("click", handler);
  },
};

export default outside;
