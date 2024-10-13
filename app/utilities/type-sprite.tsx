export function getTypesSprites(types, promiseData) {
   
    const getSprites = (index: number) => {
        const arraySprite = promiseData[index].value.sprites;
        let generationToSprite = promiseData[index].value.generation.name;
        generationToSprite = (generationToSprite === 'generation-i' || generationToSprite === 'generation-ii') ? 'generation-iii' : generationToSprite; 
        const lastKeySprite = Object.keys(arraySprite[generationToSprite])[0];

        return promiseData[index].value.sprites[generationToSprite][lastKeySprite];
    } 

    return types.map((type: { name: string, url: string}, index: number) => {
        return { ...type, 
            sprites: getSprites(index)
        }
    }) 
}
