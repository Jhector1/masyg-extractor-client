import { useState } from 'react';
import { handleCheckout } from '../payment/client.ts';
import useUnsavedChanges from '../../../../hooks/useUnsavedChanges.ts';
import { useAuth } from '../../../../context/index.tsx';
import { LockClosedIcon } from '@heroicons/react/20/solid';

const SubscriptionPlans = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [handleSaveData] = useUnsavedChanges();
  const { state } = useAuth();

  // Plans with price IDs to pass dynamically
  const plans = [
    {
      title: '7-day Trial',
      price: '$0.95',
      priceId: 'price_7DAYTRIAL', // Replace with your Stripe price ID
      features: [
        'Extract keywords from up to 5 PDFs or images',
        'Basic Excel file creation',
        'Combine up to 2 Excel files',
        'Email support',
      ],
      trial: true,
      popular: false,
      annual: false,
    },
    {
      title: 'Monthly Full Access',
      price: '$30.95',
      priceId: 'price_MONTHLYFULL', // Replace with your Stripe price ID
      features: [
        'Unlimited keyword extraction',
        'Advanced Excel formatting and data merging',
        'Batch process up to 10 files simultaneously',
        'Priority customer support',
      ],
      trial: false,
      popular: true,
      annual: false,
    },
    {
      title: 'Annual Plan Currently Unavailable',
      price: '$24.9/month',
      priceId: 'price_ANNUALPLAN', // Replace with your Stripe price ID
      features: [
        'Unlimited extractions',
        'Batch process up to 50 files simultaneously',
        'Custom Excel templates and data merging',
        'Dedicated support team with 24/7 assistance',
      ],
      trial: false,
      popular: false,
      annual: true,
    },
  ];

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className='bg-gray-50 py-10'>
      <div className='max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg'>
        <h2 className='text-2xl font-bold text-gray-800 mb-6 text-center'>
          PDF & Image Keyword Extraction Plans
        </h2>
        <p className='text-center text-gray-600 mb-8'>
          Extract keywords and transform data into Excel files effortlessly. Choose the plan that
          best suits your needs.
        </p>
        <div className='space-y-6'>
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`p-6 border rounded-lg ${
                plan.popular ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}>
              <div
                className='cursor-pointer flex justify-between items-center'
                onClick={() => toggleExpand(index)}
                aria-expanded={expandedIndex === index}
                aria-controls={`plan-${index}`}>
                <h3 className='text-lg font-semibold text-gray-800'>{plan.title}</h3>
                <p className='text-gray-700 text-lg'>{plan.price}</p>
              </div>
              {expandedIndex === index && (
                <div className='mt-4' id={`plan-${index}`}>
                  <ul className='space-y-2 text-gray-600'>
                    {plan.features.map((feature, i) => (
                      <li key={i} className='flex items-center'>
                        <span className='inline-block w-5 h-5 mr-2 text-blue-500'>✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    disabled={plan.trial && state.user?.hasUsedTrial || plan.annual}
                    onClick={() => {
                      handleSaveData();
                      handleCheckout(plan.trial); // Pass trial flag and priceId
                    }}
                    className={`mt-6 w-full py-2 flex justify-center gap-2 px-4 font-bold text-white rounded ${
                      plan.trial && state.user?.hasUsedTrial || plan.annual && 'cursor-not-allowed'
                    } ${
                      plan.popular
                        ? 'bg-blue-500 hover:bg-blue-600'
                        : 'bg-gray-700 hover:bg-gray-800'
                    }`}>
                      {plan.annual&&   <LockClosedIcon className='h-6 w-6 text-gray-300' />}
                    {plan.trial ? (
                      state.user?.hasUsedTrial ? (
                        <><LockClosedIcon className='h-6 w-6 text-gray-300' /> <p>Trial used. Please choose a paid plan.</p></>
                      ) : (
                        <span>Choose {plan.title}</span>
                      )
                    ) : (
                      <span>Choose {plan.title}</span>
                    )}

                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <p className='mt-6 text-sm text-gray-500 text-center'>
          After 7 days, the price is $35.95 + TAXES with auto-renewal. Billed every 4 weeks. Cancel anytime.
        </p>
        <p className='text-sm text-gray-500 text-center'>
          Money-back guarantee for 7 days. Contact{' '}
          <a href='mailto:support@yourdomain.com' className='text-blue-500'>
            support@masyglink.com
          </a>{' '}
          or call{' '}
          <a href='tel:+1234567890' className='text-blue-500'>
            +1 (773) 690-7299
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
