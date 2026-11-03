import samples from "./portfolio-samples.json";

export type ProjectStory = {
  kind: string; audience: string; input: string; result: string;
  image?: string; imageAlt?: string; caption: string; imagePosition?: string;
  steps: [string, string][]; exampleTitle: string; example: string;
  output?: { label: string; value: string }[];
};

const sync = samples["csv-airtable-sync"].sample;
const mail = samples["gmail-faq-responder"].sample;
const coach = samples["product-clarity-coach-prototype"].sample;
const health = samples["crystade-uptime-monitor"].sample;

export const PROJECT_STORIES: Record<string, ProjectStory> = {
  "mapping-qa": {
    kind: "CSV comparison & findings report", audience: "Teams moving contact data between systems",
    input: "Original and migrated CSVs, plus agreed field names.",
    result: "A report showing missing records, duplicates and misplaced values.",
    image: "/portfolio/mapping-report.png", imageAlt: "Actual synthetic CSV findings report with duplicate, missing-record and swapped-field findings", imagePosition: "center top",
    caption: "Actual sample deliverable · fictional records",
    steps: [["Choose the two exports", "Select the original and migrated CSV files and the record ID used to match them."], ["Check the agreed fields", "Compare the mapped columns. Review duplicate IDs, missing records and mismatched values."], ["Review the report and recheck", "Use the findings to correct the export, then run the same agreed checks again."]],
    exampleTitle: "A moved note is caught, even though its words are still present.",
    example: "In the sample, record 1002 has a note in the Contact column and a name in Activity. The report flags both fields, plus a duplicate, a missing record and an unexpected record.",
  },
  "lead-rescue": {
    kind: "Lead pipeline dashboard", audience: "Small service businesses tracking incoming inquiries",
    input: "A lead name, where it came from and its estimated value.",
    result: "A visible pipeline with open, won and missed opportunities.",
    image: "/portfolio/lead-rescue.jpg", imageAlt: "LeadRescue's real demo with pipeline totals, five example inquiries and editable statuses", caption: "Real browser demo · sample inquiries",
    steps: [["Add an inquiry", "Enter a sample lead, its source and the potential job value."], ["Update what happened", "Mark it new, responded, won or missed as the conversation progresses."], ["Find the next follow-up", "See missed opportunities and reactivate a lead when you are ready to follow up yourself."]],
    exampleTitle: "See the inquiries that need another conversation.",
    example: "The demo starts with five leads, $7,100 in open potential and two missed inquiries worth an estimated $2,000. These are sample pipeline figures, not revenue earned.",
  },
  "field-quote": {
    kind: "Field-service quote calculator", audience: "Contractors pricing a small service job",
    input: "Materials, labor hours, hourly rate, overhead and markup.",
    result: "A suggested price with cost, gross profit and margin breakdowns.",
    image: "/portfolio/field-quote.jpg", imageAlt: "FieldQuote calculator showing cost inputs and a calculated quote summary", imagePosition: "center 50%", caption: "Real calculator · example job costs",
    steps: [["Enter the job costs", "Add materials and labor, then choose the overhead percentage."], ["Adjust your markup", "Change the markup and see the suggested price update."], ["Check the margin", "Review cost, gross profit and gross margin before deciding on a real quote."]],
    exampleTitle: "$1,240 in direct costs becomes a transparent price calculation.",
    example: "The default example adds 10% overhead and 35% markup: $1,364 total cost, a $1,841.40 suggested price and 25.9% gross margin. Taxes, discounts and payment fees are excluded.",
  },
  "crm-starter": {
    kind: "Contacts & follow-up workspace", audience: "Small teams organizing relationships locally",
    input: "Contact details, pipeline stage, value and follow-up dates.",
    result: "A saved contact list and an explainable priority queue.",
    image: "/portfolio/crm-starter.jpg", imageAlt: "SignalDesk CRM's real local dashboard showing pipeline totals and opportunity stages", caption: "Real local dashboard · seeded demo contacts",
    steps: [["Capture a contact", "Add the person's details, notes, opportunity value and stage."], ["Keep the pipeline current", "Search contacts and move opportunities through their stages. Records are saved locally in SQLite."], ["Work through the priority queue", "Review follow-up dates and the reason each contact needs attention."]],
    exampleTitle: "Turn a contact list into a practical follow-up queue.",
    example: "The seeded dashboard shows three open opportunities, $8,500 in pipeline potential and three follow-ups due. This is a local demonstration; shared access and production security need additional setup.",
  },
  "airtable-sync": {
    kind: "CSV import validation utility", audience: "Teams preparing a controlled Airtable import",
    input: "A CSV file and a map from its columns to Airtable fields.",
    result: "A dry-run summary and rejection reasons before any upload.",
    caption: "Actual command-line sample output · no Airtable connected",
    output: [{label:"Rows ready",value:String(sync.valid)}, {label:"Rows needing correction",value:String(sync.rejected)}, {label:"Records uploaded",value:sync.committed ? "Yes" : "None · dry run"}],
    steps: [["Map the columns", "Choose the source CSV headings and the destination field names."], ["Preview the whole file", "Run local validation and inspect row-level rejections before making changes."], ["Approve an import separately", "Only an explicit commit with an authorized account can write records. The sample performs no upload."]],
    exampleTitle: "Catch bad rows before they reach the destination.",
    example: `The supplied sample finds ${sync.valid} valid rows and ${sync.rejected} rejected rows. Nothing is committed. Real account integration and recovery after partial network writes still require acceptance testing.`,
  },
  "gmail-responder": {
    kind: "FAQ reply decision engine", audience: "Teams handling repeat inbox questions",
    input: "An approved FAQ list and example incoming questions.",
    result: "Reply candidates, manual-review decisions and duplicate skips.",
    caption: "Actual local demo decisions · no mailbox connected",
    output: mail.map(item=>({label:item.message_id === "msg-002" ? "Uncertain question" : item.action === "skip" ? "Repeated message" : "Schedule question",value:item.action === "reply" ? "Reply candidate" : item.action === "skip" ? "Skip duplicate" : "Human review"})),
    steps: [["Define approved answers", "Provide the questions and answers the business is comfortable using."], ["Classify a question", "The local demo compares example questions with the FAQ and checks repeated message IDs."], ["Keep a person in control", "Review reply candidates and handle uncertain questions manually. Gmail authorization is a separate integration step."]],
    exampleTitle: "Answer the routine question; leave the uncertain one for a person.",
    example: "The sample selects the class-schedule FAQ, routes an uncertain question to manual review and skips a duplicate message. This demonstration does not connect to Gmail or send mail.",
  },
  "schema-checker": {
    kind: "Website structured-data preflight", audience: "Businesses checking LocalBusiness markup",
    input: "The site's LocalBusiness JSON-LD markup.",
    result: "A property checklist showing what is present and what needs attention.",
    image: "/portfolio/schema-checker.jpg", imageAlt: "Actual Schema Checker showing example JSON-LD and required-property results", caption: "Real browser checker · fictional business markup",
    steps: [["Paste the markup", "Use your JSON-LD or load the fictional example."], ["Run the preflight", "Check the common required and recommended LocalBusiness properties."], ["Review missing information", "Use the checklist to improve completeness before publishing your markup."]],
    exampleTitle: "See exactly which properties the example is missing.",
    example: "The built-in example passes 4 of 4 required checks and 1 of 6 recommended checks. It highlights missing details such as a website URL and opening hours. This does not guarantee rankings or rich results.",
  },
  "clarity-coach": {
    kind: "Guided product-discovery rules", audience: "Builders narrowing an early product idea",
    input: "An idea, intended customer, problem and version-one priorities.",
    result: "A focused next question and a structured product snapshot.",
    caption: "Actual reference-flow response · no AI API called",
    output: [{label:"Sample customer answer",value:"Everyone"},{label:"What the coach asks",value:coach.next_question},{label:"Readiness",value:`${coach.readiness.score}/100 · needs refinement`}],
    steps: [["Describe the idea", "Start with the product and one specific primary customer."], ["Resolve vague answers", "The reference rules challenge broad customers and excessive version-one features."], ["Keep a clear snapshot", "Collect the customer, problem, solution and scope decisions in a consistent output."]],
    exampleTitle: "“Everyone” is a prompt to focus, not a completed customer definition.",
    example: coach.next_question + " This is a deterministic reference flow, not a connected conversational AI service or a guarantee of product success.",
  },
  "uptime-monitor": {
    kind: "WordPress health-check plugin", audience: "Developers connecting a site to external monitoring",
    input: "An authorized request to the plugin's status endpoint.",
    result: "A compact healthy, degraded or critical response for the monitoring system.",
    caption: "Actual PHP test-fixture response · no live site monitored",
    output: [{label:"Simulated condition",value:"Database unavailable"},{label:"HTTP response",value:String(health.http_status)},{label:"Reported status",value:health.status}],
    steps: [["Install and configure access", "A developer installs the plugin and configures its authentication token."], ["Request the health endpoint", "An authorized monitor requests the site's limited health report."], ["Interpret the response", "The monitoring system can distinguish normal health, degradation and critical failures."]],
    exampleTitle: "A failed database check becomes a critical signal.",
    example: "In the local test harness, an unavailable database produces HTTP 503 and status critical. This is plugin source, not an online monitoring subscription or an alerting service.",
  },
  "drainage-site": {
    kind: "Service-business website concept", audience: "Contractors balancing urgent and planned inquiries",
    input: "A visitor's urgent issue or planned commercial project.",
    result: "A clear service path and an easy-to-find inquiry action.",
    image: "/portfolio/drainage-site.jpg", imageAlt: "Actual AlderFlow contractor website concept with emergency and commercial paths", caption: "Real responsive website concept · fictional brand",
    steps: [["Choose the type of help", "Visitors separate an urgent drainage issue from a planned commercial project."], ["Understand the service", "Clear service descriptions explain the work and the next steps."], ["Reach the right inquiry path", "Prominent desktop and mobile contact actions reduce hunting for how to get in touch."]],
    exampleTitle: "Two clear paths instead of one vague contact button.",
    example: "The concept separates emergency help from commercial work. It uses a fictional brand and demo contact actions; a real launch needs verified business details and approved integrations.",
  },
};
