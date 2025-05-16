export function populateRelations(
  rawContent: Record<string, unknown>,
  rels: Array<{ uuid: string; [key: string]: any }>
): Record<string, unknown> {
  const map = new Map<string, any>(rels.map(r => [r.uuid, r]));
  const out: Record<string, unknown> = { ...rawContent };

  for (const k in rawContent) {
    const v = rawContent[k];
    if (Array.isArray(v)) {
      out[k] = v.map(id => map.get(id as string) ?? id);
    } else if (typeof v === "string") {
      out[k] = map.get(v) ?? v;
    }
  }

  return out;
}
