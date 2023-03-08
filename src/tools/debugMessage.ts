const debugMessage = (messageText: string): string => {
  const spaceBefore = Math.floor((98 - messageText.length) / 2);
  const spaceAfter = Math.ceil((98 - messageText.length) / 2);

  const message = `${"▄".repeat(100)}\n█${" ".repeat(98)}█\n█${" ".repeat(
    spaceBefore
  )}${messageText}${" ".repeat(spaceAfter)}█\n█${" ".repeat(98)}█\n${"▀".repeat(
    100
  )}`;

  return message;
};

export default debugMessage;
