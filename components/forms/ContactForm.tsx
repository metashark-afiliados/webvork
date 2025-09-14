// components/forms/ContactForm.tsx // <-- ¡COMENTARIO CORREGIDO!
/**
 * @file ContactForm.tsx
 * @description Componente de UI atómico y "smart" para el formulario de contacto.
 *              Encapsula toda la lógica de validación y estado del formulario.
 * @version 1.0.0
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
import { Card, CardContent } from "@/components/ui/Card";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

type FormContent = NonNullable<Dictionary["contactSection"]>["form"];

// El schema de validación vive con el componente que lo usa.
const formSchema = z.object({
  firstName: z.string().min(2, "First name is required."),
  lastName: z.string().min(2, "Last name is required."),
  email: z.string().email("Invalid email address."),
  subject: z.string().min(2, "Please select a subject."),
  message: z.string().min(10, "Message must be at least 10 characters."),
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
            <div className="flex flex-col md:flex-row gap-8">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{content.firstNameLabel}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={content.firstNamePlaceholder}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{content.lastNameLabel}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={content.lastNamePlaceholder}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{content.emailLabel}</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={content.emailPlaceholder}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      {content.subjectOptions.map((option: string) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{content.messageLabel}</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      placeholder={content.messagePlaceholder}
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-4">
              {content.submitButtonText}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
// components/forms/ContactForm.tsx
