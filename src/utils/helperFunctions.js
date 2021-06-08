/* Function to determine the amount of questions you can request */
exports.setAmount = (amountPetition) => {
  let finalAmount = 10
  if (!amountPetition) return finalAmount

  amountPetition > 40 ? finalAmount = 40 : finalAmount = amountPetition
  return finalAmount
}
