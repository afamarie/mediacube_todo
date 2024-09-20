import { defineStore } from 'pinia'

export interface Alert {
  id: string
  message: string
  status?: 'success' | 'danger'
}

export const useAlertStore = defineStore('alert', {
  state: () => ({
    alerts: [] as Alert[],
    autoRemoveTime: 4000
  }),
  actions: {
    addAlert(message: string, status?: 'success' | 'danger') {
      const id = Date.now().toString()
      this.alerts.push({ id, message, status })

      const removeTimeout = setTimeout(() => {
        this.removeAlert(id)
      }, this.autoRemoveTime)

      this.alerts.forEach((alert) => {
        clearTimeout(removeTimeout)
        setTimeout(() => {
          this.removeAlert(alert.id)
        }, this.autoRemoveTime / 2)
      })
    },
    removeAlert(id: string) {
      this.alerts = this.alerts.filter((alert) => alert.id !== id)
    }
  }
})
