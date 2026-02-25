import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQ() {
  const faqs = [
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping typically takes 3-5 business days. Express shipping is available for 1-2 day delivery. You will receive a tracking number once your order ships.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for most items. Products must be unused and in original packaging. Simply contact our support team to initiate a return.'
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to most countries worldwide. International shipping times vary by location, typically 7-14 business days. Customs fees may apply.'
    },
    {
      question: 'How can I track my order?',
      answer: 'Once your order ships, you will receive a tracking number via email. You can also track your orders by logging into your account and visiting the Orders page.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and various digital payment methods. All transactions are secure and encrypted.'
    },
    {
      question: 'Can I cancel or modify my order?',
      answer: 'Orders can be cancelled or modified within 24 hours of placement. After that, the order enters processing and cannot be changed. Contact support immediately if you need assistance.'
    },
    {
      question: 'Do you offer price matching?',
      answer: 'Yes, we offer price matching on identical products from authorized retailers. Contact our support team with proof of the lower price within 7 days of purchase.'
    },
    {
      question: 'How do I contact customer support?',
      answer: 'You can reach our support team via the contact form on this page, email us at support@shophub.com, or call us during business hours. We typically respond within 24 hours.'
    }
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