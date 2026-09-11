# Behind the Veil — Functional Specification

Version 0.1 · September 11, 2026

## Purpose

Behind the Veil is a two-hour, teacher-facilitated healthcare-equity simulation for 20–25 students ages 14–18. It uses John Rawls's original position and veil of ignorance as a starting point for examining how policy, geography, economic conditions, institutional treatment, and intersecting circumstances shape health.

This is an educational abstraction, not a clinical model or a prediction of any person's health. Identity never creates a biological penalty in the rules. Documented structural and institutional barriers are attached to events, conditions, and systems.

## Learning objectives

Students will be able to:

1. Explain how protecting the least advantaged can improve the justice of a system.
2. Analyze how identities and circumstances intersect rather than operate as isolated modifiers.
3. Trace how policies distribute benefits, burdens, risks, and opportunities.
4. Distinguish equality, equity, need, and justice.
5. Connect clinical healthcare careers to structural conditions affecting patients.

## Session flow

| Phase | Target time | System behavior |
|---|---:|---|
| Join and introduction | 8 min | Teacher creates room; students receive anonymous labels. |
| Original position | 7 min | Students receive Rawls briefing and content note. |
| Policy design | 12 min | Groups allocate 30 setup points across tiered policies. |
| Veil lifted | 5 min | Twenty resident profiles appear; advocates are assigned. |
| Six trials | 30 min | Routine advocate decisions and major group votes produce cumulative outcomes. |
| Reform | 8 min | Groups revise a limited set of investments. |
| Results | 10 min | Groups defend systems before identical conditions are revealed. |
| Debrief | 40 min | Teacher uses critical moments, comparisons, and reports. |
| Buffer | 10 min | Transition and technical margin. |

## Roles

- **Teacher/host:** creates, pauses, advances, extends votes, closes votes, moves students before launch, locks late entry, exports, and erases the room. The host cannot select a group's answer.
- **Student:** joins with a room code, receives a fixed anonymous label, participates in policy decisions, advocates for assigned residents, and votes on consequential choices.
- **Group:** 4–6 students sharing one world. All groups begin with identical residents, events, chance results, and resources.

## Outcome model

Five internal 0–100 values are shown to students only as descriptive bands:

- Thriving: 80–100
- Stable: 60–79
- At Risk: 40–59
- Critical: 0–39

The measures are physical health, health stability, access to care, financial security, and trust and dignity in healthcare. Interfaces combine text, shape/border, and color. They do not rely on red/green signaling.

The comparison includes population averages, the four least advantaged residents, and the outcome gap. It intentionally omits a single winning score. Recognitions may include strongest safety net, smallest gap, greatest population stability, and strongest access.

## Determinism and causality

The teacher session generates a seed. Each round derives its chance result from that seed and round identifier. Identical decisions therefore produce identical outcomes in every group. Result explanations separate initial circumstances, policies, institutional barriers, student decisions, and chance.

## Budget rules

- Initial setup budget: 30 points; no debt.
- Each policy offers no, limited, or strong investment.
- Setup benefits, setup costs, maintenance costs, and complements are visible.
- Exact effect weights remain hidden during play.
- Operating costs are deducted automatically.
- If costs exceed available funds, the group uses a timed vote to select service reductions.
- Some benefits are delayed; some harms compound across rounds.
- Reform resources include a modest benefit for unused setup points plus fixed reform capacity.

## Voting

Major decisions receive a 60-second anonymous group vote. Totals appear after all connected students vote or time expires. A tie triggers a 30-second runoff. A second tie selects the option offering greater protection to the least advantaged resident and explains the rule. The teacher may extend or close a vote but never choose its outcome. Disconnected students are removed from the active threshold.

## Content boundaries

The experience includes non-graphic hospitalization, chronic illness, medical debt, job loss, housing and food insecurity, medication unaffordability, delayed diagnosis, inaccessible care, language barriers, and pregnancy complications followed by recovery. It excludes death, graphic detail, mental-health scenarios, substance-use scenarios, deportation/enforcement, and student enactment of discriminatory conduct.

## Privacy and retention

- No login, real name, email, analytics identifier, or permanent student record.
- Maximum 25 participants in a room.
- Labels are system generated and cannot be edited.
- Reconnect tokens are stored locally and temporarily in room memory.
- Exports contain group-level data only and omit participant labels.
- Room storage expires after one hour; host may export and erase immediately.
- Host authorization uses a one-time recovery key, not a permanent password.

## Technical architecture

- React/Vite client deployed as Cloudflare Worker static assets.
- Cloudflare Worker routes `/api/rooms/*` to one Durable Object per room code.
- A WebSocket distributes room state; local storage preserves interrupted work.
- CSV-driven content is validated before use.
- Offline fallback runs group simulations locally and produces importable exports.
- XLSX, PDF, and ZIP generation occurs in the browser.

## Accessibility

Target WCAG 2.2 AA: semantic headings and landmarks, complete keyboard operation, visible focus, labeled controls, 200% zoom support, reduced motion, enhanced contrast, descriptive status text, accessible error summaries, and no color-only meaning.

## Reports

The teacher workbook contains Overview, Policies, Trial Results, Equity Measures, Critical Moments, and Sources. Group and class PDFs support printing. A ZIP packages all group PDFs. Every export contains the reproducibility seed and educational-model disclaimer.

## Acceptance criteria

1. Twenty-five students can join one room without identifiers.
2. A disconnected participant can rejoin using the local token.
3. Late entry locks when the veil is lifted.
4. Same seed plus same choices yields identical results.
5. No metric can leave the 0–100 internal range.
6. No export contains participant labels or tokens.
7. Room data is deleted by alarm or host action.
8. All critical flows are keyboard operable.
9. The simulation remains usable after a brief network interruption.
10. Solo and clearly marked practice modes work without a server.
