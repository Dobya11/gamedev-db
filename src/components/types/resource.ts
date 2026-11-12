export interface Resource {
  id: string;
  name: string;
  url: string;

  description?: string;

  category: string;
  type: string;

  tags?: string[];

  pricing?: string;

  commercialUse?: "yes" | "limited" | "varies" | "no";

  popular?: boolean;
  featured?: boolean;
}
