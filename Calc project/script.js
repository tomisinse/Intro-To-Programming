const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '';
let previousInput = '';
let operator = '';

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');

    // Clear the display
    if (button.id === 'clear') {
      currentInput = '';
      previousInput = '';
      operator = '';
      display.textContent = '0';
      return;
    }

    // Calculate result
    if (button.id === 'equals') {
      if (currentInput && previousInput && operator) {
        currentInput = eval(`${previousInput}${operator}${currentInput}`);
        display.textContent = currentInput;
        previousInput = '';
        operator = '';
      }
      return;
    }

    // Handle operators
    if (['+', '-', '*', '/'].includes(value)) {
      if (currentInput) {
        operator = value;
        previousInput = currentInput;
        currentInput = '';
      }
      return;
    }

    // Update the display with numbers or decimal
    currentInput += value;
    display.textContent = currentInput;
  });
});
