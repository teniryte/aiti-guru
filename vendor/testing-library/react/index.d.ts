import type React from 'react';

export interface RenderResult {
  container: {
    innerHTML: string;
  };
}

export declare function render(ui: React.ReactElement): RenderResult;

export declare function cleanup(): void;

export declare const screen: {
  getByText(matcher: string | RegExp): { textContent: string };
  queryByText(matcher: string | RegExp): { textContent: string } | null;
};
