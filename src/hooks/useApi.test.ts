import { setupServer } from "msw/node";
import { handlers } from "../../mock/handler";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useApi } from "./useApi";
import { rest } from "msw";

const server = setupServer(...handlers);
const url = "http://localhost:3002/test";

describe("useApi", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("getデータが取得できる", async () => {
    const { result } = renderHook(() => useApi(url));
    await waitFor(() => expect(result.current.data).not.toBeNull());
    expect(result.current.data).toEqual({ message: "Get data" });
    expect(result.current.error).toBeNull();
  });

  it("Getリクエストでエラーが発生する", async () => {
    server.use(
      rest.get(url, (_, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    const { result } = renderHook(() => useApi(url));
    await waitFor(() => expect(result.current.error).not.toBeNull());
  });

  describe("POSTリクエスト", () => {
    it("POSTリクエストが成功する", async () => {
      const { result } = renderHook(() => useApi(url));
      let response;
      await act(async () => {
        response = await result.current.postData({});
      });
      expect(response!.data).toEqual({ message: "Post data" });
    });

    it("POSTリクエストでエラーが発生する", async () => {
      server.use(
        rest.post(url, (_, res, ctx) => {
          return res(ctx.status(500));
        })
      );
      const { result } = renderHook(() => useApi(url));
      await act(async () => {
        await result.current.postData({});
      });
      expect(result.current.error).toBe("エラーが発生しました");
    });
  });
});
