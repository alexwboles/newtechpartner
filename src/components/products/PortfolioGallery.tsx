import { useMemo, useRef, useState } from "react";
import { ArrowRight, ExternalLink, Search, Play, Maximize2, X } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PORTFOLIO_PROJECTS, type PortfolioProject } from "./portfolio-data";
import { PROJECT_STORIES } from "./portfolio-stories";

const categories = ["All work", "Business tools", "Automation", "Websites"] as const;
function ProjectVisual({ project, expanded = false }: { project: PortfolioProject; expanded?: boolean }) {
  const story = PROJECT_STORIES[project.id];
  return <figure className={`portfolio-product-preview ${expanded ? "portfolio-product-preview-expanded" : ""}`}>
    {story.image ? <div className="portfolio-screenshot-frame"><img src={story.image} alt={story.imageAlt} loading="lazy" decoding="async" style={{ objectPosition: story.imagePosition || "center top" }} /></div>
      : <div className="portfolio-sample-output"><span className="portfolio-output-label">Sample run</span><dl>{story.output?.map(row => <div key={row.label}><dt>{row.label}</dt><dd>{row.value}</dd></div>)}</dl></div>}
    <figcaption>{story.caption}</figcaption>
  </figure>;
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
    `${project.name} ${project.summary} ${project.category} ${project.features.join(" ")} ${PROJECT_STORIES[project.id].audience} ${PROJECT_STORIES[project.id].result}`.toLowerCase().includes(query.trim().toLowerCase())), [query, category]);
  const openDemo = (project: PortfolioProject) => { setSelected(null); if (project.route) navigate(project.route); };
  return <section aria-label="Project portfolio" className="portfolio-gallery">
    <div className="portfolio-section-heading"><div><p className="portfolio-eyebrow">Selected work</p><h2>Explore the projects.</h2></div><p>See the product, understand the workflow,<br />and explore an example of the result.</p></div>
    <div className="portfolio-controls">
      <div className="portfolio-filters" aria-label="Project categories">{categories.map(item => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div>
      <div className="portfolio-search"><Search size={17} aria-hidden="true" /><label className="sr-only" htmlFor="portfolio-search">Search projects</label><input id="portfolio-search" type="search" placeholder="Search projects…" value={query} onChange={e => setQuery(e.target.value)} />{query && <button type="button" aria-label="Clear project search" onClick={() => setQuery("")}><X size={16} /></button>}</div>
    </div>
    <p className="portfolio-result-count" role="status">{visible.length} {visible.length === 1 ? "project" : "projects"}{category !== "All work" ? ` · ${category}` : ""}{query.trim() ? ` matching “${query.trim()}”` : ""}</p>
    {visible.length ? <div className="portfolio-grid">{visible.map(project => { const story = PROJECT_STORIES[project.id]; return <article className="portfolio-project" key={project.id}>
      <header className="portfolio-project-heading"><div className="portfolio-project-meta"><span>{project.category}</span><span className={project.route ? "portfolio-status-demo" : ""}>{project.route ? "Try in your browser" : "Source + setup"}</span></div><h3>{project.name}</h3><p>{story.kind}</p></header>
      <ProjectVisual project={project} />
      <div className="portfolio-project-body"><p className="portfolio-for"><span>Made for</span>{story.audience}</p><dl className="portfolio-input-result"><div><dt>You provide</dt><dd>{story.input}</dd></div><div><dt>You get</dt><dd>{story.result}</dd></div></dl>
        <div className="portfolio-project-actions"><button type="button" className="portfolio-walkthrough-button" aria-label={`See how ${project.name} works`} onClick={event => { detailsTrigger.current = event.currentTarget; openingInquiry.current = false; setSelected(project); }}>See how it works <ArrowRight size={15} aria-hidden="true" /></button>{project.route ? <button type="button" className="portfolio-demo-button" onClick={() => openDemo(project)} aria-label={`Try ${project.name} demo`}><Play size={13} aria-hidden="true" /> Try demo</button> : <a href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.name} source`}>View code <ExternalLink size={14} aria-hidden="true" /></a>}</div>
      </div>
    </article>; })}</div> : <div className="portfolio-empty"><Search size={28} aria-hidden="true" /><h3>No projects match this search.</h3><p>Try another keyword or browse the full collection.</p><button type="button" onClick={() => { setQuery(""); setCategory("All work"); }}>Clear filters</button></div>}
    <p className="portfolio-footnote">Demos and source projects show capabilities, not client results. Use sample data when trying a demo; source projects may require installation or account setup.</p>
    <Dialog open={!!selected} onOpenChange={open => { if (!open) setSelected(null); }}><DialogContent showCloseButton={false} className="portfolio-detail portfolio-tour" onCloseAutoFocus={event => { event.preventDefault(); if (!openingInquiry.current) queueMicrotask(() => { if (detailsTrigger.current?.isConnected) detailsTrigger.current.focus(); }); }}>
      <div className="portfolio-tour-topbar"><span>Project walkthrough</span><DialogClose asChild><button type="button" aria-label="Close project walkthrough">Close <X size={16} aria-hidden="true" /></button></DialogClose></div>
      {selected && <><DialogHeader><p className="portfolio-eyebrow">{selected.category} · {selected.status}</p><DialogTitle>{selected.name}</DialogTitle><DialogDescription>{selected.details}</DialogDescription></DialogHeader>
        <div className="portfolio-tour-layout"><div><ProjectVisual project={selected} expanded />{PROJECT_STORIES[selected.id].image && <a className="portfolio-image-link" href={PROJECT_STORIES[selected.id].image} target="_blank" rel="noopener noreferrer"><Maximize2 size={14} aria-hidden="true" /> Open full-size preview</a>}</div><section aria-label="How this project works"><h3 className="portfolio-detail-label">How it works</h3><ol className="portfolio-tour-steps">{PROJECT_STORIES[selected.id].steps.map(([title,description],index)=><li key={title}><span aria-hidden="true">{String(index+1).padStart(2,"0")}</span><div><h4>{title}</h4><p>{description}</p></div></li>)}</ol></section></div>
        <section className="portfolio-example-result"><span className="portfolio-eyebrow">An example of the result</span><h3>{PROJECT_STORIES[selected.id].exampleTitle}</h3><p>{PROJECT_STORIES[selected.id].example}</p>{selected.id === "mapping-qa" && <a href="https://github.com/alexwboles/spreadsheet-data-mapping-qa/blob/41e5d3f6ab647d81429f5b1c1da2800d9f0219f8/demo/service-workflow/sample-findings-report.pdf" target="_blank" rel="noopener noreferrer">Read the one-page sample report <ExternalLink size={13} aria-hidden="true" /></a>}</section>
        <p className="portfolio-detail-note">{selected.note}</p>
        <div className="portfolio-detail-actions">{selected.route ? <button className="portfolio-primary-button" type="button" onClick={() => openDemo(selected)}>Try the demo <ArrowRight size={16} /></button> : <a className="portfolio-primary-button" href={selected.href} target="_blank" rel="noopener noreferrer">View source project <ExternalLink size={16} /></a>}<button className="portfolio-secondary-button" type="button" onClick={() => { openingInquiry.current = true; setSelected(null); onRequest(selected); }}>Discuss something similar</button></div></>}
    </DialogContent></Dialog>
  </section>;
}
