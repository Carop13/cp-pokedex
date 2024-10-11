import { getPokemon } from "@/app/Requests";

export default async function Page({params}: {params: {pokemon: string}}) {
    const pokemon = await getPokemon(params.pokemon);
    console.log('pokemon: ', pokemon)
    return (
        <div className="m-4 text-white">
            <p>{pokemon.name}</p>
            {/* <p className="mb-4"><b>Main Region:</b> {pokemon.main_region.name}</p>
            <label className='text-white block'>Pokemon Species:</label>
            <ul className='pl-2 flex flex-wrap w-full'>
                {pokemon.pokemon_species.map((data: { name: string, url: string} ) => (
                    <li key={data.name} className="ml-2 min-w-36 text-sm font-medium text-white list-disc">
                        {data.name}
                    </li>
                ))}
            </ul> */}
           
        </div>
    )
  }