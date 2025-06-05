import { NextResponse } from 'next/server';
import {
  fetchGitHubUser,
  fetchGitHubRepos,
  fetchTotalCommits,
  analyzeTechStack,
} from '@/app/lib/github';

export async function GET() {
  try {
    const user = await fetchGitHubUser();
    const repos = await fetchGitHubRepos();
    const totalCommits = await fetchTotalCommits();
    const techStack = await analyzeTechStack();

    return NextResponse.json({
      user,
      repos,
      totalCommits,
      techStack,
    });
  } catch (error) {
    console.error('에러 발생:', error);
    return null;
  }
}
