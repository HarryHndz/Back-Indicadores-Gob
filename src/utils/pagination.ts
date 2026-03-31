export const TAKE = 10
export const calculateSkip = (page:number = 1) => {
  return (page - 1) * TAKE
}
export const calculateTotalPages = (total:number) => {
  return Math.ceil(total / TAKE)
}
