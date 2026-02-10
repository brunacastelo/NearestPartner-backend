import { z } from 'zod';

export const PartnerModel = z.object({
  tradingName: z.string().nonempty(),
  ownerName: z.string().nonempty(),
  document: z.string()
    .refine((doc) => {
      const replacedDoc = doc.replace(/\D/g, '');
      return replacedDoc.length >= 11;
    }, 'CNPJ should contains min 11 characters.')
    .refine((doc) => {
      const replacedDoc = doc.replace(/\D/g, '');
      return replacedDoc.length <= 14;
    }, 'CNPJ should contains min 14 characters.')
    .refine((doc) => {
      const replacedDoc = doc.replace(/\D/g, '');
      return !!Number(replacedDoc);
    }, 'CNPJ should contains only numbers.'),

  coverageArea: z.object({
    type: z.literal('MultiPolygon'),
    coordinates: z.array(
      z.array(
        z.array(
          z.tuple([z.number(), z.number()])
        )
      )
    ),
  }),
  address: z.object({
    type: z.literal('Point'),
    coordinates: z.tuple([z.number(), z.number()]),
  }),
});  

export type PartnerModel = z.infer<typeof PartnerModel>;