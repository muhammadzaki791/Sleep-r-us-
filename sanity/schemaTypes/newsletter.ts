import {defineType, defineField} from 'sanity'

export const newsletter = defineType({
  name: 'newsletter',
  title: 'Newsletter',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      options: {
        list: [
          {title: 'Footer', value: 'footer'},
          {title: 'Popup', value: 'popup'},
          {title: 'Product Page', value: 'product-page'},
          {title: 'Homepage', value: 'homepage'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ipHash',
      title: 'IP Hash',
      type: 'string',
      description: 'Hash of IP for fraud detection',
    }),
  ],
  preview: {
    select: {
      email: 'email',
      source: 'source',
    },
    prepare(selection) {
      const {email, source} = selection
      return {
        title: email,
        subtitle: `Source: ${source}`,
      }
    },
  },
})