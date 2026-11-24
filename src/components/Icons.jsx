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
        amenity: <><path d="M12 22s7-4.5 7-11a7 7 0 0 0-14 0c0 6.5 7 11 7 11z" /><path d="M12 8v6M9 11h6" /></>,
        // Amenity icons based on Tabler Icons (MIT)
        pool: <><path d="M2 20a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2-1a2.4 2.4 0 0 1 2-1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2-1a2.4 2.4 0 0 1 2-1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2-1" /><path d="M2 16a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2-1a2.4 2.4 0 0 1 2-1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2-1a2.4 2.4 0 0 1 2-1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2-1" /><path d="M15 12V4.5a1.5 1.5 0 0 1 3 0" /><path d="M9 12V4.5a1.5 1.5 0 0 0-3 0" /><path d="M15 5H9" /><path d="M9 10h6" /></>,
        jacuzzi: <><path d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3a1 1 0 0 1 1-1" /><path d="M6 12V5a2 2 0 0 1 2-2h3v2.25" /><path d="M4 21l1-1.5" /><path d="M20 21l-1-1.5" /></>,
        gym: <><path d="M2 12h1" /><path d="M6 8H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2" /><path d="M6 7v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1" /><path d="M9 12h6" /><path d="M15 7v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1" /><path d="M18 8h2a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-2" /><path d="M22 12h-1" /></>,
        sauna: <><path d="M12 10.941c2.333-3.308.167-7.823-1-8.941 0 3.395-2.235 5.299-3.667 6.706-1.43 1.408-2.333 3.294-2.333 5.588 0 3.704 3.134 6.706 7 6.706 3.866 0 7-3.002 7-6.706 0-1.712-1.232-4.403-2.333-5.588-2.084 3.353-3.257 3.353-4.667 2.235" /></>,
        coworking: <><path d="M3 19h18" /><path d="M5 7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7" /></>,
        meeting: <><path d="M3 4h18" /><path d="M4 4v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4" /><path d="M12 16v4" /><path d="M9 20h6" /><path d="m8 12 3-3 2 2 3-3" /></>,
        elevator: <><path d="M5 5a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5" /><path d="m10 10 2-2 2 2" /><path d="m10 14 2 2 2-2" /></>,
        yoga: <><path d="M4 20h4l1.5-3" /><path d="M17 20l-1-5h-5l1-7" /><path d="m4 10 4-1 4-1 4 1.5 4 1.5" /><path d="M10.007 5a2 2 0 1 0 4 0a2 2 0 1 0-4 0" /></>,
        dogPark: <><path d="M11 5h2" /><path d="M19 12c-.667 5.333-2.333 8-5 8h-4c-2.667 0-4.333-2.667-5-8" /><path d="M11 16c0 .667.333 1 1 1s1-.333 1-1h-2" /><path d="M12 18v2" /><path d="M10 11v.01" /><path d="M14 11v.01" /><path d="m5 4 6 .97-6.238 6.688a1.021 1.021 0 0 1-1.41.111.953.953 0 0 1-.327-.954L5 4" /><path d="m19 4-6 .97 6.238 6.688c.358.408.989.458 1.41.111a.953.953 0 0 0 .327-.954L19 4" /></>,
        lounge: <><path d="M4 11a2 2 0 0 1 2 2v1h12v-1a2 2 0 1 1 4 0v5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-5a2 2 0 0 1 2-2" /><path d="M4 11V8a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v3" /><path d="M12 5v9" /></>,
        library: <><path d="M5 5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5" /><path d="M9 5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V5" /><path d="M5 8h4" /><path d="M9 16h4" /><path d="m13.803 4.56 2.184-.53c.562-.135 1.133.19 1.282.732l3.695 13.418a1.02 1.02 0 0 1-.634 1.219l-.133.041-2.184.53c-.562.135-1.133-.19-1.282-.732L13.036 5.779a1.02 1.02 0 0 1 .634-1.219l.133-.041" /><path d="m14 9 4-1" /><path d="m16 16 3.923-.98" /></>,
        games: <><path d="M12 5h3.5a5 5 0 0 1 0 10H10l-4.015 4.227a2.3 2.3 0 0 1-3.923-2.035l1.634-8.173A5 5 0 0 1 8.6 5H12" /><path d="m14 15 4.07 4.284a2.3 2.3 0 0 0 3.925-2.023l-1.6-8.232" /><path d="M8 9v2" /><path d="M7 10h2" /><path d="M14 10h2" /></>,
        party: <><path d="M4 5h2" /><path d="M5 4v2" /><path d="m11.5 4-.5 2" /><path d="M18 5h2" /><path d="M19 4v2" /><path d="m15 9-1 1" /><path d="m18 13 2-.5" /><path d="M18 19h2" /><path d="M19 18v2" /><path d="m14 16.518-6.518-6.518-4.39 9.58a1 1 0 0 0 1.329 1.329l9.579-4.39" /></>,
        bbq: <><path d="M19 8H5a6 6 0 0 0 6 6h2a6 6 0 0 0 6-5.775V8" /><path d="M17 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4" /><path d="m15 14 1 2" /><path d="m9 14-3 6" /><path d="M15 18H7" /><path d="M15 5V4" /><path d="M12 5V4" /><path d="M9 5V4" /></>,
        firepit: <><path d="m4 21 16-4" /><path d="m20 21-16-4" /><path d="M12 15a4 4 0 0 0 4-4c0-3-2-3-2-8-4 2-6 5-6 8a4 4 0 0 0 4 4" /></>,
        climate: <><path d="M8 16a3 3 0 0 1-3 3" /><path d="M16 16a3 3 0 0 0 3 3" /><path d="M12 16v4" /><path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7" /><path d="M7 13V10a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3" /></>,
        store: <><path d="M3 21h18" /><path d="M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7H3l2-4h14l2 4" /><path d="M5 21V10.85" /><path d="M19 21V10.85" /><path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4" /></>,
        lobby: <><path d="M3 21h18" /><path d="M9 8h1" /><path d="M9 12h1" /><path d="M9 16h1" /><path d="M14 8h1" /><path d="M14 12h1" /><path d="M14 16h1" /><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" /></>,
        furnished: <><path d="M5 11a2 2 0 0 1 2 2v2h10v-2a2 2 0 1 1 4 0v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2" /><path d="M5 11V6a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v5" /><path d="M6 19v2" /><path d="M18 19v2" /></>
    };

    return <svg {...common}>{icons[name] || icons.amenity}</svg>;
}