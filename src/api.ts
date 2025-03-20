import { Category, Paginated } from './types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:8000';

/*
async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
  */

export class QuestionsApi {
  async fetchFromApi<T>(url: string): Promise<T | null> {
    //await sleep(1000);
    let response: Response | undefined;
    console.log("Running fetchFromApi")
    try {
      console.log("URL:", url)
      console.log("Fetching url:", fetch(url))
      response = await fetch(url);
    } catch (e) {
      console.error('error fetching from api', url, e);
      return null;
    }

    if (!response.ok) {
      console.error('non 2xx status from API', url);
      return null;
    }

    if (response.status === 404) {
      console.error('404 from API', url);
      return null;
    }

    let json: unknown;
    try {
      json = await response.json();
    } catch (e) {
      console.error('error parsing json', url, e);
      return null;
    }

    return json as T;
  }

  async getCategory(slug: string): Promise<Category | null> {
    const url = BASE_URL + `/categories/${slug}`;

    const response = await this.fetchFromApi<Category | null>(url);

    return response;
  }

  async getCategories(): Promise<Paginated<Category> | null> {
    const url = BASE_URL + '/categories';

    const response = await this.fetchFromApi<Paginated<Category>>(url);

    // TODO hér gæti ég staðfest gerð gagna

    return response;
  }
  /*
  async getQuestions(
    categorySlug: string,
  ): Promise<Paginated<Question> | null> {
    const url = BASE_URL + `/questions?category=${categorySlug}`;
    // new URL()

    const response = await this.fetchFromApi<Paginated<Question>>(url);

    return response;
  }

  async breytaFlokk(categorySlug: string, title: string): Promise<Paginated<Question> | null> {

  }
  */
}
