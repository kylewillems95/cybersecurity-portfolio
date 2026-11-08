#!/usr/bin/env bash
set -u
set -o pipefail
export LC_ALL=C

if [[ $# -eq 1 && ( $1 == --help || $1 == -h ) ]]; then
  printf 'Usage: bash host-check.sh\nReport Linux load, available memory, and root filesystem usage.\n'
  exit 0
fi
if [[ $# -ne 0 ]]; then
  printf 'Usage: bash host-check.sh\n' >&2
  exit 64
fi

if ! load=$(awk '
  NR == 1 && $1 ~ /^[0-9]+\.[0-9]+$/ && $2 ~ /^[0-9]+\.[0-9]+$/ && $3 ~ /^[0-9]+\.[0-9]+$/ {
    print $1 ", " $2 ", " $3
    found = 1
  }
  END { if (!found) exit 1 }
' /proc/loadavg 2>/dev/null); then
  printf 'UNKNOWN: Could not read load averages from /proc/loadavg.\n' >&2
  exit 2
fi

if ! memory=$(awk '
  $1 == "MemTotal:" && $2 ~ /^[0-9]+$/ && $3 == "kB" { total = $2 }
  $1 == "MemAvailable:" && $2 ~ /^[0-9]+$/ && $3 == "kB" { available = $2 }
  END {
    if (total <= 0 || available == "" || available > total) exit 1
    printf "%d of %d", available / 1024, total / 1024
  }
' /proc/meminfo 2>/dev/null); then
  printf 'UNKNOWN: Could not read total and available memory from /proc/meminfo.\n' >&2
  exit 2
fi

if ! disk=$(df -P -- / 2>/dev/null | awk '
  NR > 1 && $NF == "/" && $(NF - 1) ~ /^[0-9]+%$/ { print $(NF - 1); found = 1 }
  END { if (!found) exit 1 }
'); then
  printf 'UNKNOWN: Could not determine root filesystem usage.\n' >&2
  exit 2
fi

printf 'Load average (1m, 5m, 15m): %s\n' "$load"
printf 'Memory: %s MiB available\n' "$memory"
printf 'Root filesystem (/): %s used\n' "$disk"
