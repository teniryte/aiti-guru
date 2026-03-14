import { renderToStaticMarkup } from 'react-dom/server';

let lastHtml = '';

function normalize(matcher) {
  return typeof matcher === 'string' ? matcher : String(matcher);
}

export function render(ui) {
  lastHtml = renderToStaticMarkup(ui);
  return {
    container: {
      innerHTML: lastHtml,
    },
  };
}

export const screen = {
  getByText(matcher) {
    const value = normalize(matcher);
    if (!lastHtml.includes(value)) {
      throw new Error(`Unable to find text: ${value}`);
    }
    return { textContent: value };
  },
  queryByText(matcher) {
    const value = normalize(matcher);
    if (!lastHtml.includes(value)) {
      return null;
    }
    return { textContent: value };
  },
};
