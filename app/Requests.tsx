const Based_API = 'https://pokeapi.co/api/v2/'; 

export async function getGenerations() {
    const res = await fetch(`${Based_API}generation`)

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json();
}

export async function getGeneration(pokemon: string) {
    const res = await fetch(`${Based_API}generation/${pokemon}`)

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export async function getPokemon(pokemon: string) {
    const res = await fetch(`${Based_API}pokemon/${pokemon}`)

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export async function getTypes(type: string) {
    const res = await fetch(`${Based_API}type/${type}`)

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}