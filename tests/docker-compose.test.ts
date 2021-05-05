import "jest";
import { readVersion, writeVersion } from "../src/docker-compose";

test("should readVersion", (): void => {
  expect(readVersion("")).toBe("0.0.0");
});

test("should writeVersion", (): void => {
  expect(writeVersion("", "")).toBe("version: 0.0.0");
});
