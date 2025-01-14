import { NextResponse } from 'next/server';
import { marked } from 'marked';

const VELOG_API_URL = 'https://v2.velog.io/graphql';

export async function POST(req: Request) {
  try {
    const { username, url_slug } = await req.json();

    if (!username || !url_slug) {
      return NextResponse.json(
        { error: 'username and url_slug are required' },
        { status: 400 }
      );
    }

    // GraphQL 요청 본문 구성
    const reqBody = {
      operationName: 'ReadPost',
      variables: { username, url_slug },
      query: `
        query ReadPost($username: String, $url_slug: String) {
          post(username: $username, url_slug: $url_slug) {
            id
            title
            released_at
            updated_at
            tags
            body  # 전체 본문
            short_description  # 짧은 설명
            is_markdown  # Markdown 여부
            is_private
            is_temp
            thumbnail
            comments_count
            url_slug
            likes
            liked
            user {
              id
              username
              profile {
                id
                display_name
                thumbnail
                short_bio
                profile_links
                __typename
              }
              velog_config {
                title
                __typename
              }
              __typename
            }
            comments {
              id
              user {
                id
                username
                profile {
                  id
                  thumbnail
                  __typename
                }
                __typename
              }
              text
              replies_count
              level
              created_at
              deleted
              __typename
            }
            series {
              id
              name
              url_slug
              series_posts {
                id
                post {
                  id
                  title
                  url_slug
                  user {
                    id
                    username
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            linked_posts {
              previous {
                id
                title
                url_slug
                user {
                  id
                  username
                  __typename
                }
                __typename
              }
              next {
                id
                title
                url_slug
                user {
                  id
                  username
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
        }
      `,
    };

    // Velog API 호출
    const response = await fetch(VELOG_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reqBody),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data from Velog API: ${response.statusText}`);
    }

    const data = await response.json();

    // 마크다운을 HTML로 변환하여 이미지 URL을 추출
    const postBody = data.data.post.body;
    const isMarkdown = data.data.post.is_markdown;
    const images: string[] = [];

    if (isMarkdown) {
      // 마크다운을 HTML로 변환 (비동기 처리 필요시 await 사용)
      const htmlContent = await marked(postBody);  // await 추가

      // <img> 태그에서 이미지 URL을 추출하는 정규식
      const imgRegex = /<img[^>]+src="([^">]+)"/g;
      let match;
      while ((match = imgRegex.exec(htmlContent)) !== null) {
        images.push(match[1]);  // 이미지 URL 추가
      }
    }

    // 결과 반환
    return NextResponse.json({
      ...data,
      images,  // 추출된 이미지 URL 추가
    });

  } catch (error) {
    console.error('Error fetching Velog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Velog post' },
      { status: 500 }
    );
  }
}
