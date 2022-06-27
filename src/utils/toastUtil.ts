import {toast} from "@zerodevx/svelte-toast";

export const genericToast = m => toast.push(m)

export const successToast = m => toast.push(m, {
  theme: {
    '--toastBackground': '#43a047',
  }
})

export const warningToast = m => toast.push(m, {
  theme: {
    '--toastBackground': 'rgb(255, 152, 0)'
  }
})

export const errorToast = m => toast.push(m, {
  theme: {
    '--toastBackground': 'rgb(211, 47, 47)'
  }
})