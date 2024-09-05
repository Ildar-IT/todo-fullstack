export const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const formInputsValidate = (form: HTMLFormElement) => {
  for (const el of form.elements as HTMLElement) {
    if (el.tagName === "INPUT") {
      const required = el.hasAttribute("data-required");
      if (required && !(el.value || el.checked)) {
        el.setCustomValidity(
          el.getAttribute("title") ?? "Необходимо заполнить это поле"
        );
        el.reportValidity();
        return false;
      }
      if (el.validity.customError) {
        el.reportValidity();
        return false;
      }
    }
  }

  return form.reportValidity();
};
