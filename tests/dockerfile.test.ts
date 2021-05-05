import "jest";
import { readVersion, writeVersion } from "../src/dockerfile";

test("should readVersion", (): void => {
  expect(readVersion("")).toBe("0.0.0");
});

test("should writeVersion", (): void => {
  expect(writeVersion("", "")).toBe("ENV VERSION=0.0.0");
});
