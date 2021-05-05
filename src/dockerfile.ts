export function readVersion(contents: string): string {
  return "0.0.0";
}

export function writeVersion(contents: string, version: string): string {
  return "ENV VERSION=0.0.0";
}
