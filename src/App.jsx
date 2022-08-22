import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import axios from "axios";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

function App() {
  const [user, setUser] = useState();
  const [update, setUpdate] = useState();
  const [isFormOpen, setIsFormOpen] = useState(false)


  const url = `https://users-crud1.herokuapp.com/users/`;
  
  const refresh = () => {
    axios
      .get(url)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    refresh()
  }, []);
  
  return <div className="App">
  <UserForm refresh={refresh} 
    url={url}
    setUpdate={setUpdate}
    setIsFormOpen={setIsFormOpen}
    isFormOpen={isFormOpen}
    update={update}
  />
  <br></br>
<div className="Users">
{ user?.map(user => (
            <UserList
              key={user.id}
              user={user}
              refresh={refresh}
              url={url}
             setUpdate={setUpdate}
             setIsFormOpen={setIsFormOpen}
            />
          ))
        }
</div>
  </div>;
}

export default App;
