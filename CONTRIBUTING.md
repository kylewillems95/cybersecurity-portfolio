# Contributing

Keep changes focused and include the check results with your proposed change. For a layout or accessibility change, include a short description of the desktop, mobile, and keyboard behavior you verified.

## Verify changes

Run the site checks configured in the GitHub Actions workflow.

```sh
pnpm install --frozen-lockfile
pnpm check:content
pnpm check:resume
pnpm build
pnpm check:public
```

Open the local built preview and check the affected route directly. For toolkit changes, run a Bash syntax check for each edited script and cover the affected pass, review, and unavailable-check paths with synthetic command output. Follow the [toolkit guide](toolkit/README.md) for native Ubuntu VM checks.

## Keep contributions safe to share

- Use synthetic lab fixtures and redact identifying details in screenshots, examples, and logs. Keep credentials, private contact details, source documents, and infrastructure configuration outside the repository.
- Keep project claims scoped to their evidence. Identify personal builds and training exercises, date historical results, and label unfinished work.
- Use the approved public resume data for any resume changes. Preserve the protected Army role heading and five bullets. Review the regenerated HTML and PDF before updating the consistency record.
- Confirm permission to include any third-party text, screenshots, or code. Keep the provenance and applicable license with material added to the project.

Share sensitive findings through an existing private contact channel and keep sensitive evidence out of public issues and pull requests.
