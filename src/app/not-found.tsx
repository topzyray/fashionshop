"use client";

import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <section className="w-full h-screen min-h-screen">
      <div className="h-full mx-auto bg-gray-100 px-4 sm:px-6 lg:px-8 flex justify-center items-start">
        <div className="bg-white shadow h-1/3 mt-8 flex flex-col justify-center">
          <div className="p-6 sm:p-12 text-red-500">
            <h1 className="text-2xl">Opps! Page Not Found</h1>
          </div>
          <div className="mx-auto">
            <button
              onClick={() => router.push("/")}
              type="button"
              className="btn-small max-w-sm"
            >
              Home
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
