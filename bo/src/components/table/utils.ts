
type Item<T> = Record<string, T>

export const mapPropertiesOfItems = <T>(item: Item<T>): T[]  =>  {
    console.log('ITEM ',item)
    const values = Object.values(item)
    return values
}
