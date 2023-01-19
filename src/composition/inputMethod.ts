interface Emit {
  (e: "focus", event: FocusEvent): void;
  (e: "blur", event: FocusEvent): void;
}
function useInputMethod(emit: Emit) {
  function emitFocus(event: FocusEvent) {
    emit("focus", event);
  }
  function emitBlur(event: FocusEvent) {
    emit("blur", event);
  }

  return { emitFocus, emitBlur };
}

export default useInputMethod;
