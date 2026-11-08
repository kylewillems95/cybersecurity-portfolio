import React, { useEffect, useRef, useState } from 'react';

import { resumeSections, projects, focusAreas } from './content';
import { caseStudyRoutes } from './case-study-routes.js';
import { OpenSourceTools } from './OpenSourceTools.jsx';


function Icon({ name, size = 20, ...props }) {
  const paths = {
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    external: <><path d="M14 3h7v7M21 3l-9 9" /><path d="M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5" /></>,
    document: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h6" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    shield: <><path d="M12 3 3 7v5c0 5 9 9 9 9s9-4 9-9V7z" /><path d="m8 12 3 3 5-6" /></>,
    layers: <><path d="m12 3 10 5-10 5L2 8zM2 12l10 5 10-5M2 16l10 5 10-5" /></>,
    packet: <><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M8 22h8M12 18v4M6 12h3l2-4 3 7 2-3h2" /></>,
    network: <><rect x="9" y="2" width="6" height="5" rx="1" /><path d="M12 7v5M5 16v-4h14v4" /><rect x="2" y="16" width="6" height="5" rx="1" /><rect x="16" y="16" width="6" height="5" rx="1" /></>,
    code: <><path d="m7 5-6 7 6 7M17 5l6 7-6 7M14 3l-4 18" /></>,
    education: <><path d="m2 9 10-5 10 5-10 5zM6 11v6c3 3 9 3 12 0v-6M22 9v8" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name] || paths.arrow}</svg>;
}

function Header({ isCaseStudy = false }) {
  const home = isCaseStudy ? '/' : '';
  return (
    <header className="site-header flex items-center justify-between gap-4">
      <a className="brand flex items-center gap-3" href={`${home}#top`} aria-label="Kyle Willems, back to introduction"><span className="monogram">KW</span><span>Kyle Willems<span className="brand-sub">Security Operations · Systems Administration</span></span></a>
      <nav aria-label="Main navigation" className="flex items-center gap-6">
        <a className="home-link" href={`${home}#top`}>Home</a>
        <a href={`${home}#resume`}>Resume</a>
        <a href={`${home}#projects`}>Projects</a>
        <a href={`${home}#open-source-tools`}>Tools</a>
        <a href={`${home}#contact`}>Contact</a>
      </nav>
      <a className="header-action" href="/resume/Kyle_Willems_Resume.pdf" download><Icon name="document" size={16}/>Download resume</a>
    </header>
  );
}

function Intro() {
  return <section className="intro" id="top" aria-labelledby="intro-title">
    <div className="service-mark" aria-hidden="true"><Icon name="shield" size={40}/></div>
    <div className="intro-copy"><p className="eyebrow">U.S. ARMY SERGEANT · CYBERSECURITY & IT</p><h1 id="intro-title">Cybersecurity &amp; IT Professional</h1><p className="intro-description">Bringing Army leadership, hands-on security training, and disciplined troubleshooting to systems administration, security operations, and IT.</p></div>
    <div className="intro-aside"><div className="intro-credential"><Icon name="shield" size={27}/><p>CompTIA<br/><strong>Security+ & A+</strong></p><span>Earned certifications</span></div><div className="intro-credential wgu-credential"><Icon name="education" size={29}/><p>M.S. Cybersecurity<br/>and Information Assurance</p><span>Western Governors University</span><span className="degree-status">Accepted · January 2027 start</span></div><div className="intro-credential chemistry-credential"><Icon name="education" size={29}/><p>B.S. Chemistry</p><span>University of Mississippi</span><span>Biochemistry emphasis<br/>Minor in Mathematics</span></div></div>
  </section>;
}

