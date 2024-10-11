import Link from "next/link";

export function List({
    listTitle,
    list,
    hrefHandler,
    link = false,
    insideList,
    sprites
  }: {
    listTitle?: string,
    list: [{ name: string, url: string, extraData?: [{ name: string, url: string}]}];
    hrefHandler?: (item: { name: string, url: string, generation?: {version_groups:[{ name: string, url: string}]}}) => string,
    link?: boolean,
    insideList?: string,
    sprites?: boolean
  }) {

    const internalList = (subList) => {
        return subList ? <List list={subList} insideList={'inside'} /> : '';
    }

    const returnChild = (item) => { 
        return link ? 
        (
        <Link href={hrefHandler(item)} className="block text-black rounded mb-3 p-2 shadow-sm bg-gray-50 min-w-36">
            {(insideList 
                ? <h3 className="text-m font-medium text-black uppercase mb-2">{item.name}</h3> 
                : <p className="capitalize">{item.name}</p>)}
            {listTitle && <label className='text-black'>{listTitle}:</label>}
            {internalList(item[insideList])}
        </Link>
        )
        :  (insideList 
            ? <span className="text-black capitalize">{item.name}</span> 
            : <div className="block text-black rounded mb-3 p-2 shadow-sm bg-gray-50 capitalize">
                {(item.sprites && <img src={item.sprites.name_icon} />)}
              </div> )
    }
  
    return (
        <ul className={`p-2 ${!insideList ? 'flex flex-wrap' : ''}`}>
            {list.map((item) => (
                <li key={item.name} className={`ml-2 text-sm font-medium text-black ${insideList ? 'list-disc' : ''}`}>
                    {returnChild(item)}
                </li>
            ))}
        </ul>
    );
  }