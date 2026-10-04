const FLOOR_MARK = { 
    3: "₃", 
    7: "₇" 
};

const floors = [ 
    { 
        floor: 3, 
        label: "3rd Floor" 
    }, 
    { 
        floor: 7, 
        label: "7th Floor" 
    } 
]; 

const build = (kind, prefix, noun) =>
    Object.freeze(
        floors.map((f) =>
            Object.freeze({
                kind,
                code: `${prefix}${f.floor}`,
                letter: prefix,
                label: `${prefix}${FLOOR_MARK[f.floor] ?? f.floor}`,
                name: `${f.label} ${noun}`,
                floor: f.floor
            })
        )
    );


export const COUNTER_LOCATIONS = build("counter", "C", "Canteen");
export const KITCHEN_LOCATIONS = build("kitchen", "K", "Kitchen");

export const COUNTER_CODES = Object.freeze(COUNTER_LOCATIONS.map((c) => c.code));
export const KITCHEN_CODES = Object.freeze(KITCHEN_LOCATIONS.map((k) => k.code));

export const ALL_LOCATIONS = Object.freeze([...COUNTER_LOCATIONS, ...KITCHEN_LOCATIONS]);
export const ALL_LOCATION_CODES = Object.freeze(ALL_LOCATIONS.map((l) => l.code));

export const isCounterCode = (code) => COUNTER_CODES.includes(code);
export const isKitchenCode = (code) => KITCHEN_CODES.includes(code);

export const locationByCode = (code) =>
    ALL_LOCATIONS.find((l) => l.code === code) || null;

export const counterByCode = (code) =>
    COUNTER_LOCATIONS.find((c) => c.code === code) || null;
export const kitchenByCode = (code) =>
    KITCHEN_LOCATIONS.find((k) => k.code === code) || null;


export const locationLabel = (code)=>{
    const location = locationByCode(code)
    
    return location?`${location.name} (${location.label})`
    :code;
}

export const counterLabel = locationLabel
export const kitchenLabel = locationLabel