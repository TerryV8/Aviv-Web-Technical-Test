export type PostalAddress = {
  street_address: string;
  postal_code: string;
  city: string;
  country: string;
};

export type FormData = {
  name: string;
  postal_address: PostalAddress;
  description: string;
  building_type: 'STUDIO' | 'APARTMENT' | 'HOUSE';
  latest_price_eur: number | '';
  surface_area_m2: number | '';
  rooms_count: number | '';
  bedrooms_count: number | '';
  contact_phone_number: string;
};

export interface ListingResponse extends FormData {
  id: number;
  created_date: string;
  updated_date: string;
}

export type FormErrors = {
  name?: string;
  description?: string;
  building_type?: string;
  latest_price_eur?: string;
  surface_area_m2?: string;
  rooms_count?: string;
  bedrooms_count?: string;
  contact_phone_number?: string;
  'postal_address.street_address'?: string;
  'postal_address.postal_code'?: string;
  'postal_address.city'?: string;
  'postal_address.country'?: string;
};

export type FormField = {
  name: keyof FormData | `postal_address.${keyof FormData['postal_address']}`;
  label: string;
  placeholder?: string;
  type?: 'text' | 'number';
  measure_unit?: string;
};
