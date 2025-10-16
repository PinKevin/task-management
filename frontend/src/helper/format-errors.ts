export function formatErrors(errorMessages: string[]) {
  const errors: { [key: string]: string } = {};
  errorMessages.forEach((msg) => {
    const field = msg.split(' ')[0];
    errors[field] = msg;
  });
  return errors;
}
