export const convertLinks = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(
    urlRegex,
    (url) =>
      `<a href="${url}" target="_blank" style="color: #22c55e; text-decoration: underline;">${url}</a>`,
  );
};
