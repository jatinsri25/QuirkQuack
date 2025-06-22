export const extractTime = (dateString: string) => {
	const date = new Date(dateString);
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const ampm = hours >= 12 ? "PM" : "AM";
	const formattedHours = hours % 12 || 12;
	const formattedMinutes = minutes.toString().padStart(2, "0");
	return `${formattedHours}:${formattedMinutes} ${ampm}`;
};

// Helper function to pad single-digit numbers with a leading zero
function padZero(number: number) {
	return number.toString().padStart(2, "0");
}
