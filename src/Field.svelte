<script>
  import { getContext, onDestroy, onMount } from "svelte";
  import { fieldSubscriptionItems } from "final-form";
  import { FORM } from "./Form.svelte";

  const defaultParse = (value) => (value === "" ? undefined : value);

  export let name,
    subscription = getFieldSubscriptionItems(),
    validate = undefined,
    parse = defaultParse;

  let meta = {};
  let input = {};
  let unsubscribe;

  const form = getContext(FORM);

  if (process.env.NODE_ENV !== "production" && !form) {
    throw new Error(
      "Could not find svelte-final-form context value. Please ensure that your Field is inside the Form component.",
    );
  }

  onMount(() => {
    unsubscribe = form.registerField(
      name,
      (fieldState) => {
        const { blur, change, focus, value, ...fieldMeta } = fieldState;

        meta = fieldMeta;

        input = {
          name,
          onBlur: blur,
          onChange: (val) => {
            change(parse(val, name));
          },
          onFocus: focus,
          value: value === undefined ? "" : value,
        };
      },
      subscription,
      {
        getValidator: () => validate,
      },
    );
  });

  onDestroy(() => {
    unsubscribe();
  });

  function getFieldSubscriptionItems() {
    return fieldSubscriptionItems.reduce((result, key) => {
      result[key] = true;
      return result;
    }, {});
  }
</script>

<slot {meta} {input} />
