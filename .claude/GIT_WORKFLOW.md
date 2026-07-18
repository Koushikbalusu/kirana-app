# Git Workflow

## Branches (fixed, do not add more without updating this doc)
- `dev` — **default branch**, active development for the demo track. Push
  directly here while building.
- `main` — demo production. PR-only, 1 approval, CI (`ci` status check)
  required, no force-push, no deletion.
- `prod-dev` — active development for the real-production track.
- `prod` — real production. Same protections as `main`, plus linear history
  required.

## Flow
```
dev → PR → main            (demo release)
prod-dev → PR → prod        (real release, after demo validation)
```

## Merge strategy
Squash merge only. PR title becomes the commit message. Auto-delete head
branches after merge. Auto-merge allowed once CI passes.

## Commit format
Conventional-ish prefixes: `feat:`, `fix:`, `chore:`, `ci:`, `docs:`.

## Neon DB branch mapping (see docs/DECISIONS.md ADR-006)
| Git branch | Neon branch  |
|------------|--------------|
| `main`     | `production` |
| `dev`      | `dev`        |
| `prod`     | `prod`       |
| `prod-dev` | `prod-dev`   |

## Secrets
Never commit `.env.local`. GitHub Actions secrets and Vercel env vars carry
the real values (see docs/TECH_STACK.md for the full variable list).

## Status (as of repo creation)
No GitHub remote yet — this repo starts as local-only. Branches exist
locally; pushing to GitHub, branch protection rules, and CI wiring are done
once the user creates the GitHub repo (see docs/CURRENT_STATE.md).
