import { CreditCardIcon } from "@heroicons/react/24/outline";

export function Footer() {
  return (
    <footer className="bg-gray-100 text-center p-4 mt-auto">
      <p className="text-sm text-gray-500">© 2024. Masyg Link. All rights reserved.</p>
      <div className="flex justify-center mt-2 space-x-4">
        {/* Visa Icon */}
        <span className="flex items-center text-blue-600">
          <CreditCardIcon className="w-6 h-6" aria-label="Visa" />
          <span className="ml-1">Visa</span>
        </span>

        {/* Mastercard Icon */}
        <span className="flex items-center text-red-600">
          <CreditCardIcon className="w-6 h-6" aria-label="Mastercard" />
          <span className="ml-1">Mastercard</span>
        </span>

        {/* PayPal Icon */}
        <span className="flex items-center text-yellow-500">
          <CreditCardIcon className="w-6 h-6" aria-label="PayPal" />
          <span className="ml-1">PayPal</span>
        </span>
      </div>
    </footer>
  );
}
