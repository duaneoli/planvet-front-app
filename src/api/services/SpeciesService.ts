
export class SpeciesServices {
    static async getAll(): Promise<Array<{ id: number, specie: string }>> {
        return await new Promise(resolve => setTimeout(() => {
            resolve([
                { id: 1, specie: "Cachorro" },
                { id: 2, specie: "Gato" },
                { id: 3, specie: "Pássaro" },
                { id: 4, specie: "Répteis" },
                { id: 5, specie: "Outro" },
            ])
        }, 1000))
    }
}