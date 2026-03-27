/**
 * Basic Setup Example
 *
 * Demonstrates minimal JSX usage with this runtime library.
 * Run with: deno run --allow-read examples/basic-setup.tsx
 *
 * @module
 */

const write = (s: string) =>
  Deno.stdout.writeSync(new Uint8Array([...s].map((c) => c.charCodeAt(0))));

const print = (label: string, data: unknown) => {
  write(`${label}\n${Deno.inspect(data, { colors: false, depth: Infinity })}\n`);
};

function Greeting({ name }: { name: string }) {
  return <div>Hello, {name}!</div>;
}

function App() {
  return (
    <main>
      <h1>Welcome</h1>
      <Greeting name="Deno" />
      <Greeting name="World" />
    </main>
  );
}

const vnode = <App />;
print("Basic VNode:", vnode);
