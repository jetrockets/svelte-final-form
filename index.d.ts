import { SvelteComponent } from "svelte";
import { FieldSubscription, FormState, FormSubscription } from "final-form";

export class Form<T extends object = any> extends SvelteComponent {
  $$prop_def: {
    onSubmit: (vals: T) => void | Promise<void>;
    subscription?: FormSubscription;
    initialValues?: Partial<T>;
    initialValuesEqual?: boolean;
    keepDirtyOnReinitialize?: boolean;
    validate?: (vals: T) => T;
  };
}

export class Field extends SvelteComponent {
  $$prop_def: { name: string; subscription?: FieldSubscription; validate?: Function };
}

/*
  Formspy can also render a slot, and exports formState to be used by it:
  <FormSpy let:formState>
    {...Render something, using formState :)...}
  </FormSpy>
*/
export class FormSpy<T extends object = any> extends SvelteComponent {
  $$prop_def: {
    subscription?: FormSubscription;
    onChange?: (formState: FormState<T>) => void;
    validate?: (value: any) => any;
  };
}
