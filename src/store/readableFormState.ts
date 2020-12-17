import { getContext } from "svelte";
import type { FormApi, FormState, FormSubscription } from "final-form";
import { writable, Readable } from "svelte/store";
// @ts-ignore
import { FORM } from "../Form.svelte";
import { getFormSubscriptionItems } from "../getFormSubscriptions";

export const readableFormState = <T>(
  subscription: FormSubscription = getFormSubscriptionItems(),
  form = getContext<FormApi<T>>(FORM)
) => {
  const initialValue = form.getState();

  const formStateStore = writable<FormState<T>>(initialValue);

  return {
    subscribe(...args: Parameters<Readable<FormState<T>>["subscribe"]>) {
      const unsubscribeformStateStore = formStateStore.subscribe(...args);
      const unsubscribeForm = form.subscribe(
        (formState) => formStateStore.set(formState),
        subscription
      );

      return () => {
        unsubscribeformStateStore();
        unsubscribeForm();
      };
    },
  };
};
