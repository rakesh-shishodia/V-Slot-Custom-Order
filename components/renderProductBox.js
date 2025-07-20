

/**
 * Creates a product box element for the selector grid.
 * @param {Object} product - The product data object.
 * @param {Function} onClick - Callback when the box is clicked.
 * @returns {HTMLElement} - A DOM element representing the product box.
 */
export function renderProductBox(product, onClick) {
  const box = document.createElement('div');
  box.className = 'product-box';
  box.setAttribute('data-id', product.id);

  box.innerHTML = `
    <h4>${product.name}</h4>
    <p>Series: ${product.series}</p>
    <p>Color: ${product.color}</p>
  `;

  box.addEventListener('click', () => onClick(product));

  return box;
}