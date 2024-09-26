import { isTokenKind } from "typescript";

type Node<T> = {
    value: T;
    next?: Node<T>;
    prev?: Node<T>;
};

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
    }

    prepend(item: T): void {
        this.length++;

        let node = { next: this.head, value: item };
        if (this.head == undefined) {
            this.head = node;
            this.tail = node;
            return;
        }

        this.head.prev = node;
        this.head = node;
    }
    insertAt(item: T, idx: number): void {
        if (idx > this.length) {
            throw Error("uh");
        }

        if (idx === 0) {
            this.prepend(item);
            return;
        } else if (idx === this.length) {
            this.append(item);
            return;
        }

        this.length++;
        const curr = this.getAt(idx) as Node<T>;
        let node = { value: item } as Node<T>;

        node.next = curr;
        node.prev = curr.prev;
        curr.prev = node;

        if (node.prev) {
            node.prev.next = node;
        }
    }
    append(item: T): void {
        this.length++;

        let node = { value: item } as Node<T>;
        if (this.tail === undefined) {
            this.tail = this.head = node;
            return;
        }

        node.prev = this.tail;
        this.tail.next = node;
        this.tail = node;
    }
    remove(item: T): T | undefined {
        let curr = this.head;

        for (let i = 0; curr && i < this.length; i++) {
            if (curr.value == item) {
                break;
            }
            curr = curr.next;
        }

        return this.removeNode(curr)?.value;
    }
    get(idx: number): T | undefined {
        return this.getAt(idx)?.value;
    }
    removeAt(idx: number): T | undefined {
        const node = this.getAt(idx);

        return this.removeNode(node)?.value;
    }

    private removeNode(node: Node<T> | undefined): Node<T> | undefined {
        if (!node) {
            return undefined;
        }

        this.length--;

        if (this.length === 0) {
            const out = this.head;
            this.head = this.tail = undefined;
            return out;
        }

        if (node.prev) {
            node.prev.next = node.next;
        }
        if (node.next) {
            node.next.prev = node.prev;
        }

        if (this.head === node) {
            this.head = node.next;
        }
        if (this.tail === node) {
            this.tail = node.prev;
        }
        return node;
    }

    private getAt(idx: number): Node<T> | undefined {
        let curr = this.head;
        for (let i = 0; curr && i < idx; i++) {
            curr = curr.next;
        }
        return curr;
    }
}
