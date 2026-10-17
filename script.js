const cogsInput = document.getElementById('cogs');
const beginInput = document.getElementById('begin');
const endInput = document.getElementById('end');
const periodSelect = document.getElementById('period');
const customDaysGroup = document.getElementById('custom-days-group');
const customDaysInput = document.getElementById('custom-days');
const calculateBtn = document.getElementById('calculate-btn');
const resultDiv = document.getElementById('result');
const stockTurnEl = document.getElementById('stock-turn');
const dioEl = document.getElementById('dio');
const avgInvEl = document.getElementById('avg-inv');
const interpretationEl = document.getElementById('interpretation');

periodSelect.addEventListener('change', () => {
  customDaysGroup.classList.toggle('hidden', periodSelect.value !== 'custom');
});

calculateBtn.addEventListener('click', () => {
  const cogs = parseFloat(cogsInput.value);
  const begin = parseFloat(beginInput.value);
  const end = parseFloat(endInput.value);

  if (isNaN(cogs) || isNaN(begin) || isNaN(end) || cogs < 0 || begin < 0 || end < 0) {
    alert('Please enter valid positive numbers for COGS and inventory values.');
    return;
  }

  let days = parseInt(periodSelect.value, 10);
  if (periodSelect.value === 'custom') {
    days = parseInt(customDaysInput.value, 10);
    if (isNaN(days) || days < 1) {
      alert('Please enter a valid number of days.');
      return;
    }
  }

  const avgInventory = (begin + end) / 2;
  if (avgInventory === 0) {
    alert('Average inventory cannot be zero.');
    return;
  }

  const stockTurn = cogs / avgInventory;
  const dio = days / stockTurn;

  // Format numbers nicely
  stockTurnEl.textContent = stockTurn.toFixed(2) + '×';
  dioEl.textContent = Math.round(dio) + ' days';
  avgInvEl.textContent = avgInventory.toLocaleString(undefined, { maximumFractionDigits: 0 });

  // Simple interpretation
  let message = '';
  if (stockTurn >= 8) {
    message = 'Excellent turnover. Inventory is moving very quickly — great for cash flow.';
  } else if (stockTurn >= 5) {
    message = 'Healthy turnover. Your stock is rotating at a solid pace for most retail businesses.';
  } else if (stockTurn >= 3) {
    message = 'Moderate turnover. Worth checking slow-moving items or overstock situations.';
  } else {
    message = 'Low turnover. Inventory is sitting longer than ideal — review purchasing, pricing, or demand.';
  }
  interpretationEl.textContent = message;

  resultDiv.classList.remove('hidden');
});