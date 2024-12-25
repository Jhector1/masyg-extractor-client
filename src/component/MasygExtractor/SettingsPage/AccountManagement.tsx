import { useState } from 'react';
import { useAuth } from '../../../context';
import { UserUpdateInfo } from '../../../type.ts';
import { handleUpdateUser, MyForm } from '../../authenticationForm/client.ts';

interface AccountManagementProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  setShowToast: (showToast: boolean) => void;
}

export function AccountManagement({
  isLoading,
  setIsLoading,
  setShowToast,
}: AccountManagementProps) {
  const { state } = useAuth();
  const [errors, setErrors] = useState<MyForm>({ form1: null, form2: null });
  const [form1Data, setForm1Data] = useState<Partial<UserUpdateInfo>>({
    email: state.user?.email ?? '',
    username: state.user?.username ?? '',
    old_password: '',
  });

  const [form2Data, setForm2Data] = useState<Partial<UserUpdateInfo>>({
    old_password: '',
    password: '',
    confirm_password: '',
  });

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password: string) =>
    password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);

  const validateForm1 = () => {
    if (!validateEmail(form1Data.email || '')) {
      setErrors((prev) => ({ ...prev, form1: 'Invalid email format.' }));
      return false;
    }
    if (!form1Data.old_password) {
      setErrors((prev) => ({ ...prev, form1: 'Current password is required.' }));
      return false;
    }
    return true;
  };

  const validateForm2 = () => {
    if (!form2Data.old_password || !form2Data.password || !form2Data.confirm_password) {
      setErrors((prev) => ({
        ...prev,
        form2: 'All password fields are required.',
      }));
      return false;
    }
    if (form2Data.password !== form2Data.confirm_password) {
      setErrors((prev) => ({
        ...prev,
        form2: 'Passwords do not match.',
      }));
      return false;
    }
    if (!validatePassword(form2Data.password)) {
      setErrors((prev) => ({
        ...prev,
        form2: 'Password must be at least 8 characters long, include one uppercase letter and one number.',
      }));
      return false;
    }
    return true;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFormData: React.Dispatch<React.SetStateAction<Partial<UserUpdateInfo>>>,
    clearError: string
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [clearError]: null }));
  };

  const renderInputField = (
    id: string,
    name: string,
    value: string,
    placeholder: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    label: string,
    type = 'text',
    required = false
  ) => (
    <div className="mb-5">
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
      />
    </div>
  );

  const renderSubmitButton = (isLoading: boolean, text: string, disabled = false) => (
    <div className="flex">
      <button
        type="submit"
        disabled={isLoading || disabled}
        className={`ml-auto px-5 py-2.5 font-medium text-white rounded-lg ${
          isLoading || disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800'
        }`}
      >
        {isLoading ? 'Updating...' : text}
      </button>
    </div>
  );

  const handleFormSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    formType: 'form1' | 'form2',
    validate: () => boolean,
    formData: Partial<UserUpdateInfo>
  ) => {
    e.preventDefault();
    if (validate()) {
      handleUpdateUser(e, setErrors, formType, formData, state, setIsLoading, setShowToast);
    }
  };

  return (
    <section id="account" className="mb-8 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4">Account</h2>
        <p className="text-gray-600 mb-6">
          Have a better experience on Masyg Extractor by keeping your information up-to-date.
        </p>

        {/* Form 1: Update User Info */}
        <form
          onSubmit={(e) =>
            handleFormSubmit(e, 'form1', validateForm1, form1Data)
          }
          className="mt-4"
        >
          {errors.form1 && <p className="text-red-500 text-sm mb-4">{errors.form1}</p>}

          {renderInputField(
            'email',
            'email',
            form1Data.email || '',
            'Enter your email',
            (e) => handleChange(e, setForm1Data, 'form1'),
            'Your Email',
            'email'
          )}
          {renderInputField(
            'username',
            'username',
            form1Data.username || '',
            'Enter your username',
            (e) => handleChange(e, setForm1Data, 'form1'),
            'Your Username'
          )}
          {renderInputField(
            'old_password',
            'old_password',
            form1Data.old_password || '',
            'Enter your current password',
            (e) => handleChange(e, setForm1Data, 'form1'),
            'Current Password',
            'password',
            true
          )}

          {renderSubmitButton(isLoading, 'Update Info')}
        </form>

        {/* Form 2: Update Password */}
        <form
          onSubmit={(e) =>
            handleFormSubmit(e, 'form2', validateForm2, form2Data)
          }
          className="mt-4"
        >
          {errors.form2 && <p className="text-red-500 text-sm mb-4">{errors.form2}</p>}

          {renderInputField(
            'old_password',
            'old_password',
            form2Data.old_password || '',
            'Enter your current password',
            (e) => handleChange(e, setForm2Data, 'form2'),
            'Current Password',
            'password',
            true
          )}
          {renderInputField(
            'password',
            'password',
            form2Data.password || '',
            'Enter your new password',
            (e) => handleChange(e, setForm2Data, 'form2'),
            'New Password',
            'password',
            true
          )}
          {renderInputField(
            'confirm_password',
            'confirm_password',
            form2Data.confirm_password || '',
            'Confirm your new password',
            (e) => handleChange(e, setForm2Data, 'form2'),
            'Confirm New Password',
            'password',
            true
          )}

          {renderSubmitButton(isLoading, 'Update Password')}
        </form>
      </div>
    </section>
  );
}
