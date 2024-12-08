export function parseJson<T>(jsonString: string): T {
    return JSON.parse(jsonString) as T;
}