// Public resume and project content. Private contact details, credentials,
// and infrastructure configurations remain outside the published application.
export const resumeSections = [
  {
    id: 'summary',
    title: 'Professional summary',
    entries: [{
      title: 'Cybersecurity · Systems Administration · IT Support',
      paragraphs: [
        'Army Sergeant bringing hands-on cybersecurity training, disciplined troubleshooting, and team leadership to cybersecurity and IT roles. Earned CompTIA Security+ and A+ certifications.',
        'Lab and personal project work spans SOC engineering, Linux and Windows administration, vulnerability assessment, networking, scripting, and technical documentation.'
      ]
    }]
  },
  {
    id: 'skills',
    title: 'Technical skills',
    entries: [
      { title: 'Systems & networking labs', paragraphs: ['Ubuntu Server, Kali Linux, Windows, Active Directory, VMware; users and groups, permissions, services, logs, TCP/IP, DNS, DHCP, SSH, VLANs, 802.1Q, IPv4 subnetting, and Cisco Packet Tracer.'] },
      { title: 'Security tools & investigations', paragraphs: ['Wazuh, Splunk, Elastic, Wireshark, Nmap, Nessus, Burp Suite, MITRE ATT&CK Navigator, and VirusTotal; lab alert triage, packet analysis, file integrity monitoring, Registry persistence, and reporting.'] },
      { title: 'Applications & scripting labs', paragraphs: ['Apache, Flask APIs, HTTPS/TLS, Docker, Nginx, and Jenkins CI/CD; Bash account provisioning, PowerShell reports and SHA-256 checks, and Python fundamentals.'] },
      { title: 'Risk & assurance labs', paragraphs: ['NIST SP 800-53, Risk Management Framework (RMF), system security plans (SSPs), and plans of action and milestones (POA&Ms); simulated risk assessments, likelihood and impact scoring, and mitigation planning.'] },
      { title: 'Basic or conceptual familiarity', paragraphs: ['Red Hat Enterprise Linux, VirtualBox, OpenVAS, AWS fundamentals, IAM, least privilege, CIS Controls, STIG/SCAP, EDR concepts, YARA syntax, and secure SDLC.'] }
    ]
  },
  {
    id: 'training',
    title: 'Cybersecurity training & labs',
    entries: [
      {
        title: 'RapidAscent — Cybersecurity Analyst Trainee',
        meta: 'Remote · July–October 2026',
        paragraphs: ['Full-time, lab-based cybersecurity training with an approximately 800-hour curriculum covering systems administration, SOC operations, network security, cloud concepts, and incident response.'],
        bullets: [
          'SOC engineering project: contributed by deploying Wazuh on Ubuntu, hardening service access, validating Windows/Linux telemetry and detections, enabling PowerShell logging, and integrating Yamcs application logs into the dashboard.',
          'Managed Linux users, groups, and shared-directory permissions; tested authorized and denied access, analyzed system and service logs, diagnosed permission errors, and practiced Windows/Active Directory administration.',
          'Used Nmap and Nessus in labs. Configured VLANs, trunks, and inter-VLAN routing in Packet Tracer; completed subnetting exercises and verified UFW access and logging policies.',
          'Analyzed simulated Wazuh, Splunk, and Elastic events and packet captures. Documented findings and incident response workflows; deployed Nginx in Docker and practiced Jenkins workflows.',
          'Provisioned accounts using Bash; generated system reports and compared SHA-256 hashes in PowerShell; completed Python programming exercises and generated timestamped simulated user activity.',
          'Contributed to a simulated aerospace/defense risk assessment, including assets, threats, likelihood and impact scoring, mitigation priorities, SSPs, and POA&Ms.'
        ]
      },
      {
        title: 'TryHackMe — Independent Cybersecurity Labs',
        meta: 'Ongoing · Guided training',
        paragraphs: ['Completed 93 rooms covering SOC operations, systems administration, network analysis, and vulnerability assessment as of November 2026. The SOC Level 1 learning path remains in progress.'],
        bullets: [
          'Completed SOC labs in SIEM monitoring, security event analysis, EDR fundamentals, alert triage, escalation, reporting, and investigation workbooks and lookups.',
          'Practiced Linux and Windows hardening; examined Linux file systems for attacker artifacts and investigated Registry persistence with the AutoRuns PowerShell module.',
          'Practiced vulnerability identification, assessment, mitigation, and reporting; used Nmap for guided scanning and discovery. Studied Kerberos attacks, Burp Suite, YARA syntax, and secure SDLC.'
        ]
      }
    ]
  },
  {
    id: 'experience',
    title: 'Professional experience',
    entries: [{
      title: 'U.S. Army | Sergeant (E-5), Combat Medic (68W) | Fort Campbell, KY | September 2019–Present',
      bullets: [
        'Served as primary medical advisor for an infantry company of 150+ soldiers; coordinated medical planning, personnel, equipment, readiness requirements, evacuation planning, and risk controls for seven or more high-risk training exercises annually.',
        'Trained 500+ DoD personnel and interagency partners annually in medical procedures, casualty response, and performance standards; delivered instruction and evaluated readiness.',
        'Supervised, mentored, and evaluated 10+ personnel; prioritized workloads, coordinated treatment teams, resolved operational issues, and maintained procedural compliance in time-sensitive environments.',
        'Managed $300,000+ in regulated medical equipment and supplies; maintained inventory records, regulatory compliance, operational readiness, and 100% accountability.',
        'Delivered trauma care and evacuation coordination; followed HIPAA requirements and maintained medical, readiness, and training records. Resolved equipment, communication, supply, and procedural issues across teams supporting DoD operations.'
      ]
    }]
  },
  {
    id: 'resume-projects',
    title: 'Technical projects',
    entries: [
      {
        title: 'Home SOC / Windows and Linux Security Lab',
        meta: 'Personal project · In progress',
        bullets: [
          'Built a VMware lab with Ubuntu Server, Windows 11, and Wazuh; installed and connected a Linux agent to the manager and verified connectivity.',
          'Windows agent and Sysmon deployment remain in progress. Failed-login, SSH brute-force, web-enumeration, and PowerShell detection scenarios are planned.'
        ]
      },
      {
        title: 'Ubuntu Server Business Website',
        meta: 'Lab project · Ubuntu Server, Apache, Python/Flask, VMware',
        bullets: [
          'Deployed a lab website with Apache virtual hosts, Linux services, dependencies, permissions, and network access. Developed Flask API endpoints and configured Apache reverse proxying.',
          'Configured HTTPS, security headers, and firewall rules; documented troubleshooting of connectivity, certificate trust, and service configuration.'
        ]
      },
      {
        title: 'Threat Intelligence and Malware Analysis',
        meta: 'Training exercises',
        bullets: [
          'Created five MITRE ATT&CK Navigator layers for documented threat-group techniques and combined the layers to visualize shared behaviors.',
          'Collaborated on a PCAP investigation in an isolated Linux lab using Wireshark filtering, HTTP-object export, SHA-256 hashes, and VirusTotal correlation to investigate an executable disguised as a PNG.'
        ]
      }
    ]
  },
  {
    id: 'certifications',
    title: 'Certifications',
    entries: [
      { title: 'CompTIA Security+', meta: 'Earned · November 2026' },
      { title: 'CompTIA A+', meta: 'Earned · July 2026' },
      { title: 'CompTIA CySA+', meta: 'In progress · Expected December 2026' },
      { title: 'CompTIA Linux+', meta: 'Studying · Not earned' }
    ]
  },
  {
    id: 'education',
    title: 'Education',
    entries: [
      { title: 'Western Governors University', meta: 'M.S. in Cybersecurity and Information Assurance', paragraphs: ['Accepted for a January 2027 start. Expected graduation: December 2028.'] },
      { title: 'City University of Seattle', meta: 'Undergraduate Certificate in Cybersecurity · October 2026' },
      { title: 'University of Mississippi', meta: 'B.S. Chemistry · May 2017', paragraphs: ['Biochemistry emphasis; minor in Mathematics.'] }
    ]
  }
];

