const API_KEY = "AIzaSyDqZ8KNB_bVU7Um0nyJhrC955uNjxk03lM";

export async function rechercherLivres(query: string) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    query,
  )}&maxResults=10&key=${API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("API_ERROR");
  }

  const data = await response.json();

  return data.items ?? [];
}
