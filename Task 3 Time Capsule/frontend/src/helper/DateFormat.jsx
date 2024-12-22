import moment from 'moment'
export const formatDate = (date) => {
  return moment(date).format('MMM D, YYYY h:mm A') // Example: Dec 5, 2024 5:49 PM
}
