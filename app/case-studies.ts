type Evidence={label:string;detail:string;path:string};
type Decision={challenge:string;approach:string;tradeoff:string};
type CaseStudy={category:"business"|"academic"|"portfolio";status:string;revision:string;role:string;features:string[];decisions:Decision[];evidence:Evidence[];scope:string};

export const caseStudies:Record<string,CaseStudy>={
 "rice-and-kottu-hut-pos":{
  category:"business",status:"Released software · v1.1.0",revision:"7e5629ae240869b7ed219b4ba8692e213b3a58c0",
  role:"Independently developed for my own restaurant, Rice & Kottu Hut.",
  features:["Order entry and server-priced checkout","Cash, card and QR tender recording","Menu variants and history-safe archival","Role-aware staff access","Expense management and reporting","80 mm receipts and local backups"],
  decisions:[
   {challenge:"Prevent duplicate orders and inconsistent totals",approach:"Re-read authoritative menu prices and write order and tender within one Prisma transaction, with a unique checkout token.",tradeoff:"Retries are recognized by the server; recorded card and QR tenders do not authorize external charges."},
   {challenge:"Preserve historical receipts when menu items change",approach:"Persist line-item names, variants, quantities and prices as snapshots.",tradeoff:"Historical records remain stable even when the current catalog changes."},
   {challenge:"Support workstation and cloud environments",approach:"Keep private local backup and printer operations on the workstation; use pooled PostgreSQL in isolated Netlify evaluation.",tradeoff:"Physical printer and failover acceptance require separate operational verification."}],
  evidence:[{label:"Release verification",detail:"Published release report records 25 unit tests, role-based browser checks, duplicate-submit protection and recovery rehearsals on disposable data.",path:"docs/PORTFOLIO_RELEASE.md"},{label:"Technical case study",detail:"Documents checkout design, receipt snapshots, deployment boundaries and owner-reported shop operation.",path:"docs/PORTFOLIO_CASE_STUDY.md"},{label:"Architecture",detail:"Application and storage boundaries.",path:"docs/ARCHITECTURE.md"},{label:"Demonstration walkthrough",detail:"Recorded synthetic-data workflow and screenshots.",path:"docs/PORTFOLIO_WALKTHROUGH.md"}],
  scope:"Released single-restaurant scope. Owner reports successful shop operation; independent hardware certification and financial outcomes are not established. The cloud evaluation uses isolated synthetic data and requires authentication."
 },
 "serviceops-group-project":{
  category:"academic",status:"Completed group coursework",revision:"63ac3baabb043dcb26ad5ff85141316745d11a8d",
  role:"Five-person final group project. My proposal-assigned responsibilities: project manager, solution architect and backend integration developer. This does not imply sole authorship of individual components.",
  features:["Five role-specific workspaces","Service requests and work orders","Technician dispatch and checklists","Spare parts and inventory","Attachments and notifications","Analytics and audit history"],
  decisions:[
   {challenge:"Coordinate multiple operational roles",approach:"Define role-aware workspaces and server-side permissions for administrators, managers, technicians, inventory managers and customers.",tradeoff:"Production authorization and workflow acceptance require further review."},
   {challenge:"Separate presentation from service logic",approach:"Use Next.js and a backend proxy for web presentation, ASP.NET Core endpoints for service operations, and EF Core with PostgreSQL.",tradeoff:"A separate API introduces integration and deployment boundaries that require explicit configuration."},
   {challenge:"Represent related operational records",approach:"Model service requests, work orders, assets, technicians and stock with relational entities and migrations.",tradeoff:"Build verification alone does not prove complete operational behavior."}],
  evidence:[{label:"Build and architecture evidence",detail:"Published case study records successful backend and frontend builds and both GitHub Actions build jobs; it explicitly excludes end-to-end acceptance.",path:"docs/CASE_STUDY.md"},{label:"Team attribution",detail:"Proposal-defined roles for all five contributors.",path:"docs/TEAM.md"},{label:"Architecture",detail:"Frontend, API and persistence overview.",path:"docs/ARCHITECTURE.md"},{label:"Screenshot provenance",detail:"Checked-in application previews, not fresh live captures.",path:"docs/SCREENSHOT_EVIDENCE.md"}],
  scope:"Completed academic group application, not a commissioned production service. AI Copilot, RAG and production AI features are not part of the completed application."
 },
 "startek-print-hub-pos":{
  category:"business",status:"Released maintenance version · v1.0.1",revision:"5e573a91d9cf3c6307067fd99bfe872adc8cf802",
  role:"Business operations project for Startek Print Hub, presented with actual administrator interface evidence.",
  features:["Free-text invoices and quotations","Quotation conversion and print-job tracking","Cash register and expense management","Staff administration and session revocation","Operational reporting and archive cutoff","80 mm receipt printing and portable backup"],
  decisions:[
   {challenge:"Preserve financial consistency across orders and invoices",approach:"Reuse the invoice transaction helper and authoritative payment records; use server-side calculations and transactional writes.",tradeoff:"Avoid duplicate financial ledgers; free-text transaction snapshots intentionally replace a product catalog."},
   {challenge:"Start a fresh operating period without losing history",approach:"Use an administrator-only archive cutoff, retain audit and financial records, and block the action while the register is open.",tradeoff:"Historical data is retained and remains available to authorized audit views."},
   {challenge:"Print correctly from a touch POS workstation",approach:"Render persisted 80 mm receipt documents and use the browser and Windows driver for printer selection and output.",tradeoff:"Physical feed, cutter and queue behavior belong to the workstation and driver."}],
  evidence:[{label:"Maintenance release record",detail:"README documents owner-confirmed touchscreen and physical printer acceptance in September 2026 and v1.0.1 release verification. These are historical owner-reported results.",path:"README.md"},{label:"Business rules",detail:"Documented money and operational invariants.",path:"docs/BUSINESS_RULES.md"},{label:"Technical architecture",detail:"Server-side transactions, authentication and authorization boundaries.",path:"docs/ARCHITECTURE.md"},{label:"Workstation acceptance",detail:"Published Windows POS setup and hardware acceptance documentation.",path:"docs/WINDOWS_POS_SETUP.md"}],
  scope:"Historical release and owner-reported acceptance do not establish current uptime, financial outcomes or a new independent production audit. Screenshot financial values are redacted."
 },
 "nwsdb-smart-water-billing-system":{
  category:"academic",status:"Completed academic coursework",revision:"9ed297324bc570cf9b5329616da68062687c9850",
  role:"Individual Service Oriented Computing coursework, fourth semester of the Higher Diploma.",
  features:["Customer and connection management","Meter readings and tariff calculations","Bill generation and partial payments","Role-based API access","Partner simulation","Administrative analytics and audit history"],
  decisions:[
   {challenge:"Separate billing logic from presentation",approach:"Use an MVC client, Web API, application services, domain entities and infrastructure layer.",tradeoff:"Well-defined service boundaries require integration contracts and runtime configuration."},
   {challenge:"Make tariff and payment rules testable",approach:"Place domain operations in application services; cover consumption boundaries, duplicate references and partial payments with xUnit.",tradeoff:"Academic tariff fixtures are not certified utility billing rules."},
   {challenge:"Publish coursework safely",approach:"Exclude embedded local database and configured signing secret, use a private JWT secret at runtime.",tradeoff:"Development seed identities must never be treated as production credentials."}],
  evidence:[{label:"36 passed · 0 failed · 0 skipped",detail:"Published case study records the curated local xUnit run and initial successful GitHub build/test workflow.",path:"docs/CASE_STUDY.md"},{label:"Test source",detail:"Billing, authentication, payment, tariff and meter-reading tests.",path:"NWSDB.UnitTests"},{label:"Architecture",detail:"MVC/API/application/domain/infrastructure separation.",path:"docs/ARCHITECTURE.md"},{label:"Screenshot provenance",detail:"Historical report images with sample identifiers blurred.",path:"docs/SCREENSHOT_EVIDENCE.md"}],
  scope:"Educational simulation only; no official NWSDB affiliation, certified tariff engine, bank settlement or production deployment is claimed."
 },
 "printxpress":{
  category:"academic",status:"Completed Android coursework",revision:"069dc7946913f1391bf16435dc67dac4ed353a91",
  role:"Mobile Application Development coursework, third semester of the Higher Diploma.",
  features:["Local registration and sign-in","Product catalogue and search","Custom print-order workflow","Artwork selection and design library","Order status and history","Room/SQLite local persistence"],
  decisions:[
   {challenge:"Support a self-contained mobile demonstration",approach:"Use native Java and XML interfaces with Room and SQLite on-device persistence.",tradeoff:"Local storage supports the coursework scenario but is not a multi-user cloud service."},
   {challenge:"Maintain stored data across schema changes",approach:"Define Room entities, DAOs and documented database migration code from versions 1 to 3.",tradeoff:"Migration code still requires fresh device and upgrade testing."},
   {challenge:"Represent order validation without processing payments",approach:"Use local order form validation and academic card-style input simulation.",tradeoff:"No payment gateway is implemented; real payment-card details must not be entered."}],
  evidence:[{label:"20 historical test scenarios",detail:"The report evidence lists recorded registration, browsing, validation, ordering and storage outcomes. No fresh execution is claimed.",path:"docs/evidence/REPORT_TEST_EVIDENCE.md"},{label:"Implementation and stack",detail:"Java 17, XML, Room, Android SDK configuration and local model.",path:"README.md"},{label:"Unit-test source",detail:"JUnit validation utility tests.",path:"app/src/test/java/com/printxpress/app/utils/ValidationUtilsTest.java"},{label:"Screenshot evidence",detail:"Original coursework application screens.",path:"docs/screenshots/README.md"}],
  scope:"On-device academic demo. No live print store, gateway settlement or fresh emulator/device acceptance is established."
 },
 "swiftdrive-rentals":{
  category:"portfolio",status:"Portfolio demonstration",revision:"d8024606c0ef6969996e12166547a76cfcb4c3dc",
  role:"Portfolio application demonstrating rental-business workflows and server-rendered full-stack development.",
  features:["Vehicle catalog and availability","Reservation pricing and requests","Customer accounts and booking history","Pickup and return inspections","Fleet administration","Role-aware operations and inquiry handling"],
  decisions:[
   {challenge:"Avoid duplicating booking calculations",approach:"Centralize pricing and overlap functions in a shared PHP helper.",tradeoff:"Concurrent booking integrity still needs transactional locking and concurrency testing."},
   {challenge:"Keep access control and data access maintainable",approach:"Use role-aware PHP sessions, CSRF helpers and PDO prepared statements.",tradeoff:"A full security audit and commercial authorization review remain necessary."},
   {challenge:"Demonstrate the system without exposing customer data",approach:"Publish synthetic users, vehicles and pricing in the MySQL schema; exclude original transaction and identity records.",tradeoff:"Demo fixtures and payment-oriented screens do not establish live rental or payment operation."}],
  evidence:[{label:"PHP syntax validation",detail:"Published case study records syntax checks across 29 PHP files; no full acceptance claimed.",path:"docs/CASE_STUDY.md"},{label:"Pricing implementation",detail:"Shared reservation pricing and overlap functions.",path:"includes/pricing.php"},{label:"Architecture",detail:"PHP application structure, database and booking flow.",path:"docs/ARCHITECTURE.md"},{label:"Demo scope",detail:"Synthetic fixtures and local setup instructions.",path:"README.md"}],
  scope:"Local portfolio demo; homepage captured from isolated synthetic MySQL data. No complete booking acceptance, concurrent fleet integrity or live settlement is established."
 }
};

export function sourceUrl(slug:string,revision:string,path:string){
 return "https://github.com/kevin-menuja/"+slug+"/"+(path==="NWSDB.UnitTests"?"tree/":"blob/")+revision+"/"+path;
}
