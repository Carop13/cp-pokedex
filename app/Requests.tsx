const Based_API = 'https://pokeapi.co/api/v2/'; 

export async function getGenerations() {
    const res = await fetch(`${Based_API}generation`)

    if (res.status === 404) {
        return [];
    }
    
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json();
}

export async function getGeneration(pokemon: string) {
    const res = await fetch(`${Based_API}generation/${pokemon}`)

    if (res.status === 404) {
        return [];
    }

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export async function getPokemon(pokemon: string) {
    const res = await fetch(`${Based_API}pokemon/${pokemon}`)

    if (res.status === 404) {
        return [];
    }

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export async function getTypes(type: string) { 
    const res = await fetch(`${Based_API}type/${type}`)

    if (res.status === 404) {
        return [];
    }

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export async function getSpecies(specie: string) {
    console.log('getSpecies: ', specie)
    const res = await fetch(`${Based_API}pokemon-species/${specie}`)

    if (res.status === 404) {
        return [];
    }

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export async function getEvolutions(chain: string) { 
    console.log('getEvolutions: ', chain)
    const res = await fetch(`${Based_API}evolution-chain/${chain}`)

    if (res.status === 404) {
        return [];
    }
   
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}