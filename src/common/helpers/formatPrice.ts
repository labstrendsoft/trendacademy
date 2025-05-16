export const formatPriceInSoles = (price: string | number): string => {
	const numericPrice = typeof price === 'number' ? price : parseFloat(price);

	if (isNaN(numericPrice)) {
		return 'S/ 0.00';
	}

	return `S/ ${numericPrice.toLocaleString('es-PE', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})}`;
};

export const applyDiscount = (
	originalPrice: string,
	discountPercentage: string
): string => {
	const price = parseFloat(originalPrice); // Convierte el precio original de string a número
	const discount = parseFloat(discountPercentage); // Convierte el descuento de string a número

	if (isNaN(price) || isNaN(discount)) {
		return 'S/ 0.00'; // Retorna un valor predeterminado si el precio o el descuento no son números válidos
	}

	const discountAmount = price * (discount / 100); // Calcula el monto del descuento
	const discountedPrice = price - discountAmount; // Calcula el precio con descuento

	return `S/ ${discountedPrice.toLocaleString('es-PE', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})}`;
};
