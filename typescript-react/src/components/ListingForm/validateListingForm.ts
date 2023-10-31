import { FormData, FormErrors } from '@/types/formTypes';

export const validateListingForm = (formData: FormData) => {
  let validationErrors: FormErrors = {};

  if (!formData.name || formData.name.length < 1)
    validationErrors.name = 'Name is required';

  if (
    String(formData.latest_price_eur) === '' ||
    formData.latest_price_eur === null ||
    formData.latest_price_eur === undefined ||
    typeof Number(formData.latest_price_eur) !== 'number' ||
    isNaN(formData.latest_price_eur) ||
    formData.latest_price_eur < 0
  )
    validationErrors.latest_price_eur =
      'Price must be equal to or greater than 0';

  if (
    String(formData.surface_area_m2) === '' ||
    formData.surface_area_m2 === null ||
    formData.surface_area_m2 === undefined ||
    typeof Number(formData.surface_area_m2) !== 'number' ||
    isNaN(formData.surface_area_m2) ||
    formData.surface_area_m2 < 0
  )
    validationErrors.surface_area_m2 =
      'Surface area must be equal to or greater than 0';

  if (
    String(formData.rooms_count) === '' ||
    formData.rooms_count === null ||
    formData.rooms_count === undefined ||
    typeof Number(formData.rooms_count) !== 'number' ||
    isNaN(formData.rooms_count) ||
    formData.rooms_count < 1
  )
    validationErrors.rooms_count =
      'Number of rooms must be equal to or greater than 1';

  if (
    String(formData.bedrooms_count) === '' ||
    formData.bedrooms_count === null ||
    formData.bedrooms_count === undefined ||
    typeof Number(formData.bedrooms_count) !== 'number' ||
    isNaN(formData.bedrooms_count) ||
    formData.bedrooms_count < 0
  )
    validationErrors.bedrooms_count =
      'Number of bedrooms must be equal to or greater than 0';

  if (
    !formData.contact_phone_number ||
    !/^\+[1-9]\d{1,14}$/.test(formData.contact_phone_number)
  )
    validationErrors.contact_phone_number =
      'Please provide a valid phone number';

  if (!formData.postal_address.street_address) {
    validationErrors['postal_address.street_address'] =
      'Street address is required';
  }

  if (!formData.postal_address.postal_code) {
    validationErrors['postal_address.postal_code'] = 'Postal code is required';
  }

  if (!formData.postal_address.city) {
    validationErrors['postal_address.city'] = 'City is required';
  }

  if (!formData.postal_address.country) {
    validationErrors['postal_address.country'] = 'Country is required';
  }

  if (!formData.description || formData.description.length < 1)
    validationErrors.description = 'Description is required';

  return validationErrors;
};
