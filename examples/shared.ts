/**
 * Shared utilities for examples.
 * @module
 */

export const print = (label: string, data: unknown) =>
  console.log(label, Deno.inspect(data, { colors: false, depth: Infinity }));
