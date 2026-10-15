export function AddToCartIcon() {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' strokeWidth='1' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
            <path d='M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
            <path d='M17 17h-11v-14h-2' />
            <path d='M6 5l6 .429m7.138 6.573l-.143 1h-13' />
            <path d='M15 6h6m-3 -3v6' />
        </svg>
    )
}





export function RemoveFromCartIcon() {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' strokeWidth='1' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
            <path d='M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
            <path d='M17 17h-11v-14h-2' />
            <path d='M6 5l8 .571m5.43 4.43l-.429 3h-13' />
            <path d='M17 3l4 4' />
            <path d='M21 3l-4 4' />
        </svg>
    )
}

export function ClearCartIcon() {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' strokeWidth='1' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
            <path d='M17 17a2 2 0 1 0 2 2' />
            <path d='M17 17h-11v-11' />
            <path d='M9.239 5.231l10.761 .769l-1 7h-2m-4 0h-7' />
            <path d='M3 3l18 18' />
        </svg>
    )
}

export function CartIcon() {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' strokeWidth='1' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
            <path d='M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
            <path d='M17 17h-11v-14h-2' />
            <path d='M6 5l14 1l-1 7h-13' />
        </svg>
    )
}


export function CartIconDelete() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth=".9" stroke="#333" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 7l16 0" />
            <path d="M10 11l0 6" />
            <path d="M14 11l0 6" />
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
        </svg>
    )
}

export function PropertyFactIcon({ name }) {
    const common = {
        width: 20,
        height: 20,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.7,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": true
    };

    const icons = {
        bedrooms: <><path d="M3 20V5" /><path d="M3 14h18v6" /><path d="M5 14V9h5a3 3 0 0 1 3 3v2" /><path d="M21 14V9h-5a3 3 0 0 0-3 3" /></>,
        bathrooms: <><path d="M4 12h16v3a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z" /><path d="M7 12V6a3 3 0 0 1 6 0v1" /><path d="M5 20v1M19 20v1" /></>,
        parking: <><path d="M5 17h14l-1-7a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2z" /><path d="M7 17v2M17 17v2M5 12h14" /><path d="M10 11h4" /></>,
        area: <><path d="M4 20 20 4" /><path d="m7 17-2-2M10 14l-2-2M13 11l-2-2M16 8l-2-2" /><path d="M4 20h5M20 4v5" /></>,
        levels: <><path d="M4 20V8l8-4 8 4v12" /><path d="M8 20v-5h8v5M9 10h.01M15 10h.01" /></>,
        security: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11" /><path d="m9 12 2 2 4-4" /></>,
        residences: <><path d="M3 20V8l6-4 6 4v12M9 20v-5h6" /><path d="M15 11h6v9h-6M6 10h.01M12 10h.01M18 14h.01" /></>,
        terrace: <><path d="M3 11h18M5 11v9M19 11v9M3 20h18" /><path d="M7 11a5 5 0 0 1 10 0" /></>,
        amenity: <><path d="M12 22s7-4.5 7-11a7 7 0 0 0-14 0c0 6.5 7 11 7 11z" /><path d="M12 8v6M9 11h6" /></>
    };

    return <svg {...common}>{icons[name] || icons.amenity}</svg>;
}