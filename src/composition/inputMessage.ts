import { computed } from "vue";

interface Props {
  disabled: boolean;
  error: boolean;
  errorMessage?: string;
  hintMessage?: string;
}

function useInputMessage(props: Props) {
  const message = computed(() => {
    return props.error ? props.errorMessage : props.hintMessage;
  });
  const showMessage = computed(() => message.value && !props.disabled);

  return { message, showMessage };
}

export default useInputMessage;
