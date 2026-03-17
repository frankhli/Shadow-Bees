#!/usr/bin/env node
/**
 * Translation Completeness Checker
 * 
 * 检查所有翻译文件的完整度
 * 使用方法: node check-translations.js
 */

const fs = require('fs');
const path = require('path');

const messagesDir = '/home/node/workspace-host/tiaohai-global/apps/web/src/i18n/messages';
const files = ['en.json', 'es.json', 'fr.json', 'de.json', 'ja.json'];

// 递归flatten对象
function flatten(obj, prefix = '') {
  const keys = [];
  for (const [k, v] of Object.entries(obj)) {
    const newKey = prefix ? prefix + '.' + k : k;
    if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
      keys.push(...flatten(v, newKey));
    } else {
      keys.push(newKey);
    }
  }
  return keys;
}

// 加载所有翻译文件
const translations = {};
files.forEach(f => {
  const filePath = path.join(messagesDir, f);
  if (fs.existsSync(filePath)) {
    translations[f] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } else {
    console.error(`❌ File not found: ${f}`);
  }
});

// 获取所有键
const allKeys = {};
files.forEach(f => {
  allKeys[f] = new Set(flatten(translations[f]));
});

const enKeys = allKeys['en.json'];
const totalKeys = enKeys.size;

console.log('\n📊 Translation Completeness Report\n');
console.log('=' .repeat(50));

// 生成报告
files.forEach(f => {
  const present = [...enKeys].filter(k => allKeys[f].has(k)).length;
  const missing = [...enKeys].filter(k => !allKeys[f].has(k));
  const extra = [...allKeys[f]].filter(k => !enKeys.has(k));
  const pct = ((present / totalKeys) * 100).toFixed(1);
  
  const flag = f === 'en.json' ? '🇺🇸' :
               f === 'es.json' ? '🇪🇸' :
               f === 'fr.json' ? '🇫🇷' :
               f === 'de.json' ? '🇩🇪' :
               f === 'ja.json' ? '🇯🇵' : '🏳️';
  
  console.log(`\n${flag} ${f}:`);
  console.log(`  Complete: ${present}/${totalKeys} (${pct}%)`);
  
  // 进度条
  const filled = Math.round((present / totalKeys) * 20);
  const bar = '█'.repeat(filled) + '░'.repeat(20 - filled);
  console.log(`  [${bar}]`);
  
  if (missing.length > 0) {
    console.log(`  ⚠️  Missing: ${missing.length} keys`);
    missing.slice(0, 5).forEach(k => console.log(`     - ${k}`));
    if (missing.length > 5) {
      console.log(`     ... and ${missing.length - 5} more`);
    }
  }
  
  if (extra.length > 0) {
    console.log(`  ℹ️  Extra: ${extra.length} keys (not in en.json)`);
  }
});

console.log('\n' + '='.repeat(50));

// 汇总
console.log('\n📈 Summary:');
const completeness = files.map(f => {
  const present = [...enKeys].filter(k => allKeys[f].has(k)).length;
  return { file: f, pct: (present / totalKeys) * 100 };
}).sort((a, b) => b.pct - a.pct);

completeness.forEach(({ file, pct }) => {
  const status = pct === 100 ? '✅' : pct >= 95 ? '⚠️ ' : pct >= 90 ? '🔶' : '🔴';
  console.log(`  ${status} ${file}: ${pct.toFixed(1)}%`);
});

// 最低完整度检查
const minCompleteness = Math.min(...completeness.map(c => c.pct));
if (minCompleteness < 95) {
  console.log('\n⚠️  Warning: Some translations are below 95% completeness');
  process.exit(1);
} else {
  console.log('\n✅ All translations are above 95% completeness');
  process.exit(0);
}
