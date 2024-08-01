//formatting value to fit the table
export const formatValue = (key: string, value: any): string => {
  if (Array.isArray(value)) {
    if (key === 'dishes') {
      return value.join(', ')
    } else if (key === 'restaurants') {
      return value.join(', ')
    }
    return value.map((item) => JSON.stringify(item)).join(', ')
  }
  if (key === 'signatureDish' && !value) {
    return 'No signature dish'
  }

  if (typeof value === 'object' && value !== null) {
    if (key === 'restaurant' && 'name' in value) {
      return value.name
    } else if (key === 'chef' && 'name' in value) {
      return value.name
    } else if (key === 'signatureDish' && 'title' in value) {
      return value.title
    }
    return JSON.stringify(value)
  }
  
  if (key === 'chef' && !value) {
    return 'N/A'
  }
  return String(value)
}


