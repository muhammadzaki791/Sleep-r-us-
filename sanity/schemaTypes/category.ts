import { defineType, defineField } from "sanity";

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  preview: {
    select: {
      title: "title",
      subtitle: "showcaseSubtitle",
      media: "showcaseImage",
    },
  },
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 100,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "parentCategory",
      title: "Parent Category",
      type: "reference",
      to: [{ type: "category" }],
      description: "Leave empty for top-level categories (Mattresses, Bed Frames)",
    }),
    defineField({
      name: "isTopLevel",
      title: "Is Top-Level Category",
      type: "boolean",
      description: "Check this if this is a top-level category (Mattresses, Bed Frames)",
      initialValue: false,
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (rule) => rule.max(500),
    }),
    defineField({
      name: "showcaseImage",
      title: "Showcase Image",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Hero image for the category showcase card. This image will be displayed in the category grid.",
    }),
    defineField({
      name: "showcaseSubtitle",
      title: "Showcase Subtitle",
      type: "string",
      validation: (rule) => rule.max(150),
      description: "Short call-to-action text displayed below the title (e.g., 'Shop the Bethany Bed')",
    }),
    defineField({
      name: "featuredProducts",
      title: "Featured Products",
      type: "array",
      of: [
        { type: "reference", to: [{ type: "mattress" }, { type: "bed" }] }
      ],
      validation: (rule) => rule.max(20),
    }),
  ],
});
