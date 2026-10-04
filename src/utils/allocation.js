import {
    COUNTER_CODES,
    KITCHEN_CODES,
    ALL_LOCATION_CODES,
    locationLabel} from "../constants/location.constants.js" 

import ApiError from "./ApiError.js"

const COUNTERS_FIELD = "counterAllocations";
const KITCHENS_FIELD = "kitchenAllocations";

const qtyIn = (inventory, field, code) => {
    const allocations = inventory?.[field];

    if (!allocations) return 0;

    const value =
        typeof allocations.get === "function"
            ? allocations.get(code)
            : allocations[code];

    const n = Number(value);

    return Number.isFinite(n) ? n : 0;
};

const setQtyIn = (inventory, field, code, qty, {allowNegative = false} = {}) => {
    const n = Number(qty);
    const raw = Number.isFinite(n) ? n : 0;
    const value = allowNegative ? raw : Math.max(0, raw);

    if (typeof inventory[field]?.set === "function") {
        inventory[field].set(code, value);
    } else {
        inventory[field] = {...(inventory[field] || {})
        , [code]: value};
    }

    return value;
};