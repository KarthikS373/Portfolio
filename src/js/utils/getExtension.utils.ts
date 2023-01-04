const getExtension = (source: string) => {
  const REGEX = /\.([a-z]+)$/

  const extension = source.match(REGEX)

  if (extension?.length) return { extension: extension[1] }
  
  return {}
}

export default getExtension
