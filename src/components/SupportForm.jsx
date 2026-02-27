import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export default function SupportForm() {
  const [formData, setFormData] = useState({
    subject: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { currentUser } = useAuth();
  // constante t para definir el cambio de idioma
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Save to localStorage (would be Supabase in production)
    const supportTickets = JSON.parse(
      localStorage.getItem("supportTickets") || "[]",
    );
    const newTicket = {
      id: Date.now().toString(),
      userId: currentUser?.uid || "guest",
      ...formData,
      createdAt: new Date().toISOString(),
      status: "open",
    };
    supportTickets.push(newTicket);
    localStorage.setItem("supportTickets", JSON.stringify(supportTickets));

    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({ subject: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="subject">{t("support_label_9")}</Label>
        <input
          id="subject"
          type="text"
          required
          value={formData.subject}
          onChange={(e) =>
            setFormData({ ...formData, subject: e.target.value })
          }
          placeholder={t("support_placeholder_1")}
          className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-foreground"
        />
      </div>

      <div>
        <Label htmlFor="email">{t("support_label_10")}</Label>
        <input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder={t("support_placeholder_2")}
          className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-foreground"
        />
      </div>

      <div>
        <Label htmlFor="message">{t("support_label_11")}</Label>
        <textarea
          id="message"
          required
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          placeholder={t("support_placeholder_3")}
          rows={6}
          className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-foreground resize-none"
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        <Send className="h-4 w-4 mr-2" />
        {isSubmitting ? t("button_7_sending") : t("button_7")}
      </Button>
    </form>
  );
}
