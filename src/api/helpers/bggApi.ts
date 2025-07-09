export function getBggApiUrl(endpoint: string): string {
    const baseUrl = 'https://boardgamegeek.com/xmlapi2/';

    // Remove leading slash if present to avoid double slashes
    const cleanEndpoint = endpoint.startsWith('/')
        ? endpoint.slice(1)
        : endpoint;

    return `${baseUrl}${cleanEndpoint}`;
}
