export function extractErrorMessage(error) {
  return error.response?.data?.message || error.message || error.toString()
}

export function formatDate(date) {
  return new Date(date).toLocaleString('en-DE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
}

export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
}

export const UPPERCASE_LOWERCASE_PASSWORD_REGEX =
  /([a-z].*[A-Z])|([A-Z].*[a-z])/
export const NUMBER_REGEX = /([0-9])/
export const SPECIAL_CHARACTER_REGEX = /([!,%,&,@,#,$,^,*,?,_,~,.])/