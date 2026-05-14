// One-shot migration runner. Reads ./db/*.sql in lexical order and executes against $DATABASE_URL.
// Usage: vercel env pull .env.local && node --env-file=.env.local scripts/migrate.mjs
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL not set — run `vercel env pull .env.local` first");
  process.exit(1);
}

const sql = neon(url);
const dir = "db";
const files = readdirSync(dir).filter((f) => f.endsWith(".sql")).sort();

for (const f of files) {
  const path = join(dir, f);
  const content = readFileSync(path, "utf8");
  console.log(`▶ Running ${f} (${content.length} bytes)`);
  // Split on semicolons at end-of-line (simple heuristic — fine for our DDL).
  // Strip leading line-comments so statements that start with `-- comment\nSQL` still execute.
  const statements = content
    .split(/;\s*\n/)
    .map((s) =>
      s
        .split("\n")
        .filter((line) => !line.trim().startsWith("--"))
        .join("\n")
        .trim()
    )
    .filter((s) => s.length > 0);
  for (const stmt of statements) {
    try {
      await sql.query(stmt);
      console.log("  ✓", stmt.split("\n")[0].slice(0, 80));
    } catch (e) {
      console.error("  ✗", stmt.split("\n")[0].slice(0, 80));
      console.error("    →", e.message);
      process.exit(1);
    }
  }
}

console.log("\n--- Tables in DB ---");
const tables = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name`;
for (const t of tables) console.log(`  · ${t.table_name}`);
console.log("\n✓ Migration complete");
