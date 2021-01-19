export const TimeFormat = (second) => {

  let H = Math.floor(second / 3600)
  let M = Math.floor((second - (H * 3600)) / 60)
  let S = second - (H * 3600) - (M * 60)

  if (H < 10) {
      H = '0' + H
  }

  if (M < 10) {
    M = '0' + M
  }

  if (S < 10) {
    S = '0' + S
  }

  return {H, M, S}
}