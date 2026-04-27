---
name: linear-demo-tickets
description: Summarize Linear tickets for the Demo Project Tickets team with consistent output. Use when the user asks for demo tickets, demo backlog, linear demo summary, or ticket status for this project.
---

# Linear Demo Tickets

## Purpose

Provide a fast, consistent summary of Linear tickets for this repo's demo workflow.

## Default Scope

- Team: `Demo Project Tickets`
- Assignee: `me`
- Include archived: `false`
- Sort: `updatedAt`

If the user explicitly asks for all assignees, remove the assignee filter.

## Required Tooling Steps

1. Read the Linear MCP tool schema before calling tools.
2. Call `list_issues` on server `plugin-linear-linear` with the default scope.
3. If no results are returned, retry once without the assignee filter.

## Output Format

Return results in this order:

1. Total count of open tickets.
2. Count by status (Todo, In Progress, Backlog, Done, Canceled when present).
3. Ordered ticket list with:
   - ID
   - Title
   - Status
   - Priority name
   - URL

Keep the response concise and scannable.

## Shortcuts

Interpret these user phrases as this skill:

- "linear demo summary"
- "demo tickets"
- "demo backlog"
- "summarize my demo project tickets"

## Notes

- This skill is project-local only and should not be treated as a global/personal workflow.
- Do not fetch broad workspace issue lists unless the user asks for cross-team data.
