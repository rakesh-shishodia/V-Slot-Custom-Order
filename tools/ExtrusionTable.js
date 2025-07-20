
export function renderExtrusionTable() {
  const wrapper = document.getElementById('cutLengthTableWrapper');
  if (!wrapper) return;

  wrapper.innerHTML = `
    <div class="cut-length-table">
      <table class="order-table">
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
        <tbody id="tableBody"></tbody>
      </table>
      <div class="table-controls">
        <button id="addRowBtn">Add Row</button>
        <button id="resetAllBtn">Reset</button>
      </div>
    </div>
  `;
}