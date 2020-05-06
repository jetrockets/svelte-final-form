<script>
  import { getContext, onDestroy, onMount } from "svelte";
  import { fieldSubscriptionItems } from "final-form";
  import { FORM } from "./Form.svelte";

  export let name,
    subscription = getFieldSubscriptionItems();

  let meta = {};
  let input = {};
  let unsubscribe;

  const form = getContext(FORM);

  if (process.env.NODE_ENV !== "production" && !form) {
    throw new Error(
      "Could not find svelte-final-form context value. Please ensure that your Field is inside the Form component."
    );
  }

  onMount(() => {
    unsubscribe = form.registerField(
      name,
      fieldState => {
        const { blur, change, focus, value, ...fieldMeta } = fieldState;

        meta = fieldMeta;

        input = {
          name,
          onBlur: blur,
          onChange: change,
          onFocus: focus,
          value: value === undefined ? "" : value
        };
      },
      subscription
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
