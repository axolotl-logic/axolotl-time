export function handleError(err: unknown) {
  console.error(err);
}

export function assert(passes: boolean, msg: string) {
  if (!passes) {
    throw new Error(`Assertion failed: ${msg}`);
  }
}
