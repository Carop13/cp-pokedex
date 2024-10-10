import { Card } from "../ui/Cards/Cards";
import { getGenerations, getGeneration } from '../Requests';
import Link from 'next/link';

export default async function Page() {
    const generations = await getGenerations();
    const { results } = generations;

    const promiseArray = results.map((generation: { name: string, url: string}) => getGeneration(generation.url.split('/')[6]));
    const data: any = await Promise.allSettled(promiseArray);
    const newsFullGenerations = results.map((generation: { name: string, url: string}, index: number) => {
        return { ...generation, 
            generation: data[index].value
        }
    })
    
    const getLinkId = (link: string): string => {
        const linkId: string = link.split('/')[6];
        return `generations/${linkId}`
    }

    return (
        <>
            <h1>Generations:</h1>
            <ul>
                {newsFullGenerations.map((item: { name: string, url: string, generation: {version_groups: { name: string, url: string}} }) => (
                    <li key={item.name}>
                        <Link href={getLinkId(item.url)} className="rounded bg-gray-50 p-2 shadow-sm block mb-2">
                            <Card name={item.name} extraData={item.generation.version_groups} extraTitle={'Versions'}/>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
  }