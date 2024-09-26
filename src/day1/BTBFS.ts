import { BinaryNode } from "./BTPreOrder";

export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    let q: (BinaryNode<number> | null)[] = [head];

    while (q.length != 0) {
        const curr = q.shift();
        if (!curr) continue;

        if (curr.value === needle) return true;

        if (curr.left) q.push(curr.left);

        if (curr.right) q.push(curr.right);
    }

    return false;
}
