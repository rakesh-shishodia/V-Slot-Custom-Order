

/**
 * Updates the totals displayed in the table footer.
 * @param {Object} config - The tool config containing DOM IDs and product pricing info.
 */
export function updateTotals(config) {
  const rows = document.querySelectorAll(`#${config.tableBodyId} tr`);
  let totalLength = 0;
  let totalCost = 0;

  rows.forEach(row => {
    const cutInput = row.querySelector('.cut-length');
    const qtyInput = row.querySelector('.quantity');
    const rowTotalCell = row.querySelector('.row-total');

    const cutLength = parseFloat(cutInput?.value) || 0;
    const quantity = parseInt(qtyInput?.value) || 0;
    const rowLength = cutLength * quantity;

    // Round up to the next 500mm chunk for pricing
    const roundedRow = Math.ceil(rowLength / 500) * 500;
    const cost = (roundedRow / 1000) * (config.pricePerMeter || 0);

    totalLength += rowLength;
    totalCost += cost;

    if (rowTotalCell) {
      rowTotalCell.textContent = cost.toFixed(2);
    }
  });

  // Update footer values
  const totalOrderedElem = document.getElementById(config.totalOrderedId);
  if (totalOrderedElem) {
    totalOrderedElem.textContent = totalLength;
  }
  const roundedLengthElem = document.getElementById(config.roundedLengthId);
  if (roundedLengthElem) {
    roundedLengthElem.textContent = Math.ceil(totalLength / 500) * 500;
  }
  const totalCostElem = document.getElementById(config.totalCostId);
  if (totalCostElem) {
    totalCostElem.textContent = totalCost.toFixed(2);
  }
}