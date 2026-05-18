#!/usr/bin/env node
// ══════════════════════════════════════════════════
// dist/build.js — Concatena CSS e JS em public/dist/
// Uso: node dist/build.js   ou   npm run build:assets
// ══════════════════════════════════════════════════

const fs   = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PUBLIC_ROOT = path.join(ROOT, 'public');

const CSS_FILES = [
  'public/css/variables.css',
  'public/css/base.css',
  'public/css/auth.css',
  'public/css/layout.css',
  'public/css/components.css',
  'public/css/tables.css',
  'public/css/modals.css',
  'public/css/reports.css',
  'public/css/ai.css',
  'public/css/responsive.css',
];

// Ordem crítica — cada arquivo pode chamar funções dos anteriores
const JS_FILES = [
  'public/js/supabase-config.js',
  'public/js/utils.js',
  'public/js/state.js',
  'public/js/filter.js',
  'public/js/theme.js',
  'public/js/dbs/db-months.js',
  'public/js/dbs/db-banks.js',
  'public/js/dbs/db-entries.js',
  'public/js/dbs/db-pix.js',
  'public/js/dbs/db-recurrents.js',
  'public/js/dbs/db-incomes.js',
  'public/js/dbs/db-subscriptions.js',
  'public/js/dbs/db-installments.js',
  'public/js/dbs/db-receivables.js',
  'public/js/dbs/db-dev.js',
  'public/js/dbs/db-profile.js',
  'public/js/dbs/db-contexts.js',
  'public/js/dbs/db.js',
  'public/js/auth.js',
  'public/js/months.js',
  'public/js/banks.js',
  'public/js/entries.js',
  'public/js/installments.js',
  'public/js/pix.js',
  'public/js/recurrents.js',
  'public/js/income.js',
  'public/js/subscriptions.js',
  'public/js/dashboard.js',
  'public/js/cobranca.js',
  'public/js/reports.js',
  'public/js/history.js',
  'public/js/backup.js',
  'public/js/ai-engine.js',
  'public/js/changelog.js',
  'public/js/dev.js',
  'public/js/profile.js',
  'public/js/modals.js',
  'public/js/main.js',
];

function bundle(files, outName) {
  const missing = files.filter(f => !fs.existsSync(path.join(ROOT, f)));
  if (missing.length) {
    console.error('Arquivos não encontrados:\n  ' + missing.join('\n  '));
    process.exit(1);
  }

  const parts = files.map(f => {
    const src = fs.readFileSync(path.join(ROOT, f), 'utf8');
    return `/* ── ${f} ── */\n${src.trimEnd()}`;
  });

  const outDir = path.join(PUBLIC_ROOT, 'dist');
  fs.mkdirSync(outDir, { recursive: true });
  const out = path.join(outDir, outName);
  fs.writeFileSync(out, parts.join('\n\n') + '\n', 'utf8');

  const kb = (fs.statSync(out).size / 1024).toFixed(1);
  console.log(`  ✓  public/dist/${outName}  (${kb} KB, ${files.length} arquivos)`);
}

console.log('\nBuild iniciado...');
bundle(CSS_FILES, 'all.min.css');
bundle(JS_FILES,  'app.min.js');
console.log('Build concluído.\n');
