// app/[locale]/(dev)/dev/campaign-suite/_components/Step4_Content/ContentEditor/ContentEditorBody.tsx
/**
 * @file ContentEditorBody.tsx
 * @description Pasa la prop 'sectionName' al renderizador de campos.
 * @version 3.0.0 (Focus Mode Prop Drilling)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";
// ... (imports sin cambios)
import { SchemaFieldRenderer } from "@/components/forms/builder";

// ... (props y tipos sin cambios)
interface ContentEditorBodyProps {
  // ... (otras props)
  sectionName: string; // Prop recibida para pasarla hacia abajo
  // ...
}

export function ContentEditorBody({
  form,
  activeLocale,
  setActiveLocale,
  sectionSchema,
  onPersistChange,
  onSubmit,
  sectionName, // <-- Se recibe la prop
}: // ...
): React.ReactElement {
  // ...
  return (
    // ...
    <TabsContent value={activeLocale} key={activeLocale}>
      <Form {...form}>
        <form onSubmit={onSubmit} className="mt-4">
          <div className="space-y-6">
            {fieldsToRender.map((fieldName) => (
              <SchemaFieldRenderer
                key={`${activeLocale}-${fieldName}`}
                control={form.control}
                sectionName={sectionName} // <-- Se pasa la prop
                fieldName={fieldName}
                fieldSchema={sectionSchema.shape[fieldName]}
                onValueChange={onPersistChange}
              />
            ))}
          </div>
        </form>
      </Form>
    </TabsContent>
    // ...
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/Step4_Content/ContentEditor/ContentEditorBody.tsx