function ResumePanel() {
  const scrollRef = useRef(null);
  function jumpToSection(event, id) {
    const target = document.getElementById(id);
    const region = scrollRef.current;
    if (!target || !region) return;
    event.preventDefault();
    if (window.matchMedia('(min-width: 851px)').matches) {
      const top = region.scrollTop + target.getBoundingClientRect().top - region.getBoundingClientRect().top - 22;
      region.scrollTo({ top, behavior: 'instant' });
    } else {
      target.scrollIntoView({ block: 'start', behavior: 'instant' });
    }
    target.focus({ preventScroll: true });
    window.history.replaceState(null, '', `#${id}`);
  }
  return <section id="resume" tabIndex={-1} className="panel resume-panel" aria-labelledby="resume-title">
    <div className="panel-heading flex items-center justify-between gap-3"><div className="flex items-center gap-3"><span className="panel-icon"><Icon name="document" size={28}/></span><div><h2 id="resume-title">Resume</h2><p>Experience, skills, and education · November 2026</p></div></div><a className="resume-download" href="/resume/Kyle_Willems_Resume.pdf" download>Download PDF<Icon name="document" size={14}/></a></div>
    <nav className="resume-nav flex flex-wrap gap-x-4 gap-y-2" aria-label="Resume sections">{resumeSections.map(section => <a href={`#${section.id}`} onClick={event => jumpToSection(event, section.id)} key={section.id}>{({summary:'Summary', skills:'Skills',training:'Training',experience:'Experience','resume-projects':'Projects', certifications:'Certifications',education:'Education'})[section.id]}</a>)}</nav>
    <div ref={scrollRef} className="scroll-region resume-content" tabIndex="0" role="region" aria-label="Scrollable resume">
      <div className="resume-document-title"><p className="eyebrow">KYLE WILLEMS</p><p>Cybersecurity · Systems Administration<br />IT Support · Information Assurance</p></div>
      {resumeSections.map((section, index) => <section className="resume-section" id={section.id} tabIndex={-1} key={section.id} aria-labelledby={`${section.id}-title`}>
        <h3 id={`${section.id}-title`}><span className="section-number">{String(index + 1).padStart(2,'0')}</span>{section.title}</h3>
        {section.entries.map((entry) => <article className="resume-entry" key={entry.title}><h4>{entry.title}</h4>{entry.meta ? <p className="entry-meta">{entry.meta}</p> : null}{entry.paragraphs?.map(text => <p key={text}>{text}</p>)}{entry.bullets ? <ul>{entry.bullets.map(text => <li key={text}>{text}</li>)}</ul> : null}</article>)}
      </section>)}
      <div className="resume-access"><a href="/resume/" target="_blank" rel="noopener noreferrer">Read the full resume<Icon name="external" size={14}/><span className="sr-only"> (opens in a new tab)</span></a><a href="/resume/Kyle_Willems_Resume.pdf" download>Download PDF<Icon name="document" size={14}/></a></div>
    </div>
    <div className="panel-bottom"><span>Experience grounded in service. Skills built through practice.</span><Icon name="shield" size={14} /></div>
  </section>;
}

function LabVisual({ type }) {
  if (type === 'home-soc') return <div className="lab-visual network-visual" aria-hidden="true"><span className="node"><Icon name="network" size={25} /><small>WAZUH</small></span><span className="network-line"/><span className="node small-node"><span className="online-dot"/>LINUX</span><span className="node small-node pending-node">WINDOWS</span></div>;
  if (type === 'devsecops-labs') return <div className="lab-visual tools-visual" aria-hidden="true"><span><Icon name="layers" size={28}/><b>DOCKER</b><small>Containers</small></span><i/><span><Icon name="code" size={28}/><b>JENKINS</b><small>Build workflows</small></span><i/><span><Icon name="document" size={28}/><b>SCRIPTING</b><small>Repeatable tasks</small></span></div>;
  if (type === 'windows-linux-hardening') return <div className="lab-visual hardening-visual" aria-hidden="true"><div className="terminal-caption"><span>WINDOWS / LINUX</span><span>HARDENING LABS</span></div><div className="hardening-row"><span>01</span>Access & permissions <i/></div><div className="hardening-row"><span>02</span>Services & firewall <i/></div><div className="hardening-row"><span>03</span>Logs & investigation <i/></div></div>;
  if (type === 'router-on-a-stick') return <div className="lab-visual routing-visual" aria-hidden="true"><div className="routing-node"><Icon name="network" size={24}/><b>ROUTER</b></div><span className="trunk-link">802.1Q TRUNK</span><div className="routing-node"><Icon name="layers" size={24}/><b>SWITCH</b></div><span className="branch-line"/><div className="vlan-pair"><span>VLAN A</span><span>VLAN B</span></div></div>;
  if (type === 'active-directory-group-policy') return <div className="lab-visual directory-visual" aria-hidden="true"><div className="directory-root"><Icon name="network" size={23}/><span>ACTIVE DIRECTORY</span></div><div className="directory-branches"><span>Organizational units</span><span>Users & groups</span><span>Group Policy</span></div></div>;
  return <div className={`lab-visual ${type === 'attack-navigator' ? 'matrix-visual' : 'packet-visual'}`} aria-hidden="true">{type === 'attack-navigator' ? <><div className="matrix-grid">{Array.from({length:32},(_,i)=><span className={`cell cell-${i%5}`} key={i}/>)}</div><span className="visual-caption">TECHNIQUE OVERLAP / TRAINING</span></> : <><div className="packet-row"><span>HTTP</span><i/><i/><b>200</b></div><div className="packet-row selected"><span>FILE</span><i/><i/><b>SHA-256</b></div><div className="packet-row"><span>DNS</span><i/><i/><b>QUERY</b></div><span className="visual-caption">PACKET → OBJECT → HASH</span></>}</div>;
}

