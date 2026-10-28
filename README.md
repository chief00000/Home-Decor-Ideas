# Home Decor Ideas

A responsive static website built with HTML5, CSS3, and vanilla JavaScript.

## Run locally
1. Extract the ZIP file.
2. Open the `home-decor-ideas` folder in Visual Studio Code.
3. Open `index.html` in a browser, or use the VS Code **Live Server** extension.
4. Internet access is needed for the remote Unsplash preview images. The core prompt generator, calculators, filters, and local image comparison work without an AI API.

## Included
- Responsive homepage and navigation
- Template-based Home Decor AI Prompt Generator (no live AI model/API)
- 25 inspiration categories, searchable/filterable design cards, pagination, copy buttons
- 20 working client-side tools: color palette, contrast checker, paint, room paint, wallpaper, flooring, tile, furniture layout, renovation budget, design cost, area conversion, curtain sizing, lumens, gallery wall, sofa/rug guide, checklist, shopping list, mood board, style quiz, before/after comparison
- About, Contact, Privacy, Terms, and Disclaimer sections
- Creator credit: Created by Chief
- Contact email: chief0000019@gmail.com

## Design library status — please read
The site includes an editable data structure in `script.js` and a starter library of 173 design cards spread across the 25 categories. It does **not** yet contain 150 individually authored entries per category (3,750 total). Some of the category starter cards use a structured category-specific prompt template; expand the `curated` and `categorySeeds` data arrays with individually reviewed entries to meet the full editorial target. Do not advertise the library as 3,750 designs until those entries have actually been added and reviewed.

## Notes and limitations
- Prompt generation is deterministic and template-based. A live AI service would require a backend endpoint and secure API-key storage; never put a private key in `script.js`.
- Calculators show planning estimates, not guaranteed purchase quantities or market quotes.
- Mood board images are optional URLs; the before/after tool accepts local images up to 5 MB each and does not upload them.
- Contact is a `mailto:` link. A working contact form requires a backend or trusted email service.
- Preview images use Unsplash image URLs. Replace with licensed local images for production if desired.
- Legal text is starter copy and should be reviewed for your actual deployment, jurisdiction, analytics, hosting, and any added third-party services.
- Before launch, test on target devices and verify all calculations against your own project assumptions.
