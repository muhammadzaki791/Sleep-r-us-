import {defineType, defineField} from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'document',
  fields: [
    defineField({
      name: 'pageSlug',
      title: 'Page Slug',
      type: 'string',
      description: 'The page this SEO data applies to',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      description: 'Title tag content',
      validation: (rule) => rule.required().max(70),
    }),
    defineField({
      name: 'pageDescription',
      title: 'Page Description',
      type: 'text',
      description: 'Meta description content',
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Image for social sharing',
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{type: 'string'}],
      validation: (rule) => rule.max(10),
      description: 'SEO keywords',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'Canonical URL override',
    }),
    defineField({
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean',
      description: 'Whether to exclude from search index',
    }),
  ],
  preview: {
    select: {
      pageSlug: 'pageSlug',
      pageTitle: 'pageTitle',
    },
    prepare(selection) {
      const {pageSlug, pageTitle} = selection
      return {
        title: pageSlug,
        subtitle: pageTitle,
      }
    },
  },
})