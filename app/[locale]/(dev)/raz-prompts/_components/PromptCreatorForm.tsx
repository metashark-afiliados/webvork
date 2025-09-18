// app/[locale]/(dev)/raz-prompts/_components/PromptCreatorForm.tsx
/**
 * @file PromptCreatorForm.tsx
 * @description Orquestador de presentación puro para el formulario de creación de prompts.
 * @version 2.1.0 (Parsing Error Fix & UI Coherence)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React from "react";
import type { UseFormReturn } from "react-hook-form";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription, // <-- Importaciones añadidas
} from "@/components/ui";
import { FormFieldGroup } from "@/app/[locale]/(dev)/dev/campaign-suite/_components/shared/FormFieldGroup";
import { SesaTagsFormGroup } from "./SesaTagsFormGroup";
import type { CreatePromptFormData } from "../_hooks/usePromptCreator";
import type { PromptCreatorContentSchema } from "@/lib/schemas/raz-prompts/prompt-creator.i18n.schema";
import type { z } from "zod";
import { logger } from "@/lib/logging";

type Content = z.infer<typeof PromptCreatorContentSchema>;

interface PromptCreatorFormProps {
  form: UseFormReturn<CreatePromptFormData>;
  onSubmit: (data: CreatePromptFormData) => void;
  isPending: boolean;
  content: Content;
}

export function PromptCreatorForm({
  form,
  onSubmit,
  isPending,
  content,
}: PromptCreatorFormProps) {
  logger.trace(
    "[PromptCreatorForm] Renderizando formulario de presentación puro (v2.1)."
  );
  return (
    <Card>
      {" "}
      {/* Envuelve el formulario en una tarjeta para coherencia visual */}
      <CardHeader>
        <CardTitle>{content.titleLabel}</CardTitle>{" "}
        {/* Usar una etiqueta de título del i18n */}
        <CardDescription>{content.keywordsDescription}</CardDescription>{" "}
        {/* Una descripción coherente */}
      </CardHeader>
      <CardContent>
        {" "}
        {/* Contenido de la tarjeta */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{content.titleLabel}</FormLabel>
                  <FormControl>
                    <Input placeholder={content.titlePlaceholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <SesaTagsFormGroup
              control={form.control}
              content={{ ...content.sesaLabels, options: content.sesaOptions }}
            />

            <FormFieldGroup
              label={content.parametersGroupLabel}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Rendering Speed */}
                <FormField
                  control={form.control}
                  name="parameters.renderingSpeed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{content.renderingSpeedLabel}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={content.renderingSpeedPlaceholder}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {content.renderingSpeedOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Style Type */}
                <FormField
                  control={form.control}
                  name="parameters.styleType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{content.styleTypeLabel}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={content.styleTypePlaceholder}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {content.styleTypeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Aspect Ratio */}
                <FormField
                  control={form.control}
                  name="parameters.aspectRatio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{content.aspectRatioLabel}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={content.aspectRatioPlaceholder}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {content.aspectRatioOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Num Images */}
                <FormField
                  control={form.control}
                  name="parameters.numImages"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{content.numImagesLabel}</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder={content.numImagesPlaceholder}
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? undefined
                                : Number(e.target.value)
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Size */}
                <FormField
                  control={form.control}
                  name="parameters.size"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>{content.sizeLabel}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={content.sizePlaceholder}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {content.sizeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </FormFieldGroup>

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

            <div className="flex justify-end pt-4 border-t">
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
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
