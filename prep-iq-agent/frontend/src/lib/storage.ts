import { localDB } from './localDB'

type StudyPlan = {
  id: number
  title: string
  data: Record<string, any>
  createdAt: string
}

export const storage = {
  savePlan: (plan: Omit<StudyPlan, 'id' | 'createdAt'>) => {
    const plans = localDB.get<StudyPlan[]>('plans') || []
    const newPlan: StudyPlan = {
      ...plan,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    }
    plans.push(newPlan)
    localDB.set('plans', plans)
    return newPlan
  },

  getPlans: () => {
    return localDB.get<StudyPlan[]>('plans') || []
  },

  deletePlan: (id: number) => {
    const plans = localDB.get<StudyPlan[]>('plans') || []
    const updated = plans.filter(p => p.id !== id)
    localDB.set('plans', updated)
  },

  clearAll: () => {
    localDB.remove('plans')
  },
}
