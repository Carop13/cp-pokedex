export function Card({
    name,
    extraTitle,
    extraData,
  }: {
    name: string;
    extraTitle?: string;
    extraData: { name: string, url: string };
  }) {
  
    return (
        <div className="p-4 gap-4">
          <h3 className="text-m font-medium text-black capitalize mb-2">{name}</h3>
          <label className='text-black'>{extraTitle}:</label>
          <ul className='pl-2'>
            {extraData.map((data: { name: string, url: string} ) => (
                <li key={data.name} className="ml-2 text-sm font-medium text-black list-disc">
                  {data.name}
                </li>
            ))}
          </ul>
        </div>
    );
  }