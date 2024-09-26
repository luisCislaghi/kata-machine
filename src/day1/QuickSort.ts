function partition(arr: number[], lo: number, hi: number): number {
    let idx = lo - 1;
    let pivot = arr[hi];

    for (let i = lo; i < hi; i++) {
        if (arr[i] <= pivot) {
            idx++;
            let tmp = arr[idx];
            arr[idx] = arr[i];
            arr[i] = tmp;
        }
    }

    idx++;
    arr[hi] = arr[idx];
    arr[idx] = pivot;

    return idx;
}

function qs(arr: number[], lo: number, hi: number) {
    if (hi <= lo) return;

    let pivotIdx = partition(arr, lo, hi);

    qs(arr, lo, pivotIdx - 1);
    qs(arr, pivotIdx + 1, hi);
}

export default function quick_sort(arr: number[]): void {
    qs(arr, 0, arr.length - 1);
}
