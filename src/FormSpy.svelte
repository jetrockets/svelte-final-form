<script>
  import { getContext, onDestroy } from "svelte";
  import { FORM } from "svelte-final-form/src/Form.svelte";
  import { getFormSubscriptionItems } from "./getFormSubscriptions";

  export let subscription = getFormSubscriptionItems();
  export let onChange;

  let formState = {};
  let unsubscribe;

  const form = getContext(FORM);

  if (process.env.NODE_ENV !== "production" && !form) {
    throw new Error(
      "Could not find svelte-final-form context value. Please ensure that your FormSpy is inside the Form component.",
    );
  }

  $: {
    unsubscribe && unsubscribe();
    unsubscribe = form.subscribe((nextFormState) => {
      onChange && onChange(nextFormState);
      formState = nextFormState;
    }, subscription);
  }

  onDestroy(() => {
    unsubscribe && unsubscribe();
  });
</script>

{#if $$slots.default}
  <slot {formState} />
{/if}
