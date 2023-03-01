import { Routes, Route } from 'react-router-dom'
import './app.scss'
import {DashLayout, StoreWrapper} from './Wrapper'
import { ROLES } from './config/roles'
import { Login, Home, Catalog,LandingPage , EditProduct, Categorys, EditCategory, PersistLogin, Prefetch, EditUser, RequireAuth, UsersList, NewUserForm, NotesList, EditNote, NewNote } from './pages'
import useTitle from './hooks/useTitle';
function App() {
  useTitle('Dan D. Repairs')

  return (
    <Routes>
      <Route path="/" element={<StoreWrapper />}>
        {/* public routes */}
        <Route index element={<LandingPage />} />
        
        <Route path="login" element={<Login />} />

        

      </Route>
      {/* Protected Routes */}
      <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
            <Route element={<Prefetch />}>
              <Route path="/dash" element={<DashLayout />}>

                
                
                
                <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />}>
                <Route index element={<Home />} />
                  <Route path="catalog">
                    <Route index element={<Catalog />} />
                    <Route path=":id" element={<EditProduct/>}/>
                  </Route>
                  <Route path="categorys">
                    <Route index element={<Categorys />} />
                    <Route path=":id" element={<EditCategory />} />
                  </Route>
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
    </Routes >
  );
}

export default App;
