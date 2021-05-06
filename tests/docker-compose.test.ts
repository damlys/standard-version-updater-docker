import "jest";
import { readVersion, writeVersion } from "../src/docker-compose";

test("readVersion", (): void => {
  let input: string = "";

  input = `version: "3.8"
services:
  service0:
    image: image0:\${VERSION:1.2.3}
    build: ./dir`;
  expect(readVersion(input)).toBe("1.2.3");

  input = `version: "3.8"
services:
  service0:
    image: image0:\${VERSION:-4.5.6-rc.1}
    build: ./dir
  service1:
    image: image1:\${VERSION:-7.8.9-rc.1}
    build: ./dir`;
  expect(readVersion(input)).toBe("4.5.6-rc.1");

  input = `version: "3.8"
services:
  service0:
    image: image0:\${VERSION}
    build: ./dir`;
  expect((): string => readVersion(input)).toThrow(new Error("VERSION is empty."));

  input = `version: "3.8"
services:
  service0:
    image: image0:\${VERSION:}
    build: ./dir`;
  expect((): string => readVersion(input)).toThrow(new Error("VERSION is empty."));

  input = `version: "3.8"
services:
  service0:
    image: image0:\${VERSION:-}
    build: ./dir`;
  expect((): string => readVersion(input)).toThrow(new Error("VERSION is empty."));

  input = `version: "3.8"
services:
  service0:
    image: image0:1.2.3
    build: ./dir`;
  expect((): string => readVersion(input)).toThrow(new Error("VERSION is not present."));

  input = `version: "3.8"
services:
  service0:
    image: image0:\${FOO_VERSION:1.2.3}
    build: ./dir`;
  expect((): string => readVersion(input)).toThrow(new Error("VERSION is not present."));
});

test("writeVersion", (): void => {
  let input: string = "";
  let output: string = "";

  input = `version: "3.8"
services:
  service0:
    image: image0:\${VERSION:-1.2.3}
    build: ./dir0
  service1:
    image: image1:\${VERSION:4.5.6}
    build: ./dir1
  service2:
    image: image2:\${FOO_VERSION:-7.8.9}
    build: ./dir2
  service3:
    image: image3:7.8.9
    build: ./dir3`;
  output = `version: "3.8"
services:
  service0:
    image: image0:\${VERSION:-1.2.4-rc.1}
    build: ./dir0
  service1:
    image: image1:\${VERSION:-1.2.4-rc.1}
    build: ./dir1
  service2:
    image: image2:\${FOO_VERSION:-7.8.9}
    build: ./dir2
  service3:
    image: image3:7.8.9
    build: ./dir3`;
  expect(writeVersion(input, "1.2.4-rc.1")).toBe(output);
});
