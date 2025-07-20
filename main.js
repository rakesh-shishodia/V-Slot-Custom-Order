import { renderExtrusionTable } from './tools/ExtrusionTable.js';
import { renderExtrusionLayout } from './tools/ExtrusionLayout.js';
import { renderToolLayout, loadAndRenderProducts } from './tools/OrderToolCore.js';
import { extrusionConfig } from './tools/ToolRegistry.js';

// Mount the extrusion ordering tool on page load
renderExtrusionLayout('main-ordering-tab');
renderExtrusionTable();
renderToolLayout(extrusionConfig);
loadAndRenderProducts(extrusionConfig);