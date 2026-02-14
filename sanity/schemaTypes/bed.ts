import { defineType, defineField } from 'sanity'

export const bed = defineType({
  name: 'bed',
  title: 'Bed',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
      validation: (rule) => rule.min(1).max(10).required(),
    }),
    defineField({
      name: 'storageType',
      title: 'Storage Type',
      type: 'string',
      options: {
        list: [
          { title: 'Ottoman Storage', value: 'ottoman-storage' },
          { title: 'Under-bed Storage', value: 'under-bed-storage' },
          { title: 'Drawers', value: 'drawers' },
          { title: 'Headboard Storage', value: 'headboard-storage' },
          { title: 'None', value: 'none' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'headboardStyle',
      title: 'Headboard Style',
      type: 'string',
      options: {
        list: [
          { title: 'Lined', value: 'lined' },
          { title: 'Button Pattern', value: 'button-pattern' },
          { title: 'Plain', value: 'plain' },
          { title: 'Tufted', value: 'tufted' },
          { title: 'Wooden', value: 'wooden' },
          { title: 'Fabric', value: 'fabric' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sizes',
      title: 'Sizes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'sizeName',
              title: 'Size Name',
              type: 'string',
              options: {
                list: [
                  { title: "3Ft Single", value: "3ft-single" },
                  { title: "4Ft Small Double", value: "4ft-small-double" },
                  { title: '4Ft6" Double', value: '4ft6"-double' },
                  { title: "5Ft King", value: "5ft-king" },
                  { title: "6Ft Super King", value: "6ft-super-king" },
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'dimensions',
              title: 'Dimensions',
              type: 'string',
              description: 'Dimensions in format like "90 x 200 cm"',
              options: {
                list: [
                  { title: "Single (90 x 190 cm)", value: "90x190" },
                  { title: "Small Double (120 x 190 cm)", value: "120x190" },
                  { title: "Double (135 x 190 cm)", value: "135x190" },
                  { title: "King (150 x 200 cm)", value: "150x200" },
                  { title: "Super King (180 x 200 cm)", value: "180x200" }
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'price',
              title: 'Price/Contact Information',
              type: 'string',
              description: 'Either the actual price or "Contact for Price"',
              validation: (rule) => rule.required(),
            }),
          ],
          validation: (rule) => rule.required(),
        },
      ],
      validation: (rule) => rule.min(1).required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (rule) => rule.required(),
    }),
  ],
})