#!/usr/bin/env bash
set -u
export LC_ALL=C

if [[ $# -eq 1 && ( $1 == --help || $1 == -h ) ]]; then
  printf 'Usage: bash security-audit.sh\nReview three read-only Linux baseline checks.\n'
  exit 0
fi
if [[ $# -ne 0 ]]; then
  printf 'Usage: bash security-audit.sh\n' >&2
  exit 64
fi

result=0

check_sysctl() {
  local key=$1 expected=$2 value
  if ! value=$(sysctl -n "$key" 2>/dev/null) || [[ ! $value =~ ^[0-9]{1,3}$ ]]; then
    printf 'UNKNOWN %s: could not read a numeric value\n' "$key" >&2
    result=2
  elif [[ $value == "$expected" ]]; then
    printf 'PASS %s = %s\n' "$key" "$value"
  else
    printf 'REVIEW %s = %s (expected %s)\n' "$key" "$value" "$expected"
    (( result == 0 )) && result=1
  fi
}

# Values apply to a general-purpose host, not a router or a compliance profile.
check_sysctl kernel.randomize_va_space 2
check_sysctl net.ipv4.ip_forward 0

if shadow_metadata=$(stat -c '%f %u' -- /etc/shadow 2>/dev/null); then
  read -r raw_mode owner extra <<< "$shadow_metadata"
else
  raw_mode=''
fi

if [[ ! $raw_mode =~ ^[0-9A-Fa-f]{1,8}$ || ! ${owner:-} =~ ^[0-9]+$ || -n ${extra:-} ]]; then
  printf 'UNKNOWN /etc/shadow: could not read file metadata\n' >&2
  result=2
else
  # GNU stat's raw mode includes both file type and permission bits.
  mode=$((16#$raw_mode))
  if [[ $owner == 0 ]] && (( (mode & 8#170000) == 8#100000 && (mode & 8#7777 & ~8#640) == 0 )); then
    printf 'PASS /etc/shadow: regular file, root owner, mode no broader than 0640\n'
  else
    printf 'REVIEW /etc/shadow: check file type, owner and permission bits\n'
    (( result == 0 )) && result=1
  fi
fi
exit "$result"
