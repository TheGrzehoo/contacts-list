import { API_BATCH_SIZE } from "src/api/api.settings";
import { delay } from "src/utils/delay";
import mockData from "../mockData.json";

export function contactListApiMock(shouldFail?: boolean) {
  let cursor = -1;
  let fetchMoreAvailable = true;
  return async () => {
    await delay(1000);
    if (shouldFail) {
      throw new Error("");
    }
    cursor += 1;
    const start = cursor * API_BATCH_SIZE;
    const end = cursor * API_BATCH_SIZE + API_BATCH_SIZE;
    fetchMoreAvailable = end < mockData.length;
    return {
      data: mockData.slice(start, end),
      fetchMoreAvailable,
    };
  };
}
