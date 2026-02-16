import { BREEDS_BY_SPECIES } from "@/constants"

export class BreedService {
    static async getBySpecie(specieId: number): Promise<Array<{ id: number, breed: string }>> {
        console.log('getBySpecie', specieId)
        return await new Promise(resolve => setTimeout(() => {
            resolve(BREEDS_BY_SPECIES[specieId])
        }, 1000))
    }
}