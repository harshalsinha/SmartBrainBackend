const handleSignin = (req, res, bcrypt, db) => {
    const {email, password} = req.body;
    if(!email || !password)
    {
        res.status(400).json(`Invalid login credentials`)
    }
    db.
    select('password').
    from('login').
    where({
        email: email
    }).
    then(passwords => {
        if(passwords.length && bcrypt.compareSync(password, passwords[0].password))
        {
            db.select('*').from('users').where({email: email}).then(users => {
                res.json(users[0])
            }).catch(err => res.status(400).json(err))
        }
        else
        {
            res.status(400).json(`Invalid login credentials`)
        }
    }).
    catch(err => res.status(400).json(err))
}

module.exports = {
    handleSignin : handleSignin
}