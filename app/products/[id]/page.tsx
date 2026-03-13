

const ProductIdPage = async ({params}: {params: Promise<{id: string}>}) => {
  const { id } = await params;
  return (
    <div>ProductIdPage id: {id}</div>
  )
}

export default ProductIdPage