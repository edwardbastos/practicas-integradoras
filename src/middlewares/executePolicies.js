const token = localStorage.getItem('accessToken');
if(!token) window.location.replace('/login');

fetch('/api/sessions/profileInfo', 
{
    method:'GET',
    headers:
    {
        authorization: `Bearer ${token}`
    }
}).then(response=>response.json())
.then(result=>
{
    console.log(result);
    const user = result.payload;
    const welcome = document.getElementById('welcome');
    const email = document.getElementById('email');
    welcome.innerHTML = `Hola, ${user.name}, tu rol es: ${user.role}`;
    email.innerHTML = `Correo: ${user.email}`
})

const executePolicies = (policies) => {
  return (req, res, next) => {
    console.log(req.user);
    if (policies[0] === "PUBLIC") return next();
    if (policies[0] === "NO_AUTH" && !req.user) return next();
    if (policies[0] === "NO_AUTH" && req.user)
      return res.then(result=>
        {
            console.log(result);
            const user = result.payload;
            const welcome = document.getElementById('welcome');
            const email = document.getElementById('email');
            welcome.innerHTML = `Hola, ${user.name}, tu rol es: ${user.role}`;
            email.innerHTML = `Correo: ${user.email}`
        })
    if (policies[0] === "AUTH" && req.user) return next();
    if (policies[0] === "AUTH" && !req.user)
      return res.sendUnauthorized("Not logged");
    if (!policies.includes(req.user.role.toUpperCase())) {
      res.sendForbidden("Cannot access");
    }
    next();
  };
};

export default executePolicies;
