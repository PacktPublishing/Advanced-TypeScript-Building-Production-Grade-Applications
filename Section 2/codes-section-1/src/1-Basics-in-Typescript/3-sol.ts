import { Equal, Expect } from "..";

async function fetchServerVersion(): Promise<number> {
  const response = await fetch("https://api.example.com/v");
  const data = await response.json();
  return data;
}

const example = async () => {
  const version = await fetchServerVersion();

  type test = Expect<Equal<typeof version, number>>;
};
