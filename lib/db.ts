// Transforms a raw DB property row (images/amenities as JSON strings)
// into the shape the rest of the app expects (images/amenities as string[]).
export function deserializeProperty(p: any) {
  if (!p) return p;
  return {
    ...p,
    images: parseJsonArray(p.images),
    amenities: parseJsonArray(p.amenities),
  };
}

export function serializeProperty(data: any) {
  const out = { ...data };
  if (Array.isArray(out.images)) out.images = JSON.stringify(out.images);
  if (Array.isArray(out.amenities)) out.amenities = JSON.stringify(out.amenities);
  return out;
}

function parseJsonArray(val: any): string[] {
  if (Array.isArray(val)) return val;
  if (typeof val === "string") {
    try { return JSON.parse(val); } catch { return []; }
  }
  return [];
}
