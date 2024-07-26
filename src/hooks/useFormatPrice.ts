const useFormatPrice = (price: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
  }).format(price);

export default useFormatPrice;
