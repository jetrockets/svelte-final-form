import { Config, createForm } from "final-form";
import { writable } from "svelte/store";
import shallowEqual from "../shallowEqual";

export const readableForm = <T>(
  config: Config<T>,
  initialValuesEqual = shallowEqual,
) => {
  let initialValues = config.initialValues;
  const form = createForm<T>(config);
  const formStore = writable(form);

  return {
    subscribe: formStore.subscribe,
    setInitialValues: (nextInitialValues: T) => {
      if (!initialValuesEqual(initialValues, nextInitialValues)) {
        initialValues = nextInitialValues;
        form.setConfig("initialValues", nextInitialValues);
      }
    },
  };
};
