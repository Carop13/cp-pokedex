import { getGenerations, getGeneration } from '../Requests';
import { List } from "../ui/List/List";

export default async function Page() {
    const generations = await getGenerations();
    const { results } = generations;

    const promiseArray = results.map((generation: { name: string, url: string}) => getGeneration(generation.url.split('/')[6]));
    const data: any = await Promise.allSettled(promiseArray);
    const newsFullGenerations = results.map((generation: { name: string, url: string}, index: number) => {
        return { ...generation, 
            versionGroups: data[index].value.version_groups,
            types: data[index].value.types
        }
    })
    
    const getLinkId = (link: { name: string, url: string}): string => {
        const linkId: string = link.url.split('/')[6];
        return `generations/${linkId}`
    } 
    
    return (
        <>
            <h1>Generations:</h1>
            <div className='main-generations'>
                <List 
                list={newsFullGenerations} 
                hrefHandler={getLinkId}
                link={true} 
                listTitle={'Version'}
                insideList={'versionGroups'}/>
            </div>
            
        </>
    )
  }