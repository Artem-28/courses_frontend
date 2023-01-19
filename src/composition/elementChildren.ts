import { computed } from "vue";
interface MapElements {
  [key: string]: Element;
}
type Elements = Element[] | MapElements;

function useElementChildren(
  container: HTMLElement | null,
  keyMap: string | null = null
) {
  const elements = computed(() => {
    if (!container) return [];

    const children: HTMLCollection = container.children;
    const result: Elements = keyMap ? {} : [];

    for (let i = 0; i < children.length; i++) {
      const el: Element = children[i] as Element;

      if (Array.isArray(result)) {
        result.push(el);
      }
      if (keyMap && !Array.isArray(result)) {
        const keyValue = el.attributes.getNamedItem(keyMap)?.value as string;
        result[keyValue] = el;
      }
    }
    return result;
  });

  return elements.value;
}

export default useElementChildren;
