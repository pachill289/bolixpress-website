import React from "react";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  // constante t para definir el cambio de idioma
  const { t } = useTranslation();
  const faqs = [
    {
      question: t("support_label_1"),
      answer: t("support_sublabel_1"),
    },
    {
      question: t("support_label_2"),
      answer: t("support_sublabel_2"),
    },
    {
      question: t("support_label_3"),
      answer: t("support_sublabel_3"),
    },
    {
      question: t("support_label_4"),
      answer: t("support_sublabel_4"),
    },
    {
      question: t("support_label_5"),
      answer: t("support_sublabel_5"),
    },
    {
      question: t("support_label_6"),
      answer: t("support_sublabel_6"),
    },
    {
      question: t("support_label_7"),
      answer: t("support_sublabel_7"),
    },
    {
      question: t("support_label_8"),
      answer: t("support_sublabel_8"),
    },
  ];

  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="text-left">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
