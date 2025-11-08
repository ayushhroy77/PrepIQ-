export const localDB = {
  set: (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error("localDB.set error:", error)
    }
  },

  get: <T = any>(key: string): T | null => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : null
    } catch (error) {
      console.error("localDB.get error:", error)
      return null
    }
  },

  remove: (key: string) => {
    localStorage.removeItem(key)
  },

  clear: () => {
    localStorage.clear()
  },
}
