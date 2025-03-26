export const swrConfig = {
    fetcher: (url: string) => fetch(url).then(res => res.json()),
    revalidateOnFocus: false,
    shouldRetryOnError: false,
};