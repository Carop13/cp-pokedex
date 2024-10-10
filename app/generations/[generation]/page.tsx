import { getGeneration } from "@/app/Requests";
import Link from 'next/link';

export default async function Page({params}: {params: {generation: string}}) {
    const pokemon = await getGeneration(params.generation);
    //console.log('pokemon: ', pokemon)
    return (
        <div className="m-4">
            <p className="mb-4"><b>Main Region:</b> {pokemon.main_region.name}</p>
            <label className='text-white block'>Pokemon Species:</label>
            <ul className='pl-2 flex flex-wrap w-full'>
                {pokemon.pokemon_species.map((data: { name: string, url: string} ) => (
                    <li key={data.name} className="ml-2 min-w-36 text-sm font-medium text-black">
                        <Link href={`${params.generation}/pokemons/${data.name}`} className="rounded bg-gray-50 p-2 shadow-sm block mb-2">
                            {data.name}
                        </Link>
                    </li>
                ))}
            </ul>
            {/* types */}
        </div>
    )
  }