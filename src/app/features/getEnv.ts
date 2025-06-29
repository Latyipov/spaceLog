export function env(envData: string | undefined, name: string): string {
  if (!envData) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return envData;
}
