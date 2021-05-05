import "jest";
import { readVersion, writeVersion } from "../src/dockerfile";

test("should readVersion", (): void => {
  let input: string = "";

  input = `FROM node
ENV VERSION="1.2.3"
WORKDIR /app`;
  expect(readVersion(input)).toBe("1.2.3");

  input = `FROM node
ENV VERSION='4.5.6-rc.1'
WORKDIR /app`;
  expect(readVersion(input)).toBe("4.5.6-rc.1");

  input = `FROM node
ENV VERSION=7.8.9-rc.1
WORKDIR /app`;
  expect(readVersion(input)).toBe("7.8.9-rc.1");

  input = `FROM node
ARG FOO=foo VERSION=4.5.6-rc.1 BAR=bar
ENV VERSION=7.8.9-rc.1
WORKDIR /app`;
  expect(readVersion(input)).toBe("4.5.6-rc.1");

  input = `FROM node
ENV VERSION=""
WORKDIR /app`;
  expect((): string => readVersion(input)).toThrow(new Error("VERSION is empty."));

  input = `FROM node
ENV VERSION=''
WORKDIR /app`;
  expect((): string => readVersion(input)).toThrow(new Error("VERSION is empty."));

  input = `FROM node
ENV VERSION=
WORKDIR /app`;
  expect((): string => readVersion(input)).toThrow(new Error("VERSION is empty."));

  input = `FROM node
WORKDIR /app`;
  expect((): string => readVersion(input)).toThrow(new Error("VERSION is not present."));

  input = `FROM node
ENV FOO_VERSION="1.2.3"
WORKDIR /app`;
  expect((): string => readVersion(input)).toThrow(new Error("VERSION is not present."));
});

test("should writeVersion", (): void => {
  expect(writeVersion("", "")).toBe("ENV VERSION=0.0.0");
});
