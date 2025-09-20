// RUTA: app/[locale]/(dev)/raz-prompts/_components/PromptCreatorForm.tsx
/**
 * @file PromptCreatorForm.tsx
 * @description Orquestador de presentación puro y de élite para el formulario
 *              de creación de prompts. Compone aparatos atómicos para una
 *              arquitectura soberana y de responsabilidad única.
 * @version 4.0.0 (Atomic Architecture & MEA/UX)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React from "react";
import type { UseFormReturn } from "react-hook-form";
import { motion, type Variants } from "framer-motion";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
  Input,
  Textarea,
  Button,
  DynamicIcon,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui";
import { SesaTagsFormGroup } from "./SesaTagsFormGroup";
import { ParameterSelectorsGroup } from "./ParameterSelectorsGroup"; // <-- NUEVA IMPORTACIÓN
import type { CreatePromptFormData } from "../_hooks/use-prompt-creator";
import type { PromptCreatorContentSchema } from "@/lib/schemas/raz-prompts/prompt-creator.i18n.schema";
import type { z } from "zod";
import { logger } from "@/lib/logging";

// --- SSoT de Tipos y Animaciones ---
type Content = z.infer<typeof PromptCreatorContentSchema>;

interface PromptCreatorFormProps {
  form: UseFormReturn<CreatePromptFormData>;
  onSubmit: (data: CreatePromptFormData) => void;
  isPending: boolean;
  content: Content;
}

const formContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

// --- Componente de Élite ---
export function PromptCreatorForm({
  form,
  onSubmit,
  isPending,
  content,
}: PromptCreatorFormProps) {
  logger.trace(
    "[PromptCreatorForm] Renderizando orquestador de formulario v4.0."
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>{content.titleLabel}</CardTitle>
        <CardDescription>{content.keywordsDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <motion.form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
            variants={formContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fieldVariants}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{content.titleLabel}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={content.titlePlaceholder}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div variants={fieldVariants}>
              <FormField
                control={form.control}
                name="promptText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{content.promptTextLabel}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={content.promptTextPlaceholder}
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div variants={fieldVariants}>
              <FormField
                control={form.control}
                name="negativePrompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{content.negativePromptLabel}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={content.negativePromptPlaceholder}
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div variants={fieldVariants}>
              <SesaTagsFormGroup
                control={form.control}
                content={{
                  ...content.sesaLabels,
                  options: content.sesaOptions,
                }}
              />
            </motion.div>

            {/* --- INICIO DE REFACTORIZACIÓN ARQUITECTÓNICA --- */}
            <motion.div variants={fieldVariants}>
              <ParameterSelectorsGroup
                control={form.control}
                content={content}
              />
            </motion.div>
            {/* --- FIN DE REFACTORIZACIÓN ARQUITECTÓNICA --- */}

            <motion.div variants={fieldVariants}>
              <FormField
                control={form.control}
                name="keywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{content.keywordsLabel}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={content.keywordsPlaceholder}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {content.keywordsDescription}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              variants={fieldVariants}
              className="flex justify-end pt-4 border-t"
            >
              <Button type="submit" disabled={isPending} size="lg">
                {isPending && (
                  <DynamicIcon
                    name="LoaderCircle"
                    className="mr-2 h-4 w-4 animate-spin"
                  />
                )}
                {isPending
                  ? content.submitButtonLoadingText
                  : content.submitButtonText}
              </Button>
            </motion.div>
          </motion.form>
        </Form>
      </CardContent>
    </Card>
  );
}

