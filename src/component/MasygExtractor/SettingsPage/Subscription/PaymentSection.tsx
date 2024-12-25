import React, { useState } from 'react';

const formatCardNumber = (value: string): string => {
  // Remove all non-digit characters
  const onlyDigits = value.replace(/\D/g, '');
  
  // Limit to a maximum of 16 digits (typical for Visa)
  const limited = onlyDigits.slice(0, 16);
  
  // Format as `xxxx-xxxx-xxxx-xxxx`
  const parts = [];
  for (let i = 0; i < limited.length; i += 4) {
    parts.push(limited.slice(i, i + 4));
  }
  
  return parts.join('-');
};

const formatExpirationDate = (value: string): string => {
  // Remove non-digits
  const onlyDigits = value.replace(/\D/g, '');
  
  // Limit to a maximum of 4 digits (MMYY)
  const limited = onlyDigits.slice(0, 4);
  
  // Automatically insert slash after MM
  if (limited.length >= 3) {
    return limited.slice(0, 2) + '/' + limited.slice(2);
  }

  return limited;
};

const formatCvv = (value: string): string => {
  // Remove non-digits
  const onlyDigits = value.replace(/\D/g, '');
  
  // Limit CVV to 4 digits
  return onlyDigits.slice(0, 4);
};

const PaymentSection: React.FC = () => {
  const [fullName, setFullName] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expirationDate, setExpirationDate] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateInput = (): boolean => {
    const errors: Record<string, string> = {};

    // Full name validation
    if (!fullName.trim()) {
      errors.fullName = 'Full name is required.';
    }

    // Extract digits from card number for validation
    const rawCardNumber = cardNumber.replace(/\D/g, '');
    // Example Visa validation: Must start with 4 and be 13-16 digits
    const cardNumberRegex = /^4\d{12}(\d{3})?$/;
    if (!cardNumberRegex.test(rawCardNumber)) {
      errors.cardNumber = 'Invalid card number.';
    }

    // Validate expiration date format
    const expirationDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expirationDateRegex.test(expirationDate)) {
      errors.expirationDate = 'Invalid expiration date. Format: MM/YY';
    }

    // CVV validation
    // Typically 3 or 4 digits, depending on card type
    const cvvRegex = /^\d{3,4}$/;
    if (!cvvRegex.test(cvv)) {
      errors.cvv = 'Invalid CVV.';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validateInput()) {
      console.log('Form submitted:', { fullName, cardNumber, expirationDate, cvv });
    }
  };

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Payment</h2>

          <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
            <form
              onSubmit={handleSubmit}
              className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8"
            >
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="full_name"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Full name (as displayed on card)*
                  </label>
                  <input
                    type="text"
                    id="full_name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="Bonnie Green"
                    required
                  />
                  {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="card-number-input"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Card number*
                  </label>
                  <input
                    type="text"
                    id="card-number-input"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="xxxx-xxxx-xxxx-xxxx"
                    required
                  />
                  {errors.cardNumber && <p className="text-sm text-red-500">{errors.cardNumber}</p>}
                </div>

                <div>
                  <label
                    htmlFor="card-expiration-input"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Card expiration*
                  </label>
                  <input
                    type="text"
                    id="card-expiration-input"
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(formatExpirationDate(e.target.value))}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="MM/YY"
                    required
                  />
                  {errors.expirationDate && <p className="text-sm text-red-500">{errors.expirationDate}</p>}
                </div>

                <div>
                  <label
                    htmlFor="cvv-input"
                    className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    CVV*
                  </label>
                  <input
                    type="text"
                    id="cvv-input"
                    value={cvv}
                    onChange={(e) => setCvv(formatCvv(e.target.value))}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="•••"
                    required
                  />
                  {errors.cvv && <p className="text-sm text-red-500">{errors.cvv}</p>}
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Pay now
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSection;
