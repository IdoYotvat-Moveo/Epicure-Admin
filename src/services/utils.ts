//formatting value to fit the table
export const formatValue = (key: string, value: any): string => {
    if (Array.isArray(value)) {
      if (key === 'dishes') {
        return value.map((dish) => dish.title).join(', ')
      } else if (key === 'restaurants') {
        return value.map((restaurant) => restaurant.name).join(', ')
      }
      return value.map((item) => JSON.stringify(item)).join(', ')
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
  
    return String(value)
  }
  