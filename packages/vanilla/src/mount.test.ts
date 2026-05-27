import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mount, unmount } from "./mount";
import { Document, Text, Paragraph } from "@openrich/extensions";

const minExtensions = [Document, Paragraph, Text];

describe("@openrich/vanilla", () => {
    let container: HTMLDivElement;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        container.remove();
    });

    it("mount creates editor and appends to element", () => {
        const editor = mount(container, {
            content: "<p>test</p>",
            extensions: minExtensions,
        });
        expect(editor).not.toBeNull();
        expect(container.querySelector(".ProseMirror")).toBeDefined();
    });

    it("unmount destroys the editor", () => {
        const editor = mount(container, { extensions: minExtensions });
        expect(editor).not.toBeNull();
        unmount(editor);
    });

    it("mount accepts className option", () => {
        const editor = mount(container, {
            className: "custom-editor",
            extensions: minExtensions,
        });
        expect(editor).not.toBeNull();
        const wrapper = container.querySelector(".openrich-editor");
        expect(wrapper).toBeDefined();
    });

    it("mount creates wrapper with correct class", () => {
        mount(container, {
            className: "my-editor",
            extensions: minExtensions,
        });
        const wrapper = container.querySelector(".openrich-editor");
        expect(wrapper).toBeDefined();
        expect(wrapper!.className).toBe("openrich-editor my-editor");
    });

    it("mount works without options", () => {
        const editor = mount(container, { extensions: minExtensions });
        expect(editor).not.toBeNull();
    });
});
