import { SvelteComponent } from "svelte";
import type { FieldSubscription, FormState, FormSubscription } from "final-form";

export class Form<T> extends SvelteComponent {
  $$prop_def: {
    onSubmit: (vals: T) => void | Promise<void>;
    subscription?: FormSubscription;
    initialValues?: Partial<T>;
    keepDirtyOnReinitialize?: boolean;
  };
}

export class Field extends SvelteComponent {
  $$prop_def: { name: string; subscription?: FieldSubscription };
}
