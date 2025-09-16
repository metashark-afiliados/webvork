// app/[locale]/(dev)/dev/campaign-suite/_components/Step0_Identification/Step0Form.tsx
/**
 * @file Step0Form.tsx
 * @description Componente de Presentación Puro para el formulario del Paso 0.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React from "react";
import type { UseFormReturn } from "react-hook-form";
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
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import type { Step0Data } from "../../_schemas/step0.schema";

type Step0Content = NonNullable<Dictionary["campaignSuitePage"]>["step0"];

interface Step0FormProps {
  form: UseFormReturn<Step0Data>;
  content: Step0Content;
  baseCampaigns: string[];
  onSubmit: (data: Step0Data) => void;
  onBack: () => void;
  isBackButtonDisabled: boolean;
}

export function Step0Form({
  form,
  content,
  baseCampaigns,
  onSubmit,
  onBack,
  isBackButtonDisabled,
}: Step0FormProps): React.ReactElement {
  logger.info("Renderizando Step0Form (Presentación Pura)");

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
              <Button
                type="button"
                variant="ghost"
                onClick={onBack}
                disabled={isBackButtonDisabled}
              >
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
// app/[locale]/(dev)/dev/campaign-suite/_components/Step0_Identification/Step0Form.tsx
