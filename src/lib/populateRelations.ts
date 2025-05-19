export function populateRelations(
  rawContent: any,
  rels: Array<{ uuid: string; [key: string]: any }>,
): any {
  // Map rapide de uuid → objet rel
  const map = new Map<string, any>(rels.map((r) => [r.uuid, r]))
  // Pour éviter les boucles infinies
  const visited = new WeakSet<object>()

  function recurse(node: any): any {
    // 1) Si c'est un uuid (string) correspondant, on remonte l'objet, puis on recurse dedans
    if (typeof node === 'string') {
      const rel = map.get(node)
      return rel ? recurse(rel) : node
    }

    // 2) Si c'est un objet ou array, on vérifie la visite pour éviter la récursion infinie
    if (node !== null && typeof node === 'object') {
      if (visited.has(node)) {
        return node
      }
      visited.add(node)

      // Si array, on traite chaque élément
      if (Array.isArray(node)) {
        return node.map((item) => recurse(item))
      }

      // Si objet, on clone et on recurse sur chaque propriété
      const result: any = {}
      for (const key in node) {
        result[key] = recurse((node as any)[key])
      }
      return result
    }

    // 3) Toute autre valeur (nombre, bool, null…), on renvoie tel quel
    return node
  }

  // Lance la transformation depuis la racine
  return recurse(rawContent)
}
