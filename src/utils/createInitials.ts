export const createInitials = (name: string) => {
  const nameArray = name.split(" ");
  return nameArray
    .reduce<string[]>((initials, namePart) => {
      initials.push(namePart.charAt(0));
      return initials;
    }, [])
    .join("");
};
