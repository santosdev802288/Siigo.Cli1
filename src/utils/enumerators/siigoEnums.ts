export enum MSPrefix {
    ESIIGO_MS = 'ESiigo.Microservice.',
    SIIGO_MS = 'Siigo.Microservice.',
    SIIGO_CORE = 'Siigo.Core.',
    SIITO_TEST = 'Siigo.Test.'
}

export const msPrefixes = Object.keys(MSPrefix).map(k => MSPrefix[k as keyof typeof MSPrefix])