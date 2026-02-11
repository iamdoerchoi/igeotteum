"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SUPPORTED_COUNTRIES } from "@/lib/constants";

export default function CountryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 현재 URL의 ?geo= 값을 읽어옴 (없으면 KR)
  const currentGeo = searchParams.get("geo") || "KR";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGeo = e.target.value;
    // 메인 페이지로 이동하며 쿼리 스트링 변경
    router.push(`/?geo=${selectedGeo}`);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="country-select" className="text-sm font-medium text-slate-600 hidden sm:block">
        국가 변경:
      </label>
      <div className="relative">
        <select
          id="country-select"
          value={currentGeo}
          onChange={handleChange}
          className="appearance-none cursor-pointer rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-8 text-sm font-bold text-slate-700 shadow-sm hover:border-slate-300 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
        >
          {SUPPORTED_COUNTRIES.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>

        {/* 커스텀 화살표 아이콘 (select 기본 화살표 가리고 이쁜거 넣기) */}
        <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}
