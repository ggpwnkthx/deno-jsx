/**
 * Function Components Example
 *
 * Demonstrates different patterns for function components.
 * Components are eagerly evaluated during jsx() call.
 * Run with: deno run --allow-read examples/components.tsx
 *
 * @module
 */

import { jsx } from "@ggpwnkthx/jsx";
import { print } from "./shared.ts";

function Avatar({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} className="avatar" />;
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
  return (
    <div className="user-card">
      <Avatar src={avatar} alt={name} />
      <div className="user-info">
        <h2>{name}</h2>
        <span>{role}</span>
      </div>
    </div>
  );
}

function Badge({ children }: { children: string }) {
  return <span className="badge">{children}</span>;
}

interface Member {
  name: string;
  role: string;
  avatar: string;
}

function TeamSection({ members }: { members: Member[] }) {
  return (
    <section className="team">
      <h2>Our Team</h2>
      {members.map((m) =>
        jsx(UserCard, { name: m.name, role: m.role, avatar: m.avatar }, m.name)
      )}
      <Badge>3 members</Badge>
    </section>
  );
}

const team: Member[] = [
  { name: "Alice", role: "Engineer", avatar: "/alice.png" },
  { name: "Bob", role: "Designer", avatar: "/bob.png" },
  { name: "Carol", role: "Manager", avatar: "/carol.png" },
];

const vnode = <TeamSection members={team} />;
print("Components VNode:", vnode);
