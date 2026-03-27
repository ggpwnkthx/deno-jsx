/**
 * Function Components Example
 *
 * Demonstrates different patterns for function components.
 * Components are eagerly evaluated during jsx() call.
 * Run with: deno run --allow-read examples/components.tsx
 *
 * @module
 */

import { Fragment, jsx } from "@ggpwnkthx/jsx";

const write = (s: string) =>
  Deno.stdout.writeSync(new Uint8Array([...s].map((c) => c.charCodeAt(0))));

const print = (label: string, data: unknown) => {
  write(`${label}\n${Deno.inspect(data, { colors: false, depth: Infinity })}\n`);
};

function Avatar({ src, alt }: { src: string; alt: string }) {
  return jsx("img", { src, alt, className: "avatar" }, null);
}

function UserCard({
  name,
  role,
  avatar,
}: {
  name: string;
  role: string;
  avatar: string;
}) {
  return jsx(
    "div",
    {
      className: "user-card",
      children: [
        jsx(Avatar, { src: avatar, alt: name, key: "avatar" }, null),
        jsx("div", {
          className: "user-info",
          children: [
            jsx("h2", { key: "name", children: [name] }, null),
            jsx("span", { key: "role", children: [role] }, null),
          ],
        }, null),
      ],
    },
    null,
  );
}

function Badge({ children }: { children: string }) {
  return jsx("span", { className: "badge", children }, null);
}

function TeamSection(
  { members }: { members: Array<{ name: string; role: string; avatar: string }> },
) {
  return jsx(
    "section",
    {
      className: "team",
      children: [
        jsx("h2", { key: "title", children: ["Our Team"] }, null),
        jsx(Fragment, {
          key: "members",
          children: members.map((m, i) =>
            jsx(UserCard, { ...m, key: String(i) }, null)
          ),
        }, null),
        jsx(Badge, { key: "badge", children: "3 members" }, null),
      ],
    },
    null,
  );
}

const team = [
  { name: "Alice", role: "Engineer", avatar: "/alice.png" },
  { name: "Bob", role: "Designer", avatar: "/bob.png" },
  { name: "Carol", role: "Manager", avatar: "/carol.png" },
];

const vnode = jsx(TeamSection, { members: team }, null);
print("Components VNode:", vnode);
