# Custom Cut and Machined Aluminium Extrusion Ordering Tool

## Overview

This project provides a standalone, JSON-driven tool for custom ordering of machined aluminium extrusions. It integrates with your Ecwid storefront to:

- Dynamically display available extrusion profiles with filtering by type, series, and color.
- Show detailed images and descriptions for each extrusion.
- Offer a flexible ordering table for specifying cut lengths, number of pieces, M5 tapping, and counter bore holes.
- Perform real-time calculations, rounding logic, and cost breakdown.
- Preview orders in a modal before adding to the Ecwid cart.

## Features

- **JSON-Driven Configuration**: All extrusion data (IDs, thumbnails, pricing, hole counts) and standard lengths are stored in a single `extrusions.json` file.
- **Filterable UI**: Customers can filter extrusion options by Type, Series, and Color.
- **Lightweight & Fast**: Minimal dependencies; uses jQuery, Ecwid Cart API, SimpleLightbox, and deferred review widget.
- **Order Preview Modal**: Summarizes the customer’s selections in human-readable form with an amend or proceed workflow.
- **Validation**: Ensures cut lengths (100–3000 mm) and piece counts are correct before submission.

## Directory Structure

```
/ (root)
├── index.html           # Main tool page
├── extrusions.json      # Configuration data for extrusions
├── partials/            # HTML snippets for product descriptions
│   ├── vs-slot-description.html
│   └── c-beam-description.html
├── assets/              # (optional) local CSS, images, icons
└── README.md            # This documentation file
```

## Installation and Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>.git
   cd <repo-folder>
   ```

2. **Serve the files**
   - You can open `index.html` directly in a browser for a quick test (if `extrusions.json` and `partials/` are local).
   - For production, host on a static site (e.g., Netlify, Vercel, AWS S3 + CloudFront) or within Ecwid’s Starter Site "Files" and "Pages" section.

3. **Ensure dependencies load**
   - Internet access to:
     - jQuery (`code.jquery.com`)
     - Ecwid Cart API (`app.ecwid.com`)
     - SimpleLightbox (`cdn.jsdelivr.net`)
     - HelpfulCrowd review widget

4. **Configure your Ecwid store ID**
   - In `index.html`, confirm the Ecwid script URL contains your store ID (e.g., `?2442119`).

## Usage

- Navigate to the hosted `index.html` URL.
- Use the filter pills to narrow down extrusion options.
- Click an extrusion box to load images, descriptions, and update the ordering table message.
- Enter cut lengths, select tapping/holes, and piece counts in the table.
- Click **Add to Cart** to review your order in a modal.
- Choose **Amend Order** to go back or **Proceed to Add to Cart** to finalize and reset the form.

## Customization

- **extrusions.json**: Update or add new extrusion entries (fields: `id`, `name`, `type`, `series`, `color`, `ProductId`, `thumbnailUrl`, `secondaryImageUrl`, `baseCostPerMm`, `holesPerSide`).
- **Standard Lengths**: Modify the `standardLengths` array to change rounding options.
- **Pricing**: Adjust `additionalCosts` in `extrusions.json` for tapping and counter bore hole fees.
- **Descriptions**: Edit or add HTML files under `partials/` and load them by matching `item.id` prefixes.
- **Styling**: Tweak inlined CSS within `<head>` or move to external stylesheet under `assets/`.

## Deployment Recommendations

- **Performance**: Defer non-critical scripts, inline critical CSS, and host assets on a CDN with HTTP/2 support.
- **Caching**: Serve `extrusions.json` and partials with `Cache-Control` headers and gzip/Brotli compression.
- **Analytics**: Embed a lightweight Real-User Monitoring snippet to track load times and user interactions.

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/YourFeature`.
3. Commit your changes: `git commit -m "Add some feature"`.
4. Push to your branch: `git push origin feature/YourFeature`.
5. Open a Pull Request with a clear description of your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

*Happy extruding!*
