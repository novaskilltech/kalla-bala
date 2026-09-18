import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const dataFile = path.join(projectRoot, 'kalla-bala.data.json');

if (!fs.existsSync(dataFile)) {
  console.error(`❌ Data file not found: ${dataFile}`);
  process.exit(1);
}

const raw = fs.readFileSync(dataFile, 'utf8');
let data;
try {
  data = JSON.parse(raw);
} catch (e) {
  console.error(`❌ Failed to parse JSON: ${e.message}`);
  process.exit(1);
}

const items = data.items;
const errors = [];

if (!Array.isArray(items)) {
  console.error('❌ "items" must be an array');
  process.exit(1);
}

// 1. Check total count
if (items.length !== 55) {
  errors.push(`Total items count must be 55, found: ${items.length}`);
}

// 2. Counts by word
let kallaCount = 0;
let balaCount = 0;
const validCategories = new Set(['stop', 'connect', 'prefer_connect']);
const ids = new Set();

items.forEach((item, index) => {
  const prefix = `Item [index: ${index}, id: ${item?.id || 'unknown'}]:`;

  if (!item.id || typeof item.id !== 'string') {
    errors.push(`${prefix} missing or invalid id`);
  } else {
    if (ids.has(item.id)) {
      errors.push(`${prefix} duplicate id detected: "${item.id}"`);
    }
    ids.add(item.id);
  }

  if (item.word === 'كَلَّا') {
    kallaCount++;
  } else if (item.word === 'بَلَى') {
    balaCount++;
  } else {
    errors.push(`${prefix} invalid word: "${item.word}". Must be "كَلَّا" or "بَلَى"`);
  }

  if (!item.sura || typeof item.sura !== 'string') {
    errors.push(`${prefix} missing or invalid sura name`);
  }

  if (!item.suraNumber || typeof item.suraNumber !== 'number') {
    errors.push(`${prefix} missing or invalid suraNumber`);
  }

  if (!item.ayah || typeof item.ayah !== 'number') {
    errors.push(`${prefix} missing or invalid ayah number`);
  }

  if (!item.category || typeof item.category !== 'string') {
    errors.push(`${prefix} missing category/status`);
  } else if (!validCategories.has(item.category)) {
    errors.push(`${prefix} unknown category: "${item.category}". Valid options: ${[...validCategories].join(', ')}`);
  }

  if (!item.excerpt || typeof item.excerpt !== 'string') {
    errors.push(`${prefix} missing excerpt`);
  }

  if (!item.scholarChoice || typeof item.scholarChoice !== 'string') {
    errors.push(`${prefix} missing scholarChoice`);
  }
});

if (kallaCount !== 33) {
  errors.push(`Expected 33 occurrences for "كَلَّا", found: ${kallaCount}`);
}

if (balaCount !== 22) {
  errors.push(`Expected 22 occurrences for "بَلَى", found: ${balaCount}`);
}

if (errors.length > 0) {
  console.error('\n❌ DATA VALIDATION FAILED WITH ERRORS:');
  errors.forEach(err => console.error(`  - ${err}`));
  process.exit(1);
}

console.log('✅ Data validation passed successfully:');
console.log(`   - Total items: ${items.length}`);
console.log(`   - كَلَّا: ${kallaCount}`);
console.log(`   - بَلَى: ${balaCount}`);
console.log(`   - Unique IDs: ${ids.size}`);
console.log('   - All mandatory fields present with valid categories.\n');
