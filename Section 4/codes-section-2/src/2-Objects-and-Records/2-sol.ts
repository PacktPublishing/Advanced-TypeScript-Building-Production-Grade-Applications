import { Equal, Expect } from "..";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  publishedAt: string;
}

// Asynchronously fetches a blog post from an API.
const fetchBlogPost = async (): Promise<
  Pick<BlogPost, "title" | "content">
> => {
  const response = await fetch("/api/blogpost");
  const post = await response.json();
  return post;
};

const getBlogSummary = async () => {
  const post = await fetchBlogPost();

  // Extract only part of the properties: title and content.
  type test = Expect<Equal<typeof post, { title: string; content: string }>>;
};
