# Changesets Quick Start

Based on the [official Changesets documentation](https://github.com/changesets/changesets).

## For Contributors

### Making Changes

1. **Create your feature branch** and make your changes
2. **Add a changeset**:
   ```bash
   pnpm changeset
   ```
3. **Follow the prompts**:
   - Select change type (major/minor/patch)
   - Write a description
4. **Commit everything**:
   ```bash
   git add .
   git commit -m "feat: add new feature"
   git push
   ```
5. **Create a PR** - The CI will check for your changeset automatically

### Change Types

- **patch**: Bug fixes, small improvements (0.1.0 → 0.1.1)
- **minor**: New features, backward compatible (0.1.0 → 0.2.0)
- **major**: Breaking changes (0.1.0 → 1.0.0)

## For Maintainers

### Manual Release

```bash
# 1. Version packages (updates CHANGELOG.md and package.json)
pnpm changeset:version

# 2. Build and publish (if publishing to npm)
pnpm release
```

### Automated Release

The `version-packages.yml` workflow handles this automatically:
- When PRs with changesets are merged to `main`
- Creates a "Version Packages" PR automatically
- Merging that PR publishes to npm (if `NPM_TOKEN` is set)

## Common Commands

```bash
# Create a new changeset
pnpm changeset

# Check changeset status
pnpm changeset status

# Version packages (update changelog and versions)
pnpm changeset:version

# Build and publish
pnpm release
```

## Resources

- [Changesets Documentation](https://github.com/changesets/changesets)
- [Changesets GitHub Action](https://github.com/changesets/action)
- [Config Options](https://github.com/changesets/changesets/blob/main/docs/config-file-options.md)
