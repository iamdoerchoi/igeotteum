export const YOUTUBE_CATEGORY_MAP: Record<string, string> = {
  "1": "영화/애니",
  "2": "자동차",
  "10": "음악",
  "15": "동물",
  "17": "스포츠",
  "18": "단편 영화",
  "19": "여행/이벤트",
  "20": "게임",
  "21": "브이로그",
  "22": "인물/블로그",
  "23": "코미디",
  "24": "엔터테인먼트",
  "25": "뉴스/정치",
  "26": "노하우/스타일",
  "27": "교육",
  "28": "과학/기술",
  "29": "비영리/사회운동",
};

export const SUPPORTED_COUNTRIES = [
  { code: "KR", name: "🇰🇷 대한민국" },
  { code: "US", name: "🇺🇸 미국" },
  { code: "JP", name: "🇯🇵 일본" },
  // { code: "VN", name: "🇻🇳 베트남" },
  // { code: "IN", name: "🇮🇳 인도" },
  // { code: "GB", name: "🇬🇧 영국" },
  // { code: "BR", name: "🇧🇷 브라질" },
];

export const VIDEO_CATEGORIES = [
  { id: "0", name: "전체" }, // API 호출 시 0이면 파라미터 제외
  { id: "10", name: "음악" },
  { id: "24", name: "엔터테인먼트" },
  { id: "20", name: "게임" },
  { id: "23", name: "코미디" },
  { id: "17", name: "스포츠" },
  { id: "25", name: "뉴스/정치" },
  { id: "22", name: "인물/블로그" },
  { id: "1", name: "영화/애니" },
  { id: "28", name: "과학/기술" },
  { id: "15", name: "동물" },
];
