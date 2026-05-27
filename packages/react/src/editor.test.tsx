import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Editor } from './editor';
import { Document, Text, Paragraph } from '@openrich/extensions';

const minExtensions = [Document, Paragraph, Text];

describe('React Editor', () => {
  it('renders editor component', () => {
    const { container } = render(
      <Editor content="<p>Hello</p>" extensions={minExtensions} />,
    );
    expect(container).toBeTruthy();
  });

  it('renders with default options', () => {
    const { container } = render(<Editor extensions={minExtensions} />);
    expect(container.querySelector('.openrich-editor')).toBeDefined();
  });

  it('accepts className prop', () => {
    const { container } = render(
      <Editor className="my-editor" extensions={minExtensions} />,
    );
    const div = container.querySelector('.openrich-editor');
    expect(div).toBeDefined();
    expect(div!.className).toContain('my-editor');
  });

  it('accepts style prop', () => {
    const { container } = render(
      <Editor style={{ height: '300px' }} extensions={minExtensions} />,
    );
    const div = container.querySelector('.openrich-editor');
    expect(div).toBeDefined();
  });

  it('renders with content prop', () => {
    const { container } = render(
      <Editor content="<p>Hello World</p>" extensions={minExtensions} />,
    );
    expect(container.querySelector('.openrich-editor')).toBeDefined();
  });

  it('renders with editable set to false', () => {
    const { container } = render(
      <Editor editable={false} extensions={minExtensions} />,
    );
    expect(container.querySelector('.openrich-editor')).toBeDefined();
  });

  it('renders with theme prop', () => {
    const { container } = render(
      <Editor theme="dark" extensions={minExtensions} />,
    );
    expect(container.querySelector('.openrich-editor')).toBeDefined();
  });
});
