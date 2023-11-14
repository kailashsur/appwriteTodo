## state manage code

```js
 const localAuth = JSON.parse(localStorage.getItem('Auth'))
 const [status, setStatus] = useState(null)
  
  useEffect(() => {
    setStatus(localAuth.status)
  }, [localAuth.status])
  
```



## Login Logic code

```js
//---------------------------------

  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loader, setLoader] = useState("")
  const cookieFallback = JSON.parse(localStorage.getItem('cookieFallback'))
  const getLocalAuth = JSON.parse(localStorage.getItem('Auth'))
  const dispatch = useDispatch();
  const navigate = useNavigate();
  


//---------------------------------


  const loginClick = async () => {
    setError("")
    setLoader("Loading...")
    try {

      if (!cookieFallback || cookieFallback == [] || cookieFallback == {}) {

        if (email !== "" && password !== "") {
          console.log("Button clicked ");

          const loginRes = await appwriteService.loginAccount({ email, password })
          if (loginRes) {
            const userData = await appwriteService.getCurrentAccount();
            dispatch(login(userData))
            setLoader("")
            navigate("/")
          }
        }
      } else {

        const userData = await appwriteService.getCurrentAccount()
        dispatch(login(userData))
        setLoader("You are alredy Loged In ")
        navigate("/")
      }

    } catch (error) {
      setError("Login.jsx :: loginClick() :: error is :: ", error)
      console.log("Login.jsx :: loginClick() :: error is :: ", error);
    }


  }

  useEffect(() => {

    if (!cookieFallback || cookieFallback == [] || cookieFallback == {}) {
      console.log("Cookie empty");
    }
    else {
      console.log("Cookie not empty");

      setLoader("You are alredy loged in")
      setTimeout(navigate("/"), 10000)
    }
  }, [cookieFallback])



```