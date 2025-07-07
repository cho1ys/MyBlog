import {
  analyzeTechStack,
  fetchGitHubRepos,
  fetchGitHubUser,
  fetchTotalCommits,
} from '@/app/lib/github';
import { NextResponse } from 'next/server';

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

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
