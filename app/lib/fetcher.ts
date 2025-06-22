// lib/fetcher.ts

import MyAccessToken from "~/utils/access-token";

export async function fetcher<T>(url: string): Promise<T> {
  const token = MyAccessToken.get();

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (!res.ok) {
    throw new Error(`Error ${res.status}`);
  }

  return res.json();
}
