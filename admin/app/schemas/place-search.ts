import { z } from 'zod'

const part = z.string().optional()

export const photonFeatureSchema = z.object({
    geometry: z.object({ coordinates: z.tuple([z.number(), z.number()]) }),
    properties: z.object({
        osm_type: part,
        osm_id: z.number().optional(),
        type: part,
        name: part,
        housenumber: part,
        street: part,
        locality: part,
        district: part,
        city: part,
        county: part,
        state: part,
        postcode: part,
    }),
})

export const photonResponseSchema = z.object({ features: z.array(photonFeatureSchema) })
