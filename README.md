# 🏁 Svelte Final Form

Svelte Final Form is a thin Svelte wrapper for [Final Form](https://final-form.org)

✅ Zero dependencies
✅ Only peer dependencies: Svelte and [🏁 Final Form](https://github.com/final-form/final-form#-final-form)
✅ Opt-in subscriptions - only update on the state you need!

---

Before we jump right into code, you might want to learn a little bit about the [philosophy](https://final-form.org/docs/react-final-form/philosophy) and origin story of Final Form.

## Installation

```bash
npm install --save final-form svelte-final-form
```

or

```bash
yarn add final-form svelte-final-form
```

### Architecture

Svelte Final Form is a thin Svelte wrapper for Final Form, which is a subscriptions-based form state management library that uses the Observer pattern.

By default, Svelte Final Form subscribes to all changes, but if you want to fine tune your form to optimized blazing-fast perfection, you may specify only the form state that you care about for rendering your gorgeous UI. You can think of it a little like GraphQL's feature of only fetching the data your component needs to render, and nothing else.

```html
<script>
  import { Form, Field } from "svelte-final-form";

  // Just for example
  import Select from "svelte-select";
  // Your custom form group adapter
  import FormGroup from "components/FormGroup";

  const selectItems = ["Green", "Red", "Black"];

  const initialValues = {
    firstName: "Alexey",
    lastName: "Solilin",
    color: "Red",
  };

  const onSubmit = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(JSON.stringify(values, undefined, 2));
  };

  const validate = (values) => {
    const errors = {};
    if (!values.firstName) {
      errors.firstName = "Required";
    }
    if (!values.lastName) {
      errors.lastName = "Required";
    }
    return errors;
  };
</script>

<Form {onSubmit} {validate} {initialValues} let:form let:state>
  <form on:submit|preventDefault={form.submit}>
    <Field name="firstName" let:input let:meta>
      <label for="firstName">First Name</label>
      <input
        name={input.name}
        on:blur={input.onBlur}
        on:focus={input.onFocus}
        on:input={(e) => input.onChange(e.target.value)}
        type="text"
        placeholder="Last Name"
        value={input.value} />
      {#if meta.touched && meta.error}
        <div>{meta.error}</div>
      {/if}
    </Field>

    <!-- You can prepare you Form Group Adapter with Label, Input, Errors -->
    <Field name="lastName" let:input let:meta>
      <FormGroup label="Last Name" type="text" {...input} {...meta} />
    </Field>

    <!-- Example for svelte-select -->
    <Field name="color" let:input let:meta>
      <Select
        items={selectItems}
        on:blur={input.onBlur}
        on:focus={input.onFocus}
        on:select={({ detail }) => input.onChange(detail.value)}
        selectedValue={input.value}
        name="color"
        />
    </Field>

    <button type="submit" disabled={state.submitting}>Submit</button>
    or
    <button disabled={state.pristine} on:click={() => form.reset(initialValues)}>Reset</button>
  </form>
</Form>
```

### TODO

- [ ] Write tests
- [ ] Final Form Arrays
- [ ] More docs and CodeSandbox examples for
  - [ ] Conditional Fields
  - [ ] Mutators
  - [ ] Decorators
  - [ ] Validation
  - [ ] Custom Form Adapters
