import EcwidData from '../data/extrusion-data.js';

// Configuration object for the Extrusion Ordering Tool
export const extrusionConfig = {
  // Unique prefix for all IDs and classes related to this tool
  toolId: 'extrusion',

  // ID of the main container div where the tool will be rendered
  containerId: 'main-ordering-tab',

  // DOM IDs for various subcomponents within the tool
  selectorId: 'extrusion-selector',             // Product selector grid
  filterControlsId: 'extrusion-filterControls', // Filter pills panel
  tableId: 'extrusionOrderTable',               // Full order table
  tableBodyId: 'extrusionTableBody',            // <tbody> where rows are injected
  addRowBtnId: 'extrusionAddRowBtn',            // "Add Row" button
  resetAllBtnId: 'extrusionResetAllBtn',        // "Reset All" button
  totalOrderedId: 'extrusionTotalOrdered',      // Total ordered mm
  roundedLengthId: 'extrusionRoundedLength',    // Rounded up length
  totalCostId: 'extrusionTotalCost',            // Final cost display
  addToCartBtnId: 'extrusionAddToCartBtn',      // Add to Cart button

  // Function to fetch product and pricing data
  loadData: EcwidData.fetchAll
};