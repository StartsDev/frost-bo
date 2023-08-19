
type Item<T> = Record<string, T>

export const mapPropertiesOfItems = <T>(item: Item<T>): T[]  =>  {
    const values = Object.values(item)
    return values
}

export const evaluateIndex = (index: number) => {
    if (index === 0) {
        return 'primary'
    } 
    
    if (index == 1) {
        return 'secondary'
    }

    return index % 2 === 0 ? 'primary' : 'secondary'
    
}