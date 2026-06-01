# CP Submission-3 Requirements Audit

Project title: A Bilingual Voice-Driven Conversational Assistant in E-Commerce Interfaces

Group members:
- Muhammad Mateen Amjad, BSCE22005
- Abdullah Zahid, BSCE22040
- Hoor ul Ain Amir, BSCE22037

Source requirement file:
`C:\Users\crick\Downloads\Code Project Sub_3_Multimodal HCI System Design and Evaluation (1).pdf`

## What Is Done

| PDF requirement | Current status | Evidence |
|---|---|---|
| IEEE conference paper in LaTeX | Done | `paper/main.tex` uses `IEEEtran` conference format |
| Title and author section with names/IDs | Done | `paper/main.tex` title and author block |
| Abstract, keywords, introduction, related work, methodology, results, usability, conclusion, references | Mostly done | All required sections exist in `paper/main.tex` |
| Figures at least 3 | Done | 3 figure environments: architecture, accuracy chart, prototype output |
| Tables at least 2 | Done | 3 table environments: related work, metrics, usability |
| References minimum 25 papers | Done | `paper/references.bib` contains 26 BibTeX entries |
| Working prototype | Done | `prototype/` static prototype and `client/` React app |
| Multimodal input | Done | Voice via Web Speech API plus typed fallback |
| Bilingual / code-switched command handling | Done for scripted vocabulary | English, Roman Urdu, Urdu-script-like entries, and code-switched commands in `src/assistant-core.js` |
| Product search workflow | Done | Search by product category, color, and price |
| Cart workflow | Done | Add, remove, view cart, confirm/cancel order |
| Evaluation script | Done | `eval/evaluate.js` tests 25 commands |
| Verified NLU results | Done | `npm run evaluate` returns 100% intent, category, color, and exact match on scripted cases |
| Production build | Done | `npm run build` completes successfully after Vite config fix |
| Usability protocol | Done | `usability/user_test_protocol.md` contains 3-5 user test plan |

## What Is Still Missing Before Final PDF Submission

| Missing item | Why it matters | What to do |
|---|---|---|
| Actual 3-5 user usability ratings | The PDF explicitly asks for user testing, observation, feedback, ease of use, accuracy perception, and response time | Run the protocol in `usability/user_test_protocol.md`, fill ratings for P1-P5, calculate averages, and replace the `To fill` values in `paper/main.tex` |
| Final compiled PDF | The submission must be a PDF | Compile `paper/main.tex` using Overleaf or a local LaTeX installation because `pdflatex` is not installed on this machine |
| Final page count check | Requirement is strict 5-8 pages | Check after compilation; add screenshots/detail if under 5 pages or trim if over 8 |
| Real UI screenshots if instructor expects bitmap images | Current prototype output is represented as a LaTeX/TikZ-style figure, not a captured screenshot | Add browser screenshots of the running React/static prototype if required |
| Response-time measurement | PDF mentions response time under usability evaluation | During user testing, record approximate time from command submission to assistant response |
| True Urdu-script encoding verification | Some source strings appear mojibaked in files, even though scripted tests pass | Test with actual Urdu text in the browser and fix source file encoding if Urdu-script commands fail |

## Required Final Steps

1. Run `npm run dev`.
2. Open the React app at `http://127.0.0.1:5173`.
3. Test these flows: search, add to cart, view cart, remove item, confirm order, cancel order.
4. Recruit 3-5 users and use `usability/user_test_protocol.md`.
5. Replace the usability table placeholders in `paper/main.tex`.
6. Compile the LaTeX paper to PDF.
7. Confirm the compiled paper is 5-8 pages.
8. Submit the final PDF before the deadline: Sunday, May 17, 2026, 11:59 PM.

## Verification Already Completed

```text
npm run evaluate
Result: 25 cases, 100% intent accuracy, 100% category-slot accuracy,
100% color-slot accuracy, 100% exact command match.

npm run build
Result: React production build completed successfully.
```

