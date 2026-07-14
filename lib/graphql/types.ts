export interface Page {
  isActive: boolean;
  slugEn: string;
  slugFr: string;
  titleEn: string;
  titleFr: string;
  contentEn: string;
  contentFr: string;
  createdAt?: string; 
  updatedAt?: string;
}

// Query response types
export interface GetPageResponse {
  page: Page | null;
}

export interface PartnerType {
  id: string;
  name: string;
  image: { url: string };
  link: string;
}
export interface GetPartnersResponse {
  partners: PartnerType[];
}

export interface SponsorType {
  id: string;
  name: string;
  image: { url: string };
  link: string;
}
export interface GetSponsorsResponse {
  sponsors: SponsorType[];
}