const getBufferData = (data: { [key: string]: THREE.Color }) => {
  const buffer = new Uint8Array(16)

  buffer[0] = Math.round(data.bl.r * 255)
  buffer[1] = Math.round(data.bl.g * 255)
  buffer[2] = Math.round(data.bl.b * 255)
  buffer[3] = 1

  buffer[4] = Math.round(data.br.r * 255)
  buffer[5] = Math.round(data.br.g * 255)
  buffer[6] = Math.round(data.br.b * 255)
  buffer[7] = 1

  buffer[8] = Math.round(data.tl.r * 255)
  buffer[9] = Math.round(data.tl.g * 255)
  buffer[10] = Math.round(data.tl.b * 255)
  buffer[11] = 1

  buffer[12] = Math.round(data.tr.r * 255)
  buffer[13] = Math.round(data.tr.g * 255)
  buffer[14] = Math.round(data.tr.b * 255)
  buffer[15] = 1

  return buffer
}

export default getBufferData
