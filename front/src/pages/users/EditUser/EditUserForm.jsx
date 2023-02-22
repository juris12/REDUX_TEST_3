import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useUpdateUserMutation,useDeleteUserMutation } from './../usersApiSlice'
import { BsTrash } from 'react-icons/bs';
import { BiSave } from 'react-icons/bi'
import { ROLES } from '../../../config/roles'

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const EditUserForm = ({ user }) => {
    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()

    const [deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteUserMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState(user.username)
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(user.roles)
    const [active, setActive] = useState(user.active)

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        console.log(isSuccess)
        if (isSuccess || isDelSuccess) {
            setUsername('')
            setPassword('')
            setRoles([])
            navigate('/dash/users')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )
        setRoles(values)
    }

    const onActiveChanged = () => setActive(prev => !prev)

    const onSaveUserClicked = async (e) => {
        if (password) {
            await updateUser({ id: user.id, username, password, roles, active })
        } else {
            await updateUser({ id: user.id, username, roles, active })
        }
    }

    const onDeleteUserClicked = async () => {
        await deleteUser({ id: user.id })
    }

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}

            > {role}</option >
        )
    })

    let canSave
    if (password) {
        canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading
    } else {
        canSave = [roles.length, validUsername].every(Boolean) && !isLoading
    }

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = password && !validPassword ? 'form__input--incomplete' : ''
    const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''



    const content = (
        <>
            <form className="edit_form" onSubmit={e => e.preventDefault()}>
                <p className={errClass}>{errContent}</p>
                <div className="form__title_row">
                    <h2>Rediģēt lietotāja {username} informāciju</h2>
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
                    Lietotājvārds: <span className="nowrap">[3-20 burti]</span></label>
                <input
                    className={`form_input ${validUserClass}`}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={username}
                    onChange={onUsernameChanged}
                />


                <label className="form_label" htmlFor="newpassword">
                    Parole: <span className="nowrap"></span> <span className="nowrap">[4-12 burti vai !@#$%]</span></label>
                <input
                    className={`form_input ${validPwdClass}`}
                    id="newpassword"
                    name="newpassword"
                    type="newpassword"
                    value={password}
                    onChange={onPasswordChanged}
                />

                <label className="form_label flex" htmlFor="user-active">
                    Lietotājs ir aktivizēts: &nbsp;
                    <input
                        className="form__checkbox"
                        id="user-active"
                        name="user-active"
                        type="checkbox"
                        checked={active}
                        onChange={onActiveChanged}
                    />
                </label>


                <label className="form_label" htmlFor="roles">
                    Lietotāja piekļuve: &nbsp;{roles}</label>
                <select
                    id="roles"
                    name="roles"
                    className={`form__select ${validRolesClass}`}
                    multiple={true}
                    size="3"
                    value={roles}
                    onChange={onRolesChanged}
                >
                    {options}
                </select>


            </form>
        </>
    )

    return content
}
export default EditUserForm