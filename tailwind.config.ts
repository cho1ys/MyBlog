import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // 모든 하위 폴더와 파일 포함
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", // Next.js 기본 폴더 경로 추가
    "./components/**/*.{js,ts,jsx,tsx,mdx}" // components 폴더 포함
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};

export default config;
