import { Equal, Expect } from "..";

const fetchArticle = async (): Promise<[undefined | Error, unknown?]> => {
  const res = await fetch("some.dummy.url/api/article");

  if (!res.ok) {
    return [new Error("Fetching article failed.")];
  }

  const article = await res.json();

  return [undefined, article];
};

const example = async () => {
  const [error, article] = await fetchArticle();

  type Tests = [
    Expect<Equal<typeof error, Error | undefined>>,
    Expect<Equal<typeof article, unknown>>
  ];
};
