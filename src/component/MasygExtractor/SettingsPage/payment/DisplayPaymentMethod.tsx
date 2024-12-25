import  { PaymentMethod } from "../../../../type.ts";
import { handleDeletePaymentMethod } from "./client.ts";

interface PaymentMethodProps{
    paymentMethods: PaymentMethod[],
    setPaymentMethods:React.Dispatch<React.SetStateAction<PaymentMethod[]>>,
    setIsloading: (isLoading: boolean)=>void
}
export function DisplayPaymentMethod({paymentMethods, setPaymentMethods, setIsloading}: PaymentMethodProps) {
  return (
    <section id='payment' className='mb-8'>
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <h2 className='text-xl font-bold'>Payment Methods</h2>
        <p className='text-gray-500'>View or manage your payment methods.</p>

        {paymentMethods && paymentMethods.length > 0 ? (
          <div className='mt-4'>
            {paymentMethods.map(method => (
              <div key={method.id} className='mb-4 border-b pb-4'>
                <p>
                  <strong>Card:</strong> **** **** **** {method.last4}
                </p>
                <p>
                  <strong>Brand:</strong> {method.brand}
                </p>
                <p>
                  <strong>Expires:</strong> {method.exp_month}/{method.exp_year}
                </p>
                <div className='mt-4 flex space-x-4'>
                  <button
                    className='bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600'
                    onClick={() => alert('Feature to update card coming soon!')}>
                    Update Card
                  </button>
                  <button
                    className='bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600'
                    onClick={() => handleDeletePaymentMethod(method.id, setPaymentMethods, setIsloading)}>
                    Delete Card
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className='text-gray-500'>No payment methods on file.</p>
        )}
      </div>
    </section>
  );
}
