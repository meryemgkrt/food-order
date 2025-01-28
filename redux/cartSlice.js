const handleClick = () => {
  if (!foodItems[0]) {
    console.error("foodItems[0] undefined! Check your data.");
    return;
  }

  dispatch(
    addProductToCart({
      id: foodItems[0].id,
      name: foodItems[0].name,
      price: price,
      extras: selectedExtras,
      quantity: 1,
    })
  );
};
