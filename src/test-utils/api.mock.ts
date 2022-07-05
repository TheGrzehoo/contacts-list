import { API_BATCH_SIZE } from "src/api/api.settings";
import { delay } from "src/utils/delay";
import mockData from "../mockData.json";

let cursor = -1;

export async function successApiMock() {
  await delay(1000);
  cursor += 1;
  const start = cursor * API_BATCH_SIZE;
  const end = cursor * API_BATCH_SIZE + API_BATCH_SIZE;
  return mockData.slice(start, end);
}

export async function failApiMock() {
  await delay(1000);
  cursor += 1;
  throw new Error("Something went wrong");
}
