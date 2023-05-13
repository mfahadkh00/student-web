export default async function apiCaller<T>(
  method: string,
  path: string,
  data?: any
): Promise<T[] | null> {
  return fetch(process.env.REACT_APP_BASE_URL + path, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : null,
  }).then(async (res) => {
    //API restpoint sends an empty body on PUT and DELETE causing JSON parse error
    if (method === "put" || method === "delete") return;
    return res?.json();
  });
}
