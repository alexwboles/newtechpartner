import { useMemo, useRef, useState } from "react";
import { ArrowRight, ExternalLink, Search, Layers, Workflow, Globe2, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PORTFOLIO_PROJECTS, type PortfolioProject } from "./portfolio-data";

const categories = ["All work", "Business tools", "Automation", "Websites"] as const;
function ProjectVisual({ project }: { project: PortfolioProject }) {
  const Icon = project.category === "Automation" ? Workflow : project.category === "Websites" ? Globe2 : Layers;
  return <div className={`portfolio-visual portfolio-visual-${project.category === "Automation" ? "blue" : project.category === "Websites" ? "gold" : "green"}`}>
    <span className="portfolio-visual-label"><Icon size={16} aria-hidden="true" /> Workflow overview</span>
    <div className="portfolio-flow" aria-label={project.stages.join(" to ")}>
      {project.stages.map((stage, i) => <div className="portfolio-flow-part" key={stage}><span>{stage}</span>{i < 2 && <ArrowRight size={15} aria-hidden="true" />}</div>)}
    </div>
  </div>;
}

export default function PortfolioGallery({ navigate, onRequest }: {
  navigate: (page: string) => void;
  onRequest: (project: PortfolioProject) => void;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<typeof categories[number]>("All work");
  const [selected, setSelected] = useState<PortfolioProject | null>(null);
  const detailsTrigger = useRef<HTMLButtonElement | null>(null);
  const openingInquiry = useRef(false);
  const visible = useMemo(() => PORTFOLIO_PROJECTS.filter(project =>
    (category === "All work" || project.category === category) &&
    `${project.name} ${project.summary} ${project.category} ${project.features.join(" ")}`.toLowerCase().includes(query.trim().toLowerCase())), [query, category]);
  const openDemo = (project: PortfolioProject) => { setSelected(null); if (project.route) navigate(project.route); };
  return <section aria-label="Project portfolio" className="portfolio-gallery">
    <div className="portfolio-section-heading"><div><p className="portfolio-eyebrow">Selected work</p><h2>Explore the projects.</h2></div><p>Interactive demos and documented source projects.<br />Clear examples of what I build.</p></div>
    <div className="portfolio-controls">
      <div className="portfolio-filters" aria-label="Project categories">{categories.map(item => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div>
      <div className="portfolio-search"><Search size={17} aria-hidden="true" /><label className="sr-only" htmlFor="portfolio-search">Search projects</label><input id="portfolio-search" type="search" placeholder="Search projects…" value={query} onChange={e => setQuery(e.target.value)} />{query && <button type="button" aria-label="Clear project search" onClick={() => setQuery("")}><X size={16} /></button>}</div>
    </div>
    <p className="portfolio-result-count" role="status">{visible.length} {visible.length === 1 ? "project" : "projects"}{category !== "All work" ? ` · ${category}` : ""}{query.trim() ? ` matching “${query.trim()}”` : ""}</p>
    {visible.length ? <div className="portfolio-grid">{visible.map(project => <article className="portfolio-project" key={project.id}>
      <ProjectVisual project={project} />
      <div className="portfolio-project-body"><div className="portfolio-project-meta"><span>{project.category}</span><span className={project.route ? "portfolio-status-demo" : ""}>{project.status}</span></div>
        <h3>{project.name}</h3><p>{project.summary}</p>
        <div className="portfolio-project-actions"><button type="button" className="portfolio-text-button" onClick={event => { detailsTrigger.current = event.currentTarget; openingInquiry.current = false; setSelected(project); }}>Project details <ArrowRight size={15} aria-hidden="true" /></button>{project.route ? <button type="button" className="portfolio-demo-button" onClick={() => openDemo(project)} aria-label={`Try ${project.name} demo`}>Try demo <ArrowRight size={14} aria-hidden="true" /></button> : <a href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.name} source`}>View source <ExternalLink size={14} aria-hidden="true" /></a>}</div>
      </div>
    </article>)}</div> : <div className="portfolio-empty"><Search size={28} aria-hidden="true" /><h3>No projects match this search.</h3><p>Try another keyword or browse the full collection.</p><button type="button" onClick={() => { setQuery(""); setCategory("All work"); }}>Clear filters</button></div>}
    <p className="portfolio-footnote">Demos and source projects show capabilities, not client results. Use sample data when trying a demo; source projects may require installation or account setup.</p>
    <Dialog open={!!selected} onOpenChange={open => { if (!open) setSelected(null); }}><DialogContent className="portfolio-detail" onCloseAutoFocus={event => { event.preventDefault(); if (!openingInquiry.current) queueMicrotask(() => { if (detailsTrigger.current?.isConnected) detailsTrigger.current.focus(); }); }}>
      {selected && <><DialogHeader><p className="portfolio-eyebrow">{selected.category} · {selected.status}</p><DialogTitle>{selected.name}</DialogTitle><DialogDescription>{selected.details}</DialogDescription></DialogHeader>
        <ProjectVisual project={selected} /><div><h3 className="portfolio-detail-label">What this project includes</h3><ul>{selected.features.map(feature => <li key={feature}>{feature}</li>)}</ul></div><p className="portfolio-detail-note">{selected.note}</p>
        <div className="portfolio-detail-actions">{selected.route ? <button className="portfolio-primary-button" type="button" onClick={() => openDemo(selected)}>Try the demo <ArrowRight size={16} /></button> : <a className="portfolio-primary-button" href={selected.href} target="_blank" rel="noopener noreferrer">View source project <ExternalLink size={16} /></a>}<button className="portfolio-secondary-button" type="button" onClick={() => { openingInquiry.current = true; setSelected(null); onRequest(selected); }}>Discuss something similar</button></div></>}
    </DialogContent></Dialog>
  </section>;
}
