// githubStats.ts

type GitHubUser = {
    login: string;
    public_repos: number;
    followers: number;
    following: number;
    created_at: string;
    // 필요시 다른 필드 추가
  };
  
  type GitHubRepo = {
    name: string;
    language: string | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
  
  export type TechStackItem = {
    name: string;
    level: number;
    color: string;
  };
  
  const GITHUB_USERNAME = 'cho1ys'; // 실제 GitHub 사용자명으로 교체
  const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  
  const githubAPI = {
    baseURL: 'https://api.github.com',
    headers: {
      Accept: 'application/vnd.github.v3+json',
      ...(GITHUB_TOKEN && { Authorization: `token ${GITHUB_TOKEN}` }),
    } as HeadersInit,
  };
  
  // 사용자 정보 가져오기
  export const fetchGitHubUser = async (): Promise<GitHubUser | null> => {
    try {
      const response = await fetch(`${githubAPI.baseURL}/users/${GITHUB_USERNAME}`, {
        headers: githubAPI.headers,
      });
      const data: GitHubUser = await response.json();
      return data;
    } catch (error) {
      console.error('GitHub 사용자 정보 조회 실패:', error);
      return null;
    }
  };
  
  // 레포지토리 목록 가져오기
  export const fetchGitHubRepos = async (): Promise<GitHubRepo[]> => {
    try {
      const response = await fetch(
        `${githubAPI.baseURL}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
        { headers: githubAPI.headers }
      );
      const data: GitHubRepo[] = await response.json();
      return data;
    } catch (error) {
      console.error('GitHub 레포지토리 조회 실패:', error);
      return [];
    }
  };
  
  // 총 커밋 수 계산
  export const fetchTotalCommits = async (): Promise<number> => {
    try {
      const repos = await fetchGitHubRepos();
      const commitCounts = await Promise.all(
        repos.map(async (repo) => {
          try {
            const res = await fetch(
              `${githubAPI.baseURL}/repos/${GITHUB_USERNAME}/${repo.name}/commits?per_page=1`,
              { headers: githubAPI.headers }
            );
            const linkHeader = res.headers.get('Link');
            if (linkHeader) {
              const match = linkHeader.match(/page=(\d+)>; rel="last"/);
              return match ? parseInt(match[1], 10) : 1;
            }
            return 1;
          } catch (error) {
            console.error(`${repo.name} 커밋 조회 실패:`, error);
            return 0;
          }
        })
      );
  
      return commitCounts.reduce((sum, count) => sum + count, 0);
    } catch (error) {
      console.error('총 커밋 수 계산 실패:', error);
      return 0;
    }
  };
  
  // 기술 스택 분석
  export const analyzeTechStack = async (): Promise<TechStackItem[]> => {
    try {
      const repos = await fetchGitHubRepos();
      const languageStats: Record<string, number> = {};
  
      await Promise.all(
        repos.map(async (repo) => {
          try {
            const response = await fetch(
              `${githubAPI.baseURL}/repos/${GITHUB_USERNAME}/${repo.name}/languages`,
              { headers: githubAPI.headers }
            );
            const languages: Record<string, number> = await response.json();
  
            Object.entries(languages).forEach(([lang, bytes]) => {
              languageStats[lang] = (languageStats[lang] || 0) + bytes;
            });
          } catch (error) {
            console.error(`${repo.name} 언어 정보 조회 실패:`, error);
          }
        })
      );
  
      const totalBytes = Object.values(languageStats).reduce((sum, b) => sum + b, 0);
  
      const techStack: TechStackItem[] = Object.entries(languageStats)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([language, bytes]) => ({
          name: language,
          level: Math.round((bytes / totalBytes) * 100),
          color: getLanguageColor(language),
        }));
  
      return techStack;
    } catch (error) {
      console.error('기술 스택 분석 실패:', error);
      return [];
    }
  };
  
  // 언어별 색상 매핑
  const getLanguageColor = (language: string): string => {
    const colors: Record<string, string> = {
      JavaScript: '#F7DF1E',
      TypeScript: '#3178C6',
      React: '#61DAFB',
      Python: '#3776AB',
      Java: '#ED8B00',
      HTML: '#E34F26',
      CSS: '#1572B6',
      Vue: '#4FC08D',
      'Node.js': '#339933',
      PHP: '#777BB4',
      'C++': '#00599C',
      'C#': '#239120',
      Swift: '#FA7343',
      Kotlin: '#0095D5',
      Go: '#00ADD8',
      Rust: '#000000',
      Ruby: '#CC342D',
      Shell: '#89E051',
    };
    return colors[language] || '#6B7280'; // default gray
  };
  