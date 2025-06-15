window.MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
    processEscapes: true
  },
  options: {
    enableAssistiveMml: false,
    enableMenu: false
  },
  loader: {
    load: []
  }
};

await import('./es5/tex-chtml-full');