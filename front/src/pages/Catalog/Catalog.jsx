import './Catalog.styles.scss'
import '../page.scss'
const IndividualCaetegory = ({catergory,child}) => {
  return(
   <>
    <div className='categorija_indiv_outer'>
      <div className='categorija_indiv_prime'>
        <div className={`categorija_indiv`}>
          <span>{catergory.name}</span>
          <button>Pievienot apakškategoriju</button>
        </div>
      </div>
      <div className='categorija_indiv_child'>
        {catergory.child && catergory.child.map(val => (
          <IndividualCaetegory catergory={val} child={true}/>
        ))}
      </div>
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
              child:[
                {
                  name: 'pussVagondēļi',
                  child:[
                    {
                      name: 'Vagondēļi',
                      child:[
                        {
                          name: 'pussVagondēļi',
                          child:[
                            {
                              name: 'Vagondēļi',
                              child:[
                                {
                                  name: 'pussVagondēļi',
                                  child:[
                                    {
                                      name: 'Vagondēļi',
                                      child:null
                                    }
                                  ]
                                },
                                {
                                  name: 'OSb',
                                  child:null
                                }
                              ]
                            }
                          ]
                        },
                        {
                          name: 'OSb',
                          child:null
                        }
                      ]
                    }
                  ]
                },
                {
                  name: 'OSb',
                  child:null
                }
              ]
            }
          ]
        },
        {
          name: 'OSb',
          child:null
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