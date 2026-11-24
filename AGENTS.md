<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->


## Token Efficiency Rules
Minimize token usage while maintaining code quality.
Inspect only relevant files.
Avoid reading entire files when targeted inspection is sufficient.
Never repeat requirements or provide lengthy plans.
Do not explain obvious actions or provide progress narration.
Make focused edits; avoid unnecessary refactoring.
Reuse existing components, services, and patterns.
Avoid unnecessary agents, parallel tasks, and repeated searches.
Run only relevant tests and checks.
Fix errors directly without lengthy explanations.
Keep final responses under 5 bullet points.
Prioritize implementation over discussion.