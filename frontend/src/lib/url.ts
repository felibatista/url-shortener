import { getUser } from "./auth";
import { Url } from "./types";
import { getUrlAPI } from "./utils";

export async function getUrls() {
  const user = await getUser();

  if (!user || !user.id) {
    return [];
  }

  const data: Array<Url> = await fetch(
    `${getUrlAPI()}/api/User/urls/${user.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    }
  ).then((res) => res.json());

  return data;
}

export async function getUrl(id: number) {
  const user = await getUser();

  if (!user || !user.id) {
    return null;
  }

  const data: Url = await fetch(`${getUrlAPI()}/api/XYZ/getById?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  }).then((res) => res.json());

  return data;
}

export async function removeUrl(id: number) {
  const user = await getUser();

  if (!user || !user.id) {
    return false;
  }

  const data = await fetch(`${getUrlAPI()}/api/XYZ/deleteById?id=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  }).then((res) => res);

  if (data.status === 200) {
    return true;
  }

  return false;
}

export async function addUrl(name: string, url: string, category: string) {
  const user = await getUser();

  if (!user || !user.id) {
    return false;
  }

  const data = await fetch(`${getUrlAPI()}/api/XYZ/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify({
      "name": name,
      "urlLong": url,
      "categoryName": category,
      "userId": user.id,
    }),
  }).then((res) => res);

  const json = await data.json();

  if (json.error || data.status !== 200) {
    return false;
  }

  return json;
}
