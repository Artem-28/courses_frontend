import { computed, Ref } from "vue";
interface Props {
  [key: string]: string;
}
function useColor(props: Props) {
  const getColorValue = computed(() => {
    switch (props.color) {
      case "primary":
        return "#5541D7";
      case "secondary":
        return "#2D96EE";
      case "accept-primary":
        return "#42BDA1";
      default:
        return "";
    }
  });
  return getColorValue;
}

export default useColor;
