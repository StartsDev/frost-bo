export const uuidToShortenedInteger = (uuid: string | undefined, maxDigits: number): number | undefined => {
    if (uuid === undefined) {
        console.error('UUID is undefined');
        return undefined;
    }
    const uuidParts = uuid.split('-');
    const hexString = uuidParts.join('');
    const integerValue = parseInt(hexString, 16);

    const shortenedValue = integerValue % Math.pow(10, maxDigits);

    return shortenedValue;
}