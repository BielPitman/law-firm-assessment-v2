#!/usr/bin/env node
/**
 * Creates the "V2 Assessments" table in Airtable with all required columns.
 * Usage: AIRTABLE_API_KEY=pat... node scripts/create-airtable-table.js
 */

const BASE_ID = "apph2tKtp5MCF8cGT";
const TABLE_NAME = "V2 Assessments";

const API_KEY = process.env.AIRTABLE_API_KEY;
if (!API_KEY) {
  console.error("Set AIRTABLE_API_KEY env var first:\n  AIRTABLE_API_KEY=pat... node scripts/create-airtable-table.js");
  process.exit(1);
}

// All fields that the worker will write
const textFields = [
  // Core
  "firm_name", "contact_name", "contact_email", "firm_size",
  "practice_area", "module_key",

  // Module A (PI)
  "case_mix_pi", "medical_records_pi", "case_timeline_pi", "case_status_pi",
  "client_source_pi", "demand_letters_pi", "digital_presence_pi", "bottleneck_pi",

  // Module B (Criminal)
  "case_mix_crim", "intake_speed_crim", "discovery_crim", "sentencing_research_crim",
  "client_comm_crim", "client_source_crim", "digital_presence_crim", "bottleneck_crim",

  // Module C (Business)
  "case_mix_comm", "discovery_comm", "research_comm", "client_comm_comm",
  "drafting_comm", "client_source_comm", "budget_tracking_comm", "bottleneck_comm",

  // Module D (IP)
  "case_mix_ip", "research_ip", "portfolio_ip", "contracts_ip",
  "regulatory_ip", "ogc_delivery_ip", "digital_presence_ip", "bottleneck_ip",

  // Module E (Employment)
  "practice_model_emp", "case_mix_emp", "doc_review_emp", "drafting_emp",
  "regulatory_emp", "client_comm_emp", "preventive_emp", "bottleneck_emp",

  // Module F (Estate)
  "case_mix_estate", "intake_estate", "doc_drafting_estate", "plan_review_estate",
  "advisor_coord_estate", "client_source_estate", "client_education_estate", "bottleneck_estate",

  // Module G (Real Estate)
  "case_mix_re", "title_review_re", "contract_drafting_re", "concurrent_mgmt_re",
  "party_coord_re", "client_source_re", "regulatory_re", "bottleneck_re",

  // Module H (Family)
  "case_mix_family", "financial_gathering_family", "doc_drafting_family", "client_comm_family",
  "mediation_family", "client_source_family", "digital_presence_family", "bottleneck_family",

  // Module I (Multi-Practice)
  "case_mix_multi", "matter_mgmt_multi", "cross_practice_multi", "client_comm_multi",
  "billing_multi", "client_source_multi", "knowledge_mgmt_multi", "bottleneck_multi",

  // Module I special
  "module_i_primary", "module_i_secondary",

  // Closing
  "after_hours", "intake_speed", "investment",
  "success_vision", "anything_else",

  // Score insights (strings)
  "insight_operational", "insight_acquisition", "insight_digital",
  "insight_practice_readiness", "recommended_first_step", "overall_summary",
];

const numberFields = [
  "urgency",
  "score_operational", "score_acquisition", "score_digital",
  "score_practice_readiness", "score_overall",
];

async function createTable() {
  const fields = [
    ...textFields.map(name => ({
      name,
      type: "singleLineText",
    })),
    ...numberFields.map(name => ({
      name,
      type: "number",
      options: { precision: 0 },
    })),
  ];

  // Replace long text fields
  const longTextIds = ["success_vision", "anything_else", "insight_operational",
    "insight_acquisition", "insight_digital", "insight_practice_readiness",
    "recommended_first_step", "overall_summary"];

  for (const f of fields) {
    if (longTextIds.includes(f.name)) {
      f.type = "multilineText";
    }
  }

  console.log(`Creating table "${TABLE_NAME}" with ${fields.length} fields...`);

  const res = await fetch(`https://api.airtable.com/v0/meta/bases/${BASE_ID}/tables`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: TABLE_NAME,
      fields,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Failed:", res.status, JSON.stringify(data, null, 2));
    process.exit(1);
  }

  console.log(`Table created: ${data.id}`);
  console.log(`Fields: ${data.fields?.length || 0}`);
}

createTable().catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
