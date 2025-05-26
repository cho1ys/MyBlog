import { useState, useEffect } from 'react';
import { analyzeTechStack, fetchGitHubRepos, fetchGitHubUser, fetchTotalCommits } from '../api/datas/route';
import { GitHubStats } from '../types';

export function useGitHubData() {
  const [githubStats, setGithubStats] = useState<GitHubStats>({
    totalCommits: 0,
    totalRepos: 0,
    techStack: [],
    createdAt: null,
    loading: true
  });

  useEffect(() => {
    const loadGitHubData = async () => {
      try {
        const [userInfo, repos, totalCommits, techStack] = await Promise.all([
          fetchGitHubUser(),
          fetchGitHubRepos(),
          fetchTotalCommits(),
          analyzeTechStack()
        ]);

        setGithubStats({
          totalCommits,
          totalRepos: repos.length,
          techStack,
          createdAt: userInfo?.created_at ?? null,
          loading: false
        });
      } catch (error) {
        console.error('GitHub 데이터 로딩 실패:', error);
        setGithubStats(prev => ({ ...prev, loading: false }));
      }
    };

    loadGitHubData();
  }, []);

  return githubStats;
}
