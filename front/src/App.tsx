import { useEffect } from 'react';
import styles from './App.module.css';
import EditUserForm from './container/EditUserForm/EditUserForm';
import CreateUserForm from './container/CreateUserForm/CreateUserForm';
import { useDeleteUserMutation, useGetUsersQuery } from './store/controllers/userApi';
import { toast } from 'react-toastify';

const App = () => {
  const {data = [] } = useGetUsersQuery();
  const [deleteHandler, {isSuccess, data: deleteData} ] = useDeleteUserMutation();

  useEffect(() => {
    isSuccess && toast.info(`Пользователь ${deleteData?.email} удален`);
  }, [isSuccess])
  
  return (
   <div className={styles.container}>
        <CreateUserForm />
        {data && data.map((user) => {
          return (
            <div key={user.id} className={styles.userItems}>
               <p className={styles.userText}>email: {user.email}</p>
               <p className={styles.userText}>password: {user.password}</p> 
               <button onClick={() => deleteHandler(user.id)}>Удалить</button>
               <EditUserForm data={user}/>
            </div>
          )
        })}
   </div>
  )
}

export default App;
