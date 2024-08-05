export const formatValue = (key: string, value: any): string => {
  if (Array.isArray(value)) {
    if (key === 'dishes' || key === 'restaurants') {
      return value.join(', ')
    }
    return value.map((item) => JSON.stringify(item)).join(', ')
  }

  if (typeof value === 'object' && value !== null) {
    if (key === 'restaurant' || key === 'chef') {
      return value.name || 'N/A'
    }
    if (key === 'signatureDish') {
      return value.title || 'No signature dish'
    }
    return JSON.stringify(value)
  }

  if (key === 'signatureDish' && !value) {
    return 'No signature dish'
  }

  if (key === 'chef' && !value) {
    return 'N/A'
  }

  return String(value)
}


export const validateEmail = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return regex.test(email)
}