export const projects = [
  {
    id: 'nova-serenity',
    title: 'Nova Serenity',
    eyebrow: 'Featured website',
    status: 'Business website',
    summary: 'A business website combining Linux deployment, a booking interface, and a sandbox-tested email and calendar workflow.',
    tags: ['Ubuntu', 'Apache', 'Python/Flask', 'JavaScript', 'HTTPS', 'Square Sandbox'],
    sections: [
      { title: 'The business need', body: 'Create a clear online presence for a massage-therapy business and guide visitors from choosing a service to reserving an appointment. The deployed design presented services, prices, therapist information, policies, and contact details in a responsive single-page layout.' },
      { title: 'My contribution', body: 'Built the website and deployed it to an Ubuntu/Apache virtual machine. Developed Flask API endpoints, connected the front end to the backend through Apache reverse proxying, and worked through permissions, dependencies, Linux services, network access, and HTTPS configuration.' },
      { title: 'Booking and integration work', bullets: ['Created a service-and-duration booking flow, with date/time, client details, and a Square Sandbox card form.', 'Connected appointment administration with cancellation notifications and Google Calendar updates.', 'Added an appointment lookup interface and navigation between services, booking, policies, and contact information.'] },
      { title: 'Demonstrated outcome', body: 'During the October 2026 sandbox walkthrough, a booking generated a confirmation number. I cancelled a test appointment through the admin portal, received the cancellation email, and confirmed that the appointment disappeared automatically from Google Calendar.' },
      { title: 'Engineering lessons', body: 'A working page is only one part of a web application. The project required checking the web server, backend service, browser restrictions, and external integrations separately, then testing the complete user workflow. Configuration and troubleshooting were documented to make the deployment easier to understand and revisit.' },
      { title: 'Scope', body: 'Square was exercised in Sandbox. Live payment processing, stored-card verification, cancellation fees, and reminder delivery are outside these demonstrated results.' }
    ],
    detailSections: [
      {
        title: 'From service information to an appointment',
        body: 'I built a website for a massage therapy business so visitors could compare services, prices, and session lengths before opening the booking form. The responsive page brings service descriptions, therapist information, policies, and contact information together. The booking interface guides visitors through service and duration, date and time, client details, and card reservation. Visitors can also look up an existing appointment.'
      },
      {
        title: 'Ubuntu deployment and request flow',
        body: 'In the deployment I worked on, the browser reached the site over HTTPS. Apache served the front end and forwarded application requests to Flask on an Ubuntu virtual machine. I developed Flask API endpoints and configured the Apache reverse proxy, virtual host, application dependencies, permissions, and Linux services. The booking workflow integrated with Square Sandbox, email, and Google Calendar.'
      },
      {
        title: 'Checking the application boundaries',
        body: 'I verified the website in a browser after configuring the Apache virtual host. The deployment and troubleshooting notes cover connectivity, certificate trust, and service configuration. The booking walkthrough then checked whether the application, payment test environment, email, and calendar agreed on the same appointment state.'
      },
      {
        title: 'October 2026 sandbox walkthrough',
        bullets: [
          'Submitted a test booking through the public form using Square Sandbox and confirmed that the website generated a confirmation number.',
          'Cancelled a test appointment through the administrative interface and received the cancellation email.',
          'Confirmed that the cancelled appointment disappeared automatically from Google Calendar.'
        ]
      },
      {
        title: 'Public site review',
        body: 'A November 8, 2026 browser review reached the homepage over HTTPS and showed five services, pricing, business and policy information, the booking interface, and an appointment lookup form. The public review inspected the visible pages. The recorded booking and cancellation results came from the October Square Sandbox walkthrough.'
      }
    ],
    link: { label: 'Visit live site', url: 'https://www.novaserenitymassage.com/' }
  },
  {
    id: 'home-soc',
    title: 'Home SOC Lab',
    eyebrow: 'Personal project',
    status: 'In progress',
    summary: 'Building a Windows and Linux monitoring environment, starting with verified Linux agent connectivity.',
    tags: ['Wazuh', 'VMware', 'Ubuntu', 'Windows 11'],
    sections: [
      { title: 'The goal', body: 'Build a personal environment for learning how Windows and Linux endpoint activity reaches a security-monitoring platform, with clear separation between setup, collection, and detection testing.' },
      { title: 'My work', body: 'Created a VMware environment with Ubuntu Server, Windows 11, and Wazuh. Installed a Linux agent, connected it to the manager, and verified connectivity.' },
      { title: 'Demonstrated outcome', body: 'Established the Linux-agent connection as the foundation for later monitoring exercises. This personal lab is separate from the SOC engineering work completed during RapidAscent training.' },
      { title: 'Current scope', body: 'Windows agent and Sysmon deployment remain in progress. Failed-logon, SSH brute-force, web-enumeration, and PowerShell scenarios are planned validation tasks, not completed detections.' }
    ],
    detailSections: [
      {
        title: 'Personal lab setup and first connection',
        body: 'I set up a VMware lab with Ubuntu Server, Windows 11, and Wazuh to practice taking endpoint activity from collection through investigation. I installed the Linux agent, connected it to the Wazuh manager, and verified connectivity. That gives me a known starting point for testing event collection and detections.'
      },
      {
        title: 'Windows collection and planned tests',
        body: 'Windows agent deployment and Sysmon collection are in progress. My next milestone is to validate a Windows event from the endpoint through the dashboard. Planned detection exercises cover failed logons, repeated SSH authentication failures, web enumeration, and PowerShell activity.'
      },
      {
        title: 'My contribution to the RapidAscent team lab',
        body: 'In the RapidAscent SOC engineering team lab, I contributed by deploying Wazuh on Ubuntu, hardening service access, and validating Windows and Linux telemetry. I enabled PowerShell Script Block Logging for a controlled detection test. I also installed Yamcs on an Ubuntu endpoint, configured its log collection, and confirmed that Yamcs log entries appeared in the Wazuh dashboard.'
      },
      {
        title: 'Six controlled detections in the team lab',
        body: 'The October 22, 2026 lab report records six successful dashboard checks across three endpoints. I used controlled activity to test each detection and checked the corresponding result in Wazuh.',
        bullets: [
          'Generated a failed Windows logon and verified the authentication alert on the correct endpoint.',
          'Generated repeated unsuccessful SSH logins and verified the SSH-specific alert.',
          'Ran a harmless Base64 decode in PowerShell and verified the alert after correcting the rule parent.',
          'Modified a monitored test file on the Ubuntu endpoint and verified a file integrity alert.',
          'Created a temporary Windows local account and verified the account creation alert.',
          'Repeated a local group membership change test after correcting its rule parent and verified the alert.'
        ]
      },
      {
        title: 'Guided SIEM exercises',
        body: 'In guided Splunk and Elastic exercises, I analyzed simulated security events and documented findings and incident response steps. The hands-on Wazuh team project gave me practice with deployment, telemetry collection, and controlled detection validation.'
      },
      {
        title: 'Evidence retained',
        body: 'The October 22 report records the tests and the dashboard results I confirmed. Original event records and exact rule exports are unavailable. The personal lab milestones above reflect the Linux connection and the work still in progress there.'
      }
    ]
  },
  {
    id: 'devsecops-labs',
    title: 'DevSecOps Labs',
    eyebrow: 'Container & CI/CD training',
    status: 'Training labs',
    summary: 'Connecting container operations, CI/CD practice, and scripting fundamentals through focused lab exercises.',
    tags: ['Docker', 'Nginx', 'Jenkins', 'Bash', 'PowerShell'],
    sections: [
      { title: 'The goal', body: 'Connect application-delivery concepts with practical container operations and repeatable administration tasks through focused training exercises.' },
      { title: 'Container operations', body: 'Deployed Nginx in Docker with port mapping and verified that the web service was reachable. Inspected the container and practiced its full lab lifecycle, including stopping and removing it.' },
      { title: 'Automation and delivery practice', body: 'Practiced Jenkins CI/CD workflows alongside separate Bash account-provisioning, PowerShell reporting and SHA-256 comparison, and Python programming exercises.' },
      { title: 'What it demonstrates', body: 'Hands-on familiarity with container lifecycle management, build-workflow concepts, and scripting inputs and outputs. These are related training exercises rather than a single production pipeline with implemented security gates.' }
    ]
  },
  {
    id: 'windows-linux-hardening',
    title: 'Windows & Linux Hardening',
    eyebrow: 'Systems security labs',
    status: 'Training labs',
    summary: 'Practicing access controls, host firewall policies, log inspection, and operating-system hardening.',
    tags: ['Windows', 'Linux', 'UFW', 'Permissions', 'Logs'],
    sections: [
      { title: 'The goal', body: 'Practice how identity, permissions, host controls, and logs work together when securing and troubleshooting Windows and Linux systems.' },
      { title: 'Linux access testing', body: 'Managed users, groups, and shared-directory permissions. Tested both authorized and denied access, then used system and service logs to investigate permission problems.' },
      { title: 'Host firewall practice', body: 'Verified UFW default-deny inbound policy, web-service allowances, logging, and SSH rate limits in a lab environment.' },
      { title: 'Windows and Linux investigations', body: 'Completed guided hardening exercises, examined Linux file systems for attacker artifacts, and investigated Windows Registry persistence using the AutoRuns PowerShell module.' },
      { title: 'What it demonstrates', body: 'Testing access from both sides of a control is as important as setting the control. The work demonstrates guided hardening and documented troubleshooting, without claiming an automated enterprise baseline or measured reduction in attacks.' }
    ]
  },
  {
    id: 'router-on-a-stick',
    title: 'Router-on-a-Stick Lab',
    eyebrow: 'Cisco Packet Tracer',
    status: 'Training lab',
    summary: 'Configuring VLANs and inter-VLAN routing in a simulated Cisco network.',
    tags: ['Packet Tracer', 'VLANs', '802.1Q', 'IPv4'],
    sections: [
      { title: 'The goal', body: 'Explore how separate VLANs can share a physical link while a router provides communication between logical network segments.' },
      { title: 'My work', body: 'Configured VLANs, 802.1Q trunking, and Router-on-a-Stick inter-VLAN routing in Cisco Packet Tracer. Used the simulator to practice the relationship between switching and routing configuration.' },
      { title: 'Supporting network practice', body: 'Completed IPv4 subnetting exercises to reinforce address planning and the relationship between subnets, logical segments, and routing.' },
      { title: 'What it demonstrates', body: 'Hands-on configuration practice with VLAN segmentation and inter-VLAN routing in a simulator. The scope is a training network, separate from operating production Cisco infrastructure.' }
    ]
  },
  {
    id: 'active-directory-group-policy',
    title: 'Active Directory & Group Policy',
    eyebrow: 'Windows administration labs',
    status: 'Training lab',
    summary: 'Practicing Windows domain administration and Group Policy in a training environment.',
    tags: ['Windows', 'Active Directory', 'Group Policy', 'Access controls'],
    sections: [
      { title: 'The goal', body: 'Build a foundation in centralized Windows administration: organizing identities, understanding access controls, and working with policy-based configuration.' },
      { title: 'My work', body: 'Practiced Windows and Active Directory administration and worked with Group Policy in a training environment.' },
      { title: 'Focus areas', bullets: ['The relationship between directory identities and access controls.', 'Group Policy as a way to manage Windows configuration centrally.', 'Policy purpose and scope as part of a structured administration workflow.'] },
      { title: 'What it demonstrates', body: 'Guided experience with Windows domain and policy concepts. The case study describes training scope without claiming a production domain rollout or unrecorded client results.' }
    ]
  },
  {
    id: 'attack-navigator',
    title: 'ATT&CK Technique Comparison',
    eyebrow: 'Training investigation',
    status: 'Exercise completed',
    summary: 'Comparing documented adversary techniques to make shared behaviors easier to inspect.',
    tags: ['MITRE ATT&CK', 'Navigator', 'Threat intelligence'],
    sections: [
      { title: 'The question', body: 'How can documented adversary techniques be compared in one view so that shared behaviors are easier to inspect?' },
      { title: 'My approach', body: 'Created Enterprise ATT&CK Navigator layers for Dragonfly, FIN5, APT28, APT29, and Ember Bear. Assigned equal scores to documented techniques and combined the layers to visualize overlap.' },
      { title: 'The output', body: 'Produced a combined visual comparison of known techniques across five groups. The exercise connects evidence organization with a repeatable way to inspect overlaps rather than treating every group as an isolated list.' },
      { title: 'What it demonstrates', body: 'Structured threat-intelligence comparison and clear visualization in a training exercise. It does not claim deployed detections, attribution of a live incident, or measured coverage improvements.' }
    ]
  },
  {
    id: 'pcap-investigation',
    title: 'Suspicious File Investigation',
    eyebrow: 'Collaborative training lab',
    status: 'Exercise completed',
    summary: 'Following packet evidence and file hashes to investigate an executable disguised as an image.',
    tags: ['Wireshark', 'SHA-256', 'VirusTotal', 'Linux'],
    sections: [
      { title: 'The investigation', body: 'Collaborated on an isolated lab using a provided PCAP to investigate an executable disguised as a PNG image.' },
      { title: 'My approach', body: 'Filtered Wireshark traffic and exported HTTP objects in a Linux VM. Compared hostnames and file sizes, calculated SHA-256 hashes with sha256sum, and correlated the hashes with VirusTotal.' },
      { title: 'What the evidence connected', body: 'The workflow linked network traffic, an exported object, and file-hash information, showing why a filename or extension alone is not enough to identify a file.' },
      { title: 'What it demonstrates', body: 'Packet analysis, file identification, hash correlation, and collaborative investigation in a controlled training environment. The exercise is separate from professional incident response or malware reverse engineering.' }
    ]
  }
];

export const focusAreas = ['Security operations', 'Linux & Windows', 'Networking', 'Technical documentation'];
