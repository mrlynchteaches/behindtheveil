import test from 'node:test';
import assert from 'node:assert/strict';
import {applyTrial,createPopulation,equitySummary,levelFor,operatingCost} from '../src/lib/engine.js';
import {policies,residents,trials} from '../src/data/content.js';

test('same seed and choices produce identical outcomes',()=>{
 const pop=createPopulation(residents), choices=Object.fromEntries(residents.map(r=>[r.id,trials[0].defaultChoice])), selections={environment:2,housing:1,food:1};
 assert.deepEqual(applyTrial(pop,trials[0],choices,selections,'ABC123'),applyTrial(pop,trials[0],choices,selections,'ABC123'));
});
test('metrics remain in the supported range',()=>{let pop=createPopulation(residents);const selections=Object.fromEntries(policies.map(p=>[p.id,2]));for(const trial of trials)pop=applyTrial(pop,trial,{},selections,'TEST01');for(const resident of pop)for(const value of Object.values(resident.metrics))assert.ok(value>=0&&value<=100)});
test('equity summary highlights four least advantaged residents',()=>{const result=equitySummary(createPopulation(residents));assert.equal(result.leastAdvantaged.length,4);assert.equal(result.gap,0)});
test('labels have accessible descriptive bands',()=>{assert.equal(levelFor(85),'Thriving');assert.equal(levelFor(65),'Stable');assert.equal(levelFor(45),'At Risk');assert.equal(levelFor(20),'Critical')});
test('operating cost follows selected tier',()=>{assert.equal(operatingCost(policies,{coverage:2}),3)});