function NovaCapture() {
  return (
    <figure className="nova-preview">
      <div className="browser-chrome" aria-hidden="true"><span/><span/><span/><span className="browser-address">novaserenitymassage.com</span><Icon name="shield" size={12}/></div>
      <img src="/images/nova-desktop.jpg" alt="Nova Serenity homepage showing its service introduction and booking navigation" width="1425" height="950" />
      <figcaption><span className="status-dot"/> Homepage preview <span>Captured November 2026</span></figcaption>
    </figure>
  );
}

function ProjectSections({ sections, heading: Heading = 'h4' }) {
  return sections.map(section => (
    <section key={section.title}>
      <Heading>{section.title}</Heading>
      {section.body ? <p>{section.body}</p> : null}
      {section.bullets ? <ul>{section.bullets.map(text => <li key={text}>{text}</li>)}</ul> : null}
    </section>
  ));
}

function ProjectCard({ project, index }) {
  const [open, setOpen] = useState(false);
  const featured = project.id === 'nova-serenity';
  const caseStudy = caseStudyRoutes[project.id];
  return <article className={`project-card ${featured ? 'featured-card' : ''}`}>
    {featured ? <NovaCapture/> : <><LabVisual type={project.id}/><p className="illustration-label">Concept illustration · {project.id === 'home-soc' ? 'Lab overview' : 'Lab topics'}</p></>}
    <div className="project-body"><div className="project-meta flex items-center justify-between gap-2"><span className="eyebrow">{project.eyebrow}</span><span className={`project-status ${project.status === 'In progress' ? 'pending' : ''}`}>{project.status}</span></div>
      <div className="project-title-row"><h3>{project.title}</h3><span className="project-number">{String(index + 1).padStart(2,'0')}</span></div><p className="project-summary">{project.summary}</p><ul className="tags flex flex-wrap gap-2" aria-label="Project topics">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
      <div id={`${project.id}-details`} hidden={!open} className="project-details"><ProjectSections sections={project.sections}/></div>
      <div className="project-actions">
        <button type="button" aria-expanded={open} aria-controls={`${project.id}-details`} onClick={()=>setOpen(value=>!value)}>{open ? 'Close details' : 'Explore project'}<span className={`expand-icon ${open ? 'expanded' : ''}`}><Icon name="plus" size={16}/></span><span className="sr-only">: {project.title}</span></button>
        {caseStudy ? <a href={caseStudy}>Read case study<Icon name="arrow" size={14}/><span className="sr-only"> for {project.title}</span></a> : null}
        {project.link ? <a href={project.link.url} target="_blank" rel="noopener noreferrer">{project.link.label} <Icon name="external" size={14}/><span className="sr-only">: {project.title} (opens in a new tab)</span></a> : null}
      </div>
    </div>
  </article>;
}

function ProjectsPanel() {
  return <section id="projects" tabIndex={-1} className="panel projects-panel" aria-labelledby="projects-title"><div className="panel-heading flex items-center justify-between gap-3"><div className="flex items-center gap-3"><span className="panel-icon"><Icon name="code" size={31}/></span><div><h2 id="projects-title">Technical Projects</h2><p>Personal projects, hands-on labs, and investigations.</p></div></div><span className="project-count">{String(projects.length).padStart(2,'0')}</span></div><div className="scroll-region projects-content" tabIndex="0" role="region" aria-label="Scrollable projects"><p className="projects-intro">Explore the work behind the skills.</p>{projects.map((project,index)=><ProjectCard project={project} index={index} key={project.id}/>)}<div className="project-footnote">Training exercises and independent projects are identified throughout.</div></div><div className="panel-bottom"><span>Open a project to explore the work behind it.</span><Icon name="arrow" size={14}/></div></section>;
}

function Contact() {
  return <section className="contact-section" id="contact" aria-labelledby="contact-title"><div><p className="eyebrow">LET’S CONNECT</p><h2 id="contact-title">A conversation is a good place to start.</h2><p>Explore my professional background and connect on LinkedIn.</p></div><a className="contact-link" href="https://www.linkedin.com/in/kyle-willems" target="_blank" rel="noopener noreferrer">Connect on LinkedIn <Icon name="external" size={16}/><span className="sr-only"> (opens in a new tab)</span></a></section>;
}

