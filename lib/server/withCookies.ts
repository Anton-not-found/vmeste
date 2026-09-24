import { cookies } from 'next/headers';

export const withCookies = async <T>(
  fn: (cookieHeader: string) => Promise<T>
): Promise<T> => {
  const cookieStore = await cookies();
  let cookieHeader = '';
  cookieStore.getAll().forEach((c, i) => {
    if (i > 0) cookieHeader += '; ';
    cookieHeader += `${c.name}=${c.value}`;
  });
  return fn(cookieHeader);
};