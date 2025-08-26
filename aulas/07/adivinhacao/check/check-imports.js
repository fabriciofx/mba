import fs from 'node:fs';
import path from 'node:path';
import { init, parse } from 'es-module-lexer';

const projectRoot = path.resolve('./src'); // pasta do seu código

async function getAllJsFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map(entry => {
    const res = path.resolve(dir, entry.name);
    if (entry.isDirectory()) return getAllJsFiles(res);
    if (res.endsWith('.js')) return [res];
    return [];
  }));
  return Array.prototype.concat(...files);
}

async function main() {
  await init;
  const files = await getAllJsFiles(projectRoot);
  const moduleMap = new Map();
  const graph = new Map();

  // Construir mapa de imports e grafo de dependências
  for (const file of files) {
    const code = fs.readFileSync(file, 'utf-8');
    const [, imports] = parse(code);

    graph.set(file, []);
    imports.forEach(i => {
      const modPath = path.resolve(path.dirname(file), i.n);
      graph.get(file).push(modPath);

      if (!moduleMap.has(modPath)) moduleMap.set(modPath, []);
      moduleMap.get(modPath).push(file);
    });
  }

  // 1️⃣ Detectar módulos importados por múltiplos caminhos
  console.log('🔹 Verificando módulos importados por múltiplos caminhos...');
  for (const [mod, importers] of moduleMap) {
    if (importers.length > 1) {
      console.log(`⚠️  Módulo importado múltiplas vezes: ${mod}`);
      importers.forEach(imp => console.log(`  -> ${imp}`));
      console.log('');
    }
  }

  // 2️⃣ Detectar dependências circulares
  console.log('🔹 Verificando dependências circulares...');
  const visited = new Set();
  const stack = new Set();

  function dfs(file) {
    if (stack.has(file)) return [file]; // ciclo encontrado
    if (visited.has(file)) return null;

    visited.add(file);
    stack.add(file);

    for (const dep of graph.get(file) || []) {
      const cycle = dfs(dep);
      if (cycle) {
        cycle.push(file);
        return cycle;
      }
    }

    stack.delete(file);
    return null;
  }

  for (const file of files) {
    const cycle = dfs(file);
    if (cycle) {
      console.log('⚠️  Dependência circular detectada:');
      cycle.reverse().forEach(f => console.log(`  -> ${f}`));
      console.log('');
    }
  }
}

main().catch(console.error);
