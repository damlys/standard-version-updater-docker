import "jest";
import { readVersion, writeVersion } from "../src/docker-compose";

test("should readVersion", (): void => {
  let input: string = "";

  input = `version: "3.8"
services:
  service0:
    image: image0:\${VERSION:1.2.3}
    build: ./dir
`;
  expect(readVersion(input)).toBe("1.2.3");

  input = `version: "3.8"
services:
  service0:
    image: image0:\${VERSION:-4.5.6-rc.1}
    build: ./dir
  service1:
    image: image1:\${VERSION:-7.8.9-rc.1}
    build: ./dir
`;
  expect(readVersion(input)).toBe("4.5.6-rc.1");

  input = `version: "3.8"
services:
  service0:
    image: image0:\${VERSION}
    build: ./dir
`;
  expect((): string => readVersion(input)).toThrow(new Error("VERSION is empty."));

  input = `version: "3.8"
services:
  service0:
    image: image0:\${VERSION:}
    build: ./dir
`;
  expect((): string => readVersion(input)).toThrow(new Error("VERSION is empty."));

  input = `version: "3.8"
services:
  service0:
    image: image0:\${VERSION:-}
    build: ./dir
`;
  expect((): string => readVersion(input)).toThrow(new Error("VERSION is empty."));

  input = `version: "3.8"
services:
  service0:
    image: image0:1.2.3
    build: ./dir
`;
  expect((): string => readVersion(input)).toThrow(new Error("VERSION is not present."));

  input = `version: "3.8"
services:
  service0:
    image: image0:\${FOO_VERSION:1.2.3}
    build: ./dir
`;
  expect((): string => readVersion(input)).toThrow(new Error("VERSION is not present."));
});

test("should writeVersion", (): void => {
  let input: string = "";
  let output: string = "";

  input = `version: "3.8"
services:
  service0:
    image: image0:\${VERSION:-1.2.3}
    build: ./dir
`;
  output = `version: "3.8"
services:
  service0:
    image: image0:\${VERSION:-1.2.4-rc.1}
    build: ./dir
`;
  expect(writeVersion(input, "1.2.4-rc.1")).toBe(output);
});