function Footer({ isCaseStudy = false }) {
  return (
    <footer className="footer">
      <a className="footer-brand" href={isCaseStudy ? '/' : '#top'}><span>KW</span>Kyle Willems</a>
      <span className="footer-motto">BUILD <b>·</b> SECURE <b>·</b> KEEP LEARNING</span>
      <span className="footer-right">© 2026 <a href="#top">Back to top ↑</a></span>
    </footer>
  );
}

function NovaArchitecture() {
  return (
    <figure className="case-diagram">
      <figcaption><p className="eyebrow">CONCEPT DIAGRAM</p><h2>Booking architecture</h2></figcaption>
      <div className="case-diagram-lane">
        <h3>Public booking request path</h3>
        <ol className="case-diagram-flow" role="list">
          <li><strong>Public frontend</strong><span>Service pages and booking interface</span></li>
          <li><strong>Apache</strong><span>Serves pages and forwards API requests</span></li>
          <li><strong>Flask API</strong><span>Handles booking requests</span></li>
        </ol>
      </div>
      <div className="case-diagram-lane">
        <h3>October 2026 sandbox walkthrough</h3>
        <ol className="case-diagram-flow" role="list">
          <li><strong>Square Sandbox</strong><span>Test card form</span></li>
          <li><strong>Booking confirmed</strong><span>Confirmation number generated</span></li>
          <li><strong>Cancellation tested</strong><span>Email received and calendar entry removed</span></li>
        </ol>
      </div>
    </figure>
  );
}

function SocEvidence() {
  return (
    <section className="case-evidence" aria-labelledby="soc-evidence-title">
      <h2 id="soc-evidence-title">Lab status at a glance</h2>
      <dl>
        <div><dt>Verified</dt><dd>Linux agent connected to the Wazuh manager.</dd></div>
        <div><dt>In progress</dt><dd>Windows agent and Sysmon setup.</dd></div>
        <div><dt>Planned</dt><dd>Controlled telemetry and detection tests.</dd></div>
      </dl>
    </section>
  );
}

function CaseStudyPage({ project }) {
  const isNova = project.id === 'nova-serenity';
  return (
    <>
      <a className="skip-link" href="#case-study">Skip to case study</a>
      <div className="site-shell">
        <Header isCaseStudy/>
        <main className="case-study-page" id="case-study" tabIndex={-1}>
          <article aria-labelledby="case-study-title">
            <header className="case-study-hero" id="top">
              <a className="case-study-back" href="/#projects"><Icon name="arrow" size={16}/>Back to projects</a>
              <div className="case-study-label"><p className="eyebrow">{project.eyebrow} · Case study</p><span className={`project-status ${project.status === 'In progress' ? 'pending' : ''}`}>{project.status}</span></div>
              <h1 id="case-study-title">{project.title}</h1>
              <p className="case-study-summary">{project.summary}</p>
              <ul className="tags flex flex-wrap gap-2" aria-label="Project topics">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
              {project.link ? <a className="case-study-external" href={project.link.url} target="_blank" rel="noopener noreferrer">{project.link.label}<Icon name="external" size={15}/><span className="sr-only"> (opens in a new tab)</span></a> : null}
            </header>
            {isNova ? <div className="case-study-visuals"><NovaCapture/><NovaArchitecture/></div> : <SocEvidence/>}
            <div className="case-study-sections"><ProjectSections heading="h2" sections={project.detailSections ?? project.sections}/></div>
          </article>
        </main>
        <Footer isCaseStudy/>
      </div>
    </>
  );
}

function App({ caseStudyId }) {
  useEffect(() => {
    if (caseStudyId || !window.location.hash) return;

    // Cross-page links can arrive before React has mounted the fragment target.
    const target = document.getElementById(window.location.hash.slice(1));
    target?.scrollIntoView({ block: 'start' });
  }, [caseStudyId]);

  const project = caseStudyId ? projects.find(item => item.id === caseStudyId) : null;
  if (project) return <CaseStudyPage project={project}/>;
  return (
    <>
      <a className="skip-link" href="#resume">Skip to resume</a>
      <a className="skip-link second-skip" href="#projects">Skip to projects</a>
      <div className="site-shell">
        <Header/>
        <main>
          <Intro/>
          <div className="workspace-grid"><ResumePanel/><ProjectsPanel/></div>
          <OpenSourceTools/>
          <div className="focus-strip"><span className="eyebrow">FOCUS AREAS</span><div className="flex flex-wrap gap-x-6 gap-y-2">{focusAreas.map(area=><span key={area}>{area}</span>)}</div></div>
          <Contact/>
        </main>
        <Footer/>
      </div>
    </>
  );
}

export default App;

