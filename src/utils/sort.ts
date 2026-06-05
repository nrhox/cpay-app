export const TextCompare = (first: string, second: string) =>
  first.localeCompare(second);
export const NewestFirst = (first: string, second: string) =>
  new Date(second).getTime() - new Date(first).getTime();
