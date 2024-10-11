import { getGeneration, getTypes } from "@/app/Requests";
import { List } from "@/app/ui/List/List";

export default async function Page({params}: {params: {generation: string}}) {
    const pokemon = await getGeneration(params.generation);
    let fullGeneration = [];

    if (pokemon.types.length > 0) {
        const promiseArray = pokemon.types.map((generation: { name: string, url: string}) => getTypes(generation.url.split('/')[6]));
        const data: any = await Promise.allSettled(promiseArray);
    
        const getSprites = (index: number) => {
            const arraySprite = data[index].value.sprites;
            let generationToSprite = data[index].value.generation.name;
            generationToSprite = (generationToSprite === 'generation-i' || generationToSprite === 'generation-ii') ? 'generation-iii' : generationToSprite; 
            const lastKeySprite = Object.keys(arraySprite[generationToSprite])[0];

            return data[index].value.sprites[generationToSprite][lastKeySprite];
        } 
    
        fullGeneration = pokemon.types.map((type: { name: string, url: string}, index: number) => {
            return { ...type, 
                sprites: getSprites(index)
            }
        }) 
    }
    
    const createHref = (link: { name: string, url: string}): string => {
        return `${params.generation}/pokemons/${link.name}`
    }

    const showTypes = () => {
        if (Object.keys(fullGeneration).length > 0) {
           if (Object.keys(fullGeneration).length === 1) {
                return Object.values(fullGeneration)[0]?.sprites?.name_icon === null;
           }
            return  ( <>
                <label className='text-white block'>New Types:</label>
                <List 
                list={fullGeneration}
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