import { ref } from "vue";

function useToggle(value = false, callback?: (arg: boolean) => void) {
  const isToggle = ref<boolean>(value);
  function toggle() {
    isToggle.value = !isToggle.value;
    if (callback) {
      callback(isToggle.value);
    }
  }

  return { isToggle, toggle };
}

export default useToggle;
