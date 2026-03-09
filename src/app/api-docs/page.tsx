import { generateMeta } from "@/lib/seo";

export const metadata = generateMeta({
  title: "GenericSwap API Documentation — Free Drug Data API",
  description:
    "Access FDA Orange Book data programmatically. Free API for drug information, generic alternatives, patent data, and switch scores.",
  url: "/api-docs",
});

export default function ApiDocsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">API Documentation</h1>
          <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-semibold">
            v1
          </span>
        </div>
        <p className="text-gray-600">
          Access FDA Orange Book data programmatically. Build tools, apps, and integrations
          on top of GenericSwap&apos;s drug database.
        </p>
      </div>

      {/* Getting Started */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Getting Started</h2>
        <div className="bg-gray-900 rounded-xl p-6 text-sm font-mono text-gray-100">
          <p className="text-gray-400"># Request an API key (free)</p>
          <p className="text-gray-400"># Email: api@genericswap.com</p>
          <p className="mt-3 text-gray-400"># Include your API key in requests:</p>
          <p className="text-green-400">curl -H &quot;Authorization: Bearer gs_your_api_key&quot; \</p>
          <p className="text-green-400 pl-4">https://genericswap.com/api/v1/drugs?limit=10</p>
        </div>
        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800">
          <strong>Rate Limits:</strong> 100 requests/hour (free tier). Contact us for higher limits.
        </div>
      </section>

      {/* Base URL */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Base URL</h2>
        <code className="text-sm bg-gray-100 px-4 py-2 rounded-lg text-brand-700 font-mono block">
          https://genericswap.com/api/v1
        </code>
      </section>

      {/* Authentication */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Authentication</h2>
        <p className="text-sm text-gray-600 mb-3">
          Include your API key via the <code className="text-brand-600 bg-gray-100 px-1.5 py-0.5 rounded">Authorization</code> header
          or <code className="text-brand-600 bg-gray-100 px-1.5 py-0.5 rounded">api_key</code> query parameter.
        </p>
        <div className="bg-gray-900 rounded-xl p-5 text-sm font-mono text-gray-100 space-y-2">
          <p className="text-gray-400"># Header (recommended)</p>
          <p>Authorization: Bearer gs_your_api_key</p>
          <p className="text-gray-400 mt-3"># Query parameter</p>
          <p>?api_key=gs_your_api_key</p>
        </div>
      </section>

      {/* Endpoints */}
      <section className="space-y-8">
        <h2 className="text-xl font-bold text-gray-900">Endpoints</h2>

        {/* List Drugs */}
        <EndpointDoc
          method="GET"
          path="/drugs"
          description="List all drugs with pagination."
          params={[
            { name: "page", type: "integer", default: "1", desc: "Page number" },
            { name: "limit", type: "integer", default: "20", desc: "Results per page (max 100)" },
            { name: "type", type: "string", default: "all", desc: "'brand' or 'generic'" },
          ]}
          example={`{
  "data": [
    {
      "slug": "lipitor",
      "tradeName": "LIPITOR",
      "activeIngredient": "ATORVASTATIN CALCIUM",
      "dosageForm": "TABLET",
      "teCode": "AB",
      "approvalDate": "1996-12-17T00:00:00.000Z"
    }
  ],
  "meta": { "page": 1, "limit": 20, "total": 35000, "totalPages": 1750 }
}`}
        />

        {/* Get Drug */}
        <EndpointDoc
          method="GET"
          path="/drugs/:slug"
          description="Get full details for a specific drug including GenericSwap Score, savings estimates, generics, and patents."
          params={[{ name: "slug", type: "string", default: "—", desc: "Drug slug (e.g., 'lipitor')" }]}
          example={`{
  "data": {
    "drug": { "tradeName": "LIPITOR", "activeIngredient": "ATORVASTATIN CALCIUM" },
    "switchScore": { "score": 95, "grade": "A+", "verdict": "..." },
    "savings": { "estimatedAnnualSavings": 3840, "percentSaved": 91 },
    "generics": [...],
    "patents": [...],
    "genericCount": 15
  }
}`}
        />

        {/* Search */}
        <EndpointDoc
          method="GET"
          path="/search"
          description="Search drugs by name or active ingredient with optional filters."
          params={[
            { name: "q", type: "string", default: "—", desc: "Search query (required)" },
            { name: "dosage_form", type: "string", default: "all", desc: "Filter by dosage form" },
            { name: "route", type: "string", default: "all", desc: "Filter by route" },
            { name: "te_code", type: "string", default: "all", desc: "Filter by TE code prefix (e.g., 'AB')" },
            { name: "type", type: "string", default: "all", desc: "'N' (brand) or 'A' (generic)" },
            { name: "limit", type: "integer", default: "20", desc: "Max results (max 100)" },
          ]}
          example={`{
  "data": [
    { "slug": "lipitor", "tradeName": "LIPITOR", "activeIngredient": "ATORVASTATIN CALCIUM", "teCode": "AB" }
  ],
  "meta": { "query": "lipitor", "count": 1, "limit": 20 }
}`}
        />
      </section>

      {/* Embed Widget */}
      <section className="mt-10 mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Embed Widget</h2>
        <p className="text-sm text-gray-600 mb-4">
          Embed a GenericSwap drug info card on your website. No API key required.
        </p>
        <div className="bg-gray-900 rounded-xl p-5 text-sm font-mono text-gray-100">
          <p className="text-gray-400">&lt;!-- Add to your HTML --&gt;</p>
          <p>&lt;iframe</p>
          <p className="pl-4">src=&quot;https://genericswap.com/api/widget/lipitor&quot;</p>
          <p className="pl-4">width=&quot;400&quot; height=&quot;300&quot;</p>
          <p className="pl-4">frameborder=&quot;0&quot;</p>
          <p className="pl-4">title=&quot;GenericSwap Drug Info&quot;</p>
          <p>&gt;&lt;/iframe&gt;</p>
        </div>
      </section>

      {/* Error Codes */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Error Codes</h2>
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Code</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr><td className="px-6 py-3 font-mono text-red-600">400</td><td className="px-6 py-3 text-gray-600">Bad request (missing parameters)</td></tr>
              <tr><td className="px-6 py-3 font-mono text-red-600">401</td><td className="px-6 py-3 text-gray-600">Missing API key</td></tr>
              <tr><td className="px-6 py-3 font-mono text-red-600">403</td><td className="px-6 py-3 text-gray-600">Invalid or deactivated API key</td></tr>
              <tr><td className="px-6 py-3 font-mono text-red-600">404</td><td className="px-6 py-3 text-gray-600">Drug not found</td></tr>
              <tr><td className="px-6 py-3 font-mono text-red-600">429</td><td className="px-6 py-3 text-gray-600">Rate limit exceeded</td></tr>
              <tr><td className="px-6 py-3 font-mono text-red-600">500</td><td className="px-6 py-3 text-gray-600">Internal server error</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function EndpointDoc({
  method,
  path,
  description,
  params,
  example,
}: {
  method: string;
  path: string;
  description: string;
  params: { name: string; type: string; default: string; desc: string }[];
  example: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full">
            {method}
          </span>
          <code className="text-sm font-mono text-gray-900">/api/v1{path}</code>
        </div>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>

      {/* Parameters */}
      <div className="px-6 py-4 border-b border-gray-100">
        <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Parameters</p>
        <div className="space-y-2">
          {params.map((p) => (
            <div key={p.name} className="flex items-start gap-3 text-sm">
              <code className="text-brand-600 font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded min-w-[100px]">
                {p.name}
              </code>
              <span className="text-gray-400 text-xs">{p.type}</span>
              <span className="text-gray-600 flex-1">{p.desc}</span>
              <span className="text-gray-400 text-xs">Default: {p.default}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Example Response */}
      <div className="px-6 py-4">
        <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Example Response</p>
        <pre className="bg-gray-900 rounded-lg p-4 text-xs text-gray-100 overflow-x-auto">
          {example}
        </pre>
      </div>
    </div>
  );
}
