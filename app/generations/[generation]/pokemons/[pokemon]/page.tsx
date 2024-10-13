import { getPokemon, getSpecies, getEvolutions, getTypes } from "@/app/Requests";
import { List } from "@/app/ui/List/List";
import { getTypesSprites } from "@/app/utilities/type-sprite";
import Link from "next/link";

export default async function Page({params}: {params: {pokemon: string}}) {
    const pokemon = await getPokemon(params.pokemon);
    const pokemonSpecies = pokemon?.id ? await getSpecies(pokemon.id) : [];

    const getId = (link: string): string => {
        const linkId: string = link.split('/')[6];
        return `${linkId}` 
    } 

    const evolutionChain = pokemonSpecies?.evolution_chain ? await getEvolutions(getId(pokemonSpecies.evolution_chain.url)) : [];

    let typeSprites = [];
    if (pokemon.types.length > 0) { 
        const promiseArray = pokemon.types.map((data) => getTypes(data?.type?.url?.split('/')[6])); 
        const data: any = await Promise.allSettled(promiseArray);  
        typeSprites = getTypesSprites(pokemon.types, data);
    }
    
    return (
        <div className="m-4 text-white">
            <img src={pokemon.sprites.front_default} />
            <h1 className="text-4xl uppercase">{pokemon.name}</h1>
            
            <label className="text-3xl first-letter:capitalize">Pokemon ID: <span>{pokemon.id}</span></label>
            <br/>
            <label className="text-3xl capitalize">Weight: <span>{pokemon.weight}</span></label>
            
            <h3 className="text-2xl mt-3">Abilities</h3>
            <ul className="pl-2 ml-3">
                {pokemon.abilities.length > 0 && pokemon.abilities.map((item) => {
                    return (
                        <li key={`abilities-${item.slot}`} className={`${item.is_hidden ? 'text-gold' : ''} list-disc`}> 
                            {item.ability.name}
                        </li>
                        )
                })}
            </ul>
            
            <h3 className="text-2xl mt-3">Stats</h3>
            <ul className="pl-2 ml-3">
                {pokemon.stats.length > 0 && pokemon.stats.map((item, index) => {
                    return (
                        <li key={`stats-${index}`} className={`list-disc`}> 
                            <p>
                                Name: {item.stat.name}
                                <br />
                                Base Stat: {item.base_stat}
                            </p>
                        </li> 
                    )
                })}
            </ul>
            
            <h3 className="text-2xl mt-3">Types</h3>
            <List 
            list={typeSprites}
            sprites={true}/>

            <h3 className="text-2xl mt-3">Evolutions:</h3>
            <div className="pl-2 ml-3" key={'evolutions'}>
                {Object.keys(evolutionChain?.chain?.evolves_to).length > 0 ? evolutionChain?.chain?.evolves_to.map((item, index) => {
                    return ( <ul key={`list-${index}`}>
                        <li key={`original-${index}`} className={`list-disc`}> 
                            <Link href={evolutionChain.chain?.species.name} className="block text-black rounded mb-3 px-4 py-2 shadow-sm bg-gray-50 max-w-max capitalize">
                                {evolutionChain.chain?.species.name}
                            </Link> 
                        </li> 
                        <li key={`evolutions-${index}`} className={`list-disc`}> 
                            <Link href={item.species.name} className="block text-black rounded mb-3 px-4 py-2 shadow-sm bg-gray-50 max-w-max capitalize">
                                {item.species.name}
                                <b className="text-md mt-2 block">Level Up:</b>
                                {item.evolution_details[0].min_level  && <span className='text-black'>Min Level: {item.evolution_details[0].min_level}</span>}
                                {item.evolution_details[0].item && <span className='text-black'>Item: {item.evolution_details[0].item?.name}</span>}
                            </Link> 
                        </li> 
                        {item.evolves_to.length > 0 ? item.evolves_to.map((subItem, subIndex) => {
                                return (
                                    <li key={`up-${subIndex}`} className={`list-disc`}> 
                                        <Link href={subItem.species.name} className="block text-black rounded mb-3 px-4 py-2 shadow-sm bg-gray-50 max-w-max capitalize">
                                            {subItem.species.name}
                                            <b className="text-md mt-2 block">Level Up:</b>
                                            {subItem.evolution_details[0].min_level  && <span className='text-black'>Min Level: {subItem.evolution_details[0].min_level}</span>}
                                            {subItem.evolution_details[0].item && <span className='text-black'>Item: {subItem.evolution_details[0].item?.name}</span>}
                                        </Link>
                                    </li> 
                                )
                        }) : ''}
                    </ul>
                    )  
                    
                }) : ''}
            </div>

            
            <h4 className="text-xl mt-2">Pokemon Species:</h4>
            <span className="capitalize">- {pokemon.species.name}</span>

            <h4 className="text-xl mt-2">Varieties:</h4>
            <ul className="pl-2 ml-3">
                {Object.keys(pokemonSpecies).length > 0 ? pokemonSpecies?.varieties.map((item, index) => {
                    return (
                    <li key={`varieties-${index}`} className={`list-disc capitalize`}> 
                        <Link href={item.pokemon.name} className="block text-black rounded mb-3 px-4 py-2 shadow-sm bg-gray-50 max-w-max">
                            {item.pokemon.name}
                        </Link>
                    </li> 
                    )  
                }) : ''}
            </ul>


            {pokemonSpecies.evolves_from_species && <>
                <h4 className="text-xl mt-2">Pre Evolution:</h4>
                <span className="capitalize">- {pokemonSpecies.evolves_from_species.name}</span>
            </>}
        </div>
    )
  }