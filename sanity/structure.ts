import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // List the document types you want in the Studio
      S.listItem()
        .title("Mattress")
        .icon(() => "🛏️") // Bed icon
        .id("mattress")
        .child(
          S.documentList()
            .title("Mattresses")
            .filter('_type == "mattress"')
            .defaultOrdering([{ field: "_createdAt", direction: "desc" }])
            .child((documentId) =>
              S.editor()
                .schemaType("mattress")
                .documentId(documentId)
                .views([S.view.form()]),
            ),
        ),

      S.listItem()
        .title("Bed")
        .icon(() => "🛏️") // Bed icon
        .id("bed")
        .child(
          S.documentList()
            .title("Beds")
            .filter('_type == "bed"')
            .defaultOrdering([{ field: "_createdAt", direction: "desc" }])
            .child((documentId) =>
              S.editor()
                .schemaType("bed")
                .documentId(documentId)
                .views([S.view.form()]),
            ),
        ),

      S.listItem()
        .title("Category")
        .icon(() => "🏷️") // Label icon
        .id("category")
        .child(
          S.documentList()
            .title("Categories")
            .filter('_type == "category"')
            .defaultOrdering([{ field: "_createdAt", direction: "desc" }])
            .child((documentId) =>
              S.editor()
                .schemaType("category")
                .documentId(documentId)
                .views([S.view.form()]),
            ),
        ),

      S.listItem()
        .title("Newsletter")
        .icon(() => "📧") // Email icon
        .id("newsletter")
        .child(
          S.documentList()
            .title("Newsletters")
            .filter('_type == "newsletter"')
            .defaultOrdering([{ field: "_createdAt", direction: "desc" }])
            .child((documentId) =>
              S.editor()
                .schemaType("newsletter")
                .documentId(documentId)
                .views([S.view.form()]),
            ),
        ),

      S.listItem()
        .title("SEO")
        .icon(() => "🔍") // Magnifying glass icon
        .id("seo")
        .child(
          S.documentList()
            .title("SEO Settings")
            .filter('_type == "seo"')
            .defaultOrdering([{ field: "_createdAt", direction: "desc" }])
            .child((documentId) =>
              S.editor()
                .schemaType("seo")
                .documentId(documentId)
                .views([S.view.form()]),
            ),
        ),

      // Add the rest of the document types
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId();
        return (
          id &&
          !["mattress", "bed", "category", "newsletter", "seo"].includes(
            id,
          )
        );
      }),
    ]);
