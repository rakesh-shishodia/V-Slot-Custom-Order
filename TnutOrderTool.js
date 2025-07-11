export function renderTnutOrderTool() {
  console.log("TnutOrderTool initialized");
  const root = document.getElementById('tnut-tool-root');
  if (!root) return;

  const container = document.createElement('div');

  const heading = document.createElement('h2');
  heading.textContent = 'Order T Nuts';
  container.appendChild(heading);

  const filterSection = document.createElement('div');
  container.appendChild(filterSection);

  const table = document.createElement('table');
  table.innerHTML = `
    <thead>
      <tr>
        <th>T Nut Type</th>
        <th>Hole Size</th>
        <th>Each Price</th>
        <th>Bag Price (100 pcs)</th>
        <th>Bulk Price (1000 pcs)</th>
        <th>Quantity</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      <!-- Dynamic rows will go here -->
    </tbody>
  `;
  container.appendChild(table);

  const totalSection = document.createElement('div');
  totalSection.innerHTML = `
    <strong>Cost of All Entered Products: ₹0.00</strong>
  `;
  container.appendChild(totalSection);

  root.innerHTML = '';
  root.appendChild(container);

  // Dummy data for testing UI
  const dummyTnutProducts = [
    {
      id: 1,
      name: "Drop-In T Nut",
      holeSize: "M5",
      price: 4.5,
      bagPrice: 400,
      bulkPrice: 3500,
      compatibleSeries: "20 Series"
    },
    {
      id: 2,
      name: "Spring T Nut",
      holeSize: "M6",
      price: 5.0,
      bagPrice: 450,
      bulkPrice: 4000,
      compatibleSeries: "30 Series"
    }
  ];

  const tbody = table.querySelector('tbody');
  const totalCostElem = totalSection.querySelector('strong');
  const quantities = new Map();

  function updateTotal() {
    let total = 0;
    for (const [id, qty] of quantities.entries()) {
      const product = dummyTnutProducts.find(p => p.id === id);
      if (product) {
        total += qty * (product.price || 0);
      }
    }
    totalCostElem.textContent = `Cost of All Entered Products: ₹${total.toFixed(2)}`;
  }

  function renderDummyRows() {
    tbody.innerHTML = '';
    dummyTnutProducts.forEach(product => {
      const tr = document.createElement('tr');

      const tdType = document.createElement('td');
      tdType.textContent = product.name;
      tr.appendChild(tdType);

      const tdHoleSize = document.createElement('td');
      tdHoleSize.textContent = product.holeSize;
      tr.appendChild(tdHoleSize);

      const tdEachPrice = document.createElement('td');
      tdEachPrice.textContent = `₹${product.price.toFixed(2)}`;
      tr.appendChild(tdEachPrice);

      const tdBagPrice = document.createElement('td');
      tdBagPrice.textContent = `₹${product.bagPrice.toFixed(2)}`;
      tr.appendChild(tdBagPrice);

      const tdBulkPrice = document.createElement('td');
      tdBulkPrice.textContent = `₹${product.bulkPrice.toFixed(2)}`;
      tr.appendChild(tdBulkPrice);

      const tdQuantity = document.createElement('td');
      const qtyInput = document.createElement('input');
      qtyInput.type = 'number';
      qtyInput.min = 0;
      qtyInput.value = quantities.get(product.id) || 0;
      qtyInput.style.width = '60px';
      tdQuantity.appendChild(qtyInput);
      tr.appendChild(tdQuantity);

      const tdTotal = document.createElement('td');
      const calcTotal = () => {
        const qty = parseInt(qtyInput.value, 10) || 0;
        const totalPrice = qty * (product.price || 0);
        tdTotal.textContent = `₹${totalPrice.toFixed(2)}`;
        quantities.set(product.id, qty);
        updateTotal();
      };
      qtyInput.addEventListener('input', calcTotal);
      calcTotal();

      tr.appendChild(tdTotal);

      tbody.appendChild(tr);
    });
  }

  renderDummyRows();

  /*
  // Fetch data and initialize
  EcwidData.fetchAll().then((data) => {
    console.log("Fetched data:", data);
    // Filter only T Nut products
    const tnutProducts = data.filter(item => item.category && item.category.toLowerCase().includes('t nut'));
    console.log("Filtered T Nut products:", tnutProducts);

    // Extract distinct compatible series
    const seriesSet = new Set();
    tnutProducts.forEach(p => {
      if (p.compatibleSeries) {
        if (Array.isArray(p.compatibleSeries)) {
          p.compatibleSeries.forEach(s => seriesSet.add(s));
        } else {
          seriesSet.add(p.compatibleSeries);
        }
      }
    });
    const seriesList = Array.from(seriesSet).sort();
    console.log("Available Compatible Series:", seriesList);

    // Create filter pills
    const allPill = document.createElement('button');
    allPill.textContent = 'All';
    allPill.className = 'filter-pill active';
    filterSection.appendChild(document.createElement('p')).textContent = 'Select Compatible Series:';
    filterSection.appendChild(allPill);
    seriesList.forEach(series => {
      const pill = document.createElement('button');
      pill.textContent = series;
      pill.className = 'filter-pill';
      filterSection.appendChild(pill);
    });

    let selectedSeries = 'All';

    const tbody = table.querySelector('tbody');
    const totalCostElem = totalSection.querySelector('strong');

    // Track quantities and prices
    const quantities = new Map();

    function updateTotal() {
      let total = 0;
      for (const [id, qty] of quantities.entries()) {
        const product = tnutProducts.find(p => p.id === id);
        if (product) {
          total += qty * (product.price || 0);
        }
      }
      totalCostElem.textContent = `Cost of All Entered Products: ₹${total.toFixed(2)}`;
    }

    function renderRows() {
      console.log("Rendering rows for selected series:", selectedSeries);
      tbody.innerHTML = '';
      const filtered = selectedSeries === 'All' ? tnutProducts : tnutProducts.filter(p => {
        if (!p.compatibleSeries) return false;
        if (Array.isArray(p.compatibleSeries)) {
          return p.compatibleSeries.includes(selectedSeries);
        }
        return p.compatibleSeries === selectedSeries;
      });

      filtered.forEach(product => {
        const tr = document.createElement('tr');

        const tdType = document.createElement('td');
        tdType.textContent = product.name || '';
        tr.appendChild(tdType);

        const tdHoleSize = document.createElement('td');
        tdHoleSize.textContent = product.holeSize || '';
        tr.appendChild(tdHoleSize);

        const tdEachPrice = document.createElement('td');
        tdEachPrice.textContent = product.price != null ? `₹${product.price.toFixed(2)}` : '-';
        tr.appendChild(tdEachPrice);

        const tdBagPrice = document.createElement('td');
        tdBagPrice.textContent = product.bagPrice != null ? `₹${product.bagPrice.toFixed(2)}` : '-';
        tr.appendChild(tdBagPrice);

        const tdBulkPrice = document.createElement('td');
        tdBulkPrice.textContent = product.bulkPrice != null ? `₹${product.bulkPrice.toFixed(2)}` : '-';
        tr.appendChild(tdBulkPrice);

        const tdQuantity = document.createElement('td');
        const qtyInput = document.createElement('input');
        qtyInput.type = 'number';
        qtyInput.min = 0;
        qtyInput.value = quantities.get(product.id) || 0;
        qtyInput.style.width = '60px';
        tdQuantity.appendChild(qtyInput);
        tr.appendChild(tdQuantity);

        const tdTotal = document.createElement('td');
        const calcTotal = () => {
          const qty = parseInt(qtyInput.value, 10) || 0;
          const totalPrice = qty * (product.price || 0);
          tdTotal.textContent = `₹${totalPrice.toFixed(2)}`;
          quantities.set(product.id, qty);
          updateTotal();
        };
        qtyInput.addEventListener('input', calcTotal);
        calcTotal();

        tr.appendChild(tdTotal);

        tbody.appendChild(tr);
      });
    }

    // Handle filter pill clicks
    filterSection.querySelectorAll('.filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        filterSection.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        selectedSeries = pill.textContent;
        renderRows();
      });
    });

    renderRows();
  });
  */
}