#!/usr/bin/env bash
# push_firebase_env_to_gh.sh
# Read Firebase Next.js vars from an .env file (default: .env) and upload as GitHub repo secrets.

set -euo pipefail

ENV_FILE=".env"
REPO=""
while getopts "f:r:" opt; do
  case "$opt" in
    f) ENV_FILE="$OPTARG" ;;
    r) REPO="$OPTARG" ;;  # format: owner/repo (optional; defaults to current repo)
  esac
done

# Required tools
command -v gh >/dev/null || { echo "gh CLI not found. Install https://cli.github.com/"; exit 127; }
gh auth status >/dev/null || { echo "gh CLI not authenticated. Run: gh auth login"; exit 1; }

[[ -f "$ENV_FILE" ]] || { echo "Env file not found: $ENV_FILE"; exit 66; }

# Keys to upload
KEYS=(
  NEXT_PUBLIC_FIREBASE_API_KEY
  NEXT_PUBLIC_FIREBASE_PROJECT_ID
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
  NEXT_PUBLIC_FIREBASE_APP_ID
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  NEXT_PUBLIC_FIREBASE_DATACONNECT_ENDPOINT
  NEXTAUTH_SECRET
  NEXTAUTH_URL
  GOOGLE_CLIENT_ID
  GOOGLE_CLIENT_SECRET
)

# Minimal .env parser
declare -A KV
while IFS= read -r line || [[ -n "$line" ]]; do
  [[ -z "$line" || "$line" =~ ^[[:space:]]*# ]] && continue
  if [[ "$line" =~ ^([A-Za-z_][A-Za-z0-9_]*)=(.*)$ ]]; then
    k="${BASH_REMATCH[1]}"
    v="${BASH_REMATCH[2]}"
    v="${v%$'\r'}"
    # strip surrounding quotes
    if [[ "$v" =~ ^\".*\"$ || "$v" =~ ^\'.*\'$ ]]; then v="${v:1:-1}"; fi
    KV["$k"]="$v"
  fi
done < "$ENV_FILE"

# Build optional --repo flag for gh
REPO_FLAG=()
if [[ -n "$REPO" ]]; then
  REPO_FLAG=(--repo "$REPO")
fi

printf "| Secret | Status |\n|---|---|\n"
for k in "${KEYS[@]}"; do
  val="${KV[$k]:-}"
  if [[ -z "${val}" ]]; then
    printf "| %s | skipped (missing) |\n" "$k"
    continue
  fi
  # Set secret
  if gh secret set "$k" "${REPO_FLAG[@]}" --body "$val" >/dev/null 2>&1; then
    printf "| %s | set |\n" "$k"
  else
    printf "| %s | failed |\n" "$k"
  fi
done