export const METRICS = ['physical', 'stability', 'access', 'financial', 'dignity'];
export const LEVELS = [
  { min: 80, label: 'Thriving' }, { min: 60, label: 'Stable' },
  { min: 40, label: 'At Risk' }, { min: -Infinity, label: 'Critical' }
];

export function seededRandom(seed) {
  let x = 2166136261;
  for (const ch of String(seed)) x = Math.imul(x ^ ch.charCodeAt(0), 16777619);
  return () => ((x = Math.imul(x ^ (x >>> 15), 2246822507)) >>> 0) / 4294967296;
}

export const levelFor = value => LEVELS.find(level => value >= level.min).label;
export const clamp = value => Math.max(0, Math.min(100, Math.round(value)));

export function createPopulation(residents) {
  return residents.map(r => ({ ...r, metrics: { physical: 65, stability: 60, access: 50, financial: 55, dignity: 60 }, history: [] }));
}

export function policyStrength(selections, id) { return Number(selections[id] || 0); }

export function applyTrial(population, trial, choices, selections, seed) {
  const random = seededRandom(`${seed}:${trial.id}`);
  return population.map(resident => {
    const next = { ...resident, metrics: { ...resident.metrics }, history: [...resident.history] };
    const choice = choices[resident.id] || trial.defaultChoice;
    const option = trial.options.find(o => o.id === choice) || trial.options[0];
    const causes = [];
    for (const metric of METRICS) next.metrics[metric] += Number(option.effects?.[metric] || 0);
    for (const tag of resident.tags) {
      const effect = trial.tagEffects?.[tag];
      if (!effect) continue;
      for (const metric of METRICS) next.metrics[metric] += Number(effect[metric] || 0);
      if (effect.note) causes.push(effect.note);
    }
    for (const protection of trial.protections || []) {
      const level = policyStrength(selections, protection.policy);
      if (!level) continue;
      for (const metric of METRICS) next.metrics[metric] += Number(protection.effects?.[metric] || 0) * level;
      causes.push(`${protection.label} reduced the barrier.`);
    }
    const chance = random();
    if (chance < Number(trial.chanceRisk || 0)) {
      next.metrics.physical -= 4;
      next.metrics.stability -= 4;
      causes.push('A shared chance event added strain; every group receives the same result.');
    }
    for (const metric of METRICS) next.metrics[metric] = clamp(next.metrics[metric]);
    next.history.push({ trial: trial.id, choice, causes, metrics: { ...next.metrics } });
    return next;
  });
}

export function equitySummary(population) {
  const avg = metric => Math.round(population.reduce((n, r) => n + r.metrics[metric], 0) / population.length);
  const worst = [...population].sort((a,b) => {
    const am = Math.min(...METRICS.map(m => a.metrics[m]));
    const bm = Math.min(...METRICS.map(m => b.metrics[m]));
    return am - bm;
  }).slice(0, 4);
  const overall = population.map(r => Math.round(METRICS.reduce((n,m)=>n+r.metrics[m],0)/METRICS.length));
  return {
    averages: Object.fromEntries(METRICS.map(m => [m, avg(m)])),
    leastAdvantaged: worst,
    gap: Math.max(...overall) - Math.min(...overall)
  };
}

export function operatingCost(policies, selections) {
  return policies.reduce((sum,p) => sum + Number(p.levels[policyStrength(selections,p.id)]?.operating || 0), 0);
}
