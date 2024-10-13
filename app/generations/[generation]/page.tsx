import { getGeneration, getTypes } from "@/app/Requests";
import { List } from "@/app/ui/List/List";
import { getTypesSprites } from "@/app/utilities/type-sprite";

export default async function Page({params}: {params: {generation: string}}) {
    const pokemon = await getGeneration(params.generation);
    //let fullGeneration = [];

    let typeSprites = [];
    if (pokemon.types.length > 0) { 
        const promiseArray = pokemon.types.map((data) => getTypes(data?.url?.split('/')[6])); 
        const data: any = await Promise.allSettled(promiseArray);  
        typeSprites = getTypesSprites(pokemon.types, data);
    }
    
    const createHref = (link: { name: string, url: string}): string => {
        return `${params.generation}/pokemons/${link.name}`
    }

    const showTypes = () => {
        if (Object.keys(typeSprites).length > 0) {
            return  ( <>
                <label className='text-white block'>New Types:</label>
                <List 
                list={typeSprites}
                sprites={true}/>
            </>) 
        }

        return ''; 
    }

    return ( 
        <div className="m-4">
            <p className="mb-4"><b>Main Region:</b> {pokemon.main_region.name}</p>

            <label className='text-white block'>Pokemon Species:</label>
            <List 
            list={pokemon.pokemon_species} 
            hrefHandler={createHref}
            link={true}/>
           
           {showTypes()}
        </div>
    )
  }