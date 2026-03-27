/**
 * Fragments Example
 *
 * Demonstrates Fragment usage in TSX syntax.
 * - Keyless fragments (<>...</>) are useful for grouping multiple elements
 * - Keyed fragments preserve wrapper structure
 * Run with: deno run --allow-read examples/fragments.tsx
 *
 * @module
 */

import { createFragment, Fragment } from "@ggpwnkthx/jsx";
import { print } from "./shared.ts";

function KeyedFragmentDemo() {
  return (
    <div>
      <Fragment key="my-key">
        Keyed First Keyed Second
      </Fragment>
    </div>
  );
}

function TableRow({ cells }: { cells: string[] }) {
  return (
    <tr>
      {cells.map((c, i) => <td key={i}>{c}</td>)}
    </tr>
  );
}

function UsingCreateFragment() {
  const frag = createFragment([
    <span key="1">A</span>,
    <span key="2">B</span>,
    <span key="3">C</span>,
  ]);
  return <div>{frag}</div>;
}

const keyedVnode = <KeyedFragmentDemo />;
const tableRowVnode = <TableRow cells={["Cell 1", "Cell 2", "Cell 3"]} />;
const createFragVnode = <UsingCreateFragment />;

print("Keyed Fragment (preserved):", keyedVnode);
print("Table Row with map:", tableRowVnode);
print("createFragment helper:", createFragVnode);
