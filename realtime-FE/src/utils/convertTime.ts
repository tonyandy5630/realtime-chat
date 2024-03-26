const options: any = {
  weekday: "long",
  hour: "numeric",
  minute: "numeric",
};

export default function toLocaleDate(date: Date) {
  const formatDate = new Date(date);
  const finalDate = formatDate.toLocaleDateString("en-EN", options);
  return finalDate;
}
