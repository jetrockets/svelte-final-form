import { formSubscriptionItems } from "final-form";

export function getFormSubscriptionItems() {
    return formSubscriptionItems.reduce((result, key) => {
        result[key] = true;
        return result;
    }, {});
}