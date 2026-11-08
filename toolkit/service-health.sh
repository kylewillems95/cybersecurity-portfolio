#!/usr/bin/env bash
set -u
export LC_ALL=C

usage='Usage: bash service-health.sh UNIT.service [UNIT.service ...]'
if [[ $# -eq 1 && ( $1 == --help || $1 == -h ) ]]; then
  printf '%s\nReport systemd state for the supplied service units.\n' "$usage"
  exit 0
fi
if [[ $# -eq 0 ]]; then
  printf '%s\n' "$usage" >&2
  exit 64
fi

# Check the entire list before making any requests to the system manager.
for unit in "$@"; do
  if [[ ! $unit =~ ^[A-Za-z0-9][A-Za-z0-9_.@-]*\.service$ || ${#unit} -gt 255 ]]; then
    printf 'Invalid unit. Supply exact service names such as ssh.service.\n%s\n' "$usage" >&2
    exit 64
  fi
done

if ! command -v systemctl >/dev/null 2>&1; then
  printf 'UNKNOWN: systemctl is unavailable.\n' >&2
  exit 2
fi

result=0
for unit in "$@"; do
  query_status=0
  properties=$(systemctl --no-pager --no-ask-password --property=LoadState --property=ActiveState show -- "$unit" 2>/dev/null) || query_status=$?
  load_state=''
  active_state=''
  while IFS='=' read -r key value; do
    case "$key" in
      LoadState) load_state=$value ;;
      ActiveState) active_state=$value ;;
    esac
  done <<< "$properties"

  if [[ $load_state == not-found ]]; then
    printf 'REVIEW %s: unit not found\n' "$unit"
    (( result == 0 )) && result=1
  elif (( query_status != 0 )) || [[ ! $load_state =~ ^[a-z-]+$ || ! $active_state =~ ^[a-z-]+$ ]]; then
    printf 'UNKNOWN %s: could not query the system manager\n' "$unit" >&2
    result=2
  elif [[ $load_state == loaded && $active_state == active ]]; then
    printf 'PASS %s: loaded and active\n' "$unit"
  else
    printf 'REVIEW %s: load=%s state=%s\n' "$unit" "$load_state" "$active_state"
    (( result == 0 )) && result=1
  fi
done
exit "$result"
