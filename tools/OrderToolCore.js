export function renderToolLayout(config) {
  // Get the container element where the tool will be rendered
  const container = document.getElementById(config.containerId);
  if (!container) {
    console.error(`Container #${config.containerId} not found`);
    return;
  }

  // Insert the tool layout HTML into the container
  // All IDs and classes are prefixed with config.toolId to keep them unique per tool (e.g., "extrusion", "tnut")
  container.innerHTML = `
    <!-- Filter and Product Selector -->
    <div class="filter-product-container">
      <!-- Filter Controls Panel -->
      <div class="filter-panel">
        <h2 class="filter-title">Filter</h2>
        <div id="${config.toolId}-filterControls">
          <div class="filter-group" id="${config.toolId}-typeFilters"><strong>Type:</strong></div>
          <div class="filter-group" id="${config.toolId}-seriesFilters"><strong>Series:</strong></div>
          <div class="filter-group" id="${config.toolId}-colorFilters"><strong>Colour:</strong></div>
          <button type="button" id="${config.toolId}-clearFiltersBtn">Clear Filters</button>
        </div>
      </div>

      <!-- Product Selector Panel -->
      <div class="selector-panel">
        <h2 class="selector-title">Select and Enter Details in Table Below</h2>
        <div class="${config.toolId}-selector-wrapper">
          <div class="${config.toolId}-selector" id="${config.toolId}-selector">
            <!-- Product boxes go here -->
          </div>
        </div>
      </div>
    </div>

    <!-- Order Table and Totals Section -->
    <div class="flex-container">
      <div class="order-panel">
        <form id="${config.toolId}Form">
          <!-- Dynamic Order Table -->
          <table id="${config.toolId}OrderTable">
            <thead>
              <tr>
                <th>Cut Length (mm)</th>
                <th>Tap</th>
                <th>CB Holes</th>
                <th>No. of Pcs</th>
                <th>Row Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="${config.toolId}TableBody">
              <!-- Dynamic rows -->
            </tbody>
          </table>
          <button type="button" id="${config.toolId}AddRowBtn">Add Row</button>
          <button type="button" id="${config.toolId}ResetAllBtn">Reset</button>

          <!-- Totals Table -->
          <table class="totals-table">
            <thead>
              <tr>
                <th>Total Length</th>
                <th>Rounded Length</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td id="${config.toolId}TotalOrdered">0</td>
                <td id="${config.toolId}RoundedLength">0</td>
                <td id="${config.toolId}TotalCost">0.00</td>
              </tr>
            </tbody>
          </table>

          <!-- Add to Cart Button -->
          <button type="button" id="${config.toolId}AddToCartBtn" class="js-add-to-cart">Add to Cart</button>
        </form>
      </div>
    </div>
  `;
}

import { renderProductBox } from '../components/renderProductBox.js';
import { renderOrderRow } from '../components/renderOrderRow.js';
import { updateTotals } from '../components/totals.js';
import { renderFilters } from '../components/renderFilters.js';

// Loads product data via config.loadData(), stores in config.products, and renders product boxes.
export async function loadAndRenderProducts(config) {
  try {
    const result = await config.loadData();
    config.products = result.products;
    config.standardLengths = result.standardLengths;
    config.activeFilters = { series: null, color: null };

    const selector = document.getElementById(config.selectorId);
    if (!selector) {
      console.error(`Selector #${config.selectorId} not found`);
      return;
    }

    const tableBody = document.getElementById(config.tableBodyId);
    if (!tableBody) {
      console.error(`Table body #${config.tableBodyId} not found`);
      return;
    }

    // Filter rendering
    renderFilters(config.products, 'series', `${config.toolId}-seriesFilters`, value => {
      config.activeFilters.series = value;
      applyFilters(config);
    });

    renderFilters(config.products, 'color', `${config.toolId}-colorFilters`, value => {
      config.activeFilters.color = value;
      applyFilters(config);
    });

    // Filter + box rendering helper
    function applyFilters(config) {
      const { series, color } = config.activeFilters;
      const filtered = config.products.filter(product => {
        return (!series || product.series === series) &&
               (!color || product.color === color);
      });

      selector.innerHTML = '';
      filtered.forEach(product => {
        const box = renderProductBox(product, selectedProduct => {
          const row = renderOrderRow(selectedProduct, config, () => updateTotals(config), tr => {
            tr.remove();
            updateTotals(config);
          });
          tableBody.appendChild(row);
          updateTotals(config);
        });
        selector.appendChild(box);
      });
    }

    // Initial full render
    applyFilters(config);

    console.log(`Rendered ${config.products.length} products in ${config.selectorId}`);
  } catch (error) {
    console.error(`Failed to load data for ${config.toolId}:`, error);
  }
}