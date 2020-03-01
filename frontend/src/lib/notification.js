import { notify } from 'react-notify-toast'

const notification = message => {
  notify.show(message, 'custom', 3000, { background: '#FFFFF0' })
}

export default notification