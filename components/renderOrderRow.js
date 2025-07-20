/**
 * Creates a table row for a selected product in the order table.
 * @param {Object} product - The selected product.
 * @param {Object} config - Tool configuration (with toolId).
 * @param {Function} onChange - Callback to update totals or state when inputs change.
 * @param {Function} onRemove - Callback when the row is removed.
 * @returns {HTMLElement} - A <tr> element with populated fields.
 */
export function renderOrderRow(product, config, onChange, onRemove) {
  const tr = document.createElement('tr');

  tr.innerHTML = `
    <td><input type="number" class="cut-length" min="1" /></td>
    <td><input type="checkbox" class="tap" /></td>
    <td><input type="checkbox" class="cb" /></td>
    <td><input type="number" class="quantity" min="1" value="1" /></td>
    <td class="row-total">0.00</td>
    <td><button type="button" class="remove-row">X</button></td>
  `;

  // Wire up event listeners
  const cutLengthInput = tr.querySelector('.cut-length');
  const quantityInput = tr.querySelector('.quantity');
  const tapInput = tr.querySelector('.tap');
  const cbInput = tr.querySelector('.cb');
  const removeBtn = tr.querySelector('.remove-row');

  [cutLengthInput, quantityInput, tapInput, cbInput].forEach(input =>
    input.addEventListener('input', () => onChange())
  );

  removeBtn.addEventListener('click', () => onRemove(tr));

  return tr;
}
