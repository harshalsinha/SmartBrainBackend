const handleSignin = (req, res, bcrypt, db) => {
    const {email, password} = req.body;
    if(!email || !password)
    {
        res.status(400).json(`Invalid login credentials`)
    }
    db.
    select('hash').
    from('login').
    where({
        email: email
    }).
    then(hashes => {
        if(hashes.length && bcrypt.compareSync(password, hashes[0].hash))
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
    catch(res.status(400).json(`Invalid login credentials`))
}

module.exports = {
    handleSignin : handleSignin
}