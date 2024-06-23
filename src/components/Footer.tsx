import Link from "next/link";
import Newsletter from "./Newsletter";

const Footer = () => {
  return (
    <>
      <section className="w-full bg-[#1D2939] text-[#F2F4F7] py-8 sm:py-10 md:py-16 lg:py-28 px-4 md:px-10 xl:px-32">
        <section className="flex flex-col gap-10 sm:gap-14">
          <section className="flex flex-col sm:flex-row sm:justify-around lg:justify-between gap-8">
            <Newsletter />

            <section className="flex flex-col gap-2">
              <h4 className="text-lg font-semibold mb-1">Resources</h4>
              <ul className="text-base font-normal flex flex-col gap-2">
                <Link href="/news" className={"hover:underline"}>
                  <li className="">News</li>
                </Link>
                <Link href="/faq" className={"hover:underline"}>
                  <li className="">Faq</li>
                </Link>
                <Link href="/guide" className={"hover:underline"}>
                  <li className="">Guide</li>
                </Link>
              </ul>
            </section>
          </section>

          <section className="text-center">
            <p className="text-base">© 2024, FashionShop or its affiliates</p>
          </section>
        </section>
      </section>
    </>
  );
};

export default Footer;
