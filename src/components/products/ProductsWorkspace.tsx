import { useRef, useState } from "react";
import { ArrowRight, Mail, Layers, Workflow, Globe2, Check } from "lucide-react";
import PortfolioGallery from "./PortfolioGallery";
import SchemaWatchFeature from "./SchemaWatchFeature";
import SecondaryOffers from "./SecondaryOffers";
import SchemaWatchFAQ from "./SchemaWatchFAQ";
import PilotsServices from "./PilotsServices";
import GrowthChannels from "./GrowthChannels";
import FeaturedTools from "./FeaturedTools";
import PilotRequestModal from "./PilotRequestModal";
import { PORTFOLIO_PROJECTS } from "./portfolio-data";
import { PRODUCTS_EMAIL, SCHEMA_WATCH, TOOLS } from "./data";
import "./portfolio.css";
type Pilot = { title: string; description?: string; price?: string; priceNote?: string };
const tabs = ["Portfolio", "Free tools", "Services"] as const;

export default function ProductsWorkspace({ navigate }: { navigate: (page: string) => void }) {
  const [view, setView] = useState<typeof tabs[number]>("Portfolio");
  const [pilot, setPilot] = useState<Pilot | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const schemaRequest = () => setPilot({ title: SCHEMA_WATCH.modalTitle, price: SCHEMA_WATCH.pricingLine });
  return <div className="portfolio-workspace">
    <section className="portfolio-hero portfolio-container"><div>
      <p className="portfolio-eyebrow"><span className="portfolio-dot" /> TechPartner · Portfolio & tools</p>
      <h1>Built to make<br /><span>work simpler.</span></h1>
      <p className="portfolio-intro">Business tools, thoughtful websites and practical automations. Explore the work, try a demo, or talk through your next project.</p>
      <div className="portfolio-hero-actions"><button type="button" className="portfolio-primary-button" onClick={() => { setView("Portfolio"); requestAnimationFrame(() => document.getElementById("portfolio-browse")?.scrollIntoView({ behavior: "smooth", block: "start" })); }}>Explore the work <ArrowRight size={16} aria-hidden="true" /></button><button type="button" className="portfolio-secondary-button" onClick={() => navigate("contact")}>Let’s build something</button></div>
    </div><div className="portfolio-hero-aside" aria-label="Areas of work"><span className="portfolio-aside-label">From a business problem<br />to something you can use.</span><div><Layers size={20} aria-hidden="true" /><span><strong>Business tools</strong><small>Clearer operations. Less manual work.</small></span><Check size={14} aria-hidden="true" /></div><div><Workflow size={20} aria-hidden="true" /><span><strong>Practical automation</strong><small>Thoughtful checks and human review.</small></span><Check size={14} aria-hidden="true" /></div><div><Globe2 size={20} aria-hidden="true" /><span><strong>Web experiences</strong><small>Useful, responsive and easy to navigate.</small></span><Check size={14} aria-hidden="true" /></div></div></section>
    <div id="portfolio-browse" className="portfolio-container portfolio-browse">
      <div className="portfolio-tabs" role="tablist" aria-label="Browse portfolio, tools or services" onKeyDown={e => { const index = tabs.indexOf(view); const next = e.key === "ArrowRight" ? (index + 1) % 3 : e.key === "ArrowLeft" ? (index + 2) % 3 : e.key === "Home" ? 0 : e.key === "End" ? 2 : -1; if (next >= 0) { e.preventDefault(); setView(tabs[next]); tabRefs.current[next]?.focus(); } }}>
        {tabs.map((tab, index) => <button key={tab} id={`portfolio-tab-${index}`} ref={element => { tabRefs.current[index] = element; }} type="button" role="tab" aria-selected={view === tab} aria-controls={`portfolio-panel-${index}`} tabIndex={view === tab ? 0 : -1} onClick={() => setView(tab)}>{tab}{index < 2 && <span>{index === 0 ? PORTFOLIO_PROJECTS.length : TOOLS.length}</span>}</button>)}
      </div>
      <div role="tabpanel" id={`portfolio-panel-${tabs.indexOf(view)}`} aria-labelledby={`portfolio-tab-${tabs.indexOf(view)}`} tabIndex={0}>
        {view === "Portfolio" && <PortfolioGallery navigate={navigate} onRequest={project => setPilot({ title: `A project like ${project.name}`, description: project.summary, price: "Scope and pricing agreed before starting" })} />}
        {view === "Free tools" && <section className="portfolio-gallery"><div className="portfolio-section-heading"><div><p className="portfolio-eyebrow">Try a workflow</p><h2>Small tools. Useful answers.</h2></div><p>Explore these browser demonstrations with sample data.<br />No purchase is required to try them.</p></div><div className="portfolio-grid">{TOOLS.map(tool => <article className="portfolio-tool" key={tool.key}><span className="portfolio-tool-icon"><Workflow size={22} aria-hidden="true" /></span><span className="portfolio-kicker">{tool.key === "tool-lead-calculator" ? "Calculator" : "Interactive demo"}</span><h3>{tool.name}</h3><p>{tool.description}</p><button type="button" className="portfolio-text-button" onClick={() => navigate(tool.key)}>Open {tool.name} <ArrowRight size={16} aria-hidden="true" /></button></article>)}</div><p className="portfolio-footnote">These tools illustrate specific workflows. Check the information and assumptions before applying a result to your business.</p></section>}
        {view === "Services" && <div className="portfolio-services"><div className="portfolio-section-heading"><div><p className="portfolio-eyebrow">Work with TechPartner</p><h2>Start with a clear scope.</h2></div><p>Existing offers, pricing and inquiry options.<br />We agree on the work before starting.</p></div><SchemaWatchFeature onRequest={schemaRequest} navigate={navigate} /><SecondaryOffers onRequest={setPilot} /><PilotsServices onRequest={setPilot} /><details className="portfolio-service-details"><summary>More software offers & demos</summary><FeaturedTools navigate={navigate} /></details><details className="portfolio-service-details"><summary>In development · future services</summary><GrowthChannels onRequest={setPilot} /></details><details className="portfolio-service-details"><summary>SchemaWatch questions & terms</summary><SchemaWatchFAQ /></details></div>}
      </div>
    </div>
    <section className="portfolio-contact portfolio-container"><div><p className="portfolio-eyebrow">Your next project</p><h2>What could work better?</h2><p>Tell me about the task, process or idea you want to improve.</p></div><div><button className="portfolio-primary-button" type="button" onClick={() => navigate("contact")}>Talk about your project <ArrowRight size={16} /></button><a href={`mailto:${PRODUCTS_EMAIL}`}><Mail size={15} aria-hidden="true" />{PRODUCTS_EMAIL}</a></div></section>
    <PilotRequestModal pilot={pilot} onClose={() => setPilot(null)} />
  </div>;
}
