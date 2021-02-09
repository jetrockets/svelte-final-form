<script context="module">
  export const FORM = {};
  export const FORM_STORE = {};
</script>

<script>
  import { setContext } from "svelte";
  import { readableForm, readableFormState } from "svelte-final-form-stores";

  export let subscription;
  export let initialValues;
  export let initialValuesEqual = false;
  export let formStore = readableForm({ initialValues, ...$$restProps }, initialValuesEqual);

  const formStateStore = readableFormState($formStore, subscription);

  setContext(FORM_STORE, formStore);
  setContext(FORM, $formStore);

  $: formStore.setInitialValues(initialValues);
</script>

<slot form={$formStore} state={$formStateStore} />
