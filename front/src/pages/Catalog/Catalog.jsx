import './Catalog.styles.scss'
import '../page.scss'
import { useNavigate } from 'react-router-dom'
import { useGetProductQuery } from "./productApiSlice"

const Produktbox = ({product}) => {
  const { id, title, price, quantity, disabled, category_name } = product
  const navigate = useNavigate()
  const clickHandler = () => navigate(`/dash/catalog/${product.id}`)
  return (
    <tr key={id} onClick={clickHandler}>
      <td>{id}</td>
      <td>{title}</td>
      <td>{category_name}</td>
      <td>{quantity}</td>
      <td>{price}</td>
      <td>{!disabled ? "Aktīvs" : "Neaktīvs"}</td>
    </tr>
  )
}
 
const Catalog = () => {
  const {
      data: products,
      isLoading,
      isSuccess,
      isError,
      error
  } = useGetProductQuery('notesList', {
      pollingInterval: 15000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true
  })
  let content

  if (isLoading) content = <h1>Loading... </h1>

  if (isError) {
      content = <p className="errmsg">{error?.data?.message}</p>
  }
  if(isSuccess){
    const {  entities, ids } = products

    const tableContent = ids?.length && ids.map(productid => <Produktbox product={entities[productid]}/>)

    content = (
        <>
        <h1>Katalogs</h1>
        <div className='center margin_xs'>
          <div className='width_90 catalog_outer'>
            <div className='catalog_filter width_20'>
                Filtri
            </div>
            <div className='catalog_center width_75'>
              <table className='standart_table'>
                <thead>
                  <tr>
                    <th>Identifikācijas nr.</th>
                    <th>Nosaukums</th>
                    <th>kategorija</th>
                    <th>Daudzums</th>
                    <th>Cena</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tableContent}
                </tbody>
                </table>
            </div>
          </div>
        </div></>
    )
  }
  return content
}

export default Catalog