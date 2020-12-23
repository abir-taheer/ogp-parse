const determiners = ['a', 'an', 'the', '', 'auto'] as const;
type DeterminerValues = (typeof determiners)[number];

export const isDeterminer = (x: any): x is DeterminerValues => determiners.includes(x);

export default DeterminerValues;