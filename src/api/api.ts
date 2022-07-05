import { delay } from "src/utils/delay";
import mockData from "../mockData.json";
import { API_BATCH_SIZE } from "./api.settings";

let cursor = -1;
let fetchMoreAvailable = true;

export default async function apiData() {
  await delay(1000);
  if (Math.random() > 0.7) {
    throw new Error("Something went wrong");
  }
  cursor += 1;
  const start = cursor * API_BATCH_SIZE;
  const end = cursor * API_BATCH_SIZE + API_BATCH_SIZE;
  fetchMoreAvailable = end < mockData.length;
  return {
    data: mockData.slice(start, end),
    fetchMoreAvailable,
  };
}
