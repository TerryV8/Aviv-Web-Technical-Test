/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
// @ts-ignore
import PhoneInput from 'react-phone-input-2';
import 'react-toastify/dist/ReactToastify.css';
import 'react-phone-input-2/lib/style.css';

import styles from './listing-form.module.scss';
import config from '@/config';

import useCountries from '@/hooks/useCountries';
import InputField from '../Input/InputField';

import { validateListingForm } from './validateListingForm';

import type {
  PostalAddress,
  FormData,
  ListingResponse,
  FormField,
  FormErrors,
} from '@/types/formTypes';

type ErrorKeys = keyof FormErrors;

const initialFormData: FormData = {
  name: '',
  postal_address: {
    street_address: '',
    postal_code: '',
    city: '',
    country: 'FR',
  },
  description: '',
  building_type: 'STUDIO', // Setting a default value
  latest_price_eur: 0,
  surface_area_m2: 0,
  rooms_count: 1,
  bedrooms_count: 0,
  contact_phone_number: '',
};

const fields: FormField[] = [
  {
    name: 'latest_price_eur',
    label: 'Price',
    type: 'number',
    measure_unit: '€',
  },
  {
    name: 'surface_area_m2',
    label: 'Surface area',
    type: 'number',
    measure_unit: 'm²',
  },
  { name: 'rooms_count', label: 'Rooms count', type: 'number' },
  { name: 'bedrooms_count', label: 'Bedroom count', type: 'number' },
  {
    name: 'postal_address.street_address',
    label: 'Street address',
    placeholder: 'Which address ?',
  },
  {
    name: 'postal_address.postal_code',
    label: 'Postal code',
    placeholder: 'Which postal code ?',
  },
  { name: 'postal_address.city', label: 'City', placeholder: 'Which city ?' },
];

interface ListingFormProps {
  onListingAdded: () => void; // function to re-fetch the listings when the form is submitted
}

