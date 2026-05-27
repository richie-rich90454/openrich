import { isClient } from "./is-client";

export function getEditorContainer(element: HTMLElement): HTMLElement | null {
    let current: HTMLElement | null = element;
    while (current) {
        if (current.dataset.openrichContainer === "true") {
            return current;
        }
        current = current.parentElement;
    }
    return null;
}

export function isElement(node: unknown): node is HTMLElement {
    return isClient && node instanceof HTMLElement;
}

export function createContainer(id?: string): HTMLElement | null {
    if (!isClient) return null;

    const container = document.createElement("div");
    container.dataset.openrichContainer = "true";
    if (id) container.id = id;
    return container;
}

export function queryContainer(selector: string): HTMLElement | null {
    if (!isClient) return null;
    return document.querySelector(selector);
}

export function removeAllChildren(node: HTMLElement): void {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}
