import type { NavItemWithOptionalChildren } from "@/types";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "هيبة ستور",
  description: "شحن ألعاب وتطبيقات | بيجو، رايزر غولد، ببجي، فري فاير، جواكر",
  url: "https://hibastore.com",
  address: "الزرقاء، الأردن",
  phone: "+962781482011",
  email: "info@hibastore.com",
  whatsapp: "https://wa.me/962781482011",
  facebook: "https://www.facebook.com/share/1App5Bfp2S/",
  mainNav: [] satisfies NavItemWithOptionalChildren[],
};