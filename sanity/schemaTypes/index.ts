import { type SchemaTypeDefinition } from 'sanity'
import { mattress } from './mattress'
import { bed } from './bed'
import { category } from './category'
import { newsletter } from './newsletter'
import { seo } from './seo'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ mattress, bed, category, newsletter, seo ],
};
