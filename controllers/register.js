const handleRegister = (req, res, bcrypt, db) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password)
    {
        return res.status(400).json(`Invalid form submitted`)
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.
        insert({
            email: email,
            password: hash
        }).
        into("login").
        returning("email").
        then(() => {
            return trx("users").
            returning('*').
            insert({
            name: name,
            email: email,
            joined: new Date()
            }).
            then(user => res.json(user[0]))
        }).
        then(trx.commit).
        catch(trx.rollback)
    }).
    catch(err => res.status(400).json(`Unable to register ${name} ${email} ${password}! ${err}`))
}

module.exports = {
    handleRegister: handleRegister
}