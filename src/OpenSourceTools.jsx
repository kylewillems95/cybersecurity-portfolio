import './OpenSourceTools.css';

const scripts = [
  {
    name: 'Host health',
    file: 'host-check.sh',
    description: 'Check system load, available memory, and disk usage before troubleshooting a Linux host.',
  },
  {
    name: 'Service health',
    file: 'service-health.sh',
    description: 'Report the state of selected systemd services without starting, stopping, or restarting them.',
  },
  {
    name: 'Security baseline',
    file: 'security-audit.sh',
    description: 'Flag baseline conditions that need a closer look and report when a check could not run.',
  },
];

export function OpenSourceTools() {
  return (
    <section className="open-tools" id="open-source-tools" tabIndex={-1} aria-labelledby="open-tools-title">
      <header className="open-tools-heading">
        <div>
          <p className="eyebrow">Development work</p>
          <h2 id="open-tools-title">Open Source &amp; Tools</h2>
        </div>
        <a className="tools-profile" href="https://github.com/kywillz">GitHub profile <span aria-hidden="true">↗</span></a>
      </header>

      <div className="toolkit">
        <div className="toolkit-heading">
          <h3>Linux Security &amp; Administration Toolkit</h3>
          <span className="toolkit-status">Local prototype</span>
        </div>
        <p>Three read-only Bash utilities for common checks on a Linux system. Use them from a regular user account in a lab or VM.</p>

        <ul className="toolkit-scripts">
          {scripts.map(({ name, file, description }) => (
            <li key={file}>
              <h4>{name}</h4>
              <code>{file}</code>
              <p>{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
