"use client";

import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();
  return (
    <section className="h-screen bg-gray-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mt-8 max-w-screen-sm px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow">
            <div className="px-4 py-6 sm:px-8 sm:py-10 flex flex-col justify-center items-center gap-5">
              <h1 className="font-medium text-base sm:text-lg text-center text-red-700">
                You are not authorized to view the page requested. Click{" "}
                <span
                  onClick={() => router.push("/")}
                  className="font-bold hover:underline cursor-pointer"
                >
                  here
                </span>{" "}
                to go back.
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
