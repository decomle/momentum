import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { CenterAlginedHeading } from '@/components/headings';
import { JammyLoader, LoadingDots, AuthorCard, MessageCard } from '@/components/commons';
import { useLogin } from "@/hooks";

export default function LoginPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const { loginUser, isLoading, error, isError, successMessage, clearMessageState } = useLogin();

  // Clear the "Account created" message if the user refreshes or navigates away
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(clearMessageState, 5000); // Optional: clear after 5s
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleSubmit = (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    loginUser({ email, password });
  };

  const handleFormInput = () => {
    setIsFormValid(formRef.current?.checkValidity() ?? false);
  };

  const inputClass = "w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-300 transition-all";

  return (
    <div className="h-full flex px-6 pt-12 pb-6">
      <div className="w-full flex-1 flex flex-col">
        <div className="space-y-8">
          <CenterAlginedHeading />
          <div className="border-t border-neutral-200"/>

          {successMessage && <MessageCard message={successMessage} />}

          {isError && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-md px-4 py-3 text-sm animate-in fade-in duration-300">
              {error}
            </div>
          )}

          <form ref={formRef} action={handleSubmit} onInput={handleFormInput} className="space-y-4">
            <div>
              <label className="block text-sm text-neutral-600 mb-1">Email</label>
              <input type="email" name="email" required placeholder="your_email@gmail.com" className={inputClass} />
            </div>

            <div>
              <label className="block text-sm text-neutral-600 mb-1">Password</label>
              <input type="password" name="password" required placeholder="******" className={inputClass} />
            </div>

            <button type="submit" disabled={!isFormValid || isLoading}
              className="w-full py-2 btn-primary rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <p className="text-sm text-center text-neutral-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-neutral-900 hover:underline">Create one</Link>
          </p>
        </div>

        <div className="mt-8">
          <JammyLoader desc={<LoadingDots prefix="Install as app for easy access" />}/>
        </div>

        <div className="mt-auto pt-5 border-t border-neutral-200 text-center">
          <AuthorCard />
        </div>
      </div>
    </div>
  );
}