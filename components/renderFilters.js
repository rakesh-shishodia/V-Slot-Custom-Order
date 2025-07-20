


/**
 * Renders filter pills into a container element.
 * @param {Array} products - Array of product objects.
 * @param {string} key - The property name to filter by (e.g., 'series', 'color').
 * @param {string} containerId - ID of the container where filter pills should be rendered.
 * @param {Function} onFilterClick - Callback when a pill is clicked.
 */
export function renderFilters(products, key, containerId, onFilterClick) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn(`Filter container #${containerId} not found`);
    return;
  }

  // Extract unique values for the given key
  const values = Array.from(new Set(products.map(p => p[key]).filter(Boolean)));

  // Clear existing pills
  container.innerHTML = '';

  // Add "All" button
  const allBtn = document.createElement('button');
  allBtn.textContent = 'All';
  allBtn.addEventListener('click', () => onFilterClick(null));
  container.appendChild(allBtn);

  // Create buttons for each unique value
  values.forEach(value => {
    const btn = document.createElement('button');
    btn.textContent = value;
    btn.addEventListener('click', () => onFilterClick(value));
    container.appendChild(btn);
  });
}