import './Catalog.styles.scss'
import '../page.scss'
const IndividualCaetegory = ({catergory,child}) => {
  return(
   <>
    <div>
    <div className={`categorija_indiv ${child&&'categorija_indiv_child'}`}>
      <span>{catergory.name}</span>
      <button>Pievienot apakškategoriju</button>
    </div>
    {catergory.child && catergory.child.map(val => (
      <IndividualCaetegory catergory={val} child={true}/>
    ))}
    </div>
   </>
  )
}
const Catalog = () => {
  const catarr = [
    {
      name: 'Dēļi',
      child:[
        {
          name: 'pussVagondēļi',
          child:[
            {
              name: 'Vagondēļi',
              child:null
            }
          ]
        }
      ]
    },
    {
      name: 'Brusas',
      child:null
    },
    {
      name: 'Plāksnes',
      child:[{
        name: 'OSb',
        child:null
      },
      {
        name: 'Saplāksnis',
        child:null
      }]
    },
  ]
  return (
    <>
    <h1>Katalogs</h1>
    <div className='center width_100'>
      <div className='m_auto width_60'>
        <div className='categorija_indiv' style={{backgroundColor:'rgb(243, 243, 243)'}}>
          <span>Nosaukums</span>
          <span></span>
        </div>
        {catarr.map(val => (
          <IndividualCaetegory catergory={val}/>
        ))} 
      </div>
    </div>
    </>
  )
}

export default Catalog

{/* 
        */}