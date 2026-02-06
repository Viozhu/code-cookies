# Changesets

This directory contains changeset files that describe changes made in pull requests.

## How to add a changeset

When you make changes that should be documented in the changelog, you need to add a changeset file.

### Using the CLI (recommended)

```bash
pnpm changeset
```

This will:
1. Ask you what kind of change you're making (major, minor, or patch)
2. Ask you to write a summary of the change
3. Create a new file in `.changeset/` with a unique name

### Manual creation

You can also create a changeset file manually. Create a new file in `.changeset/` with a descriptive name (e.g., `add-new-feature.md`) and the following format:

```markdown
---
"code-cookies": patch
---

Description of your change here. This will appear in the CHANGELOG.md.
```

### Types of changes

- **major**: Breaking changes that require users to update their code
- **minor**: New features that are backward compatible
- **patch**: Bug fixes and small improvements that are backward compatible

## Example

```markdown
---
"code-cookies": minor
---

Added new puzzle difficulty levels for advanced users
```

## Important

- **Every PR must include at least one changeset file** (unless it's a documentation-only change)
- Changeset files are automatically removed when the PR is merged
- Multiple changesets can be added to a single PR if needed
