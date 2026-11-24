export interface Resource {
  id: string;
  name: string;
  url: string;

  description?: string;

  category: string;
  type: string;

  tags?: string[];

  pricing?: "free" | "freemium" | "paid" | "varies";

  commercialUse?: "yes" | "limited" | "varies" | "no" | "attribution";

  popular?: boolean;
  featured?: boolean;
}
