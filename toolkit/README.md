# Linux Security & Administration Toolkit

Three small Bash utilities for collecting a host snapshot, checking selected services, and reviewing a basic security baseline. Run them as an ordinary user on an Ubuntu Linux host or test VM. The scripts issue read-only commands and make no network requests.

## Requirements and setup

Use Bash on Ubuntu with the standard `awk`, GNU coreutils (`df`, `stat`), and procps (`sysctl`) commands. `service-health.sh` also needs `systemctl` and access to a running systemd system manager. The other scripts can report incomplete data when `/proc` or `/etc/shadow` metadata is unavailable, as may happen in a container.

Open the `toolkit` directory and run:

```bash
bash host-check.sh
bash service-health.sh ssh.service cron.service
bash security-audit.sh
```

Replace the example service names with the exact units you expect on the host. The service check accepts explicitly named `.service` units and rejects options, paths, and wildcard patterns as unit names. Each script accepts `--help`.

| Script | What it reports | How to interpret it |
| --- | --- | --- |
| `host-check.sh` | 1-, 5-, and 15-minute load averages, available and total memory in MiB, and usage of the filesystem mounted at `/` | A snapshot for troubleshooting. Load is not CPU utilization. The script does not rate performance or inspect other mounts. |
| `service-health.sh` | systemd load and activity states for the requested units | A unit must be loaded and active to pass. systemd state does not verify application readiness or network reachability. |
| `security-audit.sh` | Kernel address-space randomization, IPv4 forwarding, and owner, type, and mode of `/etc/shadow` | A small baseline for a general-purpose Linux host. Forwarding may be intentional on a router or container host. The script reads file metadata only and does not assess ACLs. |

## Example output

These examples use synthetic values.

```text
$ bash host-check.sh
Load average (1m, 5m, 15m): 0.15, 0.21, 0.25
Memory: 3072 of 4096 MiB available
Root filesystem (/): 38% used

$ bash service-health.sh ssh.service cron.service
PASS ssh.service: loaded and active
REVIEW cron.service: load=loaded state=inactive

$ bash security-audit.sh
PASS kernel.randomize_va_space = 2
PASS net.ipv4.ip_forward = 0
PASS /etc/shadow: regular file, root owner, mode no broader than 0640
```

## Exit codes

| Code | Meaning |
| --- | --- |
| `0` | The host metrics were collected, all requested checks passed, or help was displayed. |
| `1` | At least one service or security check needs review. |
| `2` | A required command, metric, or check was unavailable. This takes precedence over code `1`. |
| `64` | The arguments were invalid. |

An `UNKNOWN` message means a check could not be completed. Use the exit code alongside the output. Treat `REVIEW` as a prompt to compare the result with the host's role and approved settings. The utilities are a starting point for investigation, and they do not replace a full hardening or compliance review.

## Verification

Bash syntax checks passed for all three scripts. Twelve fixture cases covered valid metrics, missing memory data, active and inactive services, a missing unit, an unavailable manager, baseline pass and review states, unavailable kernel data, and invalid arguments. The fixtures ran in Git's bundled Bash on Windows with synthetic command output. Run the scripts on an Ubuntu VM to validate the actual `/proc`, systemd, `sysctl`, and file metadata behavior before using them on a host you administer.

The security defaults are based on the Linux kernel descriptions of [address-space randomization](https://docs.kernel.org/admin-guide/sysctl/kernel.html#randomize-va-space) and [IPv4 forwarding](https://docs.kernel.org/networking/ip-sysctl.html). Service checks use [systemd's machine-readable `show` command](https://www.freedesktop.org/software/systemd/man/latest/systemctl.html#show%20PATTERN%E2%80%A6%7CJOB%E2%80%A6).
