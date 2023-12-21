async function fetchClassPages() {

    function constructFetchLetterArray(): string[] {
        return [...Array(26).keys()].map((elem: number) => 
            String.fromCharCode(elem + 'A'.charCodeAt(0)))
    }

    function constructFetcher(letter: string): Promise<string> {
        return fetch(`https://crs.upd.edu.ph/schedule/120231/${letter}`).then(
            (result: Response) => {
                return result.text()
            },
            (err) => {
                throw err
            }
        )
    }

    function constructFetcherArray(letters: string[]): Array<Promise<string>> {
        return letters.map(constructFetcher)
    }

    let letters = constructFetchLetterArray()
    let fetchers = constructFetcherArray(letters)
    return Promise.all(fetchers)

}