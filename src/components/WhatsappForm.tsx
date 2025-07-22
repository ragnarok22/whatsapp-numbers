import { useEffect, useState } from "react";

interface CountryPrefix {
  number: string;
  country: string;
}

const prefix: CountryPrefix[] = [
  {
    number: "597",
    country: "Suriname",
  },
  {
    number: "1",
    country: "USA",
  },
  {
    number: "53",
    country: "Cuba",
  },
  {
    number: "549",
    country: "Argentina",
  },
];

export function parsePhoneNumber(rawPhone: string, countryCode: string) {
  const digits = rawPhone.replace(/[^0-9]/g, "");
  return digits.startsWith(countryCode)
    ? digits.slice(countryCode.length)
    : digits;
}

export default function WhatsappForm() {
  const [selectedCountry, setSelectedCountry] = useState<CountryPrefix>(
    prefix[0],
  );
  const [rawPhone, setRawPhone] = useState("");

  const parseSelectedPhone = (rawPhone: string) =>
    parsePhoneNumber(rawPhone, selectedCountry.number);

  const redirectToWhatsapp = (phone: string) => {
    const url = `https://wa.me/${selectedCountry.number}${phone}`;
    window.location.href = url;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const phone = parseSelectedPhone(rawPhone);

    redirectToWhatsapp(phone);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(
      prefix.find((item) => item.number === e.target.value) || prefix[0],
    );
  };

  const handleShare = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (rawPhone === "") {
      alert("Please enter a phone number");
      return;
    }
    const phone = parseSelectedPhone(rawPhone);

    // retrieves the URL of the current page
    const url = `${window.location.href}?phone=${encodeURIComponent(phone)}`;

    const result = navigator.canShare({ url });
    if (result) {
      await navigator.share({ url });
      return;
    }

    // copy to clipboard
    await navigator.clipboard.writeText(url);
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const rawPhone = query.get("phone");

    if (rawPhone) {
      const phone = parseSelectedPhone(rawPhone);
      redirectToWhatsapp(phone);
    }
  }, []);

  return (
    <div className="w-10/12 md:w-[400px]">
      <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
        Whatsapp Redirect
      </h2>
      <form
        className="flex flex-col gap-4"
        action="post"
        onSubmit={handleSubmit}
      >
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Location
          </label>
          <select
            id="location"
            name="location"
            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary/60 sm:text-sm sm:leading-6"
            onChange={handleCountryChange}
            value={selectedCountry.number}
          >
            {prefix.map((item) => (
              <option value={item.number} key={item.number}>
                {item.country}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="phone"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Phone number
          </label>
          <div className="mt-2 flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
              +{selectedCountry.number}
            </span>
            <input
              type="tel"
              name="phone-number"
              id="phone-number"
              autoComplete="tel"
              className="flex-1 block w-full rounded-none rounded-r-md border-0 py-1.5 pl-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary/60 sm:text-sm sm:leading-6"
              placeholder="Phone number"
              value={rawPhone}
              onChange={(e) => setRawPhone(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            className="w-2/3 rounded-md bg-slate-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/60"
            onClick={handleShare}
          >
            Share
          </button>
          <button
            type="submit"
            className="w-full rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/60"
          >
            Go
          </button>
        </div>
      </form>
    </div>
  );
}
