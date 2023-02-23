import './Categorys.sytles.scss'
import { useParams } from 'react-router-dom'
import { useGetCategorysQuery, useUpdateCategoryMutation, useDeleteCategoryMutation } from './CategoryApiSlice'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { BsTrash } from 'react-icons/bs';
import { BiSave } from 'react-icons/bi'


const EditCategoryIner = ({category}) => {
    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateCategoryMutation()

    const [deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteCategoryMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState(category?.title)
    const [deskription, setdescription] = useState(category?.description)
    const [parentName, setParentname] = useState(category?.parent_name)
    const [active, setActive] = useState(false)


    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            setUsername('')
            navigate('/dash/users')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onDescripitonChanged = e => setdescription(e.target.value)
    const onParentNameChanged = e => setParentname(e.target.value)
    const onActiveChanged = () => setActive(prev => !prev)

    const onSaveUserClicked = async (e) => {
        await updateUser({ id: category.id, username, active })
    }

    const onDeleteUserClicked = async () => {
        await deleteUser({ id: category.id })
    }


    let canSave = !isLoading


    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''



    const content = (
        <>
            <form className="edit_form" onSubmit={e => e.preventDefault()}>
                <p className={errClass}>{errContent}</p>
                <div className="form__title_row">
                    <h2>Rediģēt kategorijas {category?.title} informāciju</h2>
                    <div className="form_action_buttons">
                        <button
                            className="icon_button_save"
                            title="Save"
                            onClick={onSaveUserClicked}
                            disabled={!canSave}
                        >
                            <BiSave/>
                        </button>
                        <button
                            className="icon_button_delite"
                            title="Delete"
                            onClick={onDeleteUserClicked}
                        >
                            <BsTrash/>
                        </button>
                    </div>
                </div>
                <label className="form_label" htmlFor="username">
                    Nosaukums: <span className="nowrap">[3-20 burti]</span></label>
                <input
                    className={`form_input`}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={username}
                    onChange={onUsernameChanged}
                />

                {parentName && <>
                    <label className="form_label" htmlFor="username">
                    Vēcāku kategorija: <span className="nowrap"></span></label>
                    <input
                        className={`form_input`}
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="off"
                        value={parentName}
                        onChange={onParentNameChanged}
                    />
                </>}
                                <label className="form_label" htmlFor="username">
                    Apraksts: <span className="nowrap">[3-220 burti]</span></label>
                <input
                    className={`form_input`}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={deskription}
                    onChange={onDescripitonChanged}
                />


                <label className="form_label flex" htmlFor="user-active">
                    Categorija ir aktivizēta: &nbsp;
                    <input
                        className="form__checkbox"
                        id="user-active"
                        name="user-active"
                        type="checkbox"
                        checked={active}
                        onChange={onActiveChanged}
                    />
                </label>


            </form>
        </>
    )

    return content
  }
  const EditCategory = ( ) => {
    const { id } = useParams()
    const { category } = useGetCategorysQuery("categoryList", {
        selectFromResult: ({ data })  => ({
            category: data?.entities[id]
        })
    })
    if(!category) return <h1>Loading...</h1>
    return <EditCategoryIner category={category}/>
    
}
  export default EditCategory
  

  