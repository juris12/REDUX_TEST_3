import './Categorys.sytles.scss'
import { useNavigate } from 'react-router-dom'
import { useGetCategorysQuery } from "./CategoryApiSlice"
const IndividualCaetegory = ({catergory}) => {
  const navigate = useNavigate()

  const clickHandler = () => navigate(`/dash/categorys/${catergory.id}`)
  return(
   <>
    <div className='categorija_indiv_outer' key={catergory.id}>
      <div className='categorija_indiv_prime' onClick={clickHandler}>
        <div className={`categorija_indiv`}>
          <span>{catergory.title}</span>
          <button>Pievienot apakškategoriju</button>
        </div>
      </div>
      <div className='categorija_indiv_child'>
        {catergory.child && catergory.child.map(val => (
          <IndividualCaetegory catergory={val}/>
        ))}
      </div>
    </div>
   </>
  )
}
const Categorys = () => {
    const {
        data: categorys,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetCategorysQuery('notesList', {
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
      const {  entities } = categorys
      let primecat = []
      Object.keys(entities).forEach(val => {
        if(entities[val].parentCategory === undefined){
          primecat.push({
            id: entities[val].id,
            title: entities[val].title,
            child: []
          })
        }
      });
      primecat.forEach((value,i) => {
        Object.keys(entities).forEach(val => {
          if(entities[val].parentCategory === value.id){
            primecat[i].child.push({
              id: entities[val].id,
              title: entities[val].title,
              child: []
            })
          }
        });
      });
      content = primecat.map(val => (<IndividualCaetegory catergory={val}/>))
    }
    return (
      <>
      <h1>Kategorijas</h1>
      <div className='center width_100'>
        <div className='m_auto width_60'>
          <div className='categorija_indiv' style={{backgroundColor:'rgb(243, 243, 243)'}}>
            <span>Nosaukums</span>
            <span></span>
          </div>
          {content} 
        </div>
      </div>
      </>
    )
  }
  
  export default Categorys
  

  