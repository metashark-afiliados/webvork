// components/ui/ContactForm.tsx
/**
 * @file ContactForm.tsx
 * @description Componente de UI atómico para el formulario de contacto.
 *              Corrige importaciones faltantes y el tipo `any` implícito.
 * @version 1.1.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
// --- INICIO DE MODIFICACIÓN ---
import { Card, CardContent } from "@/components/ui/Card";
// --- FIN DE MODIFICACIÓN ---

type FormContent = NonNullable<Dictionary["contactSection"]>["form"];

const formSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(2),
  message: z.string().min(10),
});

interface ContactFormProps {
  content: FormContent;
}

export function ContactForm({ content }: ContactFormProps): React.ReactElement {
  logger.info("[Observabilidad] Renderizando ContactForm");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: content.subjectOptions[0] || "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    logger.success("Formulario de contacto enviado (simulado):", values);
    form.reset();
  }

  return (
    <Card className="bg-muted/60 dark:bg-card">
      <CardContent className="pt-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid w-full gap-4"
          >
            {/* ... (resto del formulario sin cambios) ... */}
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{content.subjectLabel}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={content.subjectPlaceholder} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* --- INICIO DE CORRECCIÓN --- */}
                      {content.subjectOptions.map((option: string) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                      {/* --- FIN DE CORRECCIÓN --- */}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* ... (resto del formulario sin cambios) ... */}
            <Button type="submit" className="mt-4">
              {content.submitButtonText}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
// components/ui/ContactForm.tsx
