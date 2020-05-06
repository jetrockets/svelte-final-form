<script context="module">
  export const FORM = {};
</script>

<script>
  import { onDestroy, onMount, setContext } from "svelte";
  import { createForm, formSubscriptionItems } from "final-form";

  export let subscription = getFormSubscriptionItems();

  let state = {};
  let unsubscribe;

  const form = createForm($$restProps);

  setContext(FORM, form);

  onMount(() => {
    unsubscribe = form.subscribe(newState => {
      state = newState;
    }, subscription);
  });

  onDestroy(() => {
    unsubscribe();
  });

  function getFormSubscriptionItems() {
    return formSubscriptionItems.reduce((result, key) => {
      result[key] = true;
      return result;
    }, {});
  }
</script>

<slot {form} {state} />
