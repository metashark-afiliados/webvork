// app/[locale]/(dev)/dev/campaign-suite/_components/Step0_Identification.tsx
/**
 * @file Step0_Identification.tsx
 * @description UI para el Paso 0 de la SDC.
 * @version 4.1.0 - Corregida advertencia de linting `exhaustive-deps` en useEffect.
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import { step0Schema, type Step0Data } from "../_schemas/step0.schema";
import { type StepProps } from "../_types/step.types";

type Step0Content = NonNullable<Dictionary["campaignSuitePage"]>["step0"];

interface Step0Props extends StepProps<Step0Content> {
  baseCampaigns: string[];
}

export function Step0_Identification({
  content,
  draft,
  setDraft,
  baseCampaigns,
  onBack,
  onNext,
}: Step0Props) {
  const form = useForm<Step0Data>({
    resolver: zodResolver(step0Schema),
    defaultValues: {
      baseCampaignId: draft?.baseCampaignId ?? "",
      variantName: draft?.variantName ?? "",
      seoKeywords: draft?.seoKeywords ?? "",
      affiliateNetwork: draft?.affiliateNetwork ?? "",
      affiliateUrl: draft?.affiliateUrl ?? "",
    },
  });

  // --- INICIO DE CORRECCIÓN: Se extrae `reset` para una dependencia más estable ---
  const { reset } = form;
  // --- FIN DE CORRECCIÓN ---

  const onSubmit = (data: Step0Data) => {
    setDraft?.(data);
    onNext?.();
  };

  useEffect(() => {
    if (draft) {
      reset({
        baseCampaignId: draft.baseCampaignId ?? "",
        variantName: draft.variantName ?? "",
        seoKeywords: draft.seoKeywords ?? "",
        affiliateNetwork: draft.affiliateNetwork ?? "",
        affiliateUrl: draft.affiliateUrl ?? "",
      });
    }
    // --- INICIO DE CORRECCIÓN: Se añade `reset` al array de dependencias ---
  }, [draft, reset]);
  // --- FIN DE CORRECCIÓN ---

  return (
    <Card>
      <CardHeader>
        <CardTitle>{content.title}</CardTitle>
        <CardDescription>
          Este es el paso fundacional. La información aquí recopilada define la
          identidad, SEO y tracking de tu campaña.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="baseCampaignId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{content.baseCampaignLabel}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={content.baseCampaignPlaceholder}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {baseCampaigns.map((id) => (
                        <SelectItem key={id} value={id}>
                          {id}
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
              name="variantName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{content.variantNameLabel}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={content.variantNamePlaceholder}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="seoKeywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{content.seoKeywordsLabel}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={content.seoKeywordsPlaceholder}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="affiliateNetwork"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{content.affiliateNetworkLabel}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={content.affiliateNetworkPlaceholder}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="webvork">Webvork</SelectItem>
                      <SelectItem value="clickbank">ClickBank</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="affiliateUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{content.affiliateUrlLabel}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={content.affiliateUrlPlaceholder}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between items-center pt-6 border-t">
              <Button type="button" variant="ghost" onClick={onBack} disabled>
                Retroceder
              </Button>
              <Button type="submit">Guardar y Continuar</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/Step0_Identification.tsx
