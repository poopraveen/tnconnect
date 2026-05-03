// PostgreSQL natively supports String[] and enums,
// so no serialization is needed. These are kept as
// transparent pass-throughs so import sites don't break.
export function deserializeProperty(p: any) {
  return p;
}

export function serializeProperty(data: any) {
  return data;
}
