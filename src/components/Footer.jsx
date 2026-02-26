import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function Footer() {
  const { toast } = useToast();
  // constante t para definir el cambio de idioma
  const { t } = useTranslation();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email) {
      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our newsletter",
      });
      e.target.reset();
    }
  };

  const footerLinks = {
    company: [
      { name: t("footer_subtitle_1"), path: "/about" },
      { name: t("footer_subtitle_1_2"), path: "/careers" },
      { name: t("footer_subtitle_1_3"), path: "/press" },
      { name: t("footer_subtitle_1_4"), path: "/blog" },
    ],
    shop: [
      { name: t("footer_subtitle_2"), path: "/products" },
      { name: t("footer_subtitle_2_2"), path: "/products?featured=true" },
      { name: t("footer_subtitle_2_3"), path: "/products?new=true" },
      { name: t("footer_subtitle_2_4"), path: "/products?sale=true" },
    ],
    support: [
      { name: t("footer_subtitle_3"), path: "/support" },
      { name: t("footer_subtitle_3_2"), path: "/orders" },
      { name: t("footer_subtitle_3_3"), path: "/shipping" },
      { name: t("footer_subtitle_3_4"), path: "/returns" },
    ],
    legal: [
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Terms of Service", path: "/terms" },
      { name: "Cookie Policy", path: "/cookies" },
      { name: "Contact Us", path: "/support" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    {
      icon: Instagram,
      href: "https://www.instagram.com/bolix_press?igsh=MXd1OHJqMWlhcWl6eg==",
      label: "Instagram",
    },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-muted/50 border-t mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-14 w-14 rounded-lg bg-gradient-to-br flex items-center justify-center">
                <img src="/bolixpress-isotipo.svg" alt="logo bolixpress" />
              </div>
              <span className="font-bold text-3xl sm:block italic">
                <span className="text-blue-800">Bolix</span>
                <span className="text-red-800">press</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              {t("description_footer")}
            </p>

            {/* Newsletter */}
            <div className="mt-6">
              <h3 className="font-semibold mb-3">{t("footer_title_4")}</h3>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  name="email"
                  placeholder={t("footer_placeholder_email")}
                  required
                  className="flex-1 px-3 py-2 text-sm rounded-md border bg-background text-foreground"
                />
                <Button type="submit" size="sm">
                  <Mail className="h-4 w-4 mr-1" />
                  {t("footer_button")}
                </Button>
              </form>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">{t("footer_title_1")}</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-semibold mb-4">{t("footer_title_2")}</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold mb-4">{t("footer_title_3")}</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Bolixpress. {t("footer_rigths")}
          </p>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
