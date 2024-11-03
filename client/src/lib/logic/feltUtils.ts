export type Felt = { val: bigint };

export const WIDTH = 14;
export const HEIGHT = 18;

export function felt(feltStr: string): Felt {
    let stringVal = feltStr.replaceAll("\n", '').replaceAll(' ', '').replaceAll('\t', '');
    console.log(stringVal);
    return {
        val: BigInt("0b" + stringVal)
    };
}

export function isSet(felt: Felt, col: number, row: number): boolean {
    if (felt == null) return false;
    let offset = col * WIDTH + row;
    let mask = (BigInt(1) << BigInt(offset - 1));
    return (mask & felt.val) == BigInt(0);
}
