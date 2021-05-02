const handleProfile = (req, res, db) => {
    const {userId} = req.params;
    db.
    select('*').
    from('users').
    where({
        id: userId
    }).
    then(user => {
        if(user.length)
        {
            res.json(user[0])
        }
        else
        {
            res.status(400).json(`User: ${userId} not found`)
        }
    })
}

module.exports = {
    handleProfile : handleProfile
}