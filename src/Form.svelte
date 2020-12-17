<script context="module">
  export const FORM = {};
  export const FORM_STORE = {};
</script>

<script>
  import { setContext } from "svelte";

  import {readableForm} from './store/readableForm';
  import { readableFormState } from "./store/readableFormState";

  export let subscription;
  export let initialValues;
  export let initialValuesEqual;

  const formStore = readableForm({ initialValues, ...$$restProps }, initialValuesEqual);
  const formStateStore = readableFormState(subscription, $formStore);

  setContext(FORM_STORE, formStore);
  setContext(FORM, $formStore);

  $: formStore.setInitialValues(initialValues);
</script>

<slot form={$formStore} state={$formStateStore} />