const ListingForm: React.FC<ListingFormProps> = ({ onListingAdded }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});

  // Retrieve the list of countries and sorted by country name
  const { getAllCountries } = useCountries();
  const countries = getAllCountries().sort((a, b) =>
    a.label.localeCompare(b.label),
  );

  const resetFormData = (): void => {
    setFormData(initialFormData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ): void => {
    const { name, value } = e.target;
    setErrors({}); // Clearing errors on change

    // For nested field postal_address
    if (name.startsWith('postal_address.')) {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLSelectElement
      ) {
        const postalAddressField = name.split('.')[1] as keyof PostalAddress;
        setFormData({
          ...formData,
          postal_address: {
            ...formData.postal_address,
            [postalAddressField]: value,
          },
        });
      }

      // By default, when it is not  nested field postal_address
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const validationErrors: FormErrors = validateListingForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    (async () => {
      try {
        const response = await axios.post<ListingResponse>(
          `${config.backend_api_url}/listings`,
          formData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        if (response.status === 201) {
          toast.success('Listing created successfully 👌 !', {
            autoClose: 5000,
          });
          onListingAdded(); // call the function to re-fetch the listings
          resetFormData();
        } else if (response.status === 400) {
          console.error(
            'Bad Request: The server cannot or will not process the request due to a possible client error.',
          );
          toast.error('Bad Request 😓 Please check your input and try again!', {
            autoClose: 5000,
          });
        } else if (response.status === 422) {
          console.error(
            'Unprocessable Entity: The request was well-formed but was unable to be followed due to semantic errors.',
          );
          toast.error(
            'Unprocessable Entity 😖 Please check your input and try again!',
            { autoClose: 5000 },
          );
        } else {
          console.error('Unexpected status code received:', response.status);
          toast.error(
            'An unexpected error occurred 😲 Please try again later!',
            {
              autoClose: 5000,
            },
          );
        }
      } catch (error) {
        if (error instanceof Error) {
          if (axios.isAxiosError(error)) {
            if (error?.response) {
              // The request was made and the server responded with a status code that falls out of the range of 2xx
              console.error('Error response data:', error.response.data);
              console.error('Error response status:', error.response.status);
              console.error('Error response headers:', error.response.headers);

              toast.error(
                `Error: ${error.response.status} - ${
                  error.response.data.message || 'Please try again later!'
                }`,
                { autoClose: 5000 },
              );
            } else if (error?.request) {
              // The request was made but no response was received
              console.error('Error request:', error.request);
              toast.error(
                'Network Error 😢 Please check your connection and try again!',
                { autoClose: 5000 },
              );
            } else {
              // Something happened in setting up the request that triggered an Error
              console.error('Error message:', error.message);
              toast.error(
                'An unexpected error occurred 😲 Please try again later!',
                { autoClose: 5000 },
              );
            }
          }
        } else {
          console.error('An unexpected error occurred', error);
          toast.error(
            'An unexpected error occurred 😲 Please try again later!',
            {
              autoClose: 5000,
            },
          );
        }
      }
    })().catch((error) => {
      console.error('An unexpected error occurred', error);
    }); // Immediately invoke the function;
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <form className={styles['listing-form']} onSubmit={handleSubmit}>
        <div className={styles['listing-form__card']}>
          <div className={styles['listing-form__input-group']}>
            <label htmlFor="name" className={styles['listing-form__label']}>
              Name:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className={styles['listing-form__input-text']}
              placeholder="Your name ?"
            />
            {errors.name && (
              <div className={styles['listing-form__error']}>
                ⚠ {errors.name}
              </div>
            )}
          </div>

          <div className={styles['listing-form__input-group']}>
            <label
              htmlFor="description"
              className={styles['listing-form__label']}
            >
              Property description:
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={styles['listing-form__input-text']}
              placeholder="Any property description ?"
            />
            {errors.description && (
              <div className={styles['listing-form__error']}>
                ⚠ {errors.description}
              </div>
            )}
          </div>

          <div className={styles['listing-form__input-group-building-type']}>
            <label
              htmlFor="building_type"
              className={styles['listing-form__label']}
            >
              Building type:
            </label>
            <select
              id="building_type"
              name="building_type"
              value={formData.building_type}
              onChange={handleChange}
              className={styles['listing-form__select-building-type']}
            >
              <option value="STUDIO">Studio</option>
              <option value="APARTMENT">Apartment</option>
              <option value="HOUSE">House</option>
            </select>
          </div>

          {fields.map((field) => (
            <InputField
              key={field.name}
              {...field}
              value={
                field.name.startsWith('postal_address.')
                  ? String(
                      formData.postal_address[
                        field.name.split(
                          '.',
                        )[1] as keyof FormData['postal_address']
                      ],
                    )
                  : String(formData[field.name as keyof FormData])
              }
              // value={formData.description}
              onChange={handleChange}
              error={errors[field.name as ErrorKeys]}
            />
          ))}

          <div className={styles['listing-form__input-group']}>
            <label
              htmlFor="building_type"
              className={styles['listing-form__label']}
            >
              Country:
            </label>
            <select
              name="postal_address.country"
              value={formData.postal_address.country}
              onChange={handleChange}
              className={styles['listing-form__select']}
              style={{ fontSize: '16px', marginLeft: 0, width: '100%' }}
            >
              {/* <option value="FR">Select a country</option> */}
              {countries.map((country) => (
                <option key={country.countryCode} value={country.countryCode}>
                  {country.label} {country.flag}, {country.region}
                </option>
              ))}
            </select>
          </div>

          <div className={styles['listing-form__input-group']}>
            <label
              htmlFor="contact_phone_number"
              className={styles['listing-form__label']}
            >
              Phone number:
            </label>
            <PhoneInput
              country={'fr'}
              value={formData.contact_phone_number}
              onChange={(value: string, country: string) => {
                setFormData({
                  ...formData,
                  contact_phone_number: '+' + value,
                });
              }}
              inputStyle={{
                width: '100%',
              }}
              inputProps={{
                id: 'contact_phone_number',
              }}
            />
            {errors.contact_phone_number && (
              <div className={styles['listing-form__error']}>
                ⚠ {errors.contact_phone_number}
              </div>
            )}
          </div>

          <button
            type="submit"
            className={styles['listing-form__button--submit']}
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
};

export default ListingForm;
