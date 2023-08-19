
type Item<T> = Record<string, T>

export const mapPropertiesOfItems = <T>(item: Item<T>): T[]  =>  {
    const values = Object.values(item)
    return values
}