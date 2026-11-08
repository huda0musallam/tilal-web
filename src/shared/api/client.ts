const DEFAULT_API_URL = "https://tilal-api.onrender.com";

interface TestModes {
  delay: number;
  fail: number | null;
  empty: boolean;
}

function parseApiUrl(raw: string) {
  const url = new URL(raw);
  const parts = url.pathname.split("/").filter(Boolean);
  const modes: TestModes = { delay: 0, fail: null, empty: false };
  const rest: string[] = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const next = Number(parts[i + 1]);
    if (part === "delay" && Number.isInteger(next) && next >= 0) {
      modes.delay = next;
      i++;
    } else if (part === "fail" && Number.isInteger(next) && next >= 400 && next <= 599) {
      modes.fail = next;
      i++;
    } else if (part === "empty") {
      modes.empty = true;
    } else {
      rest.push(part);
    }
  }

  url.pathname = rest.join("/");
  return { base: url.toString().replace(/\/$/, ""), modes };
}

const { base: API_URL, modes } = parseApiUrl(process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL);

export const apiKeys = {
  products: `${API_URL}/products`,
  beans: `${API_URL}/beans`,
  reviews: `${API_URL}/reviews`,
  suggestions: `${API_URL}/suggestions`,
};

export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchJson<T>(
  url: string,
  guard: (v: unknown) => v is T,
  init?: RequestInit,
): Promise<T> {
  if (modes.delay > 0) await wait(modes.delay);
  if (modes.fail !== null) {
    throw new ApiError(modes.fail, `ما قدرنا نجيب البيانات من ${url}`);
  }

  const isRead = !init?.method || init.method === "GET";
  let data: unknown;
  if (modes.empty && isRead) {
    data = [];
  } else {
    const res = await fetch(url, init);
    if (!res.ok) {
      throw new ApiError(res.status, `ما قدرنا نجيب البيانات من ${url}`);
    }
    data = await res.json();
  }

  if (!guard(data)) {
    throw new ApiError(422, `البيانات اللي وصلت من ${url} مش بالشكل المتوقع`);
  }
  return data;
}
