# Changelog Setup Guide

This guide explains how to set up and use the changelog management system in this project using [Changesets](https://github.com/changesets/changesets).

## Initial Setup

### 1. Install Changesets

```bash
pnpm add -D @changesets/cli
```

### 2. Verify Configuration

The following files should already be in place:
- `.changeset/config.json` - Changeset configuration (based on [Changesets config schema](https://github.com/changesets/changesets/blob/main/docs/config-file-options.md))
- `.changeset/README.md` - User guide for creating changesets
- `.github/workflows/changelog-check.yml` - CI workflow that checks for changesets (uses `changeset status` as recommended)
- `.github/workflows/version-packages.yml` - Automated versioning workflow (optional)

### 3. Set Up Branch Protection (GitHub)

To enforce changelog requirements, configure branch protection rules:

1. Go to your repository settings on GitHub
2. Navigate to **Settings** → **Branches**
3. Add a branch protection rule for `main` (or your default branch)
4. Enable **Require status checks to pass before merging**
5. Add the status check: **Changelog Check** (from the `changelog-check.yml` workflow)

Alternatively, you can use the GitHub CLI:

```bash
gh api repos/:owner/:repo/branches/main/protection \
  --method PUT \
  --field required_status_checks[strict]=true \
  --field required_status_checks[contexts][]=Changelog Check \
  --field enforce_admins=true \
  --field required_pull_request_reviews[required_approving_review_count]=1
```

## How It Works

### For Contributors

1. **Make your changes** in a feature branch
2. **Create a changeset** by running `pnpm changeset`
3. **Commit both** your changes and the changeset file
4. **Push and create a PR**

The CI workflow will:
- ✅ Check if a changeset file exists
- ✅ Verify it's in the correct format
- ❌ Block the PR if no changeset is found (for code changes)
- ✅ Allow the PR if only documentation/config files changed

### For Maintainers

#### Manual Release Process

When ready to release:

1. **Version bump**: Run `pnpm changeset:version`
   - This reads all changeset files
   - Updates `CHANGELOG.md` with new entries
   - Bumps the version in `package.json`
   - Removes the consumed changeset files

2. **Release**: Run `pnpm release` (if publishing to npm)
   - Builds the project
   - Publishes to npm (if configured)

#### Automated Release Process (Recommended)

The `version-packages.yml` workflow automates the release process:

1. When changesets are merged to `main`, the workflow automatically:
   - Creates a "Version Packages" PR with version bumps and changelog updates
   - When that PR is merged, it publishes to npm (if `NPM_TOKEN` is configured)

2. To enable automated publishing:
   - Add `NPM_TOKEN` secret to your GitHub repository
   - The workflow will automatically publish when version PRs are merged

See the [Changesets GitHub Action documentation](https://github.com/changesets/action) for more details.

## Troubleshooting

### CI Check Failing

If the changelog check fails:

1. **Check the error message** in the PR comments
2. **Create a changeset** using `pnpm changeset`
3. **Commit and push** the changeset file
4. The check should pass on the next push

### Changeset Not Detected

The workflow checks for files matching `.changeset/*.md`. Make sure:
- The file is in the `.changeset/` directory
- The file has a `.md` extension
- The file follows the correct format (see `.changeset/README.md`)

### Documentation-Only Changes

If your PR only changes documentation, markdown files, or config files, the check will automatically skip. No changeset is required.

## Workflow Details

The `changelog-check.yml` workflow:

- **Triggers**: On PR open, update, or when marked ready for review
- **Checks**: 
  - Detects code changes (excludes docs, config, CI files)
  - Verifies changeset file exists for code changes
  - Posts helpful comments on PRs missing changesets
- **Fails**: If code changes exist but no changeset is found

## Customization

### Excluding More File Types

Edit `.github/workflows/changelog-check.yml` and update the `EXCLUDED_PATTERNS` variable to exclude additional file types from triggering the changelog requirement.

### Changing Base Branch

Update the `baseBranch` in `.changeset/config.json` if your default branch is not `main`.
