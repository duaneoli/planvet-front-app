


export class BrasilApiService {
    static async getAddressByCep(cep: string): Promise<{
        cep: string;
        state: string;
        city: string;
        neighborhood: string;
        street: string;
        service: string;
    }> {
        const cleanCep = cep.replace(/\D/g, '');
        const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cleanCep}`);

        if (!response.ok) {
            throw new Error('CEP não encontrado');
        }

        return await response.json();
    }

    //obter todos os estados do brasil
    static async getStates(): Promise<Array<EstadoType>> {
        const response = await fetch('https://brasilapi.com.br/api/ibge/uf/v1');
        if (!response.ok) {
            throw new Error('Erro ao obter estados');
        }
        return await response.json();
    }

    //obter todos as cidades de um estado
    static async getCities(sigra: EstadoType['sigla']): Promise<Array<CidadeType>> {
        const response = await fetch(`https://brasilapi.com.br/api/ibge/municipios/v1/${sigra}`);
        if (!response.ok) {
            throw new Error('Erro ao obter cidades');
        }
        return await response.json();
    }
}

export type RegiãoType = {
    id: number;
    sigla: string;
    nome: string;
}

export type EstadoType = {
    id: number;
    sigla: string;
    nome: string;
    regiao: RegiãoType;
}

export type CidadeType = {
    nome: string
    codigo_ibge: string
}