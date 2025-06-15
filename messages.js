// messages.js
// This file centralizes all static user-facing strings such as error messages,
// UI tooltips, policy texts, and modal descriptions.
// It improves maintainability and allows easier localization in the future.

window.VSlotMessages = {
  errors: {
    invalidLength: "Please correct the highlighted cut lengths (100–3000 mm).",
    invalidPieceCount: "Please enter at least 1 piece for each specified cut length.",
    invalidTapValue: "Enter 0, 1 or 2 only",
    generic: "Invalid value"
  },
  wastePolicy: {
    short: "Billing is rounded up to the nearest 500 mm; any off-cut over 100 mm is shipped to you.",
    example: "<strong>Example</strong> – You order 2 pcs of 1000 mm and 1 pc of 1200 mm (total 3200 mm), so we bill for 3500 mm. You’ll receive your 2 pcs of 1000 mm, 1 pc of 1200 mm plus a 300 mm off-cut.",
    detailed: `
    <strong>Material & Waste Policy</strong><br><br>
    We cut orders in 500 mm increments to reduce material wastage, keep our prices low and our operations efficient, and <strong>those savings go straight into your final per-metre rate</strong>.<br><br>
    <strong>How it works:</strong><br><br>

    1. <strong>Rounding</strong>: Every order is rounded up to the next 500 mm increment and accordingly billed for.<br>
    2. <strong>Clean-offs</strong>: Rather than discard leftovers, we ship you any piece longer than 100 mm.<br><br>
    <strong>Real-world example:</strong><br><br>
    • You specify: 2 pcs of 1000 mm and 1 pc of 1200 mm (total 3200 mm).<br>
    • We round up and bill 3500 mm at your per-metre rate.<br>
    • You receive 2 pcs of 1000 mm and 1 pc of 1200 mm plus a 300 mm off-cut which you can use for jigs, fixtures, or future tweaks.<br><br>
    This policy keeps our material costs predictable and our prices competitive — while ensuring you never pay for wasted material.
    `  
 },
  shipping: {
    longNote: "Note: We offer free shipping up to 1000mm length pcs. One or more extrusions are more than 1000mm in length and thus we will have to charge applicable shipping. For your order, please checkout using 'Wire Transfer' as payment option. We will update shipping costs and then seek your payment through UPI or payment link. You will get an email and call from us for this."
  },
  preview: {
    withTapOne: "with one end tapped",
    withTapBoth: "with both ends tapped",
    cbHoleSingular: "CB Hole in each",
    cbHoles: "CB Holes in each"
  },
  infoTooltips: {
    tapOptions: "V Slot – M5x15mm, 3030 T Slot – M8x15mm. Check drawings for others.",
    cbHoles: "For V Slot: ID 5mm, OD 10mm; For 3030: ID 8mm, OD 15mm; For others, check drawing"
  }
};