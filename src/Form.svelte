<script context="module">
  export const FORM = {};
</script>

<script>
  import { onDestroy, onMount, setContext } from "svelte";
  import { createForm, formSubscriptionItems } from "final-form";

  import whenValueChanges from "./whenValueChanges";
  import shallowEqual from "./shallowEqual";

  export let subscription = getFormSubscriptionItems();
  export let initialValues;
  export let initialValuesEqual;

  let state = {};
  let unsubscribe;

  const form = createForm({ initialValues, ...$$restProps });

  setContext(FORM, form);

  onMount(() => {
    unsubscribe = form.subscribe((newState) => {
      state = newState;
    }, subscription);
  });

  onDestroy(() => {
    unsubscribe && unsubscribe();
  });

  function getFormSubscriptionItems() {
    return formSubscriptionItems.reduce((result, key) => {
      result[key] = true;
      return result;
    }, {});
  }

  const whenInitialValuesChanges = whenValueChanges(
    initialValues,
    () => form.setConfig("initialValues", initialValues),
    initialValuesEqual || shallowEqual,
  );

  $: whenInitialValuesChanges(initialValues);
</script>

<slot {form} {state} />
