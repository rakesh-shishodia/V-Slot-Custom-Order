export function renderExtrusionLayout(containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`❌ Container not found: ${containerId}`);
    return;
  }

  container.innerHTML = `
    <div class="extrusion-tool">
      <!-- Filter Panel -->
      <div id="filterPanel">
        <div id="typeFilters" class="filter-group"></div>
        <div id="seriesFilters" class="filter-group"></div>
        <div id="colorFilters" class="filter-group"></div>
        <button id="clearFiltersBtn">Clear Filters</button>
      </div>

      <!-- Product Selector -->
      <div id="extrusionSelectorWrapper">
        <h2>Select Extrusion Type</h2>
        <div id="extrusionSelector" class="extrusion-selector-grid"></div>
      </div>

      <!-- Product Description Placeholder -->
      <div id="productDescription" class="extrusion-product-description">
        <!-- Filled dynamically -->
      </div>

      <!-- Cut Length Table -->
      <div id="cutLengthTableWrapper"></div>

      <!-- Totals Summary -->
      <div id="totalsSummary"></div>
    </div>
  `;
}
