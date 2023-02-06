import { ref } from "vue";

function useToggle(value = false, lock = false) {
  const isToggle = ref<boolean>(value);
  function toggle() {
    if (lock) return;
    isToggle.value = !isToggle.value;
  }

  return { isToggle, toggle };
}

export default useToggle;
