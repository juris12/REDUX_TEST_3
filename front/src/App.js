import { Routes, Route } from 'react-router-dom'
import './app.scss'
import Layout from './components/Layout'
import Public from './components/Public'
import DashLayout from './Wrapper/DashLayout'
import { ROLES } from './config/roles'
import { Login, Home, Catalog, Categorys, PersistLogin, Prefetch, EditUser, Welcome, RequireAuth, UsersList, NewUserForm, NotesList, EditNote, NewNote } from './pages'
import useTitle from './hooks/useTitle';
function App() {
  useTitle('Dan D. Repairs')

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>

                <Route index element={<Home />} />
                <Route path="catalog" element={<Catalog />} />
                <Route path="categorys" element={<Categorys />} />
                <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />}>
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                </Route>

                <Route path="notes">
                  <Route index element={<NotesList />} />
                  <Route path=":id" element={<EditNote />} />
                  <Route path="new" element={<NewNote />} />
                </Route>

              </Route>{/* End Dash */}
            </Route>
          </Route>
        </Route>{/* End Protected Routes */}

      </Route>
    </Routes >
  );
}

export default App;
